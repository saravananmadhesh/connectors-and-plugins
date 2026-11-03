/**
 * Connections of a project's users: the host starts a sign-in for one of its users (or a session's
 * user starts their own), the browser comes back with no website session and lands on the
 * project's registered origin, and the gateway then calls the server as that user. Nothing crosses
 * projects or users: a connection of another project does not exist for the caller, and a user
 * lists only their own.
 *
 * Run: pnpm test "--only=integration"
 */
import { createHash, randomUUID } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { apiUrl, gatewayUrl } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';
import { FIXTURE_ORIGIN, listenOnFixturePort } from './support/fixture-port.js';

const SERVER_NAME = `pcon-${randomUUID().slice(0, 8)}`;
const CLIENT_ID = 'project-fixture-client';
const HOST_ORIGIN = 'https://app.example.test';
const RETURN_URL = `${HOST_ORIGIN}/settings/connections`;
const DAY = 86_400_000;
const SCOPES = [
  'sessions:read',
  'sessions:write',
  'plugins:read',
  'plugins:write',
  'connections:read',
  'connections:write',
  'auth-configs:read',
  'auth-configs:write',
];
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

// ─── Fixture: an MCP server behind OAuth ──────────────────────────────────────

const codes = new Map<string, string>();
const accessTokens = new Set<string>();
const upstreamState = { issued: 0, refreshFails: false };

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const json = (res: ServerResponse, status: number, body: unknown, headers = {}) => {
  res.writeHead(status, { 'content-type': 'application/json', ...headers });
  res.end(JSON.stringify(body));
};

function issue(refreshed: boolean) {
  upstreamState.issued += 1;
  const accessToken = `${refreshed ? 'refreshed' : 'access'}-${upstreamState.issued}`;
  accessTokens.add(accessToken);
  return {
    access_token: accessToken,
    refresh_token: `refresh-${upstreamState.issued}`,
    expires_in: 3600,
    token_type: 'Bearer',
  };
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = new URL(req.url ?? '/', FIXTURE_ORIGIN).pathname;
  if (path === '/.well-known/oauth-protected-resource/project-mcp') {
    return json(res, 200, {
      resource: `${FIXTURE_ORIGIN}/project-mcp`,
      authorization_servers: [FIXTURE_ORIGIN],
    });
  }
  if (path === '/.well-known/oauth-authorization-server') {
    return json(res, 200, {
      issuer: FIXTURE_ORIGIN,
      authorization_endpoint: `${FIXTURE_ORIGIN}/authorize`,
      token_endpoint: `${FIXTURE_ORIGIN}/token`,
      registration_endpoint: `${FIXTURE_ORIGIN}/register`,
      code_challenge_methods_supported: ['S256'],
    });
  }
  if (path === '/register') return json(res, 201, { client_id: CLIENT_ID });
  if (path === '/token') {
    const form = new URLSearchParams(await readBody(req));
    if (form.get('grant_type') === 'refresh_token') {
      if (upstreamState.refreshFails) return json(res, 400, { error: 'invalid_grant' });
      return json(res, 200, issue(true));
    }
    const challenge = codes.get(form.get('code') ?? '');
    codes.delete(form.get('code') ?? '');
    const proof = createHash('sha256')
      .update(form.get('code_verifier') ?? '')
      .digest('base64url');
    if (!challenge || proof !== challenge) return json(res, 400, { error: 'invalid_grant' });
    return json(res, 200, issue(false));
  }
  if (path === '/project-mcp') {
    const bearer = /^Bearer (.+)$/.exec(req.headers.authorization ?? '')?.[1] ?? '';
    if (!accessTokens.has(bearer)) {
      return json(res, 401, {}, { 'www-authenticate': 'Bearer realm="fixture"' });
    }
    const message = JSON.parse(await readBody(req)) as { id?: number; method: string };
    const reply = (result: unknown) => json(res, 200, { jsonrpc: '2.0', id: message.id, result });
    if (message.method === 'initialize') {
      return reply({ protocolVersion: '2025-06-18', capabilities: { tools: {} } });
    }
    if (message.method === 'tools/list') {
      return reply({ tools: [{ name: 'whoami', description: 'Says which token called' }] });
    }
    if (message.method === 'tools/call') {
      return reply({ content: [{ type: 'text', text: `token:${bearer}` }] });
    }
    res.writeHead(202).end();
    return;
  }
  res.writeHead(404).end();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface Host {
  projectId: string;
  rawProjectId: string;
  key: string;
  /** A key that holds no connection scope. */
  narrowKey: string;
}
interface Seeded {
  rawId: string;
  name: string;
  pluginId: string;
  componentRaw: string;
  componentId: string;
}
interface Connection {
  id: string;
  userId: string;
  componentId: string;
  serverName: string;
  status: string;
  expiresAt: string | null;
}

let upstream: Server;
let fx: OrgFixture;
let a: Host;
let b: Host;
let oauthPlugin: Seeded;
let plainPlugin: Seeded;
let elsewherePlugin: Seeded;

const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const rawOf = (wire: string) =>
  wire.replace(/^[a-z]+_/, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
const userRef = () => `user-${randomUUID().slice(0, 10)}`;

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

const host = (h: Host, method: string, suffix: string, body?: unknown, extra = {}) =>
  bearer(h.key, method, `/v1/project${suffix}`, body, extra);

async function codeOf(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

async function createHost(): Promise<Host> {
  const created = await callApi('POST', base(), owner(), {
    name: `Host ${randomUUID().slice(0, 8)}`,
  });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const key = async (scopes: string[]) => {
    const res = await callApi('POST', `${base()}/${projectId}/keys`, owner(), {
      scopes,
      expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
    });
    expect(res.status).toBe(201);
    return ((await res.json()) as { rawKey: string }).rawKey;
  };
  await sql(`UPDATE project SET return_origins = $2 WHERE id = $1`, [
    rawOf(projectId),
    [HOST_ORIGIN],
  ]);
  return {
    projectId,
    rawProjectId: rawOf(projectId),
    key: await key(SCOPES),
    narrowKey: await key(SCOPES.filter((scope) => !scope.startsWith('connections:'))),
  };
}

async function seedPlugin(url: string, name?: string): Promise<Seeded> {
  const rawId = randomUUID();
  const pluginName = `conn-${rawId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Connection Plugin', 'fixture', 'fixture', 'active', 'public')`,
    [rawId, pluginName],
  );
  const version = randomUUID();
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5, 100)`,
    [version, rawId, `sha256-conn-${version}`, SCAN, `sha256-archive-${version}`],
  );
  const componentRaw = randomUUID();
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', $3, 'fixture server', $4)`,
    [
      componentRaw,
      version,
      name ?? `srv-${rawId.slice(0, 8)}`,
      JSON.stringify({ transport: 'http', url }),
    ],
  );
  return {
    rawId,
    name: pluginName,
    pluginId: formatId('plg', rawId),
    componentRaw,
    componentId: formatId('cmp', componentRaw),
  };
}

