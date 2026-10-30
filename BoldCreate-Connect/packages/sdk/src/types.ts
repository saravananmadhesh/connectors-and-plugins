/** Shapes of what the API sends. Dates are ISO 8601 text; ids are text with a short prefix. */

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

export interface PageOptions {
  cursor?: string | undefined;
  limit?: number | undefined;
}

export type PluginKind = 'mcp' | 'skill' | 'rule' | 'hook' | 'agent';
export type FileKind = 'skill' | 'rule' | 'hook' | 'agent';
export type InstallMode = 'off' | 'allowlist' | 'any';

export interface ProjectUser {
  id: string;
  userId: string;
  displayName: string;
  status: 'active' | 'suspended';
  createdAt: string;
  lastSeenAt: string | null;
  sessionCount: number;
  connectionCount: number;
  lastSyncedAt: string | null;
  connectionsMissing: number;
}

export interface ProjectPlugin {
  pluginId: string;
  name: string;
  displayName: string;
  versionId: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  /** Servers whose config of the requested name already existed and was left as it was. */
  existingAuthConfigs?: string[] | undefined;
  /** On the project's plugin list: where the plugin stands and how each MCP server signs in. */
  setup?:
    | { status: 'ready' | 'needs_values' | 'no_sign_in' | 'no_auth'; missing: string[] }
    | undefined;
  servers?:
    | {
        name: string;
        componentId: string;
        authMode: 'dcr' | 'oauth_client' | 'shared_secret' | 'user_form' | null;
        defaultAuthConfigId: string | null;
      }[]
    | undefined;
}

/** How the users of a project sign in to one MCP server, given when a plugin is added. */
export type PluginAuthConfigInput = {
  name: string;
  isDefault?: boolean;
} & (
  | { authMode: 'dcr'; scopes?: string }
  | { authMode: 'oauth_client'; clientId: string; clientSecret?: string; scopes?: string }
  | { authMode: 'shared_secret'; secret: string }
);

/** What `plugins.add` takes: the version, how each MCP server signs in (by server name) and variable values. */
export interface AddPluginOptions {
  versionId?: string;
  authConfigs?: Record<string, PluginAuthConfigInput>;
  variables?: Record<string, string | null>;
}

/** What a user still has to do before one server of a plugin can be used. */
export type ConnectSetup =
  | { kind: 'none' }
  | { kind: 'connect' }
  | { kind: 'variables'; names: string[] }
  | { kind: 'auth_config_missing' };

export interface UserPluginConnection {
  id: string;
  status: 'active' | 'needs_reauth';
  expiresAt: string | null;
  connectedAt: string;
}

export interface UserPlugin {
  pluginId: string;
  name: string;
  displayName: string;
  source: 'user' | 'project';
  removable: boolean;
  versionId: string;
  version: string;
  latestVersionId: string;
  updateAvailable: boolean;
  installedAt: string;
  updatedAt: string;
  components: { componentId: string; kind: string; name: string; enabled: boolean }[];
  variables: { name: string; secret: boolean; isSet: boolean }[];
  mcp: {
    componentId: string;
    serverName: string;
    authConfigId: string | null;
    authMode: 'none' | 'api_key' | 'oauth_dcr' | 'oauth_client';
    setup: ConnectSetup;
    ready: boolean;
    connection?: UserPluginConnection | null | undefined;
  }[];
}

export interface ToolPolicy {
  disable?: string[] | undefined;
  disableDestructive?: boolean | undefined;
}

export interface SessionInfo {
  id: string;
  userId: string;
  plugins: string[];
  tools: ToolPolicy;
  authConfigs: { pluginId: string; serverName: string; authConfigId: string }[];
  status: 'active' | 'expired' | 'revoked';
  createdAt: string;
  expiresAt: string;
  lastUsedAt: string | null;
}

/** The answer to creating a session; the only place the token is shown. */
export interface SessionCreated extends SessionInfo {
  token: string;
}

