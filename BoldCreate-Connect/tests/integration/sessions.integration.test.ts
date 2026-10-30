/**
 * Sessions, password change and reset, lockout and sign-in audit against the live api.
 */
import { describe, expect, it } from 'vitest';
import {
  TEST_PASSWORD,
  apiGet,
  apiPost,
  createSignedInUser,
  mailToken,
  signInToken,
  sql,
  type SignedInUser,
} from './signed-in-user.js';

const NEW_PASSWORD = 'AnotherPassword456!';

async function me(token: string): Promise<number> {
  return (await apiGet('/v1/auth/me', token)).status;
}

async function sessionRow(userId: string, tokenIndex = 0) {
  const rows = await sql<{ id: string; idle_expires_at: Date; absolute_expires_at: Date }>(
    `SELECT id, idle_expires_at, absolute_expires_at FROM session
     WHERE user_id = $1 ORDER BY created_at LIMIT 1 OFFSET $2`,
    [userId, tokenIndex],
  );
  return rows[0]!;
}

async function auditRows(userId: string, action: string) {
  return sql<{
    result: string;
    target_id: string | null;
    actor_id: string;
    context: string | null;
  }>(
    `SELECT result, target_id, actor_id, context FROM audit_log WHERE actor_id = $1 AND action = $2`,
    [userId, action],
  );
}

