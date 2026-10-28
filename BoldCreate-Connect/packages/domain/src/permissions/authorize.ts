import { AppError } from '@boldcreate-integrations/contracts';
import type {
  Action,
  OrgRole,
  Principal,
  ScopeKind,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import type { OrgPolicy } from '@boldcreate-integrations/limits';
import { ACTIONS, isSessionOnly, type ActionRule, type Matrix } from './matrix.js';

/** Organization settings that gate what a member may create for themselves. */
export type OrgPolicyGates = Pick<OrgPolicy, 'allowPersonalInstalls' | 'allowPersonalApiKeys'>;

export interface Resource {
  /** Organization the resource belongs to. Absent only for actions that need no organization. */
  orgId?: string | undefined;
  scope?: ScopeKind | undefined;
  /** User a user-scope resource belongs to. */
  ownerUserId?: string | undefined;
  policy?: OrgPolicyGates | undefined;
}

export type DenyReason = 'not_found' | 'forbidden' | 'session_required' | 'policy';

export type PolicyGate = 'personal_installs' | 'personal_api_keys';

export type Decision =
  | { allowed: true }
  | { allowed: false; reason: DenyReason; policy?: PolicyGate };

const ALLOWED: Decision = { allowed: true };
const deny = (reason: DenyReason): Decision => ({ allowed: false, reason });

/** Actions at user scope that an organization policy can switch off. */
const POLICY_GATED: Partial<Record<Action, PolicyGate>> = {
  'installation:create': 'personal_installs',
  'api-key:create': 'personal_api_keys',
};

/** Admins and members manage the organization; a viewer only reads Platform. */
function managesOrg(role: OrgRole | undefined): boolean {
  return role === 'ADMIN' || role === 'MEMBER';
}

/** Whether the principal is an organization viewer, who sees Platform only. */
export function isViewer(principal: UserSessionPrincipal): boolean {
  return principal.orgRole === 'VIEWER';
}

/** Admins and members: the roles that manage installs and keep their own next to them. */
export function managesInstalls(principal: UserSessionPrincipal): boolean {
  return managesOrg(principal.orgRole);
}

/** Whether the action does not exist for a viewer at this scope (see `ViewerAccess`). */
function hiddenFromViewer(rule: ActionRule, scope: ScopeKind): boolean {
  if (rule.viewer === 'none') return true;
  return rule.viewer === 'for_you' && scope !== 'project';
}

function decideSession(
  principal: UserSessionPrincipal,
  action: Action,
  rule: ActionRule,
  resource: Resource,
): Decision {
  if (rule.class === 'session') return ALLOWED;

  // 1. Visibility: anything the principal may not see does not exist for them.
  if (!resource.orgId || principal.orgId !== resource.orgId) return deny('not_found');
  if (!principal.orgRole || principal.orgStatus === 'suspended') return deny('not_found');
  const scope = resource.scope ?? rule.scopes[0] ?? 'org';
  if (principal.orgRole === 'VIEWER' && hiddenFromViewer(rule, scope)) return deny('not_found');
  if (scope === 'user' && resource.ownerUserId !== principal.userId) return deny('not_found');

  // 2. Rights: visible but not allowed.
  if (!rule.scopes.includes(scope)) return deny('forbidden');
  if (rule.class === 'org_admin')
    return principal.orgRole === 'ADMIN' ? ALLOWED : deny('forbidden');
  if (rule.class === 'self') return scope === 'user' ? ALLOWED : deny('forbidden');
  if (rule.class === 'read') return ALLOWED;
  if (rule.class === 'write') {
    // Whatever the rule says about visibility, a viewer never writes.
    if (principal.orgRole === 'VIEWER') return deny('forbidden');
    if (scope === 'org' || scope === 'project')
      return managesOrg(principal.orgRole) ? ALLOWED : deny('forbidden');
    const gate = POLICY_GATED[action];
    if (gate && resource.policy) {
      const open =
        gate === 'personal_installs'
          ? resource.policy.allowPersonalInstalls
          : resource.policy.allowPersonalApiKeys;
      if (!open) return { allowed: false, reason: 'policy', policy: gate };
    }
    return ALLOWED;
  }
  return deny('forbidden');
}

/**
 * Builds an `authorize` over a given matrix. The evaluation order is fixed: visibility first
 * (`not_found`), then rights (`forbidden`, `session_required`, `policy`). Anything not described
 * by the matrix is denied.
 */
export function authorizeWith(matrix: Matrix) {
  return function authorize(principal: Principal, action: Action, resource: Resource): Decision {
    const rule = (matrix as Partial<Record<string, ActionRule>>)[action];
    if (!rule) return deny('forbidden');

    switch (rule.class) {
      case 'admin':
        return principal.kind === 'platform_admin' ? ALLOWED : deny('forbidden');
      case 'workload':
        return principal.kind === 'workload' ? ALLOWED : deny('forbidden');
      case 'key_permission': {
        if (principal.kind !== 'api_key') return deny('forbidden');
        if (principal.orgId !== resource.orgId) return deny('not_found');
        return (principal.permissions as string[]).includes(action) ? ALLOWED : deny('forbidden');
      }
      default:
        break;
    }

    if (principal.kind === 'api_key' && isSessionOnly(matrix, action)) {
      return deny('session_required');
    }
    if (principal.kind !== 'user_session') return deny('forbidden');
    return decideSession(principal, action, rule, resource);
  };
}

export const authorize = authorizeWith(ACTIONS);

/** Thrown for a denied decision; carries what the denial audit needs. */
export class PermissionDeniedError extends AppError {
  readonly action: Action;
  readonly reason: DenyReason;
  readonly orgId: string | undefined;

  constructor(
    code: ConstructorParameters<typeof AppError>[0],
    action: Action,
    reason: DenyReason,
    orgId: string | undefined,
  ) {
    super(code);
    this.name = 'PermissionDeniedError';
    this.action = action;
    this.reason = reason;
    this.orgId = orgId;
  }
}

/** Throws the error of a denied decision; returns when it is allowed. */
export function assertAllowed(decision: Decision, action: Action, resource: Resource): void {
  if (decision.allowed) return;
  const orgId = resource.orgId;
  if (decision.reason === 'not_found') {
    throw new PermissionDeniedError('not_found', action, 'not_found', orgId);
  }
  if (decision.reason === 'session_required') {
    throw new PermissionDeniedError('session_required', action, 'session_required', orgId);
  }
  if (decision.reason === 'policy') {
    const code =
      decision.policy === 'personal_installs'
        ? 'personal_installs_disabled'
        : 'personal_api_keys_disabled';
    throw new PermissionDeniedError(code, action, 'policy', orgId);
  }
  throw new PermissionDeniedError('forbidden', action, 'forbidden', orgId);
}

/** Authorizes and throws on denial. The usual call inside a use case. */
export function requireAction(principal: Principal, action: Action, resource: Resource): void {
  assertAllowed(authorize(principal, action, resource), action, resource);
}

/** Every customer action the principal passes for the resource, in matrix order. */
export function allowedActions(
  principal: Principal,
  resource: Resource,
  matrix: Matrix = ACTIONS,
): Action[] {
  const check = authorizeWith(matrix);
  return (Object.keys(matrix) as Action[]).filter((action) => {
    const entry = matrix[action];
    if (entry.class === 'admin' || entry.class === 'workload') return false;
    if (entry.class === 'key_permission' || entry.class === 'session') return false;
    if (resource.scope && !entry.scopes.includes(resource.scope)) return false;
    return check(principal, action, resource).allowed;
  });
}