export interface CatalogQuery {
  q?: string | undefined;
  keyword?: string | undefined;
  kind?: PluginKind | undefined;
  categories?: string | undefined;
  featured?: boolean | undefined;
  sort?: 'recent' | 'updated' | 'name' | undefined;
  direction?: 'asc' | 'desc' | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface CatalogPlugin {
  id: string;
  name: string;
  displayName: string;
  summary: string;
  keywords: string[];
  status: 'active' | 'deprecated' | 'suspended';
  visibility: 'public';
  publisherOrganizationId: string | null;
  featured: boolean;
  verified: boolean;
  categories: { slug: string; name: string }[];
  logoUrl: string | null;
  updatedAt: string;
  latestVersion: { id: string; version: string } | null;
  componentCounts: { agent: number; skill: number; mcp: number; hook: number; rule: number };
  /** Present in the catalog a session reads. */
  installed?: boolean | undefined;
}

export interface CatalogPage {
  items: CatalogPlugin[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AllowedPlugin {
  pluginId: string;
  name: string;
  displayName: string;
  allowedAt: string;
}

export interface PluginSet {
  id: string;
  name: string;
  plugins: { pluginId: string; name: string; displayName: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface VariableStatus {
  name: string;
  description: string;
  required: boolean;
  secret: boolean;
  isSet: boolean;
  custom: boolean;
}

export interface AuthConfig {
  id: string;
  componentId: string | null;
  pluginId: string;
  pluginName: string;
  serverName: string;
  name: string;
  authMode: 'dcr' | 'oauth_client' | 'shared_secret' | 'user_form';
  isDefault: boolean;
  status: 'active' | 'disabled';
  clientId: string | null;
  clientSecretSet: boolean;
  secretSet: boolean;
  secretLastFour: string | null;
  scopes: string | null;
  callbackUrl: string;
  variables: VariableStatus[];
  tools?: { name: string; description: string }[] | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  componentId: string;
  serverName: string;
  authConfigId: string | null;
  kind: 'oauth' | 'api_key' | 'env';
  valueNames: string[];
  status: 'active' | 'needs_reauth';
  expiresAt: string | null;
  createdAt: string;
}

export interface LogEntry {
  id: string;
  action: string;
  result: 'success' | 'denied' | 'failure';
  createdAt: string;
  user: { id: string; userId: string | null } | null;
  target: { kind: string; id: string } | null;
  tool?: string | undefined;
  outcome?: string | undefined;
  durationMs?: number | undefined;
  appliedCount?: number | undefined;
}

export interface Usage {
  from: string;
  to: string;
  days: { date: string; activeUsers: number; toolCalls: number; errors: number }[];
  topUsers: { id: string; userId: string | null; toolCalls: number }[];
}

export type WebhookEventType =
  | 'user.created'
  | 'user_plugin.installed'
  | 'user_plugin.updated'
  | 'user_plugin.removed'
  | 'connection.activated'
  | 'connection.expired'
  | 'sync.reported'
  | 'plugin.suspended';

export interface WebhookDelivery {
  id: string;
  eventId: string;
  type: WebhookEventType;
  status: 'pending' | 'delivered' | 'failed';
  attempts: number;
  nextAttemptAt: string | null;
  lastStatusCode: number | null;
  createdAt: string;
}

/** A verified webhook body. */
export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  createdAt: string;
  projectId: string;
  userId?: string | undefined;
  data: Record<string, unknown>;
  version?: number | undefined;
}

export interface ManifestComponent {
  id: string;
  kind: FileKind;
  name: string;
  enabled: boolean;
  sha256: string;
  sizeBytes: number;
  href: string;
  path: string;
}

export interface ManifestMcp {
  componentId: string;
  name: string;
  serverName: string;
  url: string;
  transport: string;
  description: string;
  ready: boolean;
  setup: ConnectSetup;
}

export interface ManifestEntry {
  installationId: string;
  pluginId: string;
  pluginName: string;
  versionId: string;
  version: string;
  scope: 'org' | 'user' | 'project';
  yanked: boolean;
  sha256: string;
  sizeBytes: number;
  href: string;
  components: ManifestComponent[];
  mcp: ManifestMcp[];
  setup: ConnectSetup;
}

export interface Manifest {
  revision: string;
  pollAfterSeconds: number;
  entries: ManifestEntry[];
  skipped: {
    pluginId: string;
    versionId: string;
    componentId: string | null;
    kind: PluginKind | null;
    reason: 'unsupported_kind' | 'no_archive';
  }[];
}

export interface ManifestQuery {
  revision?: string | undefined;
  kinds?: FileKind[] | undefined;
  plugins?: string[] | undefined;
}

export interface SyncReport {
  target?: string | undefined;
  applied: { componentId: string; sha256: string }[];
  skipped?: { versionId: string; kind?: PluginKind | undefined }[] | undefined;
}

/** One server an agent can be pointed at; `headers` carries the session token. */
export interface McpServer {
  name: string;
  url: string;
  headers: Record<string, string>;
  ready: boolean;
  setup: ConnectSetup;
}