async function addPlugin(h: Host, plugin: Seeded, auth: 'oauth_dcr' | 'none'): Promise<void> {
  expect((await host(h, 'PUT', `/plugins/${plugin.pluginId}`, {})).status).toBe(201);
  const [installation] = await sql<{ id: string }>(
    `SELECT id FROM installation WHERE project_id = $1 AND plugin_id = $2`,
    [h.rawProjectId, plugin.rawId],
  );
  await sql(
    `INSERT INTO mcp_server (installation_id, component_id, organization_id, auth_type)
     VALUES ($1, $2, $3, $4)`,
    [installation!.id, plugin.componentRaw, fx.rawOrgId, auth],
  );
}

async function mint(h: Host, userId = userRef(), body: Record<string, unknown> = {}) {
  const res = await host(h, 'POST', '/sessions', { userId, ...body });
  expect(res.status).toBe(201);
  return { ...((await res.json()) as { id: string; token: string }), userId };
}

/** The browser's return from the provider: no cookie, no session, only what the provider sends. */
function callback(query: Record<string, string>): Promise<Response> {
  const { 'Content-Type': _contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}/v1/oauth/callback?${new URLSearchParams(query).toString()}`, {
    redirect: 'manual',
    headers: identity,
  });
}

const landing = (res: Response): URL => new URL(res.headers.get('location') ?? 'http://none/');

/** Plays the user's consent at the provider for an address the service handed out. */
function consent(address: string): { state: string; code: string } {
  const url = new URL(address);
  const code = `code-${randomUUID()}`;
  codes.set(code, url.searchParams.get('code_challenge') ?? '');
  return { state: url.searchParams.get('state') ?? '', code };
}

async function startAsHost(h: Host, userId: string, plugin = oauthPlugin, extra = {}) {
  const res = await host(h, 'POST', '/connections', {
    userId,
    componentId: plugin.componentId,
    callbackUrl: RETURN_URL,
    ...extra,
  });
  return res;
}

/** Host start, consent and callback: the user ends up connected. */
async function connectAsHost(h: Host, userId: string): Promise<Connection> {
  const started = await startAsHost(h, userId);
  expect(started.status).toBe(200);
  const { connectUrl } = (await started.json()) as { connectUrl: string };
  const { state, code } = consent(connectUrl);
  const done = await callback({ code, state });
  expect(done.status).toBe(302);
  expect(landing(done).searchParams.get('connection')).toBe('connected');
  const list = await host(h, 'GET', `/connections?userId=${encodeURIComponent(userId)}`);
  const page = (await list.json()) as { items: Connection[] };
  expect(page.items).toHaveLength(1);
  return page.items[0]!;
}

const tokenRows = (h: Host) =>
  sql<{ status: string; external_ref: string }>(
    `SELECT t.status, u.external_ref FROM mcp_oauth_token t
       JOIN "user" u ON u.id = t.user_id WHERE u.project_id = $1`,
    [h.rawProjectId],
  );

const stateRows = async (h: Host): Promise<number> =>
  Number(
    (
      await sql<{ n: string }>(
        `SELECT count(*)::text AS n FROM mcp_oauth_state WHERE project_id = $1`,
        [h.rawProjectId],
      )
    )[0]?.n,
  );

const gatewayCall = (key: string, method: string, params?: unknown) =>
  fetch(`${gatewayUrl}/mcp`, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });

async function callTool(token: string): Promise<{ text: string | null; failed: boolean }> {
  const res = await gatewayCall(token, 'tools/call', {
    name: `${SERVER_NAME}__whoami`,
    arguments: {},
  });
  const body = (await res.json()) as {
    error?: unknown;
    result?: { isError?: boolean; content?: { text: string }[] };
  };
  return {
    text: body.result?.content?.[0]?.text ?? null,
    failed: body.error !== undefined || body.result?.isError === true,
  };
}

beforeAll(async () => {
  upstream = await listenOnFixturePort(createServer((req, res) => void handle(req, res)));
  fx = await createOrgFixture('project-connections');
  a = await createHost();
  b = await createHost();
  oauthPlugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`, SERVER_NAME);
  plainPlugin = await seedPlugin(`${FIXTURE_ORIGIN}/plain-mcp`);
  elsewherePlugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`);
  await addPlugin(a, oauthPlugin, 'oauth_dcr');
  await addPlugin(a, plainPlugin, 'none');
  await addPlugin(b, elsewherePlugin, 'oauth_dcr');
}, 240_000);

afterAll(async () => {
  await new Promise<void>((resolve) => upstream?.close(() => resolve()));
});

// ─── The host starts a connection ─────────────────────────────────────────────

describe('the host starts a connection for a user', () => {
  it('makes the user, stores a project state, and returns the sign-in address', async () => {
    const user = userRef();
    const res = await startAsHost(a, user);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { connectUrl: string; expiresAt: string };
    const url = new URL(body.connectUrl);
    expect(`${url.origin}${url.pathname}`).toBe(`${FIXTURE_ORIGIN}/authorize`);
    expect(new Date(body.expiresAt).getTime()).toBeGreaterThan(Date.now());
    expect(url.searchParams.get('state')?.startsWith(`${fx.rawOrgId}.`)).toBe(true);

    const rows = await sql<{ return_url: string; client_state: string }>(
      `SELECT s.return_url, s.client_state FROM mcp_oauth_state s
         JOIN "user" u ON u.id = s.user_id
        WHERE s.project_id = $1 AND u.external_ref = $2`,
      [a.rawProjectId, user],
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.return_url).toBe(RETURN_URL);
    expect(rows[0]!.client_state).toMatch(/^[A-Za-z0-9_-]{16,128}$/);

    // A project user belongs to no organization as a member.
    const members = await sql(
      `SELECT 1 FROM organization_member m JOIN "user" u ON u.id = m.user_id
        WHERE u.project_id = $1`,
      [a.rawProjectId],
    );
    expect(members).toHaveLength(0);
  });

  it('starts a sign-in for a server that has no row yet, when a project auth config sets it up', async () => {
    const plugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`, SERVER_NAME);
    expect((await host(a, 'PUT', `/plugins/${plugin.pluginId}`, {})).status).toBe(201);
    const made = await host(a, 'POST', '/auth-configs', {
      componentId: plugin.componentId,
      name: `config-${randomUUID().slice(0, 8)}`,
      authMode: 'dcr',
    });
    expect(made.status).toBe(201);
    expect(
      await sql(`SELECT 1 FROM mcp_server WHERE component_id = $1`, [plugin.componentRaw]),
    ).toHaveLength(0);

    const res = await startAsHost(a, userRef(), plugin);
    expect(res.status).toBe(200);
    const { connectUrl } = (await res.json()) as { connectUrl: string };
    expect(`${new URL(connectUrl).origin}${new URL(connectUrl).pathname}`).toBe(
      `${FIXTURE_ORIGIN}/authorize`,
    );
    expect(
      await sql(`SELECT 1 FROM mcp_server WHERE component_id = $1`, [plugin.componentRaw]),
    ).toHaveLength(1);
  });

  it.each([
    ['another origin', 'https://evil.example/settings'],
    ['an origin that only starts like it', `${HOST_ORIGIN}.evil.test/settings`],
    ['credentials that hide the real host', 'https://app.example.test@evil.test/settings'],
    ['the wrong scheme', 'http://app.example.test/settings'],
    ['another port', 'https://app.example.test:8443/settings'],
    ['a fragment', `${RETURN_URL}#token`],
    ['a script address', 'javascript:alert(1)'],
    ['a relative address', '/settings/connections'],
  ])('refuses %s and stores nothing', async (_name, callbackUrl) => {
    const before = await stateRows(a);
    const res = await startAsHost(a, userRef(), oauthPlugin, { callbackUrl });
    expect(res.status).toBe(422);
    expect(await codeOf(res)).toBe('return_url_not_allowed');
    expect(await stateRows(a)).toBe(before);
  });

  it('refuses a malformed request', async () => {
    for (const body of [
      undefined,
      {},
      { userId: 'u', componentId: oauthPlugin.componentId },
      { userId: '', componentId: oauthPlugin.componentId, callbackUrl: RETURN_URL },
      { userId: 'u', componentId: 'cmp_nope', callbackUrl: RETURN_URL },
      { userId: 'u', componentId: oauthPlugin.componentId, callbackUrl: RETURN_URL, extra: 1 },
    ]) {
      const res = await host(a, 'POST', '/connections', body);
      expect(res.status).toBe(400);
      expect(await codeOf(res)).toBe('validation_failed');
    }
  });

  it('answers not_oauth for a server that needs no sign-in', async () => {
    const res = await startAsHost(a, userRef(), plainPlugin);
    expect(res.status).toBe(422);
    expect(await codeOf(res)).toBe('not_oauth');
  });

  it("answers not_found for a server the project's users are not delivered", async () => {
    const res = await startAsHost(a, userRef(), elsewherePlugin);
    expect(res.status).toBe(404);
  });

  it('refuses a key without the connection scope', async () => {
    const res = await bearer(a.narrowKey, 'POST', '/v1/project/connections', {
      userId: userRef(),
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(res.status).toBe(403);
    expect(await codeOf(res)).toBe('insufficient_scope');
  });

  it('refuses a session token and a suspended project', async () => {
    const session = await mint(a);
    const asSession = await bearer(session.token, 'POST', '/v1/project/connections', {
      userId: 'u',
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(asSession.status).toBe(401);

    const tmp = await createHost();
    await sql(`UPDATE project SET status = 'suspended' WHERE id = $1`, [tmp.rawProjectId]);
    const suspended = await startAsHost(tmp, 'u');
    expect(suspended.status).toBe(401);
  });
});

// ─── The browser comes back ───────────────────────────────────────────────────

describe('the callback', () => {
  it('stores the tokens for the user, lands on the project origin and writes the audit row', async () => {
    const user = userRef();
    const started = await startAsHost(a, user);
    const { connectUrl } = (await started.json()) as { connectUrl: string };
    const { state, code } = consent(connectUrl);
    const res = await callback({ code, state });

    expect(res.status).toBe(302);
    expect(res.headers.get('x-external-return')).toBe('1');
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.headers.get('referrer-policy')).toBe('no-referrer');
    const to = landing(res);
    expect(`${to.origin}${to.pathname}`).toBe(RETURN_URL);
    expect(to.searchParams.get('connection')).toBe('connected');
    expect(to.searchParams.get('server')).toBe(oauthPlugin.componentId);
    expect(to.searchParams.get('clientState')).toMatch(/^[A-Za-z0-9_-]{16,128}$/);
    expect(to.href).not.toContain(code);
    expect(to.href).not.toContain(state);
    expect(to.href).not.toContain('access-');

    const rows = (await tokenRows(a)).filter((row) => row.external_ref === user);
    expect(rows).toEqual([{ status: 'active', external_ref: user }]);

    const [rawUser] = await sql<{ id: string }>(
      `SELECT id FROM "user" WHERE project_id = $1 AND external_ref = $2`,
      [a.rawProjectId, user],
    );
    const audit = await sql<{ project_id: string; subject_user_id: string }>(
      `SELECT project_id::text, subject_user_id::text FROM audit_log
        WHERE action = 'connection.activated' AND subject_user_id = $1`,
      [rawUser!.id],
    );
    expect(audit).toEqual([{ project_id: a.rawProjectId, subject_user_id: rawUser!.id }]);
  });

  it('works once: a used state is refused with no redirect', async () => {
    const started = await startAsHost(a, userRef());
    const { connectUrl } = (await started.json()) as { connectUrl: string };
    const { state, code } = consent(connectUrl);
    expect((await callback({ code, state })).status).toBe(302);
    const again = await callback({ code, state });
    expect(again.status).toBe(401);
    expect(again.headers.get('location')).toBeNull();
  });

  it('sends a denial and a failed exchange back to the host, with no tokens', async () => {
    const user = userRef();
    const { connectUrl } = (await (await startAsHost(a, user)).json()) as { connectUrl: string };
    const denied = await callback({
      error: 'access_denied',
      state: consent(connectUrl).state,
    });
    expect(landing(denied).searchParams.get('connection')).toBe('denied');

    const second = (await (await startAsHost(a, user)).json()) as { connectUrl: string };
    const failed = await callback({
      code: 'never-issued',
      state: consent(second.connectUrl).state,
    });
    expect(landing(failed).searchParams.get('connection')).toBe('oauth_exchange_failed');
    expect((await tokenRows(a)).filter((row) => row.external_ref === user)).toEqual([]);
  });

  it('refuses without a redirect, and stores nothing, when the project was suspended meanwhile', async () => {
    const h = await createHost();
    const plugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`);
    await addPlugin(h, plugin, 'oauth_dcr');
    const started = await startAsHost(h, 'u1', plugin);
    expect(started.status).toBe(200);
    const { state, code } = consent(((await started.json()) as { connectUrl: string }).connectUrl);
    await sql(`UPDATE project SET status = 'suspended' WHERE id = $1`, [h.rawProjectId]);
    const res = await callback({ code, state });
    expect(res.status).toBe(400);
    expect(res.headers.get('location')).toBeNull();
    expect(await tokenRows(h)).toEqual([]);
    expect(await stateRows(h)).toBe(0);
  });

  it('refuses without a redirect when the return origin was removed meanwhile', async () => {
    const h = await createHost();
    const plugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`);
    await addPlugin(h, plugin, 'oauth_dcr');
    const started = await startAsHost(h, 'u1', plugin);
    const { state, code } = consent(((await started.json()) as { connectUrl: string }).connectUrl);
    await sql(`UPDATE project SET return_origins = $2 WHERE id = $1`, [
      h.rawProjectId,
      ['https://other.example.test'],
    ]);
    const res = await callback({ code, state });
    expect(res.status).toBe(400);
    expect(res.headers.get('location')).toBeNull();
    expect(await tokenRows(h)).toEqual([]);
  });

  it('goes back to the host without tokens when the user is suspended meanwhile', async () => {
    const user = userRef();
    const started = await startAsHost(a, user);
    const { state, code } = consent(((await started.json()) as { connectUrl: string }).connectUrl);
    await sql(
      `UPDATE "user" SET status = 'suspended' WHERE project_id = $1 AND external_ref = $2`,
      [a.rawProjectId, user],
    );
    const res = await callback({ code, state });
    expect(res.status).toBe(302);
    expect(landing(res).searchParams.get('connection')).toBe('oauth_state_invalid');
    expect((await tokenRows(a)).filter((row) => row.external_ref === user)).toEqual([]);
  });

  it('goes back to the host without tokens when the plugin left the project meanwhile', async () => {
    const h = await createHost();
    const plugin = await seedPlugin(`${FIXTURE_ORIGIN}/project-mcp`);
    await addPlugin(h, plugin, 'oauth_dcr');
    const started = await startAsHost(h, 'u1', plugin);
    const { state, code } = consent(((await started.json()) as { connectUrl: string }).connectUrl);
    expect((await host(h, 'DELETE', `/plugins/${plugin.pluginId}`)).status).toBe(204);
    const res = await callback({ code, state });
    expect(res.status).toBeGreaterThanOrEqual(300);
    expect(await tokenRows(h)).toEqual([]);
  });

  it('refuses a state whose organization part was swapped', async () => {
    const started = await startAsHost(a, userRef());
    const { state, code } = consent(((await started.json()) as { connectUrl: string }).connectUrl);
    const forged = `${fx.stranger.rawOrgId}.${state.split('.')[1]}`;
    const res = await callback({ code, state: forged });
    expect(res.status).toBe(401);
    // The real flow can still finish.
    expect(landing(await callback({ code, state })).searchParams.get('connection')).toBe(
      'connected',
    );
  });
});

