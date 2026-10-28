import { ADMIN_ACTIONS, WORKLOAD_ACTIONS } from '@boldcreate-integrations/contracts';
import type { CUSTOMER_ACTIONS } from '@boldcreate-integrations/contracts';
import type { Action, ScopeKind } from '@boldcreate-integrations/contracts';

/**
 * How an action is decided. Adding a role or an action is a change to this data, never to the
 * evaluation code.
 *
 * - `read`: every org member.
 * - `write`: at org and project scope admins and members.
 * - `org_admin`: the organization `ADMIN` only (invites, roles, deleting the organization).
 * - `self`: only the user the resource belongs to (user scope).
 * - `session`: any signed-in user, no organization needed.
 * - `admin`, `workload`: only that principal kind.
 * - `key_permission`: only an API key whose permissions include the action.
 *
 * A `VIEWER` is decided before the class, by the `viewer` field of the rule: `default` treats the
 * viewer as a member who may only read; `for_you` makes the action not exist for a viewer at
 * organization and user scope (the For You data) while project scope stays readable;
 * `none` makes it not exist for a viewer at every scope (settings, keys, secrets, mutations).
 */
export type ActionClass =
  | 'read'
  | 'write'
  | 'org_admin'
  | 'self'
  | 'session'
  | 'admin'
  | 'workload'
  | 'key_permission';

export type ViewerAccess = 'default' | 'for_you' | 'none';

export interface ActionRule {
  scopes: readonly ScopeKind[];
  class: ActionClass;
  viewer: ViewerAccess;
}

export type Matrix = Record<Action, ActionRule>;

const ORG: readonly ScopeKind[] = ['org'];
const ALL: readonly ScopeKind[] = ['org', 'user', 'project'];
const NONE: readonly ScopeKind[] = [];

const rule = (
  scopes: readonly ScopeKind[],
  actionClass: ActionClass,
  viewer: ViewerAccess = 'default',
): ActionRule => ({
  scopes,
  class: actionClass,
  viewer,
});

const customer: Record<(typeof CUSTOMER_ACTIONS)[number], ActionRule> = {
  'org:read': rule(ORG, 'read'),
  'org:update': rule(ORG, 'write'),
  'org:delete': rule(ORG, 'org_admin'),
  'org-policy:read': rule(ORG, 'read', 'none'),
  'org-policy:update': rule(ORG, 'write'),
  'member:list': rule(ORG, 'read', 'none'),
  'member:update': rule(ORG, 'org_admin'),
  'member:remove': rule(ORG, 'org_admin'),
  'member:leave': rule(ORG, 'read'),
  'invite:list': rule(ORG, 'org_admin'),
  'invite:create': rule(ORG, 'org_admin'),
  'invite:revoke': rule(ORG, 'org_admin'),
  'invite:resend': rule(ORG, 'org_admin'),
  'invite:accept': rule(NONE, 'session'),
  'project:read': rule(ORG, 'read'),
  'project:create': rule(ORG, 'write'),
  'project:update': rule(ORG, 'write'),
  'project:delete': rule(ORG, 'write'),
  'project-key:read': rule(ORG, 'read', 'none'),
  'project-key:create': rule(ORG, 'write'),
  'project-key:revoke': rule(ORG, 'write'),
  'project-user:delete': rule(ORG, 'write'),
  'project-webhook:read': rule(ORG, 'read', 'none'),
  'project-webhook:write': rule(ORG, 'write'),
  'project-plugin:read': rule(ORG, 'read'),
  'project-plugin:write': rule(ORG, 'write'),
  'project-session:read': rule(ORG, 'read'),
  'project-session:write': rule(ORG, 'write'),
  'project-connection:read': rule(ORG, 'read'),
  'project-connection:write': rule(ORG, 'write'),
  'plugin:read': rule(NONE, 'session'),
  'installation:list': rule(ALL, 'read', 'for_you'),
  'installation:read': rule(ALL, 'read', 'for_you'),
  'installation:create': rule(ALL, 'write', 'for_you'),
  'installation:update': rule(ALL, 'write', 'for_you'),
  'installation:delete': rule(ALL, 'write', 'for_you'),
  'installation:upgrade': rule(ALL, 'write', 'for_you'),
  'variable:read': rule(ALL, 'read', 'none'),
  'variable:write': rule(ALL, 'write', 'for_you'),
  'component:update': rule(ALL, 'write', 'for_you'),
  'mcp-server:list': rule(ALL, 'read', 'for_you'),
  'mcp-server:read': rule(ALL, 'read', 'for_you'),
  'mcp-server:create': rule(ALL, 'write', 'for_you'),
  'mcp-server:update': rule(ALL, 'write', 'for_you'),
  'mcp-server:delete': rule(ALL, 'write', 'for_you'),
  'mcp-server:test': rule(ALL, 'write', 'for_you'),
  'mcp-server:refresh-tools': rule(ALL, 'write', 'for_you'),
  'mcp-server:review-tools': rule(ALL, 'write', 'for_you'),
  'oauth-client:read': rule(ALL, 'read', 'none'),
  'oauth-client:write': rule(ALL, 'write', 'for_you'),
  // A member's own credential for a shared server: any member who can see the scope may set,
  // remove or authorize their own, so these are decided like reads. A viewer changes nothing.
  'user-connection:read': rule(ALL, 'read', 'for_you'),
  'user-connection:write': rule(ALL, 'read', 'none'),
  'user-connection:delete': rule(ALL, 'read', 'none'),
  'user-connection:authorize': rule(ALL, 'read', 'none'),
  'api-key:list': rule(ALL, 'write', 'none'),
  'api-key:create': rule(ALL, 'write', 'none'),
  'api-key:rotate': rule(ALL, 'write', 'none'),
  'api-key:revoke': rule(ALL, 'write', 'none'),
  'api-key:update': rule(ALL, 'write', 'none'),
  'api-key:list-all': rule(ORG, 'write', 'none'),
  'api-key:revoke-any': rule(ORG, 'write', 'none'),
  'audit:read': rule(ORG, 'write'),
  'sync-status:read': rule(ALL, 'read', 'for_you'),
  'mcp:list': rule(ALL, 'key_permission'),
  'mcp:call': rule(ALL, 'key_permission'),
  'artifact:sync': rule(ALL, 'key_permission'),
  'artifact:download': rule(ALL, 'key_permission'),
  'plugin:install': rule(ALL, 'key_permission'),
};

function uniform<A extends readonly Action[]>(
  actions: A,
  actionClass: ActionClass,
): Record<A[number], ActionRule> {
  return Object.fromEntries(actions.map((action) => [action, rule(NONE, actionClass)])) as Record<
    A[number],
    ActionRule
  >;
}

export const ACTIONS: Matrix = {
  ...customer,
  ...uniform(ADMIN_ACTIONS, 'admin'),
  ...uniform(WORKLOAD_ACTIONS, 'workload'),
};

/** Actions a signed-in session may never reach with an API key: everything except key permissions. */
export function isSessionOnly(matrix: Matrix, action: Action): boolean {
  const entry = matrix[action];
  return entry.class !== 'key_permission' && entry.class !== 'admin' && entry.class !== 'workload';
}
