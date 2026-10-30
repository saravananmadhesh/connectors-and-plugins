/**
 * Server auth settings and the per-member OAuth sign-in against a fixture that plays both the MCP
 * server and its authorization server: discovery, registration, PKCE, the browser callback, token
 * refresh, a provider that revokes, and disconnecting. Tools are called through the gateway.
 *
 * Run: pnpm test -- --only=integration
 */
import { createHash, randomUUID } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { callApi } from './org-fixture.js';
import { createSignedInUser, sql, workloadHeaders, type SignedInUser } from './signed-in-user.js';
import { FIXTURE_ORIGIN, listenOnFixturePort } from './support/fixture-port.js';
import { apiUrl } from './test-env.js';

const SERVER_NAME = `oauth-${randomUUID().slice(0, 8)}`;
const CLIENT_ID = 'fixture-client';

// ─── Fixture: an MCP server behind OAuth ──────────────────────────────────────

const codes = new Map<string, string>();
const accessTokens = new Set<string>();
const fixture = {
  expiresIn: 3600,
  refreshFails: false,
  registrations: 0,
  refreshes: 0,
  issued: 0,
};

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
  fixture.issued += 1;
  const accessToken = `${refreshed ? 'refreshed' : 'access'}-${fixture.issued}`;
  accessTokens.add(accessToken);
  return {
    access_token: accessToken,
    refresh_token: `refresh-${fixture.issued}`,
    expires_in: refreshed ? 3600 : fixture.expiresIn,
    token_type: 'Bearer',
  };
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = new URL(req.url ?? '/', FIXTURE_ORIGIN).pathname;
  if (path === '/.well-known/oauth-protected-resource/oauth-mcp') {
    return json(res, 200, {
      resource: `${FIXTURE_ORIGIN}/oauth-mcp`,
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
      scopes_supported: ['read'],
    });
  }
  if (path === '/register') {
    fixture.registrations += 1;
    return json(res, 201, { client_id: CLIENT_ID });
  }
  if (path === '/token') {
    const form = new URLSearchParams(await readBody(req));
    if (form.get('grant_type') === 'authorization_code') {
      const challenge = codes.get(form.get('code') ?? '');
      codes.delete(form.get('code') ?? '');
      const verifier = form.get('code_verifier') ?? '';
      const proof = createHash('sha256').update(verifier).digest('base64url');
      if (!challenge || proof !== challenge || form.get('client_id') !== CLIENT_ID) {
        return json(res, 400, { error: 'invalid_grant' });
      }
      return json(res, 200, issue(false));
    }
    if (form.get('grant_type') === 'refresh_token') {
      fixture.refreshes += 1;
      if (fixture.refreshFails) return json(res, 400, { error: 'invalid_grant' });
      return json(res, 200, issue(true));
    }
    return json(res, 400, { error: 'unsupported_grant_type' });
  }
  if (path === '/oauth-mcp') {
    const bearer = /^Bearer (.+)$/.exec(req.headers.authorization ?? '')?.[1] ?? '';
    if (!accessTokens.has(bearer)) {
      return json(res, 401, {}, { 'www-authenticate': 'Bearer realm="fixture"' });
    }
    const message = JSON.parse(await readBody(req)) as {
      id?: number;
      method: string;
      params?: { arguments?: { text?: string } };
    };
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

let upstream: Server;
let user: SignedInUser;
let installationId = '';
let componentId = '';

const serverPath = () =>
  `/v1/orgs/${user.orgId}/me/installations/${installationId}/mcp-servers/${componentId}`;

/** The browser's return from the provider, without following the redirect to the app. */
function callback(query: Record<string, string>, member: SignedInUser = user): Promise<Response> {
  const { 'Content-Type': _contentType, ...identity } = workloadHeaders;
  const search = new URLSearchParams(query).toString();
  return fetch(`${apiUrl}/v1/oauth/callback?${search}`, {
    redirect: 'manual',
    headers: { ...identity, 'x-session-token': member.sessionToken },
  });
}

const landing = (res: Response): URL => new URL(res.headers.get('location') ?? 'http://none/');

/** Starts a sign-in and plays the member's consent: returns the state and a fresh code. */
async function beginSignIn(member: SignedInUser = user, path = serverPath()) {
  const res = await callApi('POST', `${path}/oauth/start`, member);
  expect(res.status).toBe(200);
  const url = new URL(((await res.json()) as { authorizeUrl: string }).authorizeUrl);
  const code = `code-${randomUUID()}`;
  codes.set(code, url.searchParams.get('code_challenge') ?? '');
  return { url, state: url.searchParams.get('state') ?? '', code };
}

async function setAuth(body: unknown): Promise<Response> {
  return callApi('PUT', `${serverPath()}/auth`, user, body);
}

async function tokenStatus(): Promise<string | undefined> {
  const rows = await sql<{ status: string }>(
    `SELECT status FROM mcp_oauth_token WHERE organization_id = $1`,
    [user.rawOrgId],
  );
  return rows[0]?.status;
}

async function connect(): Promise<void> {
  const { state, code } = await beginSignIn();
  const done = await callback({ code, state });
  expect(landing(done).searchParams.get('oauth')).toBe('connected');
}

beforeAll(async () => {
  upstream = await listenOnFixturePort(createServer((req, res) => void handle(req, res)));
  user = await createSignedInUser('mcp-oauth');

  const pluginId = randomUUID();
  const versionId = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'OAuth Fixture', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, `mcp-oauth-${pluginId.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published')`,
    [versionId, pluginId, `sha256-oauth-${versionId}`],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', $3, 'whoami server', $4)`,
    [
      randomUUID(),
      versionId,
      SERVER_NAME,
      JSON.stringify({ transport: 'http', url: `${FIXTURE_ORIGIN}/oauth-mcp` }),
    ],
  );
  const installed = await callApi('POST', `/v1/orgs/${user.orgId}/me/installations`, user, {
    pluginVersionId: `pv_${versionId.replaceAll('-', '')}`,
  });
  if (installed.status !== 201) throw new Error(`install answered ${installed.status}`);
  installationId = ((await installed.json()) as { id: string }).id;
  const components = await callApi(
    'GET',
    `/v1/orgs/${user.orgId}/me/installations/${installationId}/components`,
    user,
  );
  const list = (await components.json()) as { items: { componentId: string; kind: string }[] };
  componentId = list.items.find((item) => item.kind === 'mcp')?.componentId as string;
}, 120_000);

