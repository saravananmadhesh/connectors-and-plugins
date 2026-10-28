import { describe, expect, it } from 'vitest';
import Fastify from 'fastify';
import { createArtifactProxy } from './artifacts.js';

function setup(upstream: (url: string, init: RequestInit) => Promise<Response>) {
  const calls: { url: string; init: RequestInit }[] = [];
  const forward = createArtifactProxy({
    apiBaseUrl: 'http://api.internal',
    workloadHeaders: (async () => ({ 'x-caller-id': 'gateway' })) as never,
    fetch: (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return upstream(url, init);
    }) as unknown as typeof fetch,
  });
  const app = Fastify();
  app.decorateRequest('clientIp', '10.0.0.7');
  app.get('/v1/sync', (request, reply) => forward(request, reply, '/v1/sync'));
  app.post('/v1/sync/reports', (request, reply) => forward(request, reply, '/v1/sync/reports'));
  return { app, calls };
}

describe('artifact proxy', () => {
  it('forwards the key and conditional headers with the gateway identity, nothing else', async () => {
    const { app, calls } = setup(async () => new Response('{"ok":true}', { status: 200 }));
    const res = await app.inject({
      method: 'GET',
      url: '/v1/sync?kinds=skill',
      headers: {
        authorization: 'Bearer key',
        'if-none-match': '"v1"',
        cookie: 'sid=secret',
        'x-caller-id': 'web',
      },
    });
    expect(res.statusCode).toBe(200);
    expect(calls[0]?.url).toBe('http://api.internal/v1/sync?kinds=skill');
    const sent = calls[0]?.init.headers as Record<string, string>;
    expect(sent['authorization']).toBe('Bearer key');
    expect(sent['if-none-match']).toBe('"v1"');
    expect(sent['x-caller-id']).toBe('gateway');
    expect(sent['cookie']).toBeUndefined();
  });

  it('relays status and an allowlist of headers, and drops cookies', async () => {
    const { app } = setup(
      async () =>
        new Response(null, {
          status: 304,
          headers: { etag: '"v1"', 'set-cookie': 'a=b', 'x-internal': '1', vary: 'Authorization' },
        }),
    );
    const res = await app.inject({
      method: 'GET',
      url: '/v1/sync',
      headers: { authorization: 'Bearer k' },
    });
    expect(res.statusCode).toBe(304);
    expect(res.headers['etag']).toBe('"v1"');
    expect(res.headers['vary']).toBe('Authorization');
    expect(res.headers['set-cookie']).toBeUndefined();
    expect(res.headers['x-internal']).toBeUndefined();
  });

  it('streams a body and passes a POST body as JSON', async () => {
    const { app, calls } = setup(
      async () =>
        new Response('bytes', { status: 200, headers: { 'content-type': 'application/gzip' } }),
    );
    const get = await app.inject({ method: 'GET', url: '/v1/sync' });
    expect(get.body).toBe('bytes');
    expect(get.headers['content-type']).toBe('application/gzip');
    await app.inject({ method: 'POST', url: '/v1/sync/reports', payload: { applied: [] } });
    expect(calls[1]?.init.body).toBe('{"applied":[]}');
  });

  it('answers 502 when the api cannot be reached', async () => {
    const { app } = setup(async () => {
      throw new Error('connect refused');
    });
    const res = await app.inject({ method: 'GET', url: '/v1/sync' });
    expect(res.statusCode).toBe(502);
    expect(res.json()).toMatchObject({ error: { code: 'upstream_unavailable' } });
  });
});
