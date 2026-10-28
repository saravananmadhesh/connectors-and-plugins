import { afterEach, describe, expect, it, vi } from 'vitest';
import * as z from 'zod/v4';
import type { RouteDef } from '@boldcreate-integrations/contracts';
import { AppError } from '@boldcreate-integrations/contracts';
import { canonicalJson, createIdempotency, requestHash } from './idempotency.js';
import type { IdempotencyStore } from './idempotency.js';
import { createMemoryIdempotencyStore } from './memory-idempotency-store.js';
import { buildTestServer, type TestServer } from './testing.js';

const route = (overrides: Partial<RouteDef> = {}): RouteDef => ({
  id: 'things.create',
  method: 'POST',
  pathTemplate: '/v1/things',
  app: 'api',
  exposure: 'internal',
  principals: ['session'],
  action: null,
  body: z.object({ name: z.string().min(1), tags: z.array(z.string()).optional() }),
  responses: { 201: z.unknown(), 400: z.unknown() },
  idempotency: 'required',
  ...overrides,
});

const servers: TestServer[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => server.app.close()));
});

interface Setup {
  server: TestServer;
  handler: ReturnType<typeof vi.fn<() => Promise<unknown>>>;
  store: ReturnType<typeof createMemoryIdempotencyStore>;
}

function setup(
  options: {
    route?: Partial<RouteDef>;
    store?: IdempotencyStore;
    respond?: (status: number) => unknown;
    status?: number;
    principal?: (headers: Record<string, unknown>) => string;
  } = {},
): Setup {
  const memory = createMemoryIdempotencyStore();
  const idempotency = createIdempotency({
    store: options.store ?? memory,
    ttlSeconds: 60,
    principalKey: async (request) =>
      options.principal ? options.principal(request.headers) : 'usr:one',
  });
  const def = route(options.route);
  const server = buildTestServer({
    registry: [def],
    hooks: {
      idempotency: (request, reply, r, principal) =>
        idempotency.begin(request, reply, r, principal),
      idempotencyFinish: (request, reply, payload) => idempotency.finish(request, reply, payload),
    },
  });
  servers.push(server);
  let counter = 0;
  const handler = vi.fn<() => Promise<unknown>>(async () => {
    counter += 1;
    return { n: counter };
  });
  server.register(def.id, async (_request, reply) => {
    const result = await handler();
    void reply.status(options.status ?? 201);
    if (options.status === 204) return reply.send();
    return result;
  });
  return { server, handler, store: memory };
}

const post = (
  server: TestServer,
  payload: unknown,
  headers: Record<string, string> = {},
  url = '/v1/things',
) =>
  server.app.inject({
    method: 'POST',
    url,
    headers: { 'content-type': 'application/json', ...headers },
    payload: JSON.stringify(payload),
  });

