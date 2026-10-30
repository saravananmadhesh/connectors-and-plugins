import type { ReporterStats } from '@boldcreate-integrations/observability';
import { request as httpRequest } from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as z from 'zod/v4';
import {
  ApiErrorSchema,
  AppError,
  ERROR_CODES,
  ERROR_HTTP_STATUS,
  ERROR_MESSAGES,
  RETRY_AFTER_CODES,
  type RouteDef,
} from '@boldcreate-integrations/contracts';
import { createSharedSecretVerifier } from '@boldcreate-integrations/security';
import type { LimiterPort } from '@boldcreate-integrations/ports';
import { STAGES, type Stage } from './stages.js';
import { buildTestServer, type TestServer } from './testing.js';
import { sharedSecretWorkloadAuthenticator } from './workload.js';

const route = (overrides: Partial<RouteDef> = {}): RouteDef => ({
  id: 'things.create',
  method: 'POST',
  pathTemplate: '/v1/things/{thingId}',
  app: 'api',
  exposure: 'internal',
  principals: ['session'],
  action: null,
  params: z.object({ thingId: z.string().regex(/^thing_[0-9a-f]{8}$/) }),
  body: z.object({ name: z.string().min(1) }),
  responses: { 200: z.object({ ok: z.literal(true) }), 201: z.object({ ok: z.literal(true) }) },
  idempotency: 'optional',
  ...overrides,
});

const servers: TestServer[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => server.app.close()));
});

function build(options: Parameters<typeof buildTestServer>[0] = {}): TestServer {
  const server = buildTestServer(options);
  servers.push(server);
  return server;
}

function recordStages() {
  const stages = new Map<string, Stage[]>();
  const onStage = (stage: Stage, requestId: string) => {
    stages.set(requestId, [...(stages.get(requestId) ?? []), stage]);
  };
  return { stages, onStage, only: () => [...stages.values()][0] };
}

const post = (server: TestServer, payload: unknown, headers: Record<string, string> = {}) =>
  server.app.inject({
    method: 'POST',
    url: '/v1/things/thing_0123abcd',
    headers: { 'content-type': 'application/json', ...headers },
    payload: JSON.stringify(payload),
  });

