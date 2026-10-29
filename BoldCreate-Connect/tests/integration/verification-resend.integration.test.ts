/**
 * Sending the verification mail again: one wait between mails, then a new link that closes the old.
 *
 * Requires the live stack (api, worker, Postgres, Mailpit).
 * Run: pnpm test -- --only=integration
 */
import { describe, expect, it } from 'vitest';
import { apiPost, mailToken, sql, TEST_PASSWORD } from './signed-in-user.js';

const open = (email: string) =>
  sql<{ n: number }>(
    `SELECT count(*)::int AS n FROM email_token t JOIN "user" u ON u.id = t.target_user_id
      WHERE u.email_normalized = $1 AND t.purpose = 'verification' AND t.consumed_at IS NULL`,
    [email],
  );

describe('resending the verification mail', () => {
  it('sends nothing inside the wait, then replaces the link once the wait has passed', async () => {
    const email = `resend-${Date.now()}@example.com`;
    const signup = await apiPost('/v1/auth/signup', {
      email,
      password: TEST_PASSWORD,
      displayName: 'Resend Person',
    });
    expect(signup.status).toBe(201);
    const first = await mailToken(email, 'Verify');
    expect((await open(email))[0]!.n).toBe(1);

    // Straight after sign-up: the same answer, but no second link.
    expect((await apiPost('/v1/auth/resend-verification', { email })).status).toBe(202);
    expect((await open(email))[0]!.n).toBe(1);

    // Once the wait is over a link goes out even though the first one is still open.
    await sql(
      `UPDATE email_token SET created_at = now() - interval '2 minutes'
        WHERE target_user_id = (SELECT id FROM "user" WHERE email_normalized = $1)`,
      [email],
    );
    expect((await apiPost('/v1/auth/resend-verification', { email })).status).toBe(202);
    expect((await open(email))[0]!.n).toBe(1);

    // The first link was closed by the new one.
    expect((await apiPost('/v1/auth/verify-email', { token: first })).status).toBe(400);
  });

  it('sends the link again when someone signs up with an address they never verified', async () => {
    const email = `again-${Date.now()}@example.com`;
    const body = { email, password: TEST_PASSWORD, displayName: 'Again Person' };
    expect((await apiPost('/v1/auth/signup', body)).status).toBe(201);
    await mailToken(email, 'Verify');

    // The same answer as for a new address, but inside the wait no second link goes out.
    expect((await apiPost('/v1/auth/signup', body)).status).toBe(201);
    expect((await open(email))[0]!.n).toBe(1);

    await sql(
      `UPDATE email_token SET created_at = now() - interval '2 minutes'
        WHERE target_user_id = (SELECT id FROM "user" WHERE email_normalized = $1)`,
      [email],
    );
    expect((await apiPost('/v1/auth/signup', body)).status).toBe(201);
    const [rows] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM email_token t JOIN "user" u ON u.id = t.target_user_id
        WHERE u.email_normalized = $1 AND t.purpose = 'verification'`,
      [email],
    );
    expect(rows!.n).toBe(2);
    expect((await open(email))[0]!.n).toBe(1);
  });
});
