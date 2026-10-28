/**
 * The expected answers of `authorize`, written by hand from the rules of each action class and
 * kept apart from `matrix.ts`. The generated test compares the two; a change to the matrix that
 * changes an answer has to change this file as well, on purpose.
 */
import type { Action, OrgRole, ScopeKind } from '@boldcreate-integrations/contracts';

/** Actions that exist only at org scope and are open to every org member. */
export const ORG_READ = [
  'org:read',
  'org-policy:read',
  'member:list',
  'member:leave',
  'project:read',
  'project-key:read',
  'project-webhook:read',
  'project-plugin:read',
  'project-session:read',
  'project-connection:read',
] as const;

/** Actions that exist only at org scope and need an admin or a member. */
export const ORG_WRITE = [
  'org:update',
  'org-policy:update',
  'project:create',
  'project:update',
  'project:delete',
  'project-key:create',
  'project-key:revoke',
  'project-user:delete',
  'project-plugin:write',
  'project-webhook:write',
  'project-session:write',
  'project-connection:write',
  'api-key:list-all',
  'api-key:revoke-any',
  'audit:read',
] as const;

/** Actions only an organization admin may take: members, invites and deleting the organization. */
export const ORG_ADMIN_ONLY = [
  'org:delete',
  'member:update',
  'member:remove',
  'invite:list',
  'invite:create',
  'invite:revoke',
  'invite:resend',
] as const;

/** Actions that do not exist for a viewer at any scope: settings, keys, secrets and mutations. */
export const VIEWER_HIDDEN = [
  'org-policy:read',
  'member:list',
  'project-key:read',
  'project-webhook:read',
  'variable:read',
  'oauth-client:read',
  'user-connection:write',
  'user-connection:delete',
  'user-connection:authorize',
  'api-key:list',
  'api-key:create',
  'api-key:rotate',
  'api-key:revoke',
  'api-key:update',
  'api-key:list-all',
  'api-key:revoke-any',
] as const;

/**
 * Actions that do not exist for a viewer at organization and user scope (the For You data).
 * At project scope they follow the ordinary rules, so a viewer reads and never writes.
 */
export const VIEWER_HIDDEN_FOR_YOU = [
  'installation:list',
  'installation:read',
  'installation:create',
  'installation:update',
  'installation:delete',
  'installation:upgrade',
  'variable:write',
  'component:update',
  'mcp-server:list',
  'mcp-server:read',
  'mcp-server:create',
  'mcp-server:update',
  'mcp-server:delete',
  'mcp-server:test',
  'mcp-server:refresh-tools',
  'mcp-server:review-tools',
  'oauth-client:write',
  'user-connection:read',
  'sync-status:read',
] as const;

/** Actions at org and user scope that visibility alone decides. */
export const ANY_SCOPE_READ = [
  'installation:list',
  'installation:read',
  'variable:read',
  'mcp-server:list',
  'mcp-server:read',
  'oauth-client:read',
  'user-connection:read',
  'user-connection:write',
  'user-connection:delete',
  'user-connection:authorize',
  'sync-status:read',
] as const;

/** Actions at org and user scope that need write rights in that scope. */
export const ANY_SCOPE_WRITE = [
  'installation:create',
  'installation:update',
  'installation:delete',
  'installation:upgrade',
  'variable:write',
  'component:update',
  'mcp-server:create',
  'mcp-server:update',
  'mcp-server:delete',
  'mcp-server:test',
  'mcp-server:refresh-tools',
  'mcp-server:review-tools',
  'oauth-client:write',
  'api-key:list',
  'api-key:create',
  'api-key:rotate',
  'api-key:revoke',
  'api-key:update',
] as const;

/** Any signed-in user, no organization needed. */
export const SESSION_ONLY = ['invite:accept', 'plugin:read'] as const;

/** Decided by the permissions stored on an API key. */
export const KEY_PERMISSION = [
  'mcp:list',
  'mcp:call',
  'artifact:sync',
  'artifact:download',
  'plugin:install',
] as const;

export const ADMIN_ONLY = [
  'admin:source:read',
  'admin:source:write',
  'admin:ingestion:read',
  'admin:ingestion:retry',
  'admin:version:read',
  'admin:version:review',
  'admin:plugin:update',
  'admin:category:write',
  'admin:kill-switch:read',
  'admin:kill-switch:write',
  'admin:audit:read',
  'admin:org:read',
  'admin:impact:read',
] as const;

export const WORKLOAD_ONLY = ['workload:gateway-resolve', 'workload:gateway-write'] as const;

export const EXPECTED_ACTIONS: readonly string[] = [
  ...ORG_READ,
  ...ORG_WRITE,
  ...ORG_ADMIN_ONLY,
  ...ANY_SCOPE_READ,
  ...ANY_SCOPE_WRITE,
  ...SESSION_ONLY,
  ...KEY_PERMISSION,
  ...ADMIN_ONLY,
  ...WORKLOAD_ONLY,
];

export type Expected = 'allowed' | 'not_found' | 'forbidden' | 'session_required';

export interface SessionCase {
  orgRole: OrgRole | 'none' | 'suspended';
  /** The resource belongs to the principal's own org. */
  sameOrg: boolean;
  scope: ScopeKind;
  /** User scope only: the resource belongs to the principal. */
  self: boolean;
}

const includes = (list: readonly string[], action: Action): boolean => list.includes(action);

/** The scopes an action exists in. */
function scopesOf(action: Action): readonly ScopeKind[] {
  if (
    includes(ORG_READ, action) ||
    includes(ORG_WRITE, action) ||
    includes(ORG_ADMIN_ONLY, action)
  ) {
    return ['org'];
  }
  return ['org', 'user', 'project'];
}

function managesOrg(role: SessionCase['orgRole']): boolean {
  return role === 'ADMIN' || role === 'MEMBER';
}

/** What `authorize` must answer for a signed-in user. */
export function expectedForSession(action: Action, c: SessionCase): Expected {
  if (includes(SESSION_ONLY, action)) return 'allowed';
  if (includes(ADMIN_ONLY, action) || includes(WORKLOAD_ONLY, action)) return 'forbidden';
  if (includes(KEY_PERMISSION, action)) return 'forbidden';

  // Visibility first.
  if (!c.sameOrg) return 'not_found';
  if (c.orgRole === 'none' || c.orgRole === 'suspended') return 'not_found';
  if (c.orgRole === 'VIEWER') {
    if (includes(VIEWER_HIDDEN, action)) return 'not_found';
    if (includes(VIEWER_HIDDEN_FOR_YOU, action) && c.scope !== 'project') return 'not_found';
  }
  if (c.scope === 'user' && !c.self) return 'not_found';

  // Then rights.
  if (!scopesOf(action).includes(c.scope)) return 'forbidden';
  if (includes(ORG_ADMIN_ONLY, action)) return c.orgRole === 'ADMIN' ? 'allowed' : 'forbidden';

  const reads = [...ORG_READ, ...ANY_SCOPE_READ];
  if (includes(reads, action)) return 'allowed';

  // Everything left needs write rights in the scope, and a viewer never has them.
  if (c.orgRole === 'VIEWER') return 'forbidden';
  if (c.scope === 'user') return 'allowed';
  return managesOrg(c.orgRole) ? 'allowed' : 'forbidden';
}
