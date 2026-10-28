import { randomUUID } from 'node:crypto';
import { eq, and, sql } from 'drizzle-orm';
import type { Executor, Tx } from '@boldcreate-integrations/db';
import { writeAudit } from '../audit/write-audit.js';
import { requireAction } from '../permissions/authorize.js';
import type { Action, OrgRole } from '@boldcreate-integrations/contracts';
import {
  organizationTable,
  organizationMemberTable,
  orgPolicyTable,
  emailTokenTable,
  userTable,
  outboxTable,
  apiKeyTable,
  installationTable,
  installationComponentTable,
  orgKeyTable,
  pluginTable,
  projectTable,
} from '@boldcreate-integrations/db';
import type { DeleteOrgQuery } from '@boldcreate-integrations/contracts';
import { appError, conflict, forbidden, notFound } from '../errors.js';

type DeletionActor = { userId: string; requestId?: string };

/** Called after an organization's rows are gone, for example to drop its cached keys. */
export interface DeletionHooks {
  onOrgDeleted?: (orgId: string) => void;
}

/** Decides a deletion inside the locked transaction, from the membership row read there. */
function requireMembershipAction(
  membership: { role: OrgRole } | undefined,
  actor: DeletionActor,
  orgId: string,
  action: Action,
): void {
  if (!membership) throw forbidden();
  requireAction(
    {
      kind: 'user_session',
      userId: actor.userId,
      sessionId: '',
      orgId,
      orgRole: membership.role,
      orgStatus: 'active',
    },
    action,
    { orgId },
  );
}

/** Rows are removed inside the deletion transaction, so the purge time is the request time. */
export interface DeletionResult {
  purgeAfter: string;
}

/** The tables an organization purge empties, children before the rows they reference. */
export const ORG_PURGE_ORDER = [
  'installation_component',
  'installation',
  'api_key',
  'project_user',
  'project',
  'org_key',
  'organization_member',
  'email_token',
  'org_policy',
  'organization',
] as const;
export type OrgPurgeTable = (typeof ORG_PURGE_ORDER)[number];

/**
 * Removes an organization and everything in it, children first, inside the caller's
 * transaction: no table is locked, a concurrent insert fails on its foreign key instead.
 */
export async function purgeOrg(tx: Tx, orgId: string, hooks: DeletionHooks = {}): Promise<void> {
  // Pending invite emails of this organization must not go out once it is gone.
  await tx
    .update(outboxTable)
    .set({ payload: null, status: 'failed', leaseOwner: null, leaseExpiresAt: null })
    .where(
      and(
        eq(outboxTable.eventType, 'invite.created'),
        sql`(${outboxTable.payload})::jsonb ->> 'orgId' = ${orgId}`,
      ),
    );

  const steps: Record<OrgPurgeTable, () => Promise<unknown>> = {
    installation_component: () =>
      tx
        .delete(installationComponentTable)
        .where(eq(installationComponentTable.organizationId, orgId)),
    installation: () =>
      tx.delete(installationTable).where(eq(installationTable.organizationId, orgId)),
    api_key: () => tx.delete(apiKeyTable).where(eq(apiKeyTable.organizationId, orgId)),
    project_user: () =>
      tx
        .delete(userTable)
        .where(
          sql`${userTable.projectId} IN (SELECT id FROM project WHERE organization_id = ${orgId})`,
        ),
    project: () => tx.delete(projectTable).where(eq(projectTable.organizationId, orgId)),
    org_key: () => tx.delete(orgKeyTable).where(eq(orgKeyTable.organizationId, orgId)),
    organization_member: () =>
      tx.delete(organizationMemberTable).where(eq(organizationMemberTable.organizationId, orgId)),
    email_token: () => tx.delete(emailTokenTable).where(eq(emailTokenTable.orgId, orgId)),
    org_policy: () => tx.delete(orgPolicyTable).where(eq(orgPolicyTable.organizationId, orgId)),
    organization: () => tx.delete(organizationTable).where(eq(organizationTable.id, orgId)),
  };
  for (const table of ORG_PURGE_ORDER) await steps[table]();

  hooks.onOrgDeleted?.(orgId);
}

export async function deleteOrg(
  db: Executor,
  orgId: string,
  body: DeleteOrgQuery,
  actor: DeletionActor,
  hooks: DeletionHooks = {},
): Promise<DeletionResult> {
  return db.transaction(async (tx) => {
    const [org] = await tx.select().from(organizationTable).where(eq(organizationTable.id, orgId));
    if (!org) throw notFound();
    const [membership] = await tx
      .select()
      .from(organizationMemberTable)
      .where(
        and(
          eq(organizationMemberTable.organizationId, orgId),
          eq(organizationMemberTable.userId, actor.userId),
        ),
      );
    requireMembershipAction(membership, actor, orgId, 'org:delete');
    if (body.confirmSlug !== org.slug) {
      throw appError('confirmation_mismatch');
    }
    const published = await tx
      .select({ id: pluginTable.id })
      .from(pluginTable)
      .where(eq(pluginTable.publisherOrganizationId, orgId))
      .limit(1);
    if (published.length > 0) {
      throw conflict();
    }
    // Collect all org members so we can notify them after the row is gone.
    const members = await tx
      .select({ email: userTable.email, displayName: userTable.displayName })
      .from(organizationMemberTable)
      .innerJoin(userTable, eq(organizationMemberTable.userId, userTable.id))
      // Project users have an address no mail can reach.
      .where(and(eq(organizationMemberTable.organizationId, orgId), eq(userTable.kind, 'human')));
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: actor.userId },
      action: 'org.deleted',
      target: { kind: 'organization', id: orgId },
      orgId,
      context: { organizationId: orgId, slug: org.slug },
      requestId: actor.requestId,
    });
    const now = new Date();
    await purgeOrg(tx, orgId, hooks);
    // Enqueue deletion notification emails after all rows are removed.
    // These are fire-and-forget: delivery failure does not roll back the deletion.
    for (const member of members) {
      await tx.insert(outboxTable).values({
        id: randomUUID(),
        eventType: 'deletion.requested',
        payload: JSON.stringify({
          to: member.email,
          displayName: member.displayName,
          resourceKind: 'org',
          resourceName: org.name,
          resourceSlug: org.slug,
        }),
        status: 'pending',
        attempts: 0,
        nextAttemptAt: now,
      });
    }
    return { purgeAfter: now.toISOString() };
  });
}