describe('middleware order', () => {
  it('runs the stages in the fixed order for a successful request', async () => {
    const recorder = recordStages();
    const calls: string[] = [];
    const server = build({
      registry: [route()],
      onStage: recorder.onStage,
      hooks: {
        authenticate: async () => {
          calls.push('authenticate');
          return { kind: 'user_session' };
        },
        authorize: async () => {
          calls.push('authorize');
        },
        idempotency: async () => {
          calls.push('idempotency');
        },
        audit: async () => {
          calls.push('audit');
        },
      },
    });
    server.register('things.create', async () => ({ ok: true }));
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(200);
    expect(recorder.only()).toEqual(STAGES.filter((stage) => stage !== 'errorMapper'));
    expect(calls).toEqual(['authenticate', 'authorize', 'idempotency', 'audit']);
  });

  it('reaches all eleven stages when the handler fails', async () => {
    const recorder = recordStages();
    const server = build({ registry: [route()], onStage: recorder.onStage });
    server.register('things.create', async () => {
      throw new AppError('conflict');
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(409);
    expect(recorder.only()).toEqual([...STAGES]);
  });

  it('stops at parse for an unsupported media type and still audits and maps the error', async () => {
    const recorder = recordStages();
    const audit = vi.fn<() => Promise<void>>(async () => {});
    const server = build({ registry: [route()], onStage: recorder.onStage, hooks: { audit } });
    server.register('things.create', async () => ({ ok: true }));
    const response = await server.app.inject({
      method: 'POST',
      url: '/v1/things/thing_0123abcd',
      headers: { 'content-type': 'text/plain' },
      payload: 'hello',
    });
    expect(response.statusCode).toBe(415);
    expect(response.json().error.code).toBe('unsupported_media_type');
    expect(recorder.only()).toEqual([
      'requestId',
      'limits',
      'origin',
      'ipThrottle',
      'parse',
      'audit',
      'errorMapper',
    ]);
    expect(audit).toHaveBeenCalledOnce();
  });

  it('never reaches the handler after a validation failure', async () => {
    const recorder = recordStages();
    const handler = vi.fn<() => Promise<unknown>>(async () => ({ ok: true }));
    const server = build({ registry: [route()], onStage: recorder.onStage });
    server.register('things.create', handler);
    const response = await post(server, { name: '' });
    expect(response.statusCode).toBe(400);
    expect(handler).not.toHaveBeenCalled();
    expect(recorder.only()).not.toContain('authenticate');
  });

  it('audits and maps a denied request without running idempotency or the handler', async () => {
    const recorder = recordStages();
    const handler = vi.fn<() => Promise<unknown>>(async () => ({ ok: true }));
    const idempotency = vi.fn<() => Promise<void>>(async () => {});
    const audit = vi.fn<() => Promise<void>>(async () => {});
    const server = build({
      registry: [route()],
      onStage: recorder.onStage,
      hooks: {
        authorize: async () => {
          throw new AppError('forbidden');
        },
        idempotency,
        audit,
      },
    });
    server.register('things.create', handler);
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(403);
    expect(recorder.only()).toEqual([
      'requestId',
      'limits',
      'origin',
      'ipThrottle',
      'parse',
      'authenticate',
      'authorize',
      'audit',
      'errorMapper',
    ]);
    expect(idempotency).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
    expect(audit).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }));
  });

  it('skips the idempotency hook for routes without idempotency', async () => {
    const idempotency = vi.fn<() => Promise<void>>(async () => {});
    const server = build({
      registry: [route({ idempotency: 'none' })],
      hooks: { idempotency },
    });
    server.register('things.create', async () => ({ ok: true }));
    expect((await post(server, { name: 'a' })).statusCode).toBe(200);
    expect(idempotency).not.toHaveBeenCalled();
  });

  it('passes the principal from authenticate to authorize and idempotency', async () => {
    const seen: unknown[] = [];
    const server = build({
      registry: [route()],
      hooks: {
        authenticate: async () => ({ kind: 'user_session', userId: 'u1' }),
        authorize: async (_request, _route, principal) => {
          seen.push(principal);
        },
        idempotency: async (_request, _reply, _route, principal) => {
          seen.push(principal);
        },
      },
    });
    server.register('things.create', async () => ({ ok: true }));
    await post(server, { name: 'a' });
    expect(seen).toEqual([
      { kind: 'user_session', userId: 'u1' },
      { kind: 'user_session', userId: 'u1' },
    ]);
  });

  it('survives an audit hook that throws', async () => {
    const server = build({
      registry: [route()],
      hooks: {
        audit: async () => {
          throw new Error('audit store down');
        },
      },
    });
    server.register('things.create', async () => ({ ok: true }));
    expect((await post(server, { name: 'a' })).statusCode).toBe(200);
    expect(server.logs().some((line) => line['msg'] === 'audit hook failed')).toBe(true);
  });

  it('reports an audit hook that throws, with the route it ran for', async () => {
    const { reportError, errors } = recordingErrors();
    const server = build({
      registry: [route()],
      errors,
      hooks: {
        audit: async () => {
          throw new Error('audit store down');
        },
      },
    });
    server.register('things.create', async () => ({ ok: true }));
    await post(server, { name: 'a' });
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'audit store down' }),
      expect.objectContaining({ area: 'http_hook', operation: expect.stringContaining('audit ') }),
    );
  });
});

function recordingErrors() {
  const reportError =
    vi.fn<(error: unknown, context: { area: string; operation?: string }) => void>();
  return {
    reportError,
    errors: {
      reportError,
      recordOpsEvent: vi.fn<() => void>(),
      flush: vi.fn<() => Promise<void>>(),
      stop: vi.fn<() => Promise<void>>(),
      stats: vi.fn<() => ReporterStats>(),
    },
  };
}

