/**
 * Project users (kind `external`) never reach a login credential, a verification or
 * reset flow, a session-based account action, or a self-service deletion, even when they hold a
 * verified address, a password identity or a hand-made token. The addresses reserved for them
 * cannot be claimed by a person.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { apiUrl } from './test-env.js';
import {
  TEST_PASSWORD,
  apiPost,
  createSignedInUser,
  sql,
  workloadHeaders,
} from './signed-in-user.js';
import { generateEmailToken } from '../../packages/domain/src/identity/email-token.js';
import { generateSessionToken } from '../../packages/domain/src/identity/session.js';

interface Seeded {
  id: string;
  email: string;
  sessionToken: string;
}

let secretHash = '';

async function code(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

let projectId = '';

async function seedProject(): Promise<string> {
  const owner = await createSignedInUser('guards-owner');
  const id = randomUUID();
  await sql(`INSERT INTO project (id, organization_id, name, created_by) VALUES ($1, $2, $3, $4)`, [
    id,
    owner.rawOrgId,
    `Guards ${id.slice(0, 8)}`,
    owner.rawUserId,
  ]);
  return id;
}

/** A project user that a person could sign in as if the guards were missing. */
async function seedProjectUser(options: { verified: boolean }): Promise<Seeded> {
  const id = randomUUID();
  const email = `${id.replaceAll('-', '')}@project.invalid`;
  await sql(
    `INSERT INTO "user" (id, email, email_normalized, display_name, kind, project_id, external_ref,
                         email_verified_at)
     VALUES ($1, $2, $2, 'Project user', 'external', $3, $4, $5)`,
    [id, email, projectId, `host-${id.slice(0, 8)}`, options.verified ? new Date() : null],
  );
  await sql(
    `INSERT INTO auth_identity (user_id, provider, subject, secret_hash) VALUES ($1, 'password', $2, $3)`,
    [id, email, secretHash],
  );
  const session = generateSessionToken();
  await sql(
    `INSERT INTO session (id, token_hash, user_id, idle_expires_at, absolute_expires_at)
     VALUES ($1, $2, $3, now() + interval '1 hour', now() + interval '2 hours')`,
    [randomUUID(), session.hash, id],
  );
  return { id, email, sessionToken: session.raw };
}

async function seedToken(
  userId: string,
  purpose: 'verification' | 'reset' | 'email_change',
  targetEmail?: string,
): Promise<string> {
  const token = generateEmailToken(3600);
  await sql(
    `INSERT INTO email_token (id, purpose, token_hash, target_user_id, target_email_normalized, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [randomUUID(), purpose, token.hash, userId, targetEmail ?? null, token.expiresAt],
  );
  return token.raw;
}

async function tokenCount(userId: string): Promise<number> {
  const [row] = await sql<{ n: number }>(
    `SELECT count(*)::int AS n FROM email_token WHERE target_user_id = $1`,
    [userId],
  );
  return row!.n;
}

async function sessionCount(userId: string): Promise<number> {
  const [row] = await sql<{ n: number }>(
    `SELECT count(*)::int AS n FROM session WHERE user_id = $1`,
    [userId],
  );
  return row!.n;
}

beforeAll(async () => {
  projectId = await seedProject();
  const donor = await createSignedInUser('guards-donor');
  const [row] = await sql<{ secret_hash: string }>(
    `SELECT secret_hash FROM auth_identity WHERE user_id = $1`,
    [donor.rawUserId],
  );
  secretHash = row!.secret_hash;
}, 120_000);

describe('a project user', () => {
  it('cannot sign in, even with a password identity and a verified address', async () => {
    const user = await seedProjectUser({ verified: true });
    const before = await sessionCount(user.id);
    const res = await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD });
    expect(res.status).toBe(401);
    expect(await code(res)).toBe('invalid_credentials');
    expect(await sessionCount(user.id)).toBe(before);
  });

  it('gets no reset mail and no token from forgot-password', async () => {
    const user = await seedProjectUser({ verified: true });
    const res = await apiPost('/v1/auth/forgot-password', { email: user.email });
    expect(res.ok).toBe(true);
    expect(await tokenCount(user.id)).toBe(0);
  });

  it('gets no token from resend-verification', async () => {
    const user = await seedProjectUser({ verified: false });
    const res = await apiPost('/v1/auth/resend-verification', { email: user.email });
    expect(res.ok).toBe(true);
    expect(await tokenCount(user.id)).toBe(0);
  });

  it('cannot use a hand-made reset token: the token is not spent and no credential changes', async () => {
    const user = await seedProjectUser({ verified: true });
    const token = await seedToken(user.id, 'reset');
    const res = await apiPost('/v1/auth/reset-password', {
      token,
      newPassword: 'AnotherPassword456!',
    });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(await code(res)).toBe('token_invalid_or_expired');
    const [row] = await sql<{ secret_hash: string; consumed: boolean }>(
      `SELECT i.secret_hash, (t.consumed_at IS NOT NULL) AS consumed
         FROM auth_identity i, email_token t WHERE i.user_id = $1 AND t.target_user_id = $1`,
      [user.id],
    );
    expect(row?.secret_hash).toBe(secretHash);
    expect(row?.consumed).toBe(false);
  });

  it('cannot use a hand-made verification token: no starter org and no session', async () => {
    const user = await seedProjectUser({ verified: false });
    const token = await seedToken(user.id, 'verification');
    const before = await sessionCount(user.id);
    const res = await apiPost('/v1/auth/verify-email', { token });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(await sessionCount(user.id)).toBe(before);
    const [row] = await sql<{ provisioned: boolean; verified: boolean }>(
      `SELECT (starter_org_provisioned_at IS NOT NULL) AS provisioned,
              (email_verified_at IS NOT NULL) AS verified FROM "user" WHERE id = $1`,
      [user.id],
    );
    expect(row).toEqual({ provisioned: false, verified: false });
  });

  it('cannot change its password, change its email or delete its account with a session', async () => {
    const user = await seedProjectUser({ verified: true });
    const password = await apiPost(
      '/v1/auth/change-password',
      { currentPassword: TEST_PASSWORD, newPassword: 'AnotherPassword456!' },
      user.sessionToken,
    );
    expect(password.status).toBe(401);
    const email = await apiPost(
      '/v1/auth/change-email',
      { currentPassword: TEST_PASSWORD, newEmail: `${randomUUID()}@example.com` },
      user.sessionToken,
    );
    expect(email.status).toBe(401);
    const removal = await fetch(
      `${apiUrl}/v1/auth/me?confirmEmail=${encodeURIComponent(user.email)}`,
      {
        method: 'DELETE',
        headers: {
          'x-caller-id': workloadHeaders['x-caller-id'],
          'x-workload-secret': workloadHeaders['x-workload-secret'],
          'x-session-token': user.sessionToken,
        },
      },
    );
    expect(removal.status).toBe(401);
    const [row] = await sql<{ status: string; secret_hash: string }>(
      `SELECT u.status, i.secret_hash FROM "user" u JOIN auth_identity i ON i.user_id = u.id WHERE u.id = $1`,
      [user.id],
    );
    expect(row).toEqual({ status: 'active', secret_hash: secretHash });
  });

  it('cannot confirm a hand-made email change', async () => {
    const user = await seedProjectUser({ verified: true });
    const token = await seedToken(user.id, 'email_change', `${randomUUID()}@example.com`);
    const res = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(res.status).toBe(404);
    const [row] = await sql<{ email: string }>(`SELECT email FROM "user" WHERE id = $1`, [user.id]);
    expect(row?.email).toBe(user.email);
  });

  it('keeps its id out of a sign-up that names its address', async () => {
    const user = await seedProjectUser({ verified: true });
    const res = await apiPost('/v1/auth/signup', {
      email: user.email,
      password: 'AnotherPassword456!',
      displayName: 'Squatter',
    });
    expect(res.ok).toBe(true);
    const body = (await res.json()) as { userId: string };
    expect(JSON.stringify(body)).not.toContain(user.id.replaceAll('-', ''));
    const [row] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM "user" WHERE email_normalized = $1`,
      [user.email],
    );
    expect(row?.n).toBe(1);
  });
});

