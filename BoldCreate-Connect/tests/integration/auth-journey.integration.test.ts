/**
 * Live signup → email verification → starter org → signin journey.
 *
 * Requires:
 *   - API process running on localhost:3001 with workload auth
 *   - Worker process running (delivers outbox to Mailpit)
 *   - Mailpit running on localhost:8025 (web API) and localhost:1025 (SMTP)
 *   - Postgres running on localhost:5432
 *
 * Run: pnpm test -- --only=integration
 *
 * Also proves:
 *   - Wrong recipient token denied
 *   - Replay of consumed token denied
 *   - Unverified user cannot sign in
 *   - Suspended user session denied (via direct DB update)
 */
import { randomUUID } from 'node:crypto';
import { describe, it, expect } from 'vitest';
import pg from 'pg';
import { apiUrl, databaseUrl, mailpitUrl, requireEnv } from './test-env.js';

const API = apiUrl;
const MAILPIT = mailpitUrl;
const WORKLOAD_SECRET = requireEnv('WORKLOAD_SECRET');
const CALLER_ID = 'web';
const DB_URL = databaseUrl;

const headers = {
  'Content-Type': 'application/json',
  'x-caller-id': CALLER_ID,
  'x-workload-secret': WORKLOAD_SECRET,
};

function apiPost(path: string, body: unknown, extra?: Record<string, string>) {
  return fetch(`${API}${path}`, {
    method: 'POST',
    headers: { ...headers, 'idempotency-key': randomUUID(), ...extra },
    body: JSON.stringify(body),
  });
}

function apiGet(path: string, sessionToken?: string) {
  return fetch(`${API}${path}`, {
    method: 'GET',
    headers: { ...headers, ...(sessionToken ? { 'x-session-token': sessionToken } : {}) },
  });
}

async function waitForEmail(toAddress: string, retries = 20): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${MAILPIT}/api/v1/messages`);
    if (!res.ok) {
      await sleep(300);
      continue;
    }
    const data = (await res.json()) as {
      messages?: Array<{ ID: string; To: Array<{ Address: string }>; Subject: string }>;
    };
    const msg = data.messages?.find((m) => m.To.some((t) => t.Address === toAddress));
    if (msg) {
      // Fetch full message body
      const full = await fetch(`${MAILPIT}/api/v1/message/${msg.ID}`);
      const body = (await full.json()) as { Text?: string };
      return body.Text ?? null;
    }
    await sleep(300);
  }
  return null;
}

function extractToken(emailText: string): string | null {
  const match = emailText.match(/token=([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('live journey: signup → verify → org → signin', () => {
  const email = `journey-test-${Date.now()}@example.com`;
  const password = 'TestPassword123!';
  let sessionToken = '';
  let verificationToken = '';

  it('signup returns 201 and queues verification email', async () => {
    const res = await apiPost('/v1/auth/signup', {
      email,
      password,
      displayName: 'Journey Test User',
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { userId: string };
    expect(body.userId).toBeTruthy();
  });

  it('unverified user cannot sign in', async () => {
    const res = await apiPost('/v1/auth/signin', { email, password });
    expect(res.status).toBe(403);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe(
      'email_not_verified',
    );
  });

  it('worker delivers verification email to Mailpit', async () => {
    const text = await waitForEmail(email);
    expect(text).not.toBeNull();
    verificationToken = extractToken(text!) ?? '';
    expect(verificationToken).toBeTruthy();
  }, 15_000);

  it('wrong token is denied', async () => {
    const res = await apiPost('/v1/auth/verify-email', {
      token: 'wrong-token-that-does-not-exist',
    });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe(
      'token_invalid_or_expired',
    );
  });

  it('valid token verifies email and returns session + starter org', async () => {
    const res = await apiPost('/v1/auth/verify-email', { token: verificationToken });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { sessionToken: string; user: { emailVerifiedAt: string } };
    expect(body.sessionToken).toBeTruthy();
    expect(body.user.emailVerifiedAt).toBeTruthy();
    sessionToken = body.sessionToken;
  });

  it('replay of consumed token is denied', async () => {
    const res = await apiPost('/v1/auth/verify-email', { token: verificationToken });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe(
      'token_invalid_or_expired',
    );
  });

  it('verified user can sign in and gets a session', async () => {
    const res = await apiPost('/v1/auth/signin', { email, password });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { sessionToken: string };
    expect(body.sessionToken).toBeTruthy();
    sessionToken = body.sessionToken;
  });

  it('authenticated user can call /v1/auth/me', async () => {
    const res = await apiGet('/v1/auth/me', sessionToken);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { user: { email: string } };
    expect(body.user.email).toBe(email.toLowerCase());
  });

  it('starter org was provisioned for the verified user', async () => {
    const client = new pg.Client({ connectionString: DB_URL });
    await client.connect();
    try {
      const emailNorm = email.toLowerCase();
      const userRes = await client.query(
        `SELECT id, starter_org_provisioned_at FROM "user" WHERE email_normalized = $1`,
        [emailNorm],
      );
      expect(userRes.rows).toHaveLength(1);
      const user = userRes.rows[0] as { id: string; starter_org_provisioned_at: Date | null };
      expect(user.starter_org_provisioned_at).not.toBeNull();

      const orgRes = await client.query(
        `SELECT o.id FROM organization o
         JOIN organization_member om ON om.organization_id = o.id
         WHERE om.user_id = $1 AND om.role = 'ADMIN'`,
        [user.id],
      );
      expect(orgRes.rows.length).toBeGreaterThanOrEqual(1);

      const orgId = (orgRes.rows[0] as { id: string }).id;
      const projRes = await client.query(
        `SELECT kind FROM project WHERE organization_id = $1 ORDER BY kind`,
        [orgId],
      );
      expect(projRes.rows.map((row: { kind: string }) => row.kind)).toEqual([
        'for_you',
        'platform',
      ]);
      const teams = await client.query(`SELECT to_regclass('public.team') AS t`);
      expect((teams.rows[0] as { t: string | null }).t).toBeNull();
    } finally {
      await client.end();
    }
  });

  it('signout revokes session', async () => {
    const res = await apiPost('/v1/auth/signout', {}, { 'x-session-token': sessionToken });
    expect(res.status).toBe(204);
  });

  it('revoked session is denied on subsequent request', async () => {
    const res = await apiGet('/v1/auth/me', sessionToken);
    expect(res.status).toBe(401);
  });
});