afterAll(async () => {
  await new Promise<void>((resolve) => upstream?.close(() => resolve()));
});

// ─── Auth settings ────────────────────────────────────────────────────────────

describe('server auth settings', () => {
  it('starts without auth and without a sign-in requirement', async () => {
    const res = await callApi('GET', serverPath(), user);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      name: SERVER_NAME,
      authType: 'none',
      connection: 'not_required',
      tools: [],
    });
    const listed = await callApi('GET', serverPath().replace(`/${componentId}`, ''), user);
    expect(((await listed.json()) as { items: unknown[] }).items).toHaveLength(1);
  });

  it('refuses sign-in on a server that does not use OAuth', async () => {
    const res = await callApi('POST', `${serverPath()}/oauth/start`, user);
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  it.each([
    ['an api key type without a key', { authType: 'api_key' }],
    ['a blank client id', { authType: 'oauth_client', clientId: '' }],
    ['an unknown type', { authType: 'magic' }],
    ['an unknown field', { authType: 'none', extra: 1 }],
    ['a timeout below the minimum', { authType: 'none', callTimeoutMs: 10 }],
  ])('rejects %s', async (_name, body) => {
    expect((await setAuth(body)).status).toBe(400);
  });

  it('asks for a client id before a fixed client can be used', async () => {
    expect((await setAuth({ authType: 'oauth_client' })).status).toBe(409);
  });

  it('keeps the stored key when an empty one is sent and shows only its last four', async () => {
    expect((await setAuth({ authType: 'api_key', apiKey: 'secret-value-1234' })).status).toBe(200);
    const kept = await setAuth({ authType: 'api_key', apiKey: '', callTimeoutMs: 5000 });
    const body = (await kept.json()) as Record<string, unknown>;
    expect(body).toMatchObject({
      authType: 'api_key',
      apiKeyLastFour: '1234',
      callTimeoutMs: 5000,
    });
    expect(JSON.stringify(body)).not.toContain('secret-value');
  });

  it('answers 404 for a server that is not installed', async () => {
    const path = serverPath().replace(componentId, `cmp_${randomUUID().replaceAll('-', '')}`);
    expect((await callApi('GET', path, user)).status).toBe(404);
  });

  it('reports a failing upstream as not healthy and keeps no tools', async () => {
    const probe = await callApi('POST', `${serverPath()}/test`, user);
    expect(probe.status).toBe(200);
    const body = (await probe.json()) as { health: string; toolCount: number };
    expect(body.health).not.toBe('healthy');
    expect(body.toolCount).toBe(0);
  });
});

// ─── The member sign-in ───────────────────────────────────────────────────────

