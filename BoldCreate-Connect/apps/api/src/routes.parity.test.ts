import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES } from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import type { Db } from '@boldcreate-integrations/db';
import {
  compareRoutes,
  createMemoryIdempotencyStore,
  createWorkloadAuthenticator,
  type HttpServer,
} from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import type { BlobPort } from '@boldcreate-integrations/ports';
import { buildApp } from './app.js';
import { loadApiConfig } from './config.js';

const SECRET = 'a-shared-secret-for-tests';
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

afterEach(async () => {
  await server?.close();
  server = undefined;
});

describe('api routes', () => {
  it('serve exactly the registry entries of the api', async () => {
    server = await buildApp(
      loadApiConfig({
        NODE_ENV: 'test',
        DEPLOY_ENV: 'test',
        DATABASE_URL: 'postgresql://app_api:pw@localhost:5432/boldcreate',
        WORKLOAD_SECRET: SECRET,
        REDIS_URL: 'redis://:pw@localhost:6379',
        BLOB_BUCKET: 'artifacts',
      }),
      {
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
        pingDb: async () => 1,
      },
    );
    const entries = ROUTES.filter((route) => route.app === 'api' || route.app === 'all');
    expect(compareRoutes(server.routes(), entries)).toEqual({ missing: [], unexpected: [] });
  });
});
