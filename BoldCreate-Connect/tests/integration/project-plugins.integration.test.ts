/**
 * The plugins a project delivers and the settings they need, through a project key and through
 * the console: adding, moving to another version, removing, setting variables that are never read
 * back, the scopes that guard each route, and the isolation between projects and organizations.
 *
 * Run: pnpm test "--only=integration"
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { apiUrl } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';

interface PluginBody {
  pluginId: string;
  name: string;
  displayName: string;
  versionId: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}
interface ConfigBody {
  id: string;
  componentId: string | null;
  pluginId: string;
  pluginName: string;
  serverName: string;
  authMode: string;
  isDefault: boolean;
  secretSet: boolean;
  variables: { name: string; isSet: boolean; required: boolean }[];
  name?: string;
  tools?: { name: string; description: string }[];
}
interface ServerBody {
  componentId: string;
  pluginId: string;
  pluginName: string;
  pluginDisplayName: string;
  serverName: string;
  url: string | null;
  variables: { name: string; isSet: boolean; required: boolean }[];
  authConfigCount: number;
  defaultAuthConfigId: string | null;
}
interface Host {
  projectId: string;
  rawProjectId: string;
  key: string;
}
interface Seeded {
  rawId: string;
  pluginId: string;
  versions: { raw: string; wire: string; version: string }[];
}

const DAY = 86_400_000;
const ALL = [
  'plugins:read',
  'plugins:write',
  'auth-configs:read',
  'auth-configs:write',
  'connections:write',
  'sessions:write',
  'tools:read',
];
const SCAN = JSON.stringify({
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  variables: [
    { name: 'API_TOKEN', description: 'Token', required: true, secret: true },
    { name: 'REGION', description: 'Region', required: false, secret: false },
  ],
  skipped: [],
  findings: [],
});

let fx: OrgFixture;
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

async function createHost(scopes: string[] = ALL): Promise<Host> {
  const created = await callApi('POST', base(), owner(), {
    name: `Host ${randomUUID().slice(0, 8)}`,
  });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const keyRes = await callApi('POST', `${base()}/${projectId}/keys`, owner(), {
    scopes,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
  });
  expect(keyRes.status).toBe(201);
  const { rawKey } = (await keyRes.json()) as { rawKey: string };
  return { projectId, rawProjectId: rawOf(projectId), key: rawKey };
}

/** A published plugin whose versions each have one MCP component named `tool`. */
async function seedPlugin(
  options: { versions?: string[]; visibility?: 'public' | 'private'; publisher?: string } = {},
): Promise<Seeded> {
  const rawId = randomUUID();
  const label = `project-plugin-${rawId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility, publisher_organization_id)
     VALUES ($1, $2, 'Project Plugin', 'fixture', 'fixture', 'active', $3, $4)`,
    [rawId, label, options.visibility ?? 'public', options.publisher ?? null],
  );
  const versions: Seeded['versions'] = [];
  for (const [index, version] of (options.versions ?? ['1.0.0']).entries()) {
    const raw = randomUUID();
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
         manifest_schema_version, manifest, manifest_sha256, status, scan)
       VALUES ($1, $2, $3, 1, $4, 0, '1', '{}', $5, 'published', $6)`,
      [raw, rawId, version, index, `sha256-project-plugin-${raw}`, SCAN],
    );
    await sql(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', 'tool', 'fixture tool', $3)`,
      [randomUUID(), raw, JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' })],
    );
    versions.push({ raw, wire: formatId('pv', raw), version });
  }
  return { rawId, pluginId: formatId('plg', rawId), versions };
}

const putPlugin = (host: Host, plugin: Seeded, body: unknown = {}) =>
  viaKey(host.key, 'PUT', `/v1/project/plugins/${plugin.pluginId}`, body);

