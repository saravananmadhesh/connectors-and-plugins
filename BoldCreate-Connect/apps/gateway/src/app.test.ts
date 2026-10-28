import { afterEach, describe, expect, it } from 'vitest';
import type { KeyIdentity } from '@boldcreate-integrations/domain';
import type { Db } from '@boldcreate-integrations/db';
import type { HttpServer } from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp, SUPPORTED_PROTOCOL_VERSIONS, type GatewayDeps } from './app.js';
import { loadGatewayConfig } from './config.js';

const config = loadGatewayConfig({
  NODE_ENV: 'test',
  DEPLOY_ENV: 'test',
  DATABASE_URL: 'postgresql://app_gateway:pw@localhost:5432/boldcreate',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
});

const KEY = ['fyk_0123456789abcdef', 'abcdefghijklmnopqrstuvwxyz012345'].join('.');
const bearer = { authorization: `Bearer ${KEY}` };

const identity = (permissions: string[]): KeyIdentity => ({
  keyRowId: 'row-1',
  principal: {
    kind: 'api_key',
    keyId: 'fyk_0123456789abcdef',
    orgId: '00000000-0000-4000-8000-000000000001',
    scope: 'org',
    preset: 'agent',
    permissions: permissions as never,
  },
});

let server: HttpServer | undefined;

function build(overrides: Partial<GatewayDeps> = {}) {
  server = buildApp(config, {
    db: {} as Db,
    access: {
      unsealer: {
        unseal: async () => {
          throw new Error('not used');
        },
        unsealFields: async () => {
          throw new Error('not used');
        },
      },
      sealerFor: () => {
        throw new Error('not used');
      },
      fetcher: async () => {
        throw new Error('not used');
      },
    },
    logger: createLogger({ service: 'gateway', level: 'silent' }),
    metrics: createMetrics({ service: 'gateway' }),
    workloadHeaders: (async () => ({ 'x-caller-id': 'gateway' })) as never,
    pingDb: async () => 1,
    authenticate: async (raw) => (raw === KEY ? identity(['mcp:list', 'mcp:call']) : null),
    ...overrides,
  });
  return server.app;
}

afterEach(async () => {
  await server?.close();
  server = undefined;
});

const rpc = (method: string, params?: unknown, id: number | undefined = 1) => ({
  jsonrpc: '2.0',
  ...(id === undefined ? {} : { id }),
  method,
  ...(params === undefined ? {} : { params }),
});

