import {
  boolean,
  check,
  foreignKey,
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
import { sql } from 'drizzle-orm';
import type { ScopeKind } from '../scope.js';
import { userTable } from './identity.js';
import { organizationTable } from './tenancy.js';
import { projectTable } from './project.js';
import { componentTable, pluginTable, pluginVersionTable } from './marketplace.js';

export type InstallationStatusValue = 'disabled' | 'active';
export type UpdatePolicyValue = 'pinned' | 'follow_latest';

// ─── installation ─────────────────────────────────────────────────────────────

export const installationTable = pgTable(
  'installation',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'restrict' }),
    scopeType: text('scope').$type<ScopeKind>().notNull(),
    ownerUserId: uuid('user_id').references(() => userTable.id),
    projectId: uuid('project_id').references(() => projectTable.id, { onDelete: 'restrict' }),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => userTable.id),
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'restrict' }),
    pluginVersionId: uuid('plugin_version_id')
      .notNull()
      .references(() => pluginVersionTable.id, { onDelete: 'restrict' }),
    status: text('status').$type<InstallationStatusValue>().notNull().default('disabled'),
    /** `pinned` stays on the installed version; `follow_latest` moves to each newly published one */
    updatePolicy: text('update_policy').$type<UpdatePolicyValue>().notNull().default('pinned'),
    /** An organization install that no member can replace with their own */
    required: boolean('required').notNull().default(false),
    /** The enforced install above this one that disabled it; cleared when that install ends. */
    replacedByInstallationId: uuid('replaced_by_installation_id'),
    /** Bumped on every change to the stored variable values, so cached expansions can be dropped */
    variablesRevision: integer('variables_revision').notNull().default(0),
    installedBy: uuid('installed_by')
      .notNull()
      .references(() => userTable.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('installation_id_organization_unique').on(t.id, t.organizationId),
    check('installation_scope_check', sql`${t.scopeType} IN ('org', 'user', 'project')`),
    check('installation_status_check', sql`${t.status} IN ('disabled', 'active')`),
    check(
      'installation_update_policy_check',
      sql`${t.updatePolicy} IN ('pinned', 'follow_latest')`,
    ),
    check('installation_required_org_only', sql`${t.required} = false OR ${t.scopeType} = 'org'`),
    check(
      'installation_user_scope_shape',
      sql`${t.scopeType} != 'user' OR ${t.ownerUserId} IS NOT NULL`,
    ),
    check(
      'installation_org_scope_shape',
      sql`${t.scopeType} != 'org' OR (${t.ownerUserId} IS NULL AND ${t.projectId} IS NULL)`,
    ),
    check(
      'installation_project_scope_shape',
      sql`${t.scopeType} != 'project' OR (${t.projectId} IS NOT NULL AND ${t.ownerUserId} IS NULL)`,
    ),
    uniqueIndex('installation_org_scope_unique')
      .on(t.organizationId, t.pluginId)
      .where(sql`${t.scopeType} = 'org'`),
    uniqueIndex('installation_user_scope_unique')
      .on(t.organizationId, t.pluginId, t.ownerUserId)
      .where(sql`${t.scopeType} = 'user'`),
    uniqueIndex('installation_project_scope_unique')
      .on(t.organizationId, t.pluginId, t.projectId)
      .where(sql`${t.scopeType} = 'project'`),
    index('installation_project_idx').on(t.projectId),
    index('installation_org_plugin_idx').on(t.organizationId, t.pluginId, t.scopeType),
    index('installation_user_idx').on(t.ownerUserId),
  ],
);

// ─── installation_component ───────────────────────────────────────────────────

export const installationComponentTable = pgTable(
  'installation_component',
  {
    installationId: uuid('installation_id').notNull(),
    organizationId: uuid('organization_id').notNull(),
    componentId: uuid('component_id')
      .notNull()
      .references(() => componentTable.id, { onDelete: 'cascade' }),
    pluginVersionId: uuid('plugin_version_id')
      .notNull()
      .references(() => pluginVersionTable.id, { onDelete: 'restrict' }),
    enabled: boolean('enabled').notNull().default(false),
    /** Alias: [a-z][a-z0-9_]{0,47} */
    alias: text('alias'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'installation_component_pk', columns: [t.installationId, t.componentId] }),
    foreignKey({
      name: 'installation_component_installation_organization_fk',
      columns: [t.installationId, t.organizationId],
      foreignColumns: [installationTable.id, installationTable.organizationId],
    }).onDelete('cascade'),
    unique('installation_component_alias_unique').on(t.installationId, t.alias),
    check(
      'installation_component_alias_format',
      sql`${t.alias} IS NULL OR ${t.alias} ~ '^[a-z][a-z0-9_]{0,47}$'`,
    ),
  ],
);

// ─── installation_variable ────────────────────────────────────────────────────

/** One value the installer set for a variable the plugin version declares; sealed, write-only. */
export const installationVariableTable = pgTable(
  'installation_variable',
  {
    installationId: uuid('installation_id').notNull(),
    organizationId: uuid('organization_id').notNull(),
    /** Declared by the plugin version, or added by the installer: [A-Za-z0-9_-]{1,64} */
    name: text('name').notNull(),
    /** Envelope from the credentials package; the plaintext is never stored */
    valueSealed: text('value_sealed').notNull(),
    updatedBy: uuid('updated_by').references(() => userTable.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'installation_variable_pk', columns: [t.installationId, t.name] }),
    foreignKey({
      name: 'installation_variable_installation_organization_fk',
      columns: [t.installationId, t.organizationId],
      foreignColumns: [installationTable.id, installationTable.organizationId],
    }).onDelete('cascade'),
    check('installation_variable_name_format', sql`${t.name} ~ '^[A-Za-z0-9_-]{1,64}$'`),
  ],
);