async function installationOf(host: Host, plugin: Seeded): Promise<string> {
  const rows = await sql<{ id: string }>(
    `SELECT id FROM installation WHERE project_id = $1 AND plugin_id = $2 AND scope = 'project'`,
    [host.rawProjectId, plugin.rawId],
  );
  return rows[0]!.id;
}

beforeAll(async () => {
  fx = await createOrgFixture('project-plugins');
});

describe('a project key adds plugins', () => {
  it('adds the latest published version first, and answers the same state on a repeat', async () => {
    const host = await createHost();
    const plugin = await seedPlugin({ versions: ['1.0.0', '1.1.0'] });

    const added = await putPlugin(host, plugin);
    expect(added.status).toBe(201);
    const body = (await added.json()) as PluginBody;
    expect(body.pluginId).toBe(plugin.pluginId);
    expect(body.versionId).toBe(plugin.versions[1]!.wire);
    expect(body.version).toBe('1.1.0');

    const again = await putPlugin(host, plugin);
    expect(again.status).toBe(200);
    expect(((await again.json()) as PluginBody).versionId).toBe(plugin.versions[1]!.wire);

    const list = await viaKey(host.key, 'GET', '/v1/project/plugins');
    expect(list.status).toBe(200);
    const page = (await list.json()) as { items: PluginBody[]; nextCursor: string | null };
    expect(page.items.map((item) => item.pluginId)).toEqual([plugin.pluginId]);
    expect(page.nextCursor).toBeNull();
  });

  it('adds the version it is told to, and skips a blocked one when it picks the latest', async () => {
    const host = await createHost();
    const plugin = await seedPlugin({ versions: ['1.0.0', '1.1.0'] });
    await sql(`UPDATE plugin_version SET execution_blocked_at = now() WHERE id = $1`, [
      plugin.versions[1]!.raw,
    ]);

    const named = await putPlugin(host, plugin, { versionId: plugin.versions[1]!.wire });
    expect(named.status).toBe(409);

    const latest = await putPlugin(host, plugin);
    expect(latest.status).toBe(201);
    expect(((await latest.json()) as PluginBody).version).toBe('1.0.0');
  });

  it('refuses an unknown plugin, a version of another plugin and a malformed version id', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    const other = await seedPlugin();

    expect(
      (await viaKey(host.key, 'PUT', `/v1/project/plugins/${formatId('plg', randomUUID())}`, {}))
        .status,
    ).toBe(404);
    expect((await putPlugin(host, plugin, { versionId: other.versions[0]!.wire })).status).toBe(
      404,
    );
    expect((await putPlugin(host, plugin, { versionId: 'not-an-id' })).status).toBe(400);
    expect((await putPlugin(host, plugin, { surprise: true })).status).toBe(400);
    expect((await viaKey(host.key, 'PUT', '/v1/project/plugins/not-an-id', {})).status).toBe(404);
  });

  it('does not offer a suspended plugin, nor a private one of another organization', async () => {
    const host = await createHost();
    const suspended = await seedPlugin();
    await sql(`UPDATE plugin SET status = 'suspended' WHERE id = $1`, [suspended.rawId]);
    expect((await putPlugin(host, suspended)).status).toBe(404);

    const [stranger] = await sql<{ id: string }>(
      `SELECT id FROM organization WHERE id <> $1 LIMIT 1`,
      [rawOf(fx.orgId)],
    );
    const foreign = await seedPlugin({ visibility: 'private', publisher: stranger!.id });
    expect((await putPlugin(host, foreign)).status).toBe(404);

    const own = await seedPlugin({ visibility: 'private', publisher: rawOf(fx.orgId) });
    expect((await putPlugin(host, own)).status).toBe(201);
  });

  it('moves a plugin to another version and keeps the choice of a component with the same name', async () => {
    const host = await createHost();
    const plugin = await seedPlugin({ versions: ['1.0.0', '1.1.0'] });
    await putPlugin(host, plugin, { versionId: plugin.versions[0]!.wire });
    const installation = await installationOf(host, plugin);
    await sql(`UPDATE installation_component SET enabled = false WHERE installation_id = $1`, [
      installation,
    ]);

    const moved = await putPlugin(host, plugin, { versionId: plugin.versions[1]!.wire });
    expect(moved.status).toBe(200);
    expect(((await moved.json()) as PluginBody).version).toBe('1.1.0');

    const rows = await sql<{ enabled: boolean; plugin_version_id: string }>(
      `SELECT enabled, plugin_version_id FROM installation_component WHERE installation_id = $1`,
      [installation],
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.enabled).toBe(false);
    expect(rows[0]!.plugin_version_id).toBe(plugin.versions[1]!.raw);
  });

  it('removes a plugin with its settings, and answers 404 for one the project does not have', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const installation = await installationOf(host, plugin);

    const removed = await viaKey(host.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`);
    expect(removed.status).toBe(204);
    expect(
      await sql(`SELECT 1 FROM installation_component WHERE installation_id = $1`, [installation]),
    ).toHaveLength(0);
    expect(
      (await viaKey(host.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`)).status,
    ).toBe(404);

    const list = await viaKey(host.key, 'GET', '/v1/project/plugins');
    expect(((await list.json()) as { items: unknown[] }).items).toEqual([]);
  });

  it('leaves the organization install of the same plugin as it was', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    const org = await callApi('POST', `/v1/orgs/${fx.orgId}/installations`, owner(), {
      pluginVersionId: plugin.versions[0]!.wire,
    });
    expect(org.status).toBe(201);

    await putPlugin(host, plugin);
    await viaKey(host.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`);

    const rows = await sql<{ status: string }>(
      `SELECT status FROM installation WHERE organization_id = $1 AND plugin_id = $2 AND scope = 'org'`,
      [rawOf(fx.orgId), plugin.rawId],
    );
    expect(rows.map((row) => row.status)).toEqual(['active']);
  });

  it('records who added and removed it', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    await viaKey(host.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`);
    const audit = await sql<{ action: string; actor_kind: string }>(
      `SELECT action, actor_kind FROM audit_log WHERE project_id = $1 ORDER BY created_at`,
      [host.rawProjectId],
    );
    const ours = audit.filter((row) => row.action.startsWith('installation.'));
    expect(ours.map((row) => row.action)).toEqual(['installation.created', 'installation.deleted']);
    expect(ours.every((row) => row.actor_kind === 'api_key')).toBe(true);
  });
});

