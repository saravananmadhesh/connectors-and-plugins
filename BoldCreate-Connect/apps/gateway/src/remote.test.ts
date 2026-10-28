import { describe, expect, it } from 'vitest';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { createApiKeyAuthenticator } from './key-auth.js';
import { createGatewayRemote } from './remote.js';

const principalBody = {
  kind: 'api_key' as const,
  keyId: 'fyk_0123456789abcdef',
  orgId: 'org-1',
  scope: 'org' as const,
  preset: 'agent' as const,
  permissions: ['mcp:list' as const, 'mcp:call' as const],
};

const reply = (status: number, body: unknown) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }));

/** A principal admitted through the authenticator, as the gateway has it at request time. */
async function admitted(): Promise<ApiKeyPrincipal> {
  const authenticate = createApiKeyAuthenticator({
    apiBaseUrl: 'http://api.test',
    workloadHeaders: async () => ({}),
    fetch: (() =>
      reply(200, { identity: { keyRowId: 'row', principal: principalBody } })) as typeof fetch,
  });
  const identity = await authenticate('fyk_0123456789abcdef.secret', undefined);
  return identity!.principal;
}

function build(fetcher: typeof fetch) {
  return createGatewayRemote({
    apiBaseUrl: 'http://api.test',
    workloadHeaders: async () => ({ 'x-workload-token': 'token' }),
    fetch: fetcher,
  });
}

const server = {
  name: 'docs',
  installationId: 'inst-1',
  componentId: 'comp-1',
  pluginName: 'docs',
  authType: 'none' as const,
  tools: [{ name: 'search', description: 'Search', inputSchema: {} }],
  discovered: true,
};

describe('createGatewayRemote', () => {
  it('asks for the servers of a key with the key and the workload headers', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const remote = build(((url: string, init: RequestInit) => {
      calls.push({ url, init });
      return reply(200, { servers: [server] });
    }) as typeof fetch);

    const servers = await remote.servers(await admitted(), 'docs');
    expect(servers).toEqual([server]);
    expect(calls[0]?.url).toBe('http://api.test/v1/gateway/servers');
    expect(JSON.parse(String(calls[0]?.init.body))).toEqual({
      key: 'fyk_0123456789abcdef.secret',
      only: 'docs',
    });
    expect(calls[0]?.init.headers).toMatchObject({ 'x-workload-token': 'token' });
  });

  it('keeps a tool without a destructive hint free of the property', async () => {
    const remote = build((() => reply(200, { servers: [server] })) as typeof fetch);
    const [first] = await remote.servers(await admitted());
    expect(first?.tools[0]).not.toHaveProperty('destructive');
  });

  it('returns the credential and the reason a server cannot be reached', async () => {
    const granted = {
      ok: true,
      target: { url: 'https://up.test/mcp', headers: { authorization: 'Bearer x' } },
      authType: 'api_key',
      callTimeoutMs: null,
      serverName: 'docs',
    };
    const principal = await admitted();
    const ids = { installationId: 'inst-1', componentId: 'comp-1' };
    expect(await build((() => reply(200, granted)) as typeof fetch).access(principal, ids)).toEqual(
      granted,
    );
    const refused = { ok: false, reason: 'needs_reauth' };
    expect(await build((() => reply(200, refused)) as typeof fetch).access(principal, ids)).toEqual(
      refused,
    );
  });

  it('records usage', async () => {
    let sent = '';
    const remote = build(((_url: string, init: RequestInit) => {
      sent = String(init.body);
      return reply(200, { recorded: true });
    }) as typeof fetch);
    await remote.usage(await admitted(), {
      server: 'docs',
      tool: 'search',
      outcome: 'ok',
      durationMs: 12,
      requestId: 'req-1',
    });
    expect(JSON.parse(sent)).toMatchObject({ server: 'docs', tool: 'search', durationMs: 12 });
  });

  it.each([
    ['a refused request', () => reply(403, {})],
    ['a server error', () => reply(500, {})],
    ['an answer of the wrong shape', () => reply(200, { servers: 'none' })],
    ['an answer that is not JSON', () => Promise.resolve(new Response('nope', { status: 200 }))],
    ['a network failure', () => Promise.reject(new Error('down'))],
  ])('fails closed on %s', async (_label, answer) => {
    const remote = build(answer as unknown as typeof fetch);
    await expect(remote.servers(await admitted())).rejects.toMatchObject({
      code: 'service_unavailable',
    });
  });

  it('fails closed for a principal that was not admitted through the api', async () => {
    let called = false;
    const remote = build((() => {
      called = true;
      return reply(200, { servers: [] });
    }) as typeof fetch);
    await expect(remote.servers({ ...principalBody })).rejects.toMatchObject({
      code: 'service_unavailable',
    });
    expect(called).toBe(false);
  });
});
