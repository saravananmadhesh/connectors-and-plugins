import {
  type AnyPgColumn,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizationTable } from './tenancy.js';
import { projectTable } from './project.js';

export type UserStatus = 'active' | 'suspended' | 'deleted';
/** `human` signs in; `external` is a project user, a host product's own user. */
export type UserKind = 'human' | 'external';
export type EmailTokenPurpose = 'verification' | 'reset' | 'invite' | 'email_change';
export type OrgRole = 'ADMIN' | 'MEMBER' | 'VIEWER';

// ─── user ─────────────────────────────────────────────────────────────────────

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey(),
    email: text('email').notNull(),
    emailNormalized: text('email_normalized').notNull(),
    displayName: text('display_name').notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    starterOrgProvisionedAt: timestamp('starter_org_provisioned_at', { withTimezone: true }),
    status: text('status').$type<UserStatus>().notNull().default('active'),
    kind: text('kind').$type<UserKind>().notNull().default('human'),
    /** Set for a project user: the host application the user belongs to. */
    projectId: uuid('project_id').references((): AnyPgColumn => projectTable.id, {
      onDelete: 'restrict',
    }),
    externalRef: text('external_ref'),
    failedLoginCount: integer('failed_login_count').notNull().default(0),
    lockedUntil: timestamp('locked_until', { withTimezone: true }),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    /** Set when the account is deleted and its row reduced to a tombstone. */
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('user_email_normalized_unique').on(t.emailNormalized),
    check('user_kind_check', sql`${t.kind} IN ('human', 'external')`),
    check(
      'user_kind_refs_check',
      sql`(${t.kind} = 'human' AND ${t.projectId} IS NULL AND ${t.externalRef} IS NULL) OR (${t.kind} = 'external' AND ${t.externalRef} IS NOT NULL AND ${t.projectId} IS NOT NULL)`,
    ),
    check(
      'user_external_ref_length',
      sql`${t.externalRef} IS NULL OR char_length(${t.externalRef}) BETWEEN 1 AND 255`,
    ),
    unique('user_project_ref_unique').on(t.projectId, t.externalRef),
    check('user_status_check', sql`${t.status} IN ('active', 'suspended', 'deleted')`),
    check('user_email_length', sql`char_length(${t.email}) <= 254`),
    check('user_display_name_length', sql`char_length(${t.displayName}) <= 80`),
  ],
);

// ─── session ──────────────────────────────────────────────────────────────────

export const sessionTable = pgTable(
  'session',
  {
    id: uuid('id').primaryKey(),
    tokenHash: text('token_hash').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    idleExpiresAt: timestamp('idle_expires_at', { withTimezone: true }).notNull(),
    absoluteExpiresAt: timestamp('absolute_expires_at', { withTimezone: true }).notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    ip: text('ip'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('session_token_hash_unique').on(t.tokenHash),
    index('session_user_id_idx').on(t.userId),
    check(
      'session_user_agent_length',
      sql`user_agent IS NULL OR char_length(${t.userAgent}) <= 400`,
    ),
  ],
);

// ─── email_token ──────────────────────────────────────────────────────────────

export const emailTokenTable = pgTable(
  'email_token',
  {
    id: uuid('id').primaryKey(),
    purpose: text('purpose').$type<EmailTokenPurpose>().notNull(),
    tokenHash: text('token_hash').notNull(),
    /** For verification, reset and email change: the target user. For invite: null (matched by email). */
    targetUserId: uuid('target_user_id').references(() => userTable.id, { onDelete: 'cascade' }),
    /** Normalized email: the invitee of an invite, or the new address of an email change. */
    targetEmailNormalized: text('target_email_normalized'),
    /** Invite-only fields */
    orgId: uuid('org_id').references(() => organizationTable.id, { onDelete: 'cascade' }),
    invitedRole: text('invited_role').$type<OrgRole>(),
    inviterId: uuid('inviter_id').references(() => userTable.id, { onDelete: 'set null' }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('email_token_hash_unique').on(t.tokenHash),
    index('email_token_purpose_target_idx').on(t.purpose, t.targetUserId),
    index('email_token_purpose_email_idx').on(t.purpose, t.targetEmailNormalized),
    check(
      'email_token_purpose_check',
      sql`${t.purpose} IN ('verification', 'reset', 'invite', 'email_change')`,
    ),
    check(
      'email_token_invited_role_check',
      sql`${t.invitedRole} IS NULL OR ${t.invitedRole} IN ('ADMIN', 'MEMBER', 'VIEWER')`,
    ),
    // Purpose-specific shape: verification/reset require targetUserId; invite requires orgId + invitedRole + targetEmailNormalized
    check(
      'email_token_verification_shape',
      sql`purpose NOT IN ('verification','reset') OR (${t.targetUserId} IS NOT NULL AND ${t.orgId} IS NULL)`,
    ),
    check(
      'email_token_email_change_shape',
      sql`purpose != 'email_change' OR (${t.targetUserId} IS NOT NULL AND ${t.targetEmailNormalized} IS NOT NULL AND ${t.orgId} IS NULL)`,
    ),
    check(
      'email_token_invite_shape',
      sql`purpose != 'invite' OR (${t.orgId} IS NOT NULL AND ${t.invitedRole} IS NOT NULL AND ${t.targetEmailNormalized} IS NOT NULL)`,
    ),
  ],
);

// ─── auth_identity ────────────────────────────────────────────────────────────

/**
 * One way a user proves who they are. For provider `password` the subject is the normalized
 * email and `secretHash` holds the Argon2id hash; other providers need no schema change.
 */
export const authIdentityTable = pgTable(
  'auth_identity',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(),
    subject: text('subject').notNull(),
    secretHash: text('secret_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('auth_identity_provider_subject_unique').on(t.provider, t.subject),
    unique('auth_identity_user_provider_unique').on(t.userId, t.provider),
    check('auth_identity_provider_format', sql`${t.provider} ~ '^[a-z][a-z0-9_]{1,31}$'`),
    check(
      'auth_identity_password_secret',
      sql`${t.provider} <> 'password' OR ${t.secretHash} IS NOT NULL`,
    ),
  ],
);