describe('error hook', () => {
  it('runs before the error response is built and keeps the mapped answer', async () => {
    const seen: unknown[] = [];
    const server = build({
      registry: [route()],
      hooks: {
        beforeError: async (_request, error) => {
          seen.push(error);
        },
      },
    });
    server.register('things.create', async () => {
      throw new AppError('forbidden');
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(403);
    expect(seen).toHaveLength(1);
    expect(seen[0]).toBeInstanceOf(AppError);
  });

  it('fails closed with 503 when the hook cannot record the error', async () => {
    const server = build({
      registry: [route()],
      hooks: {
        beforeError: async () => {
          throw new Error('audit store down');
        },
      },
    });
    server.register('things.create', async () => {
      throw new AppError('not_found');
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(503);
    expect(ApiErrorSchema.parse(response.json()).error.code).toBe('service_unavailable');
    expect(server.logs().some((line) => line['msg'] === 'error hook failed')).toBe(true);
  });

  it('reports the hook failure itself, not only the 503 it causes', async () => {
    const { reportError, errors } = recordingErrors();
    const server = build({
      registry: [route()],
      errors,
      hooks: {
        beforeError: async () => {
          throw new Error('audit store down');
        },
      },
    });
    server.register('things.create', async () => {
      throw new AppError('not_found');
    });
    await post(server, { name: 'a' });
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'audit store down' }),
      expect.objectContaining({ area: 'http_hook' }),
    );
  });

  it('is not called for requests that succeed', async () => {
    const beforeError = vi.fn<() => Promise<void>>(async () => {});
    const server = build({ registry: [route()], hooks: { beforeError } });
    server.register('things.create', async () => ({ ok: true }));
    expect((await post(server, { name: 'a' })).statusCode).toBe(200);
    expect(beforeError).not.toHaveBeenCalled();
  });
});

describe('request validation', () => {
  it('answers 400 with field details and no echoed input', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => ({ ok: true }));
    const response = await post(server, { name: 918273645 });
    expect(response.statusCode).toBe(400);
    const body = ApiErrorSchema.parse(response.json());
    expect(body.error.code).toBe('validation_failed');
    expect(body.error.details?.[0]?.field).toBe('name');
    expect(JSON.stringify(body)).not.toContain('918273645');
  });

  it('answers 404 for a malformed id in the path', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => ({ ok: true }));
    const response = await server.app.inject({
      method: 'POST',
      url: '/v1/things/not-an-id',
      headers: { 'content-type': 'application/json' },
      payload: '{"name":"a"}',
    });
    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe('not_found');
  });

  it('validates query and headers', async () => {
    const server = build({
      registry: [
        route({
          id: 'things.list',
          method: 'GET',
          pathTemplate: '/v1/things',
          params: undefined as never,
          body: undefined as never,
          query: z.object({ limit: z.coerce.number().int().max(10) }),
          headers: z.object({ 'x-required': z.string() }),
        }),
      ],
    });
    server.register('things.list', async () => ({ ok: true }));
    const response = await server.app.inject({ method: 'GET', url: '/v1/things?limit=99' });
    expect(response.statusCode).toBe(400);
    const fields = response.json().error.details.map((detail: { field: string }) => detail.field);
    expect(fields).toEqual(['query.limit', 'headers.x-required']);
  });

  it('rejects a response that does not match its registered schema in test mode', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => ({ ok: false }));
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(500);
    expect(response.json().error.code).toBe('internal_error');
  });

  it('rejects a status that is not registered in test mode', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async (_request, reply) => reply.code(202).send({ ok: true }));
    expect((await post(server, { name: 'a' })).statusCode).toBe(500);
  });

  it('does not check responses outside test mode', async () => {
    const server = build({ registry: [route()], config: { DEPLOY_ENV: 'local' } });
    server.register('things.create', async () => ({ ok: false }));
    expect((await post(server, { name: 'a' })).statusCode).toBe(200);
  });

  it('fails to register a route that is not in the registry', () => {
    const server = build({ registry: [route()] });
    expect(() => server.register('missing.route', async () => ({}))).toThrow('missing.route');
  });
});

