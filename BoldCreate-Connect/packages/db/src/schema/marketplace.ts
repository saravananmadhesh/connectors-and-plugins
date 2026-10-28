import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizationTable } from './tenancy.js';

export type PluginStatusValue = 'active' | 'deprecated' | 'suspended';
export type PluginVisibilityValue = 'public' | 'private';
export type PluginVersionStatusValue = 'pending' | 'approved' | 'published' | 'rejected' | 'yanked';
export type ComponentKindValue = 'mcp' | 'skill' | 'rule' | 'hook' | 'agent';

export type IngestionStatusValue = 'queued' | 'running' | 'succeeded' | 'failed';

// ─── plugin_source ────────────────────────────────────────────────────────────

/** A GitHub repository folder that plugins are ingested from. */
export const pluginSourceTable = pgTable(
  'plugin_source',
  {
    id: uuid('id').primaryKey(),
    owner: text('owner').notNull(),
    repository: text('repository').notNull(),
    /** Branch, tag or commit the operator asked for; resolved to a commit on every sync */
    ref: text('ref').notNull().default('main'),
    /** Folder of the plugin inside the repository; empty for the repository root */
    path: text('path').notNull().default(''),
    lastCommitSha: text('last_commit_sha'),
    lastSyncedAt: timestamp('last_synced_at', { withTimezone: true }),
    lastStatus: text('last_status').$type<IngestionStatusValue>(),
    lastError: text('last_error'),
    /** What the last successful sync did when it was not a plain ingestion, for the operator */
    lastNote: text('last_note'),
    /** Set on the plugin when it is first created from this source */
    featured: boolean('featured').notNull().default(false),
    verified: boolean('verified').notNull().default(false),
    visibility: text('visibility').$type<PluginVisibilityValue>().notNull().default('public'),
    createdBy: text('created_by').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('plugin_source_location_unique').on(t.owner, t.repository, t.ref, t.path),
    check('plugin_source_owner_format', sql`${t.owner} ~ '^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$'`),
    check('plugin_source_repository_format', sql`${t.repository} ~ '^[A-Za-z0-9._-]{1,100}$'`),
    check('plugin_source_visibility_check', sql`${t.visibility} IN ('public', 'private')`),
    check(
      'plugin_source_status_check',
      sql`${t.lastStatus} IS NULL OR ${t.lastStatus} IN ('queued', 'running', 'succeeded', 'failed')`,
    ),
  ],
);

// ─── plugin_ingestion ─────────────────────────────────────────────────────────

/** One sync attempt of a source: what was fetched and what came out. */
export const pluginIngestionTable = pgTable(
  'plugin_ingestion',
  {
    id: uuid('id').primaryKey(),
    sourceId: uuid('source_id')
      .notNull()
      .references(() => pluginSourceTable.id, { onDelete: 'cascade' }),
    status: text('status').$type<IngestionStatusValue>().notNull().default('queued'),
    commitSha: text('commit_sha'),
    pluginVersionId: uuid('plugin_version_id'),
    error: text('error'),
    requestedBy: text('requested_by').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp('finished_at', { withTimezone: true }),
  },
  (t) => [
    check(
      'plugin_ingestion_status_check',
      sql`${t.status} IN ('queued', 'running', 'succeeded', 'failed')`,
    ),
  ],
);

// ─── category ─────────────────────────────────────────────────────────────────

/** A catalog category operators manage; plugins are linked to any number of them. */
export const categoryTable = pgTable(
  'category',
  {
    id: uuid('id').primaryKey(),
    /** Stable lower-case identifier used in URLs and manifests; never changes after creation */
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('category_slug_unique').on(t.slug),
    check('category_slug_format', sql`${t.slug} ~ '^[a-z0-9][a-z0-9-]{0,38}[a-z0-9]$'`),
    check('category_name_length', sql`char_length(${t.name}) BETWEEN 1 AND 60`),
    check('category_description_length', sql`char_length(${t.description}) <= 200`),
  ],
);

// ─── plugin ───────────────────────────────────────────────────────────────────

