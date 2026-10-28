import { check, integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export type AdminIdentityStatus = 'active' | 'revoked';

// ─── platform_admin_identity ──────────────────────────────────────────────────

export const platformAdminIdentityTable = pgTable(
  'platform_admin_identity',
  {
    id: uuid('id').primaryKey(),
    /** Microsoft tenant ID */
    idpTenantId: text('idp_tenant_id').notNull(),
    /** Microsoft object ID */
    oid: text('oid').notNull(),
    status: text('status').$type<AdminIdentityStatus>().notNull().default('active'),
    /** Fixed role — always PLATFORM_ADMIN */
    role: text('role').notNull().default('PLATFORM_ADMIN'),
    /** Operator reference (audit trail, not a FK to user table) */
    grantedBy: text('granted_by').notNull(),
    grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    /** Audit reference for the revocation event */
    revokeAuditRef: text('revoke_audit_ref'),
    /** Argon2id hash of the password; absent until the operator finishes account setup. */
    passwordHash: text('password_hash'),
    /** Wrong passwords since the last good sign-in; reset on success. */
    failedAttempts: integer('failed_attempts').notNull().default(0),
    /** Sign-in is refused until this time after too many wrong passwords. */
    lockedUntil: timestamp('locked_until', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('platform_admin_identity_tenant_oid_unique').on(t.idpTenantId, t.oid),
    check('platform_admin_identity_status_check', sql`${t.status} IN ('active', 'revoked')`),
    check('platform_admin_identity_role_fixed', sql`${t.role} = 'PLATFORM_ADMIN'`),
  ],
);

// ─── platform_admin_session ───────────────────────────────────────────────────

export const platformAdminSessionTable = pgTable(
  'platform_admin_session',
  {
    id: uuid('id').primaryKey(),
    tokenHash: text('token_hash').notNull(),
    adminIdentityId: uuid('admin_identity_id')
      .notNull()
      .references(() => platformAdminIdentityTable.id, { onDelete: 'cascade' }),
    /** Fixed realm — always 'admin' */
    realm: text('realm').notNull().default('admin'),
    idleExpiresAt: timestamp('idle_expires_at', { withTimezone: true }).notNull(),
    absoluteExpiresAt: timestamp('absolute_expires_at', { withTimezone: true }).notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('platform_admin_session_token_hash_unique').on(t.tokenHash),
    check('platform_admin_session_realm_fixed', sql`${t.realm} = 'admin'`),
  ],
);

// ─── oidc_login_attempt ───────────────────────────────────────────────────────

export const oidcLoginAttemptTable = pgTable(
  'oidc_login_attempt',
  {
    id: uuid('id').primaryKey(),
    /** Opaque handle returned to BFF — not the state itself */
    handle: text('handle').notNull(),
    stateHash: text('state_hash').notNull(),
    nonce: text('nonce').notNull(),
    pkceVerifier: text('pkce_verifier').notNull(),
    expectedIssuer: text('expected_issuer').notNull(),
    expectedAudience: text('expected_audience').notNull(),
    /** Allowlisted local return path */
    safeReturnPath: text('safe_return_path').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    claimedAt: timestamp('claimed_at', { withTimezone: true }),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('oidc_login_attempt_handle_unique').on(t.handle),
    unique('oidc_login_attempt_state_hash_unique').on(t.stateHash),
  ],
);

// ─── admin_setup_token ────────────────────────────────────────────────────────

/** One-time link that lets an allow-listed email choose or reset an admin password. */
export const adminSetupTokenTable = pgTable(
  'admin_setup_token',
  {
    id: uuid('id').primaryKey(),
    /** Lower-cased allow-listed email the link was sent to */
    email: text('email').notNull(),
    tokenHash: text('token_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique('admin_setup_token_hash_unique').on(t.tokenHash)],
);
