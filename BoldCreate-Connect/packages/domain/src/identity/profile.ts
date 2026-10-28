/**
 * Profile use-cases: signup, verify-email, sign-in, sign-out, password reset/change and email
 * change.
 *
 * Rules:
 * - Generic auth responses for all credential failures (no user enumeration).
 * - Passwords are proved through the user's `password` identity; the account locks after a
 *   configured number of consecutive failures, counted atomically in the database.
 * - Verification and email-change token TTL: 24 h. Reset token TTL: 1 h.
 * - Session token is returned raw (set in cookie); only the hash is stored.
 * - Starter org is provisioned once on first successful email verification.
 * - A password or email change revokes every session of the user.
 */
import { createHash, randomUUID } from 'node:crypto';
import { eq, and, isNull, gt, sql } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  userTable,
  sessionTable,
  emailTokenTable,
  authIdentityTable,
  organizationTable,
  organizationMemberTable,
  insertOutbox,
  setRlsContext,
} from '@boldcreate-integrations/db';
import { generateSessionToken, sessionExpiryDates } from './session.js';
import { generateEmailToken, hashEmailToken, EMAIL_TOKEN_TTL_SECONDS } from './email-token.js';
import { hashPassword, verifyPassword } from '@boldcreate-integrations/security';
import type {
  SignupBody,
  SigninBody,
  VerifyEmailBody,
  ResendVerificationBody,
  ForgotPasswordBody,
  ResetPasswordBody,
  ChangePasswordBody,
  ChangeEmailBody,
  ConfirmEmailChangeBody,
  SafeUser,
  MeResponse,
  Plain,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { insertOrgProjects } from '../project/org-projects.js';
import { appError, conflict, isUniqueViolation, notFound } from '../errors.js';
import { assertPasswordPolicy, type AuthContext, type AuthPolicy } from './auth-policy.js';

const RESET_TOKEN_TTL_SECONDS = 60 * 60; // 1 hour
const PASSWORD_METHOD = 'password';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSafeUser(row: typeof userTable.$inferSelect): Plain<SafeUser> {
  return {
    id: row.id,
    email: row.email,
    displayName: row.displayName,
    emailVerifiedAt: row.emailVerifiedAt?.toISOString() ?? null,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 38)
      .replace(/^-+|-+$/g, '') || 'org'
  );
}

const MAX_SLUG_ATTEMPTS = 50;

/**
 * Inserts the starter organization under the first free slug. Another organization's slug is not
 * visible through the row policies, so a taken slug shows up as a unique violation; each attempt
 * runs in its own savepoint so a failed one does not abort the surrounding transaction.
 */
async function insertStarterOrg(
  tx: Executor,
  values: { id: string; name: string; base: string; createdBy: string },
): Promise<void> {
  for (let suffix = 0; ; suffix += 1) {
    const slug = suffix === 0 ? values.base : `${values.base}-${suffix}`;
    try {
      await tx.transaction(async (inner) => {
        await inner
          .insert(organizationTable)
          .values({ id: values.id, name: values.name, slug, createdBy: values.createdBy });
      });
      return;
    } catch (err) {
      if (!isUniqueViolation(err) || suffix >= MAX_SLUG_ATTEMPTS) throw err;
    }
  }
}

async function enqueueEmail(
  db: Executor,
  eventType: string,
  payload: Record<string, unknown>,
): Promise<void> {
  await insertOutbox(db, { type: eventType, payload });
}

/** A hash prefix that identifies an address in audit rows without storing it. */
function emailDigest(normalizedEmail: string): string {
  return createHash('sha256').update(normalizedEmail).digest('hex').slice(0, 16);
}

let dummyHash: Promise<string> | undefined;

/**
 * Verifies a password against an identity's hash, or against a fixed valid hash when there is no
 * identity, so the work (and the time) is the same whether or not the address is registered.
 * Always returns false for the fixed hash.
 */
export async function verifyIdentitySecret(
  secretHash: string | null | undefined,
  password: string,
): Promise<boolean> {
  if (secretHash) return verifyPassword(secretHash, password);
  dummyHash ??= hashPassword(randomUUID());
  await verifyPassword(await dummyHash, password);
  return false;
}

