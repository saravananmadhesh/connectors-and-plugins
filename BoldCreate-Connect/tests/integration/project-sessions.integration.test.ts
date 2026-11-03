/**
 * Sessions of a project's users: minting through a project key, what a session token reaches on
 * sync and in the gateway's server list, how it ends, the install calls a session makes for its
 * own user, and the replay of a repeated create.
 *
 * Run: pnpm test "--only=integration"
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createDb, withTenant } from '../../packages/db/src/index.js';
import { authenticateKey } from '../../packages/domain/src/delivery/key-auth.js';
import { buildSync } from '../../packages/domain/src/delivery/sync.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { PROJECT_LIMITS } from '../../packages/limits/src/index.js';
import { loadVisibleServers } from '../../apps/gateway/src/mcp/servers.js';
import { callTool, listAllTools, type DispatchDeps } from '../../apps/gateway/src/mcp/dispatch.js';
import { apiUrl, roleConnectionString } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';

interface Host {
  projectId: string;
  rawProjectId: string;
  key: string;
}
interface Seeded {
  rawId: string;
  pluginId: string;
  name: string;
  versionWire: string;
}
interface Created {
  id: string;
  token: string;
  userId: string;
  plugins: string[];
  expiresAt: string;
  status: string;
}

const DAY = 86_400_000;
const SCOPES = ['sessions:read', 'sessions:write', 'plugins:read', 'plugins:write'];
const SCAN = JSON.stringify({
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  variables: [],
  skipped: [],
  findings: [],
});

let fx: OrgFixture;
const gateway = createDb({ connectionString: roleConnectionString('gateway'), max: 2 });
const gatewayDb = gateway.db;
const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const rawOf = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

function bearer(token: string, method: string, path: string, body?: unknown, extra = {}) {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      authorization: `Bearer ${token}`,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
      ...extra,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

let projectsMade = 0;

async function createHost(): Promise<Host> {
  projectsMade++;
  const created = await callApi('POST', base(), owner(), {
    name: `Host ${randomUUID().slice(0, 8)}`,
  });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const keyRes = await callApi('POST', `${base()}/${projectId}/keys`, owner(), {
    scopes: SCOPES,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
  });
  expect(keyRes.status).toBe(201);
  const { rawKey } = (await keyRes.json()) as { rawKey: string };
  return { projectId, rawProjectId: rawOf(projectId), key: rawKey };
}

async function seedPlugin(): Promise<Seeded> {
  const rawId = randomUUID();
  const name = `session-${rawId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Session Plugin', 'fixture', 'fixture', 'active', 'public')`,
    [rawId, name],
  );
  const version = randomUUID();
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5, 100)`,
    [version, rawId, `sha256-session-${version}`, SCAN, `sha256-archive-${version}`],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', $3, 'fixture tool', $4)`,
    [
      randomUUID(),
      version,
      `srv-${rawId.slice(0, 8)}`,
      JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' }),
    ],
  );
  return { rawId, pluginId: formatId('plg', rawId), name, versionWire: formatId('pv', version) };
}

const host = (h: Host, method: string, suffix: string, body?: unknown, extra = {}) =>
  bearer(h.key, method, `/v1/project${suffix}`, body, extra);

async function addPlugin(h: Host, plugin: Seeded): Promise<void> {
  expect((await host(h, 'PUT', `/plugins/${plugin.pluginId}`, {})).status).toBe(201);
}

async function mint(h: Host, body: Record<string, unknown> = {}): Promise<Created> {
  const res = await host(h, 'POST', '/sessions', {
    userId: `user-${randomUUID().slice(0, 8)}`,
    ...body,
  });
  expect(res.status).toBe(201);
  return (await res.json()) as Created;
}

async function syncedPlugins(token: string): Promise<string[]> {
  const res = await bearer(token, 'GET', '/v1/sync');
  expect(res.status).toBe(200);
  const body = (await res.json()) as { entries: { pluginName: string }[] };
  return body.entries.map((entry) => entry.pluginName).sort();
}

async function visibleServers(token: string): Promise<string[]> {
  const identity = await authenticateKey(gatewayDb, token);
  expect(identity).not.toBeNull();
  const principal = identity!.principal;
  return withTenant(gatewayDb, { orgId: principal.orgId }, async (tx) =>
    (await loadVisibleServers(tx, principal)).map((server) => server.pluginName).sort(),
  );
}

beforeAll(async () => {
  fx = await createOrgFixture('project-sessions');
});

// An organization holds a limited number of projects, so a new one takes over before it is full.
beforeEach(async () => {
  if (projectsMade < 14) return;
  projectsMade = 0;
  fx = await createOrgFixture('project-sessions');
});

afterAll(async () => {
  await gateway.pool.end();
});

describe('minting a session', () => {
  it('returns the token once, and the session reads back without it', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await addPlugin(h, plugin);
    const created = await mint(h, { plugins: [plugin.name] });

    expect(created.token).toMatch(/^stk_[0-9a-f]{16}\./);
    expect(created.id).toMatch(/^pjs_/);
    expect(created.plugins).toEqual([plugin.name]);
    expect(new Date(created.expiresAt).getTime()).toBeGreaterThan(Date.now());

    const got = await host(h, 'GET', `/sessions/${created.id}`);
    expect(got.status).toBe(200);
    const body = (await got.json()) as Created & { lastUsedAt: string | null };
    expect(body.id).toBe(created.id);
    expect(body.userId).toBe(created.userId);
    expect(body.status).toBe('active');
    expect(body).not.toHaveProperty('token');

    const list = await host(h, 'GET', `/sessions?userId=${encodeURIComponent(created.userId)}`);
    const page = (await list.json()) as { items: { id: string }[] };
    expect(page.items.map((item) => item.id)).toEqual([created.id]);
  });

  it('refuses a plugin the project does not have and an unknown set', async () => {
    const h = await createHost();
    const other = await seedPlugin();
    const unknown = await host(h, 'POST', '/sessions', { userId: 'u1', plugins: [other.name] });
    expect(unknown.status).toBe(400);
    const set = await host(h, 'POST', '/sessions', { userId: 'u1', set: 'no-such-set' });
    expect([404, 422]).toContain(set.status);
  });

  it('adds the plugins of a named set', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await addPlugin(h, plugin);
    const set = await host(h, 'POST', '/plugin-sets', {
      name: `Set ${randomUUID().slice(0, 8)}`,
      plugins: [plugin.pluginId],
    });
    const { name } = (await set.json()) as { name: string };
    const created = await mint(h, { set: name });
    expect(created.plugins).toEqual([plugin.name]);
  });

  it('caps the lifetime and keeps the live sessions of one user to the limit', async () => {
    const h = await createHost();
    const long = await mint(h, { expiresInSeconds: 31_536_000 });
    expect(new Date(long.expiresAt).getTime() - Date.now()).toBeLessThanOrEqual(
      31_536_000_000 + 5000,
    );
    const standard = await mint(h, {});
    const days = (new Date(standard.expiresAt).getTime() - Date.now()) / 86_400_000;
    expect(days).toBeGreaterThan(29.9);
    expect(days).toBeLessThanOrEqual(30);
    const tooLong = await host(h, 'POST', '/sessions', {
      userId: 'user-too-long',
      expiresInSeconds: 31_536_001,
    });
    expect(tooLong.status).toBe(400);

    const userId = `user-${randomUUID().slice(0, 8)}`;
    for (let index = 0; index < 20; index++) {
      expect((await host(h, 'POST', '/sessions', { userId })).status).toBe(201);
    }
    const over = await host(h, 'POST', '/sessions', { userId });
    expect(over.status).toBe(409);
  });

  it('replays one create under an Idempotency-Key, and refuses the key with another body', async () => {
    const h = await createHost();
    const userId = `user-${randomUUID().slice(0, 8)}`;
    const key = randomUUID();
    const first = await host(h, 'POST', '/sessions', { userId }, { 'Idempotency-Key': key });
    expect(first.status).toBe(201);
    const firstBody = (await first.json()) as Created;

    const again = await host(h, 'POST', '/sessions', { userId }, { 'Idempotency-Key': key });
    expect(again.status).toBe(201);
    expect(again.headers.get('idempotent-replayed')).toBe('true');
    expect(((await again.json()) as Created).token).toBe(firstBody.token);

    const other = await host(
      h,
      'POST',
      '/sessions',
      { userId, expiresInSeconds: 120 },
      { 'Idempotency-Key': key },
    );
    expect(other.status).toBe(409);

    const stored = await sql(`SELECT 1 FROM project_idempotency WHERE project_id = $1`, [
      h.rawProjectId,
    ]);
    expect(stored).toHaveLength(1);
  });

  it('does not store the token in the clear under an Idempotency-Key', async () => {
    const h = await createHost();
    const key = randomUUID();
    const first = await host(h, 'POST', '/sessions', { userId: 'u1' }, { 'Idempotency-Key': key });
    const { token } = (await first.json()) as Created;
    const rows = await sql<{ response_sealed: string }>(
      `SELECT response_sealed FROM project_idempotency WHERE project_id = $1`,
      [h.rawProjectId],
    );
    expect(rows[0]!.response_sealed).not.toContain(token);
  });

  it('carries the project request budget in headers', async () => {
    const h = await createHost();
    const res = await host(h, 'GET', '/sessions');
    expect(res.headers.get('x-ratelimit-limit')).toBe(
      String(PROJECT_LIMITS.requestsPerMinutePerProject),
    );
    expect(Number(res.headers.get('x-ratelimit-remaining'))).toBeLessThan(
      PROJECT_LIMITS.requestsPerMinutePerProject,
    );
    expect(res.headers.get('x-ratelimit-window-size')).toBe('60');
    const reset = Number(res.headers.get('x-ratelimit-reset'));
    expect(Number.isInteger(reset)).toBe(true);
    expect(reset).toBeGreaterThanOrEqual(1);
    expect(reset).toBeLessThanOrEqual(60);
  });
});

describe('what a session reaches', () => {
  it('lists only the allowed plugin on sync and in the gateway server list', async () => {
    const h = await createHost();
    const wanted = await seedPlugin();
    const unwanted = await seedPlugin();
    await addPlugin(h, wanted);
    await addPlugin(h, unwanted);

    const limited = await mint(h, { plugins: [wanted.name] });
    const open = await mint(h);
    expect(await syncedPlugins(limited.token)).toEqual([wanted.name]);
    expect(await visibleServers(limited.token)).toEqual([wanted.name]);
    expect(await syncedPlugins(open.token)).toEqual([unwanted.name, wanted.name].sort());
    expect(await visibleServers(open.token)).toEqual([unwanted.name, wanted.name].sort());
  });

  it('agrees between sync and the gateway for the same session', async () => {
    const h = await createHost();
    const one = await seedPlugin();
    const two = await seedPlugin();
    await addPlugin(h, one);
    await addPlugin(h, two);
    const session = await mint(h, { plugins: [two.name] });

    const identity = await authenticateKey(gatewayDb, session.token);
    const principal = identity!.principal;
    const manifest = await withTenant(gatewayDb, { orgId: principal.orgId }, (tx) =>
      buildSync(tx, principal, { gatewayUrl: 'http://gateway.test' }),
    );
    const synced = manifest.entries.map((entry) => entry.pluginName).sort();
    expect(synced).toEqual(await visibleServers(session.token));
  });

  it('never shows the organization installs or another project', async () => {
    const h = await createHost();
    const mine = await seedPlugin();
    const orgOnly = await seedPlugin();
    const elsewhere = await seedPlugin();
    await addPlugin(h, mine);
    expect(
      (
        await callApi('POST', `/v1/orgs/${fx.orgId}/installations`, owner(), {
          pluginVersionId: orgOnly.versionWire,
        })
      ).status,
    ).toBe(201);
    const otherHost = await createHost();
    await addPlugin(otherHost, elsewhere);

    const session = await mint(h);
    expect(await syncedPlugins(session.token)).toEqual([mine.name]);
    expect(await visibleServers(session.token)).toEqual([mine.name]);
  });

  it('hides a plugin added after the session when the session has a plugin list', async () => {
    const h = await createHost();
    const first = await seedPlugin();
    const later = await seedPlugin();
    await addPlugin(h, first);
    const limited = await mint(h, { plugins: [first.name] });
    const open = await mint(h);
    await addPlugin(h, later);
    expect(await syncedPlugins(limited.token)).toEqual([first.name]);
    expect(await syncedPlugins(open.token)).toEqual([first.name, later.name].sort());
  });

  it('shows a user their own installs and not another user of the project', async () => {
    const h = await createHost();
    const own = await seedPlugin();
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    const alice = await mint(h);
    const bob = await mint(h);
    const put = await bearer(alice.token, 'PUT', `/v1/session/plugins/${own.pluginId}`, {});
    expect(put.status).toBe(201);

    expect(await syncedPlugins(alice.token)).toEqual([own.name]);
    expect(await syncedPlugins(bob.token)).toEqual([]);
    expect(await visibleServers(alice.token)).toEqual([own.name]);
    expect(await visibleServers(bob.token)).toEqual([]);
  });
});

describe('how a session ends', () => {
  it('stops working when revoked, and revoking again is not an error', async () => {
    const h = await createHost();
    const session = await mint(h);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(200);
    expect((await host(h, 'DELETE', `/sessions/${session.id}`)).status).toBe(204);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
    expect((await host(h, 'DELETE', `/sessions/${session.id}`)).status).toBe(204);
    const got = (await (await host(h, 'GET', `/sessions/${session.id}`)).json()) as {
      status: string;
    };
    expect(got.status).toBe('revoked');
  });

  it('stops working once expired', async () => {
    const h = await createHost();
    const session = await mint(h);
    await sql(`UPDATE api_key SET expires_at = now() - interval '1 minute' WHERE key_id = $1`, [
      session.token.split('.')[0],
    ]);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
  });

  it('stops working when the project is suspended', async () => {
    const h = await createHost();
    const session = await mint(h);
    const paused = await callApi('PATCH', `${base()}/${h.projectId}`, owner(), {
      status: 'suspended',
    });
    expect(paused.status).toBe(200);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
  });

  it('stops working when the project user is deleted', async () => {
    const h = await createHost();
    const userRes = await host(h, 'PUT', '/users', { userId: 'to-delete' });
    const { id } = (await userRes.json()) as { id: string };
    const session = await mint(h, { userId: 'to-delete' });
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(200);
    const removed = await callApi('DELETE', `${base()}/${h.projectId}/users/${id}`, owner());
    expect(removed.status).toBe(204);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
  });

  it('ends the sessions limited to a plugin when the project removes it', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    const kept = await seedPlugin();
    await addPlugin(h, plugin);
    await addPlugin(h, kept);
    const limited = await mint(h, { plugins: [plugin.name] });
    const unaffected = await mint(h, { plugins: [kept.name] });
    expect((await host(h, 'DELETE', `/plugins/${plugin.pluginId}`)).status).toBe(204);
    expect((await bearer(limited.token, 'GET', '/v1/sync')).status).toBe(401);
    expect((await bearer(unaffected.token, 'GET', '/v1/sync')).status).toBe(200);
  });
});

describe('across projects', () => {
  it('answers 404 for another project session and lists only its own', async () => {
    const a = await createHost();
    const b = await createHost();
    const inA = await mint(a);
    const inB = await mint(b);
    expect((await host(b, 'GET', `/sessions/${inA.id}`)).status).toBe(404);
    expect((await host(b, 'DELETE', `/sessions/${inA.id}`)).status).toBe(404);
    expect((await bearer(inA.token, 'GET', '/v1/sync')).status).toBe(200);
    const page = (await (await host(b, 'GET', '/sessions')).json()) as { items: { id: string }[] };
    expect(page.items.map((item) => item.id)).toEqual([inB.id]);
  });

  it('keeps a session token out of the project and console routes', async () => {
    const h = await createHost();
    const session = await mint(h);
    expect((await bearer(session.token, 'GET', '/v1/project/sessions')).status).toBe(401);
    expect(
      (await bearer(session.token, 'POST', '/v1/project/sessions', { userId: 'x' })).status,
    ).toBe(401);
  });

  it('shows the console the sessions and lets it revoke one', async () => {
    const h = await createHost();
    const session = await mint(h);
    const list = await callApi('GET', `${base()}/${h.projectId}/sessions`, owner());
    expect(((await list.json()) as { items: { id: string }[] }).items.map((i) => i.id)).toEqual([
      session.id,
    ]);
    const revoked = await callApi(
      'DELETE',
      `${base()}/${h.projectId}/sessions/${session.id}`,
      owner(),
    );
    expect(revoked.status).toBe(204);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
  });
});

describe('the catalog a session sees', () => {
  it('is empty while installs are off, lists allowed plugins in allowlist mode and everything in any mode', async () => {
    const h = await createHost();
    const allowed = await seedPlugin();
    const other = await seedPlugin();
    let session = await mint(h);

    const ids = async () => {
      const res = await bearer(session.token, 'GET', '/v1/session/catalog?limit=100');
      expect(res.status).toBe(200);
      const body = (await res.json()) as { items: { id: string; installed: boolean }[] };
      return body.items;
    };
    // Users install only once the project opens it; turning it off empties the catalog.
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    expect((await ids()).map((item) => item.id)).toContain(other.pluginId);
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'off' })).status).toBe(200);
    expect(await ids()).toEqual([]);

    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'allowlist' })).status).toBe(200);
    expect((await host(h, 'PUT', `/allowed-plugins/${allowed.pluginId}`)).status).toBe(201);
    const listed = (await ids()).map((item) => item.id);
    expect(listed).toContain(allowed.pluginId);
    expect(listed).not.toContain(other.pluginId);

    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    expect((await ids()).map((item) => item.id)).toContain(other.pluginId);

    // A session carries the install permission only when the project lets users install at creation.
    session = await mint(h);
    expect(
      (await bearer(session.token, 'PUT', `/v1/session/plugins/${other.pluginId}`, {})).status,
    ).toBe(201);
    const after = await ids();
    expect(after.find((item) => item.id === other.pluginId)?.installed).toBe(true);
    expect(after.find((item) => item.id === allowed.pluginId)?.installed).toBe(false);
  });

  it('refuses an install the project does not allow, and one while the mode is off', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'off' })).status).toBe(200);
    const session = await mint(h);
    const off = await bearer(session.token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {});
    expect(off.status).toBe(403);

    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'allowlist' })).status).toBe(200);
    const fresh = await mint(h);
    const denied = await bearer(fresh.token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {});
    expect(denied.status).toBe(403);
  });

  it('removes an install the user made', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    const session = await mint(h);
    expect(
      (await bearer(session.token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {})).status,
    ).toBe(201);
    const list = await bearer(session.token, 'GET', '/v1/session/plugins');
    expect(((await list.json()) as { items: unknown[] }).items).toHaveLength(1);
    expect(
      (await bearer(session.token, 'DELETE', `/v1/session/plugins/${plugin.pluginId}`)).status,
    ).toBe(204);
    expect(
      (await bearer(session.token, 'DELETE', `/v1/session/plugins/${plugin.pluginId}`)).status,
    ).toBe(404);
  });

  it('installs and updates a chosen version by its id', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    const session = await mint(h);
    const body = { versionId: plugin.versionWire };
    const path = `/v1/session/plugins/${plugin.pluginId}`;
    const created = await bearer(session.token, 'PUT', path, body);
    expect(created.status).toBe(201);
    expect(((await created.json()) as { versionId: string }).versionId).toBe(plugin.versionWire);
    const again = await bearer(session.token, 'PUT', path, body);
    expect(again.status).toBe(200);
    expect(((await again.json()) as { versionId: string }).versionId).toBe(plugin.versionWire);
  });

  it('shows the state of an install and lets the user change their own values and components', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    const session = await mint(h);
    expect(
      (await bearer(session.token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {})).status,
    ).toBe(201);

    type State = {
      pluginId: string;
      removable: boolean;
      components: { componentId: string; enabled: boolean }[];
      variables: { name: string; isSet: boolean }[];
    };
    const read = async (): Promise<State> => {
      const res = await bearer(session.token, 'GET', '/v1/session/plugins');
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).not.toContain('s3cret-value');
      return (JSON.parse(text) as { items: State[] }).items[0]!;
    };

    const before = await read();
    expect(before.pluginId).toBe(plugin.pluginId);
    expect(before.removable).toBe(true);
    const component = before.components[0]!;
    expect(component.enabled).toBe(true);

    const put = await bearer(
      session.token,
      'PUT',
      `/v1/session/plugins/${plugin.pluginId}/variables`,
      {
        values: { MY_NOTE: 's3cret-value' },
      },
    );
    expect(put.status).toBe(200);
    expect(await put.text()).not.toContain('s3cret-value');

    const off = await bearer(
      session.token,
      'PUT',
      `/v1/session/plugins/${plugin.pluginId}/components/${component.componentId}`,
      { enabled: false },
    );
    expect(off.status).toBe(200);

    const after = await read();
    expect(after.components[0]?.enabled).toBe(false);
    expect(after.variables).toContainEqual(
      expect.objectContaining({ name: 'MY_NOTE', isSet: true }),
    );

    const missing = await bearer(
      session.token,
      'PUT',
      `/v1/session/plugins/${plugin.pluginId}/components/${formatId('cmp', randomUUID())}`,
      { enabled: true },
    );
    expect(missing.status).toBe(404);
  });
});

describe('the tool policy of a session', () => {
  const deps = { db: gatewayDb } as unknown as DispatchDeps;

  async function serverWithTools(h: Host, plugin: Seeded): Promise<string> {
    const rows = await sql<{ installation_id: string; component_id: string; name: string }>(
      `SELECT ic.installation_id, ic.component_id, c.name
         FROM installation_component ic
         JOIN installation i ON i.id = ic.installation_id
         JOIN component c ON c.id = ic.component_id
        WHERE i.project_id = $1 AND i.plugin_id = $2`,
      [h.rawProjectId, plugin.rawId],
    );
    const row = rows[0]!;
    const tools = [
      { name: 'read_file', description: 'Reads', inputSchema: {}, destructive: false },
      { name: 'delete_all', description: 'Deletes', inputSchema: {}, destructive: true },
    ];
    await sql(
      `INSERT INTO mcp_server (installation_id, component_id, organization_id, tools, tools_refreshed_at)
       VALUES ($1, $2, $3, $4, now())`,
      [row.installation_id, row.component_id, rawOf(fx.orgId), JSON.stringify(tools)],
    );
    return row.name;
  }

  async function principalOf(token: string) {
    const identity = await authenticateKey(gatewayDb, token);
    return identity!.principal;
  }

  it('hides and refuses a disabled tool, and leaves the rest', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await addPlugin(h, plugin);
    const server = await serverWithTools(h, plugin);
    const session = await mint(h, { tools: { disable: [`${server}.delete_all`] } });
    const principal = await principalOf(session.token);

    const listing = await listAllTools(deps, principal);
    expect(listing.tools.map((tool) => tool.name)).toEqual([`${server}__read_file`]);
    expect(await callTool(deps, principal, `${server}__delete_all`, {})).toEqual({
      kind: 'tool_disabled',
    });
  });

  it('hides destructive tools when asked to', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await addPlugin(h, plugin);
    const server = await serverWithTools(h, plugin);
    const session = await mint(h, { tools: { disableDestructive: true } });
    const principal = await principalOf(session.token);

    const listing = await listAllTools(deps, principal);
    expect(listing.tools.map((tool) => tool.name)).toEqual([`${server}__read_file`]);
    expect(await callTool(deps, principal, `${server}__delete_all`, {})).toEqual({
      kind: 'tool_disabled',
    });
  });

  it('lists every tool for a session without a policy', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await addPlugin(h, plugin);
    const server = await serverWithTools(h, plugin);
    const principal = await principalOf((await mint(h)).token);
    const listing = await listAllTools(deps, principal);
    expect(listing.tools.map((tool) => tool.name).sort()).toEqual([
      `${server}__delete_all`,
      `${server}__read_file`,
    ]);
  });

  it('keeps the policy on the stored session and reads it back', async () => {
    const h = await createHost();
    const session = await mint(h, { tools: { disable: ['some-server.some_tool'] } });
    const got = (await (await host(h, 'GET', `/sessions/${session.id}`)).json()) as {
      tools: { disable?: string[] };
    };
    expect(got.tools.disable).toEqual(['some-server.some_tool']);
  });
});
