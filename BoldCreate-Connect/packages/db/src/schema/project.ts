import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { userTable } from './identity.js';
import { pluginTable } from './marketplace.js';
import { organizationTable } from './tenancy.js';

export type ProjectStatus = 'active' | 'suspended' | 'revoked';
/** `for_you` is the organization's own area (one per organization); `platform` projects serve host apps. */
export type ProjectKind = 'for_you' | 'platform';
export type UserInstallMode = 'off' | 'allowlist' | 'any';

// ─── project ──────────────────────────────────────────────────────────────────

/** One host application of an organization. Its end users are project users. */
export const projectTable = pgTable(
  'project',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'restrict' }),
    name: text('name').notNull(),
    kind: text('kind').$type<ProjectKind>().notNull().default('platform'),
    status: text('status').$type<ProjectStatus>().notNull().default('active'),
    /** `https` origins allowed as `returnUrl` when a connection flow starts. */
    returnOrigins: text('return_origins')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    /** Whether the project's users may install plugins for themselves, and from which set. */
    userInstallMode: text('user_install_mode').$type<UserInstallMode>().notNull().default('off'),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => userTable.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('project_organization_name_unique').on(t.organizationId, t.name),
    check('project_name_length', sql`char_length(${t.name}) BETWEEN 1 AND 60`),
    check('project_kind_check', sql`${t.kind} IN ('for_you', 'platform')`),
    uniqueIndex('project_for_you_unique')
      .on(t.organizationId)
      .where(sql`${t.kind} = 'for_you'`),
    check('project_status_check', sql`${t.status} IN ('active', 'suspended', 'revoked')`),
    check(
      'project_user_install_mode_check',
      sql`${t.userInstallMode} IN ('off', 'allowlist', 'any')`,
    ),
    check('project_return_origins_count', sql`cardinality(${t.returnOrigins}) <= 20`),
  ],
);

// ─── project_key ──────────────────────────────────────────────────────────────

/** A key the host application's server presents. Belongs to the project, not to its creator. */
export const projectKeyTable = pgTable(
  'project_key',
  {
    id: uuid('id').primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    /** Public part: `prk_` plus 16 hex characters. */
    keyId: text('key_id').notNull().unique(),
    /** SHA-256 of the secret. */
    secretHash: text('secret_hash').notNull(),
    lastFour: text('last_four').notNull(),
    scopes: text('scopes').array().notNull(),
    /** Null means any address. */
    allowedCidrs: text('allowed_cidrs').array(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => userTable.id, { onDelete: 'restrict' }),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
    lastUsedIp: text('last_used_ip'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('project_key_id_format', sql`${t.keyId} ~ '^prk_[0-9a-f]{16}$'`),
    check('project_key_scopes_count', sql`cardinality(${t.scopes}) BETWEEN 1 AND 20`),
    check(
      'project_key_scopes_allowed',
      sql`${t.scopes} <@ ARRAY['tools:read', 'sessions:read', 'sessions:write', 'connections:read', 'connections:write', 'auth-configs:read', 'auth-configs:write', 'plugins:read', 'plugins:write', 'observability:read']::text[]`,
    ),
    check(
      'project_key_cidrs_count',
      sql`${t.allowedCidrs} IS NULL OR cardinality(${t.allowedCidrs}) BETWEEN 1 AND 20`,
    ),
    check('project_key_expiry_after_creation', sql`${t.expiresAt} > ${t.createdAt}`),
    index('project_key_project_idx').on(t.projectId),
  ],
);

// ─── allowed catalog and plugin sets ──────────────────────────────────────────

/** A plugin the project's users may install for themselves. */
export const projectAllowedPluginTable = pgTable(
  'project_allowed_plugin',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'restrict' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ name: 'project_allowed_plugin_pk', columns: [t.projectId, t.pluginId] })],
);

/** A named group of plugins the host can hand to a session or allow in one step. */
export const projectPluginSetTable = pgTable(
  'project_plugin_set',
  {
    id: uuid('id').primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('project_plugin_set_name_unique').on(t.projectId, t.name),
    check('project_plugin_set_name_length', sql`char_length(${t.name}) BETWEEN 1 AND 60`),
    index('project_plugin_set_project_idx').on(t.projectId),
  ],
);

export const projectPluginSetMemberTable = pgTable(
  'project_plugin_set_member',
  {
    setId: uuid('set_id')
      .notNull()
      .references(() => projectPluginSetTable.id, { onDelete: 'cascade' }),
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'restrict' }),
  },
  (t) => [primaryKey({ name: 'project_plugin_set_member_pk', columns: [t.setId, t.pluginId] })],
);

// ─── project_idempotency ──────────────────────────────────────────────────────

/**
 * What a project call answered under an idempotency key, so a repeat with the same body gets the
 * same answer. The response is sealed to the organization because it may carry a token shown once.
 */
export const projectIdempotencyTable = pgTable(
  'project_idempotency',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    route: text('route').notNull(),
    key: text('key').notNull(),
    requestSha256: text('request_sha256').notNull(),
    responseStatus: integer('response_status').notNull(),
    responseSealed: text('response_sealed').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (t) => [
    primaryKey({ name: 'project_idempotency_pk', columns: [t.projectId, t.route, t.key] }),
    check('project_idempotency_key_length', sql`char_length(${t.key}) BETWEEN 1 AND 255`),
    index('project_idempotency_expires_idx').on(t.expiresAt),
  ],
);

// ─── project_webhook ──────────────────────────────────────────────────────────

export type WebhookDeliveryStatus = 'pending' | 'delivered' | 'failed';

/** Where a project's events are sent. One per project. The secret is sealed and never read back. */
export const projectWebhookTable = pgTable(
  'project_webhook',
  {
    projectId: uuid('project_id')
      .primaryKey()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    /** The project's organization, kept here so the worker can open the secret without a join. */
    organizationId: uuid('organization_id').notNull(),
    url: text('url').notNull(),
    secretSealed: text('secret_sealed').notNull(),
    events: text('events').array().notNull(),
    enabled: boolean('enabled').notNull().default(true),
    /** The last audit event turned into a delivery: its time with microseconds and its id. */
    cursorAt: text('cursor_at').notNull(),
    cursorId: uuid('cursor_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('project_webhook_events_count', sql`cardinality(${t.events}) BETWEEN 1 AND 8`),
    check('project_webhook_url_length', sql`char_length(${t.url}) BETWEEN 8 AND 2048`),
  ],
);

/** One event on its way to a project's webhook, and what came of each send. */
export const projectWebhookDeliveryTable = pgTable(
  'project_webhook_delivery',
  {
    id: uuid('id').primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    /** The id of the audit event the delivery carries. */
    eventId: uuid('event_id').notNull(),
    eventType: text('event_type').notNull(),
    /** The JSON body that is sent, built when the event is picked up. */
    payload: text('payload').notNull(),
    status: text('status').$type<WebhookDeliveryStatus>().notNull().default('pending'),
    attempts: integer('attempts').notNull().default(0),
    nextAttemptAt: timestamp('next_attempt_at', { withTimezone: true }),
    lastStatusCode: integer('last_status_code'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('project_webhook_delivery_event_unique').on(t.projectId, t.eventId),
    check(
      'project_webhook_delivery_status_check',
      sql`${t.status} IN ('pending', 'delivered', 'failed')`,
    ),
    index('project_webhook_delivery_due_idx').on(t.status, t.nextAttemptAt),
    index('project_webhook_delivery_project_idx').on(t.projectId, t.createdAt, t.id),
  ],
);