/** Revokes every live session of the user; returns how many were revoked. */
async function revokeAllSessions(db: Executor, userId: string, now: Date): Promise<number> {
  const revoked = await db
    .update(sessionTable)
    .set({ revokedAt: now })
    .where(and(eq(sessionTable.userId, userId), isNull(sessionTable.revokedAt)))
    .returning({ id: sessionTable.id });
  return revoked.length;
}

/** Marks a token consumed if it is still valid; one statement, so two callers cannot both win. */
async function consumeToken(
  db: Executor,
  purpose: 'verification' | 'reset' | 'email_change',
  raw: string,
  now: Date,
): Promise<typeof emailTokenTable.$inferSelect & { targetUserId: string }> {
  const [row] = await db
    .update(emailTokenTable)
    .set({ consumedAt: now })
    .where(
      and(
        eq(emailTokenTable.tokenHash, hashEmailToken(raw)),
        eq(emailTokenTable.purpose, purpose),
        isNull(emailTokenTable.consumedAt),
        gt(emailTokenTable.expiresAt, now),
      ),
    )
    .returning();
  if (!row?.targetUserId) throw appError('token_invalid_or_expired');
  return { ...row, targetUserId: row.targetUserId };
}

async function passwordIdentityOf(db: Executor, userId: string) {
  const [identity] = await db
    .select()
    .from(authIdentityTable)
    .where(
      and(eq(authIdentityTable.userId, userId), eq(authIdentityTable.provider, PASSWORD_METHOD)),
    )
    .limit(1);
  return identity;
}

async function createSession(
  db: Executor,
  userId: string,
  now: Date,
  policy: Pick<AuthPolicy, 'session'>,
  ctx: AuthContext,
): Promise<string> {
  const sessionToken = generateSessionToken();
  const expiry = sessionExpiryDates(now, policy.session);
  await db.insert(sessionTable).values({
    id: randomUUID(),
    tokenHash: sessionToken.hash,
    userId,
    idleExpiresAt: expiry.idleExpiresAt,
    absoluteExpiresAt: expiry.absoluteExpiresAt,
    ip: ctx.ip ?? null,
    userAgent: ctx.userAgent ? ctx.userAgent.slice(0, 400) : null,
  });
  return sessionToken.raw;
}

// ─── Signup ───────────────────────────────────────────────────────────────────

/**
 * Addresses a person can never receive mail at. The `.invalid` top-level domain is reserved for
 * that, and the project users carry such an address, so no sign-up or email change may claim one.
 */
export function isReservedAddress(normalizedEmail: string): boolean {
  return normalizedEmail.endsWith('.invalid');
}

export async function signup(
  db: Executor,
  body: SignupBody,
  policy: Pick<AuthPolicy, 'passwordMinLength'>,
): Promise<{ userId: string }> {
  const normalized = body.email.toLowerCase().trim();
  assertPasswordPolicy(body.password, normalized, policy);

  // Answers like an address that is taken, and stores nothing.
  if (isReservedAddress(normalized)) return { userId: randomUUID() };

  // Check for an existing user — generic response to avoid enumeration
  const existing = await db
    .select({ id: userTable.id, kind: userTable.kind })
    .from(userTable)
    .where(eq(userTable.emailNormalized, normalized))
    .limit(1);

  if (existing.length > 0) {
    // Return success-like result; verification email will simply not arrive. The id of a project
    // user is never handed out.
    return { userId: existing[0]!.kind === 'human' ? existing[0]!.id : randomUUID() };
  }

  const secretHash = await hashPassword(body.password);
  const userId = randomUUID();
  const token = generateEmailToken(EMAIL_TOKEN_TTL_SECONDS);

  try {
    await db.transaction(async (tx) => {
      await tx.insert(userTable).values({
        id: userId,
        email: body.email.trim(),
        emailNormalized: normalized,
        displayName: body.displayName.trim(),
        status: 'active',
        failedLoginCount: 0,
      });
      await tx.insert(authIdentityTable).values({
        userId,
        provider: PASSWORD_METHOD,
        subject: normalized,
        secretHash,
      });
      await tx.insert(emailTokenTable).values({
        id: randomUUID(),
        purpose: 'verification',
        tokenHash: token.hash,
        targetUserId: userId,
        expiresAt: token.expiresAt,
      });
      await enqueueEmail(tx, 'email_verification.requested', {
        to: body.email.trim(),
        token: token.raw,
        userId,
      });
    });
  } catch (err) {
    // A concurrent signup of the same address won; answer like the existing-user case.
    if (!isUniqueViolation(err)) throw err;
    const [winner] = await db
      .select({ id: userTable.id, kind: userTable.kind })
      .from(userTable)
      .where(eq(userTable.emailNormalized, normalized))
      .limit(1);
    if (!winner) throw err;
    return { userId: winner.kind === 'human' ? winner.id : randomUUID() };
  }

  return { userId };
}