describe('limits', () => {
  it('answers 413 payload_too_large for a body one byte over the limit', async () => {
    const server = build({ registry: [route()], config: { BODY_LIMIT_BYTES: 262_144 } });
    server.register('things.create', async () => ({ ok: true }));
    const response = await server.app.inject({
      method: 'POST',
      url: '/v1/things/thing_0123abcd',
      headers: { 'content-type': 'application/json' },
      payload: 'x'.repeat(262_145),
    });
    expect(response.statusCode).toBe(413);
    expect(response.json().error.code).toBe('payload_too_large');
    expect(response.json().error.message).toBe(ERROR_MESSAGES.payload_too_large);
  });

  it('answers 413 for a streamed body without a length header', async () => {
    const server = build({ registry: [route()], config: { BODY_LIMIT_BYTES: 1024 } });
    server.register('things.create', async () => ({ ok: true }));
    const address = await server.listen({ port: 0, host: '127.0.0.1' });
    const chunk = new TextEncoder().encode('x'.repeat(600));
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(chunk);
        controller.enqueue(chunk);
        controller.close();
      },
    });
    const response = await fetch(`${address}/v1/things/thing_0123abcd`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      duplex: 'half',
    } as RequestInit);
    expect(response.status).toBe(413);
  });

  it('closes a request with a header over the limit with 431', async () => {
    const server = build({ config: { MAX_HEADER_BYTES: 1024 } });
    const address = new URL(await server.listen({ port: 0, host: '127.0.0.1' }));
    const status = await new Promise<number>((resolve, reject) => {
      const req = httpRequest(
        {
          host: address.hostname,
          port: address.port,
          path: '/healthz',
          headers: { 'x-big': 'a'.repeat(4096) },
        },
        (res) => {
          res.resume();
          resolve(res.statusCode ?? 0);
        },
      );
      req.on('error', reject);
      req.end();
    });
    expect(status).toBe(431);
  });

  it('answers unknown paths with a JSON 404', async () => {
    const server = build();
    const response = await server.app.inject({ method: 'GET', url: '/nope' });
    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe('not_found');
  });

  it('lets an app answer unmatched requests itself', async () => {
    const server = build({
      notFound: async (request, reply) => {
        if (request.url.startsWith('/api/')) throw new AppError('not_found');
        return reply.status(200).send({ fallback: request.url });
      },
    });
    const page = await server.app.inject({ method: 'GET', url: '/some/page' });
    expect(page.statusCode).toBe(200);
    expect(page.json()).toEqual({ fallback: '/some/page' });
    const api = await server.app.inject({ method: 'GET', url: '/api/x' });
    expect(api.statusCode).toBe(404);
    expect(api.json().error.code).toBe('not_found');
  });
});

describe('client address and edge checks', () => {
  const echoServer = (cidrs: string[]) => {
    const server = build({
      config: { TRUSTED_PROXY_CIDRS: cidrs },
      registry: [
        route({
          id: 'ip.get',
          method: 'GET',
          pathTemplate: '/ip',
          params: undefined as never,
          body: undefined as never,
          responses: { 200: z.object({ ip: z.string() }) },
        }),
      ],
    });
    server.register('ip.get', async (request) => ({ ip: request.clientIp }));
    return server;
  };

  it('ignores X-Forwarded-For when no proxy is trusted', async () => {
    const response = await echoServer([]).app.inject({
      method: 'GET',
      url: '/ip',
      remoteAddress: '10.1.1.1',
      headers: { 'x-forwarded-for': '6.6.6.6' },
    });
    expect(response.json()).toEqual({ ip: '10.1.1.1' });
  });

  it('takes the right-most untrusted hop behind a trusted proxy', async () => {
    const response = await echoServer(['10.0.0.0/8']).app.inject({
      method: 'GET',
      url: '/ip',
      remoteAddress: '10.1.1.1',
      headers: { 'x-forwarded-for': '6.6.6.6, 8.8.8.8, 10.2.2.2' },
    });
    expect(response.json()).toEqual({ ip: '8.8.8.8' });
  });

  it('refuses a Host that is not on the allow-list', async () => {
    const server = build({ config: { ALLOWED_HOSTS: ['app.example.com'] } });
    const denied = await server.app.inject({
      method: 'GET',
      url: '/nope',
      headers: { host: 'evil.example.com' },
    });
    expect(denied.statusCode).toBe(403);
    expect(denied.json().error.code).toBe('forbidden');
    const allowed = await server.app.inject({
      method: 'GET',
      url: '/nope',
      headers: { host: 'APP.example.com' },
    });
    expect(allowed.statusCode).toBe(404);
  });

  it('probes are exempt from the Host check', async () => {
    const server = build({ config: { ALLOWED_HOSTS: ['app.example.com'] } });
    const response = await server.app.inject({
      method: 'GET',
      url: '/healthz',
      headers: { host: '10.0.0.7:3001' },
    });
    expect(response.statusCode).toBe(200);
  });

  it('refuses to start in a deployed environment without allowed hosts', () => {
    expect(() => buildTestServer({ config: { DEPLOY_ENV: 'production' } })).toThrow(
      'ALLOWED_HOSTS',
    );
  });

  it('refuses a browser-facing app without its own origin', () => {
    expect(() => buildTestServer({ browserFacing: true })).toThrow('APP_BASE_URL');
  });

  it('checks the Origin of writes for browser-facing apps', async () => {
    const server = build({
      browserFacing: true,
      config: { APP_BASE_URL: 'https://app.example.com' },
      registry: [route()],
    });
    server.register('things.create', async () => ({ ok: true }));
    const foreign = await post(server, { name: 'a' }, { origin: 'https://evil.example.com' });
    expect(foreign.statusCode).toBe(403);
    const own = await post(server, { name: 'a' }, { origin: 'https://app.example.com' });
    expect(own.statusCode).toBe(200);
    const none = await post(server, { name: 'a' });
    expect(none.statusCode).toBe(200);
    const read = await server.app.inject({
      method: 'GET',
      url: '/nope',
      headers: { origin: 'https://evil.example.com' },
    });
    expect(read.statusCode).toBe(404);
  });
});

