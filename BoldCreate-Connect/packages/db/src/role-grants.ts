/**
 * Least-privilege grants and row-level security coverage, as data.
 *
 * Every table exported from the schema has an entry for every role in `ROLE_GRANTS`
 * and an entry in `RLS_TABLES`; a unit test fails when one is missing. A table that
 * a role must not touch carries an explicit `{ privileges: [] }`. `applyRoleGrants` turns the
 * grants into real roles and privileges; the row policies live in a custom migration and the
 * schema coverage test checks that every `tenant` table has them.
 */

export type RoleName = 'api' | 'worker' | 'admin' | 'gateway';

export const ROLE_NAMES: readonly RoleName[] = ['api', 'worker', 'admin', 'gateway'];

export type TableName =
  | 'user'
  | 'session'
  | 'auth_identity'
  | 'email_token'
  | 'organization'
  | 'organization_member'
  | 'org_policy'
  | 'plugin'
  | 'plugin_version'
  | 'component'
  | 'plugin_source'
  | 'plugin_ingestion'
  | 'category'
  | 'plugin_category'
  | 'installation'
  | 'installation_component'
  | 'installation_variable'
  | 'user_component_preference'
  | 'mcp_server'
  | 'mcp_oauth_token'
  | 'auth_config'
  | 'mcp_oauth_state'
  | 'org_key'
  | 'api_key'
  | 'audit_log'
  | 'outbox'
  | 'platform_admin_identity'
  | 'platform_admin_session'
  | 'oidc_login_attempt'
  | 'admin_setup_token'
  | 'admin_allowed_email'
  | 'idempotency_key'
  | 'feature_flag'
  | 'kill_switch'
  | 'project'
  | 'project_key'
  | 'project_allowed_plugin'
  | 'project_plugin_set'
  | 'project_plugin_set_member'
  | 'project_idempotency'
  | 'project_webhook'
  | 'project_webhook_delivery'
  | 'error_group'
  | 'error_event'
  | 'ops_event'
  | 'limit_setting';

export type Privilege = 'select' | 'insert' | 'update' | 'delete';

export const MAINTENANCE_PURPOSES = [
  'key_lookup',
  'retention',
  'admin_read',
  'rotation',
  'expiry_scan',
  'purge',
  'webhook',
] as const;
export type MaintenancePurpose = (typeof MAINTENANCE_PURPOSES)[number];

export interface TableGrant {
  privileges: Privilege[];
  /** Column restrictions for `select` and `update`; absent means all columns. */
  columns?: Partial<Record<'select' | 'update', string[]>>;
}

export interface RlsEntry {
  rls: 'tenant' | 'none';
  reason?: string;
  maintenance?: Partial<
    Record<
      MaintenancePurpose,
      { roles: RoleName[]; commands: ('select' | 'insert' | 'update' | 'delete')[] }
    >
  >;
}

const NONE: TableGrant = { privileges: [] };
const FULL: TableGrant = { privileges: ['select', 'insert', 'update', 'delete'] };
const READ: TableGrant = { privileges: ['select'] };
const PURGE: TableGrant = { privileges: ['delete'] };