/**
 * Provisions the starter org (admin membership, For You + Default platform projects)
 * atomically. The claim on the user row comes first, so concurrent callers create one
 * organization, and a failure rolls the claim back so the next verification or sign-in retries.
 */
async function provisionStarterOrg(
  db: Executor,
  user: Pick<typeof userTable.$inferSelect, 'id' | 'displayName'>,
  now: Date,
): Promise<void> {
  const userId = user.id;
  await db.transaction(async (tx) => {
    const claimed = await tx
      .update(userTable)
      .set({ starterOrgProvisionedAt: now })
      .where(and(eq(userTable.id, userId), isNull(userTable.starterOrgProvisionedAt)))
      .returning({ id: userTable.id });
    if (claimed.length === 0) return;

    const orgId = randomUUID();
    await setRlsContext(tx, { orgId, userId });
    await insertStarterOrg(tx, {
      id: orgId,
      name: `${user.displayName}'s Org`,
      base: slugify(user.displayName),
      createdBy: userId,
    });

    await tx.insert(organizationMemberTable).values({
      organizationId: orgId,
      userId,
      role: 'ADMIN',
    });
    await insertOrgProjects(tx, orgId, userId);

    await insertOutbox(tx, { type: 'org_key.requested', payload: { orgId } });
  });
}

// ─── Verify email ─────────────────────────────────────────────────────────────

export async function verifyEmail(
  db: Executor,
  body: VerifyEmailBody,
  policy: Pick<AuthPolicy, 'session'>,
  ctx: AuthContext = {},
): Promise<{ sessionToken: string; user: Plain<SafeUser> }> {
  const now = new Date();
  const tokenRow = await consumeToken(db, 'verification', body.token, now);
  const userId = tokenRow.targetUserId;

  // Mark verified and provision starter org if not already done
  const userRows = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

  const user = userRows[0];
  if (!user) throw notFound();
  // Only a person verifies an address and gets a starter org and a session from it.
  if (user.kind !== 'human') throw appError('token_invalid_or_expired');

  const alreadyVerified = user.emailVerifiedAt !== null;
  const alreadyProvisioned = user.starterOrgProvisionedAt !== null;

  await db
    .update(userTable)
    .set({ emailVerifiedAt: alreadyVerified ? user.emailVerifiedAt : now })
    .where(eq(userTable.id, userId));

  if (!alreadyProvisioned) await provisionStarterOrg(db, user, now);

  const sessionToken = await createSession(db, userId, now, policy, ctx);

  const updatedUser = (
    await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1)
  )[0]!;

  return { sessionToken, user: toSafeUser(updatedUser) };
}

// ─── Resend verification ──────────────────────────────────────────────────────

export async function resendVerification(
  db: Executor,
  body: ResendVerificationBody,
): Promise<void> {
  // Always return success to avoid enumeration
  const normalized = body.email.toLowerCase().trim();
  const rows = await db
    .select()
    .from(userTable)
    .where(eq(userTable.emailNormalized, normalized))
    .limit(1);

  const user = rows[0];
  if (!user || user.kind !== 'human' || user.emailVerifiedAt !== null) return;

  const token = generateEmailToken(EMAIL_TOKEN_TTL_SECONDS);
  await db.insert(emailTokenTable).values({
    id: randomUUID(),
    purpose: 'verification',
    tokenHash: token.hash,
    targetUserId: user.id,
    expiresAt: token.expiresAt,
  });

  await enqueueEmail(db, 'email_verification.requested', {
    to: user.email,
    token: token.raw,
    userId: user.id,
  });
}

// ─── Sign-in ──────────────────────────────────────────────────────────────────