export const pluginTable = pgTable(
  'plugin',
  {
    id: uuid('id').primaryKey(),
    /** Stable machine-readable name, globally unique */
    name: text('name').notNull(),
    displayName: text('display_name').notNull(),
    summary: text('summary').notNull(),
    description: text('description').notNull(),
    keywords: text('keywords')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    status: text('status').$type<PluginStatusValue>().notNull().default('active'),
    visibility: text('visibility').$type<PluginVisibilityValue>().notNull().default('public'),
    /** Organization that published the plugin, when it is not first-party */
    publisherOrganizationId: uuid('publisher_organization_id').references(
      () => organizationTable.id,
      { onDelete: 'restrict' },
    ),
    /** Source the plugin is ingested from; absent for plugins created by other means */
    sourceId: uuid('source_id').references(() => pluginSourceTable.id, { onDelete: 'set null' }),
    /** Highlighted by an operator */
    featured: boolean('featured').notNull().default(false),
    /** Checked by an operator */
    verified: boolean('verified').notNull().default(false),
    /** An operator changed the display fields; a sync keeps them instead of using the manifest */
    metadataEdited: boolean('metadata_edited').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('plugin_name_unique').on(t.name),
    check('plugin_name_format', sql`${t.name} ~ '^[a-z0-9]([a-z0-9-]{0,38}[a-z0-9])?$'`),
    check('plugin_summary_length', sql`char_length(${t.summary}) <= 200`),
    check('plugin_status_check', sql`${t.status} IN ('active', 'deprecated', 'suspended')`),
    check('plugin_visibility_check', sql`${t.visibility} IN ('public', 'private')`),
  ],
);

// ─── plugin_category ──────────────────────────────────────────────────────────

export const pluginCategoryTable = pgTable(
  'plugin_category',
  {
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categoryTable.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ name: 'plugin_category_pk', columns: [t.pluginId, t.categoryId] })],
);

// ─── plugin_version ───────────────────────────────────────────────────────────

export const pluginVersionTable = pgTable(
  'plugin_version',
  {
    id: uuid('id').primaryKey(),
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'restrict' }),
    version: text('version').notNull(),
    /** Sortable semver components */
    major: integer('major').notNull(),
    minor: integer('minor').notNull(),
    patch: integer('patch').notNull(),
    manifestSchemaVersion: text('manifest_schema_version').notNull(),
    /** Canonical manifest JSON, max 256 KB enforced at application layer */
    manifest: jsonb('manifest').notNull(),
    manifestSha256: text('manifest_sha256').notNull(),
    changelog: text('changelog'),
    publishedAt: timestamp('published_at', { withTimezone: true }).notNull().defaultNow(),
    status: text('status').$type<PluginVersionStatusValue>().notNull().default('published'),
    /** Set by operator for emergency block; denies all execution immediately */
    executionBlockedAt: timestamp('execution_blocked_at', { withTimezone: true }),
    /** Commit the version was ingested from */
    commitSha: text('commit_sha'),
    /** Archive of the plugin folder in blob storage: content hash and size */
    archiveSha256: text('archive_sha256'),
    archiveSizeBytes: integer('archive_size_bytes'),
    /** Scan report: files, hook commands, MCP servers, variables, skipped items, findings */
    scan: jsonb('scan'),
  },
  (t) => [
    unique('plugin_version_plugin_version_unique').on(t.pluginId, t.version),
    index('plugin_version_plugin_sort_idx').on(t.pluginId, t.major, t.minor, t.patch),
    check('plugin_version_semver_format', sql`${t.version} ~ '^[0-9]+\.[0-9]+\.[0-9]+$'`),
    check(
      'plugin_version_status_check',
      sql`${t.status} IN ('pending', 'approved', 'published', 'rejected', 'yanked')`,
    ),
  ],
);

// ─── component ────────────────────────────────────────────────────────────────

export const componentTable = pgTable(
  'component',
  {
    id: uuid('id').primaryKey(),
    pluginVersionId: uuid('plugin_version_id')
      .notNull()
      .references(() => pluginVersionTable.id, { onDelete: 'cascade' }),
    kind: text('kind').$type<ComponentKindValue>().notNull().default('mcp'),
    name: text('name').notNull(),
    description: text('description').notNull(),
    /** Pinned input/output schema and schema_hash */
    metadata: jsonb('metadata').notNull(),
    /** Archive of this component alone in blob storage; absent for MCP and for older versions */
    archiveSha256: text('archive_sha256'),
    archiveSizeBytes: integer('archive_size_bytes'),
  },
  (t) => [
    index('component_archive_sha256_idx').on(t.archiveSha256),
    unique('component_version_kind_name_unique').on(t.pluginVersionId, t.kind, t.name),
    check(
      'component_name_length',
      sql`char_length(${t.name}) >= 1 AND char_length(${t.name}) <= 60`,
    ),
    check('component_kind_check', sql`${t.kind} IN ('mcp', 'skill', 'rule', 'hook', 'agent')`),
  ],
);
