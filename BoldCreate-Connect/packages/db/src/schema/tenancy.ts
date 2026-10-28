import {
  boolean,
  check,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { userTable, type OrgRole } from './identity.js';

export type OrgKeyState = 'key_pending' | 'ready';
export type OrgMemberStatusValue = 'active' | 'suspended';

// ─── organization ─────────────────────────────────────────────────────────────

export const organizationTable = pgTable(
  'organization',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => userTable.id),
    /** `key_pending` until the worker has created the organization's key pair. */
    keyState: text('key_state').$type<OrgKeyState>().notNull().default('key_pending'),
    deletionRequestedAt: timestamp('deletion_requested_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('organization_slug_unique').on(t.slug),
    check(
      'organization_name_length',
      sql`char_length(${t.name}) >= 3 AND char_length(${t.name}) <= 60`,
    ),
    check('organization_key_state_check', sql`${t.keyState} IN ('key_pending', 'ready')`),
    check('organization_slug_format', sql`${t.slug} ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'`),
  ],
);

// ─── organization_member ──────────────────────────────────────────────────────

export const organizationMemberTable = pgTable(
  'organization_member',
  {
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    role: text('role').$type<OrgRole>().notNull(),
    /** A suspended member behaves as a non-member until reinstated. */
    status: text('status').$type<OrgMemberStatusValue>().notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'organization_member_pk', columns: [t.organizationId, t.userId] }),
    check('organization_member_role_check', sql`${t.role} IN ('ADMIN', 'MEMBER', 'VIEWER')`),
    check('organization_member_status_check', sql`${t.status} IN ('active', 'suspended')`),
  ],
);

// ─── org_policy ───────────────────────────────────────────────────────────────

/** One row per organization that changed its policy; a null column means the default. */
export const orgPolicyTable = pgTable(
  'org_policy',
  {
    organizationId: uuid('organization_id')
      .primaryKey()
      .references(() => organizationTable.id, { onDelete: 'cascade' }),
    allowPersonalInstalls: boolean('allow_personal_installs'),
    allowPersonalApiKeys: boolean('allow_personal_api_keys'),
    maxPersonalKeyExpiryDays: integer('max_personal_key_expiry_days'),
    allowedKeyPresets: text('allowed_key_presets').array(),
    updatedBy: uuid('updated_by').references(() => userTable.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check(
      'org_policy_expiry_range',
      sql`${t.maxPersonalKeyExpiryDays} IS NULL OR ${t.maxPersonalKeyExpiryDays} BETWEEN 1 AND 90`,
    ),
    check(
      'org_policy_presets',
      sql`${t.allowedKeyPresets} IS NULL OR ${t.allowedKeyPresets} <@ ARRAY['agent', 'read_only']`,
    ),
  ],
);