describe('auth configs', () => {
  const CONFIGS = '/v1/project/auth-configs';

  async function componentOf(host: Host, plugin: Seeded): Promise<string> {
    const [row] = await sql<{ id: string }>(
      `SELECT component_id AS id FROM installation_component WHERE installation_id = $1`,
      [await installationOf(host, plugin)],
    );
    return formatId('cmp', row!.id);
  }

  async function addConfig(
    host: Host,
    componentId: string,
    body: Record<string, unknown> = {},
  ): Promise<Response> {
    return viaKey(host.key, 'POST', CONFIGS, {
      componentId,
      name: `config-${randomUUID().slice(0, 8)}`,
      authMode: 'dcr',
      ...body,
    });
  }

  const listOf = async (host: Host) =>
    ((await (await viaKey(host.key, 'GET', CONFIGS)).json()) as { items: ConfigBody[] }).items;

  it('lists nothing until a config is made, then the config with the variables and never a value', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const canary = `canary-${randomUUID()}`;
    expect(await listOf(host)).toEqual([]);

    const componentId = await componentOf(host, plugin);
    const made = await addConfig(host, componentId, {
      authMode: 'shared_secret',
      secret: canary,
    });
    expect(made.status).toBe(201);
    const madeText = await made.text();
    expect(madeText).not.toContain(canary);
    const config = JSON.parse(madeText) as ConfigBody;
    expect(config).toMatchObject({
      pluginId: plugin.pluginId,
      serverName: 'tool',
      authMode: 'shared_secret',
      isDefault: true,
      secretSet: true,
      componentId,
    });
    expect(config.variables.find((item) => item.name === 'API_TOKEN')).toMatchObject({
      isSet: false,
      required: true,
    });

    const set = await viaKey(host.key, 'PUT', `${CONFIGS}/${componentId}/variables`, {
      values: { API_TOKEN: canary },
    });
    expect(set.status).toBe(200);
    expect(await set.text()).not.toContain(canary);

    const text = await (await viaKey(host.key, 'GET', `${CONFIGS}/${config.id}`)).text();
    expect(text).not.toContain(canary);
    const again = JSON.parse(text) as ConfigBody;
    expect(again.variables.find((item) => item.name === 'API_TOKEN')?.isSet).toBe(true);

    const stored = await sql<{ value_sealed: string; updated_by: string | null }>(
      `SELECT value_sealed, updated_by FROM installation_variable WHERE installation_id = $1`,
      [await installationOf(host, plugin)],
    );
    expect(stored).toHaveLength(1);
    expect(stored[0]!.value_sealed).not.toContain(canary);
    expect(stored[0]!.updated_by).toBeNull();

    const sealed = await sql<{ secret_sealed: string | null }>(
      `SELECT secret_sealed FROM auth_config WHERE id = $1`,
      [rawOf(config.id)],
    );
    expect(sealed[0]!.secret_sealed).not.toContain(canary);

    const audit = await sql<{ action: string; context: string | null }>(
      `SELECT action, context FROM audit_log
        WHERE project_id = $1 AND action IN ('variable.updated', 'auth_config.created')`,
      [host.rawProjectId],
    );
    expect(audit.map((row) => row.action).sort()).toEqual([
      'auth_config.created',
      'variable.updated',
    ]);
    for (const row of audit) expect(row.context ?? '').not.toContain(canary);
  });

  it('makes the first config of a server the default and moves the default on request', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const componentId = await componentOf(host, plugin);

    const first = (await (await addConfig(host, componentId)).json()) as ConfigBody;
    const second = (await (await addConfig(host, componentId)).json()) as ConfigBody;
    expect([first.isDefault, second.isDefault]).toEqual([true, false]);

    const moved = await viaKey(host.key, 'PUT', `${CONFIGS}/${second.id}`, { isDefault: true });
    expect(moved.status).toBe(200);
    const defaults = (await listOf(host)).filter((item) => item.isDefault).map((item) => item.id);
    expect(defaults).toEqual([second.id]);

    const disabled = await viaKey(host.key, 'PUT', `${CONFIGS}/${second.id}`, {
      status: 'disabled',
    });
    expect(((await disabled.json()) as ConfigBody).isDefault).toBe(false);
  });

  it('refuses a duplicate name, a mode that needs a field, and a component without MCP', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const componentId = await componentOf(host, plugin);

    expect((await addConfig(host, componentId, { name: 'same' })).status).toBe(201);
    expect((await addConfig(host, componentId, { name: 'same' })).status).toBe(409);
    expect((await addConfig(host, componentId, { authMode: 'shared_secret' })).status).toBe(400);
    expect((await addConfig(host, componentId, { authMode: 'oauth_client' })).status).toBe(400);

    const [skill] = await sql<{ id: string }>(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'skill', 'notes', 'a skill', '{}') RETURNING id`,
      [randomUUID(), plugin.versions[0]!.raw],
    );
    await sql(
      `INSERT INTO installation_component (installation_id, component_id, organization_id, plugin_version_id, enabled)
       VALUES ($1, $2, $3, $4, true)`,
      [await installationOf(host, plugin), skill!.id, rawOf(fx.orgId), plugin.versions[0]!.raw],
    );
    expect((await addConfig(host, formatId('cmp', skill!.id))).status).toBe(404);
    expect(
      (
        await viaKey(host.key, 'PUT', `${CONFIGS}/${formatId('cmp', skill!.id)}/variables`, {
          values: { API_TOKEN: 'one' },
        })
      ).status,
    ).toBe(404);
  });

  it('removes a config, and refuses while a connection was made with it', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const componentId = await componentOf(host, plugin);
    const config = (await (await addConfig(host, componentId)).json()) as ConfigBody;

    const user = `user-${randomUUID().slice(0, 8)}`;
    const put = await viaKey(host.key, 'PUT', '/v1/project/connections', {
      userId: user,
      componentId,
      authConfigId: config.id,
      apiKey: 'user-own-key',
    });
    expect(put.status).toBe(200);
    expect((await viaKey(host.key, 'DELETE', `${CONFIGS}/${config.id}`)).status).toBe(409);

    const connection = (await put.json()) as { id: string };
    expect(
      (await viaKey(host.key, 'DELETE', `/v1/project/connections/${connection.id}`)).status,
    ).toBe(204);
    expect((await viaKey(host.key, 'DELETE', `${CONFIGS}/${config.id}`)).status).toBe(204);
    expect((await viaKey(host.key, 'GET', `${CONFIGS}/${config.id}`)).status).toBe(404);
  });

  it('stores a user own values sealed and reads back only the kind and the names', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const componentId = await componentOf(host, plugin);
    const canary = `canary-${randomUUID()}`;

    const put = await viaKey(host.key, 'PUT', '/v1/project/connections', {
      userId: 'user-env',
      componentId,
      values: { REGION: canary },
    });
    expect(put.status).toBe(200);
    const text = await put.text();
    expect(text).not.toContain(canary);
    expect(JSON.parse(text)).toMatchObject({
      kind: 'env',
      valueNames: ['REGION'],
      status: 'active',
    });

    const listed = await (await viaKey(host.key, 'GET', '/v1/project/connections')).text();
    expect(listed).not.toContain(canary);
    const [row] = await sql<{ credentials_sealed: string }>(
      `SELECT credentials_sealed FROM mcp_oauth_token WHERE id = $1`,
      [rawOf(JSON.parse(text).id)],
    );
    expect(row!.credentials_sealed).not.toContain(canary);

    expect(
      (
        await viaKey(host.key, 'PUT', '/v1/project/connections', {
          userId: 'user-env',
          componentId,
          apiKey: 'a',
          values: { REGION: 'b' },
        })
      ).status,
    ).toBe(400);
  });

  it('shows the tools of a server only to a key that may read tools', async () => {
    const withTools = await createHost();
    const withoutTools = await createHost(ALL.filter((scope) => scope !== 'tools:read'));
    for (const host of [withTools, withoutTools]) {
      const plugin = await seedPlugin();
      await putPlugin(host, plugin);
      const componentId = await componentOf(host, plugin);
      await sql(
        `INSERT INTO mcp_server (installation_id, component_id, organization_id, tools)
         VALUES ($1, $2, $3, $4)`,
        [
          await installationOf(host, plugin),
          rawOf(componentId),
          rawOf(fx.orgId),
          JSON.stringify([{ name: 'search', description: 'Find things', inputSchema: {} }]),
        ],
      );
      expect((await addConfig(host, componentId)).status).toBe(201);
    }
    const seen = async (host: Host) => (await listOf(host))[0]!;
    expect((await seen(withTools)).tools).toEqual([{ name: 'search', description: 'Find things' }]);
    expect('tools' in (await seen(withoutTools))).toBe(false);
  });

  it('removes a value with null and keeps one with an empty string', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const path = `${CONFIGS}/${await componentOf(host, plugin)}/variables`;
    await viaKey(host.key, 'PUT', path, { values: { API_TOKEN: 'one' } });
    await viaKey(host.key, 'PUT', path, { values: { API_TOKEN: '' } });
    let items = (
      (await (await viaKey(host.key, 'PUT', path, { values: { REGION: 'eu' } })).json()) as {
        items: { name: string; isSet: boolean }[];
      }
    ).items;
    expect(items.find((item) => item.name === 'API_TOKEN')?.isSet).toBe(true);
    items = (
      (await (await viaKey(host.key, 'PUT', path, { values: { API_TOKEN: null } })).json()) as {
        items: { name: string; isSet: boolean }[];
      }
    ).items;
    expect(items.find((item) => item.name === 'API_TOKEN')?.isSet).toBe(false);
    expect((await viaKey(host.key, 'PUT', path, { values: {} })).status).toBe(400);
  });

  it('answers 404 for a component or a config the project does not have', async () => {
    const a = await createHost();
    const b = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(a, plugin);
    const componentId = await componentOf(a, plugin);
    const config = (await (await addConfig(a, componentId)).json()) as ConfigBody;

    const res = await viaKey(b.key, 'PUT', `${CONFIGS}/${componentId}/variables`, {
      values: { API_TOKEN: 'nope' },
    });
    expect(res.status).toBe(404);
    expect((await addConfig(b, componentId)).status).toBe(404);
    expect((await viaKey(b.key, 'GET', `${CONFIGS}/${config.id}`)).status).toBe(404);
    expect((await viaKey(b.key, 'PUT', `${CONFIGS}/${config.id}`, { name: 'x' })).status).toBe(404);
    expect((await viaKey(b.key, 'DELETE', `${CONFIGS}/${config.id}`)).status).toBe(404);
    expect(await listOf(b)).toEqual([]);
  });

  it('lets a session name a config of its project and refuses any other', async () => {
    const a = await createHost();
    const b = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(a, plugin);
    await putPlugin(b, plugin);
    const componentA = await componentOf(a, plugin);
    const own = (await (await addConfig(a, componentA)).json()) as ConfigBody;
    const foreign = (await (await addConfig(b, await componentOf(b, plugin))).json()) as ConfigBody;

    const named = await viaKey(a.key, 'POST', '/v1/project/sessions', {
      userId: 'user-s',
      authConfigs: { [componentA]: own.id },
    });
    expect(named.status).toBe(201);
    expect(
      ((await named.json()) as { authConfigs: { authConfigId: string }[] }).authConfigs,
    ).toEqual([expect.objectContaining({ authConfigId: own.id, pluginId: plugin.pluginId })]);

    const other = await viaKey(a.key, 'POST', '/v1/project/sessions', {
      userId: 'user-s',
      authConfigs: { [componentA]: foreign.id },
    });
    expect(other.status).toBe(422);
    const unknown = await viaKey(a.key, 'POST', '/v1/project/sessions', {
      userId: 'user-s',
      authConfigs: { [componentA]: formatId('acf', randomUUID()) },
    });
    expect(unknown.status).toBe(422);
  });
});

describe('scopes and isolation', () => {
  it('answers 403 when the key lacks the scope of the route', async () => {
    const plugin = await seedPlugin();
    const reader = await createHost(['plugins:read']);
    expect((await viaKey(reader.key, 'GET', '/v1/project/plugins')).status).toBe(200);
    expect((await putPlugin(reader, plugin)).status).toBe(403);
    expect(
      (await viaKey(reader.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`)).status,
    ).toBe(403);
    expect((await viaKey(reader.key, 'GET', '/v1/project/auth-configs')).status).toBe(403);

    const sessionsOnly = await createHost(['sessions:read', 'sessions:write']);
    expect((await viaKey(sessionsOnly.key, 'GET', '/v1/project/plugins')).status).toBe(403);
    expect((await viaKey(sessionsOnly.key, 'GET', '/v1/project/auth-configs')).status).toBe(403);
  });

  it('keeps the plugins of two projects apart', async () => {
    const a = await createHost();
    const b = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(a, plugin);
    const seen = async (host: Host) =>
      (
        (await (await viaKey(host.key, 'GET', '/v1/project/plugins')).json()) as {
          items: PluginBody[];
        }
      ).items;
    expect(await seen(a)).toHaveLength(1);
    expect(await seen(b)).toEqual([]);
    expect((await viaKey(b.key, 'DELETE', `/v1/project/plugins/${plugin.pluginId}`)).status).toBe(
      404,
    );
    expect(await seen(a)).toHaveLength(1);
  });

  it('refuses a call without a key and a call with a website session on the host path', async () => {
    const none = await fetch(`${apiUrl}/v1/project/plugins`, { headers: workloadHeaders });
    expect(none.status).toBe(401);
    const session = await callApi('GET', '/v1/project/plugins', owner());
    expect(session.status).toBe(401);
  });
});

