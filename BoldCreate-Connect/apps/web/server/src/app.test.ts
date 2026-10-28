import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { buildTestWeb, cookieHeader, csrfHeaders, type TestWeb } from './test-support.js';

let web: TestWeb | undefined;
const dirs: string[] = [];
afterEach(async () => {
  await web?.server.close();
  web = undefined;
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

function clientDist(): string {
  const dir = mkdtempSync(join(tmpdir(), 'web-dist-'));
  dirs.push(dir);
  mkdirSync(join(dir, 'assets'));
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>app shell</title>');
  writeFileSync(join(dir, 'assets', 'app.js'), 'console.log(1)');
  writeFileSync(join(dir, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  return dir;
}

describe('CSRF', () => {
  it('issues a token and a host-bound cookie', async () => {
    web = await buildTestWeb();
    const res = await web.server.app.inject({ method: 'GET', url: '/api/csrf' });
    expect(res.statusCode).toBe(200);
    expect((res.json() as { csrfToken: string }).csrfToken.length).toBeGreaterThan(10);
    expect(res.headers['cache-control']).toBe('no-store');
    const cookie = ([] as string[]).concat(res.headers['set-cookie'] ?? [])[0] ?? '';
    expect(cookie).toMatch(/^__Host-csrf=/);
    expect(cookie).toMatch(/HttpOnly/);
    expect(cookie).toMatch(/Secure/);
    expect(cookie).toMatch(/SameSite=Strict/);
    expect(cookie).toMatch(/Path=\//);
  });

  it('refuses a write without a token, with a wrong token and without the cookie', async () => {
    web = await buildTestWeb();
    const good = await csrfHeaders(web);
    const payload = { email: 'a@example.com' };
    const none = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      payload,
    });
    expect(none.statusCode).toBe(403);
    expect(none.json()).toMatchObject({ error: { code: 'forbidden' } });
    const wrong = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      headers: { ...good, 'x-csrf-token': 'not-the-token' },
      payload,
    });
    expect(wrong.statusCode).toBe(403);
    const noCookie = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      headers: { 'x-csrf-token': good['x-csrf-token'] as string },
      payload,
    });
    expect(noCookie.statusCode).toBe(403);
    expect(web.calls).toHaveLength(0);
  });

  it('lets a write with a valid token through', async () => {
    web = await buildTestWeb();
    web.reply({ status: 202, body: {} });
    const res = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      headers: await csrfHeaders(web),
      payload: { email: 'a@example.com' },
    });
    expect(res.statusCode).toBe(202);
    expect(web.calls).toHaveLength(1);
  });

  it('does not ask reads for a token', async () => {
    web = await buildTestWeb();
    web.reply({ status: 200, body: { items: [], total: 0, page: 1, pageSize: 24 } });
    const res = await web.server.app.inject({
      method: 'GET',
      url: '/api/v1/plugins',
      headers: { cookie: '__Host-sid=t' },
    });
    expect(res.statusCode).toBe(200);
  });
});

describe('origin and host', () => {
  it('refuses a write from another origin and accepts the app origin', async () => {
    web = await buildTestWeb();
    web.reply({ status: 202, body: {} });
    const headers = await csrfHeaders(web);
    const evil = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      headers: { ...headers, origin: 'https://evil.example' },
      payload: { email: 'a@example.com' },
    });
    expect(evil.statusCode).toBe(403);
    const own = await web.server.app.inject({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      headers: { ...headers, origin: 'http://localhost:3000' },
      payload: { email: 'a@example.com' },
    });
    expect(own.statusCode).toBe(202);
  });

  it('refuses a host that is not allowed', async () => {
    web = await buildTestWeb({ ALLOWED_HOSTS: 'app.example.com' });
    const bad = await web.server.app.inject({
      method: 'GET',
      url: '/api/csrf',
      headers: { host: 'other.example.com' },
    });
    expect(bad.statusCode).toBe(403);
    const good = await web.server.app.inject({
      method: 'GET',
      url: '/api/csrf',
      headers: { host: 'app.example.com' },
    });
    expect(good.statusCode).toBe(200);
  });
});

describe('single-page app', () => {
  it('serves the shell for app paths and files for assets', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: clientDist() });
    for (const url of ['/', '/marketplace', '/orgs/abc/members']) {
      const res = await web.server.app.inject({ method: 'GET', url });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('text/html');
      expect(res.body).toContain('app shell');
    }
    const asset = await web.server.app.inject({ method: 'GET', url: '/assets/app.js' });
    expect(asset.statusCode).toBe(200);
    expect(asset.body).toBe('console.log(1)');
    const icon = await web.server.app.inject({ method: 'GET', url: '/favicon.svg' });
    expect(icon.statusCode).toBe(200);
  });

  it('answers a missing script with 404, never the shell as a wrong content type', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: clientDist() });
    for (const url of ['/assets/index-old.js', '/assets/old.css?v=1', '/missing.js']) {
      const res = await web.server.app.inject({ method: 'GET', url });
      expect(res.statusCode).toBe(404);
      expect(res.headers['content-type']).not.toContain('text/html');
    }
    const shell = await web.server.app.inject({ method: 'GET', url: '/installed?tab=mcp' });
    expect(shell.statusCode).toBe(200);
    expect(shell.headers['content-type']).toContain('text/html');
  });

  it('serves files built after the server started, with their own content type', async () => {
    const dist = clientDist();
    web = await buildTestWeb({ CLIENT_DIST_DIR: dist });
    writeFileSync(join(dist, 'assets', 'index-new.css'), 'body{}');
    const css = await web.server.app.inject({ method: 'GET', url: '/assets/index-new.css?v=1' });
    expect(css.statusCode).toBe(200);
    expect(css.headers['content-type']).toContain('text/css');
    expect(css.body).toBe('body{}');
    const outside = await web.server.app.inject({
      method: 'GET',
      url: '/assets/..%2f..%2fsecret.js',
    });
    expect(outside.statusCode).toBe(404);
  });

  it('answers unknown /api paths with JSON 404, never the shell', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: clientDist() });
    for (const url of ['/api/unknown', '/api', '/api/v1/nothing/here']) {
      const res = await web.server.app.inject({ method: 'GET', url });
      expect(res.statusCode).toBe(404);
      expect(res.headers['content-type']).toContain('application/json');
      expect(res.json()).toMatchObject({ error: { code: 'not_found' } });
    }
    const post = await web.server.app.inject({ method: 'POST', url: '/api/unknown' });
    expect(post.statusCode).toBe(404);
    expect(post.json()).toMatchObject({ error: { code: 'not_found' } });
  });

  it('sends a content security policy and no framing', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: clientDist() });
    const res = await web.server.app.inject({ method: 'GET', url: '/' });
    expect(res.headers['content-security-policy']).toContain("default-src 'self'");
    expect(res.headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(res.headers['x-frame-options']).toBe('DENY');
  });

  it('serves only the api routes when the client was not built', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: join(tmpdir(), 'does-not-exist-web') });
    const res = await web.server.app.inject({ method: 'GET', url: '/' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ error: { code: 'not_found' } });
  });
});

describe('probes', () => {
  it('serves health and metrics', async () => {
    web = await buildTestWeb();
    expect((await web.server.app.inject({ method: 'GET', url: '/healthz' })).statusCode).toBe(200);
    const metrics = await web.server.app.inject({ method: 'GET', url: '/metrics' });
    expect(metrics.body).toContain('boldcreate_web_http_requests_total');
    expect(cookieHeader(metrics.headers['set-cookie'])).toBe('');
  });
});