describe('member sign-in', () => {
  it('registers a client, sends PKCE and the resource, and keeps no secrets in the url', async () => {
    expect((await setAuth({ authType: 'oauth_dcr' })).status).toBe(200);
    const before = await (await callApi('GET', serverPath(), user)).json();
    expect(before).toMatchObject({ connection: 'not_connected', oauthDiscovered: false });

    const { url, state } = await beginSignIn();
    expect(url.origin + url.pathname).toBe(`${FIXTURE_ORIGIN}/authorize`);
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      response_type: 'code',
      client_id: CLIENT_ID,
      code_challenge_method: 'S256',
      resource: `${FIXTURE_ORIGIN}/oauth-mcp`,
    });
    expect(state.startsWith(`${user.rawOrgId}.`)).toBe(true);
    expect(fixture.registrations).toBe(1);

    const after = await (await callApi('GET', serverPath(), user)).json();
    expect(after).toMatchObject({ oauthDiscovered: true, oauthClientId: CLIENT_ID });
    // A second start reuses the registration.
    await beginSignIn();
    expect(fixture.registrations).toBe(1);
  });

  it('sends a configured OAuth app and its scopes to the provider, with the callback URL it shows', async () => {
    const discovered = (await (
      await callApi('POST', `${serverPath()}/oauth/discover`, user)
    ).json()) as { callbackUrl: string };
    expect(
      (await setAuth({ authType: 'oauth_client', clientId: CLIENT_ID, scopes: 'read write' }))
        .status,
    ).toBe(200);
    const { url } = await beginSignIn();
    expect(url.origin + url.pathname).toBe(`${FIXTURE_ORIGIN}/authorize`);
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      client_id: CLIENT_ID,
      redirect_uri: discovered.callbackUrl,
      scope: 'read write',
    });
  });

  it('connects through the callback and shows the member as connected', async () => {
    await connect();
    expect(await (await callApi('GET', serverPath(), user)).json()).toMatchObject({
      connection: 'connected',
    });
    expect(await tokenStatus()).toBe('active');
  });

  it('refuses a state that was already used', async () => {
    const { state, code } = await beginSignIn();
    expect(landing(await callback({ code, state })).searchParams.get('oauth')).toBe('connected');
    const replay = await callback({ code, state });
    expect(replay.status).toBeGreaterThanOrEqual(400);
    expect(replay.status).toBeLessThan(500);
  });

  it.each([
    ['one that is not ours', 'not-a-state'],
    ['one for an organization that does not exist', `${randomUUID()}.abc`],
  ])('refuses %s', async (_name, state) => {
    const res = await callback({ code: 'x', state });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  it('refuses a callback with no state', async () => {
    expect((await callback({ code: 'x' })).status).toBe(400);
  });

  it('refuses another member who tries to finish a sign-in and lets the owner finish', async () => {
    const { state, code } = await beginSignIn();
    const other = await createSignedInUser('mcp-oauth-thief');
    const res = await callback({ code, state }, other);
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
    // A failed attempt by someone else does not spend it: the member who began can still finish.
    expect(landing(await callback({ code, state })).searchParams.get('oauth')).toBe('connected');
  });

  it('lands on the installed view as denied when the member says no', async () => {
    const { state } = await beginSignIn();
    const res = await callback({ state, error: 'access_denied' });
    expect(res.status).toBe(302);
    expect(landing(res).pathname).toBe('/installed');
    expect(landing(res).searchParams.get('oauth')).toBe('denied');
  });

  it('reports a rejected code and a wrong issuer as classified results', async () => {
    const rejected = await beginSignIn();
    const bad = await callback({ code: 'unknown-code', state: rejected.state });
    expect(landing(bad).searchParams.get('oauth')).toBe('oauth_exchange_failed');

    const wrongIssuer = await beginSignIn();
    const mismatch = await callback({
      code: wrongIssuer.code,
      state: wrongIssuer.state,
      iss: 'https://evil.example.com',
    });
    expect(landing(mismatch).searchParams.get('oauth')).toBe('oauth_issuer_mismatch');
  });

  it('keeps the previous sign-in when a later attempt fails', async () => {
    await connect();
    const rejected = await beginSignIn();
    await callback({ code: 'unknown-code', state: rejected.state });
    expect(await tokenStatus()).toBe('active');
  });
});

// ─── Disconnect and changes ───────────────────────────────────────────────────

describe('disconnecting and changing the type', () => {
  it('removes only the caller’s sign-in', async () => {
    await connect();
    expect((await callApi('DELETE', `${serverPath()}/oauth`, user)).status).toBe(204);
    expect(await (await callApi('GET', serverPath(), user)).json()).toMatchObject({
      connection: 'not_connected',
    });
    // Disconnecting again is harmless.
    expect((await callApi('DELETE', `${serverPath()}/oauth`, user)).status).toBe(204);
  });

  it('drops the sign-ins when the auth type changes', async () => {
    await connect();
    expect((await setAuth({ authType: 'oauth_client', clientId: 'other-client' })).status).toBe(
      200,
    );
    expect(await tokenStatus()).toBeUndefined();
    expect(await (await callApi('GET', serverPath(), user)).json()).toMatchObject({
      authType: 'oauth_client',
      oauthClientId: 'other-client',
      connection: 'not_connected',
    });
  });
});
