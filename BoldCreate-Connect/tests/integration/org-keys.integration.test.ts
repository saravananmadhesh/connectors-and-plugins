/**
 * Organization keys: the worker creates one key pair per organization, the organization is
 * `key_pending` until then, and the api holds no key management access.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { parseId } from '../../packages/contracts/src/v1/ids.js';
import {
  apiPost,
  createSignedInUser,
  sql,
  verificationToken,
  waitForOrgKey,
} from './signed-in-user.js';
import { apiUrl } from './test-env.js';

interface KeyRow extends Record<string, unknown> {
  version: number;
  status: string;
  public_key: string;
  wrapped_private_key: string;
  kms_key_version: string;
}

const keysOf = (rawOrgId: string) =>
  sql<KeyRow>(
    `SELECT version, status, public_key, wrapped_private_key, kms_key_version
       FROM org_key WHERE organization_id = $1 ORDER BY version`,
    [rawOrgId],
  );

async function keyState(rawOrgId: string): Promise<string | undefined> {
  const rows = await sql<{ key_state: string }>(
    `SELECT key_state FROM organization WHERE id = $1`,
    [rawOrgId],
  );
  return rows[0]?.key_state;
}

describe('org keys', () => {
  it('creates exactly one active key within seconds of signing up and verifying', async () => {
    const email = `org-key-${randomUUID()}@example.com`;
    const signup = await apiPost('/v1/auth/signup', {
      email,
      password: 'TestPassword123!',
      displayName: 'Org Key User',
    });
    expect(signup.status).toBe(201);
    const verified = await apiPost('/v1/auth/verify-email', {
      token: await verificationToken(email),
    });
    expect(verified.status).toBe(200);
    const startedAt = Date.now();

    const [org] = await sql<{ id: string }>(
      `SELECT o.id FROM organization o
         JOIN organization_member om ON om.organization_id = o.id
         JOIN "user" u ON u.id = om.user_id
        WHERE u.email_normalized = $1`,
      [email],
    );
    await waitForOrgKey(org!.id, 15_000);
    expect(Date.now() - startedAt).toBeLessThan(15_000);

    const keys = await keysOf(org!.id);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toMatchObject({ version: 1, status: 'active' });
    expect(keys[0]!.public_key).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(keys[0]!.wrapped_private_key).not.toBe('');
    expect(await keyState(org!.id)).toBe('ready');

    const audit = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE org_id = $1 AND action = 'org_key.created'`,
      [org!.id],
    );
    expect(Number(audit[0]!.n)).toBe(1);
  });

  it('creates a key for a second organization', async () => {
    const user = await createSignedInUser('org-key-second');
    const slug = `second-${randomUUID().slice(0, 12)}`;
    const created = await apiPost('/v1/orgs', { name: 'Second Org Key', slug }, user.sessionToken);
    expect(created.status).toBe(201);
    const rawOrgId = parseId('org', ((await created.json()) as { id: string }).id);

    await waitForOrgKey(rawOrgId, 5_000);
    const keys = await keysOf(rawOrgId);
    expect(keys.map((key) => [key.version, key.status])).toEqual([[1, 'active']]);
  });

  it('keeps one active key when the job is enqueued twice', async () => {
    const user = await createSignedInUser('org-key-duplicate');
    // An organization inserted by SQL gets no job from the application.
    const rawOrgId = randomUUID();
    await sql(
      `INSERT INTO organization (id, name, slug, created_by) VALUES ($1, 'Duplicate Job Org', $2, $3)`,
      [rawOrgId, `duplicate-${rawOrgId.slice(0, 12)}`, user.rawUserId],
    );
    expect(await keyState(rawOrgId)).toBe('key_pending');
    for (let copy = 0; copy < 2; copy++) {
      await sql(
        `INSERT INTO outbox (id, event_type, payload, status, attempts, next_attempt_at)
         VALUES ($1, 'org_key.requested', $2, 'pending', 0, now())`,
        [randomUUID(), JSON.stringify({ orgId: rawOrgId })],
      );
    }
    await waitForOrgKey(rawOrgId, 10_000);
    // Let the second job run too before counting.
    await new Promise<void>((resolve) => setTimeout(resolve, 3_000));
    const keys = await keysOf(rawOrgId);
    expect(keys.filter((key) => key.status === 'active')).toHaveLength(1);
    expect(keys).toHaveLength(1);
  });

  it('ignores a job for an organization that no longer exists', async () => {
    const rawOrgId = randomUUID();
    const jobId = randomUUID();
    await sql(
      `INSERT INTO outbox (id, event_type, payload, status, attempts, next_attempt_at)
       VALUES ($1, 'org_key.requested', $2, 'pending', 0, now())`,
      [jobId, JSON.stringify({ orgId: rawOrgId })],
    );
    for (let attempt = 0; attempt < 20; attempt++) {
      const [job] = await sql<{ status: string }>(`SELECT status FROM outbox WHERE id = $1`, [
        jobId,
      ]);
      if (job?.status === 'delivered') break;
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
    }
    const [job] = await sql<{ status: string }>(`SELECT status FROM outbox WHERE id = $1`, [jobId]);
    expect(job?.status).toBe('delivered');
    expect(await keysOf(rawOrgId)).toHaveLength(0);
  });

  it('gives the api no key management check', async () => {
    const res = await fetch(`${apiUrl}/readyz`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { checks: Record<string, string> };
    expect(Object.keys(body.checks)).not.toContain('kms');
  });
});