describe('session lifetime', () => {
  it('rejects a session whose idle expiry has passed and revokes it', async () => {
    const user = await createSignedInUser('idle-expiry');
    expect(await me(user.sessionToken)).toBe(200);
    await sql(
      `UPDATE session SET idle_expires_at = now() - interval '1 second' WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(await me(user.sessionToken)).toBe(401);
    const rows = await sql<{ revoked_at: Date | null }>(
      `SELECT revoked_at FROM session WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(rows[0]!.revoked_at).not.toBeNull();
  });

  it('rejects an active session once its absolute expiry has passed', async () => {
    const user = await createSignedInUser('absolute-expiry');
    await sql(
      `UPDATE session SET absolute_expires_at = now() - interval '1 second',
         idle_expires_at = now() + interval '20 minutes' WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(await me(user.sessionToken)).toBe(401);
  });

  it('slides the idle expiry only after the minimum interval and never past the absolute expiry', async () => {
    const user = await createSignedInUser('slide');
    await sql(
      `UPDATE session SET idle_expires_at = now() + interval '100 seconds' WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(await me(user.sessionToken)).toBe(200);
    const first = await sessionRow(user.rawUserId);
    expect(first.idle_expires_at.getTime() - Date.now()).toBeGreaterThan(1_700_000);

    expect(await me(user.sessionToken)).toBe(200);
    const second = await sessionRow(user.rawUserId);
    expect(second.idle_expires_at.getTime()).toBe(first.idle_expires_at.getTime());

    await sql(
      `UPDATE session SET idle_expires_at = now() + interval '100 seconds',
         absolute_expires_at = now() + interval '5 minutes' WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(await me(user.sessionToken)).toBe(200);
    const capped = await sessionRow(user.rawUserId);
    expect(capped.idle_expires_at.getTime()).toBe(capped.absolute_expires_at.getTime());
  });
});

describe('sign-out and concurrent sign-in', () => {
  it('rejects a replayed token after sign-out', async () => {
    const user = await createSignedInUser('signout');
    const token = await signInToken(user.email);
    expect(await me(token)).toBe(200);
    expect((await apiPost('/v1/auth/signout', {}, token)).status).toBe(204);
    expect(await me(token)).toBe(401);
    // The other session of the user is untouched.
    expect(await me(user.sessionToken)).toBe(200);
  });

  it('creates two sessions for two concurrent sign-ins', async () => {
    const user = await createSignedInUser('concurrent-signin');
    const [a, b] = await Promise.all([signInToken(user.email), signInToken(user.email)]);
    expect(a).not.toBe(b);
    expect(await me(a)).toBe(200);
    expect(await me(b)).toBe(200);
    const rows = await sql<{ count: string }>(
      `SELECT count(*) FROM session WHERE user_id = $1 AND revoked_at IS NULL`,
      [user.rawUserId],
    );
    expect(Number(rows[0]!.count)).toBe(3);
  });
});

describe('password change and reset', () => {
  async function threeSessions(label: string): Promise<{ user: SignedInUser; tokens: string[] }> {
    const user = await createSignedInUser(label);
    const tokens = [
      user.sessionToken,
      await signInToken(user.email),
      await signInToken(user.email),
    ];
    for (const token of tokens) expect(await me(token)).toBe(200);
    return { user, tokens };
  }

  it('revokes every session after a password change, the calling one included', async () => {
    const { user, tokens } = await threeSessions('password-change');
    const res = await apiPost(
      '/v1/auth/change-password',
      { currentPassword: TEST_PASSWORD, newPassword: NEW_PASSWORD },
      tokens[1],
    );
    expect(res.status).toBe(204);
    for (const token of tokens) expect(await me(token)).toBe(401);
    // The old password no longer works, the new one does.
    expect(
      (await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD })).status,
    ).toBe(401);
    expect(await me(await signInToken(user.email, NEW_PASSWORD))).toBe(200);

    expect((await auditRows(user.rawUserId, 'user.password_changed')).length).toBe(1);
    expect((await auditRows(user.rawUserId, 'user.sessions_revoked')).length).toBe(1);
  });

  it('refuses a wrong current password and a weak new one without touching sessions', async () => {
    const user = await createSignedInUser('password-change-refused');
    const wrong = await apiPost(
      '/v1/auth/change-password',
      { currentPassword: 'not-the-password', newPassword: NEW_PASSWORD },
      user.sessionToken,
    );
    expect(wrong.status).toBe(401);
    expect(((await wrong.json()) as { error: { code: string } }).error.code).toBe(
      'invalid_credentials',
    );
    const weak = await apiPost(
      '/v1/auth/change-password',
      { currentPassword: TEST_PASSWORD, newPassword: 'short' },
      user.sessionToken,
    );
    expect(weak.status).toBe(422);
    expect(((await weak.json()) as { error: { code: string } }).error.code).toBe(
      'password_policy_violation',
    );
    expect(await me(user.sessionToken)).toBe(200);
  });

  it('revokes every session after a password reset and clears the lockout', async () => {
    const { user, tokens } = await threeSessions('password-reset');
    await sql(`UPDATE "user" SET failed_login_count = 7 WHERE id = $1`, [user.rawUserId]);
    expect((await apiPost('/v1/auth/forgot-password', { email: user.email })).status).toBe(202);
    const token = await mailToken(user.email, 'Reset your password');
    const res = await apiPost('/v1/auth/reset-password', { token, newPassword: NEW_PASSWORD });
    expect(res.status).toBe(204);
    for (const session of tokens) expect(await me(session)).toBe(401);
    const rows = await sql<{ failed_login_count: number; locked_until: Date | null }>(
      `SELECT failed_login_count, locked_until FROM "user" WHERE id = $1`,
      [user.rawUserId],
    );
    expect(rows[0]).toMatchObject({ failed_login_count: 0, locked_until: null });
    expect(await me(await signInToken(user.email, NEW_PASSWORD))).toBe(200);

    // The link is single use.
    const again = await apiPost('/v1/auth/reset-password', { token, newPassword: NEW_PASSWORD });
    expect(again.status).toBe(400);
    expect(((await again.json()) as { error: { code: string } }).error.code).toBe(
      'token_invalid_or_expired',
    );
  });

  it('does not spend the reset link on a weak password', async () => {
    const user = await createSignedInUser('password-reset-weak');
    await apiPost('/v1/auth/forgot-password', { email: user.email });
    const token = await mailToken(user.email, 'Reset your password');
    const weak = await apiPost('/v1/auth/reset-password', { token, newPassword: 'password' });
    expect(weak.status).toBe(422);
    const ok = await apiPost('/v1/auth/reset-password', { token, newPassword: NEW_PASSWORD });
    expect(ok.status).toBe(204);
  });
});

describe('account lockout', () => {
  it('counts concurrent wrong passwords without losing one and locks the account at the 10th', async () => {
    const user = await createSignedInUser('lockout');
    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        apiPost('/v1/auth/signin', { email: user.email, password: 'wrong-password-123' }),
      ),
    );
    for (const res of results) expect(res.status).toBe(401);
    const rows = await sql<{ failed_login_count: number; locked_until: Date | null }>(
      `SELECT failed_login_count, locked_until FROM "user" WHERE id = $1`,
      [user.rawUserId],
    );
    // A request that reads the user after the 10th failure sees the lock and is refused without
    // counting, so how many of the 20 count depends on timing: at least the 10 that lock the
    // account, never more than were sent.
    expect(rows[0]!.failed_login_count).toBeGreaterThanOrEqual(10);
    expect(rows[0]!.failed_login_count).toBeLessThanOrEqual(20);
    expect(rows[0]!.locked_until).not.toBeNull();
    const lockedFor = rows[0]!.locked_until!.getTime() - Date.now();
    expect(lockedFor).toBeGreaterThan(800_000);
    expect(lockedFor).toBeLessThanOrEqual(900_000);

    // Locked: even the right password answers like a wrong one.
    const locked = await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD });
    expect(locked.status).toBe(401);
    expect(((await locked.json()) as { error: { code: string } }).error.code).toBe(
      'invalid_credentials',
    );
  }, 60_000);

  it('signs in again once the lock has passed and resets the counter', async () => {
    const user = await createSignedInUser('lockout-expired');
    await sql(
      `UPDATE "user" SET failed_login_count = 10, locked_until = now() - interval '1 second' WHERE id = $1`,
      [user.rawUserId],
    );
    expect(await me(await signInToken(user.email))).toBe(200);
    const rows = await sql<{ failed_login_count: number }>(
      `SELECT failed_login_count FROM "user" WHERE id = $1`,
      [user.rawUserId],
    );
    expect(rows[0]!.failed_login_count).toBe(0);
  });
});

describe('sign-in audit', () => {
  it('writes exactly one row for a sign-in, a failed sign-in and a sign-out', async () => {
    const user = await createSignedInUser('audit');
    const token = await signInToken(user.email);
    expect((await auditRows(user.rawUserId, 'user.signed_in')).length).toBe(1);

    const failed = await apiPost('/v1/auth/signin', {
      email: user.email,
      password: 'wrong-password-123',
    });
    expect(failed.status).toBe(401);
    const failures = await auditRows(user.rawUserId, 'user.sign_in_failed');
    expect(failures.length).toBe(1);
    expect(failures[0]).toMatchObject({ result: 'failure', target_id: user.rawUserId });

    await apiPost('/v1/auth/signout', {}, token);
    expect((await auditRows(user.rawUserId, 'user.signed_out')).length).toBe(1);
    // A second sign-out of the same token revokes nothing and writes nothing.
    await apiPost('/v1/auth/signout', {}, token);
    expect((await auditRows(user.rawUserId, 'user.signed_out')).length).toBe(1);
  });

  it('records an unknown address by hash prefix only, without a target', async () => {
    const email = `nobody-${Date.now()}@example.com`;
    const res = await apiPost('/v1/auth/signin', { email, password: 'wrong-password-123' });
    expect(res.status).toBe(401);
    const rows = await sql<{ target_id: string | null; context: string | null; actor_id: string }>(
      `SELECT target_id, context, actor_id FROM audit_log
       WHERE action = 'user.sign_in_failed' AND target_id IS NULL ORDER BY created_at DESC LIMIT 5`,
    );
    const mine = rows.find((row) => row.context?.includes('emailDigest'));
    expect(mine).toBeDefined();
    expect(mine!.actor_id).toBe('anonymous');
    for (const row of rows) expect(row.context ?? '').not.toContain(email);
  });
});
