/**
 * Email change against the live api: request, confirm, and every refusal path.
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
} from './signed-in-user.js';
import { mailpitUrl } from './test-env.js';

const SUBJECT = 'Confirm your new email address';

function newAddress(label: string): string {
  return `${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
}

async function mailCount(address: string): Promise<number> {
  const res = await fetch(`${mailpitUrl}/api/v1/messages`);
  const data = (await res.json()) as { messages?: Array<{ To: Array<{ Address: string }> }> };
  return (data.messages ?? []).filter((m) => m.To.some((t) => t.Address === address)).length;
}

async function errorCode(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

describe('email change', () => {
  it('changes the address, the identity subject and revokes every session', async () => {
    const user = await createSignedInUser('email-change');
    const other = await signInToken(user.email);
    const next = newAddress('changed');

    const requested = await apiPost(
      '/v1/auth/change-email',
      { newEmail: next, currentPassword: TEST_PASSWORD },
      user.sessionToken,
    );
    expect(requested.status).toBe(202);

    // The old address keeps working until the link is used.
    expect(
      (await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD })).status,
    ).toBe(200);

    const token = await mailToken(next, SUBJECT);
    // Mail goes to the new address only.
    expect(await mailCount(user.email)).toBeLessThanOrEqual(1);
    const confirmed = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(confirmed.status).toBe(204);

    const rows = await sql<{ email: string; email_normalized: string; subject: string }>(
      `SELECT u.email, u.email_normalized, i.subject FROM "user" u
       JOIN auth_identity i ON i.user_id = u.id AND i.provider = 'password' WHERE u.id = $1`,
      [user.rawUserId],
    );
    expect(rows[0]).toEqual({ email: next, email_normalized: next, subject: next });

    for (const session of [user.sessionToken, other]) {
      expect((await apiGet('/v1/auth/me', session)).status).toBe(401);
    }
    expect(
      (await apiPost('/v1/auth/signin', { email: user.email, password: TEST_PASSWORD })).status,
    ).toBe(401);
    expect(await signInToken(next)).toBeTruthy();

    const audit = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE actor_id = $1 AND action = 'user.email_changed'`,
      [user.rawUserId],
    );
    expect(audit.length).toBe(1);
    expect(audit[0]!.context).not.toContain(user.email);
  });

  it('refuses a reused link', async () => {
    const user = await createSignedInUser('email-change-reuse');
    const next = newAddress('reuse');
    await apiPost(
      '/v1/auth/change-email',
      { newEmail: next, currentPassword: TEST_PASSWORD },
      user.sessionToken,
    );
    const token = await mailToken(next, SUBJECT);
    expect((await apiPost('/v1/auth/confirm-email-change', { token })).status).toBe(204);
    const again = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(again.status).toBe(400);
    expect(await errorCode(again)).toBe('token_invalid_or_expired');
  });

  it('refuses an expired link', async () => {
    const user = await createSignedInUser('email-change-expired');
    const next = newAddress('expired');
    await apiPost(
      '/v1/auth/change-email',
      { newEmail: next, currentPassword: TEST_PASSWORD },
      user.sessionToken,
    );
    const token = await mailToken(next, SUBJECT);
    await sql(
      `UPDATE email_token SET expires_at = now() - interval '1 second'
       WHERE purpose = 'email_change' AND target_user_id = $1`,
      [user.rawUserId],
    );
    const res = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(res.status).toBe(400);
    expect(await errorCode(res)).toBe('token_invalid_or_expired');
    // The address did not change.
    const rows = await sql<{ email: string }>(`SELECT email FROM "user" WHERE id = $1`, [
      user.rawUserId,
    ]);
    expect(rows[0]!.email).toBe(user.email);
  });

  it('refuses a wrong current password', async () => {
    const user = await createSignedInUser('email-change-password');
    const next = newAddress('wrong-password');
    const res = await apiPost(
      '/v1/auth/change-email',
      { newEmail: next, currentPassword: 'not-the-password' },
      user.sessionToken,
    );
    expect(res.status).toBe(401);
    expect(await errorCode(res)).toBe('invalid_credentials');
    const tokens = await sql(`SELECT id FROM email_token WHERE target_email_normalized = $1`, [
      next,
    ]);
    expect(tokens.length).toBe(0);
  });

  it('answers 202 for an address that is already registered but creates no token and sends no mail', async () => {
    const user = await createSignedInUser('email-change-taken');
    const taken = await createSignedInUser('email-change-owner');
    const res = await apiPost(
      '/v1/auth/change-email',
      { newEmail: taken.email, currentPassword: TEST_PASSWORD },
      user.sessionToken,
    );
    expect(res.status).toBe(202);
    const tokens = await sql(
      `SELECT id FROM email_token WHERE purpose = 'email_change' AND target_user_id = $1`,
      [user.rawUserId],
    );
    expect(tokens.length).toBe(0);
    const queued = await sql(
      `SELECT id FROM outbox WHERE event_type = 'email_change.requested' AND payload LIKE $1`,
      [`%${taken.email}%`],
    );
    expect(queued.length).toBe(0);
  });

  it('answers 409 when the new address was registered between request and confirm', async () => {
    const user = await createSignedInUser('email-change-race');
    const next = newAddress('race');
    await apiPost(
      '/v1/auth/change-email',
      { newEmail: next, currentPassword: TEST_PASSWORD },
      user.sessionToken,
    );
    const token = await mailToken(next, SUBJECT);
    // Someone else takes the address first.
    const rival = await apiPost('/v1/auth/signup', {
      email: next,
      password: TEST_PASSWORD,
      displayName: 'Rival',
    });
    expect(rival.status).toBe(201);
    const res = await apiPost('/v1/auth/confirm-email-change', { token });
    expect(res.status).toBe(409);
    expect(await errorCode(res)).toBe('conflict');
    // Nothing changed for the user.
    expect((await apiGet('/v1/auth/me', user.sessionToken)).status).toBe(200);
  });

  it('needs a session to request a change', async () => {
    const res = await apiPost('/v1/auth/change-email', {
      newEmail: newAddress('anon'),
      currentPassword: TEST_PASSWORD,
    });
    expect(res.status).toBe(401);
  });
});
