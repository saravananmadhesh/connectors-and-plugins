/**
 * Authenticates a request that carries an API key: the api (sync and downloads) and the gateway
 * (tool calls) both start here, so a key means the same thing everywhere.
 */
import { and, eq, isNull, lt, or } from 'drizzle-orm';
import {
  apiKeyTable,
  organizationTable,
  projectTable,
  userTable,
  withMaintenance,
  withTenant,
  type Db,
} from '@boldcreate-integrations/db';
import {
  KEY_PRESET_PERMISSIONS,
  type ApiKeyPrincipal,
  type KeyPermission,
} from '@boldcreate-integrations/contracts';
import {
  apiKeyKindOf,
  hashToken,
  splitApiKey,
  safeCompareHash,
} from '@boldcreate-integrations/security';
import type { Resource } from '../permissions/authorize.js';

export interface KeyIdentity {
  principal: ApiKeyPrincipal;
  /** The row id of the key, for audit and rate limits. */
  keyRowId: string;
}

const BEARER_KINDS = ['foryou', 'session'] as const;
/** `last_used_at` is written at most this often per key. */
const LAST_USED_INTERVAL_MS = 60_000;

/** The key out of an `Authorization: Bearer <key>` header, or null. */
export function bearerKey(header: string | undefined): string | null {
  if (!header?.startsWith('Bearer ')) return null;
  const key = header.slice(7).trim();
  return splitApiKey(key, BEARER_KINDS) ? key : null;
}

export interface KeyAuthOptions {
  now?: () => Date;
  /** Address of the caller, kept as last-used information. */
  ip?: string | undefined;
}

/**
 * Checks the key and what stands behind it: the organization is live, and a session key still has
 * an active project and project user behind it. Returns null for anything wrong, without saying which
 * part, so a caller cannot tell a revoked key from an unknown one.
 */
export async function authenticateKey(
  db: Db,
  rawKey: string | null,
  options: KeyAuthOptions = {},
): Promise<KeyIdentity | null> {
  if (!rawKey) return null;
  const parts = splitApiKey(rawKey, BEARER_KINDS);
  if (!parts) return null;
  const { keyId, secret } = parts;
  const now = (options.now ?? (() => new Date()))();

  const key = await withMaintenance(db, 'key_lookup', async (tx) => {
    const rows = await tx.select().from(apiKeyTable).where(eq(apiKeyTable.keyId, keyId)).limit(1);
    return rows[0];
  });
  if (!key) return null;
  // A session key is a `user` key that also names a project; the For You org key names none.
  const isSession = apiKeyKindOf(key.keyId) === 'session';
  if (isSession) {
    if (key.scopeType !== 'user' || !key.projectId) return null;
  } else if (apiKeyKindOf(key.keyId) !== 'foryou' || key.scopeType !== 'org' || key.projectId) {
    return null;
  }
  if (!safeCompareHash(hashToken(secret), key.secretHash)) return null;
  if (key.revokedAt) return null;
  if (key.expiresAt && key.expiresAt <= now) return null;

  const standing = await withTenant(
    db,
    { orgId: key.organizationId, userId: key.ownerUserId ?? undefined },
    async (tx) => {
      const [org] = await tx
        .select({
          id: organizationTable.id,
        })
        .from(organizationTable)
        .where(
          and(
            eq(organizationTable.id, key.organizationId),
            isNull(organizationTable.deletionRequestedAt),
          ),
        )
        .limit(1);
      if (!org) return null;

      if (isSession) {
        if (!key.ownerUserId || !key.projectId) return null;
        const [project] = await tx
          .select({ id: projectTable.id })
          .from(projectTable)
          .where(and(eq(projectTable.id, key.projectId), eq(projectTable.status, 'active')))
          .limit(1);
        if (!project) return null;
        const [person] = await tx
          .select({ id: userTable.id })
          .from(userTable)
          .where(
            and(
              eq(userTable.id, key.ownerUserId),
              eq(userTable.kind, 'external'),
              eq(userTable.status, 'active'),
              eq(userTable.projectId, key.projectId),
            ),
          )
          .limit(1);
        if (!person) return null;
        // One conditional update, so concurrent calls do not all write the same row.
        await tx
          .update(userTable)
          .set({ lastLoginAt: now })
          .where(
            and(
              eq(userTable.id, person.id),
              or(
                isNull(userTable.lastLoginAt),
                lt(userTable.lastLoginAt, new Date(now.getTime() - LAST_USED_INTERVAL_MS)),
              ),
            ),
          );
      }

      const stale =
        !key.lastUsedAt || now.getTime() - key.lastUsedAt.getTime() > LAST_USED_INTERVAL_MS;
      if (stale) {
        await tx
          .update(apiKeyTable)
          .set({ lastUsedAt: now, lastUsedIp: options.ip ?? null })
          .where(eq(apiKeyTable.id, key.id));
      }
      return true;
    },
  );
  if (!standing) return null;

  const permissions = key.permissions as KeyPermission[];
  const preset = KEY_PRESET_PERMISSIONS.agent.every((p) => permissions.includes(p))
    ? 'agent'
    : 'read_only';
  return {
    keyRowId: key.id,
    principal: {
      kind: 'api_key',
      keyId: key.keyId,
      orgId: key.organizationId,
      scope: key.scopeType,
      ...(key.ownerUserId ? { userId: key.ownerUserId } : {}),
      ...(isSession && key.projectId
        ? {
            projectId: key.projectId,
            ...(key.plugins && key.plugins.length > 0 ? { plugins: key.plugins } : {}),
            ...(key.toolPolicy ? { toolPolicy: key.toolPolicy } : {}),
            ...(key.authConfigs && Object.keys(key.authConfigs).length > 0
              ? { authConfigs: key.authConfigs }
              : {}),
          }
        : {}),
      preset,
      permissions,
    },
  };
}

