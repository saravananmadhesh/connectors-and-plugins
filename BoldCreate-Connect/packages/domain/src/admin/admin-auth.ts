/**
 * Admin sign-in. Admins are not self-registered: an email must be on the allow-list table,
 * proves it owns the address once through a mailed one-time link, chooses a password, and signs
 * in with it after that. The allow-list is checked again on every request, so removing an email
 * ends its sessions at once.
 */
import { createHash, randomUUID } from 'node:crypto';
import { and, eq, gt, isNull, sql } from 'drizzle-orm';
import {
  adminSetupTokenTable,
  insertOutbox,
  platformAdminIdentityTable,
  platformAdminSessionTable,
  type Executor,
} from '@boldcreate-integrations/db';
import { hashPassword } from '@boldcreate-integrations/security';
import { appError } from '../errors.js';
import { isAdminEmailListed } from './allowed-emails.js';
import { writeAudit } from '../audit/write-audit.js';
import {
  assertPasswordPolicy,
  type AuthContext,
  type AuthPolicy,
} from '../identity/auth-policy.js';
import { generateEmailToken, hashEmailToken, isEmailTokenValid } from '../identity/email-token.js';
import { verifyIdentitySecret } from '../identity/profile.js';
import {
  evaluateSession,
  generateSessionToken,
  hashSessionToken,
  sessionExpiryDates,
} from '../identity/session.js';

/** Identity rows made here carry this tenant marker; the column belongs to the OIDC sign-in. */
const LOCAL_TENANT = 'local';
/** A second link for the same address is not sent inside this window. */
const SETUP_RESEND_SECONDS = 60;

export interface AdminAuthPolicy extends AuthPolicy {
  /** Emails from the settings; written to the allow-list table at every start. */
  allowedEmails: readonly string[];
  setupTtlSeconds: number;
  /** Absolute URL of the page that finishes setup; the token is added as `token`. */
  setupUrl: string;
}

export interface AdminSession {
  sessionId: string;
  identityId: string;
  email: string;
}

const normalize = (email: string): string => email.trim().toLowerCase();

const digest = (email: string): string =>
  createHash('sha256').update(email).digest('hex').slice(0, 16);

async function auditFailure(
  db: Executor,
  email: string,
  reason: string,
  ctx: AuthContext,
  identityId?: string,
): Promise<void> {
  await writeAudit(db, {
    actor: { kind: 'platform_admin', id: identityId ?? digest(email) },
    action: 'admin.sign_in_failed',
    result: 'failure',
    reason,
    requestId: ctx.requestId,
    ip: ctx.ip,
  });
}

async function startSession(
  db: Executor,
  identityId: string,
  now: Date,
  policy: AdminAuthPolicy,
): Promise<string> {
  const token = generateSessionToken();
  const expiry = sessionExpiryDates(now, policy.session);
  await db.insert(platformAdminSessionTable).values({
    id: randomUUID(),
    tokenHash: token.hash,
    adminIdentityId: identityId,
    idleExpiresAt: expiry.idleExpiresAt,
    absoluteExpiresAt: expiry.absoluteExpiresAt,
  });
  return token.raw;
}

/**
 * Mails a setup link when the email is allowed. Returns nothing either way, so the caller can
 * answer the same to every address.
 */
