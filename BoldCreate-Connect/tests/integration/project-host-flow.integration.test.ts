/**
 * The whole journey of a host through HTTP only: people make a project and a key; the host adds a
 * user, a plugin and its sign-in setup, mints a session, and the user's agent lists the servers,
 * downloads the files, signs in to a provider and calls tools through the gateway. The host then
 * reads its logs, usage and webhook deliveries; the console shows the same users, sessions and
 * logs; and removing things ends what depended on them.
 *
 * Run: pnpm test "--only=integration"
 */
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { packTarGz } from '../../packages/domain/src/index.js';
import { PROJECT_LIMITS } from '../../packages/limits/src/index.js';
import { apiUrl, gatewayUrl, requireEnv } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';
import { FIXTURE_ORIGIN, listenOnFixturePort } from './support/fixture-port.js';

const DAY = 86_400_000;
const HOST_ORIGIN = 'https://app.example.test';
const RETURN_URL = `${HOST_ORIGIN}/settings/connections`;
const SCOPES = [
  'tools:read',
  'sessions:read',
  'sessions:write',
  'plugins:read',
  'plugins:write',
  'auth-configs:read',
  'auth-configs:write',
  'connections:read',
  'connections:write',
  'observability:read',
];
const UPSTREAM_SECRET = `upstream-${randomUUID()}`;
const API_SERVER = `flow-api-${randomUUID().slice(0, 8)}`;
const OAUTH_SERVER = `flow-oauth-${randomUUID().slice(0, 8)}`;
const CLIENT_ID = 'flow-fixture-client';
const SKILL_BODY = `---\nname: review\ndescription: Review\n---\nbody-${randomUUID()}`;
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

const skillArchive = packTarGz(new Map([['SKILL.md', Buffer.from(SKILL_BODY)]]));
const skillSha = createHash('sha256').update(skillArchive).digest('hex');

// ─── Fixture: an upstream with a shared secret, an OAuth server and a webhook receiver ───────

const codes = new Map<string, string>();
const accessTokens = new Set<string>();
const hooks: { path: string; headers: IncomingMessage['headers']; body: string }[] = [];
let issued = 0;

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const send = (res: ServerResponse, status: number, body: unknown, headers = {}) => {
  res.writeHead(status, { 'content-type': 'application/json', ...headers });
  res.end(JSON.stringify(body));
};

interface Rpc {
  id?: number;
  method: string;
  params?: { name?: string; arguments?: { text?: string } };
}