describe('ip throttle', () => {
  const countingLimiter = (): LimiterPort => {
    const counts = new Map<string, number>();
    return {
      async check(key, { limit }) {
        const next = (counts.get(key) ?? 0) + 1;
        counts.set(key, next);
        return {
          allowed: next <= limit,
          remaining: Math.max(0, limit - next),
          resetAt: new Date(Date.now() + 30_000),
        };
      },
      async reset(key) {
        counts.delete(key);
      },
    };
  };

  it('denies the request over the limit with Retry-After and spares other addresses', async () => {
    const server = build({
      config: { IP_THROTTLE_LIMIT: 3 },
      ipThrottle: { limiter: countingLimiter() },
    });
    const get = (remoteAddress: string) =>
      server.app.inject({ method: 'GET', url: '/nope', remoteAddress });
    for (let i = 0; i < 3; i += 1) expect((await get('1.1.1.1')).statusCode).toBe(404);
    const denied = await get('1.1.1.1');
    expect(denied.statusCode).toBe(429);
    expect(denied.json().error.code).toBe('rate_limited');
    expect(Number(denied.headers['retry-after'])).toBeGreaterThanOrEqual(1);
    expect((await get('2.2.2.2')).statusCode).toBe(404);
  });

  it('is disabled while the limit is 0', async () => {
    const check = vi.fn<() => void>();
    const server = build({
      config: { IP_THROTTLE_LIMIT: 0 },
      ipThrottle: { limiter: { check, reset: vi.fn<() => void>() } as unknown as LimiterPort },
    });
    await server.app.inject({ method: 'GET', url: '/nope' });
    expect(check).not.toHaveBeenCalled();
  });

  it('lets the request through and logs a warning when the limiter fails', async () => {
    const server = build({
      config: { IP_THROTTLE_LIMIT: 1 },
      ipThrottle: {
        limiter: {
          check: async () => {
            throw new Error('redis down');
          },
          reset: async () => {},
        },
      },
    });
    const response = await server.app.inject({ method: 'GET', url: '/nope' });
    expect(response.statusCode).toBe(404);
    expect(server.logs().some((line) => line['level'] === 40)).toBe(true);
  });

  it('does not throttle probes', async () => {
    const server = build({
      config: { IP_THROTTLE_LIMIT: 1 },
      ipThrottle: { limiter: countingLimiter() },
    });
    for (let i = 0; i < 4; i += 1) {
      expect((await server.app.inject({ method: 'GET', url: '/healthz' })).statusCode).toBe(200);
    }
  });
});