describe('the console', () => {
  // An organization holds a limited number of projects, so the console tests use their own.
  beforeAll(async () => {
    fx = await createOrgFixture('project-plugins-console');
  });

  it('lets the owner add, list, move and remove a plugin and set its variables', async () => {
    const host = await createHost();
    const plugin = await seedPlugin({ versions: ['1.0.0', '1.1.0'] });
    const root = `${base()}/${host.projectId}`;

    const added = await callApi('PUT', `${root}/plugins/${plugin.pluginId}`, owner(), {
      versionId: plugin.versions[0]!.wire,
    });
    expect(added.status).toBe(201);
    const moved = await callApi('PUT', `${root}/plugins/${plugin.pluginId}`, owner(), {
      versionId: plugin.versions[1]!.wire,
    });
    expect(moved.status).toBe(200);
    const list = await callApi('GET', `${root}/plugins`, owner());
    expect(((await list.json()) as { items: PluginBody[] }).items[0]!.version).toBe('1.1.0');

    const [installed] = await sql<{ id: string }>(
      `SELECT component_id AS id FROM installation_component ic
         JOIN installation i ON i.id = ic.installation_id
        WHERE i.project_id = $1 AND i.scope = 'project'`,
      [host.rawProjectId],
    );
    const componentId = formatId('cmp', installed!.id);
    const made = await callApi('POST', `${root}/auth-configs`, owner(), {
      componentId,
      name: 'Console config',
      authMode: 'dcr',
    });
    expect(made.status).toBe(201);
    const config = (await made.json()) as ConfigBody;
    expect(config.tools).toEqual([]);
    expect(
      (
        (await (await callApi('GET', `${root}/auth-configs`, owner())).json()) as {
          items: unknown[];
        }
      ).items,
    ).toHaveLength(1);
    const renamed = await callApi('PUT', `${root}/auth-configs/${config.id}`, owner(), {
      name: 'Renamed',
    });
    expect(((await renamed.json()) as ConfigBody).name).toBe('Renamed');
    const set = await callApi('PUT', `${root}/auth-configs/${componentId}/variables`, owner(), {
      values: { API_TOKEN: 'console-value' },
    });
    expect(set.status).toBe(200);

    expect((await callApi('DELETE', `${root}/plugins/${plugin.pluginId}`, owner())).status).toBe(
      204,
    );

    const audit = await sql<{ action: string; actor_kind: string }>(
      `SELECT action, actor_kind FROM audit_log WHERE project_id = $1 ORDER BY created_at`,
      [host.rawProjectId],
    );
    const kinds = new Set(
      audit.filter((row) => row.action.startsWith('installation.')).map((row) => row.actor_kind),
    );
    expect([...kinds]).toEqual(['user_session']);
    const [row] = await sql<{ created_by: string }>(
      `SELECT created_by FROM installation WHERE project_id = $1 AND scope = 'project' LIMIT 1`,
      [host.rawProjectId],
    );
    expect(row).toBeUndefined();
  });

  it('lists each server of an added plugin with what it needs, before any config exists', async () => {
    const host = await createHost();
    const root = `${base()}/${host.projectId}`;
    const servers = async (user = owner()) => {
      const res = await callApi('GET', `${root}/servers`, user);
      expect(res.status).toBe(200);
      return ((await res.json()) as { items: ServerBody[]; nextCursor: null }).items;
    };
    expect(await servers()).toEqual([]);

    const plugin = await seedPlugin();
    expect((await callApi('PUT', `${root}/plugins/${plugin.pluginId}`, owner(), {})).status).toBe(
      201,
    );
    const configs = await callApi('GET', `${root}/auth-configs`, owner());
    expect(((await configs.json()) as { items: unknown[] }).items).toEqual([]);

    const [server] = await servers();
    expect(server).toMatchObject({
      pluginId: plugin.pluginId,
      pluginDisplayName: 'Project Plugin',
      serverName: 'tool',
      url: 'http://localhost:19999/mcp',
      authConfigCount: 0,
      defaultAuthConfigId: null,
    });
    expect(server!.componentId).toMatch(/^cmp_[0-9a-f]{32}$/);
    expect(server!.variables).toEqual([
      expect.objectContaining({ name: 'API_TOKEN', required: true, isSet: false }),
      expect.objectContaining({ name: 'REGION', required: false, isSet: false }),
    ]);

    const set = await callApi(
      'PUT',
      `${root}/auth-configs/${server!.componentId}/variables`,
      owner(),
      { values: { API_TOKEN: 'console-servers-value' } },
    );
    expect(set.status).toBe(200);
    const made = await callApi('POST', `${root}/auth-configs`, owner(), {
      componentId: server!.componentId,
      name: 'Sign in',
      authMode: 'dcr',
    });
    expect(made.status).toBe(201);
    const config = (await made.json()) as ConfigBody;

    const [after] = await servers(fx.users.viewer);
    expect(after!.variables[0]).toMatchObject({ name: 'API_TOKEN', isSet: true });
    expect(after).toMatchObject({ authConfigCount: 1, defaultAuthConfigId: config.id });
    expect(JSON.stringify(after)).not.toContain('console-servers-value');

    expect((await callApi('GET', `${root}/servers`, fx.stranger)).status).not.toBe(200);
    const foreign = `/v1/orgs/${fx.orgId}/projects/${formatId('prj', randomUUID())}`;
    expect((await callApi('GET', `${foreign}/servers`, owner())).status).toBe(404);
  });

  it('lets a member read but not change, and shows nothing to an outsider', async () => {
    const host = await createHost();
    const plugin = await seedPlugin();
    await putPlugin(host, plugin);
    const root = `${base()}/${host.projectId}`;

    const member = fx.users.viewer;
    expect((await callApi('GET', `${root}/plugins`, member)).status).toBe(200);
    expect((await callApi('GET', `${root}/auth-configs`, member)).status).toBe(200);
    expect((await callApi('PUT', `${root}/plugins/${plugin.pluginId}`, member, {})).status).toBe(
      403,
    );
    expect((await callApi('DELETE', `${root}/plugins/${plugin.pluginId}`, member)).status).toBe(
      403,
    );

    const outsider = fx.stranger;
    expect((await callApi('GET', `${root}/plugins`, outsider)).status).not.toBe(200);
    expect(
      (await callApi('PUT', `${root}/plugins/${plugin.pluginId}`, outsider, {})).status,
    ).not.toBe(200);
  });

  it('answers 404 for a project of another organization', async () => {
    const plugin = await seedPlugin();
    const foreign = `/v1/orgs/${fx.orgId}/projects/${formatId('prj', randomUUID())}`;
    expect((await callApi('GET', `${foreign}/plugins`, owner())).status).toBe(404);
    expect(
      (await callApi('PUT', `${foreign}/plugins/${plugin.pluginId}`, owner(), {})).status,
    ).toBe(404);
  });
});
