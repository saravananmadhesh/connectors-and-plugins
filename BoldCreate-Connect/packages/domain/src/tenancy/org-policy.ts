import { eq } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import { orgPolicyTable } from '@boldcreate-integrations/db';
import type {
  KeyPreset,
  OrgPolicyResponse,
  Plain,
  UpdateOrgPolicyBody,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import {
  resolveOrgPolicy,
  type OrgPolicy,
  type OrgPolicyRow,
} from '@boldcreate-integrations/limits';
import { writeAudit } from '../audit/write-audit.js';
import { requireAction } from '../permissions/authorize.js';

function rowOf(row: typeof orgPolicyTable.$inferSelect | undefined): OrgPolicyRow | null {
  if (!row) return null;
  return {
    allowPersonalInstalls: row.allowPersonalInstalls,
    allowPersonalApiKeys: row.allowPersonalApiKeys,
    maxPersonalKeyExpiryDays: row.maxPersonalKeyExpiryDays,
    allowedKeyPresets: row.allowedKeyPresets as KeyPreset[] | null,
  };
}

/** The policy in effect for an organization: stored values over the data defaults. */
export async function getOrgPolicy(db: Executor, orgId: string): Promise<OrgPolicy> {
  const [row] = await db
    .select()
    .from(orgPolicyTable)
    .where(eq(orgPolicyTable.organizationId, orgId))
    .limit(1);
  return resolveOrgPolicy(rowOf(row));
}

function toResponse(policy: OrgPolicy, updatedAt: Date | null): Plain<OrgPolicyResponse> {
  return {
    allowPersonalInstalls: policy.allowPersonalInstalls,
    allowPersonalApiKeys: policy.allowPersonalApiKeys,
    allowedKeyPresets: [...policy.allowedKeyPresets],
    maxPersonalKeyExpiryDays: policy.maxPersonalKeyExpiryDays,
    updatedAt: updatedAt?.toISOString() ?? null,
  };
}

/** The policy as the API returns it, with the time of the last change; no permission check. */
export async function loadOrgPolicyResponse(
  db: Executor,
  orgId: string,
): Promise<Plain<OrgPolicyResponse>> {
  const [row] = await db
    .select()
    .from(orgPolicyTable)
    .where(eq(orgPolicyTable.organizationId, orgId))
    .limit(1);
  return toResponse(resolveOrgPolicy(rowOf(row)), row?.updatedAt ?? null);
}

export async function readOrgPolicy(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<OrgPolicyResponse>> {
  requireAction(principal, 'org-policy:read', { orgId });
  return loadOrgPolicyResponse(db, orgId);
}

/** The columns a body changes; a field that is absent keeps its stored value. */
export function policyChanges(
  body: UpdateOrgPolicyBody,
): Partial<typeof orgPolicyTable.$inferInsert> {
  return {
    ...(body.allowPersonalInstalls !== undefined
      ? { allowPersonalInstalls: body.allowPersonalInstalls }
      : {}),
    ...(body.allowPersonalApiKeys !== undefined
      ? { allowPersonalApiKeys: body.allowPersonalApiKeys }
      : {}),
    ...(body.maxPersonalKeyExpiryDays !== undefined
      ? { maxPersonalKeyExpiryDays: body.maxPersonalKeyExpiryDays }
      : {}),
    ...(body.allowedKeyPresets !== undefined ? { allowedKeyPresets: body.allowedKeyPresets } : {}),
  };
}

/** Changes the given fields of the organization policy; the audit row names the fields only. */
export async function updateOrgPolicy(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  body: UpdateOrgPolicyBody,
): Promise<Plain<OrgPolicyResponse>> {
  requireAction(principal, 'org-policy:update', { orgId });
  const changes = policyChanges(body);
  const now = new Date();

  return db.transaction(async (tx) => {
    const [row] = await tx
      .insert(orgPolicyTable)
      .values({ organizationId: orgId, ...changes, updatedBy: principal.userId, updatedAt: now })
      .onConflictDoUpdate({
        target: orgPolicyTable.organizationId,
        set: { ...changes, updatedBy: principal.userId, updatedAt: now },
      })
      .returning();
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'org.updated',
      target: { kind: 'organization', id: orgId },
      orgId,
      context: { changed: Object.keys(changes).sort() },
    });
    return toResponse(resolveOrgPolicy(rowOf(row)), row?.updatedAt ?? now);
  });
}