// ─── Reading and removing ─────────────────────────────────────────────────────

describe('listing and removing connections', () => {
  it('lists a connection for the host by the user id, exactly', async () => {
    const user = userRef();
    const connection = await connectAsHost(a, user);
    expect(connection.id).toMatch(/^ucn_[0-9a-f]{32}$/);
    expect(connection).toMatchObject({
      userId: user,
      componentId: oauthPlugin.componentId,
      serverName: SERVER_NAME,
      status: 'active',
    });
    expect(connection).not.toHaveProperty('accessSealed');

    const other = await host(a, 'GET', `/connections?userId=${encodeURIComponent(`${user}x`)}`);
    expect(((await other.json()) as { items: unknown[] }).items).toEqual([]);
    const all = await host(a, 'GET', `/connections?componentId=${oauthPlugin.componentId}`);
    const ids = ((await all.json()) as { items: Connection[] }).items.map((item) => item.id);
    expect(ids).toContain(connection.id);
  });

  it('pages the list', async () => {
    const first = await connectAsHost(a, userRef());
    await connectAsHost(a, userRef());
    const page = await host(a, 'GET', '/connections?limit=1');
    const body = (await page.json()) as { items: Connection[]; nextCursor: string | null };
    expect(body.items).toHaveLength(1);
    expect(body.nextCursor).not.toBeNull();
    const next = await host(
      a,
      'GET',
      `/connections?limit=1&cursor=${encodeURIComponent(body.nextCursor!)}`,
    );
    expect(((await next.json()) as { items: unknown[] }).items).toHaveLength(1);
    expect(first.id).toMatch(/^ucn_/);
    const bad = await host(a, 'GET', '/connections?cursor=not-a-cursor');
    expect(bad.status).toBe(400);
  });

  it("never shows another project's connections, and answers 404 when deleting one", async () => {
    const connection = await connectAsHost(a, userRef());
    const listed = await host(b, 'GET', '/connections');
    const ids = ((await listed.json()) as { items: Connection[] }).items.map((item) => item.id);
    expect(ids).not.toContain(connection.id);

    const del = await host(b, 'DELETE', `/connections/${connection.id}`);
    expect(del.status).toBe(404);
    expect((await host(a, 'GET', `/connections?userId=${connection.userId}`)).status).toBe(200);
    expect(
      (await tokenRows(a)).filter((row) => row.external_ref === connection.userId),
    ).toHaveLength(1);
  });

  it('deletes through the host key, once, and writes an audit row for the project', async () => {
    const connection = await connectAsHost(a, userRef());
    expect((await host(a, 'DELETE', `/connections/${connection.id}`)).status).toBe(204);
    expect((await host(a, 'DELETE', `/connections/${connection.id}`)).status).toBe(404);
    expect(
      (await tokenRows(a)).filter((row) => row.external_ref === connection.userId),
    ).toHaveLength(0);
    const audit = await sql(
      `SELECT 1 FROM audit_log WHERE action = 'mcp_server.disconnected' AND project_id = $1`,
      [a.rawProjectId],
    );
    expect(audit.length).toBeGreaterThan(0);
  });

  it('refuses a malformed id and a key without the scope', async () => {
    expect((await host(a, 'DELETE', '/connections/not-an-id')).status).toBe(404);
    const connection = await connectAsHost(a, userRef());
    const narrow = await bearer(a.narrowKey, 'DELETE', `/v1/project/connections/${connection.id}`);
    expect(narrow.status).toBe(403);
    const narrowList = await bearer(a.narrowKey, 'GET', '/v1/project/connections');
    expect(narrowList.status).toBe(403);
  });

  it('lets the console read as a member and delete only as an admin', async () => {
    const connection = await connectAsHost(a, userRef());
    const path = `${base()}/${a.projectId}/connections`;
    const asMember = await callApi('GET', path, fx.users.viewer);
    expect(asMember.status).toBe(200);
    expect(
      ((await asMember.json()) as { items: Connection[] }).items.map((item) => item.id),
    ).toContain(connection.id);
    expect((await callApi('DELETE', `${path}/${connection.id}`, fx.users.viewer)).status).toBe(403);
    expect((await callApi('GET', path, fx.stranger)).status).toBe(404);
    // Another project of the same organization does not hold it.
    expect(
      (await callApi('DELETE', `${base()}/${b.projectId}/connections/${connection.id}`, owner()))
        .status,
    ).toBe(404);
    expect((await callApi('DELETE', `${path}/${connection.id}`, owner())).status).toBe(204);
  });
});

