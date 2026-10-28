/**
 * Calls made with a project key: who the key is, what it may reach, how the project's users are
 * made, listed and removed, and how a revoked, expired, restricted or suspended key stops. Every
 * refusal that could tell an outsider something answers alike, and two projects never see each
 * other's users.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { apiUrl, gatewayUrl } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';

interface UserBody {
  id: string;
  userId: string;
  displayName: string;
  status: string;
  createdAt: string;
  lastSeenAt: string | null;
  sessionCount: number;
  connectionCount: number;
}
interface Page {
  items: UserBody[];
  nextCursor: string | null;
}
interface Host {
  projectId: string;
  rawProjectId: string;
  key: string;
  keyId: string;
}

const DAY = 86_400_000;
const ALL = ['sessions:read', 'sessions:write'];
let fx: OrgFixture;

const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const inDays = (days: number) => new Date(Date.now() + days * DAY).toISOString();
const rawId = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

interface CallOptions {
  method?: string;
  key?: string;
  body?: unknown;
  ip?: string;
  headers?: Record<string, string>;
}

/** A call as the api receives it from the gateway: workload identity plus the host's headers. */
function viaApi(path: string, options: CallOptions = {}): Promise<Response> {
  const { method = 'GET', key, body, ip, headers = {} } = options;
  // A body-less call sends no content type, as a client would, so an empty body is not parsed.
  const { 'Content-Type': contentType, ...baseHeaders } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...baseHeaders,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
      ...(key ? { authorization: `Bearer ${key}` } : {}),
      ...(ip ? { 'x-forwarded-for': ip } : {}),
      ...headers,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

async function codeOf(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

async function createHost(
  scopes: string[] = ALL,
  extra: Record<string, unknown> = {},
): Promise<Host> {
  const created = await callApi('POST', base(), owner(), {
    name: `Host ${randomUUID().slice(0, 8)}`,
  });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const keyRes = await callApi('POST', `${base()}/${projectId}/keys`, owner(), {
    scopes,
    expiresAt: inDays(30),
    ...extra,
  });
  expect(keyRes.status).toBe(201);
  const key = (await keyRes.json()) as { rawKey: string; prefix: string };
  return { projectId, rawProjectId: rawId(projectId), key: key.rawKey, keyId: key.prefix };
}

async function putUser(host: Host, userId: string, displayName?: string) {
  return viaApi('/v1/project/users', {
    method: 'PUT',
    key: host.key,
    body: { userId, ...(displayName === undefined ? {} : { displayName }) },
  });
}

let a: Host;
let b: Host;

beforeAll(async () => {
  fx = await createOrgFixture('project-users');
  a = await createHost();
  b = await createHost();
}, 120_000);

describe('a project key', () => {
  it('says which project and key it is, and nothing about users', async () => {
    const res = await viaApi('/v1/project/me', { key: a.key });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      project: { id: a.projectId, name: expect.any(String), status: 'active' },
      key: { prefix: a.keyId, scopes: ALL, expiresAt: expect.any(String) },
    });
  });

  it('is accepted through the public gateway too, with its body', async () => {
    const res = await fetch(`${gatewayUrl}/v1/project/users`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${a.key}` },
      body: JSON.stringify({ userId: `gateway-${randomUUID().slice(0, 8)}` }),
    });
    expect(res.status).toBe(201);
    const refused = await fetch(`${gatewayUrl}/v1/project/me`);
    expect(refused.status).toBe(401);
  });

  it('records when it was last used', async () => {
    const host = await createHost();
    await viaApi('/v1/project/me', { key: host.key });
    const [row] = await sql<{ used: boolean }>(
      `SELECT (last_used_at IS NOT NULL) AS used FROM project_key WHERE key_id = $1`,
      [host.keyId],
    );
    expect(row?.used).toBe(true);
  });

  it('is refused with 401 when missing, malformed, unknown or of another kind', async () => {
    const secret = 'a'.repeat(43);
    const refused = [
      undefined,
      `${a.key}x`,
      `prk_0000000000000000.${secret}`,
      `${a.keyId}.${secret}`,
      `ptk_0123456789abcdef.${secret}`,
      `fyk_0123456789abcdef.${secret}`,
    ];
    for (const key of refused) {
      const res = await viaApi('/v1/project/me', key ? { key } : {});
      expect(res.status).toBe(401);
      expect(await codeOf(res)).toBe('unauthenticated');
    }
  });

  it('is not a session: a person signed in on the website cannot call a project route', async () => {
    const res = await callApi('GET', '/v1/project/me', owner());
    expect(res.status).toBe(401);
  });

  it('cannot reach the routes the retired partner API served', async () => {
    for (const path of ['/v1/partner/me', '/v1/partner/orgs']) {
      expect((await viaApi(path, { key: a.key })).status).toBe(404);
    }
  });

  it('cannot reach website routes, however many scopes it holds', async () => {
    for (const path of [`/v1/orgs/${fx.orgId}`, `${base()}`, `${base()}/${a.projectId}/keys`]) {
      const res = await viaApi(path, { key: a.key });
      expect(res.status).toBe(401);
    }
  });

  it('is refused with 403 for a route whose scope it does not hold', async () => {
    const readOnly = await createHost(['sessions:read']);
    expect((await viaApi('/v1/project/users', { key: readOnly.key })).status).toBe(200);
    const write = await putUser(readOnly, 'someone');
    expect(write.status).toBe(403);
    expect(await codeOf(write)).toBe('insufficient_scope');
    const writeOnly = await createHost(['sessions:write']);
    expect((await putUser(writeOnly, 'someone')).status).toBe(201);
    expect((await viaApi('/v1/project/users', { key: writeOnly.key })).status).toBe(403);
  });

  it('stops working when revoked, expired, suspended or when the project is deleted', async () => {
    const revoked = await createHost();
    const keys = (await (
      await callApi('GET', `${base()}/${revoked.projectId}/keys`, owner())
    ).json()) as { items: { id: string }[] };
    const revoke = await callApi(
      'DELETE',
      `${base()}/${revoked.projectId}/keys/${keys.items[0]!.id}`,
      owner(),
    );
    expect(revoke.status).toBe(204);
    expect((await viaApi('/v1/project/me', { key: revoked.key })).status).toBe(401);

    const expired = await createHost();
    await sql(
      `UPDATE project_key SET created_at = now() - interval '2 days',
                              expires_at = now() - interval '1 day' WHERE key_id = $1`,
      [expired.keyId],
    );
    expect((await viaApi('/v1/project/me', { key: expired.key })).status).toBe(401);

    const paused = await createHost();
    const suspend = await callApi('PATCH', `${base()}/${paused.projectId}`, owner(), {
      status: 'suspended',
    });
    expect(suspend.status).toBe(200);
    expect((await viaApi('/v1/project/me', { key: paused.key })).status).toBe(401);
    await callApi('PATCH', `${base()}/${paused.projectId}`, owner(), { status: 'active' });
    expect((await viaApi('/v1/project/me', { key: paused.key })).status).toBe(200);

    const removed = await createHost();
    expect((await callApi('DELETE', `${base()}/${removed.projectId}`, owner())).status).toBe(204);
    expect((await viaApi('/v1/project/me', { key: removed.key })).status).toBe(401);
  });

  it('stops working while its organization is being deleted', async () => {
    const other = await createOrgFixture('project-users-org');
    const path = `/v1/orgs/${other.orgId}/projects`;
    const created = await callApi('POST', path, other.users.admin, { name: 'Going away' });
    const projectId = ((await created.json()) as { id: string }).id;
    const keyRes = await callApi('POST', `${path}/${projectId}/keys`, other.users.admin, {
      scopes: ALL,
      expiresAt: inDays(5),
    });
    const { rawKey } = (await keyRes.json()) as { rawKey: string };
    expect((await viaApi('/v1/project/me', { key: rawKey })).status).toBe(200);
    await sql(`UPDATE organization SET deletion_requested_at = now() WHERE id = $1`, [
      other.rawOrgId,
    ]);
    expect((await viaApi('/v1/project/me', { key: rawKey })).status).toBe(401);
  }, 120_000);

  it('is limited to the addresses it was made for', async () => {
    const host = await createHost(ALL, { allowedCidrs: ['203.0.113.0/24'] });
    expect((await viaApi('/v1/project/me', { key: host.key, ip: '203.0.113.9' })).status).toBe(200);
    expect((await viaApi('/v1/project/me', { key: host.key, ip: '198.51.100.7' })).status).toBe(
      401,
    );
    expect((await viaApi('/v1/project/me', { key: host.key })).status).toBe(401);
  });
});

describe('project users', () => {
  it('are made on first use with the host id, and a repeat call changes nothing', async () => {
    const ref = `user-${randomUUID().slice(0, 8)}`;
    const first = await putUser(a, ref);
    expect(first.status).toBe(201);
    const created = (await first.json()) as UserBody;
    expect(created).toMatchObject({
      userId: ref,
      displayName: ref,
      status: 'active',
      lastSeenAt: null,
      sessionCount: 0,
      connectionCount: 0,
    });
    expect(created.id).toMatch(/^usr_[0-9a-f]{32}$/);

    const again = await putUser(a, ref);
    expect(again.status).toBe(200);
    expect(((await again.json()) as UserBody).id).toBe(created.id);

    const rows = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM "user" WHERE project_id = $1 AND external_ref = $2`,
      [a.rawProjectId, ref],
    );
    expect(rows[0]?.n).toBe('1');
  });

  it('take a display name, replace it on a later call and keep it when none is sent', async () => {
    const ref = `named-${randomUUID().slice(0, 8)}`;
    const first = (await (await putUser(a, ref, '  Ada Lovelace ')).json()) as UserBody;
    expect(first.displayName).toBe('Ada Lovelace');
    const renamed = (await (await putUser(a, ref, 'Ada L')).json()) as UserBody;
    expect(renamed.displayName).toBe('Ada L');
    const kept = (await (await putUser(a, ref)).json()) as UserBody;
    expect(kept.displayName).toBe('Ada L');
  });

  it('are stored without a password, a deliverable address or any organization membership', async () => {
    const ref = `bare-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(a, ref)).json()) as UserBody;
    const [row] = await sql<{
      kind: string;
      email: string;
      project_id: string;
      members: string;
      identities: string;
    }>(
      `SELECT u.kind, u.email, u.project_id,
              (SELECT count(*) FROM organization_member WHERE user_id = u.id) AS members,
              (SELECT count(*) FROM auth_identity WHERE user_id = u.id) AS identities
       FROM "user" u WHERE u.id = $1`,
      [rawId(user.id)],
    );
    expect(row).toMatchObject({
      kind: 'external',
      project_id: a.rawProjectId,
      members: '0',
      identities: '0',
    });
    expect(row?.email.endsWith('@project.invalid')).toBe(true);
  });

  it('accept any id of 1 to 255 characters and refuse the rest', async () => {
    for (const ref of [
      'a',
      'A'.repeat(255),
      `Mixed Case ${randomUUID()}`,
      `ユーザー-${randomUUID().slice(0, 8)}`,
      `user@example.com/${randomUUID().slice(0, 8)}`,
    ]) {
      expect([200, 201]).toContain((await putUser(a, ref)).status);
    }
    for (const ref of ['', 'A'.repeat(256), 'tab\there', 'line\nbreak', 'nul\u0000byte']) {
      const res = await putUser(a, ref);
      expect(res.status).toBe(400);
      expect(await codeOf(res)).toBe('validation_failed');
    }
    expect(
      (await viaApi('/v1/project/users', { method: 'PUT', key: a.key, body: {} })).status,
    ).toBe(400);
    const extra = await viaApi('/v1/project/users', {
      method: 'PUT',
      key: a.key,
      body: { userId: 'x1', role: 'admin' },
    });
    expect(extra.status).toBe(400);
    expect((await putUser(a, 'x2', 'n'.repeat(81))).status).toBe(400);
  });

  it('keep two ids that differ only in case apart', async () => {
    const word = randomUUID().slice(0, 8);
    const lower = (await (await putUser(a, `case-${word}`)).json()) as UserBody;
    const upper = (await (await putUser(a, `CASE-${word}`)).json()) as UserBody;
    expect(lower.id).not.toBe(upper.id);
  });

  it('are made once when the same id arrives in many calls at the same moment', async () => {
    const ref = `race-${randomUUID().slice(0, 8)}`;
    const results = await Promise.all(Array.from({ length: 8 }, () => putUser(a, ref)));
    const statuses = results.map((res) => res.status).sort();
    expect(statuses.filter((status) => status === 201)).toHaveLength(1);
    expect(statuses.filter((status) => status === 200)).toHaveLength(7);
    const ids = new Set(
      await Promise.all(results.map(async (res) => ((await res.json()) as UserBody).id)),
    );
    expect(ids.size).toBe(1);
  });

  it('are found by the host id, which is matched exactly, and an unknown id gives an empty page', async () => {
    const ref = `one-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(a, ref)).json()) as UserBody;
    const find = async (userId: string) =>
      (await (
        await viaApi(`/v1/project/users?userId=${encodeURIComponent(userId)}`, { key: a.key })
      ).json()) as Page;
    expect((await find(ref)).items).toEqual([user]);
    expect((await find(ref.slice(0, -1))).items).toEqual([]);
    expect((await find(ref.toUpperCase())).items).toEqual([]);
    const unknown = await find(`never-seen-${randomUUID().slice(0, 8)}`);
    expect(unknown).toEqual({ items: [], nextCursor: null });
    // Asking for an unknown id makes no user.
    const rows = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM "user" WHERE project_id = $1 AND external_ref LIKE 'never-seen-%'`,
      [a.rawProjectId],
    );
    expect(rows[0]?.n).toBe('0');
  });

  it('have no route with the platform id in the path, and the host cannot delete one', async () => {
    const ref = `nopath-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(a, ref)).json()) as UserBody;
    for (const method of ['GET', 'DELETE']) {
      const res = await viaApi(`/v1/project/users/${user.id}`, { method, key: a.key });
      expect([404, 405]).toContain(res.status);
    }
    const kept = await callApi('GET', `${base()}/${a.projectId}/users/${user.id}`, owner());
    expect(kept.status).toBe(200);
  });

  it('are listed oldest first in pages, and found by the start of their id', async () => {
    const host = await createHost();
    const tag = randomUUID().slice(0, 6);
    for (const name of ['red', 'rose', 'blue', 'r_ed', 'r%d']) {
      expect((await putUser(host, `${tag}-${name}`)).status).toBe(201);
    }

    const first = (await (
      await viaApi('/v1/project/users?limit=2', { key: host.key })
    ).json()) as Page;
    expect(first.items.map((item) => item.userId)).toEqual([`${tag}-red`, `${tag}-rose`]);
    expect(first.nextCursor).not.toBeNull();
    const second = (await (
      await viaApi(`/v1/project/users?limit=2&cursor=${first.nextCursor}`, { key: host.key })
    ).json()) as Page;
    expect(second.items.map((item) => item.userId)).toEqual([`${tag}-blue`, `${tag}-r_ed`]);
    const third = (await (
      await viaApi(`/v1/project/users?limit=2&cursor=${second.nextCursor}`, { key: host.key })
    ).json()) as Page;
    expect(third.items.map((item) => item.userId)).toEqual([`${tag}-r%d`]);
    expect(third.nextCursor).toBeNull();

    const search = async (text: string) =>
      (
        (await (
          await viaApi(`/v1/project/users?search=${encodeURIComponent(text)}`, { key: host.key })
        ).json()) as Page
      ).items.map((item) => item.userId);
    expect(await search(`${tag}-r`)).toEqual([
      `${tag}-red`,
      `${tag}-rose`,
      `${tag}-r_ed`,
      `${tag}-r%d`,
    ]);
    // `_` and `%` are plain characters in a search, not patterns.
    expect(await search(`${tag}-r_`)).toEqual([`${tag}-r_ed`]);
    expect(await search(`${tag}-r%`)).toEqual([`${tag}-r%d`]);
    expect(await search(`${tag}-zzz`)).toEqual([]);
  });

  it('refuse a bad page size, an unknown query field and a cursor that is not one', async () => {
    for (const query of ['limit=0', 'limit=101', 'limit=abc', 'extra=1', 'cursor=not-a-cursor']) {
      const res = await viaApi(`/v1/project/users?${query}`, { key: a.key });
      expect(res.status).toBe(400);
    }
  });

  it('of one project are never seen through the key of another', async () => {
    const ref = `private-${randomUUID().slice(0, 8)}`;
    const inA = (await (await putUser(a, ref)).json()) as UserBody;
    const listed = (await (
      await viaApi('/v1/project/users?limit=100', { key: b.key })
    ).json()) as Page;
    expect(listed.items.map((item) => item.userId)).not.toContain(ref);
    const exact = (await (
      await viaApi(`/v1/project/users?userId=${encodeURIComponent(ref)}`, { key: b.key })
    ).json()) as Page;
    expect(exact.items).toEqual([]);
    // The console of project B cannot read or delete it either.
    expect((await callApi('GET', `${base()}/${b.projectId}/users/${inA.id}`, owner())).status).toBe(
      404,
    );
    expect(
      (await callApi('DELETE', `${base()}/${b.projectId}/users/${inA.id}`, owner())).status,
    ).toBe(404);

    // The same host id in the other project is a different user.
    const inB = (await (await putUser(b, ref)).json()) as UserBody;
    expect(inB.id).not.toBe(inA.id);
    expect((await callApi('GET', `${base()}/${a.projectId}/users/${inA.id}`, owner())).status).toBe(
      200,
    );
  });

  it('are removed with their sessions, connections and installs, and the id can be used again', async () => {
    const ref = `leaving-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(a, ref, 'Leaving')).json()) as UserBody;
    const rawUser = rawId(user.id);
    // A session, as the next package will make them, and a personal install.
    await sql(
      `INSERT INTO api_key (id, key_id, secret_hash, principal_user_id, organization_id, project_id,
                            scope, user_id, created_by, name, last_four, permissions, expires_at)
       VALUES (gen_random_uuid(), $1, 'hash', $2, $3, $4, 'user', $2, $2, 'session test', 'abcd',
               ARRAY['mcp:list'], now() + interval '1 hour')`,
      [
        `stk_${randomUUID().replaceAll('-', '').slice(0, 16)}`,
        rawUser,
        fx.rawOrgId,
        a.rawProjectId,
      ],
    );
    const userPath = `${base()}/${a.projectId}/users/${user.id}`;
    const counted = (await (await callApi('GET', userPath, owner())).json()) as UserBody;
    expect(counted.sessionCount).toBe(1);

    // A member who is not an owner or admin cannot delete; the host's own key cannot either.
    expect((await callApi('DELETE', userPath, fx.users.viewer)).status).toBe(403);
    expect(
      (await viaApi(`/v1/project/users/${user.id}`, { method: 'DELETE', key: a.key })).status,
    ).not.toBe(204);
    expect((await callApi('GET', userPath, owner())).status).toBe(200);

    const removed = await callApi('DELETE', userPath, owner());
    expect(removed.status).toBe(204);
    expect((await callApi('GET', userPath, owner())).status).toBe(404);
    expect((await callApi('DELETE', userPath, owner())).status).toBe(404);
    const afterwards = (await (
      await viaApi(`/v1/project/users?userId=${encodeURIComponent(ref)}`, { key: a.key })
    ).json()) as Page;
    expect(afterwards.items).toEqual([]);

    const [row] = await sql<{
      status: string;
      email: string;
      name: string;
      ref: string;
      live: string;
    }>(
      `SELECT u.status, u.email, u.display_name AS name, u.external_ref AS ref,
              (SELECT count(*) FROM api_key WHERE principal_user_id = u.id AND revoked_at IS NULL) AS live
       FROM "user" u WHERE u.id = $1`,
      [rawUser],
    );
    expect(row).toMatchObject({ status: 'deleted', name: 'Deleted user', live: '0' });
    expect(row?.email.endsWith('@deleted.invalid')).toBe(true);
    expect(row?.ref).not.toBe(ref);

    const back = await putUser(a, ref, 'Returned');
    expect(back.status).toBe(201);
    expect(((await back.json()) as UserBody).id).not.toBe(user.id);

    const audit = await sql<{
      action: string;
      project_id: string;
      subject_user_id: string;
      actor_kind: string;
    }>(
      `SELECT action, project_id, subject_user_id, actor_kind FROM audit_log
       WHERE subject_user_id = $1 ORDER BY created_at`,
      [rawUser],
    );
    expect(audit.map((entry) => entry.action)).toEqual([
      'project_user.created',
      'project_user.deleted',
    ]);
    for (const entry of audit) {
      expect(entry.project_id).toBe(a.rawProjectId);
    }
    expect(audit.map((entry) => entry.actor_kind)).toEqual(['api_key', 'user_session']);
  });

  it('are limited per project, and a user already there can still be updated at the limit', async () => {
    const host = await createHost();
    await sql(
      `INSERT INTO "user" (id, email, email_normalized, display_name, kind, project_id, external_ref,
                           email_verified_at)
       SELECT gen_random_uuid(), 'fill' || n || '@project.invalid', 'fill' || n || '@project.invalid',
              'Fill', 'external', $1, 'fill-' || n, now()
       FROM generate_series(1, 50000) AS n`,
      [host.rawProjectId],
    );
    const over = await putUser(host, 'one-too-many');
    expect(over.status).toBe(409);
    expect(await codeOf(over)).toBe('limit_exceeded');
    expect((await putUser(host, 'fill-7', 'Seven')).status).toBe(200);
    // Another project is not affected.
    expect((await putUser(a, `unaffected-${randomUUID().slice(0, 8)}`)).status).toBe(201);
  }, 120_000);

  it('are not made by the key of a project that is suspended', async () => {
    const host = await createHost();
    await callApi('PATCH', `${base()}/${host.projectId}`, owner(), { status: 'suspended' });
    expect((await putUser(host, 'blocked')).status).toBe(401);
  });
});

describe('project users in the console', () => {
  it('are listed and read by members of the organization, for the project asked about', async () => {
    const host = await createHost();
    const ref = `console-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(host, ref, 'Console User')).json()) as UserBody;

    const list = await callApi('GET', `${base()}/${host.projectId}/users`, fx.users.viewer);
    expect(list.status).toBe(200);
    expect(((await list.json()) as Page).items).toEqual([user]);

    const one = await callApi('GET', `${base()}/${host.projectId}/users/${user.id}`, owner());
    expect(one.status).toBe(200);
    expect(await one.json()).toEqual(user);

    // Another project of the same organization does not show this user.
    expect(
      (await callApi('GET', `${base()}/${b.projectId}/users/${user.id}`, owner())).status,
    ).toBe(404);
  });

  it('answer 404 to someone outside the organization and for a project of another organization', async () => {
    const host = await createHost();
    const user = (await (
      await putUser(host, `hidden-${randomUUID().slice(0, 8)}`)
    ).json()) as UserBody;
    const { stranger } = fx;
    expect((await callApi('GET', `${base()}/${host.projectId}/users`, stranger)).status).toBe(404);
    const through = `/v1/orgs/${stranger.orgId}/projects/${host.projectId}/users`;
    expect((await callApi('GET', through, stranger)).status).toBe(404);
    expect((await callApi('GET', `${through}/${user.id}`, stranger)).status).toBe(404);
  });

  it('are found by the host id in the console too', async () => {
    const host = await createHost();
    const ref = `console-find-${randomUUID().slice(0, 8)}`;
    const user = (await (await putUser(host, ref)).json()) as UserBody;
    const find = async (userId: string) =>
      (await (
        await callApi(
          'GET',
          `${base()}/${host.projectId}/users?userId=${encodeURIComponent(userId)}`,
          owner(),
        )
      ).json()) as Page;
    expect((await find(ref)).items).toEqual([user]);
    expect((await find('nobody')).items).toEqual([]);
  });

  it('cannot be changed from the console', async () => {
    const host = await createHost();
    const res = await callApi('PUT', `${base()}/${host.projectId}/users`, owner(), { userId: 'x' });
    expect(res.status).toBe(404);
  });
});