/** Records a failed sign-in. The row is written outside any transaction that is about to fail. */
async function auditSignInFailed(
  db: Executor,
  normalizedEmail: string,
  userId: string | undefined,
  reason: string,
  ctx: AuthContext,
): Promise<void> {
  await writeAudit(db, {
    actor: userId ? { kind: 'user_session', id: userId } : { kind: 'system', id: 'anonymous' },
    action: 'user.sign_in_failed',
    ...(userId
      ? { target: { kind: 'user', id: userId } }
      : { context: { emailDigest: emailDigest(normalizedEmail) } }),
    result: 'failure',
    reason,
    requestId: ctx.requestId,
    ip: ctx.ip,
  });
}

export async function signin(
  db: Executor,
  body: SigninBody,
  ctx: AuthContext,
  policy: AuthPolicy,
): Promise<{ sessionToken: string; user: Plain<SafeUser> }> {
  const normalized = body.email.toLowerCase().trim();
  const [found] = await db
    .select({ user: userTable, identity: authIdentityTable })
    .from(authIdentityTable)
    .innerJoin(userTable, eq(userTable.id, authIdentityTable.userId))
    .where(
      and(
        eq(authIdentityTable.provider, PASSWORD_METHOD),
        eq(authIdentityTable.subject, normalized),
        eq(userTable.kind, 'human'),
      ),
    )
    .limit(1);

  // Generic failure — do not reveal whether the address is registered. The fixed hash makes an
  // unknown address cost the same as a wrong password.
  if (!found) {
    await verifyIdentitySecret(null, body.password);
    await auditSignInFailed(db, normalized, undefined, 'unknown_identity', ctx);
    throw appError('invalid_credentials');
  }
  const { user, identity } = found;
  const now = new Date();

  if (user.lockedUntil && user.lockedUntil > now) {
    await verifyIdentitySecret(null, body.password);
    await auditSignInFailed(db, normalized, user.id, 'locked', ctx);
    throw appError('invalid_credentials');
  }

  if (user.status === 'suspended') {
    throw appError('account_suspended');
  }

  const valid = await verifyIdentitySecret(identity.secretHash, body.password);
  if (!valid) {
    // One statement: concurrent failures cannot overwrite each other's count.
    const lockUntil = new Date(now.getTime() + policy.lockSeconds * 1000);
    await db
      .update(userTable)
      .set({
        failedLoginCount: sql`${userTable.failedLoginCount} + 1`,
        lockedUntil: sql`CASE WHEN ${userTable.failedLoginCount} + 1 >= ${policy.maxFailedLogins} THEN ${lockUntil.toISOString()}::timestamptz ELSE ${userTable.lockedUntil} END`,
      })
      .where(eq(userTable.id, user.id));
    await auditSignInFailed(db, normalized, user.id, 'wrong_password', ctx);
    throw appError('invalid_credentials');
  }

  if (!user.emailVerifiedAt) {
    await auditSignInFailed(db, normalized, user.id, 'email_not_verified', ctx);
    throw appError('email_not_verified');
  }

  // A verified user whose starter org was never created (provisioning failed earlier, or the
  // account predates it) gets it now, so every signed-in user has a default org and project.
  if (user.starterOrgProvisionedAt === null) {
    await provisionStarterOrg(db, user, now);
  }

  return db.transaction(async (tx) => {
    // Reset failure counter
    await tx
      .update(userTable)
      .set({ failedLoginCount: 0, lockedUntil: null, lastLoginAt: now })
      .where(eq(userTable.id, user.id));
    const sessionToken = await createSession(tx, user.id, now, policy, ctx);
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: user.id },
      action: 'user.signed_in',
      target: { kind: 'user', id: user.id },
      requestId: ctx.requestId,
      ip: ctx.ip,
    });
    return { sessionToken, user: toSafeUser(user) };
  });
}

// ─── Sign-out ─────────────────────────────────────────────────────────────────

export async function signout(
  db: Executor,
  sessionTokenHash: string,
  ctx: AuthContext = {},
): Promise<void> {
  await db.transaction(async (tx) => {
    const revoked = await tx
      .update(sessionTable)
      .set({ revokedAt: new Date() })
      .where(and(eq(sessionTable.tokenHash, sessionTokenHash), isNull(sessionTable.revokedAt)))
      .returning({ userId: sessionTable.userId });
    const userId = revoked[0]?.userId;
    if (!userId) return;
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: userId },
      action: 'user.signed_out',
      target: { kind: 'user', id: userId },
      requestId: ctx.requestId,
      ip: ctx.ip,
    });
  });
}

