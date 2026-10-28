import { describe, expect, it } from 'vitest';
import { createApiKeyAuthenticator } from './key-auth.js';

const identity = {
  keyRowId: 'row-1',
  principal: {
    kind: 'api_key' as const,
    keyId: 'fyk_0123456789abcdef',
    orgId: 'org-1',
    scope: 'org' as const,
    preset: 'agent' as const,
    permissions: ['mcp:list' as const, 'mcp:call' as const],
  },
};

const reply = (status: number, body: unknown) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }));

function build(fetcher: typeof fetch) {
  return createApiKeyAuthenticator({
    apiBaseUrl: 'http://api.test',
    workloadHeaders: async () => ({ 'x-workload-token': 'token' }),
    fetch: fetcher,
  });
}

describe('createApiKeyAuthenticator', () => {
  it('sends the key and address with the workload headers and returns the identity', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const authenticate = build(((url: string, init: RequestInit) => {
      calls.push({ url, init });
      return reply(200, { identity });
    }) as typeof fetch);

    expect(await authenticate('fyk_0123456789abcdef.secret', '203.0.113.9')).toEqual(identity);
    expect(calls[0]?.url).toBe('http://api.test/v1/gateway/authenticate');
    expect(calls[0]?.init.method).toBe('POST');
    expect(JSON.parse(String(calls[0]?.init.body))).toEqual({
      key: 'fyk_0123456789abcdef.secret',
      ip: '203.0.113.9',
    });
    expect(calls[0]?.init.headers).toMatchObject({
      'x-workload-token': 'token',
      'content-type': 'application/json',
    });
  });

  it('leaves the address out when there is none', async () => {
    let sent = '';
    const authenticate = build(((_url: string, init: RequestInit) => {
      sent = String(init.body);
      return reply(200, { identity: null });
    }) as typeof fetch);
    await authenticate('fyk_0123456789abcdef.secret', undefined);
    expect(JSON.parse(sent)).toEqual({ key: 'fyk_0123456789abcdef.secret' });
  });

  it('returns null for a key the api does not accept', async () => {
    const authenticate = build((() => reply(200, { identity: null })) as typeof fetch);
    expect(await authenticate('fyk_0123456789abcdef.wrong', undefined)).toBeNull();
  });

  it('returns null without calling the api when there is no key', async () => {
    let called = false;
    const authenticate = build((() => {
      called = true;
      return reply(200, { identity: null });
    }) as typeof fetch);
    expect(await authenticate(null, undefined)).toBeNull();
    expect(called).toBe(false);
  });

  it.each([
    ['a failure status', () => reply(500, { error: 'x' })],
    ['a refused workload call', () => reply(401, {})],
    ['an unreachable api', () => Promise.reject(new Error('connect ECONNREFUSED'))],
    ['an answer that is not JSON', () => Promise.resolve(new Response('nope', { status: 200 }))],
    ['an answer of the wrong shape', () => reply(200, { identity: { keyRowId: 1 } })],
  ])('fails closed with service_unavailable on %s', async (_label, respond) => {
    const authenticate = build(respond as unknown as typeof fetch);
    await expect(authenticate('fyk_0123456789abcdef.secret', undefined)).rejects.toMatchObject({
      code: 'service_unavailable',
    });
  });
});