describe('idempotency header', () => {
  it('rejects a missing header on a required route', async () => {
    const { server, handler } = setup();
    const res = await post(server, { name: 'a' });
    expect(res.statusCode).toBe(400);
    expect(res.json().error.code).toBe('idempotency_key_required');
    expect(handler).not.toHaveBeenCalled();
  });

  it('lets a request without the header through on an optional route', async () => {
    const { server, handler } = setup({ route: { idempotency: 'optional' } });
    const res = await post(server, { name: 'a' });
    expect(res.statusCode).toBe(201);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it.each(['has space', 'tab\there', 'é-key', 'x'.repeat(256)])(
    'rejects the malformed key %j with validation_failed',
    async (key) => {
      const { server, handler } = setup({ route: { idempotency: 'optional' } });
      const res = await post(server, { name: 'a' }, { 'idempotency-key': key });
      expect(res.statusCode).toBe(400);
      expect(res.json().error.code).toBe('validation_failed');
      expect(handler).not.toHaveBeenCalled();
    },
  );

  it('accepts a key of 255 printable characters', async () => {
    const { server } = setup();
    const res = await post(server, { name: 'a' }, { 'idempotency-key': 'k'.repeat(255) });
    expect(res.statusCode).toBe(201);
  });
});

describe('replay', () => {
  it('replays the stored response without running the handler again', async () => {
    const { server, handler } = setup();
    const headers = { 'idempotency-key': 'key-1' };
    const first = await post(server, { name: 'a' }, headers);
    const second = await post(server, { name: 'a' }, headers);
    expect(first.statusCode).toBe(201);
    expect(first.headers['idempotent-replay']).toBeUndefined();
    expect(second.statusCode).toBe(201);
    expect(second.json()).toEqual(first.json());
    expect(second.headers['idempotent-replay']).toBe('true');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('treats the key order of the body as irrelevant', async () => {
    const { server, handler } = setup();
    const headers = { 'idempotency-key': 'key-2' };
    await post(server, { name: 'a', tags: ['x'] }, headers);
    const res = await server.app.inject({
      method: 'POST',
      url: '/v1/things',
      headers: { 'content-type': 'application/json', ...headers },
      payload: '{"tags":["x"],"name":"a"}',
    });
    expect(res.headers['idempotent-replay']).toBe('true');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('answers 409 idempotency_key_reused for another body', async () => {
    const { server, handler } = setup();
    const headers = { 'idempotency-key': 'key-3' };
    await post(server, { name: 'a' }, headers);
    const res = await post(server, { name: 'b' }, headers);
    expect(res.statusCode).toBe(409);
    expect(res.json().error.code).toBe('idempotency_key_reused');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('answers 409 with Retry-After while the first request is still running', async () => {
    const { server, handler } = setup();
    let release: () => void = () => {};
    handler.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          release = () => resolve({ n: 1 });
        }),
    );
    const headers = { 'idempotency-key': 'key-4' };
    const first = post(server, { name: 'a' }, headers);
    await vi.waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    const second = await post(server, { name: 'a' }, headers);
    expect(second.statusCode).toBe(409);
    expect(second.json().error.code).toBe('conflict');
    expect(second.headers['retry-after']).toBe('1');
    release();
    expect((await first).statusCode).toBe(201);
  });

  it('stores client errors, so a replay of a 400 is the same 400', async () => {
    const { server, handler } = setup({ status: 400 });
    const headers = { 'idempotency-key': 'key-5' };
    const first = await post(server, { name: 'a' }, headers);
    const second = await post(server, { name: 'a' }, headers);
    expect(first.statusCode).toBe(400);
    expect(second.statusCode).toBe(400);
    expect(second.headers['idempotent-replay']).toBe('true');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('replays a stored 204 without a body', async () => {
    const { server } = setup({
      route: { responses: { 204: z.undefined() } },
      status: 204,
    });
    const headers = { 'idempotency-key': 'key-6' };
    // The handler returns a body, which a 204 drops.
    const first = await post(server, { name: 'a' }, headers);
    const second = await post(server, { name: 'a' }, headers);
    expect(first.statusCode).toBe(204);
    expect(second.statusCode).toBe(204);
    expect(second.body).toBe('');
  });
});

describe('failures', () => {
  it('abandons the claim after a 5xx so the client can retry', async () => {
    const { server, handler, store } = setup();
    handler.mockRejectedValueOnce(new Error('boom'));
    const headers = { 'idempotency-key': 'key-7' };
    const first = await post(server, { name: 'a' }, headers);
    expect(first.statusCode).toBe(500);
    const second = await post(server, { name: 'a' }, headers);
    expect(second.statusCode).toBe(201);
    expect(second.headers['idempotent-replay']).toBeUndefined();
    expect(handler).toHaveBeenCalledTimes(2);
    expect(await store.purgeExpired(10)).toBe(0);
  });

  it('abandons the claim when a mapped error is a 503', async () => {
    const { server, handler } = setup();
    handler.mockRejectedValueOnce(new AppError('service_unavailable'));
    const headers = { 'idempotency-key': 'key-8' };
    expect((await post(server, { name: 'a' }, headers)).statusCode).toBe(503);
    expect((await post(server, { name: 'a' }, headers)).statusCode).toBe(201);
  });

  it('frees the claim when storing the response fails', async () => {
    const memory = createMemoryIdempotencyStore();
    const store: IdempotencyStore = {
      ...memory,
      complete: async () => {
        throw new Error('store down');
      },
    };
    const { server, handler } = setup({ store });
    const headers = { 'idempotency-key': 'key-9' };
    expect((await post(server, { name: 'a' }, headers)).statusCode).toBe(201);
    const again = await post(server, { name: 'a' }, headers);
    expect(again.statusCode).toBe(201);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe('secret responses', () => {
  it('never stores the body and refuses to replay it', async () => {
    const { server, handler, store } = setup({ route: { secretResponse: true } });
    const scope = {
      principalKey: 'usr:one',
      method: 'POST',
      routeTemplate: '/v1/things',
      idemKey: 'key-10',
    };
    const headers = { 'idempotency-key': 'key-10' };
    const first = await post(server, { name: 'a' }, headers);
    expect(first.statusCode).toBe(201);
    expect(await store.get(scope)).toMatchObject({ responseBody: null, secretResponse: true });
    const second = await post(server, { name: 'a' }, headers);
    expect(second.statusCode).toBe(409);
    expect(second.json().error.code).toBe('idempotent_replay_secret_unavailable');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('scoping', () => {
  it('keeps the same key independent per principal', async () => {
    const { server, handler } = setup({
      principal: (headers) => `usr:${String(headers['x-user'])}`,
    });
    const key = { 'idempotency-key': 'shared' };
    const a = await post(server, { name: 'a' }, { ...key, 'x-user': 'a' });
    const b = await post(server, { name: 'a' }, { ...key, 'x-user': 'b' });
    expect(a.headers['idempotent-replay']).toBeUndefined();
    expect(b.headers['idempotent-replay']).toBeUndefined();
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('keeps the same key independent per route', async () => {
    const memory = createMemoryIdempotencyStore();
    const idempotency = createIdempotency({
      store: memory,
      ttlSeconds: 60,
      principalKey: async () => 'usr:one',
    });
    const routes = [route(), route({ id: 'things.other', pathTemplate: '/v1/others' })];
    const server = buildTestServer({
      registry: routes,
      hooks: {
        idempotency: (request, reply, r, principal) =>
          idempotency.begin(request, reply, r, principal),
        idempotencyFinish: (request, reply, payload) => idempotency.finish(request, reply, payload),
      },
    });
    servers.push(server);
    const calls = vi.fn<() => void>();
    for (const r of routes) {
      server.register(r.id, async (_request, reply) => {
        calls();
        void reply.status(201);
        return { ok: true };
      });
    }
    const headers = { 'idempotency-key': 'same' };
    await post(server, { name: 'a' }, headers, '/v1/things');
    const other = await post(server, { name: 'a' }, headers, '/v1/others');
    expect(other.headers['idempotent-replay']).toBeUndefined();
    expect(calls).toHaveBeenCalledTimes(2);
  });
});

describe('request hash', () => {
  it('ignores object key order and distinguishes values', () => {
    const parts = (body: unknown) => ({ params: { id: 1 }, query: {}, body });
    expect(requestHash('POST', '/x', parts({ a: 1, b: { c: 2, d: 3 } }))).toBe(
      requestHash('POST', '/x', parts({ b: { d: 3, c: 2 }, a: 1 })),
    );
    expect(requestHash('POST', '/x', parts({ a: 1 }))).not.toBe(
      requestHash('POST', '/x', parts({ a: 2 })),
    );
    expect(requestHash('POST', '/x', parts({ a: 1 }))).not.toBe(
      requestHash('PUT', '/x', parts({ a: 1 })),
    );
    expect(requestHash('POST', '/x', parts([1, 2]))).not.toBe(
      requestHash('POST', '/x', parts([2, 1])),
    );
  });

  it('serializes undefined as null and sorts nested keys', () => {
    expect(canonicalJson(undefined)).toBe('null');
    expect(canonicalJson({ b: [{ z: 1, a: 2 }], a: null })).toBe('{"a":null,"b":[{"a":2,"z":1}]}');
  });
});
