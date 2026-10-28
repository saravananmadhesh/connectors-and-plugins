import {
  check,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizationTable } from './tenancy.js';

export type OrgKeyStatusValue = 'active' | 'retired' | 'destroyed';

// ─── org_key ──────────────────────────────────────────────────────────────────

export const orgKeyTable = pgTable(
  'org_key',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'restrict' }),
    version: integer('version').notNull(),
    /** Raw X25519 public key, base64url. */
    publicKey: text('public_key').notNull(),
    /** The private key wrapped by the key management service, base64url. */
    wrappedPrivateKey: text('wrapped_private_key').notNull(),
    kmsKeyId: text('kms_key_id').notNull(),
    kmsKeyVersion: text('kms_key_version').notNull(),
    status: text('status').$type<OrgKeyStatusValue>().notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    retiredAt: timestamp('retired_at', { withTimezone: true }),
  },
  (t) => [
    unique('org_key_org_version_unique').on(t.organizationId, t.version),
    uniqueIndex('org_key_one_active_per_org')
      .on(t.organizationId)
      .where(sql`${t.status} = 'active'`),
    check('org_key_status_check', sql`${t.status} IN ('active', 'retired', 'destroyed')`),
    check('org_key_version_positive', sql`${t.version} > 0`),
  ],
);