describe('reserved addresses', () => {
  it('cannot be signed up: the answer looks like any other and nothing is stored', async () => {
    const email = `${randomUUID().replaceAll('-', '')}@project.invalid`;
    const res = await apiPost('/v1/auth/signup', {
      email,
      password: 'AnotherPassword456!',
      displayName: 'Reserved',
    });
    expect(res.ok).toBe(true);
    const rows = await sql(`SELECT id FROM "user" WHERE email_normalized = $1`, [email]);
    expect(rows).toHaveLength(0);
    const identities = await sql(`SELECT 1 FROM auth_identity WHERE subject = $1`, [email]);
    expect(identities).toHaveLength(0);
  });

  it('cannot be the target of an email change: the answer looks like any other and no token exists', async () => {
    const user = await createSignedInUser('guards-reserved');
    const target = `${randomUUID().replaceAll('-', '')}@project.invalid`;
    const res = await apiPost(
      '/v1/auth/change-email',
      { currentPassword: TEST_PASSWORD, newEmail: target },
      user.sessionToken,
    );
    expect(res.ok).toBe(true);
    const rows = await sql(`SELECT 1 FROM email_token WHERE target_email_normalized = $1`, [
      target,
    ]);
    expect(rows).toHaveLength(0);
  });

  it('cannot be confirmed from a hand-made token', async () => {
    const user = await createSignedInUser('guards-reserved-confirm');
    const target = `${randomUUID().replaceAll('-', '')}@project.invalid`;
    const token = await seedToken(user.rawUserId, 'email_change', target);
    const res = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(res.status).toBeGreaterThanOrEqual(400);
    const [row] = await sql<{ email: string }>(`SELECT email FROM "user" WHERE id = $1`, [
      user.rawUserId,
    ]);
    expect(row?.email).toBe(user.email.toLowerCase());
  });
});

describe('people', () => {
  it('still sign in, reset and verify as before', async () => {
    const user = await createSignedInUser('guards-human');
    const signin = await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD });
    expect(signin.status).toBe(200);
    const forgot = await apiPost('/v1/auth/forgot-password', { email: user.email });
    expect(forgot.ok).toBe(true);
    const [row] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM email_token WHERE target_user_id = $1 AND purpose = 'reset'`,
      [user.rawUserId],
    );
    expect(row?.n).toBe(1);
  });
});
