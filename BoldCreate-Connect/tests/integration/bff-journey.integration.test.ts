/**
 * The web backend against the live stack: sign up, verify, sign in, read, sign out, with the
 * session in a host-bound cookie and CSRF enforced on every write.
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { webUrl } from './test-env.js';
import { verificationToken } from './signed-in-user.js';

/** A tiny cookie jar: name to value, filled from `set-cookie` headers. */
class Jar {
  readonly cookies = new Map<string, string>();

  absorb(response: Response): void {
    for (const line of response.headers.getSetCookie()) {
      const [pair] = line.split(';');
      const index = pair!.indexOf('=');
      const name = pair!.slice(0, index);
      const value = pair!.slice(index + 1);
      if (value === '') this.cookies.delete(name);
      else this.cookies.set(name, value);
    }
  }

  header(): string {
    return [...this.cookies].map(([name, value]) => `${name}=${value}`).join('; ');
  }
}

const jar = new Jar();
let csrfToken = '';

async function send(
  method: string,
  path: string,
  options: { body?: unknown; csrf?: boolean; cookie?: string } = {},
) {
  const headers: Record<string, string> = { cookie: options.cookie ?? jar.header() };
  if (options.body !== undefined) headers['content-type'] = 'application/json';
  if (options.csrf !== false && method !== 'GET') headers['x-csrf-token'] = csrfToken;
  if (method === 'POST') headers['idempotency-key'] = randomUUID();
  const response = await fetch(`${webUrl}${path}`, {
    method,
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });
  if (options.cookie === undefined) jar.absorb(response);
  return response;
}

const email = `bff-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
const password = 'TestPassword123!';

describe('web backend journey', () => {
  it('issues a CSRF token with a host-bound cookie', async () => {
    const res = await send('GET', '/api/csrf');
    expect(res.status).toBe(200);
    csrfToken = ((await res.json()) as { csrfToken: string }).csrfToken;
    expect(csrfToken.length).toBeGreaterThan(10);
    const cookie = res.headers.getSetCookie().find((line) => line.startsWith('__Host-csrf='));
    expect(cookie).toMatch(/HttpOnly/);
    expect(cookie).toMatch(/Secure/);
    expect(cookie).toMatch(/SameSite=Strict/);
  });

  it('refuses a write without the CSRF token', async () => {
    const res = await send('POST', '/api/v1/auth/signup', {
      csrf: false,
      body: { email, password, displayName: 'Bff User' },
    });
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ error: { code: 'forbidden' } });
  });

  it('refuses an invalid body before it reaches the api', async () => {
    const res = await send('POST', '/api/v1/auth/signup', {
      body: { email: 'not-an-email', password: 'short', displayName: '' },
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: { code: 'validation_failed' } });
  });

  it('signs up and verifies through the web backend, which sets the session cookie', async () => {
    const signup = await send('POST', '/api/v1/auth/signup', {
      body: { email, password, displayName: 'Bff User' },
    });
    expect(signup.status).toBe(201);
    const token = await verificationToken(email);
    const verify = await send('POST', '/api/v1/auth/verify-email', { body: { token } });
    expect(verify.status).toBe(200);
    const body = (await verify.json()) as Record<string, unknown>;
    expect(body).toHaveProperty('user');
    expect(body).not.toHaveProperty('sessionToken');
    expect(jar.cookies.has('__Host-sid')).toBe(true);
  });

  it('signs in and sets __Host-sid with the required attributes and no Domain', async () => {
    jar.cookies.delete('__Host-sid');
    const res = await send('POST', '/api/v1/auth/signin', { body: { email, password } });
    expect(res.status).toBe(200);
    expect(await res.json()).not.toHaveProperty('sessionToken');
    const line = res.headers.getSetCookie().find((entry) => entry.startsWith('__Host-sid='));
    expect(line).toBeDefined();
    expect(line).toMatch(/;\s*Secure/);
    expect(line).toMatch(/;\s*HttpOnly/);
    expect(line).toMatch(/;\s*SameSite=Strict/);
    expect(line).toMatch(/;\s*Path=\//);
    expect(line).not.toMatch(/Domain=/i);
  });

  it('reads the current user with the cookie, and not without it', async () => {
    const me = await send('GET', '/api/v1/auth/me');
    expect(me.status).toBe(200);
    expect(await me.json()).toMatchObject({ user: { email } });
    const anonymous = await send('GET', '/api/v1/auth/me', { cookie: '' });
    expect(anonymous.status).toBe(401);
  });

  it('refuses a session write without the CSRF token', async () => {
    const res = await send('POST', '/api/v1/auth/signout', { csrf: false });
    expect(res.status).toBe(403);
    expect((await send('GET', '/api/v1/auth/me')).status).toBe(200);
  });

  it('answers unknown /api paths with JSON 404', async () => {
    const res = await send('GET', '/api/v1/nothing-here');
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toContain('application/json');
  });

  it('signs out, clears the cookie and ends the session', async () => {
    const oldCookie = jar.header();
    const res = await send('POST', '/api/v1/auth/signout');
    expect(res.status).toBe(204);
    expect(jar.cookies.has('__Host-sid')).toBe(false);
    const after = await send('GET', '/api/v1/auth/me', { cookie: oldCookie });
    expect(after.status).toBe(401);
  });
});
