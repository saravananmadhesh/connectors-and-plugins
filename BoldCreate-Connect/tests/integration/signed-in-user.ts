/**
 * Creates a verified user through the live API: sign up, read the verification mail from
 * Mailpit, verify, then look up the starter organisation.
 */
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { apiUrl, databaseUrl, mailpitUrl, requireEnv } from './test-env.js';

export const workloadHeaders = {
  'Content-Type': 'application/json',
  'x-caller-id': 'web',
  'x-workload-secret': requireEnv('WORKLOAD_SECRET'),
};

/** The password every helper-created user signs up with. */
export const TEST_PASSWORD = 'TestPassword123!';

export interface SignedInUser {
  email: string;
  sessionToken: string;
  /** Wire ids. */
  orgId: string;
  /** Row uuids. */
  rawOrgId: string;
  rawUserId: string;
}

/** Waits for the verification mail of `email` in Mailpit and returns its token. */
export async function verificationToken(email: string): Promise<string> {
  for (let attempt = 0; attempt < 40; attempt++) {
    const list = await fetch(`${mailpitUrl}/api/v1/messages`);
    if (list.ok) {
      const data = (await list.json()) as {
        messages?: Array<{ ID: string; To: Array<{ Address: string }> }>;
      };
      const message = data.messages?.find((m) => m.To.some((t) => t.Address === email));
      if (message) {
        const full = await fetch(`${mailpitUrl}/api/v1/message/${message.ID}`);
        const body = (await full.json()) as { Text?: string };
        const token = /token=([a-zA-Z0-9_-]+)/.exec(body.Text ?? '')?.[1];
        if (token) return token;
      }
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Verification token not found in Mailpit');
}

/** Waits for a mail to `email` whose subject contains `subject` and returns the link token in it. */
export async function mailToken(email: string, subject: string): Promise<string> {
  for (let attempt = 0; attempt < 40; attempt++) {
    const list = await fetch(`${mailpitUrl}/api/v1/messages`);
    if (list.ok) {
      const data = (await list.json()) as {
        messages?: Array<{ ID: string; Subject: string; To: Array<{ Address: string }> }>;
      };
      const message = data.messages?.find(
        (m) => m.Subject.includes(subject) && m.To.some((t) => t.Address === email),
      );
      if (message) {
        const full = await fetch(`${mailpitUrl}/api/v1/message/${message.ID}`);
        const body = (await full.json()) as { Text?: string };
        const token = /token=([a-zA-Z0-9_-]+)/.exec(body.Text ?? '')?.[1];
        if (token) return token;
      }
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`No mail with subject "${subject}" for ${email}`);
}

/** Posts JSON to the api as the web backend, with an optional session token. */
export function apiPost(
  path: string,
  body: unknown,
  sessionToken?: string,
  extraHeaders: Record<string, string> = {},
): Promise<Response> {
  return fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: {
      ...workloadHeaders,
      'idempotency-key': randomUUID(),
      ...(sessionToken ? { 'x-session-token': sessionToken } : {}),
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

export function apiGet(path: string, sessionToken?: string): Promise<Response> {
  return fetch(`${apiUrl}${path}`, {
    headers: { ...workloadHeaders, ...(sessionToken ? { 'x-session-token': sessionToken } : {}) },
  });
}

/** Signs in through the api and returns the session token. */
export async function signInToken(email: string, password = TEST_PASSWORD): Promise<string> {
  const res = await apiPost('/v1/auth/signin', { email, password });
  if (res.status !== 200) throw new Error(`Sign-in failed: ${res.status}`);
  return ((await res.json()) as { sessionToken: string }).sessionToken;
}

/** Runs one query against the live database as the superuser. */
export async function sql<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    return (await client.query(text, params)).rows as T[];
  } finally {
    await client.end();
  }
}

/** Waits until the worker has created the organization's key, so secrets can be sealed. */
export async function waitForOrgKey(rawOrgId: string, timeoutMs = 20_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const rows = await sql<{ key_state: string }>(
      `SELECT key_state FROM organization WHERE id = $1`,
      [rawOrgId],
    );
    if (rows[0]?.key_state === 'ready') return;
    await new Promise<void>((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Organization ${rawOrgId} did not get a key in time`);
}

export async function createSignedInUser(label: string): Promise<SignedInUser> {
  const email = `${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  const signup = await fetch(`${apiUrl}/v1/auth/signup`, {
    method: 'POST',
    headers: { ...workloadHeaders, 'idempotency-key': randomUUID() },
    body: JSON.stringify({ email, password: TEST_PASSWORD, displayName: `${label} user` }),
  });
  if (signup.status !== 201) throw new Error(`Signup failed: ${signup.status}`);

  const token = await verificationToken(email);

  const verified = await fetch(`${apiUrl}/v1/auth/verify-email`, {
    method: 'POST',
    headers: workloadHeaders,
    body: JSON.stringify({ token }),
  });
  if (verified.status !== 200) throw new Error(`Verify failed: ${verified.status}`);
  const { sessionToken } = (await verified.json()) as { sessionToken: string };

  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    const user = await client.query(`SELECT id FROM "user" WHERE email_normalized = $1`, [
      email.toLowerCase(),
    ]);
    const rawUserId = (user.rows[0] as { id: string }).id;
    const org = await client.query(
      `SELECT o.id FROM organization o
       JOIN organization_member om ON om.organization_id = o.id
       WHERE om.user_id = $1 AND om.role = 'ADMIN'`,
      [rawUserId],
    );
    const rawOrgId = (org.rows[0] as { id: string }).id;
    await waitForOrgKey(rawOrgId);
    return {
      email,
      sessionToken,
      orgId: formatId('org', rawOrgId),
      rawOrgId,
      rawUserId,
    };
  } finally {
    await client.end();
  }
}

/**
 * Takes a database-wide lock for a suite that switches a shared feature flag, so two files that
 * both do so never run at the same time. Returns the release function.
 */
export async function holdFlagLock(name: string): Promise<() => Promise<void>> {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  await client.query(`SELECT pg_advisory_lock(hashtext($1))`, [name]);
  return async () => {
    await client.end();
  };
}
