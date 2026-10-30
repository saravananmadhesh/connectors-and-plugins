/**
 * Isolation of projects over HTTP: two organizations with a project each, and what a host key, a
 * session token and the other kinds of keys can and cannot reach. Keys, sessions, user ids,
 * plugins, logs and component hashes never cross a project; a session token never calls a host
 * route and a host key never calls a session route or the gateway; a user's installs stay with
 * that user; and every id of another project answers as an id that does not exist.
 *
 * Run: pnpm test -- --only=security
 */
import { createHash, randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { ROUTES, type RouteDef } from '../../packages/contracts/src/v1/routes.js';
import { ID_PREFIXES, formatId } from '../../packages/contracts/src/v1/ids.js';
import { packTarGz } from '../../packages/domain/src/index.js';
import { callApi, createOrgFixture, type OrgFixture } from '../integration/org-fixture.js';
import { sql, workloadHeaders } from '../integration/signed-in-user.js';
import { apiUrl, gatewayUrl, requireEnv } from '../integration/test-env.js';

const DAY = 86_400_000;
const SCOPES = [
  'tools:read',
  'sessions:read',
  'sessions:write',
  'plugins:read',
  'plugins:write',
  'auth-configs:read',
  'auth-configs:write',
  'observability:read',
];
const SCAN = JSON.stringify({
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  variables: [{ name: 'REGION', description: 'Region', required: false, secret: false }],
  skipped: [],
  findings: [],
});

interface Tenant {
  fx: OrgFixture;
  projectId: string;
  rawProjectId: string;
  key: string;
  user: string;
  session: { id: string; token: string };
  pluginId: string;
  pluginName: string;
  componentId: string;
  authConfigId: string;
  sha: string;
  /** A plugin the project did not add; a user may install it for themselves. */
  ownPlugin: { pluginId: string };
}

const rawOf = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

function bearer(token: string | null, method: string, path: string, body?: unknown, extra = {}) {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
      ...extra,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

const codeOf = async (res: Response) =>
  ((await res.json()) as { error?: { code?: string } }).error?.code;

async function seedOwnPlugin(label: string): Promise<{ pluginId: string }> {
  const rawPlugin = randomUUID();
  const rawVersion = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Isolation own', 'fixture', 'fixture', 'active', 'public')`,
    [rawPlugin, `iso-own-${label}-${rawPlugin.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5, 100)`,
    [rawVersion, rawPlugin, `sha256-iso-own-${rawVersion}`, SCAN, `sha256-archive-${rawVersion}`],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', 'own-tool', 'fixture tool', $3)`,
    [
      randomUUID(),
      rawVersion,
      JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' }),
    ],
  );
  return { pluginId: formatId('plg', rawPlugin) };
}

async function makeTenant(label: string): Promise<Tenant> {
  const fx = await createOrgFixture(`isolation-${label}`);
  const owner = fx.users.admin;
  const base = `/v1/orgs/${fx.orgId}/projects`;
  const created = await callApi('POST', base, owner, { name: `Iso ${label}` });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const keyRes = await callApi('POST', `${base}/${projectId}/keys`, owner, {
    scopes: SCOPES,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
  });
  expect(keyRes.status).toBe(201);
  const key = ((await keyRes.json()) as { rawKey: string }).rawKey;

  const archive = packTarGz(
    new Map([['SKILL.md', Buffer.from(`---\nname: ${label}\n---\n${randomUUID()}`)]]),
  );
  const sha = createHash('sha256').update(archive).digest('hex');
  await createS3Blob({
    region: 'us-east-1',
    bucket: requireEnv('TEST_S3_BUCKET'),
    endpoint: requireEnv('TEST_S3_ENDPOINT'),
    forcePathStyle: true,
    credentials: {
      accessKeyId: requireEnv('TEST_S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('TEST_S3_SECRET_ACCESS_KEY'),
    },
  }).put(sha, archive, { sizeBytes: archive.byteLength });

  const rawPlugin = randomUUID();
  const rawVersion = randomUUID();
  const pluginName = `iso-${label}-${rawPlugin.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Isolation', 'fixture', 'fixture', 'active', 'public')`,
    [rawPlugin, pluginName],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5, $6)`,
    [rawVersion, rawPlugin, `sha256-iso-${rawVersion}`, SCAN, sha, archive.byteLength],
  );
  const rawComponent = randomUUID();
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', 'tool', 'fixture tool', $3)`,
    [
      rawComponent,
      rawVersion,
      JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' }),
    ],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata,
       archive_sha256, archive_size_bytes)
     VALUES ($1, $2, 'skill', 'review', 'a skill', '{}', $3, $4)`,
    [randomUUID(), rawVersion, sha, archive.byteLength],
  );
  const pluginId = formatId('plg', rawPlugin);
  const ownPlugin = await seedOwnPlugin(label);
  const componentId = formatId('cmp', rawComponent);
  expect((await bearer(key, 'PUT', `/v1/project/plugins/${pluginId}`, {})).status).toBe(201);
  const config = await bearer(key, 'POST', '/v1/project/auth-configs', {
    componentId,
    name: `config-${label}`,
    authMode: 'shared_secret',
    secret: `secret-${randomUUID()}`,
  });
  expect(config.status).toBe(201);
  const authConfigId = ((await config.json()) as { id: string }).id;

  const user = `shared-user-id`;
  expect((await bearer(key, 'PUT', '/v1/project/user-install-mode', { mode: 'any' })).status).toBe(
    200,
  );
  const session = await bearer(key, 'POST', '/v1/project/sessions', { userId: user });
  expect(session.status).toBe(201);
  return {
    fx,
    projectId,
    rawProjectId: rawOf(projectId),
    key,
    user,
    session: (await session.json()) as { id: string; token: string },
    pluginId,
    pluginName,
    componentId,
    authConfigId,
    sha,
    ownPlugin,
  };
}

let a: Tenant;
let b: Tenant;

beforeAll(async () => {
  a = await makeTenant('a');
  b = await makeTenant('b');
}, 240_000);

// ─── Kinds of credentials do not mix ──────────────────────────────────────────

const HOST_ROUTES = ROUTES.filter(
  (route) => route.app === 'api' && route.principals.includes('project'),
);
const SESSION_ROUTES = ROUTES.filter(
  (route) =>
    route.app === 'api' &&
    route.principals.includes('key') &&
    (route.pathTemplate.startsWith('/v1/session') || route.pathTemplate.startsWith('/v1/sync')),
);

const PARAM_PREFIX: Record<string, string> = {
  pluginId: ID_PREFIXES.plugin,
  componentId: ID_PREFIXES.component,
  authConfigId: ID_PREFIXES.authConfig,
  setId: ID_PREFIXES.pluginSet,
  sessionId: ID_PREFIXES.projectSession,
  connectionId: ID_PREFIXES.userConnection,
};

function pathOf(route: RouteDef): string {
  return route.pathTemplate.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (name === 'sha256') return '0'.repeat(64);
    const prefix = PARAM_PREFIX[name];
    if (!prefix) throw new Error(`${route.id}: no id prefix known for ${name}`);
    return formatId(prefix, randomUUID());
  });
}

/** A body each route accepts, so a refusal can only come from who is asking. */
const sampleBody = (route: RouteDef) => {
  if (route.method === 'GET' || route.method === 'DELETE') return undefined;
  if (route.id === 'sessionPluginVariables.put') return { values: { REGION: 'x' } };
  if (route.id === 'sessionPluginComponents.put') return { enabled: true };
  return {};
};
const REFUSED = [401, 403];

describe('the kinds of credentials do not mix', () => {
  it('has routes to check on both sides', () => {
    expect(HOST_ROUTES.length).toBeGreaterThan(30);
    expect(SESSION_ROUTES.length).toBeGreaterThan(8);
  });

  it.each(HOST_ROUTES.map((route) => [route.id, route] as const))(
    'a session token cannot call the host route %s',
    async (_id, route) => {
      const res = await bearer(a.session.token, route.method, pathOf(route), sampleBody(route));
      expect(REFUSED).toContain(res.status);
    },
  );

  it.each(SESSION_ROUTES.map((route) => [route.id, route] as const))(
    'a host key cannot call the session route %s',
    async (_id, route) => {
      const res = await bearer(a.key, route.method, pathOf(route), sampleBody(route));
      expect(REFUSED).toContain(res.status);
    },
  );

  it('a host key cannot use the gateway, and a session token can', async () => {
    const call = (token: string) =>
      fetch(`${gatewayUrl}/mcp`, {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
      });
    expect(REFUSED).toContain((await call(a.key)).status);
    expect((await call(a.session.token)).status).toBe(200);
  });

  it('a host key cannot call the routes of a person or an organization', async () => {
    const owner = a.fx.users.admin;
    const urls = [
      `/v1/orgs/${a.fx.orgId}/projects`,
      `/v1/orgs/${a.fx.orgId}/projects/${a.projectId}`,
      `/v1/orgs/${a.fx.orgId}/api-keys`,
      `/v1/orgs/${a.fx.orgId}/installations`,
      `/v1/orgs/${a.fx.orgId}/me/installations`,
    ];
    for (const url of urls) {
      expect(REFUSED).toContain((await bearer(a.key, 'GET', url)).status);
      expect(REFUSED).toContain((await bearer(a.session.token, 'GET', url)).status);
    }
    // The same routes work for the person, so the refusals above are about the credential.
    expect((await callApi('GET', `/v1/orgs/${a.fx.orgId}/projects`, owner)).status).toBe(200);
  });

  it('an organization key cannot call the host routes', async () => {
    const owner = a.fx.users.admin;
    const made = await callApi('POST', `/v1/orgs/${a.fx.orgId}/api-keys`, owner, {
      name: `Org key ${randomUUID().slice(0, 8)}`,
      permissions: ['mcp:list', 'mcp:call'],
    });
    expect(made.status).toBe(201);
    const { rawKey } = (await made.json()) as { rawKey: string };
    for (const path of ['/v1/project/me', '/v1/project/users', '/v1/project/sessions']) {
      expect(REFUSED).toContain((await bearer(rawKey, 'GET', path)).status);
    }
  });

  it('a request with no credential or a made-up one is refused everywhere', async () => {
    const made = `prk_${'0'.repeat(16)}.${'b'.repeat(40)}`;
    for (const route of HOST_ROUTES.slice(0, 12)) {
      expect(REFUSED).toContain(
        (await bearer(null, route.method, pathOf(route), sampleBody(route))).status,
      );
      expect(REFUSED).toContain(
        (await bearer(made, route.method, pathOf(route), sampleBody(route))).status,
      );
    }
  });
});

// ─── Projects do not see each other ───────────────────────────────────────────

describe('one project never sees another', () => {
  it('does not list the user, the session or the plugin of the other project', async () => {
    const users = (await (await bearer(b.key, 'GET', '/v1/project/users')).json()) as {
      items: { userId: string }[];
    };
    // Both projects use the same host id; each sees only its own user row.
    expect(users.items.filter((item) => item.userId === a.user)).toHaveLength(1);
    const owner = (
      await sql<{ project_id: string }>(
        `SELECT project_id FROM "user" WHERE external_ref = $1 AND project_id = $2`,
        [a.user, b.rawProjectId],
      )
    )[0];
    expect(owner?.project_id).toBe(b.rawProjectId);

    const sessions = (await (await bearer(b.key, 'GET', '/v1/project/sessions')).json()) as {
      items: { id: string }[];
    };
    expect(sessions.items.map((item) => item.id)).not.toContain(a.session.id);
    expect(sessions.items.map((item) => item.id)).toContain(b.session.id);

    const plugins = (await (await bearer(b.key, 'GET', '/v1/project/plugins')).json()) as {
      items: { pluginId: string }[];
    };
    expect(plugins.items.map((item) => item.pluginId)).not.toContain(a.pluginId);
  });

  it('answers 404 for a session, an auth config and a plugin of the other project', async () => {
    const reads = [
      bearer(b.key, 'GET', `/v1/project/sessions/${a.session.id}`),
      bearer(b.key, 'DELETE', `/v1/project/sessions/${a.session.id}`),
      bearer(b.key, 'GET', `/v1/project/auth-configs/${a.authConfigId}`),
      bearer(b.key, 'PUT', `/v1/project/auth-configs/${a.authConfigId}`, { name: 'taken over' }),
      bearer(b.key, 'DELETE', `/v1/project/auth-configs/${a.authConfigId}`),
      bearer(b.key, 'PUT', `/v1/project/auth-configs/${a.componentId}/variables`, {
        values: { REGION: 'x' },
      }),
      bearer(b.key, 'DELETE', `/v1/project/plugins/${a.pluginId}`),
    ];
    for (const res of await Promise.all(reads)) {
      expect(res.status).toBe(404);
      expect(await codeOf(res)).toBe('not_found');
    }
    // Nothing was changed or removed on the way.
    expect((await bearer(a.key, 'GET', `/v1/project/sessions/${a.session.id}`)).status).toBe(200);
    expect((await bearer(a.key, 'GET', `/v1/project/auth-configs/${a.authConfigId}`)).status).toBe(
      200,
    );
    expect((await bearer(a.session.token, 'GET', '/v1/sync')).status).toBe(200);
  });

  it('gives a session of the other project no server, file or hash of this one', async () => {
    const manifest = (await (await bearer(b.session.token, 'GET', '/v1/sync')).json()) as {
      entries: { pluginName: string }[];
    };
    expect(manifest.entries.map((entry) => entry.pluginName)).toEqual([b.pluginName]);
    expect(JSON.stringify(manifest)).not.toContain(a.sha);

    const foreign = await bearer(b.session.token, 'GET', `/v1/sync/components/${a.sha}`);
    expect(foreign.status).toBe(404);
    const own = await bearer(b.session.token, 'GET', `/v1/sync/components/${b.sha}`);
    expect(own.status).toBe(200);
  });

  it('keeps the logs of one project out of the other', async () => {
    const marker = `marker-${randomUUID().slice(0, 8)}`;
    expect((await bearer(a.key, 'PUT', '/v1/project/users', { userId: marker })).status).toBe(201);
    const seen = async (tenant: Tenant) =>
      JSON.stringify(await (await bearer(tenant.key, 'GET', '/v1/project/logs?limit=100')).json());
    expect(await seen(a)).toContain(marker);
    expect(await seen(b)).not.toContain(marker);
    expect(await seen(b)).not.toContain(a.projectId);
  });

  it('never lets one key act on the user of the other project that has the same id', async () => {
    // The same host id exists in both projects as two different users.
    const rows = await sql<{ id: string; project_id: string }>(
      `SELECT id, project_id FROM "user" WHERE external_ref = $1 AND project_id = ANY($2)`,
      [a.user, [a.rawProjectId, b.rawProjectId]],
    );
    expect(rows).toHaveLength(2);
    expect(new Set(rows.map((row) => row.id)).size).toBe(2);

    const aSees = (await (
      await bearer(a.key, 'GET', `/v1/project/user-plugins?userId=${a.user}`)
    ).json()) as {
      items: { pluginId: string }[];
    };
    const bSees = (await (
      await bearer(b.key, 'GET', `/v1/project/user-plugins?userId=${a.user}`)
    ).json()) as {
      items: { pluginId: string }[];
    };
    expect(aSees.items.map((item) => item.pluginId)).not.toContain(b.pluginId);
    expect(bSees.items.map((item) => item.pluginId)).not.toContain(a.pluginId);
  });

  it('answers 404 to a console caller of another organization', async () => {
    const stranger = b.fx.users.admin;
    for (const suffix of ['', '/users', '/sessions', '/logs', '/keys', '/webhook', '/plugins']) {
      const res = await callApi(
        'GET',
        `/v1/orgs/${b.fx.orgId}/projects/${a.projectId}${suffix}`,
        stranger,
      );
      expect(res.status).toBe(404);
    }
    const wrongOrg = await callApi(
      'GET',
      `/v1/orgs/${a.fx.orgId}/projects/${a.projectId}`,
      stranger,
    );
    expect([403, 404]).toContain(wrongOrg.status);
  });
});

// ─── A user's own installs stay with that user ────────────────────────────────

describe('a user of a project sees only their own installs', () => {
  const listed = async (token: string): Promise<string[]> => {
    const res = await bearer(token, 'GET', '/v1/session/plugins');
    expect(res.status).toBe(200);
    return ((await res.json()) as { items: { pluginId: string }[] }).items.map(
      (item) => item.pluginId,
    );
  };

  it('keeps the installs of one user from another user of the same project', async () => {
    const other = await bearer(a.key, 'POST', '/v1/project/sessions', { userId: 'other-user-id' });
    expect(other.status).toBe(201);
    const second = (await other.json()) as { token: string };

    const install = await bearer(
      a.session.token,
      'PUT',
      `/v1/session/plugins/${a.ownPlugin.pluginId}`,
      {},
    );
    expect(install.status).toBe(201);
    expect(await listed(a.session.token)).toContain(a.ownPlugin.pluginId);
    expect(await listed(second.token)).not.toContain(a.ownPlugin.pluginId);

    // The other user cannot change or remove it: for them it does not exist.
    const removed = await bearer(
      second.token,
      'DELETE',
      `/v1/session/plugins/${a.ownPlugin.pluginId}`,
    );
    expect(removed.status).toBe(404);
    const changed = await bearer(
      second.token,
      'PUT',
      `/v1/session/plugins/${a.ownPlugin.pluginId}/variables`,
      {
        values: { REGION: 'x' },
      },
    );
    expect(changed.status).toBe(404);
    expect(await listed(a.session.token)).toContain(a.ownPlugin.pluginId);
  });

  it('shows the same user id of another project nothing of these installs', async () => {
    expect(await listed(b.session.token)).not.toContain(a.ownPlugin.pluginId);
    const host = (await (
      await bearer(b.key, 'GET', `/v1/project/user-plugins?userId=${a.user}`)
    ).json()) as {
      items: { pluginId: string }[];
    };
    expect(host.items.map((item) => item.pluginId)).not.toContain(a.ownPlugin.pluginId);
  });
});
