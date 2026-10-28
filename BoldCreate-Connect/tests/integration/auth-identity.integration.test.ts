/**
 * The `auth_identity` table: what signup creates and what the database refuses.
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { TEST_PASSWORD, apiPost, createSignedInUser, sql } from './signed-in-user.js';

async function code(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

async function rejection(
  promise: Promise<unknown>,
): Promise<{ code?: string; constraint?: string }> {
  try {
    await promise;
  } catch (error) {
    return error as { code?: string; constraint?: string };
  }
  throw new Error('expected the statement to be rejected');
}

describe('auth_identity', () => {
  it('is created with the user: provider password, subject the normalized email, Argon2id hash', async () => {
    const user = await createSignedInUser('identity');
    const rows = await sql<{ provider: string; subject: string; secret_hash: string }>(
      `SELECT provider, subject, secret_hash FROM auth_identity WHERE user_id = $1`,
      [user.rawUserId],
    );
    expect(rows.length).toBe(1);
    expect(rows[0]!.provider).toBe('password');
    expect(rows[0]!.subject).toBe(user.email.toLowerCase());
    expect(rows[0]!.secret_hash.startsWith('$argon2id$')).toBe(true);
  });

  it('signs in through the identity and is not fooled by the case of the address', async () => {
    const user = await createSignedInUser('identity-case');
    const res = await apiPost('/v1/auth/signin', {
      email: user.email.toUpperCase(),
      password: TEST_PASSWORD,
    });
    expect(res.status).toBe(200);
  });

  it('refuses a second identity with the same provider and subject', async () => {
    const user = await createSignedInUser('identity-unique');
    const other = await createSignedInUser('identity-unique-other');
    const error = await rejection(
      sql(`UPDATE auth_identity SET subject = $1 WHERE user_id = $2`, [
        user.email.toLowerCase(),
        other.rawUserId,
      ]),
    );
    expect(error).toMatchObject({
      code: '23505',
      constraint: 'auth_identity_provider_subject_unique',
    });
  });

  it('refuses two identities of one provider for one user', async () => {
    const user = await createSignedInUser('identity-per-user');
    const error = await rejection(
      sql(
        `INSERT INTO auth_identity (user_id, provider, subject, secret_hash) VALUES ($1, 'password', $2, 'x')`,
        [user.rawUserId, `${randomUUID()}@example.com`],
      ),
    );
    expect(error).toMatchObject({
      code: '23505',
      constraint: 'auth_identity_user_provider_unique',
    });
  });

  it('refuses a password identity without a hash', async () => {
    const user = await createSignedInUser('identity-no-hash');
    const error = await rejection(
      sql(`UPDATE auth_identity SET secret_hash = NULL WHERE user_id = $1`, [user.rawUserId]),
    );
    expect(error).toMatchObject({ code: '23514', constraint: 'auth_identity_password_secret' });
  });

  it('allows another provider without a hash and refuses a malformed provider name', async () => {
    const user = await createSignedInUser('identity-sso');
    await sql(
      `INSERT INTO auth_identity (user_id, provider, subject) VALUES ($1, 'oidc_example', $2)`,
      [user.rawUserId, randomUUID()],
    );
    const error = await rejection(
      sql(`INSERT INTO auth_identity (user_id, provider, subject) VALUES ($1, 'Bad Name', $2)`, [
        user.rawUserId,
        randomUUID(),
      ]),
    );
    expect(error).toMatchObject({ code: '23514', constraint: 'auth_identity_provider_format' });
  });

  it('is removed with the user', async () => {
    const id = randomUUID();
    const email = `${id}@example.com`;
    await sql(
      `INSERT INTO "user" (id, email, email_normalized, display_name) VALUES ($1, $2, $2, 'Cascade')`,
      [id, email],
    );
    await sql(
      `INSERT INTO auth_identity (user_id, provider, subject, secret_hash) VALUES ($1, 'password', $2, 'x')`,
      [id, email],
    );
    await sql(`DELETE FROM "user" WHERE id = $1`, [id]);
    expect((await sql(`SELECT id FROM auth_identity WHERE user_id = $1`, [id])).length).toBe(0);
  });

  it('leaves no password hash column on the user', async () => {
    const rows = await sql(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = 'user' AND column_name = 'password_hash'`,
    );
    expect(rows.length).toBe(0);
  });
});

describe('password policy at signup', () => {
  const base = () => ({
    email: `policy-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`,
    displayName: 'Policy User',
  });

  it.each([
    ['too short', 'Short1!'],
    ['a common password', 'password1234'],
  ])('refuses %s with the policy error', async (_name, password) => {
    const body = { ...base(), password };
    const res = await apiPost('/v1/auth/signup', body);
    expect(res.status).toBe(422);
    expect(await code(res)).toBe('password_policy_violation');
    const users = await sql(`SELECT id FROM "user" WHERE email_normalized = $1`, [body.email]);
    expect(users.length).toBe(0);
  });

  it('refuses a password of 257 characters at the schema', async () => {
    const res = await apiPost('/v1/auth/signup', { ...base(), password: 'x'.repeat(257) });
    expect(res.status).toBe(400);
    expect(await code(res)).toBe('validation_failed');
  });

  it('refuses the local part of the email address as the password', async () => {
    const body = { ...base(), password: 'ada.lovelace.long' };
    body.email = `ada.lovelace.long@example.com`;
    const res = await apiPost('/v1/auth/signup', body);
    expect(res.status).toBe(422);
    expect(await code(res)).toBe('password_policy_violation');
  });

  it('accepts exactly the minimum length', async () => {
    const res = await apiPost('/v1/auth/signup', { ...base(), password: 'Zq7!Zq7!Zq7!' });
    expect(res.status).toBe(201);
  });
});
