import {
  boolean,
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

export type IdempotencyStateValue = 'in_progress' | 'completed';

// ─── idempotency_key ──────────────────────────────────────────────────────────

export const idempotencyRecordTable = pgTable(
  'idempotency_key',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    /** `usr:<uuid>`, `key:<uuid>`, `workload:<callerId>` or `anon:<clientIp>`. */
    principalKey: text('principal_key').notNull(),
    method: text('method').notNull(),
    routeTemplate: text('route_template').notNull(),
    idemKey: text('idem_key').notNull(),
    requestHash: text('request_hash').notNull(),
    state: text('state').$type<IdempotencyStateValue>().notNull().default('in_progress'),
    responseStatus: integer('response_status'),
    /** Null for routes whose response carries a secret. */
    responseBody: jsonb('response_body'),
    responseHeaders: jsonb('response_headers').$type<Record<string, string>>(),
    secretResponse: boolean('secret_response').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (t) => [
    unique('idempotency_key_scope_unique').on(t.principalKey, t.method, t.routeTemplate, t.idemKey),
    index('idempotency_key_expires_at_idx').on(t.expiresAt),
    check('idempotency_key_state_check', sql`${t.state} IN ('in_progress', 'completed')`),
    check('idempotency_key_length', sql`char_length(${t.idemKey}) BETWEEN 1 AND 255`),
  ],
);