export const ROLE_GRANTS: Record<RoleName, Record<TableName, TableGrant>> = {
  api: {
    user: FULL,
    session: FULL,
    auth_identity: FULL,
    email_token: FULL,
    organization: FULL,
    organization_member: FULL,
    org_policy: FULL,
    plugin: READ,
    plugin_version: READ,
    component: READ,
    plugin_source: {
      privileges: ['select'],
      columns: { select: ['id', 'owner', 'repository', 'path'] },
    },
    plugin_ingestion: NONE,
    category: READ,
    plugin_category: READ,
    installation: FULL,
    installation_component: FULL,
    installation_variable: FULL,
    user_component_preference: FULL,
    mcp_server: FULL,
    mcp_oauth_token: FULL,
    auth_config: FULL,
    mcp_oauth_state: FULL,
    // The api opens sealed values for members (testing a server, signing in to an upstream), so it
    // reads the wrapped private key as well and unwraps it through the KMS.
    org_key: { privileges: ['select', 'delete'] },
    api_key: FULL,
    audit_log: { privileges: ['select', 'insert'] },
    // Insert only, plus the columns the organization purge uses to cancel pending invite mail.
    outbox: {
      privileges: ['select', 'insert', 'update'],
      columns: {
        select: ['event_type', 'payload'],
        update: ['payload', 'status', 'lease_owner', 'lease_expires_at'],
      },
    },
    platform_admin_identity: READ,
    platform_admin_session: READ,
    oidc_login_attempt: NONE,
    admin_setup_token: NONE,
    admin_allowed_email: NONE,
    idempotency_key: FULL,
    feature_flag: { privileges: ['select', 'insert', 'update'] },
    kill_switch: { privileges: ['select', 'insert', 'update'] },
    project: { privileges: ['select', 'insert', 'update', 'delete'] },
    project_key: { privileges: ['select', 'insert', 'update'] },
    project_allowed_plugin: FULL,
    project_plugin_set: FULL,
    project_plugin_set_member: FULL,
    project_idempotency: FULL,
    project_webhook: FULL,
    project_webhook_delivery: FULL,
    // Services record errors and key events; they read back only what an upsert needs, which
    // includes the columns its CASE expressions keep when a group is not resolved.
    error_group: {
      privileges: ['select', 'insert', 'update'],
      columns: {
        select: [
          'id',
          'fingerprint',
          'status',
          'count',
          'last_seen',
          'app_version',
          'resolved_at',
          'resolved_by',
        ],
        update: ['count', 'last_seen', 'app_version', 'status', 'resolved_at', 'resolved_by'],
      },
    },
    error_event: { privileges: ['insert'] },
    ops_event: { privileges: ['insert'] },
    limit_setting: READ,
  },
  worker: {
    user: {
      privileges: ['select'],
      // The external id of a project user goes into a webhook event about them.
      columns: { select: ['id', 'email', 'display_name', 'status', 'project_id', 'external_ref'] },
    },
    session: NONE,
    auth_identity: NONE,
    email_token: NONE,
    organization: {
      privileges: ['select', 'update', 'delete'],
      columns: { update: ['key_state'] },
    },
    organization_member: { privileges: ['select', 'delete'] },
    org_policy: { privileges: ['select', 'delete'] },
    plugin: { privileges: ['select', 'insert', 'update'] },
    plugin_version: { privileges: ['select', 'insert', 'update'] },
    component: { privileges: ['select', 'insert'] },
    plugin_source: { privileges: ['select', 'insert', 'update'] },
    plugin_ingestion: { privileges: ['select', 'insert', 'update'] },
    category: { privileges: ['select', 'insert'] },
    plugin_category: { privileges: ['select', 'insert'] },
    // The webhook dispatcher finds the projects that install a suspended plugin.
    installation: {
      privileges: ['select', 'delete'],
      columns: { select: ['id', 'project_id', 'plugin_id'] },
    },
    installation_component: PURGE,
    installation_variable: PURGE,
    user_component_preference: PURGE,
    mcp_server: PURGE,
    mcp_oauth_token: PURGE,
    auth_config: NONE,
    mcp_oauth_state: PURGE,
    // The wrapped private key lets the webhook sender open a project's signing secret.
    org_key: {
      privileges: ['select', 'insert'],
      columns: {
        select: [
          'id',
          'organization_id',
          'version',
          'status',
          'wrapped_private_key',
          'kms_key_id',
          'kms_key_version',
        ],
      },
    },
    api_key: PURGE,
    audit_log: { privileges: ['select', 'insert', 'delete'] },
    outbox: FULL,
    platform_admin_identity: NONE,
    platform_admin_session: NONE,
    oidc_login_attempt: NONE,
    admin_setup_token: NONE,
    admin_allowed_email: NONE,
    idempotency_key: { privileges: ['select', 'delete'] },
    feature_flag: READ,
    kill_switch: READ,
    project: NONE,
    project_key: NONE,
    project_allowed_plugin: NONE,
    project_plugin_set: NONE,
    project_plugin_set_member: NONE,
    project_idempotency: { privileges: ['select', 'delete'] },
    // The dispatcher moves the cursor, the sender records what came of each try.
    project_webhook: {
      privileges: ['select', 'update'],
      columns: { update: ['cursor_at', 'cursor_id'] },
    },
    project_webhook_delivery: {
      privileges: ['select', 'insert', 'update', 'delete'],
      columns: { update: ['status', 'attempts', 'next_attempt_at', 'last_status_code'] },
    },
    // The retention job deletes expired rows by age and kind, and the alert job reads recent
    // errors and the alerts already sent; a delete needs read access to the columns it filters on.
    error_group: {
      privileges: ['select', 'insert', 'update', 'delete'],
      columns: {
        select: [
          'id',
          'fingerprint',
          'service',
          'area',
          'title',
          'status',
          'count',
          'first_seen',
          'last_seen',
          'app_version',
          'resolved_at',
          'resolved_by',
        ],
        update: ['count', 'last_seen', 'app_version', 'status', 'resolved_at', 'resolved_by'],
      },
    },
    error_event: {
      privileges: ['select', 'insert', 'delete'],
      columns: { select: ['id', 'group_id', 'occurred_at'] },
    },
    ops_event: {
      privileges: ['select', 'insert', 'delete'],
      columns: { select: ['id', 'kind', 'occurred_at', 'detail'] },
    },
    limit_setting: NONE,
  },
  admin: {
    user: NONE,
    session: NONE,
    auth_identity: NONE,
    email_token: NONE,
    organization: NONE,
    organization_member: NONE,
    org_policy: NONE,
    plugin: { privileges: ['select', 'update', 'delete'] },
    plugin_version: { privileges: ['select', 'update', 'delete'] },
    component: READ,
    plugin_source: { privileges: ['select', 'insert', 'update', 'delete'] },
    plugin_ingestion: { privileges: ['select', 'insert'] },
    category: FULL,
    plugin_category: { privileges: ['select', 'insert', 'delete'] },
    installation: READ,
    installation_component: NONE,
    installation_variable: NONE,
    user_component_preference: NONE,
    mcp_server: NONE,
    mcp_oauth_token: NONE,
    auth_config: NONE,
    mcp_oauth_state: NONE,
    org_key: NONE,
    api_key: NONE,
    audit_log: { privileges: ['select', 'insert'] },
    outbox: { privileges: ['insert'] },
    platform_admin_identity: { privileges: ['select', 'insert', 'update'] },
    platform_admin_session: { privileges: ['select', 'insert', 'update'] },
    oidc_login_attempt: { privileges: ['select', 'insert', 'update'] },
    admin_setup_token: { privileges: ['select', 'insert', 'update'] },
    admin_allowed_email: { privileges: ['select', 'insert', 'update', 'delete'] },
    idempotency_key: NONE,
    feature_flag: { privileges: ['select', 'insert', 'update'] },
    kill_switch: { privileges: ['select', 'insert', 'update'] },
    project: NONE,
    project_key: NONE,
    project_allowed_plugin: NONE,
    project_plugin_set: NONE,
    project_plugin_set_member: NONE,
    project_idempotency: NONE,
    project_webhook: NONE,
    project_webhook_delivery: NONE,
    // Admins read everything, change a group's status and remove rows from the storage screen.
    error_group: FULL,
    error_event: { privileges: ['select', 'delete'] },
    ops_event: { privileges: ['select', 'insert', 'delete'] },
    limit_setting: { privileges: ['select', 'insert', 'update', 'delete'] },
  },
  gateway: {
    // The key check of a session reads whether its project user is active and notes the sign-in.
    user: {
      privileges: ['select', 'update'],
      columns: {
        select: ['id', 'status', 'kind', 'project_id', 'last_login_at'],
        update: ['last_login_at'],
      },
    },
    session: NONE,
    auth_identity: NONE,
    email_token: NONE,
    organization: READ,
    organization_member: READ,
    org_policy: READ,
    plugin: READ,
    plugin_version: READ,
    component: READ,
    plugin_source: NONE,
    plugin_ingestion: NONE,
    category: NONE,
    plugin_category: NONE,
    installation: READ,
    installation_component: READ,
    installation_variable: READ,
    user_component_preference: READ,
    mcp_server: READ,
    mcp_oauth_token: {
      privileges: ['select', 'update'],
      columns: {
        update: ['access_sealed', 'refresh_sealed', 'expires_at', 'status', 'updated_at'],
      },
    },
    // A sign-in refresh reads the client the connection was made with.
    auth_config: READ,
    mcp_oauth_state: NONE,
    org_key: READ,
    api_key: {
      privileges: ['select', 'update'],
      columns: { update: ['last_used_at', 'last_used_ip'] },
    },
    audit_log: { privileges: ['insert'] },
    outbox: NONE,
    platform_admin_identity: NONE,
    platform_admin_session: NONE,
    oidc_login_attempt: NONE,
    admin_setup_token: NONE,
    admin_allowed_email: NONE,
    idempotency_key: NONE,
    feature_flag: READ,
    kill_switch: READ,
    // The key check reads only whether the project behind a session is still active.
    project: { privileges: ['select'], columns: { select: ['id', 'status'] } },
    project_key: NONE,
    project_allowed_plugin: NONE,
    project_plugin_set: NONE,
    project_plugin_set_member: NONE,
    project_idempotency: NONE,
    project_webhook: NONE,
    project_webhook_delivery: NONE,
    // Services record errors and key events; they read back only what an upsert needs.
    error_group: {
      privileges: ['select', 'insert', 'update'],
      columns: {
        select: [
          'id',
          'fingerprint',
          'status',
          'count',
          'last_seen',
          'app_version',
          'resolved_at',
          'resolved_by',
        ],
        update: ['count', 'last_seen', 'app_version', 'status', 'resolved_at', 'resolved_by'],
      },
    },
    error_event: { privileges: ['insert'] },
    ops_event: { privileges: ['insert'] },
    limit_setting: NONE,
  },
};