export async function requestAdminSetup(
  db: Executor,
  policy: AdminAuthPolicy,
  rawEmail: string,
  now: Date = new Date(),
  /** The admin who added the address; the mail then reads as an invitation from them. */
  invitedBy?: string,
): Promise<void> {
  const email = normalize(rawEmail);
  if (!(await isAdminEmailListed(db, email))) return;

  const recent = new Date(now.getTime() - SETUP_RESEND_SECONDS * 1000);
  const [pending] = await db
    .select({ id: adminSetupTokenTable.id })
    .from(adminSetupTokenTable)
    .where(and(eq(adminSetupTokenTable.email, email), gt(adminSetupTokenTable.createdAt, recent)))
    .limit(1);
  if (pending) return;

  const token = generateEmailToken(policy.setupTtlSeconds, now);
  const url = new URL(policy.setupUrl);
  url.searchParams.set('token', token.raw);
  await db.transaction(async (tx) => {
    await tx.insert(adminSetupTokenTable).values({
      id: randomUUID(),
      email,
      tokenHash: token.hash,
      expiresAt: token.expiresAt,
      createdAt: now,
    });
    await insertOutbox(tx, {
      type: 'admin_setup.requested',
      payload: { to: email, url: url.toString(), ...(invitedBy ? { invitedBy } : {}) },
    });
  });
}

/** Spends a setup link: stores the password, ends older sessions and signs the admin in. */
export async function completeAdminSetup(
  db: Executor,
  policy: AdminAuthPolicy,
  body: { token: string; password: string },
  ctx: AuthContext,
  now: Date = new Date(),
): Promise<{ sessionToken: string; email: string }> {
  const [row] = await db
    .select()
    .from(adminSetupTokenTable)
    .where(eq(adminSetupTokenTable.tokenHash, hashEmailToken(body.token)))
    .limit(1);
  if (
    !row ||
    row.consumedAt !== null ||
    now >= row.expiresAt ||
    !isEmailTokenValid({ expiresAt: row.expiresAt, consumedAt: row.consumedAt }) ||
    !(await isAdminEmailListed(db, row.email))
  ) {
    throw appError('token_invalid_or_expired');
  }
  assertPasswordPolicy(body.password, row.email, policy);
  const passwordHash = await hashPassword(body.password);

  return db.transaction(async (tx) => {
    // The conditional update is the single-use guard when two requests spend the same link.
    const spent = await tx
      .update(adminSetupTokenTable)
      .set({ consumedAt: now })
      .where(and(eq(adminSetupTokenTable.id, row.id), isNull(adminSetupTokenTable.consumedAt)))
      .returning({ id: adminSetupTokenTable.id });
    if (spent.length === 0) throw appError('token_invalid_or_expired');

    const [identity] = await tx
      .insert(platformAdminIdentityTable)
      .values({
        id: randomUUID(),
        idpTenantId: LOCAL_TENANT,
        oid: row.email,
        grantedBy: 'allow-list',
        passwordHash,
      })
      .onConflictDoUpdate({
        target: [platformAdminIdentityTable.idpTenantId, platformAdminIdentityTable.oid],
        set: {
          passwordHash,
          failedAttempts: 0,
          lockedUntil: null,
          status: 'active',
          revokedAt: null,
        },
      })
      .returning({ id: platformAdminIdentityTable.id });
    const identityId = identity!.id;

    await tx
      .update(platformAdminSessionTable)
      .set({ revokedAt: now })
      .where(
        and(
          eq(platformAdminSessionTable.adminIdentityId, identityId),
          isNull(platformAdminSessionTable.revokedAt),
        ),
      );
    const sessionToken = await startSession(tx, identityId, now, policy);
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: identityId },
      action: 'admin.password_set',
      target: { kind: 'admin', id: identityId },
      requestId: ctx.requestId,
      ip: ctx.ip,
    });
    return { sessionToken, email: row.email };
  });
}