// ─── A session's own user ─────────────────────────────────────────────────────

describe('a session starts and reads its own connections', () => {
  const startAsSession = (token: string, body: Record<string, unknown>, extra = {}) =>
    bearer(token, 'POST', '/v1/session/connections', body, extra);

  it('connects the user, lists only their own, and the gateway calls the server as them', async () => {
    const one = await mint(a);
    const two = await mint(a);
    const started = await startAsSession(one.token, {
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(started.status).toBe(200);
    const { redirectUrl } = (await started.json()) as { redirectUrl: string };
    const { state, code } = consent(redirectUrl);

    // Before the sign-in the gateway cannot call the server for this user.
    expect((await callTool(one.token)).failed).toBe(true);
    const done = await callback({ code, state });
    expect(landing(done).searchParams.get('connection')).toBe('connected');

    const mine = await bearer(one.token, 'GET', '/v1/session/connections');
    const items = ((await mine.json()) as { items: Connection[] }).items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ userId: one.userId, status: 'active' });
    const theirs = await bearer(two.token, 'GET', '/v1/session/connections');
    expect(((await theirs.json()) as { items: unknown[] }).items).toEqual([]);

    const call = await callTool(one.token);
    expect(call.failed).toBe(false);
    expect(call.text).toMatch(/^token:access-\d+$/);
    // The other user is not served the first user's tokens.
    expect((await callTool(two.token)).failed).toBe(true);
  });

  it('refuses a server the session may not reach, a plain server and a bad address', async () => {
    const session = await mint(a);
    const missing = await startAsSession(session.token, {
      componentId: elsewherePlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(missing.status).toBe(404);
    const plain = await startAsSession(session.token, {
      componentId: plainPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(plain.status).toBe(422);
    expect(await codeOf(plain)).toBe('not_oauth');
    const bad = await startAsSession(session.token, {
      componentId: oauthPlugin.componentId,
      callbackUrl: 'https://evil.example/x',
    });
    expect(bad.status).toBe(422);
    expect(await codeOf(bad)).toBe('return_url_not_allowed');
  });

  it('keeps a session limited to its plugin list from connecting to another plugin', async () => {
    const session = await mint(a, userRef(), { plugins: [plainPlugin.name] });
    const res = await startAsSession(session.token, {
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(res.status).toBe(404);
  });

  it("never reaches another project's server with a session of this project", async () => {
    const sessionB = await mint(b);
    const res = await startAsSession(sessionB.token, {
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    expect(res.status).toBe(404);
  });

  it('refuses a host key, a revoked session and a call with no token', async () => {
    const body = { componentId: oauthPlugin.componentId, callbackUrl: RETURN_URL };
    expect((await startAsSession(a.key, body)).status).toBe(401);
    const session = await mint(a);
    expect((await host(a, 'DELETE', `/sessions/${session.id}`)).status).toBe(204);
    expect((await startAsSession(session.token, body)).status).toBe(401);
    const { 'Content-Type': contentType, ...identity } = workloadHeaders;
    const anon = await fetch(`${apiUrl}/v1/session/connections`, {
      method: 'POST',
      headers: { ...identity, 'Content-Type': contentType },
      body: JSON.stringify(body),
    });
    expect(anon.status).toBe(401);
  });

  it('answers a repeat under one Idempotency-Key with the same address, per user', async () => {
    const one = await mint(a);
    const two = await mint(a);
    const body = { componentId: oauthPlugin.componentId, callbackUrl: RETURN_URL };
    const key = randomUUID();
    const first = await startAsSession(one.token, body, { 'Idempotency-Key': key });
    expect(first.status).toBe(200);
    const firstAddress = ((await first.json()) as { redirectUrl: string }).redirectUrl;

    const again = await startAsSession(one.token, body, { 'Idempotency-Key': key });
    expect(again.status).toBe(200);
    expect(again.headers.get('idempotent-replayed')).toBe('true');
    expect(((await again.json()) as { redirectUrl: string }).redirectUrl).toBe(firstAddress);

    const changed = await startAsSession(
      one.token,
      { ...body, callbackUrl: `${RETURN_URL}?other=1` },
      { 'Idempotency-Key': key },
    );
    expect(changed.status).toBe(409);
    // Another user with the same key and body is not handed the first user's address.
    const stolen = await startAsSession(two.token, body, { 'Idempotency-Key': key });
    expect(stolen.status).toBe(409);
  });
});

// ─── Replay under a key, for the host ─────────────────────────────────────────

describe('the host repeats a start', () => {
  it('answers with the first address and refuses the key with another body', async () => {
    const user = userRef();
    const key = randomUUID();
    const send = (extra: Record<string, unknown> = {}) =>
      host(
        a,
        'POST',
        '/connections',
        { userId: user, componentId: oauthPlugin.componentId, callbackUrl: RETURN_URL, ...extra },
        { 'Idempotency-Key': key },
      );
    const first = await send();
    expect(first.status).toBe(200);
    const firstBody = (await first.json()) as { connectUrl: string };
    const again = await send();
    expect(again.headers.get('idempotent-replayed')).toBe('true');
    expect(((await again.json()) as { connectUrl: string }).connectUrl).toBe(firstBody.connectUrl);
    expect((await send({ callbackUrl: `${RETURN_URL}?x=1` })).status).toBe(409);
    expect(await stateRows(a)).toBeGreaterThan(0);
  });
});

// ─── A provider that stops accepting the tokens ───────────────────────────────

describe('a connection that expires', () => {
  it('refreshes a token that is about to expire and calls with the new one', async () => {
    const session = await mint(a);
    const started = await bearer(session.token, 'POST', '/v1/session/connections', {
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    const { state, code } = consent(
      ((await started.json()) as { redirectUrl: string }).redirectUrl,
    );
    expect(landing(await callback({ code, state })).searchParams.get('connection')).toBe(
      'connected',
    );
    await sql(
      `UPDATE mcp_oauth_token SET expires_at = now() + interval '10 seconds'
        WHERE user_id IN (SELECT id FROM "user" WHERE project_id = $1 AND external_ref = $2)`,
      [a.rawProjectId, session.userId],
    );
    const call = await callTool(session.token);
    expect(call.failed).toBe(false);
    expect(call.text).toMatch(/^token:refreshed-\d+$/);
  });

  it('turns to needs_reauth and writes connection.expired for the project and the user', async () => {
    const session = await mint(a);
    const started = await bearer(session.token, 'POST', '/v1/session/connections', {
      componentId: oauthPlugin.componentId,
      callbackUrl: RETURN_URL,
    });
    const { state, code } = consent(
      ((await started.json()) as { redirectUrl: string }).redirectUrl,
    );
    expect(landing(await callback({ code, state })).searchParams.get('connection')).toBe(
      'connected',
    );
    expect((await callTool(session.token)).failed).toBe(false);

    await sql(
      `UPDATE mcp_oauth_token SET expires_at = now() - interval '1 hour'
        WHERE user_id IN (SELECT id FROM "user" WHERE project_id = $1 AND external_ref = $2)`,
      [a.rawProjectId, session.userId],
    );
    upstreamState.refreshFails = true;
    try {
      expect((await callTool(session.token)).failed).toBe(true);
    } finally {
      upstreamState.refreshFails = false;
    }
    const rows = (await tokenRows(a)).filter((row) => row.external_ref === session.userId);
    expect(rows).toEqual([{ status: 'needs_reauth', external_ref: session.userId }]);

    const listed = await host(a, 'GET', `/connections?userId=${session.userId}`);
    expect(((await listed.json()) as { items: Connection[] }).items[0]?.status).toBe(
      'needs_reauth',
    );
    const [rawUser] = await sql<{ id: string }>(
      `SELECT id FROM "user" WHERE project_id = $1 AND external_ref = $2`,
      [a.rawProjectId, session.userId],
    );
    const audit = await sql<{ project_id: string }>(
      `SELECT project_id::text FROM audit_log
        WHERE action = 'connection.expired' AND subject_user_id = $1`,
      [rawUser!.id],
    );
    expect(audit).toEqual([{ project_id: a.rawProjectId }]);
  });
});
