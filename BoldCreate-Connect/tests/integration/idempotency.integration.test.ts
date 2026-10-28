/**
 * Enforced idempotency on the live api: replays, concurrency, scoping, secret responses and
 * retention, against real Postgres and the running worker.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { parseId } from '../../packages/contracts/src/v1/ids.js';
import { callApi } from './org-fixture.js';
import { createSignedInUser, sql, waitForOrgKey, workloadHeaders } from './signed-in-user.js';
import { apiUrl } from './test-env.js';

const slugOf = (prefix: string) => `${prefix}-${randomUUID().slice(0, 12)}`;
const key = (value: string) => ({ 'idempotency-key': value });
const codeOf = async (response: Response) =>
  ((await response.json()) as { error: { code: string } }).error.code;

interface IdemRow extends Record<string, unknown> {
  principal_key: string;
  state: string;
  response_status: number | null;
  response_body: unknown;
  secret_response: boolean;
}

const rowsFor = (idemKey: string) =>
  sql<IdemRow>(
    `SELECT principal_key, state, response_status, response_body, secret_response
       FROM idempotency_key WHERE idem_key = $1`,
    [idemKey],
  );

const countWhere = async (table: 'organization' | 'project', key: string) => {
  const column = table === 'organization' ? 'slug' : 'name';
  const rows = await sql<{ n: string }>(`SELECT count(*) AS n FROM ${table} WHERE ${column} = $1`, [
    key,
  ]);
  return Number(rows[0]!.n);
};

describe('idempotency', () => {
  it('replays a stored 201 with the same body and creates one organization', async () => {
    const user = await createSignedInUser('idem-replay');
    const slug = slugOf('replay');
    const idem = randomUUID();
    const body = { name: 'Replay Org', slug };

    const first = await callApi('POST', '/v1/orgs', user, body, key(idem));
    const second = await callApi('POST', '/v1/orgs', user, body, key(idem));
    expect(first.status).toBe(201);
    expect(first.headers.get('idempotent-replay')).toBeNull();
    expect(second.status).toBe(201);
    expect(second.headers.get('idempotent-replay')).toBe('true');
    const created = (await first.json()) as { id: string };
    expect(await second.json()).toEqual(created);
    expect(await countWhere('organization', slug)).toBe(1);

    // No second key job ran: one key pair, version 1.
    const rawOrgId = parseId('org', created.id);
    await waitForOrgKey(rawOrgId, 10_000);
    const keys = await sql<{ version: number }>(
      `SELECT version FROM org_key WHERE organization_id = $1`,
      [rawOrgId],
    );
    expect(keys.map((k) => k.version)).toEqual([1]);

    const [record] = await rowsFor(idem);
    expect(record).toMatchObject({
      principal_key: `usr:${user.rawUserId}`,
      state: 'completed',
      response_status: 201,
      secret_response: false,
    });
  });

  it('lets exactly one of ten concurrent identical requests create the organization', async () => {
    const user = await createSignedInUser('idem-concurrent');
    const slug = slugOf('concurrent');
    const idem = randomUUID();
    const responses = await Promise.all(
      Array.from({ length: 10 }, () =>
        callApi('POST', '/v1/orgs', user, { name: 'Concurrent Org', slug }, key(idem)),
      ),
    );
    const replayHeader = (r: Response) => r.headers.get('idempotent-replay');
    const fresh = responses.filter((r) => r.status === 201 && replayHeader(r) === null);
    expect(fresh).toHaveLength(1);
    const others = responses.filter((r) => !fresh.includes(r));
    const outcomes = others.map((r) =>
      r.status === 201 && replayHeader(r) === 'true'
        ? 'replayed'
        : r.status === 409
          ? `in-progress retry-after=${r.headers.get('retry-after')}`
          : `unexpected ${r.status}`,
    );
    for (const outcome of outcomes) {
      expect(['replayed', 'in-progress retry-after=1']).toContain(outcome);
    }
    expect(await countWhere('organization', slug)).toBe(1);
  });

  it('refuses the same key with another body', async () => {
    const user = await createSignedInUser('idem-reused');
    const idem = randomUUID();
    const first = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'Alpha Org', slug: slugOf('a') },
      key(idem),
    );
    expect(first.status).toBe(201);
    const second = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'Bravo Org', slug: slugOf('b') },
      key(idem),
    );
    expect(second.status).toBe(409);
    expect(await codeOf(second)).toBe('idempotency_key_reused');
  });

  it('requires the header on a required route and validates it everywhere', async () => {
    const user = await createSignedInUser('idem-header');
    const body = { name: 'Header Org', slug: slugOf('header') };
    const missing = await fetch(`${apiUrl}/v1/orgs`, {
      method: 'POST',
      headers: { ...workloadHeaders, 'x-session-token': user.sessionToken },
      body: JSON.stringify(body),
    });
    expect(missing.status).toBe(400);
    expect(await codeOf(missing)).toBe('idempotency_key_required');

    const malformed = await callApi('POST', '/v1/orgs', user, body, key('has a space'));
    expect(malformed.status).toBe(400);
    expect(await codeOf(malformed)).toBe('validation_failed');
  });

  it('keeps one key independent between two users', async () => {
    const first = await createSignedInUser('idem-user-a');
    const second = await createSignedInUser('idem-user-b');
    const idem = randomUUID();
    const a = await callApi(
      'POST',
      '/v1/orgs',
      first,
      { name: 'Alpha Org', slug: slugOf('ua') },
      key(idem),
    );
    const b = await callApi(
      'POST',
      '/v1/orgs',
      second,
      { name: 'Bravo Org', slug: slugOf('ub') },
      key(idem),
    );
    expect(a.status).toBe(201);
    expect(b.status).toBe(201);
    expect(b.headers.get('idempotent-replay')).toBeNull();
    const rows = await rowsFor(idem);
    expect(rows.map((r) => r.principal_key).sort()).toEqual(
      [`usr:${first.rawUserId}`, `usr:${second.rawUserId}`].sort(),
    );
  });

  it('never re-runs side effects on a replay of a project creation', async () => {
    const user = await createSignedInUser('idem-project');
    const idem = randomUUID();
    const name = `Replay ${slugOf('project')}`.slice(0, 60);
    const path = `/v1/orgs/${user.orgId}/projects`;
    const body = { name };
    const first = await callApi('POST', path, user, body, key(idem));
    const second = await callApi('POST', path, user, body, key(idem));
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(second.headers.get('idempotent-replay')).toBe('true');
    expect(await countWhere('project', name)).toBe(1);
    const projectId = parseId('prj', ((await first.json()) as { id: string }).id);
    const audit = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log
        WHERE action = 'project.created' AND org_id = $1 AND target_id = $2`,
      [user.rawOrgId, projectId],
    );
    expect(Number(audit[0]!.n)).toBe(1);
  });

  it('does not store a secret response and refuses to replay it', async () => {
    const user = await createSignedInUser('idem-secret');
    const idem = randomUUID();
    const path = `/v1/orgs/${user.orgId}/api-keys`;
    const body = { name: 'Replay Key', permissions: ['mcp:list'] };
    const first = await callApi('POST', path, user, body, key(idem));
    expect(first.status).toBe(201);
    const created = (await first.json()) as Record<string, unknown>;
    const second = await callApi('POST', path, user, body, key(idem));
    expect(second.status).toBe(409);
    expect(await codeOf(second)).toBe('idempotent_replay_secret_unavailable');

    const [record] = await rowsFor(idem);
    expect(record).toMatchObject({
      response_body: null,
      secret_response: true,
      state: 'completed',
    });
    const secrets = Object.values(created).filter(
      (value): value is string => typeof value === 'string' && value.length >= 24,
    );
    expect(secrets.length).toBeGreaterThan(0);
    for (const secret of secrets) {
      const leaked = await sql<{ n: string }>(
        `SELECT count(*) AS n FROM idempotency_key WHERE response_body::text LIKE $1`,
        [`%${secret}%`],
      );
      expect(Number(leaked[0]!.n)).toBe(0);
    }
  });

  it('removes expired records through the purge job and frees the key', async () => {
    const user = await createSignedInUser('idem-expiry');
    const idem = randomUUID();
    const first = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'Expiring', slug: slugOf('expiring') },
      key(idem),
    );
    expect(first.status).toBe(201);

    await sql(
      `UPDATE idempotency_key SET expires_at = now() - interval '1 hour' WHERE idem_key = $1`,
      [idem],
    );
    // Bring the waiting purge job forward; it schedules its own next run.
    await sql(
      `UPDATE outbox SET next_attempt_at = now()
        WHERE event_type = 'idempotency_key.purge_due' AND status = 'pending'`,
    );
    const deadline = Date.now() + 20_000;
    let remaining = 1;
    while (Date.now() < deadline) {
      remaining = (await rowsFor(idem)).length;
      if (remaining === 0) break;
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
    }
    expect(remaining).toBe(0);

    // A purge job is waiting again, so retention continues.
    const waiting = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM outbox
        WHERE event_type = 'idempotency_key.purge_due' AND status = 'pending'`,
    );
    expect(Number(waiting[0]!.n)).toBeGreaterThanOrEqual(1);

    // The key can be used again, even for another body.
    const reused = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'Again', slug: slugOf('again') },
      key(idem),
    );
    expect(reused.status).toBe(201);
    expect(reused.headers.get('idempotent-replay')).toBeNull();
  });

  it('lets an expired but not yet purged record be claimed again', async () => {
    const user = await createSignedInUser('idem-reclaim');
    const idem = randomUUID();
    const first = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'One', slug: slugOf('one') },
      key(idem),
    );
    expect(first.status).toBe(201);
    await sql(
      `UPDATE idempotency_key SET expires_at = now() - interval '1 second' WHERE idem_key = $1`,
      [idem],
    );
    const second = await callApi(
      'POST',
      '/v1/orgs',
      user,
      { name: 'Two', slug: slugOf('two') },
      key(idem),
    );
    expect(second.status).toBe(201);
    expect(second.headers.get('idempotent-replay')).toBeNull();
  });
});
