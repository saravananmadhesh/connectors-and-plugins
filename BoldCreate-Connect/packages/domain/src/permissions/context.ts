import { and, eq, isNull } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  organizationMemberTable,
  setRlsContext,
  organizationTable,
} from '@boldcreate-integrations/db';
import type { ScopeContext } from '@boldcreate-integrations/db';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { DEFAULT_ORG_POLICY, type OrgPolicy } from '@boldcreate-integrations/limits';
import type { OrgPolicyGates, Resource } from './authorize.js';

export interface PrincipalInput {
  userId: string;
  sessionId: string;
  orgId?: string | undefined;
}

/**
 * Builds the `user_session` principal: with an org id, the caller's org role and status in that org. An org that is gone, or one the user does not belong to, yields a principal
 * with no org role, which `authorize` treats as not found.
 */
export async function loadPrincipal(
  db: Executor,
  input: PrincipalInput,
): Promise<UserSessionPrincipal> {
  if (!input.orgId) return basePrincipal(input);
  return db.transaction((tx) => loadOrgPrincipal(tx, input));
}

function basePrincipal(input: PrincipalInput): UserSessionPrincipal {
  return { kind: 'user_session', userId: input.userId, sessionId: input.sessionId };
}

/**
 * The org part of `loadPrincipal`, for a caller that already holds a transaction and so does not
 * need a second one. It sets the row-policy context to the user it builds the principal for.
 */
export async function loadOrgPrincipal(
  tx: Executor,
  input: PrincipalInput,
): Promise<UserSessionPrincipal> {
  const base = basePrincipal(input);
  const { orgId } = input;
  if (!orgId) return base;
  await setRlsContext(tx, { orgId, userId: input.userId });
  const [member] = await tx
    .select({ role: organizationMemberTable.role, status: organizationMemberTable.status })
    .from(organizationMemberTable)
    .innerJoin(organizationTable, eq(organizationTable.id, organizationMemberTable.organizationId))
    .where(
      and(
        eq(organizationMemberTable.organizationId, orgId),
        eq(organizationMemberTable.userId, input.userId),
        isNull(organizationTable.deletionRequestedAt),
      ),
    )
    .limit(1);
  if (!member) return { ...base, orgId };

  return {
    ...base,
    orgId,
    orgRole: member.role,
    orgStatus: member.status === 'suspended' ? ('suspended' as const) : ('active' as const),
  };
}

/** The policy an organization has when it never changed one; stored policies come from `getOrgPolicy`. */
export function loadOrgPolicy(): OrgPolicy {
  return DEFAULT_ORG_POLICY;
}

/** The resource a scope context describes. */
export function resourceOfScope(scope: ScopeContext, policy?: OrgPolicyGates): Resource {
  return {
    orgId: scope.organizationId,
    scope: scope.scopeType,
    ownerUserId: scope.ownerUserId,
    policy: policy ?? loadOrgPolicy(),
  };
}