describe('workload identity', () => {
  const workloadServer = () => {
    const server = build({
      registry: [route()],
      workloadVerifier: sharedSecretWorkloadAuthenticator(
        createSharedSecretVerifier({ secret: 'secret-value', allowedCallers: ['web'] }),
      ),
    });
    server.register('things.create', async (request) => ({ ok: request.callerId === 'web' }));
    return server;
  };

  it('accepts a verified caller', async () => {
    const response = await post(
      workloadServer(),
      { name: 'a' },
      { 'x-caller-id': 'web', 'x-workload-secret': 'secret-value' },
    );
    expect(response.statusCode).toBe(200);
  });

  it('refuses a wrong secret and a missing credential with 401', async () => {
    const server = workloadServer();
    const wrong = await post(
      server,
      { name: 'a' },
      { 'x-caller-id': 'web', 'x-workload-secret': 'nope' },
    );
    expect(wrong.statusCode).toBe(401);
    expect(JSON.stringify(wrong.json())).not.toContain('secret-value');
    expect((await post(server, { name: 'a' })).statusCode).toBe(401);
  });

  it('records a rejected caller as an event, at most once a minute', async () => {
    const recordOpsEvent = vi.fn<(kind: string, severity: string, detail?: object) => void>();
    const server = build({
      registry: [route()],
      errors: {
        reportError: vi.fn<() => void>(),
        recordOpsEvent,
        flush: vi.fn<() => Promise<void>>(),
        stop: vi.fn<() => Promise<void>>(),
        stats: vi.fn<() => ReporterStats>(),
      },
      workloadVerifier: sharedSecretWorkloadAuthenticator(
        createSharedSecretVerifier({ secret: 'secret-value', allowedCallers: ['web'] }),
      ),
    });
    server.register('things.create', async () => ({ ok: true }));
    for (let i = 0; i < 3; i += 1) {
      await post(server, { name: 'a' }, { 'x-caller-id': 'web', 'x-workload-secret': 'nope' });
    }
    expect(recordOpsEvent).toHaveBeenCalledOnce();
    expect(recordOpsEvent).toHaveBeenCalledWith(
      'workload_auth_failed',
      'warning',
      expect.objectContaining({ area: 'http' }),
    );
    expect(JSON.stringify(recordOpsEvent.mock.calls)).not.toContain('secret-value');
  });
});

describe('probes', () => {
  it('keeps /healthz at 200 while a readiness check fails', async () => {
    const server = build({
      readinessChecks: {
        db: async () => {
          throw new Error('connection refused to 10.0.0.5');
        },
      },
    });
    expect((await server.app.inject({ method: 'GET', url: '/healthz' })).json()).toEqual({
      status: 'ok',
    });
    const ready = await server.app.inject({ method: 'GET', url: '/readyz' });
    expect(ready.statusCode).toBe(503);
    expect(ready.json()).toEqual({ status: 'unavailable', checks: { db: 'error' } });
  });

  it('reports ok when every check passes and treats a slow check as failed', async () => {
    const server = build({
      readinessTimeoutMs: 20,
      readinessChecks: { fast: async () => {}, slow: () => new Promise(() => {}) },
    });
    const ready = await server.app.inject({ method: 'GET', url: '/readyz' });
    expect(ready.json().checks).toEqual({ fast: 'ok', slow: 'error' });
    const healthy = build({ readinessChecks: { fast: async () => {} } });
    const ok = await healthy.app.inject({ method: 'GET', url: '/readyz' });
    expect(ok.statusCode).toBe(200);
    expect(ok.json().status).toBe('ok');
  });

  it('serves metrics with the route template as label, or not at all when disabled', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => ({ ok: true }));
    await post(server, { name: 'a' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    const metrics = await server.app.inject({ method: 'GET', url: '/metrics' });
    expect(metrics.statusCode).toBe(200);
    expect(metrics.body).toContain('boldcreate_api_http_requests_total');
    expect(metrics.body).toContain('route="/v1/things/:thingId"');
    expect(metrics.body).not.toContain('thing_0123abcd');
    const off = build({ config: { METRICS_ENABLED: false } });
    expect((await off.app.inject({ method: 'GET', url: '/metrics' })).statusCode).toBe(404);
  });
});

