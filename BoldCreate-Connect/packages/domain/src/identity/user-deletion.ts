import { and, asc, eq, inArray, isNull, sql } from 'drizzle-orm';
import type { Executor, Tx } from '@boldcreate-integrations/db';
import {
  apiKeyTable,
  authIdentityTable,
  emailTokenTable,
  installationComponentTable,
  installationTable,
  organizationMemberTable,
  organizationTable,
  sessionTable,
  setRlsContext,
  userTable,
} from '@boldcreate-integrations/db';
import { writeAudit } from '../audit/write-audit.js';
import { appError, notFound } from '../errors.js';
import { purgeOrg, type DeletionHooks, type DeletionResult } from '../tenancy/deletion.js';
import { lockActiveAdmins } from '../tenancy/locks.js';

/** The address a deleted user keeps: unique per user, never deliverable. */
export function tombstoneEmail(userId: string): string {
  return `deleted-${userId.replaceAll('-', '')}@deleted.invalid`;
}

export interface UserDeletionContext {
  requestId?: string | undefined;
  ip?: string | undefined;
}

/** Removes what belonged to the user alone in an organization that stays. */
async function removePersonalResources(tx: Tx, userId: string): Promise<void> {
  const personal = <T extends typeof installationTable>(table: T) =>
    and(eq(table.scopeType, 'user'), eq(table.ownerUserId, userId));

  const installations = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(personal(installationTable));
  if (installations.length > 0) {
    await tx.delete(installationComponentTable).where(
      inArray(
        installationComponentTable.installationId,
        installations.map((i) => i.id),
      ),
    );
    await tx.delete(installationTable).where(personal(installationTable));
  }
}

/**
 * Deletes the caller: leaves or purges every organization, ends sessions, revokes keys,
 * removes personal resources and sign-in methods, and reduces the user row to a tombstone.
 * Refuses while the user is the only admin of an organization that has other members.
 */
export async function deleteUser(
  db: Executor,
  userId: string,
  confirmEmail: string,
  ctx: UserDeletionContext = {},
  hooks: DeletionHooks = {},
): Promise<DeletionResult> {
  return db.transaction(async (tx) => {
    const [user] = await tx
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId))
      .limit(1)
      .for('update');
    // Project users are removed through the project, never through this account path.
    if (!user || user.status === 'deleted' || user.kind !== 'human') throw notFound();
    if (confirmEmail.trim().toLowerCase() !== user.emailNormalized) {
      throw appError('confirmation_mismatch');
    }

    // Memberships are visible by user alone; each organization is then entered as the tenant.
    await setRlsContext(tx, { userId });
    const memberships = await tx
      .select({ orgId: organizationMemberTable.organizationId })
      .from(organizationMemberTable)
      .where(eq(organizationMemberTable.userId, userId))
      .orderBy(asc(organizationMemberTable.organizationId));

    const soleOrgs: string[] = [];
    const remainingOrgs: string[] = [];
    for (const { orgId } of memberships) {
      await setRlsContext(tx, { orgId, userId });
      const admins = await lockActiveAdmins(tx, orgId);
      const [{ members } = { members: 0 }] = await tx
        .select({ members: sql<number>`count(*)::int` })
        .from(organizationMemberTable)
        .where(eq(organizationMemberTable.organizationId, orgId));
      if (members <= 1) {
        soleOrgs.push(orgId);
      } else if (admins.includes(userId) && admins.every((id) => id === userId)) {
        throw appError('last_admin_required');
      } else {
        remainingOrgs.push(orgId);
      }
    }

    const now = new Date();
    for (const orgId of soleOrgs) {
      await setRlsContext(tx, { orgId, userId });
      const [org] = await tx
        .select({ slug: organizationTable.slug })
        .from(organizationTable)
        .where(eq(organizationTable.id, orgId))
        .limit(1);
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: userId },
        action: 'org.deleted',
        target: { kind: 'organization', id: orgId },
        orgId,
        context: { organizationId: orgId, slug: org?.slug },
        requestId: ctx.requestId,
        ip: ctx.ip,
      });
      await purgeOrg(tx, orgId, hooks);
    }

    for (const orgId of remainingOrgs) {
      await setRlsContext(tx, { orgId, userId });
      await removePersonalResources(tx, userId);
      await tx
        .update(apiKeyTable)
        .set({ revokedAt: now, updatedAt: now })
        .where(and(eq(apiKeyTable.principalUserId, userId), isNull(apiKeyTable.revokedAt)));
    }

    await setRlsContext(tx, { userId });
    await tx
      .update(sessionTable)
      .set({ revokedAt: now })
      .where(and(eq(sessionTable.userId, userId), isNull(sessionTable.revokedAt)));
    await tx.delete(organizationMemberTable).where(eq(organizationMemberTable.userId, userId));
    await tx.delete(emailTokenTable).where(eq(emailTokenTable.targetUserId, userId));
    await tx.delete(authIdentityTable).where(eq(authIdentityTable.userId, userId));

    const tombstone = tombstoneEmail(userId);
    await tx
      .update(userTable)
      .set({
        status: 'deleted',
        deletedAt: now,
        email: tombstone,
        emailNormalized: tombstone,
        displayName: 'Deleted user',
        failedLoginCount: 0,
        lockedUntil: null,
        updatedAt: now,
      })
      .where(eq(userTable.id, userId));
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: userId },
      action: 'user.deleted',
      target: { kind: 'user', id: userId },
      requestId: ctx.requestId,
      ip: ctx.ip,
      context: { organizationsPurged: soleOrgs.length, organizationsLeft: remainingOrgs.length },
    });
    return { purgeAfter: now.toISOString() };
  });
}
