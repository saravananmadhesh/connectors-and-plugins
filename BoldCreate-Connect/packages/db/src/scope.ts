/** Scope kinds as seen by application code. */
export type ScopeKind = 'org' | 'user' | 'project';

/**
 * Canonical scope context required by every scoped repository.
 * Repositories must not accept unvalidated tenant context.
 */
export interface ScopeContext {
  organizationId: string;
  scopeType: ScopeKind;
  ownerUserId?: string;
  projectId?: string;
}

/**
 * Assert that a scope context is internally consistent.
 * Throws if the shape is invalid — call this at the boundary before
 * passing scope into any repository.
 */
export function assertValidScope(scope: ScopeContext): void {
  switch (scope.scopeType) {
    case 'user':
      if (!scope.ownerUserId || scope.projectId !== undefined) {
        throw new Error('user scope requires ownerUserId and no projectId');
      }
      break;
    case 'org':
      if (scope.ownerUserId !== undefined || scope.projectId !== undefined) {
        throw new Error('org scope requires no ownerUserId or projectId');
      }
      break;
    case 'project':
      if (!scope.projectId || scope.ownerUserId !== undefined) {
        throw new Error('project scope requires projectId and no ownerUserId');
      }
      break;
    default: {
      const _exhaustive: never = scope.scopeType;
      throw new Error(`Unknown scope type: ${String(_exhaustive)}`);
    }
  }
}
