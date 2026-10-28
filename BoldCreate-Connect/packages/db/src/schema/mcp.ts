import {
  boolean,
  check,
  foreignKey,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { userTable } from './identity.js';
import { projectTable } from './project.js';
import { installationComponentTable, installationTable } from './installation.js';
import { pluginTable } from './marketplace.js';

export type McpAuthType = 'none' | 'api_key' | 'oauth_dcr' | 'oauth_client';
export type McpHealth = 'unknown' | 'healthy' | 'degraded' | 'unreachable';
export type McpTokenStatus = 'active' | 'needs_reauth';
/** How a connection to a server is made; `user_form` is held for a hosted form and not offered yet. */
export type AuthConfigMode = 'dcr' | 'oauth_client' | 'shared_secret' | 'user_form';
export type AuthConfigStatus = 'active' | 'disabled';
/** What a connection holds: OAuth tokens, one API key, or a set of values. */
export type ConnectionKind = 'oauth' | 'api_key' | 'env';

/** One tool as the upstream server described it. */
export interface McpToolRecord {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  /** What the server's `destructiveHint` says; absent when it said nothing. */
  destructive?: boolean;
}

/** What discovery learned about the upstream authorization server. */
export interface McpOAuthMetadata {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  registrationEndpoint?: string;
  /** The protected resource the tokens are for (RFC 8707). */
  resource: string;
  scopes?: string[];
}

// ─── mcp_server ───────────────────────────────────────────────────────────────

/**
 * How one installed MCP component is reached: its auth type and secrets, what discovery learned,
 * its health, and the tools last listed. A component without a row connects with no auth.
 */
export const mcpServerTable = pgTable(
  'mcp_server',
  {
    installationId: uuid('installation_id').notNull(),
    componentId: uuid('component_id').notNull(),
    organizationId: uuid('organization_id').notNull(),
    authType: text('auth_type').$type<McpAuthType>().notNull().default('none'),
    /** Envelope of the shared API key; the plaintext is never stored */
    apiKeySealed: text('api_key_sealed'),
    apiKeyLastFour: text('api_key_last_four'),
    oauthClientId: text('oauth_client_id'),
    oauthClientSecretSealed: text('oauth_client_secret_sealed'),
    /** Space-separated scopes to ask for at sign-in; the discovered ones apply when null */
    oauthScopes: text('oauth_scopes'),
    oauthMetadata: jsonb('oauth_metadata').$type<McpOAuthMetadata>(),
    /** Budget of one tool call in milliseconds; the gateway default applies when null */
    callTimeoutMs: integer('call_timeout_ms'),
    health: text('health').$type<McpHealth>().notNull().default('unknown'),
    healthCheckedAt: timestamp('health_checked_at', { withTimezone: true }),
    /** Classified code, never upstream text */
    lastError: text('last_error'),
    tools: jsonb('tools')
      .$type<McpToolRecord[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    toolsHash: text('tools_hash'),
    toolsRefreshedAt: timestamp('tools_refreshed_at', { withTimezone: true }),
    revision: integer('revision').notNull().default(1),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'mcp_server_pk', columns: [t.installationId, t.componentId] }),
    foreignKey({
      name: 'mcp_server_installation_component_fk',
      columns: [t.installationId, t.componentId],
      foreignColumns: [
        installationComponentTable.installationId,
        installationComponentTable.componentId,
      ],
    }).onDelete('cascade'),
    foreignKey({
      name: 'mcp_server_installation_organization_fk',
      columns: [t.installationId, t.organizationId],
      foreignColumns: [installationTable.id, installationTable.organizationId],
    }).onDelete('cascade'),
    check(
      'mcp_server_auth_type_check',
      sql`${t.authType} IN ('none', 'api_key', 'oauth_dcr', 'oauth_client')`,
    ),
    check(
      'mcp_server_health_check',
      sql`${t.health} IN ('unknown', 'healthy', 'degraded', 'unreachable')`,
    ),
    check(
      'mcp_server_call_timeout_range',
      sql`${t.callTimeoutMs} IS NULL OR (${t.callTimeoutMs} >= 1000 AND ${t.callTimeoutMs} <= 120000)`,
    ),
    index('mcp_server_org_idx').on(t.organizationId),
  ],
);

// ─── auth_config ──────────────────────────────────────────────────────────────

/**
 * How a project's users sign in to one MCP server of a plugin: several per server, one of them the
 * default. The server is named by plugin and name, which hold across versions, so a config applies
 * to the project's install and to a user's own install alike. Values are sealed and never read
 * back. A connection keeps the config it was made with.
 */
