import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES } from '@boldcreate-integrations/contracts';
import type { Executor } from '@boldcreate-integrations/db';
import { compareRoutes, type HttpServer } from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadAdminConfig } from './config.js';

let server: HttpServer | undefined;

afterEach(async () => {
  await server?.close();
  server = undefined;
});

describe('admin routes', () => {
  it('serve exactly the registry entries of the admin app', async () => {
    server = await buildApp(
      loadAdminConfig({
        NODE_ENV: 'test',
        DEPLOY_ENV: 'test',
        DATABASE_URL: 'postgresql://app_admin:pw@localhost:5432/boldcreate',
        COOKIE_SECRET: 'cookie-secret-value-for-tests',
        CSRF_SECRET: 'csrf-secret-value-for-tests',
        WORKLOAD_SECRET: 'workload-secret-value-for-tests',
        CLIENT_DIST_DIR: '/nonexistent',
      }),
      {
        logger: createLogger({ service: 'admin', level: 'silent' }),
        metrics: createMetrics({ service: 'admin' }),
        db: {} as Executor,
        pingDb: async () => 1,
        fetchArchive: async () => {
          throw new Error('not used');
        },
      },
    );
    const entries = ROUTES.filter((route) => route.app === 'admin' || route.app === 'all');
    expect(entries.length).toBeGreaterThan(0);
    expect(compareRoutes(server.routes(), entries)).toEqual({ missing: [], unexpected: [] });
  });
});
