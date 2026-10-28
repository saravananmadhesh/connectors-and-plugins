import { check, index, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── audit_log ────────────────────────────────────────────────────────────────
// Deliberately no tenant FKs so deletion preserves evidence.

export const auditLogTable = pgTable(
  'audit_log',
  {
    id: uuid('id').primaryKey(),
    /** Actor — may be a user ID, admin identity ID, or system label */
    actorId: text('actor_id').notNull(),
    actorKind: text('actor_kind').notNull(),
    action: text('action').notNull(),
    /** Target resource type and ID */
    targetKind: text('target_kind'),
    targetId: text('target_id'),
    /** Bounded context snapshot — no secrets */
    context: text('context'),
    /** Organization the event belongs to; no foreign key so deletion preserves evidence. */
    orgId: uuid('org_id'),
    /** Project and project user an event concerns; no foreign keys so deletion preserves evidence. */
    projectId: uuid('project_id'),
    subjectUserId: uuid('subject_user_id'),
    result: text('result').notNull().default('success'),
    /** Client-generated so a writer that retries cannot insert the same event twice. */
    eventId: uuid('event_id').notNull().defaultRandom(),
    requestId: text('request_id'),
    ip: text('ip'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('audit_log_actor_idx').on(t.actorId, t.actorKind),
    index('audit_log_target_idx').on(t.targetKind, t.targetId),
    index('audit_log_created_at_idx').on(t.createdAt),
    index('audit_log_org_created_idx').on(t.orgId, t.createdAt),
    index('audit_log_project_created_idx').on(t.projectId, t.createdAt),
    unique('audit_log_event_unique').on(t.eventId, t.createdAt),
    check('audit_log_result_check', sql`${t.result} IN ('success', 'denied', 'failure')`),
  ],
);
