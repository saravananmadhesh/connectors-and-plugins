import { boolean, check, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { platformAdminIdentityTable } from './admin.js';

export type KillSwitchTargetKind =
  | 'plugin'
  | 'plugin_version'
  | 'plugin_source'
  | 'mcp_server'
  | 'api_key'
  | 'org';

export const KILL_SWITCH_TARGET_KINDS: readonly KillSwitchTargetKind[] = [
  'plugin',
  'plugin_version',
  'plugin_source',
  'mcp_server',
  'api_key',
  'org',
];

// ─── feature_flag ─────────────────────────────────────────────────────────────

export const featureFlagTable = pgTable(
  'feature_flag',
  {
    key: text('key').primaryKey(),
    enabled: boolean('enabled').notNull(),
    description: text('description').notNull().default(''),
    updatedBy: uuid('updated_by').references(() => platformAdminIdentityTable.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [check('feature_flag_key_format', sql`${t.key} ~ '^[a-z][a-z0-9_]{1,63}$'`)],
);

// ─── kill_switch ──────────────────────────────────────────────────────────────

export const killSwitchTable = pgTable(
  'kill_switch',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    targetKind: text('target_kind').$type<KillSwitchTargetKind>().notNull(),
    targetId: uuid('target_id').notNull(),
    reason: text('reason').notNull(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => platformAdminIdentityTable.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    liftedAt: timestamp('lifted_at', { withTimezone: true }),
    liftedBy: uuid('lifted_by').references(() => platformAdminIdentityTable.id),
    liftReason: text('lift_reason'),
  },
  (t) => [
    check(
      'kill_switch_target_kind_check',
      sql`${t.targetKind} IN ('plugin', 'plugin_version', 'plugin_source', 'mcp_server', 'api_key', 'org')`,
    ),
    check('kill_switch_reason_length', sql`char_length(${t.reason}) BETWEEN 1 AND 500`),
    uniqueIndex('kill_switch_active_unique')
      .on(t.targetKind, t.targetId)
      .where(sql`${t.liftedAt} IS NULL`),
  ],
);