export async function signoutAll(
  db: Executor,
  userId: string,
  ctx: AuthContext = {},
): Promise<void> {
  await db.transaction(async (tx) => {
    const count = await revokeAllSessions(tx, userId, new Date());
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: userId },
      action: 'user.sessions_revoked',
      target: { kind: 'user', id: userId },
      requestId: ctx.requestId,
      ip: ctx.ip,
      context: { count },
    });
  });
}

// ─── Forgot password ──────────────────────────────────────────────────────────

export async function forgotPassword(db: Executor, body: ForgotPasswordBody): Promise<void> {
  // Always return success
  const normalized = body.email.toLowerCase().trim();
  const rows = await db
    .select()
    .from(userTable)
    .where(eq(userTable.emailNormalized, normalized))
    .limit(1);

  const user = rows[0];
  if (!user || user.kind !== 'human' || !user.emailVerifiedAt) return;

  const token = generateEmailToken(RESET_TOKEN_TTL_SECONDS);
  await db.insert(emailTokenTable).values({
    id: randomUUID(),
    purpose: 'reset',
    tokenHash: token.hash,
    targetUserId: user.id,
    expiresAt: token.expiresAt,
  });

  await enqueueEmail(db, 'password_reset.requested', {
    to: user.email,
    token: token.raw,
    userId: user.id,
  });
}

// ─── Reset and change password ───────────────────────────────────────────────

/** Stores a new password, clears the lockout and revokes every session, in one transaction. */
async function replacePassword(
  tx: Executor,
  user: { id: string; emailNormalized: string },
  secretHash: string,
  now: Date,
  ctx: AuthContext,
): Promise<void> {
  const userId = user.id;
  await tx
    .insert(authIdentityTable)
    .values({ userId, provider: PASSWORD_METHOD, subject: user.emailNormalized, secretHash })
    .onConflictDoUpdate({
      target: [authIdentityTable.userId, authIdentityTable.provider],
      set: { secretHash, updatedAt: now },
    });
  await tx
    .update(userTable)
    .set({ failedLoginCount: 0, lockedUntil: null })
    .where(eq(userTable.id, userId));
  const count = await revokeAllSessions(tx, userId, now);
  const base = {
    actor: { kind: 'user_session' as const, id: userId },
    target: { kind: 'user', id: userId },
    requestId: ctx.requestId,
    ip: ctx.ip,
  };
  await writeAudit(tx, { ...base, action: 'user.password_changed' });
  await writeAudit(tx, { ...base, action: 'user.sessions_revoked', context: { count } });
}

export async function resetPassword(
  db: Executor,
  body: ResetPasswordBody,
  policy: Pick<AuthPolicy, 'passwordMinLength'>,
  ctx: AuthContext = {},
): Promise<void> {
  const now = new Date();
  // The policy is checked before the token is spent, so a weak password does not burn the link.
  const [peek] = await db
    .select({ email: userTable.emailNormalized })
    .from(emailTokenTable)
    .innerJoin(userTable, eq(userTable.id, emailTokenTable.targetUserId))
    .where(
      and(
        eq(emailTokenTable.tokenHash, hashEmailToken(body.token)),
        eq(emailTokenTable.purpose, 'reset'),
        isNull(emailTokenTable.consumedAt),
        gt(emailTokenTable.expiresAt, now),
        // A reset would create a login credential, which only a person may have.
        eq(userTable.kind, 'human'),
      ),
    )
    .limit(1);
  if (!peek) throw appError('token_invalid_or_expired');
  assertPasswordPolicy(body.newPassword, peek.email, policy);

  const secretHash = await hashPassword(body.newPassword);
  await db.transaction(async (tx) => {
    const tokenRow = await consumeToken(tx, 'reset', body.token, now);
    await replacePassword(
      tx,
      { id: tokenRow.targetUserId, emailNormalized: peek.email },
      secretHash,
      now,
      ctx,
    );
  });
}

export async function changePassword(
  db: Executor,
  userId: string,
  body: ChangePasswordBody,
  policy: Pick<AuthPolicy, 'passwordMinLength'>,
  ctx: AuthContext = {},
): Promise<void> {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);
  if (!user || user.kind !== 'human') throw notFound();

  const identity = await passwordIdentityOf(db, userId);
  const valid = await verifyIdentitySecret(identity?.secretHash, body.currentPassword);
  if (!valid) throw appError('invalid_credentials');
  assertPasswordPolicy(body.newPassword, user.emailNormalized, policy);

  const secretHash = await hashPassword(body.newPassword);
  await db.transaction((tx) => replacePassword(tx, user, secretHash, new Date(), ctx));
}

