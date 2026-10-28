import { afterEach, describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import type { HttpServer } from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadAdminConfig } from './config.js';

export const testConfig = loadAdminConfig({
  NODE_ENV: 'test',
  DEPLOY_ENV: 'test',
  DATABASE_URL: 'postgresql://app_admin:pw@localhost:5432/boldcreate',
  COOKIE_SECRET: 'cookie-secret-value-for-tests',
  CSRF_SECRET: 'csrf-secret-value-for-tests',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
  ADMIN_ALLOWED_EMAILS: 'ops@example.test',
  CLIENT_DIST_DIR: '/nonexistent',
});

let server: HttpServer | undefined;

async function build(pingDb: () => Promise<unknown> = async () => 1) {
  server = await buildApp(testConfig, {
    logger: createLogger({ service: 'admin', level: 'silent' }),
    metrics: createMetrics({ service: 'admin' }),
    db: {} as Executor,
    pingDb,
    fetchArchive: async () => {
      throw new Error('not used');
    },
  });
  return server.app;
}

afterEach(async () => {
  await server?.close();
  server = undefined;
});

describe('admin app', () => {
  it('serves health, readiness and metrics', async () => {
    const app = await build();
    expect((await app.inject({ method: 'GET', url: '/healthz' })).json()).toEqual({ status: 'ok' });
    const ready = await app.inject({ method: 'GET', url: '/readyz' });
    expect(ready.statusCode).toBe(200);
    expect(ready.json()).toEqual({ status: 'ok', checks: { db: 'ok' } });
    const metrics = await app.inject({ method: 'GET', url: '/metrics' });
    expect(metrics.body).toContain('boldcreate_admin_http_requests_total');
  });

  it('reports not ready when the database check fails', async () => {
    const app = await build(async () => {
      throw new Error('down');
    });
    const res = await app.inject({ method: 'GET', url: '/readyz' });
    expect(res.statusCode).toBe(503);
    expect(res.json()).toMatchObject({ checks: { db: 'error' } });
  });

  it.each([
    ['GET', '/'],
    ['GET', '/v1/orgs'],
    ['POST', '/api/v1/auth/signin'],
    ['GET', '/internal/v1/admin/plugins'],
  ])('answers 404 not_found JSON for %s %s without a client build', async (method, url) => {
    const app = await build();
    const res = await app.inject({ method: method as 'GET' | 'POST', url });
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.json()).toMatchObject({ error: { code: 'not_found' } });
  });

  it('answers 401 for the session route without a cookie', async () => {
    const app = await build();
    const res = await app.inject({ method: 'GET', url: '/api/v1/admin/auth/session' });
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { code: 'unauthenticated' } });
  });

  it('refuses a write without the CSRF token', async () => {
    const app = await build();
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/admin/auth/signin',
      payload: { email: 'ops@example.test', password: 'whatever-password' },
    });
    expect(res.statusCode).toBe(403);
  });

  it('rejects a malformed sign-in body before any lookup', async () => {
    const app = await build();
    const csrf = await app.inject({ method: 'GET', url: '/api/csrf' });
    const cookieHeader = csrf.cookies.map((c) => `${c.name}=${c.value}`).join('; ');
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/admin/auth/signin',
      headers: { cookie: cookieHeader, 'x-csrf-token': csrf.json().csrfToken },
      payload: { email: 'not-an-email' },
    });
    expect(res.statusCode).toBe(400);
    expect(res.json()).toMatchObject({ error: { code: 'validation_failed' } });
  });
});
