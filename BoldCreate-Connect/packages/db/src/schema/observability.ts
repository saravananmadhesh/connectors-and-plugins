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

export type ErrorGroupStatus = 'unresolved' | 'resolved' | 'ignored';
export type OpsEventSeverity = 'info' | 'warning' | 'error';

// ─── error_group ──────────────────────────────────────────────────────────────

/** One row per distinct failure, found by its fingerprint. Platform data, not tenant data. */
export const errorGroupTable = pgTable(
  'error_group',
  {
    id: uuid('id').primaryKey(),
    fingerprint: text('fingerprint').notNull(),
    service: text('service').notNull(),
    area: text('area'),
    title: text('title').notNull(),
    status: text('status').$type<ErrorGroupStatus>().notNull().default('unresolved'),
    count: integer('count').notNull().default(1),
    firstSeen: timestamp('first_seen', { withTimezone: true }).notNull().defaultNow(),
    lastSeen: timestamp('last_seen', { withTimezone: true }).notNull().defaultNow(),
    appVersion: text('app_version'),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
    resolvedBy: text('resolved_by'),
  },
  (t) => [
    unique('error_group_fingerprint_unique').on(t.fingerprint),
    index('error_group_status_last_seen_idx').on(t.status, t.lastSeen),
    index('error_group_service_last_seen_idx').on(t.service, t.lastSeen),
    // The unfiltered list, newest first, and the cut-off the retention job and dated delete use.
    index('error_group_last_seen_idx').on(t.lastSeen, t.id),
    check('error_group_status_check', sql`${t.status} IN ('unresolved', 'resolved', 'ignored')`),
  ],
);

// ─── error_event ──────────────────────────────────────────────────────────────

/** A sampled occurrence of a group. Removed by the retention job. */
export const errorEventTable = pgTable(
  'error_event',
  {
    id: uuid('id').primaryKey(),
    groupId: uuid('group_id')
      .notNull()
      .references(() => errorGroupTable.id, { onDelete: 'cascade' }),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
    environment: text('environment').notNull(),
    appVersion: text('app_version'),
    instanceId: text('instance_id'),
    requestId: text('request_id'),
    traceId: text('trace_id'),
    /** Organization uuid for filtering only; not a tenant boundary. */
    orgId: uuid('org_id'),
    stack: text('stack'),
    context: jsonb('context').$type<Record<string, unknown>>(),
  },
  (t) => [
    index('error_event_occurred_at_idx').on(t.occurredAt),
    index('error_event_group_occurred_at_idx').on(t.groupId, t.occurredAt),
  ],
);

// ─── ops_event ────────────────────────────────────────────────────────────────

/** A key operational event: deploy, failed job, startup check, dependency change, security. */
export const opsEventTable = pgTable(
  'ops_event',
  {
    id: uuid('id').primaryKey(),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
    service: text('service').notNull(),
    kind: text('kind').notNull(),
    severity: text('severity').$type<OpsEventSeverity>().notNull(),
    environment: text('environment'),
    appVersion: text('app_version'),
    instanceId: text('instance_id'),
    orgId: uuid('org_id'),
    detail: jsonb('detail').$type<Record<string, unknown>>(),
  },
  (t) => [
    index('ops_event_occurred_at_idx').on(t.occurredAt),
    index('ops_event_kind_occurred_at_idx').on(t.kind, t.occurredAt),
    index('ops_event_service_occurred_at_idx').on(t.service, t.occurredAt),
    index('ops_event_severity_occurred_at_idx').on(t.severity, t.occurredAt),
    check('ops_event_severity_check', sql`${t.severity} IN ('info', 'warning', 'error')`),
  ],
);