// ─── Email change ─────────────────────────────────────────────────────────────

/**
 * Starts an email change: proves the password, then mails a confirmation link to the new
 * address. An address that is already registered answers the same way and sends nothing.
 */
export async function requestEmailChange(
  db: Executor,
  userId: string,
  body: ChangeEmailBody,
): Promise<void> {
  const [target] = await db
    .select({ kind: userTable.kind })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);
  if (!target || target.kind !== 'human') throw notFound();

  const identity = await passwordIdentityOf(db, userId);
  const valid = await verifyIdentitySecret(identity?.secretHash, body.currentPassword);
  if (!valid) throw appError('invalid_credentials');

  const newEmail = body.newEmail.trim();
  const normalized = newEmail.toLowerCase();
  // Answers like an address that is taken, and sends nothing.
  if (isReservedAddress(normalized)) return;
  const [taken] = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.emailNormalized, normalized))
    .limit(1);
  if (taken) return;

  const token = generateEmailToken(EMAIL_TOKEN_TTL_SECONDS);
  await db.transaction(async (tx) => {
    await tx.insert(emailTokenTable).values({
      id: randomUUID(),
      purpose: 'email_change',
      tokenHash: token.hash,
      targetUserId: userId,
      targetEmailNormalized: normalized,
      expiresAt: token.expiresAt,
    });
    await enqueueEmail(tx, 'email_change.requested', { to: newEmail, token: token.raw, userId });
  });
}

/** Completes an email change from the emailed token. */
export async function confirmEmailChange(
  db: Executor,
  body: ConfirmEmailChangeBody,
  ctx: AuthContext = {},
): Promise<void> {
  const now = new Date();
  try {
    await db.transaction(async (tx) => {
      const tokenRow = await consumeToken(tx, 'email_change', body.token, now);
      const userId = tokenRow.targetUserId;
      const newEmail = tokenRow.targetEmailNormalized!;
      const [before] = await tx
        .select({ email: userTable.emailNormalized, kind: userTable.kind })
        .from(userTable)
        .where(eq(userTable.id, userId))
        .limit(1);
      if (!before || before.kind !== 'human') throw notFound();
      if (isReservedAddress(newEmail)) throw appError('token_invalid_or_expired');

      await tx
        .update(userTable)
        .set({ email: newEmail, emailNormalized: newEmail, emailVerifiedAt: now, updatedAt: now })
        .where(eq(userTable.id, userId));
      await tx
        .update(authIdentityTable)
        .set({ subject: newEmail, updatedAt: now })
        .where(
          and(
            eq(authIdentityTable.userId, userId),
            eq(authIdentityTable.provider, PASSWORD_METHOD),
          ),
        );
      const count = await revokeAllSessions(tx, userId, now);
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: userId },
        action: 'user.email_changed',
        target: { kind: 'user', id: userId },
        requestId: ctx.requestId,
        ip: ctx.ip,
        context: { previousEmailDigest: emailDigest(before.email), sessionsRevoked: count },
      });
    });
  } catch (err) {
    if (isUniqueViolation(err)) throw conflict();
    throw err;
  }
}

// ─── Get me ───────────────────────────────────────────────────────────────────

export async function getMe(db: Executor, userId: string): Promise<Plain<MeResponse>> {
  return db.transaction(async (tx) => {
    // Memberships are visible by user alone: no organization is the tenant here.
    await setRlsContext(tx, { userId });
    const rows = await tx.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

    const user = rows[0];
    if (!user) throw notFound();

    const memberships = await tx
      .select({
        organizationId: organizationMemberTable.organizationId,
        organizationName: organizationTable.name,
        organizationSlug: organizationTable.slug,
        role: organizationMemberTable.role,
        status: organizationMemberTable.status,
      })
      .from(organizationMemberTable)
      .innerJoin(
        organizationTable,
        eq(organizationMemberTable.organizationId, organizationTable.id),
      )
      .where(
        and(
          eq(organizationMemberTable.userId, userId),
          isNull(organizationTable.deletionRequestedAt),
        ),
      );

    return {
      user: toSafeUser(user),
      memberships,
    };
  });
}
