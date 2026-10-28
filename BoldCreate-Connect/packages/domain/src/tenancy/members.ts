import { eq, and } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import { organizationMemberTable, userTable } from '@boldcreate-integrations/db';
import type {
  Action,
  OrgRole,
  OrgMemberResponse,
  UpdateOrgMemberBody,
  OrgMeResponse,
  Plain,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { allowedActions, requireAction } from '../permissions/authorize.js';
import { canChangeMembers, leavesNoActiveAdmin } from '../permissions/member-rules.js';
import { appError, forbidden, notFound } from '../errors.js';
import { lockActiveAdmins } from './locks.js';
import { getOrgPolicy, loadOrgPolicyResponse } from './org-policy.js';

async function listMembers(db: Executor, orgId: string): Promise<Plain<OrgMemberResponse>[]> {
  const rows = await db
    .select({
      userId: organizationMemberTable.userId,
      displayName: userTable.displayName,
      email: userTable.email,
      role: organizationMemberTable.role,
      status: organizationMemberTable.status,
      createdAt: organizationMemberTable.createdAt,
    })
    .from(organizationMemberTable)
    .innerJoin(userTable, eq(organizationMemberTable.userId, userTable.id))
    // The app's service principal owns its orgs but is not one of the host's people.
    .where(eq(organizationMemberTable.organizationId, orgId));

  return rows.map((r) => ({
    userId: r.userId,
    displayName: r.displayName,
    email: r.email,
    role: r.role,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function listOrgMembers(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<OrgMemberResponse>[]> {
  requireAction(principal, 'member:list', { orgId });
  return listMembers(db, orgId);
}

async function findMember(db: Executor, orgId: string, userId: string) {
  const rows = await db
    .select()
    .from(organizationMemberTable)
    .where(
      and(
        eq(organizationMemberTable.organizationId, orgId),
        eq(organizationMemberTable.userId, userId),
      ),
    )
    .limit(1);
  return rows[0];
}

/**
 * The caller's role as stored now, once the locks are held: a change made by a request that ran
 * first applies to this one, so a caller who lost their role meanwhile is refused.
 */
async function currentActorRole(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  action: Action,
): Promise<OrgRole> {
  const actor = await findMember(tx, orgId, principal.userId);
  if (!actor || actor.status !== 'active') throw notFound();
  requireAction({ ...principal, orgRole: actor.role }, action, { orgId });
  return actor.role;
}

export async function updateOrgMember(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  targetUserId: string,
  body: UpdateOrgMemberBody,
): Promise<Plain<OrgMemberResponse>> {
  requireAction(principal, 'member:update', { orgId });
  const actorRole = principal.orgRole;
  if (!actorRole) throw forbidden();

  return db.transaction(async (tx) => {
    const admins = await lockActiveAdmins(tx, orgId);
    const target = await findMember(tx, orgId, targetUserId);
    if (!target) throw notFound();
    const next = { role: body.role ?? target.role, status: body.status ?? target.status };
    // Only an admin changes roles; any admin may make another admin.
    if (!canChangeMembers(actorRole)) throw forbidden();
    if (next.status === 'suspended' && principal.userId === targetUserId) throw forbidden();
    if (leavesNoActiveAdmin(admins, targetUserId, next)) throw appError('last_admin_required');
    const currentRole = await currentActorRole(tx, principal, orgId, 'member:update');
    if (!canChangeMembers(currentRole)) throw forbidden();

    await tx
      .update(organizationMemberTable)
      .set({ role: next.role, status: next.status })
      .where(
        and(
          eq(organizationMemberTable.organizationId, orgId),
          eq(organizationMemberTable.userId, targetUserId),
        ),
      );
    if (next.role !== target.role) {
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: principal.userId },
        action: 'member.role_changed',
        target: { kind: 'user', id: targetUserId },
        orgId,
        context: { from: target.role, to: next.role },
      });
    }
    if (next.status !== target.status) {
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: principal.userId },
        action: next.status === 'suspended' ? 'member.suspended' : 'member.reinstated',
        target: { kind: 'user', id: targetUserId },
        orgId,
        context: { role: next.role },
      });
    }

    const members = await listMembers(tx, orgId);
    return members.find((m) => m.userId === targetUserId)!;
  });
}

/** Removes a member, or lets the caller leave when the target is the caller. */
export async function removeOrgMember(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  targetUserId: string,
): Promise<void> {
  const isSelf = principal.userId === targetUserId;
  requireAction(principal, isSelf ? 'member:leave' : 'member:remove', { orgId });
  const actorRole = principal.orgRole;
  if (!actorRole) throw forbidden();

  await db.transaction(async (tx) => {
    const admins = await lockActiveAdmins(tx, orgId);
    const target = await findMember(tx, orgId, targetUserId);
    if (!target) throw notFound();
    if (!isSelf && !canChangeMembers(actorRole)) throw forbidden();
    if (admins.includes(targetUserId) && admins.every((id) => id === targetUserId)) {
      throw appError('last_admin_required');
    }
    const currentRole = await currentActorRole(
      tx,
      principal,
      orgId,
      isSelf ? 'member:leave' : 'member:remove',
    );
    if (!isSelf && !canChangeMembers(currentRole)) throw forbidden();

    await tx
      .delete(organizationMemberTable)
      .where(
        and(
          eq(organizationMemberTable.organizationId, orgId),
          eq(organizationMemberTable.userId, targetUserId),
        ),
      );
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'member.removed',
      target: { kind: 'user', id: targetUserId },
      orgId,
      context: { role: target.role, self: isSelf ? 'true' : 'false' },
    });
  });
}

/**
 * The caller's membership in an org: the org role and the actions the caller may take at org scope.
 */
export async function getOrgMe(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<OrgMeResponse>> {
  requireAction(principal, 'org:read', { orgId });
  const role = principal.orgRole;
  if (!role) throw notFound();

  const policy = await getOrgPolicy(db, orgId);
  return {
    userId: principal.userId,
    role,
    abilities: allowedActions(principal, { orgId, scope: 'org', policy }),
    policy: await loadOrgPolicyResponse(db, orgId),
  };
}
