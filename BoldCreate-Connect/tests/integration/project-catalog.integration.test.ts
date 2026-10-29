/**
 * What a project offers its users and what they installed: the catalog, the install mode, the
 * allowed list, plugin sets and the host's installs for a user, through a project key and through
 * the console, plus the install rule itself checked in process.
 *
 * Run: pnpm test "--only=integration"
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDb, withTenant } from '../../packages/db/src/index.js';
import { canUserInstall } from '../../packages/domain/src/project/allowed-catalog.js';
import { installForUser } from '../../packages/domain/src/project/user-plugins.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
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
}
interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

const DAY = 86_400_000;
const SCOPES = ['plugins:read', 'plugins:write'];
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
const db = createDb({ connectionString: roleConnectionString('api'), max: 2 });
const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const rawOf = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

function viaKey(key: string, method: string, path: string, body?: unknown): Promise<Response> {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      authorization: `Bearer ${key}`,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

async function createHost(): Promise<Host> {
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

async function seedPlugin(
  options: {
    visibility?: 'public' | 'private';
    publisher?: string;
    status?: string;
    name?: string;
    requiredVariable?: string;
  } = {},
): Promise<Seeded> {
  const rawId = randomUUID();
  const scan =
    options.requiredVariable === undefined
      ? SCAN
      : JSON.stringify({
          ...JSON.parse(SCAN),
          variables: [
            {
              name: options.requiredVariable,
              description: 'fixture',
              required: true,
              secret: true,
            },
          ],
        });
  const label = options.name ?? `catalog-${rawId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility, publisher_organization_id)
     VALUES ($1, $2, 'Catalog Plugin', 'fixture', 'fixture', $3, $4, $5)`,
    [
      rawId,
      label,
      options.status ?? 'active',
      options.visibility ?? 'public',
      options.publisher ?? null,
    ],
  );
  const version = randomUUID();
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4)`,
    [version, rawId, `sha256-catalog-${version}`, scan],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', 'tool', 'fixture tool', $3)`,
    [
      randomUUID(),
      version,
      JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' }),
    ],
  );
  return { rawId, pluginId: formatId('plg', rawId) };
}

const host = (h: Host, method: string, suffix: string, body?: unknown) =>
  viaKey(h.key, method, `/v1/project${suffix}`, body);
const consoleCall = (h: Host, method: string, suffix: string, body?: unknown, who = owner()) =>
  callApi(method, `${base()}/${h.projectId}${suffix}`, who, body);

beforeAll(async () => {
  fx = await createOrgFixture('project-catalog');
});

afterAll(async () => {
  await db.pool.end();
});

describe('the catalog', () => {
  it('lists public and own private plugins, never another organization private or suspended ones', async () => {
    const h = await createHost();
    const tag = randomUUID().slice(0, 8);
    const pub = await seedPlugin({ name: `cat-${tag}-pub` });
    const own = await seedPlugin({
      name: `cat-${tag}-own`,
      visibility: 'private',
      publisher: rawOf(fx.orgId),
    });
    const foreign = await seedPlugin({
      name: `cat-${tag}-foreign`,
      visibility: 'private',
      publisher: rawOf(fx.stranger.orgId),
    });
    const suspended = await seedPlugin({ name: `cat-${tag}-susp`, status: 'suspended' });

    const res = await host(h, 'GET', `/catalog?q=cat-${tag}`);
    expect(res.status).toBe(200);
    const page = (await res.json()) as Page<{ id: string }>;
    const ids = page.items.map((item) => item.id);
    expect(ids).toContain(pub.pluginId);
    expect(ids).toContain(own.pluginId);
    expect(ids).not.toContain(foreign.pluginId);
    expect(ids).not.toContain(suspended.pluginId);

    expect((await host(h, 'GET', `/catalog/${pub.pluginId}`)).status).toBe(200);
    expect((await host(h, 'GET', `/catalog/${foreign.pluginId}`)).status).toBe(404);
  });

  it('pages', async () => {
    const h = await createHost();
    const tag = randomUUID().slice(0, 8);
    for (const n of [1, 2, 3]) await seedPlugin({ name: `pg-${tag}-${n}` });
    const first = (await (
      await host(h, 'GET', `/catalog?q=pg-${tag}&limit=2`)
    ).json()) as Page<unknown>;
    expect(first.items).toHaveLength(2);
    const next = (await (
      await host(h, 'GET', `/catalog?q=pg-${tag}&limit=2&page=2`)
    ).json()) as Page<unknown>;
    expect(next.items).toHaveLength(1);
  });
});

describe('the install mode and the allowed list', () => {
  it('defaults to any, changes, and refuses an unknown mode', async () => {
    const h = await createHost();
    expect(await (await host(h, 'GET', '/user-install-mode')).json()).toEqual({ mode: 'any' });
    const put = await host(h, 'PUT', '/user-install-mode', { mode: 'allowlist' });
    expect(put.status).toBe(200);
    expect(await put.json()).toEqual({ mode: 'allowlist' });
    expect((await host(h, 'PUT', '/user-install-mode', { mode: 'sometimes' })).status).toBe(400);
  });

  it('allows and disallows a plugin, and refuses one the project cannot offer', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    const foreign = await seedPlugin({
      visibility: 'private',
      publisher: rawOf(fx.stranger.orgId),
    });
    expect((await host(h, 'PUT', `/allowed-plugins/${plugin.pluginId}`)).status).toBe(201);
    expect((await host(h, 'PUT', `/allowed-plugins/${plugin.pluginId}`)).status).toBe(200);
    expect((await host(h, 'PUT', `/allowed-plugins/${foreign.pluginId}`)).status).toBe(422);
    const list = (await (await host(h, 'GET', '/allowed-plugins')).json()) as Page<{
      pluginId: string;
    }>;
    expect(list.items.map((item) => item.pluginId)).toEqual([plugin.pluginId]);
    expect((await host(h, 'DELETE', `/allowed-plugins/${plugin.pluginId}`)).status).toBe(204);
    expect((await host(h, 'DELETE', `/allowed-plugins/${plugin.pluginId}`)).status).toBe(404);
  });
});

describe('plugin sets', () => {
  it('creates, renames, changes members and deletes', async () => {
    const h = await createHost();
    const a = await seedPlugin();
    const b = await seedPlugin();
    const created = await host(h, 'POST', '/plugin-sets', { name: 'core', plugins: [a.pluginId] });
    expect(created.status).toBe(201);
    const set = (await created.json()) as { id: string; plugins: { pluginId: string }[] };
    expect(set.plugins.map((p) => p.pluginId)).toEqual([a.pluginId]);

    expect((await host(h, 'POST', '/plugin-sets', { name: 'core' })).status).toBe(409);

    const renamed = await host(h, 'PATCH', `/plugin-sets/${set.id}`, { name: 'base' });
    expect(renamed.status).toBe(200);
    expect(((await renamed.json()) as { name: string }).name).toBe('base');

    const added = await host(h, 'PUT', `/plugin-sets/${set.id}/plugins/${b.pluginId}`);
    expect(added.status).toBe(200);
    expect(((await added.json()) as { plugins: unknown[] }).plugins).toHaveLength(2);
    expect((await host(h, 'DELETE', `/plugin-sets/${set.id}/plugins/${b.pluginId}`)).status).toBe(
      204,
    );
    expect((await host(h, 'DELETE', `/plugin-sets/${set.id}/plugins/${b.pluginId}`)).status).toBe(
      404,
    );

    const list = (await (await host(h, 'GET', '/plugin-sets')).json()) as Page<{ id: string }>;
    expect(list.items.map((item) => item.id)).toEqual([set.id]);
    expect((await host(h, 'DELETE', `/plugin-sets/${set.id}`)).status).toBe(204);
    expect((await host(h, 'GET', `/plugin-sets/${set.id}`)).status).toBe(404);
  });

  it('does not show a set to another project, and stops at the limit', async () => {
    const h = await createHost();
    const other = await createHost();
    const created = await host(h, 'POST', '/plugin-sets', { name: 'mine' });
    const { id } = (await created.json()) as { id: string };
    expect((await host(other, 'GET', `/plugin-sets/${id}`)).status).toBe(404);
    for (let n = 1; n < 20; n++) {
      expect((await host(h, 'POST', '/plugin-sets', { name: `s${n}` })).status).toBe(201);
    }
    expect((await host(h, 'POST', '/plugin-sets', { name: 'one-too-many' })).status).toBe(409);
  });
});

describe('installs for a project user', () => {
  it('installs for a new user, repeats, lists, removes, and keeps the project list clean', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    const put = await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' });
    expect(put.status).toBe(201);
    expect(
      (await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' })).status,
    ).toBe(200);

    const list = (await (await host(h, 'GET', '/user-plugins?userId=ada')).json()) as Page<{
      pluginId: string;
    }>;
    expect(list.items.map((item) => item.pluginId)).toEqual([plugin.pluginId]);
    const unknown = (await (
      await host(h, 'GET', '/user-plugins?userId=nobody')
    ).json()) as Page<unknown>;
    expect(unknown.items).toEqual([]);

    const projectList = (await (await host(h, 'GET', '/plugins')).json()) as Page<unknown>;
    expect(projectList.items).toEqual([]);

    expect((await host(h, 'DELETE', `/user-plugins/${plugin.pluginId}?userId=ada`)).status).toBe(
      204,
    );
    expect((await host(h, 'DELETE', `/user-plugins/${plugin.pluginId}?userId=ada`)).status).toBe(
      404,
    );
    expect((await host(h, 'DELETE', `/user-plugins/${plugin.pluginId}?userId=ghost`)).status).toBe(
      404,
    );
  });

  it('stops one user at the install limit', async () => {
    const h = await createHost();
    for (let n = 0; n < 25; n++) {
      const plugin = await seedPlugin();
      expect(
        (await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'bob' })).status,
      ).toBe(201);
    }
    const extra = await seedPlugin();
    expect(
      (await host(h, 'PUT', `/user-plugins/${extra.pluginId}`, { userId: 'bob' })).status,
    ).toBe(409);
  });
});

interface StateItem {
  pluginId: string;
  source: string;
  removable: boolean;
  installedAt: string;
  components: { componentId: string; kind: string; enabled: boolean }[];
  variables: { name: string; isSet: boolean }[];
  mcp: { setup: { kind: string; names?: string[] }; ready: boolean; connection?: unknown }[];
}

const stateOf = async (h: Host, userId: string): Promise<StateItem[]> =>
  ((await (await host(h, 'GET', `/user-plugins?userId=${userId}`)).json()) as Page<StateItem>)
    .items;

describe('the state of a project user', () => {
  it('shows components, variables and what is left to do, and follows writes', async () => {
    const h = await createHost();
    const plugin = await seedPlugin({ requiredVariable: 'API_TOKEN' });
    await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' });

    const [before] = await stateOf(h, 'ada');
    expect(before?.source).toBe('user');
    expect(before?.removable).toBe(true);
    expect(before?.variables).toEqual([
      expect.objectContaining({ name: 'API_TOKEN', isSet: false }),
    ]);
    expect(before?.mcp[0]?.setup).toEqual({ kind: 'variables', names: ['API_TOKEN'] });
    expect(before?.mcp[0]?.ready).toBe(false);

    const put = await host(h, 'PUT', `/user-plugins/${plugin.pluginId}/variables`, {
      userId: 'ada',
      values: { API_TOKEN: 'secret-value' },
    });
    expect(put.status).toBe(200);
    expect(JSON.stringify(await put.json())).not.toContain('secret-value');
    const [after] = await stateOf(h, 'ada');
    expect(after?.variables[0]?.isSet).toBe(true);
    expect(after?.mcp[0]?.setup).toEqual({ kind: 'none' });
    expect(after?.mcp[0]?.ready).toBe(true);

    const componentId = after?.components[0]?.componentId ?? '';
    const off = await host(h, 'PUT', `/user-plugins/${plugin.pluginId}/components/${componentId}`, {
      userId: 'ada',
      enabled: false,
    });
    expect(off.status).toBe(200);
    expect((await stateOf(h, 'ada'))[0]?.components[0]?.enabled).toBe(false);

    const actions = await sql(
      `SELECT action FROM audit_log WHERE project_id = $1 AND action IN ('user_plugin.variables_updated', 'user_plugin.component_updated')`,
      [h.rawProjectId],
    );
    expect(actions.map((row) => row.action).sort()).toEqual([
      'user_plugin.component_updated',
      'user_plugin.variables_updated',
    ]);
  });

  it('keeps a component preference per user on a project plugin, and an admin off still wins', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', `/plugins/${plugin.pluginId}`, {})).status).toBeLessThan(300);
    // An install for a user creates the user; this one is a different plugin, so both users
    // still reach the project's plugin through the shared install.
    const other = await seedPlugin();
    for (const userId of ['ada', 'bob']) {
      await host(h, 'PUT', `/user-plugins/${other.pluginId}`, { userId });
    }
    const componentOf = async (userId: string) =>
      (await stateOf(h, userId)).find((item) => item.pluginId === plugin.pluginId)?.components[0];
    const toggle = (userId: string, componentId: string, enabled: boolean) =>
      host(h, 'PUT', `/user-plugins/${plugin.pluginId}/components/${componentId}`, {
        userId,
        enabled,
      });

    const start = await componentOf('ada');
    expect(start?.enabled).toBe(true);
    const componentId = start?.componentId ?? '';

    expect((await toggle('ada', componentId, false)).status).toBe(200);
    expect((await componentOf('ada'))?.enabled).toBe(false);
    expect((await componentOf('bob'))?.enabled).toBe(true);

    expect((await toggle('ada', componentId, true)).status).toBe(200);
    expect((await componentOf('ada'))?.enabled).toBe(true);

    await sql(
      `UPDATE installation_component SET enabled = false
       WHERE installation_id IN (SELECT id FROM installation WHERE project_id = $1)`,
      [h.rawProjectId],
    );
    expect((await toggle('ada', componentId, true)).status).toBe(200);
    expect((await componentOf('ada'))?.enabled).toBe(false);

    expect((await toggle('ada', formatId('cmp', randomUUID()), false)).status).toBe(404);
  });

  it('clears a component preference so the user follows the install again', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    expect((await host(h, 'PUT', `/plugins/${plugin.pluginId}`, {})).status).toBeLessThan(300);
    const other = await seedPlugin();
    await host(h, 'PUT', `/user-plugins/${other.pluginId}`, { userId: 'ada' });
    const componentOf = async () =>
      (await stateOf(h, 'ada')).find((item) => item.pluginId === plugin.pluginId)?.components[0];
    const componentId = (await componentOf())?.componentId ?? '';
    const path = `/user-plugins/${plugin.pluginId}/components/${componentId}`;

    await host(h, 'PUT', path, { userId: 'ada', enabled: false });
    expect((await componentOf())?.enabled).toBe(false);

    expect((await host(h, 'DELETE', `${path}?userId=ada`)).status).toBe(200);
    expect((await componentOf())?.enabled).toBe(true);
    expect((await host(h, 'DELETE', `${path}?userId=ada`)).status).toBe(200);

    const missing = `/user-plugins/${plugin.pluginId}/components/${formatId('cmp', randomUUID())}`;
    expect((await host(h, 'DELETE', `${missing}?userId=ada`)).status).toBe(404);
  });

  it('leaves the sign-in out for a key without connections:read', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' });
    const keyRes = await callApi('POST', `${base()}/${h.projectId}/keys`, owner(), {
      scopes: ['plugins:read'],
      expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
    });
    const { rawKey } = (await keyRes.json()) as { rawKey: string };
    const res = await viaKey(rawKey, 'GET', '/v1/project/user-plugins?userId=ada');
    const [item] = ((await res.json()) as Page<StateItem>).items;
    expect(item?.mcp[0]).not.toHaveProperty('connection');
  });

  it('refuses a write for an unknown user or another project', async () => {
    const h = await createHost();
    const other = await createHost();
    const plugin = await seedPlugin({ requiredVariable: 'API_TOKEN' });
    await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' });
    const body = { userId: 'ghost', values: { API_TOKEN: 'x' } };
    expect((await host(h, 'PUT', `/user-plugins/${plugin.pluginId}/variables`, body)).status).toBe(
      404,
    );
    expect(
      (
        await host(other, 'PUT', `/user-plugins/${plugin.pluginId}/variables`, {
          ...body,
          userId: 'ada',
        })
      ).status,
    ).toBe(404);
    expect(await stateOf(other, 'ada')).toEqual([]);
  });

  it('shows the same state through the console', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    await host(h, 'PUT', `/user-plugins/${plugin.pluginId}`, { userId: 'ada' });
    const rows = await sql(`SELECT id FROM "user" WHERE project_id = $1 AND external_ref = 'ada'`, [
      h.rawProjectId,
    ]);
    const res = await consoleCall(
      h,
      'GET',
      `/users/${formatId('usr', rows[0]?.id as string)}/plugins`,
    );
    expect(res.status).toBe(200);
    const { items } = (await res.json()) as Page<StateItem>;
    expect(items.map((i) => i.pluginId)).toEqual([plugin.pluginId]);
    expect(items[0]?.mcp[0]).toHaveProperty('connection', null);
  });
});

describe('the install rule for users', () => {
  it('follows the mode, the allowed list and sets', async () => {
    const h = await createHost();
    const direct = await seedPlugin();
    const viaSet = await seedPlugin();
    const neither = await seedPlugin();
    const scope = { projectId: h.rawProjectId, organizationId: rawOf(fx.orgId) };
    await host(h, 'PUT', `/allowed-plugins/${direct.pluginId}`);
    const set = (await (
      await host(h, 'POST', '/plugin-sets', { name: 'extra', plugins: [viaSet.pluginId] })
    ).json()) as { id: string };
    expect(set.id).toBeTruthy();

    const check = (pluginRaw: string) =>
      withTenant(db.db, { orgId: scope.organizationId }, (tx) =>
        canUserInstall(tx, scope, pluginRaw),
      );

    expect(await check(neither.rawId)).toBe(true);
    await host(h, 'PUT', '/user-install-mode', { mode: 'off' });
    expect(await check(direct.rawId)).toBe(false);
    await host(h, 'PUT', '/user-install-mode', { mode: 'allowlist' });
    expect(await check(direct.rawId)).toBe(true);
    expect(await check(viaSet.rawId)).toBe(true);
    expect(await check(neither.rawId)).toBe(false);
    await host(h, 'PUT', '/user-install-mode', { mode: 'any' });
    expect(await check(neither.rawId)).toBe(true);
  });

  it('refuses an install for a user when the rule says no', async () => {
    const h = await createHost();
    const plugin = await seedPlugin();
    const other = await seedPlugin();
    expect((await host(h, 'PUT', `/user-plugins/${other.pluginId}`, { userId: 'cy' })).status).toBe(
      201,
    );
    const [user] = await sql<{ id: string }>(
      `SELECT id FROM "user" WHERE project_id = $1 LIMIT 1`,
      [h.rawProjectId],
    );
    const caller = {
      projectId: h.rawProjectId,
      organizationId: rawOf(fx.orgId),
      actor: { kind: 'user_session' as const, id: fx.users.admin.rawUserId },
    };
    await host(h, 'PUT', '/user-install-mode', { mode: 'allowlist' });
    await expect(
      withTenant(db.db, { orgId: caller.organizationId }, (tx) =>
        installForUser(tx, caller, user!.id, plugin.rawId, undefined, { checkAllowed: true }),
      ),
    ).rejects.toMatchObject({ code: 'install_not_allowed' });
  });
});

describe('through the console', () => {
  it('lets a member read and not write, and keeps outsiders out', async () => {
    const h = await createHost();
    expect((await consoleCall(h, 'GET', '/user-install-mode')).status).toBe(200);
    expect((await consoleCall(h, 'PUT', '/user-install-mode', { mode: 'any' })).status).toBe(200);
    expect(
      (await consoleCall(h, 'GET', '/user-install-mode', undefined, fx.users.viewer)).status,
    ).toBe(200);
    expect(
      (await consoleCall(h, 'PUT', '/user-install-mode', { mode: 'off' }, fx.users.viewer)).status,
    ).toBe(403);
    expect(
      (await consoleCall(h, 'GET', '/user-install-mode', undefined, fx.stranger)).status,
    ).not.toBe(200);
  });
});
