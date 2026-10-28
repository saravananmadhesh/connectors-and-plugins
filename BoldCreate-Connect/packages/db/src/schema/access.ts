import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { ScopeKind } from '../scope.js';
import { userTable } from './identity.js';
import { organizationTable } from './tenancy.js';
import { projectTable } from './project.js';

// ─── api_key ──────────────────────────────────────────────────────────────────

export const apiKeyTable = pgTable(
  'api_key',
  {
    id: uuid('id').primaryKey(),
    /** Stable public identifier (prefix shown to user) */
    keyId: text('key_id').notNull(),
    secretHash: text('secret_hash').notNull(),
    principalUserId: uuid('principal_user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'restrict' }),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'restrict' }),
    scopeType: text('scope').$type<ScopeKind>().notNull(),
    ownerUserId: uuid('user_id').references(() => userTable.id),
    /** Set for a session of a project user. */
    projectId: uuid('project_id').references(() => projectTable.id, { onDelete: 'restrict' }),
    /** Plugin ids a session is limited to; null or empty means all of the project's plugins. */
    plugins: text('plugins').array(),
    /** What a session may not do with tools: `{ disable: ['server.tool'], disableDestructive }`. */
    toolPolicy: jsonb('tool_policy').$type<{ disable?: string[]; disableDestructive?: boolean }>(),
    /** Auth configs a session names, keyed `<plugin uuid>/<server name>` to the auth config uuid. */
    authConfigs: jsonb('auth_configs').$type<Record<string, string>>(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => userTable.id),
    name: text('name').notNull(),
    lastFour: text('last_four').notNull(),
    /** Nonempty JSON array of KeyPermission values */
    permissions: text('permissions').array().notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
    lastUsedIp: text('last_used_ip'),
    rateLimitPerMinute: integer('rate_limit_per_minute').notNull().default(60),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('api_key_key_id_unique').on(t.keyId),
    check('api_key_scope_check', sql`${t.scopeType} IN ('org', 'user')`),
    check(
      'api_key_user_scope_shape',
      sql`${t.scopeType} != 'user' OR (${t.ownerUserId} IS NOT NULL AND ${t.projectId} IS NOT NULL)`,
    ),
    check(
      'api_key_org_scope_shape',
      sql`${t.scopeType} != 'org' OR (${t.ownerUserId} IS NULL AND ${t.projectId} IS NULL)`,
    ),
    check('api_key_project_scope', sql`${t.projectId} IS NULL OR ${t.scopeType} = 'user'`),
    // The prefix of the key id names the area: an org key is a For You or a Platform key and a
    // session key is a user key of a project.
    check(
      'api_key_kind_check',
      sql`(${t.scopeType} = 'org' AND left(${t.keyId}, 4) IN ('fyk_', 'plk_')) OR (${t.scopeType} = 'user' AND left(${t.keyId}, 4) = 'stk_')`,
    ),
    check('api_key_permissions_nonempty', sql`array_length(${t.permissions}, 1) > 0`),
    check('api_key_name_length', sql`char_length(${t.name}) >= 3 AND char_length(${t.name}) <= 60`),
    index('api_key_principal_idx').on(t.principalUserId, t.organizationId),
  ],
);