const GLOBAL = 'Not owned by a tenant';
const PLATFORM = 'Platform data; grants limit reads to the admin role';

export const RLS_TABLES: Record<TableName, RlsEntry> = {
  user: { rls: 'none', reason: 'Accessed before a tenant is known (sign-in, sign-up)' },
  session: { rls: 'none', reason: 'Accessed by token hash before a tenant is known' },
  auth_identity: { rls: 'none', reason: 'Accessed by email before a tenant is known (sign-in)' },
  email_token: { rls: 'none', reason: 'Accepted by token hash before a tenant is known' },
  organization: { rls: 'tenant' },
  organization_member: { rls: 'tenant' },
  org_policy: { rls: 'tenant' },
  plugin: { rls: 'none', reason: GLOBAL },
  plugin_version: { rls: 'none', reason: GLOBAL },
  component: { rls: 'none', reason: GLOBAL },
  plugin_source: { rls: 'none', reason: GLOBAL },
  plugin_ingestion: { rls: 'none', reason: GLOBAL },
  category: { rls: 'none', reason: GLOBAL },
  plugin_category: { rls: 'none', reason: GLOBAL },
  installation: {
    rls: 'tenant',
    maintenance: {
      admin_read: { roles: ['admin'], commands: ['select'] },
      webhook: { roles: ['worker'], commands: ['select'] },
    },
  },
  installation_component: { rls: 'tenant' },
  installation_variable: { rls: 'tenant' },
  user_component_preference: { rls: 'tenant' },
  mcp_server: { rls: 'tenant' },
  mcp_oauth_token: { rls: 'tenant' },
  auth_config: { rls: 'tenant' },
  mcp_oauth_state: { rls: 'tenant' },
  org_key: { rls: 'tenant' },
  api_key: {
    rls: 'tenant',
    maintenance: { key_lookup: { roles: ['api'], commands: ['select'] } },
  },
  audit_log: {
    rls: 'tenant',
    maintenance: {
      admin_read: { roles: ['admin'], commands: ['select'] },
      retention: { roles: ['worker'], commands: ['select', 'delete'] },
      webhook: { roles: ['worker'], commands: ['select'] },
    },
  },
  outbox: { rls: 'none', reason: 'Delivery queue read by the worker across tenants' },
  platform_admin_identity: { rls: 'none', reason: GLOBAL },
  platform_admin_session: { rls: 'none', reason: GLOBAL },
  oidc_login_attempt: { rls: 'none', reason: GLOBAL },
  admin_setup_token: { rls: 'none', reason: GLOBAL },
  admin_allowed_email: { rls: 'none', reason: GLOBAL },
  idempotency_key: {
    rls: 'none',
    reason: 'Scoped by principal key, claimed before a tenant is known',
  },
  feature_flag: { rls: 'none', reason: GLOBAL },
  kill_switch: { rls: 'none', reason: GLOBAL },
  project: {
    rls: 'tenant',
    maintenance: { key_lookup: { roles: ['api'], commands: ['select'] } },
  },
  project_key: {
    rls: 'tenant',
    maintenance: { key_lookup: { roles: ['api'], commands: ['select'] } },
  },
  project_allowed_plugin: { rls: 'tenant' },
  project_plugin_set: { rls: 'tenant' },
  project_plugin_set_member: { rls: 'tenant' },
  project_idempotency: {
    rls: 'tenant',
    maintenance: { purge: { roles: ['worker'], commands: ['select', 'delete'] } },
  },
  project_webhook: {
    rls: 'tenant',
    maintenance: { webhook: { roles: ['worker'], commands: ['select', 'update'] } },
  },
  error_group: { rls: 'none', reason: PLATFORM },
  error_event: { rls: 'none', reason: PLATFORM },
  ops_event: { rls: 'none', reason: PLATFORM },
  limit_setting: { rls: 'none', reason: PLATFORM },
  project_webhook_delivery: {
    rls: 'tenant',
    maintenance: {
      webhook: { roles: ['worker'], commands: ['select', 'insert', 'update', 'delete'] },
    },
  },
};