/** Checks email and password. Every refusal is the same `invalid_credentials`. */
export async function signInAdmin(
  db: Executor,
  policy: AdminAuthPolicy,
  body: { email: string; password: string },
  ctx: AuthContext,
  now: Date = new Date(),
): Promise<{ sessionToken: string; email: string }> {
  const email = normalize(body.email);
  const [identity] = (await isAdminEmailListed(db, email))
    ? await db
        .select()
        .from(platformAdminIdentityTable)
        .where(
          and(
            eq(platformAdminIdentityTable.idpTenantId, LOCAL_TENANT),
            eq(platformAdminIdentityTable.oid, email),
          ),
        )
        .limit(1)
    : [];

  // An unknown, off-list, revoked or locked address costs the same as a wrong password.
  if (
    !identity ||
    identity.status !== 'active' ||
    !identity.passwordHash ||
    (identity.lockedUntil && identity.lockedUntil > now)
  ) {
    await verifyIdentitySecret(null, body.password);
    await auditFailure(db, email, identity ? 'unavailable' : 'unknown_identity', ctx, identity?.id);
    throw appError('invalid_credentials');
  }

  if (!(await verifyIdentitySecret(identity.passwordHash, body.password))) {
    const lockUntil = new Date(now.getTime() + policy.lockSeconds * 1000);
    const table = platformAdminIdentityTable;
    // One statement, so concurrent failures cannot overwrite each other's count.
    await db
      .update(table)
      .set({
        failedAttempts: sql`${table.failedAttempts} + 1`,
        lockedUntil: sql`CASE WHEN ${table.failedAttempts} + 1 >= ${policy.maxFailedLogins} THEN ${lockUntil.toISOString()}::timestamptz ELSE ${table.lockedUntil} END`,
      })
      .where(eq(table.id, identity.id));
    await auditFailure(db, email, 'wrong_password', ctx, identity.id);
    throw appError('invalid_credentials');
  }

  return db.transaction(async (tx) => {
    await tx
      .update(platformAdminIdentityTable)
      .set({ failedAttempts: 0, lockedUntil: null })
      .where(eq(platformAdminIdentityTable.id, identity.id));
    const sessionToken = await startSession(tx, identity.id, now, policy);
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: identity.id },
      action: 'admin.signed_in',
      target: { kind: 'admin', id: identity.id },
      requestId: ctx.requestId,
      ip: ctx.ip,
    });
    return { sessionToken, email };
  });
}

/**
 * Resolves a raw session token to an admin, or null. Null for an unknown, revoked or expired
 * session, a revoked identity, and an email that has left the allow-list.
 */
export async function authenticateAdminSession(
  db: Executor,
  policy: AdminAuthPolicy,
  rawToken: string,
  now: Date = new Date(),
): Promise<AdminSession | null> {
  const [found] = await db
    .select({ session: platformAdminSessionTable, identity: platformAdminIdentityTable })
    .from(platformAdminSessionTable)
    .innerJoin(
      platformAdminIdentityTable,
      eq(platformAdminIdentityTable.id, platformAdminSessionTable.adminIdentityId),
    )
    .where(eq(platformAdminSessionTable.tokenHash, hashSessionToken(rawToken)))
    .limit(1);
  if (!found) return null;
  const { session, identity } = found;
  if (identity.status !== 'active' || !(await isAdminEmailListed(db, identity.oid))) return null;

  const decision = evaluateSession(session, now, policy.session);
  if (decision.state === 'revoked') return null;
  const live = and(
    eq(platformAdminSessionTable.id, session.id),
    isNull(platformAdminSessionTable.revokedAt),
  );
  if (decision.state === 'expired') {
    await db.update(platformAdminSessionTable).set({ revokedAt: now }).where(live);
    return null;
  }
  if (decision.slideTo) {
    await db.update(platformAdminSessionTable).set({ idleExpiresAt: decision.slideTo }).where(live);
  }
  return { sessionId: session.id, identityId: identity.id, email: identity.oid };
}

export async function signOutAdmin(
  db: Executor,
  session: AdminSession,
  ctx: AuthContext,
  now: Date = new Date(),
): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .update(platformAdminSessionTable)
      .set({ revokedAt: now })
      .where(
        and(
          eq(platformAdminSessionTable.id, session.sessionId),
          isNull(platformAdminSessionTable.revokedAt),
        ),
      );
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: session.identityId },
      action: 'admin.signed_out',
      target: { kind: 'admin', id: session.identityId },
      requestId: ctx.requestId,
      ip: ctx.ip,
    });
  });
}
