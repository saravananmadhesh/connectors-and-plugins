import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import type { HttpServer } from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadAdminConfig } from './config.js';

let dist: string;
let server: HttpServer | undefined;

beforeEach(async () => {
  dist = await mkdtemp(join(tmpdir(), 'admin-dist-'));
  await mkdir(join(dist, 'assets'));
  await writeFile(join(dist, 'index.html'), '<!doctype html><title>shell</title>');
  await writeFile(join(dist, 'assets', 'index-old.css'), 'body{}');
});

afterEach(async () => {
  await server?.close();
  server = undefined;
  await rm(dist, { recursive: true, force: true });
});

async function build() {
  server = await buildApp(
    loadAdminConfig({
      NODE_ENV: 'test',
      DEPLOY_ENV: 'test',
      DATABASE_URL: 'postgresql://app_admin:pw@localhost:5432/boldcreate',
      COOKIE_SECRET: 'cookie-secret-value-for-tests',
      CSRF_SECRET: 'csrf-secret-value-for-tests',
      WORKLOAD_SECRET: 'workload-secret-value-for-tests',
      ADMIN_ALLOWED_EMAILS: 'ops@example.test',
      CLIENT_DIST_DIR: dist,
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
  return server.app;
}

describe('admin client files', () => {
  it('serves a file with its own type, and the page for any other address', async () => {
    const app = await build();
    const css = await app.inject({ method: 'GET', url: '/assets/index-old.css' });
    expect(css.statusCode).toBe(200);
    expect(css.headers['content-type']).toContain('text/css');
    const page = await app.inject({ method: 'GET', url: '/plugins/some-id' });
    expect(page.statusCode).toBe(200);
    expect(page.headers['content-type']).toContain('text/html');
    expect(page.body).toContain('shell');
  });

  it('serves files built after the server started, as a rebuilt client has new names', async () => {
    const app = await build();
    await writeFile(join(dist, 'assets', 'index-new.js'), 'export {};');
    await writeFile(join(dist, 'theme-init.js'), 'void 0;');
    const script = await app.inject({ method: 'GET', url: '/assets/index-new.js' });
    expect(script.statusCode).toBe(200);
    expect(script.headers['content-type']).toContain('javascript');
    expect((await app.inject({ method: 'GET', url: '/theme-init.js' })).statusCode).toBe(200);
  });

  it('does not serve anything outside the client folder', async () => {
    const app = await build();
    const outside = join(dist, '..', 'admin-outside.txt');
    await writeFile(outside, 'secret');
    try {
      for (const url of ['/..%2Fadmin-outside.txt', '/%2e%2e/admin-outside.txt']) {
        expect((await app.inject({ method: 'GET', url })).body).not.toContain('secret');
      }
    } finally {
      await rm(outside, { force: true });
    }
  });

  it('still answers unknown api paths with JSON, not the page', async () => {
    const app = await build();
    const res = await app.inject({ method: 'GET', url: '/api/v1/nothing-here' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ error: { code: 'not_found' } });
  });
});
