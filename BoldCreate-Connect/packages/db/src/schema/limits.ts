import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { platformAdminIdentityTable } from './admin.js';

export type LimitSettingScope = 'global' | 'organization' | 'project';

/**
 * A stored override of a built-in limit. No row means the built-in value applies. One table holds
 * every limit key at every level, so a new limit or level needs no schema change.
 */
export const limitSettingTable = pgTable(
  'limit_setting',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull(),
    scope: text('scope').$type<LimitSettingScope>().notNull(),
    /** The organization or project the value applies to; null for the global value. */
    scopeId: uuid('scope_id'),
    value: integer('value').notNull(),
    /** After this time the row is ignored and the next level applies. */
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    reason: text('reason').notNull(),
    updatedBy: uuid('updated_by').references(() => platformAdminIdentityTable.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('limit_setting_key_format', sql`${t.key} ~ '^[a-z][a-z0-9_]{1,63}$'`),
    check('limit_setting_scope_check', sql`${t.scope} IN ('global', 'organization', 'project')`),
    check('limit_setting_scope_id_check', sql`(${t.scope} = 'global') = (${t.scopeId} IS NULL)`),
    check('limit_setting_value_positive', sql`${t.value} > 0`),
    check('limit_setting_reason_length', sql`char_length(${t.reason}) BETWEEN 1 AND 500`),
    uniqueIndex('limit_setting_global_unique')
      .on(t.key)
      .where(sql`${t.scope} = 'global'`),
    uniqueIndex('limit_setting_scoped_unique')
      .on(t.key, t.scope, t.scopeId)
      .where(sql`${t.scopeId} IS NOT NULL`),
    index('limit_setting_scope_idx').on(t.scope, t.scopeId),
  ],
);
