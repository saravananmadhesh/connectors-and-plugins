import { afterEach, describe, expect, it } from 'vitest';
import type { Sealer } from '@boldcreate-integrations/credentials';
import type { Db } from '@boldcreate-integrations/db';
import {
  createMemoryIdempotencyStore,
  createWorkloadAuthenticator,
  type HttpServer,
} from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import type { BlobPort } from '@boldcreate-integrations/ports';
import { buildApp } from './app.js';
import { loadApiConfig } from './config.js';

const SECRET = 'a-shared-secret-for-tests';
const config = loadApiConfig({
  NODE_ENV: 'test',
  DEPLOY_ENV: 'test',
  DATABASE_URL: 'postgresql://app_api:pw@localhost:5432/boldcreate',
  WORKLOAD_SECRET: SECRET,
  REDIS_URL: 'redis://:pw@localhost:6379',
  BLOB_BUCKET: 'artifacts',
});

const sealer: Sealer = {
  seal: async () => {
    throw new Error('not used');
  },
  sealFields: async () => {
    throw new Error('not used');
  },
};

const blob: BlobPort = {
  getStream: async () => {
    throw new Error('not used');
  },
  head: async () => null,
  put: async () => undefined,
  exists: async () => false,
  delete: async () => undefined,
};

let server: HttpServer | undefined;

async function build(pingDb: () => Promise<unknown> = async () => 1) {
  server = await buildApp(config, {
    db: {} as Db,
    blob,
    idempotencyStore: createMemoryIdempotencyStore(),
    sealerFor: () => sealer,
    mcp: {
      deps: {
        sealerFor: () => sealer,
        unsealer: {
          unseal: async () => {
            throw new Error('not used');
          },
          unsealFields: async () => {
            throw new Error('not used');
          },
        },
        fetcher: async () => {
          throw new Error('not used');
        },
      },
      redirectUri: 'http://localhost:3000/api/v1/oauth/callback',
      appBaseUrl: 'http://localhost:3000',
    },
    limiter: {
      check: async () => ({ allowed: true, remaining: 1, resetAt: new Date() }),
      reset: async () => undefined,
    },
    logger: createLogger({ service: 'api', level: 'silent' }),
    metrics: createMetrics({ service: 'api' }),
    workload: createWorkloadAuthenticator({
      service: 'api',
      mode: 'shared_secret',
      secret: SECRET,
    }),
    pingDb,
  });
  return server.app;
}

afterEach(async () => {
  await server?.close();
  server = undefined;
});

const web = { 'x-caller-id': 'web', 'x-workload-secret': SECRET };

describe('api app', () => {
  it('serves health, readiness and metrics without credentials', async () => {
    const app = await build();
    expect((await app.inject({ method: 'GET', url: '/healthz' })).statusCode).toBe(200);
    const ready = await app.inject({ method: 'GET', url: '/readyz' });
    expect(ready.json()).toEqual({ status: 'ok', checks: { db: 'ok' } });
    const metrics = await app.inject({ method: 'GET', url: '/metrics' });
    expect(metrics.body).toContain('boldcreate_api_http_requests_total');
  });

  it('reports not ready when the database check fails', async () => {
    const app = await build(async () => {
      throw new Error('down');
    });
    expect((await app.inject({ method: 'GET', url: '/readyz' })).statusCode).toBe(503);
  });

  it('needs a workload credential on every other path, known or not', async () => {
    const app = await build();
    for (const url of ['/v1/auth/me', '/v1/orgs', '/v1/nothing']) {
      const res = await app.inject({ method: 'GET', url });
      expect(res.statusCode).toBe(401);
      expect(res.json()).toMatchObject({ error: { code: 'unauthenticated' } });
    }
    const wrong = await app.inject({
      method: 'GET',
      url: '/v1/orgs',
      headers: { 'x-caller-id': 'web', 'x-workload-secret': 'wrong' },
    });
    expect(wrong.statusCode).toBe(401);
  });

  it('refuses a verified caller that is not on the allow-list', async () => {
    const app = await build();
    const res = await app.inject({
      method: 'GET',
      url: '/v1/orgs',
      headers: { 'x-caller-id': 'worker', 'x-workload-secret': SECRET },
    });
    expect(res.statusCode).toBe(403);
    expect(res.json()).toMatchObject({ error: { code: 'forbidden' } });
  });

  it('serves an allowed caller: unknown paths are 404, routes ask for a session', async () => {
    const app = await build();
    const unknown = await app.inject({ method: 'GET', url: '/v1/nothing', headers: web });
    expect(unknown.statusCode).toBe(404);
    expect(unknown.json()).toMatchObject({ error: { code: 'not_found' } });
    const me = await app.inject({ method: 'GET', url: '/v1/auth/me', headers: web });
    expect(me.statusCode).toBe(401);
    const admin = await app.inject({
      method: 'GET',
      url: '/v1/auth/me',
      headers: { ...web, 'x-caller-id': 'admin' },
    });
    expect(admin.statusCode).toBe(401);
  });

  it('answers a malformed id in the path with 404', async () => {
    const app = await build();
    const res = await app.inject({ method: 'GET', url: '/v1/orgs/not-an-id', headers: web });
    expect(res.statusCode).toBe(404);
  });

  it('puts the request id on every response', async () => {
    const app = await build();
    const res = await app.inject({ method: 'GET', url: '/v1/orgs' });
    expect((res.json() as { error: { requestId: string } }).error.requestId).toBe(
      res.headers['x-request-id'],
    );
  });
});