describe('error mapping', () => {
  it.each(ERROR_CODES)('maps %s to its registered status and fixed message', async (code) => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => {
      throw new AppError(code);
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(ERROR_HTTP_STATUS[code]);
    const body = ApiErrorSchema.parse(response.json());
    expect(body.error.code).toBe(code);
    expect(body.error.message).toBe(ERROR_MESSAGES[code]);
    expect(body.error.requestId).toBe(response.headers['x-request-id']);
    expect(response.headers['retry-after']).toBe(
      RETRY_AFTER_CODES.includes(code) ? '1' : undefined,
    );
  });

  it('uses the configured Retry-After for a code', async () => {
    const server = build({ registry: [route()], retryAfterSeconds: { org_key_pending: 7 } });
    server.register('things.create', async () => {
      throw new AppError('org_key_pending');
    });
    expect((await post(server, { name: 'a' })).headers['retry-after']).toBe('7');
  });

  it('answers an unknown error with a generic body and logs the cause', async () => {
    const server = build({ registry: [route()] });
    server.register('things.create', async () => {
      throw new Error('secret stack');
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(500);
    expect(response.json().error.code).toBe('internal_error');
    expect(response.body).not.toContain('secret stack');
    expect(JSON.stringify(server.logs())).toContain('secret stack');
  });

  it('reports an unexpected error and a server failure, but not a caller error', async () => {
    const reportError = vi.fn<(error: unknown, context?: object) => void>();
    const errors = {
      reportError,
      recordOpsEvent: vi.fn<() => void>(),
      flush: vi.fn<() => void>(),
      stop: vi.fn<() => void>(),
    };
    const server = build({ registry: [route()], errors } as never);
    server.register('things.create', async () => {
      throw new Error('boom');
    });
    expect((await post(server, { name: 'a' })).statusCode).toBe(500);
    expect(reportError).toHaveBeenCalledOnce();
    expect(reportError.mock.calls[0]?.[1]).toMatchObject({
      area: 'http',
      errorCode: 'internal_error',
    });

    reportError.mockClear();
    const caller = build({ registry: [route()], errors } as never);
    caller.register('things.create', async () => {
      throw new AppError('not_found');
    });
    expect((await post(caller, { name: 'a' })).statusCode).toBe(404);
    expect(reportError).not.toHaveBeenCalled();
  });
});

describe('request context and headers', () => {
  it('puts the request id and tenant on every log line of the request', async () => {
    const { getContext, setTenant } = await import('@boldcreate-integrations/observability');
    const server = build({
      registry: [route()],
      hooks: {
        authenticate: async () => {
          setTenant('org-uuid');
          return null;
        },
      },
    });
    server.register('things.create', async (request) => {
      request.log.info('from handler');
      return { ok: getContext()?.tenantId === 'org-uuid' };
    });
    const response = await post(server, { name: 'a' });
    expect(response.statusCode).toBe(200);
    const id = response.headers['x-request-id'];
    const handlerLine = server.logs().find((line) => line['msg'] === 'from handler');
    expect(handlerLine?.['requestId']).toBe(id);
    expect(handlerLine?.['tenantId']).toBe('org-uuid');
  });

  it('sets security headers and the API content security policy', async () => {
    const server = build();
    const response = await server.app.inject({ method: 'GET', url: '/healthz' });
    expect(response.headers['content-security-policy']).toContain("default-src 'none'");
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['strict-transport-security']).toBeUndefined();
    const custom = build({ contentSecurityPolicy: false });
    const bare = await custom.app.inject({ method: 'GET', url: '/healthz' });
    expect(bare.headers['content-security-policy']).toBeUndefined();
  });

  it('sets HSTS when deployed', async () => {
    const server = build({
      config: { DEPLOY_ENV: 'staging', ALLOWED_HOSTS: ['app.example.com'] },
    });
    const response = await server.app.inject({ method: 'GET', url: '/healthz' });
    expect(response.headers['strict-transport-security']).toContain('max-age=');
  });

  it('never trusts a client supplied request id', async () => {
    const server = build();
    const response = await server.app.inject({
      method: 'GET',
      url: '/healthz',
      headers: { 'x-request-id': 'attacker-chosen' },
    });
    expect(response.headers['x-request-id']).not.toBe('attacker-chosen');
  });
});

describe('registered routes', () => {
  it('lists the probes and every registry route, one entry per method', () => {
    const server = build({ registry: [route({ method: 'POST' })] });
    server.register('things.create', async () => ({ ok: true }));
    const served = server.routes().map((entry) => `${entry.method} ${entry.url}`);
    expect(served).toContain('GET /healthz');
    expect(served).toContain('GET /readyz');
    expect(served).toContain('POST /v1/things/:thingId');
  });

  it('returns a copy', () => {
    const server = build();
    server.routes().length = 0;
    expect(server.routes().length).toBeGreaterThan(0);
  });
});
