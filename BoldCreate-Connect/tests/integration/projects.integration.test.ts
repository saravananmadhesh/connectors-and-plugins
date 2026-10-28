/**
 * Projects and their keys through the api: who may manage them, the limits, keys shown once and
 * stored as a hash, return origins, deletion, isolation between organizations, and the audit trail.
 *
 * Run: pnpm test -- --only=integration
 */
import { createHash, randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql } from './signed-in-user.js';

interface ProjectBody {
  id: string;
  organizationId: string;
  name: string;
  status: string;
  returnOrigins: string[];
  activeKeyCount: number;
}
interface KeyBody {
  id: string;
  prefix: string;
  rawKey: string;
  scopes: string[];
  allowedCidrs: string[] | null;
  expiresAt: string;
  revokedAt: string | null;
}

const DAY = 86_400_000;
let fx: OrgFixture;

const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const inDays = (days: number) => new Date(Date.now() + days * DAY).toISOString();
const rawId = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

async function code(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

async function createProject(name = `Host ${randomUUID().slice(0, 8)}`, body = {}) {
  const res = await callApi('POST', base(), owner(), { name, ...body });
  expect(res.status).toBe(201);
  return (await res.json()) as ProjectBody;
}

function createKey(projectId: string, body: Record<string, unknown> = {}) {
  return callApi('POST', `${base()}/${projectId}/keys`, owner(), {
    scopes: ['sessions:read'],
    expiresAt: inDays(30),
    ...body,
  });
}

beforeAll(async () => {
  fx = await createOrgFixture('projects');
}, 120_000);

describe('projects', () => {
  it('are created by an owner and listed with a key count', async () => {
    const created = await createProject('Alpha host', {
      returnOrigins: ['https://app.example.com/'],
    });
    expect(created).toMatchObject({
      name: 'Alpha host',
      status: 'active',
      organizationId: fx.orgId,
      returnOrigins: ['https://app.example.com'],
      activeKeyCount: 0,
    });
    expect(created.id).toMatch(/^prj_[0-9a-f]{32}$/);

    const list = await callApi('GET', base(), owner());
    expect(list.status).toBe(200);
    const items = ((await list.json()) as { items: ProjectBody[] }).items;
    expect(items.map((item) => item.id)).toContain(created.id);

    const one = await callApi('GET', `${base()}/${created.id}`, owner());
    expect(one.status).toBe(200);
  });

  it('refuse a duplicate name, an empty name and a bad return origin', async () => {
    const created = await createProject();
    const duplicate = await callApi('POST', base(), owner(), { name: created.name });
    expect(duplicate.status).toBe(409);
    expect((await callApi('POST', base(), owner(), { name: '  ' })).status).toBe(400);
    const bad = await callApi('POST', base(), owner(), {
      name: `Bad ${randomUUID().slice(0, 8)}`,
      returnOrigins: ['http://app.example.com'],
    });
    expect(bad.status).toBe(400);
  });

  it('may be renamed, suspended and resumed', async () => {
    const created = await createProject();
    const renamed = await callApi('PATCH', `${base()}/${created.id}`, owner(), {
      name: `${created.name} 2`,
    });
    expect(renamed.status).toBe(200);
    const suspended = await callApi('PATCH', `${base()}/${created.id}`, owner(), {
      status: 'suspended',
    });
    expect(((await suspended.json()) as ProjectBody).status).toBe('suspended');
    const resumed = await callApi('PATCH', `${base()}/${created.id}`, owner(), {
      status: 'active',
    });
    expect(((await resumed.json()) as ProjectBody).status).toBe('active');
    expect((await callApi('PATCH', `${base()}/${created.id}`, owner(), {})).status).toBe(400);
  });

  it('are managed by admins and members, and only read by viewers', async () => {
    const created = await createProject();
    const { admin, member, viewer } = fx.users;
    const byAdmin = await callApi('POST', base(), admin, {
      name: `Admin ${randomUUID().slice(0, 8)}`,
    });
    expect(byAdmin.status).toBe(201);

    const byMember = await callApi('POST', base(), member, {
      name: `Member ${randomUUID().slice(0, 8)}`,
    });
    expect(byMember.status).toBe(201);
    expect((await createKeyAs(member, created.id)).status).toBe(201);

    const byViewer = await callApi('POST', base(), viewer, { name: 'Viewer project' });
    expect(byViewer.status).toBe(403);
    expect((await callApi('GET', base(), viewer)).status).toBe(200);
    expect((await callApi('GET', `${base()}/${created.id}`, viewer)).status).toBe(200);
    expect(
      (await callApi('PATCH', `${base()}/${created.id}`, viewer, { name: 'x y' })).status,
    ).toBe(403);
    expect((await callApi('DELETE', `${base()}/${created.id}`, viewer)).status).toBe(403);
    // The keys of a project are not listed to a viewer.
    expect((await callApi('GET', `${base()}/${created.id}/keys`, viewer)).status).toBe(404);
    expect((await createKeyAs(viewer, created.id)).status).toBe(403);
  });

  it('answer 404 for a person who is not a member of the organization', async () => {
    const created = await createProject();
    const { stranger } = fx;
    expect((await callApi('GET', base(), stranger)).status).toBe(404);
    expect((await callApi('GET', `${base()}/${created.id}`, stranger)).status).toBe(404);
    expect((await callApi('POST', base(), stranger, { name: 'Nope' })).status).toBe(404);
  });

  it('of another organization are not found through this organization', async () => {
    const created = await createProject();
    const other = fx.stranger;
    const path = `/v1/orgs/${other.orgId}/projects/${created.id}`;
    expect((await callApi('GET', path, other)).status).toBe(404);
    expect((await callApi('DELETE', path, other)).status).toBe(404);
    expect((await callApi('GET', `${path}/keys`, other)).status).toBe(404);
  });

  it('are limited per organization', async () => {
    const limited = await createOrgFixture('projects-limit');
    const path = `/v1/orgs/${limited.orgId}/projects`;
    const user = limited.users.admin;
    // The organization starts with its default project, which takes one of the 25 places.
    for (let n = 0; n < 24; n += 1) {
      const res = await callApi('POST', path, user, { name: `P${n}` });
      expect(res.status).toBe(201);
    }
    const over = await callApi('POST', path, user, { name: 'One too many' });
    expect(over.status).toBe(409);
    expect(await code(over)).toBe('limit_exceeded');
  }, 120_000);

  it('are deleted with their keys, keep a tombstone, and free the name', async () => {
    const created = await createProject();
    const key = (await (await createKey(created.id)).json()) as KeyBody;

    const deleted = await callApi('DELETE', `${base()}/${created.id}`, owner());
    expect(deleted.status).toBe(204);

    expect((await callApi('GET', `${base()}/${created.id}`, owner())).status).toBe(404);
    expect((await callApi('DELETE', `${base()}/${created.id}`, owner())).status).toBe(404);
    const list = (
      (await (await callApi('GET', base(), owner())).json()) as { items: ProjectBody[] }
    ).items;
    expect(list.map((item) => item.id)).not.toContain(created.id);

    const [row] = await sql<{ status: string; revoked: boolean }>(
      `SELECT p.status, (k.revoked_at IS NOT NULL) AS revoked
       FROM project p JOIN project_key k ON k.project_id = p.id
       WHERE p.id = $1 AND k.key_id = $2`,
      [rawId(created.id), key.prefix],
    );
    expect(row).toMatchObject({ status: 'revoked', revoked: true });

    const again = await callApi('POST', base(), owner(), { name: created.name });
    expect(again.status).toBe(201);
  });
});

async function createKeyAs(user: { sessionToken: string }, projectId: string) {
  return callApi('POST', `${base()}/${projectId}/keys`, user, {
    scopes: ['sessions:read'],
    expiresAt: inDays(30),
  });
}

describe('project keys', () => {
  it('are shown once, start with prk_ and are stored only as a hash', async () => {
    const project = await createProject();
    const res = await createKey(project.id, {
      scopes: ['sessions:read', 'observability:read'],
      allowedCidrs: ['203.0.113.0/24'],
    });
    expect(res.status).toBe(201);
    const key = (await res.json()) as KeyBody;
    expect(key.rawKey).toMatch(/^prk_[0-9a-f]{16}\.[A-Za-z0-9_-]{20,}$/);
    expect(key.prefix).toBe(key.rawKey.split('.')[0]);
    expect(key.scopes).toEqual(['sessions:read', 'observability:read']);
    expect(key.allowedCidrs).toEqual(['203.0.113.0/24']);

    const [stored] = await sql<{ secret_hash: string }>(
      `SELECT secret_hash FROM project_key WHERE key_id = $1`,
      [key.prefix],
    );
    const secret = key.rawKey.split('.')[1]!;
    expect(stored?.secret_hash).toBe(createHash('sha256').update(secret).digest('hex'));

    const listed = await callApi('GET', `${base()}/${project.id}/keys`, owner());
    const body = JSON.stringify(await listed.json());
    expect(body).not.toContain(secret);
    expect(body).not.toContain('rawKey');
    expect(body).toContain(key.prefix);
  });

  it('refuse unknown scopes, duplicates, a missing, past or too distant expiry, and bad addresses', async () => {
    const project = await createProject();
    const attempt = (body: Record<string, unknown>) =>
      callApi('POST', `${base()}/${project.id}/keys`, owner(), body);
    const ok = { scopes: ['sessions:read'], expiresAt: inDays(10) };
    expect((await attempt({ ...ok, scopes: ['admin'] })).status).toBe(400);
    expect((await attempt({ ...ok, scopes: [] })).status).toBe(400);
    expect((await attempt({ ...ok, scopes: ['sessions:read', 'sessions:read'] })).status).toBe(400);
    expect((await attempt({ scopes: ['sessions:read'] })).status).toBe(400);
    const past = await attempt({ ...ok, expiresAt: inDays(-1) });
    expect(await code(past)).toBe('api_key_expiry_out_of_range');
    const far = await attempt({ ...ok, expiresAt: inDays(400) });
    expect(await code(far)).toBe('api_key_expiry_out_of_range');
    expect((await attempt({ ...ok, allowedCidrs: ['not-an-address'] })).status).toBe(400);
  });

  it('are limited per project and a revoked key frees a place', async () => {
    const project = await createProject();
    const keys: KeyBody[] = [];
    for (let n = 0; n < 10; n += 1) {
      const res = await createKey(project.id);
      expect(res.status).toBe(201);
      keys.push((await res.json()) as KeyBody);
    }
    const over = await createKey(project.id);
    expect(await code(over)).toBe('api_key_quota_exceeded');

    const revoke = await callApi('DELETE', `${base()}/${project.id}/keys/${keys[0]!.id}`, owner());
    expect(revoke.status).toBe(204);
    expect((await createKey(project.id)).status).toBe(201);
  }, 120_000);

  it('are revoked once, and revoking twice changes nothing', async () => {
    const project = await createProject();
    const key = (await (await createKey(project.id)).json()) as KeyBody;
    const path = `${base()}/${project.id}/keys/${key.id}`;
    expect((await callApi('DELETE', path, owner())).status).toBe(204);
    expect((await callApi('DELETE', path, owner())).status).toBe(204);

    const listed = (await (
      await callApi('GET', `${base()}/${project.id}/keys`, owner())
    ).json()) as {
      items: KeyBody[];
    };
    expect(listed.items.find((item) => item.id === key.id)?.revokedAt).not.toBeNull();
    const one = await callApi('GET', `${base()}/${project.id}`, owner());
    expect(((await one.json()) as ProjectBody).activeKeyCount).toBe(0);

    const unknown = `${base()}/${project.id}/keys/pjk_${randomUUID().replaceAll('-', '')}`;
    expect((await callApi('DELETE', unknown, owner())).status).toBe(404);
  });

  it('cannot be created for a suspended project or for another organization', async () => {
    const project = await createProject();
    await callApi('PATCH', `${base()}/${project.id}`, owner(), { status: 'suspended' });
    expect((await createKey(project.id)).status).toBe(403);

    const other = fx.stranger;
    const res = await callApi(
      'POST',
      `/v1/orgs/${other.orgId}/projects/${project.id}/keys`,
      other,
      {
        scopes: ['sessions:read'],
        expiresAt: inDays(5),
      },
    );
    expect(res.status).toBe(404);
  });
});

describe('key rotation', () => {
  const rotate = (projectId: string, keyId: string, user = owner()) =>
    callApi('POST', `${base()}/${projectId}/keys/${keyId}/rotate`, user);

  it('issues a key with the same scopes and expiry and keeps the old one working for a while', async () => {
    const project = await createProject();
    const old = (await (
      await createKey(project.id, { scopes: ['sessions:read', 'observability:read'] })
    ).json()) as KeyBody;
    const res = await rotate(project.id, old.id);
    expect(res.status).toBe(201);
    const next = (await res.json()) as KeyBody;
    expect(next.id).not.toBe(old.id);
    expect(next.rawKey).toMatch(/^prk_[0-9a-f]{16}\./);
    expect(next.scopes).toEqual(old.scopes);
    expect(next.expiresAt).toBe(old.expiresAt);

    const listed = (await (
      await callApi('GET', `${base()}/${project.id}/keys`, owner())
    ).json()) as {
      items: KeyBody[];
    };
    const shown = listed.items.find((item) => item.id === old.id)!;
    const ends = new Date(shown.expiresAt).getTime() - Date.now();
    expect(ends).toBeGreaterThan(3_500_000);
    expect(ends).toBeLessThanOrEqual(3_600_000);
    expect(shown.revokedAt).toBeNull();
  });

  it('keeps an earlier expiry of the old key', async () => {
    const project = await createProject();
    const soon = new Date(Date.now() + 600_000).toISOString();
    const old = (await (await createKey(project.id, { expiresAt: soon })).json()) as KeyBody;
    expect((await rotate(project.id, old.id)).status).toBe(201);
    const [row] = await sql<{ expires_at: Date }>(
      `SELECT expires_at FROM project_key WHERE key_id = $1`,
      [old.prefix],
    );
    expect(row!.expires_at.toISOString()).toBe(soon);
  });

  it('refuses an unknown, revoked or expired key, and a member or outsider', async () => {
    const project = await createProject();
    const key = (await (await createKey(project.id)).json()) as KeyBody;
    expect((await rotate(project.id, `pjk_${randomUUID().replaceAll('-', '')}`)).status).toBe(404);
    expect((await rotate(project.id, key.id, fx.users.viewer)).status).toBe(403);
    const asStranger = await callApi(
      'POST',
      `/v1/orgs/${fx.stranger.orgId}/projects/${project.id}/keys/${key.id}/rotate`,
      fx.stranger,
    );
    expect(asStranger.status).toBe(404);

    await callApi('DELETE', `${base()}/${project.id}/keys/${key.id}`, owner());
    expect(await code(await rotate(project.id, key.id))).toBe('conflict');

    const lapsed = (await (await createKey(project.id)).json()) as KeyBody;
    await sql(
      `UPDATE project_key SET created_at = now() - interval '2 days',
         expires_at = now() - interval '1 second' WHERE key_id = $1`,
      [lapsed.prefix],
    );
    expect(await code(await rotate(project.id, lapsed.id))).toBe('conflict');
  });

  it('counts the new key against the limit', async () => {
    const project = await createProject();
    const first = (await (await createKey(project.id)).json()) as KeyBody;
    for (let n = 1; n < 10; n += 1) await createKey(project.id);
    expect(await code(await rotate(project.id, first.id))).toBe('api_key_quota_exceeded');
  }, 120_000);

  it('records which key was replaced, without any secret', async () => {
    const project = await createProject();
    const old = (await (await createKey(project.id)).json()) as KeyBody;
    const next = (await (await rotate(project.id, old.id)).json()) as KeyBody;
    const rows = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE project_id = $1 AND action = 'project_key.rotated'`,
      [rawId(project.id)],
    );
    expect(rows).toHaveLength(1);
    const context = JSON.parse(rows[0]!.context) as { replaces: string; prefix: string };
    expect(context.replaces).toBe(old.prefix);
    expect(context.prefix).toBe(next.prefix);
    expect(JSON.stringify(rows)).not.toContain(next.rawKey.split('.')[1]!);
  });
});

describe('audit', () => {
  it('records project and key events with the project, without the key secret', async () => {
    const project = await createProject();
    const key = (await (await createKey(project.id)).json()) as KeyBody;
    await callApi('DELETE', `${base()}/${project.id}/keys/${key.id}`, owner());
    await callApi('DELETE', `${base()}/${project.id}`, owner());

    const rows = await sql<{ action: string; context: string | null }>(
      `SELECT action, context FROM audit_log WHERE project_id = $1 ORDER BY created_at`,
      [rawId(project.id)],
    );
    expect(rows.map((row) => row.action)).toEqual([
      'project.created',
      'project_key.created',
      'project_key.revoked',
      'project.deleted',
    ]);
    expect(JSON.stringify(rows)).not.toContain(key.rawKey.split('.')[1]!);
  });
});