/** The resource a key acts on: its own scope, which `authorize` compares with the action's rule. */
export function keyResource(principal: ApiKeyPrincipal): Resource {
  return {
    orgId: principal.orgId,
    scope: principal.scope,
    ownerUserId: principal.userId,
  };
}

/** The Authorization header of a Platform organization key, well formed or not. */
export function offersPlatformKey(header: string | undefined): boolean {
  return typeof header === 'string' && header.startsWith('Bearer plk_');
}

export interface PlatformKeyIdentity {
  keyRowId: string;
  keyId: string;
  orgId: string;
  /** The member who made the key; the key acts with this member's role. */
  userId: string;
}

/**
 * Checks a Platform organization key and the organization behind it. Returns null for anything
 * wrong, without saying which part. The role of the maker is not read here: the route's own check
 * reads it on every request, so a demoted or removed maker loses the key's rights at once.
 */
export async function authenticatePlatformKey(
  db: Db,
  header: string | undefined,
  options: KeyAuthOptions = {},
): Promise<PlatformKeyIdentity | null> {
  if (!offersPlatformKey(header)) return null;
  const rawKey = header!.slice(7).trim();
  const parts = splitApiKey(rawKey, ['platform']);
  if (!parts) return null;
  const now = (options.now ?? (() => new Date()))();

  const key = await withMaintenance(db, 'key_lookup', async (tx) => {
    const rows = await tx
      .select()
      .from(apiKeyTable)
      .where(eq(apiKeyTable.keyId, parts.keyId))
      .limit(1);
    return rows[0];
  });
  if (!key || key.scopeType !== 'org' || key.projectId) return null;
  if (!safeCompareHash(hashToken(parts.secret), key.secretHash)) return null;
  if (key.revokedAt || (key.expiresAt && key.expiresAt <= now)) return null;

  const live = await withTenant(
    db,
    { orgId: key.organizationId, userId: key.principalUserId },
    async (tx) => {
      const [org] = await tx
        .select({ id: organizationTable.id })
        .from(organizationTable)
        .where(
          and(
            eq(organizationTable.id, key.organizationId),
            isNull(organizationTable.deletionRequestedAt),
          ),
        )
        .limit(1);
      if (!org) return false;
      const stale =
        !key.lastUsedAt || now.getTime() - key.lastUsedAt.getTime() > LAST_USED_INTERVAL_MS;
      if (stale) {
        await tx
          .update(apiKeyTable)
          .set({ lastUsedAt: now, lastUsedIp: options.ip ?? null })
          .where(eq(apiKeyTable.id, key.id));
      }
      return true;
    },
  );
  if (!live) return null;
  return {
    keyRowId: key.id,
    keyId: key.keyId,
    orgId: key.organizationId,
    userId: key.principalUserId,
  };
}
