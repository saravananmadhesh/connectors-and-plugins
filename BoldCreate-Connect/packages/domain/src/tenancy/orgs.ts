import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  insertOutbox,
  setRlsContext,
  organizationTable,
  organizationMemberTable,
} from '@boldcreate-integrations/db';
import type {
  CreateOrgBody,
  UpdateOrgBody,
  OrgResponse,
  Plain,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { insertOrgProjects } from '../project/org-projects.js';
import { requireAction } from '../permissions/authorize.js';
import { conflict, isUniqueViolation, notFound } from '../errors.js';

function toOrgResponse(row: typeof organizationTable.$inferSelect): Plain<OrgResponse> {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function createOrg(
  db: Executor,
  userId: string,
  body: CreateOrgBody,
): Promise<Plain<OrgResponse>> {
  const orgId = randomUUID();
  const now = new Date();

  try {
    return await db.transaction(async (tx) => {
      // The new organization is the tenant from its first row on. A slug that another organization
      // holds cannot be seen through the row policies, so the unique index answers instead.
      await setRlsContext(tx, { orgId, userId });
      await tx.insert(organizationTable).values({
        id: orgId,
        name: body.name,
        slug: body.slug,
        createdBy: userId,
        createdAt: now,
        updatedAt: now,
      });

      await tx.insert(organizationMemberTable).values({
        organizationId: orgId,
        userId,
        role: 'ADMIN',
      });
      await insertOrgProjects(tx, orgId, userId);

      // The org starts without a key pair; the worker creates one and marks the org ready.
      await insertOutbox(tx, { type: 'org_key.requested', payload: { orgId } });

      await writeAudit(tx, {
        actor: { kind: 'user_session', id: userId },
        action: 'org.created',
        target: { kind: 'organization', id: orgId },
        orgId,
        context: { slug: body.slug },
      });

      const row = (
        await tx.select().from(organizationTable).where(eq(organizationTable.id, orgId)).limit(1)
      )[0]!;

      return toOrgResponse(row);
    });
  } catch (err) {
    if (isUniqueViolation(err)) throw conflict();
    throw err;
  }
}

export async function listOrganizations(
  db: Executor,
  userId: string,
): Promise<Plain<OrgResponse>[]> {
  const rows = await db
    .select({ org: organizationTable })
    .from(organizationTable)
    .innerJoin(
      organizationMemberTable,
      eq(organizationMemberTable.organizationId, organizationTable.id),
    )
    .where(eq(organizationMemberTable.userId, userId))
    .orderBy(organizationTable.createdAt);

  return rows.map((r) => toOrgResponse(r.org));
}

export async function getOrg(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<OrgResponse>> {
  requireAction(principal, 'org:read', { orgId });
  const rows = await db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, orgId))
    .limit(1);
  if (!rows[0]) throw notFound();
  return toOrgResponse(rows[0]);
}

export async function updateOrg(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  body: UpdateOrgBody,
): Promise<Plain<OrgResponse>> {
  requireAction(principal, 'org:update', { orgId });
  const rows = await db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, orgId))
    .limit(1);
  if (!rows[0]) throw notFound();

  const now = new Date();
  await db
    .update(organizationTable)
    .set({ ...(body.name ? { name: body.name } : {}), updatedAt: now })
    .where(eq(organizationTable.id, orgId));

  const updated = (
    await db.select().from(organizationTable).where(eq(organizationTable.id, orgId)).limit(1)
  )[0]!;

  return toOrgResponse(updated);
}