function mcpReply(res: ServerResponse, message: Rpc, tools: { name: string }[]) {
  const reply = (result: unknown) => send(res, 200, { jsonrpc: '2.0', id: message.id, result });
  if (message.method === 'initialize') {
    return reply({ protocolVersion: '2025-06-18', capabilities: { tools: {} } });
  }
  if (message.method === 'tools/list') return reply({ tools });
  if (message.method === 'tools/call') {
    return reply({
      content: [
        { type: 'text', text: `${message.params?.name}:${message.params?.arguments?.text ?? ''}` },
      ],
    });
  }
  res.writeHead(202).end();
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = new URL(req.url ?? '/', FIXTURE_ORIGIN).pathname;
  const bearer = /^Bearer (.+)$/.exec(req.headers.authorization ?? '')?.[1] ?? '';
  if (path.startsWith('/flow-hook')) {
    hooks.push({ path, headers: req.headers, body: await readBody(req) });
    res.writeHead(200).end();
    return;
  }
  if (path === '/flow-api') {
    if (bearer !== UPSTREAM_SECRET) return send(res, 401, {});
    const message = JSON.parse(await readBody(req)) as Rpc;
    return mcpReply(res, message, [{ name: 'echo' }, { name: 'delete_all' }]);
  }
  if (path === '/.well-known/oauth-protected-resource/flow-oauth') {
    return send(res, 200, {
      resource: `${FIXTURE_ORIGIN}/flow-oauth`,
      authorization_servers: [FIXTURE_ORIGIN],
    });
  }
  if (path === '/.well-known/oauth-authorization-server') {
    return send(res, 200, {
      issuer: FIXTURE_ORIGIN,
      authorization_endpoint: `${FIXTURE_ORIGIN}/authorize`,
      token_endpoint: `${FIXTURE_ORIGIN}/token`,
      registration_endpoint: `${FIXTURE_ORIGIN}/register`,
      code_challenge_methods_supported: ['S256'],
    });
  }
  if (path === '/register') return send(res, 201, { client_id: CLIENT_ID });
  if (path === '/token') {
    const form = new URLSearchParams(await readBody(req));
    const challenge = codes.get(form.get('code') ?? '');
    codes.delete(form.get('code') ?? '');
    const proof = createHash('sha256')
      .update(form.get('code_verifier') ?? '')
      .digest('base64url');
    if (!challenge || proof !== challenge) return send(res, 400, { error: 'invalid_grant' });
    issued += 1;
    const accessToken = `flow-access-${issued}`;
    accessTokens.add(accessToken);
    return send(res, 200, {
      access_token: accessToken,
      refresh_token: `flow-refresh-${issued}`,
      expires_in: 3600,
      token_type: 'Bearer',
    });
  }
  if (path === '/flow-oauth') {
    if (!accessTokens.has(bearer)) {
      return send(res, 401, {}, { 'www-authenticate': 'Bearer realm="fixture"' });
    }
    const message = JSON.parse(await readBody(req)) as Rpc;
    return mcpReply(res, message, [{ name: 'whoami' }]);
  }
  res.writeHead(404).end();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface Seeded {
  rawId: string;
  name: string;
  pluginId: string;
  versionId: string;
  serverComponentId: string;
  rawServerComponent: string;
}

let fx: OrgFixture;
let upstream: Server;
let projectId = '';
let rawProjectId = '';
let hostKey = '';
let apiPlugin: Seeded;
let oauthPlugin: Seeded;

const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const rawOf = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
const userRef = () => `flow-${randomUUID().slice(0, 10)}`;

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

const host = (method: string, suffix: string, body?: unknown, extra = {}) =>
  bearer(hostKey, method, `/v1/project${suffix}`, body, extra);

const codeOf = async (res: Response) =>
  ((await res.json()) as { error: { code: string } }).error.code;

async function seedPlugin(
  label: string,
  serverName: string,
  url: string,
  withSkill: boolean,
): Promise<Seeded> {
  const rawId = randomUUID();
  const version = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Host Flow', 'fixture', 'fixture', 'active', 'public')`,
    [rawId, `${label}-${rawId.slice(0, 8)}`],
  );
  const name = `${label}-${rawId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5, $6)`,
    [version, rawId, `sha256-flow-${version}`, SCAN, skillSha, skillArchive.byteLength],
  );
  const serverComponent = randomUUID();
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', $3, 'fixture server', $4)`,
    [serverComponent, version, serverName, JSON.stringify({ transport: 'http', url })],
  );
  if (withSkill) {
    await sql(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata,
         archive_sha256, archive_size_bytes)
       VALUES ($1, $2, 'skill', 'review', 'a skill', '{}', $3, $4)`,
      [randomUUID(), version, skillSha, skillArchive.byteLength],
    );
  }
  return {
    rawId,
    name,
    pluginId: formatId('plg', rawId),
    versionId: formatId('pv', version),
    serverComponentId: formatId('cmp', serverComponent),
    rawServerComponent: serverComponent,
  };
}

async function createProject(
  name = `Flow ${randomUUID().slice(0, 8)}`,
  keyOptions: Record<string, unknown> = {},
): Promise<{ projectId: string; rawProjectId: string; key: string; keyId: string; id: string }> {
  const created = await callApi('POST', base(), owner(), { name });
  expect(created.status).toBe(201);
  const id = ((await created.json()) as { id: string }).id;
  await sql(`UPDATE project SET return_origins = $2 WHERE id = $1`, [rawOf(id), [HOST_ORIGIN]]);
  const key = await callApi('POST', `${base()}/${id}/keys`, owner(), {
    scopes: SCOPES,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
    ...keyOptions,
  });
  expect(key.status).toBe(201);
  const body = (await key.json()) as { rawKey: string; prefix: string; id: string };
  return {
    projectId: id,
    rawProjectId: rawOf(id),
    key: body.rawKey,
    keyId: body.prefix,
    id: body.id,
  };
}

async function mint(userId = userRef(), body: Record<string, unknown> = {}, extra = {}) {
  const res = await host('POST', '/sessions', { userId, ...body }, extra);
  expect(res.status).toBe(201);
  return { ...((await res.json()) as { id: string; token: string }), userId };
}

const gatewayCall = (token: string, method: string, params?: unknown) =>
  fetch(`${gatewayUrl}/mcp`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });

async function toolNames(token: string): Promise<string[]> {
  const res = await gatewayCall(token, 'tools/list');
  expect(res.status).toBe(200);
  const body = (await res.json()) as { result: { tools: { name: string }[] } };
  return body.result.tools.map((tool) => tool.name).sort();
}

async function callTool(token: string, name: string, text = 'hi') {
  const res = await gatewayCall(token, 'tools/call', { name, arguments: { text } });
  return { status: res.status, body: (await res.json()) as Record<string, unknown> };
}

const textOf = (body: Record<string, unknown>): string | undefined =>
  (body['result'] as { content?: { text: string }[]; isError?: boolean } | undefined)?.content?.[0]
    ?.text;

async function until<T>(read: () => Promise<T | undefined> | T | undefined): Promise<T> {
  const deadline = Date.now() + 45_000;
  for (;;) {
    const value = await read();
    if (value !== undefined) return value;
    if (Date.now() > deadline) throw new Error('Timed out waiting');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

const verified = (entry: (typeof hooks)[number], secret: string): boolean => {
  const id = String(entry.headers['webhook-id']);
  const timestamp = String(entry.headers['webhook-timestamp']);
  const expected = `v1,${createHmac('sha256', secret).update(`${id}.${timestamp}.${entry.body}`).digest('base64')}`;
  return String(entry.headers['webhook-signature']).split(' ').includes(expected);
};

async function consentAndReturn(connectUrl: string): Promise<URL> {
  const url = new URL(connectUrl);
  const code = `code-${randomUUID()}`;
  codes.set(code, url.searchParams.get('code_challenge') ?? '');
  const { 'Content-Type': _type, ...identity } = workloadHeaders;
  const back = await fetch(
    `${apiUrl}/v1/oauth/callback?${new URLSearchParams({ code, state: url.searchParams.get('state') ?? '' })}`,
    { redirect: 'manual', headers: identity },
  );
  expect(back.status).toBe(302);
  return new URL(back.headers.get('location') ?? 'http://none/');
}

beforeAll(async () => {
  upstream = await listenOnFixturePort(createServer((req, res) => void handle(req, res)));
  fx = await createOrgFixture('project-host-flow');
  const made = await createProject();
  ({ projectId, rawProjectId, key: hostKey } = made);

  const blob = createS3Blob({
    region: 'us-east-1',
    bucket: requireEnv('TEST_S3_BUCKET'),
    endpoint: requireEnv('TEST_S3_ENDPOINT'),
    forcePathStyle: true,
    credentials: {
      accessKeyId: requireEnv('TEST_S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('TEST_S3_SECRET_ACCESS_KEY'),
    },
  });
  await blob.put(skillSha, skillArchive, { sizeBytes: skillArchive.byteLength });

  apiPlugin = await seedPlugin('flow-api', API_SERVER, `${FIXTURE_ORIGIN}/flow-api`, true);
  oauthPlugin = await seedPlugin('flow-oauth', OAUTH_SERVER, `${FIXTURE_ORIGIN}/flow-oauth`, false);
}, 240_000);

afterAll(async () => {
  await new Promise<void>((resolve) => (upstream ? upstream.close(() => resolve()) : resolve()));
});

// ─── The journey ──────────────────────────────────────────────────────────────

describe('a host and its users, from the key to the gateway', () => {
  let userId = '';
  let session: { id: string; token: string; userId: string };
  let secret = '';
  let authConfigId = '';

  it('reads its own project from the key', async () => {
    const res = await host('GET', '/me');
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ project: { id: projectId } });
  });

  it('adds a user, finds it by the host id, and reads an unknown id as an empty page', async () => {
    userId = userRef();
    const put = await host('PUT', '/users', { userId, displayName: 'Flow User' });
    expect(put.status).toBe(201);
    expect(await put.json()).toMatchObject({ userId, displayName: 'Flow User' });

    const found = (await (await host('GET', `/users?userId=${userId}`)).json()) as {
      items: { userId: string }[];
    };
    expect(found.items.map((item) => item.userId)).toEqual([userId]);

    const unknown = (await (await host('GET', `/users?userId=${userRef()}`)).json()) as {
      items: unknown[];
      nextCursor: string | null;
    };
    expect(unknown).toEqual({ items: [], nextCursor: null });
  });

  it('adds the plugins, sets the shared secret and a variable, and never reads a value back', async () => {
    for (const plugin of [apiPlugin, oauthPlugin]) {
      expect((await host('PUT', `/plugins/${plugin.pluginId}`, {})).status).toBe(201);
    }
    // A server that signs users in itself needs its auth type on the install.
    const [installation] = await sql<{ id: string }>(
      `SELECT id FROM installation WHERE project_id = $1 AND plugin_id = $2`,
      [rawProjectId, oauthPlugin.rawId],
    );
    await sql(
      `INSERT INTO mcp_server (installation_id, component_id, organization_id, auth_type)
       VALUES ($1, $2, $3, 'oauth_dcr')`,
      [installation!.id, oauthPlugin.rawServerComponent, fx.rawOrgId],
    );
    const made = await host('POST', '/auth-configs', {
      componentId: apiPlugin.serverComponentId,
      name: `config-${randomUUID().slice(0, 8)}`,
      authMode: 'shared_secret',
      secret: UPSTREAM_SECRET,
    });
    expect(made.status).toBe(201);
    const text = await made.text();
    expect(text).not.toContain(UPSTREAM_SECRET);
    authConfigId = (JSON.parse(text) as { id: string }).id;

    const set = await host('PUT', `/auth-configs/${apiPlugin.serverComponentId}/variables`, {
      values: { REGION: 'eu-west' },
    });
    expect(set.status).toBe(200);
    const shown = await (await host('GET', `/auth-configs/${authConfigId}`)).text();
    expect(shown).not.toContain(UPSTREAM_SECRET);
    expect(shown).not.toContain('eu-west');
  });

  it('mints a session once for a repeated Idempotency-Key', async () => {
    const key = randomUUID();
    const first = await host('POST', '/sessions', { userId }, { 'Idempotency-Key': key });
    const second = await host('POST', '/sessions', { userId }, { 'Idempotency-Key': key });
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    const a = (await first.json()) as { id: string; token: string };
    const b = (await second.json()) as { id: string; token: string };
    expect(b.id).toBe(a.id);
    expect(b.token).toBe(a.token);
    expect(a.token).toMatch(/^stk_[0-9a-f]{16}\./);
    session = { ...a, userId };
  });

  it('lists the servers of the session and the manifest shows the servers and component hashes', async () => {
    const res = await bearer(session.token, 'GET', '/v1/sync');
    expect(res.status).toBe(200);
    const manifest = (await res.json()) as {
      revision: string;
      entries: {
        pluginName: string;
        components: { kind: string; name: string; sha256?: string | null }[];
        mcp: { serverName: string; url: string; ready: boolean }[];
      }[];
    };
    const servers = manifest.entries.flatMap((entry) => entry.mcp.map((item) => item.serverName));
    expect(servers).toContain(API_SERVER);
    const skill = manifest.entries
      .flatMap((entry) => entry.components)
      .find((component) => component.kind === 'skill');
    expect(skill?.sha256).toBe(skillSha);
    expect(JSON.stringify(manifest)).not.toContain(UPSTREAM_SECRET);
  });

  it('downloads a component by hash, and a stale hash is not found', async () => {
    const res = await bearer(session.token, 'GET', `/v1/sync/components/${skillSha}`);
    expect(res.status).toBe(200);
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(skillSha);

    const stale = await bearer(session.token, 'GET', `/v1/sync/components/${'0'.repeat(64)}`);
    expect(stale.status).toBe(404);
  });

  it('lists tools and calls one through the gateway with the session token', async () => {
    expect(await toolNames(session.token)).toEqual(
      [`${API_SERVER}__delete_all`, `${API_SERVER}__echo`].sort(),
    );
    const called = await callTool(session.token, `${API_SERVER}__echo`);
    expect(called.status).toBe(200);
    expect(textOf(called.body)).toBe('echo:hi');
  });

  it('starts a sign-in as the user, finishes it at the provider and calls as that user', async () => {
    const started = await host('POST', '/connections', {
      userId,
      componentId: oauthPlugin.serverComponentId,
      callbackUrl: RETURN_URL,
    });
    expect(started.status).toBe(200);
    const { connectUrl } = (await started.json()) as { connectUrl: string };
    const landing = await consentAndReturn(connectUrl);
    expect(`${landing.origin}${landing.pathname}`).toBe(RETURN_URL);
    expect(landing.searchParams.get('connection')).toBe('connected');

    const listed = (await (
      await host('GET', `/connections?userId=${encodeURIComponent(userId)}`)
    ).json()) as { items: { serverName: string; status: string }[] };
    expect(listed.items.map((item) => item.serverName)).toEqual([OAUTH_SERVER]);

    const called = await callTool(session.token, `${OAUTH_SERVER}__whoami`);
    expect(textOf(called.body)).toBe('whoami:hi');
  });

  it('a session tool policy hides a disabled tool and refuses it on call', async () => {
    const limited = await mint(userRef(), { tools: { disable: [`${API_SERVER}.delete_all`] } });
    expect(await toolNames(limited.token)).toEqual([`${API_SERVER}__echo`]);
    const refused = await callTool(limited.token, `${API_SERVER}__delete_all`);
    expect(JSON.stringify(refused.body)).toContain('tool_disabled');
  });

  it('shows the host what happened: logs of the calls, usage and the user in the project', async () => {
    const logs = (await (await host('GET', '/logs?limit=100')).json()) as {
      items: { userId?: string | null }[];
    };
    expect(logs.items.length).toBeGreaterThan(0);

    const usage = await host('GET', '/usage');
    expect(usage.status).toBe(200);
    expect(await usage.json()).toBeTypeOf('object');
  });

  it('shows the console the same users, sessions and logs', async () => {
    const root = `${base()}/${projectId}`;
    const users = (await (await callApi('GET', `${root}/users`, owner())).json()) as {
      items: { userId: string }[];
    };
    expect(users.items.map((item) => item.userId)).toContain(userId);

    const sessions = (await (await callApi('GET', `${root}/sessions`, owner())).json()) as {
      items: { id: string }[];
    };
    expect(sessions.items.map((item) => item.id)).toContain(session.id);

    const logs = await callApi('GET', `${root}/logs?limit=100`, owner());
    expect(logs.status).toBe(200);
    expect(((await logs.json()) as { items: unknown[] }).items.length).toBeGreaterThan(0);
  });

  it('removing a project plugin ends the sessions that name it', async () => {
    const named = await mint(userRef(), { plugins: [oauthPlugin.name] });
    expect((await bearer(named.token, 'GET', '/v1/sync')).status).toBe(200);
    expect((await host('DELETE', `/plugins/${oauthPlugin.pluginId}`)).status).toBe(204);
    expect((await bearer(named.token, 'GET', '/v1/sync')).status).toBe(401);
  });

  it('refuses a session over the live limit of one user', async () => {
    const crowded = userRef();
    for (let i = 0; i < PROJECT_LIMITS.sessionsPerUser; i += 1) await mint(crowded);
    const over = await host('POST', '/sessions', { userId: crowded });
    expect(over.status).toBe(409);
    expect(await codeOf(over)).toBe('limit_exceeded');
  });

  it('deleting the user in the console removes its sessions and connections', async () => {
    const [row] = await sql<{ id: string }>(
      `SELECT id FROM "user" WHERE project_id = $1 AND external_ref = $2`,
      [rawProjectId, userId],
    );
    const removed = await callApi(
      'DELETE',
      `${base()}/${projectId}/users/${formatId('usr', row!.id)}`,
      owner(),
    );
    expect(removed.status).toBe(204);
    expect((await bearer(session.token, 'GET', '/v1/sync')).status).toBe(401);
    const left = (await (
      await host('GET', `/connections?userId=${encodeURIComponent(userId)}`)
    ).json()) as { items: unknown[] };
    expect(left.items).toEqual([]);
  });

  it('delivers a signed user.created and sync.reported event to the webhook', async () => {
    const own = await createProject();
    const path = `/flow-hook-${randomUUID().slice(0, 8)}`;
    const set = await callApi('PUT', `${base()}/${own.projectId}/webhook`, owner(), {
      url: `${FIXTURE_ORIGIN}${path}`,
      events: ['user.created', 'sync.reported'],
    });
    expect(set.status).toBe(201);
    secret = ((await set.json()) as { secret: string }).secret;

    const minted = await bearer(own.key, 'POST', '/v1/project/sessions', { userId: userRef() });
    const { token } = (await minted.json()) as { token: string };
    const created = await until(() => hooks.find((entry) => entry.path === path));
    expect(JSON.parse(created.body)).toMatchObject({ type: 'user.created', version: 1 });
    expect(verified(created, secret)).toBe(true);

    const report = await bearer(token, 'POST', '/v1/sync/reports', {
      target: 'cursor',
      applied: [],
    });
    expect(report.status).toBe(204);
    const second = await until(() => {
      const found = hooks.filter((entry) => entry.path === path);
      return found.length > 1 ? found[1] : undefined;
    });
    expect(JSON.parse(second.body)).toMatchObject({ type: 'sync.reported' });
    expect(verified(second, secret)).toBe(true);
  });
});

describe('keys and projects', () => {
  it('rotates a key: both work inside the grace window and the old one fails after it', async () => {
    const own = await createProject();
    const rotated = await callApi(
      'POST',
      `${base()}/${own.projectId}/keys/${own.id}/rotate`,
      owner(),
    );
    expect(rotated.status).toBe(201);
    const { rawKey } = (await rotated.json()) as { rawKey: string };
    expect((await bearer(own.key, 'GET', '/v1/project/me')).status).toBe(200);
    expect((await bearer(rawKey, 'GET', '/v1/project/me')).status).toBe(200);

    await sql(
      `UPDATE project_key SET created_at = now() - interval '2 days',
                              expires_at = now() - interval '1 minute' WHERE key_id = $1`,
      [own.keyId],
    );
    expect((await bearer(own.key, 'GET', '/v1/project/me')).status).toBe(401);
    expect((await bearer(rawKey, 'GET', '/v1/project/me')).status).toBe(200);
  });

  it('refuses a key used from an address it is not limited to', async () => {
    const own = await createProject(undefined, { allowedCidrs: ['203.0.113.0/24'] });
    expect((await bearer(own.key, 'GET', '/v1/project/me')).status).toBe(401);
  });

  it('refuses a session that has expired', async () => {
    const own = await createProject();
    const minted = await bearer(own.key, 'POST', '/v1/project/sessions', { userId: userRef() });
    const { token } = (await minted.json()) as { token: string };
    expect((await bearer(token, 'GET', '/v1/sync')).status).toBe(200);
    await sql(`UPDATE api_key SET expires_at = now() - interval '1 minute' WHERE key_id = $1`, [
      token.split('.')[0],
    ]);
    expect((await bearer(token, 'GET', '/v1/sync')).status).toBe(401);
  });

  it('suspending the project stops its keys and sessions, and resuming brings them back', async () => {
    const own = await createProject();
    const minted = await bearer(own.key, 'POST', '/v1/project/sessions', { userId: userRef() });
    const { token } = (await minted.json()) as { token: string };
    const patch = (status: string) =>
      callApi('PATCH', `${base()}/${own.projectId}`, owner(), { status });

    expect((await patch('suspended')).status).toBe(200);
    expect((await bearer(own.key, 'GET', '/v1/project/me')).status).toBe(401);
    expect((await bearer(token, 'GET', '/v1/sync')).status).toBe(401);
    expect((await patch('active')).status).toBe(200);
    expect((await bearer(own.key, 'GET', '/v1/project/me')).status).toBe(200);
  });
});
