import { check, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export type OutboxStatusValue = 'pending' | 'delivered' | 'failed';

// ─── outbox ───────────────────────────────────────────────────────────────────

export const outboxTable = pgTable(
  'outbox',
  {
    id: uuid('id').primaryKey(),
    /** Discriminator for the worker to route delivery */
    eventType: text('event_type').notNull(),
    /** Serialized payload — erased after delivery */
    payload: text('payload'),
    status: text('status').$type<OutboxStatusValue>().notNull().default('pending'),
    attempts: integer('attempts').notNull().default(0),
    lastAttemptAt: timestamp('last_attempt_at', { withTimezone: true }),
    /** Last failure message, truncated; never returned over HTTP */
    lastError: text('last_error'),
    nextAttemptAt: timestamp('next_attempt_at', { withTimezone: true }).notNull().defaultNow(),
    deliveredAt: timestamp('delivered_at', { withTimezone: true }),
    /** Worker instance that claimed this row (prevents overlapping delivery) */
    leaseOwner: text('lease_owner'),
    /** Lease expiry — worker must renew or release before this time */
    leaseExpiresAt: timestamp('lease_expires_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('outbox_status_next_attempt_idx').on(t.status, t.nextAttemptAt),
    check('outbox_status_check', sql`${t.status} IN ('pending', 'delivered', 'failed')`),
    check('outbox_attempts_max', sql`${t.attempts} <= 6`),
  ],
);