export const authConfigTable = pgTable(
  'auth_config',
  {
    id: uuid('id').primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    pluginId: uuid('plugin_id')
      .notNull()
      .references(() => pluginTable.id, { onDelete: 'cascade' }),
    /** The name of an MCP component of the plugin; checked where configs are written. */
    serverName: text('server_name').notNull(),
    name: text('name').notNull(),
    authMode: text('auth_mode').$type<AuthConfigMode>().notNull(),
    /** Envelope of the key or values every user of the project shares (`shared_secret`). */
    secretSealed: text('secret_sealed'),
    secretLastFour: text('secret_last_four'),
    oauthClientId: text('oauth_client_id'),
    oauthClientSecretSealed: text('oauth_client_secret_sealed'),
    /** Space-separated scopes to ask for at sign-in; the discovered ones apply when null */
    oauthScopes: text('oauth_scopes'),
    oauthMetadata: jsonb('oauth_metadata').$type<McpOAuthMetadata>(),
    isDefault: boolean('is_default').notNull().default(false),
    status: text('status').$type<AuthConfigStatus>().notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('auth_config_project_server_name_unique').on(
      t.projectId,
      t.pluginId,
      t.serverName,
      t.name,
    ),
    uniqueIndex('auth_config_one_default_idx')
      .on(t.projectId, t.pluginId, t.serverName)
      .where(sql`${t.isDefault}`),
    check(
      'auth_config_mode_check',
      sql`${t.authMode} IN ('dcr', 'oauth_client', 'shared_secret', 'user_form')`,
    ),
    check('auth_config_status_check', sql`${t.status} IN ('active', 'disabled')`),
    check(
      'auth_config_name_length',
      sql`char_length(${t.name}) >= 1 AND char_length(${t.name}) <= 60`,
    ),
    index('auth_config_plugin_idx').on(t.pluginId),
  ],
);

// ─── mcp_oauth_token ──────────────────────────────────────────────────────────

/** One member's tokens for one MCP server; sealed, and never visible to another member. */
export const mcpOAuthTokenTable = pgTable(
  'mcp_oauth_token',
  {
    /** Addresses a connection in routes; the primary key stays the natural one. */
    id: uuid('id').notNull().defaultRandom(),
    installationId: uuid('installation_id').notNull(),
    componentId: uuid('component_id').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    organizationId: uuid('organization_id').notNull(),
    /** Empty for a connection that holds an API key or values instead of OAuth tokens. */
    accessSealed: text('access_sealed'),
    refreshSealed: text('refresh_sealed'),
    kind: text('kind').$type<ConnectionKind>().notNull().default('oauth'),
    /** Envelope of the key or values a connection of kind `api_key` or `env` holds. */
    credentialsSealed: text('credentials_sealed'),
    /** The names of the values a connection of kind `env` holds, so a read needs no unsealing. */
    valueNames: text('value_names').array(),
    /** The auth config the connection was made with; changing the config does not change it. */
    authConfigId: uuid('auth_config_id').references(() => authConfigTable.id, {
      onDelete: 'set null',
    }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    scope: text('scope'),
    status: text('status').$type<McpTokenStatus>().notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({
      name: 'mcp_oauth_token_pk',
      columns: [t.installationId, t.componentId, t.userId],
    }),
    foreignKey({
      name: 'mcp_oauth_token_server_fk',
      columns: [t.installationId, t.componentId],
      foreignColumns: [mcpServerTable.installationId, mcpServerTable.componentId],
    }).onDelete('cascade'),
    unique('mcp_oauth_token_id_unique').on(t.id),
    check('mcp_oauth_token_status_check', sql`${t.status} IN ('active', 'needs_reauth')`),
    check('mcp_oauth_token_kind_check', sql`${t.kind} IN ('oauth', 'api_key', 'env')`),
    check(
      'mcp_oauth_token_credentials_shape',
      sql`(${t.kind} = 'oauth' AND ${t.accessSealed} IS NOT NULL) OR (${t.kind} <> 'oauth' AND ${t.credentialsSealed} IS NOT NULL)`,
    ),
    index('mcp_oauth_token_auth_config_idx').on(t.authConfigId),
  ],
);

// ─── mcp_oauth_state ──────────────────────────────────────────────────────────

/** A pending authorization: single use, short lived, bound to the member and server that began it. */
export const mcpOAuthStateTable = pgTable(
  'mcp_oauth_state',
  {
    /** SHA-256 of the state value handed to the browser */
    stateHash: text('state_hash').primaryKey(),
    installationId: uuid('installation_id').notNull(),
    componentId: uuid('component_id').notNull(),
    organizationId: uuid('organization_id').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    /** Envelope of the PKCE verifier */
    codeVerifierSealed: text('code_verifier_sealed').notNull(),
    redirectUri: text('redirect_uri').notNull(),
    /** The auth config the sign-in was started under; the connection is made with it. */
    authConfigId: uuid('auth_config_id').references(() => authConfigTable.id, {
      onDelete: 'cascade',
    }),
    /** Set only when a project call started the flow; the callback then needs no session. */
    projectId: uuid('project_id').references(() => projectTable.id, { onDelete: 'cascade' }),
    returnUrl: text('return_url'),
    clientState: text('client_state'),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check(
      'mcp_oauth_state_return_fields_check',
      sql`${t.projectId} IS NOT NULL OR (${t.returnUrl} IS NULL AND ${t.clientState} IS NULL)`,
    ),
    check(
      'mcp_oauth_state_client_state_length',
      sql`${t.clientState} IS NULL OR char_length(${t.clientState}) <= 128`,
    ),
    foreignKey({
      name: 'mcp_oauth_state_server_fk',
      columns: [t.installationId, t.componentId],
      foreignColumns: [mcpServerTable.installationId, mcpServerTable.componentId],
    }).onDelete('cascade'),
    index('mcp_oauth_state_expires_idx').on(t.expiresAt),
  ],
);