describe('gateway app', () => {
  it('serves health, readiness and metrics', async () => {
    const app = build();
    expect((await app.inject({ method: 'GET', url: '/healthz' })).json()).toEqual({
      status: 'ok',
    });
    expect((await app.inject({ method: 'GET', url: '/readyz' })).json()).toEqual({
      status: 'ok',
      checks: { db: 'ok' },
    });
    const metrics = await app.inject({ method: 'GET', url: '/metrics' });
    expect(metrics.body).toContain('boldcreate_gateway_http_requests_total');
  });

  it('reports not ready when the database check fails', async () => {
    const res = await build({
      pingDb: async () => {
        throw new Error('down');
      },
    }).inject({ method: 'GET', url: '/readyz' });
    expect(res.statusCode).toBe(503);
  });

  it.each(['/mcp', '/github/mcp'])('answers 401 on %s without a valid key', async (url) => {
    const app = build();
    const none = await app.inject({ method: 'POST', url, payload: rpc('tools/list') });
    expect(none.statusCode).toBe(401);
    expect(none.headers['www-authenticate']).toBe('Bearer');
    const wrong = await app.inject({
      method: 'POST',
      url,
      headers: { authorization: 'Bearer nope' },
      payload: rpc('tools/list'),
    });
    expect(wrong.statusCode).toBe(401);
  });

  it('answers initialize with the version the client asked for when it is supported', async () => {
    const res = await build().inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('initialize', { protocolVersion: '2025-03-26' }),
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: { protocolVersion: '2025-03-26', capabilities: { tools: { listChanged: false } } },
    });
  });

  it('offers its own version when the client asks for an unknown one', async () => {
    const res = await build().inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('initialize', { protocolVersion: '1999-01-01' }),
    });
    expect(res.json().result.protocolVersion).toBe(SUPPORTED_PROTOCOL_VERSIONS[0]);
  });

  it('answers ping and takes notifications with 202 and no body', async () => {
    const app = build();
    const ping = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('ping'),
    });
    expect(ping.json()).toMatchObject({ id: 1, result: {} });
    const note = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('notifications/initialized', undefined, undefined),
    });
    expect(note.statusCode).toBe(202);
    expect(note.body).toBe('');
  });

  it('rejects batches, a bad version header and unknown methods', async () => {
    const app = build();
    const batch = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: [rpc('ping')],
    });
    expect(batch.statusCode).toBe(400);
    const version = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: { ...bearer, 'mcp-protocol-version': '1999-01-01' },
      payload: rpc('ping'),
    });
    expect(version.statusCode).toBe(400);
    const unknown = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('resources/list'),
    });
    expect(unknown.json()).toMatchObject({ error: { code: -32601 } });
  });

  it('refuses listing and calling for a key without the permission', async () => {
    const app = build({ authenticate: async () => identity(['artifact:sync']) });
    const list = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('tools/list'),
    });
    expect(list.json()).toMatchObject({ error: { code: -32603 } });
    const call = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('tools/call', { name: 'a__b' }),
    });
    expect(call.json()).toMatchObject({ error: { code: -32603 } });
  });

  it('validates tool call parameters before touching anything', async () => {
    const app = build();
    const noName = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('tools/call', {}),
    });
    expect(noName.json()).toMatchObject({ error: { code: -32602 } });
    const badArgs = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('tools/call', { name: 'a__b', arguments: [1] }),
    });
    expect(badArgs.json()).toMatchObject({ error: { code: -32602 } });
  });

  it('limits a key by the limiter and says when to come back', async () => {
    const app = build({
      limiter: {
        check: async () => ({ allowed: false, remaining: 0, resetAt: new Date(Date.now() + 7000) }),
        reset: async () => undefined,
      },
    });
    const res = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('ping'),
    });
    expect(res.statusCode).toBe(429);
    expect(Number(res.headers['retry-after'])).toBeGreaterThanOrEqual(1);
  });

  it('keeps serving when the limiter is down', async () => {
    const app = build({
      limiter: {
        check: async () => {
          throw new Error('redis down');
        },
        reset: async () => undefined,
      },
    });
    const res = await app.inject({
      method: 'POST',
      url: '/mcp',
      headers: bearer,
      payload: rpc('ping'),
    });
    expect(res.statusCode).toBe(200);
  });

  it('answers GET and DELETE on the endpoint with 405', async () => {
    const app = build();
    for (const method of ['GET', 'DELETE'] as const) {
      const res = await app.inject({ method, url: '/mcp', headers: bearer });
      expect(res.statusCode).toBe(405);
      expect(res.headers['allow']).toBe('POST');
    }
  });

  it('serves no internal route', async () => {
    const res = await build().inject({
      method: 'POST',
      url: '/internal/v1/anything',
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('project routes', () => {
  const PROJECT_KEY = `prk_0123456789abcdef.${'a'.repeat(43)}`;
  const PARTNER_KEY = `ptk_0123456789abcdef.${'a'.repeat(43)}`;

  function withUpstream(answer: () => Response | Promise<Response>) {
    const calls: { url: string; init: RequestInit }[] = [];
    const app = build({
      fetch: (async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return answer();
      }) as unknown as typeof fetch,
    });
    return { app, calls };
  }

  it('forwards a call with a project key and the body of a write, and nothing else of the caller', async () => {
    const { app, calls } = withUpstream(
      () =>
        new Response('{"ok":true}', {
          status: 201,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const res = await app.inject({
      method: 'PUT',
      url: '/v1/project/users',
      headers: {
        authorization: `Bearer ${PROJECT_KEY}`,
        cookie: 'sid=secret',
        'x-session-token': 'session-secret',
      },
      payload: { userId: 'user-1' },
    });
    expect(res.statusCode).toBe(201);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe(`${config.API_BASE_URL}/v1/project/users`);
    const sent = (calls[0]?.init.headers ?? {}) as Record<string, string>;
    expect(sent['authorization']).toBe(`Bearer ${PROJECT_KEY}`);
    expect(sent['cookie']).toBeUndefined();
    expect(sent['x-session-token']).toBeUndefined();
    expect(JSON.parse(String(calls[0]?.init.body))).toEqual({ userId: 'user-1' });
  });

  it('refuses a call with no key or another kind of key, without calling the api', async () => {
    const { app, calls } = withUpstream(() => new Response('{}', { status: 200 }));
    for (const authorization of [
      undefined,
      `Bearer ${PARTNER_KEY}`,
      `Bearer plk_0123456789abcdef.${'a'.repeat(43)}`,
      `Basic ${PROJECT_KEY}`,
      'Bearer prk',
    ]) {
      const res = await app.inject({
        method: 'GET',
        url: '/v1/project/me',
        headers: authorization ? { authorization } : {},
      });
      expect(res.statusCode).toBe(401);
      expect(res.headers['www-authenticate']).toBe('Bearer');
    }
    expect(calls).toHaveLength(0);
  });
});

describe('session routes', () => {
  const SESSION_TOKEN = `stk_0123456789abcdef.${'a'.repeat(43)}`;
  const PROJECT_KEY = `prk_0123456789abcdef.${'a'.repeat(43)}`;

  function withUpstream(answer: () => Response | Promise<Response>) {
    const calls: { url: string; init: RequestInit }[] = [];
    const app = build({
      fetch: (async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return answer();
      }) as unknown as typeof fetch,
    });
    return { app, calls };
  }

  it('forwards a read with a session token, query included, and relays the answer', async () => {
    const { app, calls } = withUpstream(
      () =>
        new Response('{"data":[],"nextCursor":null}', {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const res = await app.inject({
      method: 'GET',
      url: '/v1/session/catalog?limit=5',
      headers: { authorization: `Bearer ${SESSION_TOKEN}`, cookie: 'sid=secret' },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ data: [], nextCursor: null });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe(`${config.API_BASE_URL}/v1/session/catalog?limit=5`);
    expect(calls[0]?.init.method).toBe('GET');
    const sent = (calls[0]?.init.headers ?? {}) as Record<string, string>;
    expect(sent['authorization']).toBe(`Bearer ${SESSION_TOKEN}`);
    expect(sent['x-caller-id']).toBe('gateway');
    expect(sent['cookie']).toBeUndefined();
  });

  it('forwards an install with its body and the idempotency key', async () => {
    const { app, calls } = withUpstream(
      () =>
        new Response('{"pluginId":"p"}', {
          status: 201,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const res = await app.inject({
      method: 'PUT',
      url: '/v1/session/plugins/plg_0123',
      headers: { authorization: `Bearer ${SESSION_TOKEN}`, 'idempotency-key': 'gateway-install-1' },
      payload: { versionId: 'ver_1' },
    });
    expect(res.statusCode).toBe(201);
    expect(calls[0]?.url).toBe(`${config.API_BASE_URL}/v1/session/plugins/plg_0123`);
    expect(calls[0]?.init.method).toBe('PUT');
    expect(JSON.parse(String(calls[0]?.init.body))).toEqual({ versionId: 'ver_1' });
    const sent = (calls[0]?.init.headers ?? {}) as Record<string, string>;
    expect(sent['idempotency-key']).toBe('gateway-install-1');
  });

  it('forwards a removal and the start of a sign-in', async () => {
    const { app, calls } = withUpstream(() => new Response(null, { status: 204 }));
    const removed = await app.inject({
      method: 'DELETE',
      url: '/v1/session/plugins/plg_0123',
      headers: { authorization: `Bearer ${SESSION_TOKEN}` },
    });
    expect(removed.statusCode).toBe(204);
    const started = await app.inject({
      method: 'POST',
      url: '/v1/session/connections',
      headers: { authorization: `Bearer ${SESSION_TOKEN}` },
      payload: { componentId: 'cmp_1', callbackUrl: 'https://host.example.test/done' },
    });
    expect(started.statusCode).toBe(204);
    expect(calls.map((call) => `${call.init.method} ${call.url}`)).toEqual([
      `DELETE ${config.API_BASE_URL}/v1/session/plugins/plg_0123`,
      `POST ${config.API_BASE_URL}/v1/session/connections`,
    ]);
    expect(calls[0]?.init.body).toBeUndefined();
    expect(JSON.parse(String(calls[1]?.init.body))).toEqual({
      componentId: 'cmp_1',
      callbackUrl: 'https://host.example.test/done',
    });
  });

  it('relays an error from the api as it is', async () => {
    const { app } = withUpstream(
      () =>
        new Response('{"error":{"code":"forbidden"}}', {
          status: 403,
          headers: { 'content-type': 'application/json' },
        }),
    );
    const res = await app.inject({
      method: 'GET',
      url: '/v1/session/plugins',
      headers: { authorization: `Bearer ${SESSION_TOKEN}` },
    });
    expect(res.statusCode).toBe(403);
    expect(res.json()).toEqual({ error: { code: 'forbidden' } });
  });

  it('refuses a call with no token or another kind of key, without calling the api', async () => {
    const { app, calls } = withUpstream(() => new Response('{}', { status: 200 }));
    for (const authorization of [
      undefined,
      `Bearer ${PROJECT_KEY}`,
      `Bearer ${KEY}`,
      `Basic ${SESSION_TOKEN}`,
      'Bearer stx_0123',
    ]) {
      const res = await app.inject({
        method: 'GET',
        url: '/v1/session/catalog',
        headers: authorization ? { authorization } : {},
      });
      expect(res.statusCode).toBe(401);
      expect(res.headers['www-authenticate']).toBe('Bearer');
    }
    expect(calls).toHaveLength(0);
  });

  it('keeps a session token off the project routes', async () => {
    const { app, calls } = withUpstream(() => new Response('{}', { status: 200 }));
    const res = await app.inject({
      method: 'GET',
      url: '/v1/project/me',
      headers: { authorization: `Bearer ${SESSION_TOKEN}` },
    });
    expect(res.statusCode).toBe(401);
    expect(calls).toHaveLength(0);
  });
});
