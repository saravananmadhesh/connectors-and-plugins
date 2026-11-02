import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES, formatId } from '@boldcreate-integrations/contracts';
import { toFastifyPath } from '@boldcreate-integrations/http-server';
import { bffRegistry } from './proxy.js';
import { USER, buildTestWeb, cookieHeader, csrfHeaders, type TestWeb } from './test-support.js';

let web: TestWeb | undefined;
afterEach(async () => {
  await web?.server.close();
  web = undefined;
});

async function build(env: Record<string, string> = {}) {
  web = await buildTestWeb(env);
  return web;
}

const ORG = formatId('org', '22222222-2222-4222-8222-222222222222');

describe('route registration', () => {
  it('registers every registry entry with exposure bff exactly once, under /api', async () => {
    const { server } = await build();
    const bff = ROUTES.filter((route) => route.exposure === 'bff');
    expect(bff.length).toBeGreaterThan(40);
    expect(bffRegistry()).toHaveLength(bff.length);
    for (const route of bff) {
      const url = `/api${toFastifyPath(route.pathTemplate)}`;
      expect(server.app.hasRoute({ method: route.method, url })).toBe(true);
    }
    const keys = bff.map((route) => `${route.method} ${route.pathTemplate}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('does not register internal routes', async () => {
    const { server } = await build();
    expect(
      server.app.hasRoute({
        method: 'POST',
        url: '/api/internal/v1/anything',
      }),
    ).toBe(false);
  });
});

describe('validation before the upstream', () => {
  it('rejects an invalid body with validation_failed and never calls the api', async () => {
    const w = await build();
    const headers = await csrfHeaders(w);
    const res = await w.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/signin',
      headers,
      payload: { email: 'not-an-email', password: 'x', extra: true },
    });
    expect(res.statusCode).toBe(400);
    const body = res.json() as { error: { code: string; details: { field: string }[] } };
    expect(body.error.code).toBe('validation_failed');
    expect(body.error.details.length).toBeGreaterThan(0);
    expect(w.calls).toHaveLength(0);
  });

  it('rejects an invalid query and a malformed id', async () => {
    const w = await build();
    const session = '__Host-sid=token-1';
    const query = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs?limit=banana',
      headers: { cookie: session },
    });
    expect(query.statusCode).toBe(400);
    const id = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs/not-an-id',
      headers: { cookie: session },
    });
    expect(id.statusCode).toBe(404);
    expect(w.calls).toHaveLength(0);
  });

  it('carries the request id in the error body and the header', async () => {
    const w = await build();
    const res = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: { cookie: '__Host-sid=token-1' },
      query: { limit: 'banana' },
    });
    const body = res.json() as { error: { requestId: string } };
    expect(body.error.requestId).toBe(res.headers['x-request-id']);
  });
});

describe('forwarding', () => {
  it('sends workload headers, the session token, idempotency key and query to the api', async () => {
    const w = await build();
    w.reply({ status: 200, body: { items: [], nextCursor: null } });
    const res = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs?limit=5',
      headers: { cookie: '__Host-sid=token-1', 'idempotency-key': 'abc-123' },
    });
    expect(res.statusCode).toBe(200);
    expect(w.calls).toHaveLength(1);
    const call = w.calls[0]!;
    expect(call.url).toBe('http://api.test/v1/orgs?limit=5');
    expect(call.method).toBe('GET');
    expect(call.headers).toMatchObject({
      'x-caller-id': 'web',
      'x-workload-secret': w.config.WORKLOAD_SECRET,
      'x-session-token': 'token-1',
      'idempotency-key': 'abc-123',
    });
    expect(call.body).toBeUndefined();
  });

  it('never passes a retired partner key or an acted-as user from a browser to the api', async () => {
    const w = await build();
    w.reply({ status: 200, body: { items: [], nextCursor: null } });
    await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: {
        cookie: '__Host-sid=token-1',
        authorization: `Bearer ${['ptk_0123456789abcdef', 'a'.repeat(43)].join('.')}`,
        'x-act-as-user': 'user-9',
      },
    });
    const headers = w.calls[0]!.headers;
    expect(headers['authorization']).toBeUndefined();
    expect(headers['x-act-as-user']).toBeUndefined();
    expect(headers['x-session-token']).toBe('token-1');
  });

  it('serves no retired partner route to a browser', async () => {
    const w = await build();
    const res = await w.server.app.inject({ method: 'GET', url: '/api/v1/partner/me' });
    expect(res.statusCode).toBe(404);
    expect(w.calls).toHaveLength(0);
  });

  it('forwards path ids and the wire form of ids in bodies unchanged', async () => {
    const w = await build();
    w.reply({ status: 204 });
    const headers = await csrfHeaders(w, '__Host-sid=token-1');
    const pv = formatId('pv', '33333333-3333-4333-8333-333333333333');
    w.reply({
      status: 502,
      body: { error: { code: 'upstream_unavailable', message: 'x', requestId: 'r' } },
    });
    await w.server.app.inject({
      method: 'POST',
      url: `/api/v1/orgs/${ORG}/installations`,
      headers,
      payload: { pluginVersionId: pv },
    });
    const call = w.calls[0]!;
    expect(call.url).toContain(`/v1/orgs/${ORG}/installations`);
    expect(JSON.parse(call.body ?? '{}')).toEqual({ pluginVersionId: pv });
    expect(call.headers['content-type']).toBe('application/json');
  });

  it('accepts a write that carries no body when the route takes an empty one', async () => {
    const w = await build();
    const headers = await csrfHeaders(w, '__Host-sid=token-1');
    w.reply({ status: 200, body: { authorizeUrl: 'https://idp.example.test/authorize' } });
    const res = await w.server.app.inject({
      method: 'POST',
      url: `/api/v1/orgs/${ORG}/installations/${formatId('ins', '44444444-4444-4444-8444-444444444444')}/mcp-servers/${formatId('cmp', '55555555-5555-4555-8555-555555555555')}/oauth/start`,
      headers,
    });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(w.calls[0]?.body ?? 'null')).toEqual({});
  });

  it('requires the session cookie on routes that need a session, without calling the api', async () => {
    const w = await build();
    const res = await w.server.app.inject({ method: 'GET', url: '/api/v1/auth/me' });
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { code: 'unauthenticated' } });
    expect(w.calls).toHaveLength(0);
  });
});

describe('responses', () => {
  it('removes fields the registry does not know', async () => {
    const w = await build();
    w.reply({ status: 202, body: { sessionToken: 'leak', note: 'internal' } });
    const headers = await csrfHeaders(w);
    const res = await w.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/resend-verification',
      headers,
      payload: { email: 'a@example.com' },
    });
    expect(res.statusCode).toBe(202);
    expect(res.json()).toEqual({});
    expect(res.body).not.toContain('leak');
  });

  it('passes an api error through with the web request id', async () => {
    const w = await build();
    w.reply({
      status: 409,
      body: { error: { code: 'conflict', message: 'old text', requestId: 'api-request' } },
    });
    const res = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: { cookie: '__Host-sid=token-1' },
    });
    expect(res.statusCode).toBe(409);
    const body = res.json() as { error: { code: string; requestId: string } };
    expect(body.error.code).toBe('conflict');
    expect(body.error.requestId).toBe(res.headers['x-request-id']);
    expect(body.error.requestId).not.toBe('api-request');
  });

  it('keeps validation details and Retry-After from the api', async () => {
    const w = await build();
    w.reply({
      status: 400,
      body: {
        error: {
          code: 'validation_failed',
          message: 'x',
          requestId: 'r',
          details: [{ field: 'name', message: 'bad' }],
        },
      },
    });
    const invalid = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: { cookie: '__Host-sid=token-1' },
    });
    expect(invalid.json()).toMatchObject({ error: { details: [{ field: 'name' }] } });
    w.reply({
      status: 429,
      body: { error: { code: 'rate_limited', message: 'x', requestId: 'r' } },
    });
    const limited = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: { cookie: '__Host-sid=token-1' },
    });
    expect(limited.statusCode).toBe(429);
    expect(limited.headers['retry-after']).toBeTruthy();
  });

  it.each([
    ['an unreachable api', 'throw' as const],
    ['a body that is not json', { status: 200, raw: '<html>oops</html>' }],
    ['a success body of the wrong shape', { status: 200, body: { items: 'nope' } }],
    ['a status the registry does not list', { status: 201, body: {} }],
    ['an error that is not an error envelope', { status: 500, body: { message: 'boom' } }],
  ])('answers 502 upstream_unavailable for %s', async (_name, answer) => {
    const w = await build();
    w.reply(answer);
    const res = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/orgs',
      headers: { cookie: '__Host-sid=token-1' },
    });
    expect(res.statusCode).toBe(502);
    expect(res.json()).toMatchObject({ error: { code: 'upstream_unavailable' } });
    expect(res.body).not.toContain('oops');
    expect(res.body).not.toContain('boom');
  });
});

describe('session cookie', () => {
  const signinBody = { email: 'a@example.com', password: 'a-long-enough-password' };

  it.each([
    ['/api/v1/auth/signin', signinBody],
    ['/api/v1/auth/verify-email', { token: 'abc' }],
  ])('sets __Host-sid from the internal token on %s and hides the token', async (url, payload) => {
    const w = await build();
    w.reply({ status: 200, body: { sessionToken: 'internal-secret-token', user: USER } });
    const res = await w.server.app.inject({
      method: 'POST',
      url,
      headers: await csrfHeaders(w),
      payload,
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ user: USER });
    expect(res.body).not.toContain('internal-secret-token');
    const setCookie = ([] as string[]).concat(res.headers['set-cookie'] ?? []);
    const session = setCookie.find((entry) => entry.startsWith('__Host-sid='));
    expect(session).toBeDefined();
    expect(session).toContain('__Host-sid=internal-secret-token');
    expect(session).toMatch(/;\s*HttpOnly/);
    expect(session).toMatch(/;\s*Secure/);
    expect(session).toMatch(/;\s*SameSite=Strict/);
    expect(session).toMatch(/;\s*Path=\//);
    expect(session).not.toMatch(/Domain=/i);
  });

  it('does not set the cookie when the api refuses the sign-in', async () => {
    const w = await build();
    w.reply({
      status: 401,
      body: { error: { code: 'invalid_credentials', message: 'x', requestId: 'r' } },
    });
    const res = await w.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/signin',
      headers: await csrfHeaders(w),
      payload: signinBody,
    });
    expect(res.statusCode).toBe(401);
    expect(cookieHeader(res.headers['set-cookie'])).not.toContain('__Host-sid');
  });

  it.each(['/api/v1/auth/signout', '/api/v1/auth/signout-all'])(
    'clears the cookie on %s',
    async (url) => {
      const w = await build();
      w.reply({ status: 204 });
      const res = await w.server.app.inject({
        method: 'POST',
        url,
        headers: await csrfHeaders(w, '__Host-sid=token-1'),
      });
      expect(res.statusCode).toBe(204);
      const cleared = ([] as string[])
        .concat(res.headers['set-cookie'] ?? [])
        .find((entry) => entry.startsWith('__Host-sid='));
      expect(cleared).toMatch(/__Host-sid=;/);
      expect(cleared).toMatch(/Expires=Thu, 01 Jan 1970|Max-Age=0/);
    },
  );

  it('clears the cookie when the user is deleted', async () => {
    const w = await build();
    w.reply({
      status: 202,
      body: { status: 'deletion_pending', purgeAfter: '2026-01-01T00:00:00.000Z' },
    });
    const res = await w.server.app.inject({
      method: 'DELETE',
      url: '/api/v1/auth/me?confirmEmail=ada%40example.com',
      headers: await csrfHeaders(w, '__Host-sid=token-1'),
    });
    expect(res.statusCode).toBe(202);
    expect(([] as string[]).concat(res.headers['set-cookie'] ?? []).join(';')).toMatch(
      /__Host-sid=;/,
    );
  });

  it('keeps the cookie when the deletion is refused', async () => {
    const w = await build();
    w.reply({
      status: 409,
      body: { error: { code: 'last_owner_required', message: 'x', requestId: 'r' } },
    });
    const res = await w.server.app.inject({
      method: 'DELETE',
      url: '/api/v1/auth/me?confirmEmail=ada%40example.com',
      headers: await csrfHeaders(w, '__Host-sid=token-1'),
    });
    expect(res.statusCode).toBe(409);
    expect(cookieHeader(res.headers['set-cookie'])).not.toContain('__Host-sid=;');
  });

  it('clears the cookie when the api says the session is gone', async () => {
    const w = await build();
    w.reply({
      status: 401,
      body: { error: { code: 'unauthenticated', message: 'x', requestId: 'r' } },
    });
    const res = await w.server.app.inject({
      method: 'GET',
      url: '/api/v1/auth/me',
      headers: { cookie: '__Host-sid=stale' },
    });
    expect(res.statusCode).toBe(401);
    expect(([] as string[]).concat(res.headers['set-cookie'] ?? []).join(';')).toMatch(
      /__Host-sid=;/,
    );
  });
});

describe('oauth callback', () => {
  const query = `code=abc&state=${'s'.repeat(24)}`;

  it('bounces a first hit from this site before calling the api', async () => {
    const w = await build();
    const res = await w.server.app.inject({
      method: 'GET',
      url: `/api/v1/oauth/callback?${query}`,
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.body).toContain('http-equiv="refresh"');
    expect(res.body).toContain('_r=1');
    expect(w.calls).toHaveLength(0);
  });

  it('passes the api redirect on as an in-app address', async () => {
    const w = await build();
    w.reply({
      status: 302,
      headers: { location: 'https://app.example.test/installed?tab=mcp&oauth=connected' },
    });
    const res = await w.server.app.inject({
      method: 'GET',
      url: `/api/v1/oauth/callback?${query}&_r=1`,
    });
    expect(res.statusCode).toBe(302);
    expect(res.headers['location']).toBe('/installed?tab=mcp&oauth=connected');
    expect(w.calls[0]?.url).toBe(`http://api.test/v1/oauth/callback?${query}`);
  });

  it.each([
    [
      'an api error',
      {
        status: 400,
        body: { error: { code: 'oauth_state_invalid', message: 'x', requestId: 'r1' } },
      },
      'oauth_state_invalid',
    ],
    ['a page that is not json', { status: 502, raw: '<html>bad gateway</html>' }, 'http_502'],
    ['an unreachable api', 'throw' as const, 'upstream_unavailable'],
  ])('sends the member to the failed sign-in page on %s', async (_name, answer, reason) => {
    const w = await build();
    w.reply(answer);
    const res = await w.server.app.inject({
      method: 'GET',
      url: `/api/v1/oauth/callback?${query}&_r=1`,
    });
    expect(res.statusCode).toBe(302);
    expect(res.headers['location']).toBe(`/installed?tab=mcp&oauth=failed&reason=${reason}`);
    expect(res.headers['cache-control']).toBe('no-store');
  });

  it('keeps an off-site location inside the app', async () => {
    const w = await build();
    w.reply({ status: 302, headers: { location: 'https://evil.example/steal?x=1' } });
    const res = await w.server.app.inject({
      method: 'GET',
      url: `/api/v1/oauth/callback?${query}&_r=1`,
    });
    expect(res.statusCode).toBe(302);
    expect(res.headers['location']).toBe('/steal?x=1');
  });

  describe('a host flow, which has no session cookie', () => {
    const marker = { 'x-external-return': '1' };
    const callback = (w: Awaited<ReturnType<typeof build>>) =>
      w.server.app.inject({ method: 'GET', url: `/api/v1/oauth/callback?${query}&_r=1` });

    it('passes the address of the host page on whole, with no cookie sent to the api', async () => {
      const w = await build();
      const target = 'https://chat.example.com/settings?connection=connected&clientState=b7e1';
      w.reply({ status: 302, headers: { location: target, ...marker } });
      const res = await callback(w);
      expect(res.statusCode).toBe(302);
      expect(res.headers['location']).toBe(target);
      expect(res.headers['cache-control']).toBe('no-store');
      expect(res.headers['referrer-policy']).toBe('no-referrer');
      expect(w.calls[0]?.headers['x-session-token']).toBeUndefined();
    });

    it.each([
      ['credentials', 'https://user:pw@chat.example.com/x'],
      ['a script address', 'javascript:alert(1)'],
      ['a data address', 'data:text/html,x'],
      ['a path with no origin', '/installed'],
    ])('refuses %s', async (_name, location) => {
      const w = await build();
      w.reply({ status: 302, headers: { location, ...marker } });
      expect((await callback(w)).statusCode).toBe(502);
    });

    it('refuses the marker without a location', async () => {
      const w = await build();
      w.reply({ status: 302, headers: marker });
      expect((await callback(w)).statusCode).toBe(502);
    });
  });

  it('refuses a redirect without a location', async () => {
    const w = await build();
    w.reply({ status: 302 });
    const res = await w.server.app.inject({
      method: 'GET',
      url: `/api/v1/oauth/callback?${query}&_r=1`,
    });
    expect(res.statusCode).toBe(502);
  });
});
