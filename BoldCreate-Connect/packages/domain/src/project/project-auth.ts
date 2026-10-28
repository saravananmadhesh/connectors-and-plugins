/**
 * Authenticates a call made with a project key (`prk_`): the key and the project behind it. The
 * api's project branch is the only caller; the key is the whole identity, so what a call may do is
 * the key's scopes and nothing more.
 */
import { and, eq, isNull, lt, or } from 'drizzle-orm';
import {
  organizationTable,
  projectKeyTable,
  projectTable,
  withMaintenance,
  withTenant,
  type Db,
  type Executor,
} from '@boldcreate-integrations/db';
import type { Plain, ProjectKeyScope, ProjectMeResponse } from '@boldcreate-integrations/contracts';
import { hashToken, safeCompareHash, splitApiKey } from '@boldcreate-integrations/security';
import { notFound } from '../errors.js';
import { ipInCidrs } from '../access/cidr.js';

/** `last_used_at` is written at most this often per key. */
const LAST_USED_INTERVAL_MS = 60_000;
/** Compared against when no key matches, so an unknown key takes as long as a wrong secret. */
const UNKNOWN_KEY_HASH = hashToken('no project key has this secret');

/** Whether the header offers a project key, well formed or not. Such a call is never a session call. */
export function offersProjectKey(header: string | undefined): boolean {
  return typeof header === 'string' && header.startsWith('Bearer prk_');
}

/** The key out of an `Authorization: Bearer <key>` header when it is a well-formed project key. */
export function projectBearer(header: string | undefined): string | null {
  if (!offersProjectKey(header)) return null;
  const key = header!.slice(7).trim();
  return splitApiKey(key, ['project']) ? key : null;
}

export interface ProjectKeyIdentity {
  /** The row id of the key, for audit and rate limits. */
  keyRowId: string;
  /** The public part of the key. */
  keyId: string;
  projectId: string;
  organizationId: string;
  scopes: ProjectKeyScope[];
  expiresAt: Date;
}

export interface ProjectKeyAuthOptions {
  now?: () => Date;
  /** Address of the caller; checked against the key's allowed addresses and kept as last-used. */
  ip?: string | undefined;
}

/**
 * Checks the key and the project behind it. Returns null for anything wrong (unknown key, wrong
 * secret, revoked, expired, project not active, organization going away, address not allowed)
 * without saying which, so a caller cannot tell one from another.
 */
export async function authenticateProjectKey(
  db: Db,
  rawKey: string | null,
  options: ProjectKeyAuthOptions = {},
): Promise<ProjectKeyIdentity | null> {
  const parts = rawKey ? splitApiKey(rawKey, ['project']) : null;
  if (!parts) return null;
  const { keyId, secret } = parts;
  const now = (options.now ?? (() => new Date()))();

  // The tenant is not known before the key is, so the lookup alone runs without one.
  const [row] = await withMaintenance(db, 'key_lookup', (tx) =>
    tx
      .select({
        key: projectKeyTable,
        projectStatus: projectTable.status,
        organizationId: projectTable.organizationId,
      })
      .from(projectKeyTable)
      .innerJoin(projectTable, eq(projectTable.id, projectKeyTable.projectId))
      .where(eq(projectKeyTable.keyId, keyId))
      .limit(1),
  );

  // Always compare, so the time taken does not say whether the key id exists.
  const secretMatches = safeCompareHash(
    hashToken(secret),
    row ? row.key.secretHash : UNKNOWN_KEY_HASH,
  );
  if (!row || !secretMatches) return null;
  const { key } = row;
  if (key.revokedAt || key.expiresAt <= now) return null;
  if (row.projectStatus !== 'active') return null;
  if (key.allowedCidrs && key.allowedCidrs.length > 0 && !ipInCidrs(options.ip, key.allowedCidrs)) {
    return null;
  }

  const standing = await withTenant(db, { orgId: row.organizationId }, async (tx) => {
    const [org] = await tx
      .select({ id: organizationTable.id })
      .from(organizationTable)
      .where(
        and(
          eq(organizationTable.id, row.organizationId),
          isNull(organizationTable.deletionRequestedAt),
        ),
      )
      .limit(1);
    if (!org) return false;
    // One conditional update, so concurrent calls do not all write the same row.
    const stale = new Date(now.getTime() - LAST_USED_INTERVAL_MS);
    await tx
      .update(projectKeyTable)
      .set({ lastUsedAt: now, lastUsedIp: options.ip ?? null })
      .where(
        and(
          eq(projectKeyTable.id, key.id),
          or(isNull(projectKeyTable.lastUsedAt), lt(projectKeyTable.lastUsedAt, stale)),
        ),
      );
    return true;
  });
  if (!standing) return null;

  return {
    keyRowId: key.id,
    keyId: key.keyId,
    projectId: key.projectId,
    organizationId: row.organizationId,
    scopes: key.scopes as ProjectKeyScope[],
    expiresAt: key.expiresAt,
  };
}

/** What the key says about itself and its project; nothing about the project's users. */
export async function getProjectMe(
  tx: Executor,
  identity: ProjectKeyIdentity,
): Promise<Plain<ProjectMeResponse>> {
  const [project] = await tx
    .select({ id: projectTable.id, name: projectTable.name, status: projectTable.status })
    .from(projectTable)
    .where(eq(projectTable.id, identity.projectId))
    .limit(1);
  if (!project) throw notFound();
  return {
    project,
    key: {
      prefix: identity.keyId,
      scopes: identity.scopes,
      expiresAt: identity.expiresAt.toISOString(),
    },
  };
}
