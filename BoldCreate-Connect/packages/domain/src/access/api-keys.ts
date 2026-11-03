import { randomUUID } from 'node:crypto';
import { eq, and, isNull, desc, lt, lte, or, type SQL } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import { API_KEY_LIMITS } from '@boldcreate-integrations/limits';
import {
  apiKeyTable,
  encodeCursor,
  decodeCursor,
  assertValidScope,
} from '@boldcreate-integrations/db';
import type { ScopeContext } from '@boldcreate-integrations/db';
import { apiKeyKindOf, generateApiKeyParts, hashToken } from '@boldcreate-integrations/security';
import type {
  CreateApiKeyBody,
  ApiKeyResponse,
  ApiKeyCreatedResponse,
  ApiKeyKind,
  PageQuery,
  Plain,
} from '@boldcreate-integrations/contracts';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { resourceOfScope } from '../permissions/context.js';
import { writeAudit } from '../audit/write-audit.js';
import { lockKeyOwner } from '../tenancy/locks.js';
import { appError, notFound, validationFailed } from '../errors.js';

function toApiKeyResponse(row: typeof apiKeyTable.$inferSelect): Plain<ApiKeyResponse> {
  return {
    id: row.id,
    prefix: row.keyId,
    name: row.name,
    scope: row.scopeType,
    permissions: row.permissions as Plain<ApiKeyResponse>['permissions'],
    lastFour: row.lastFour,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    revokedAt: row.revokedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

/**
 * The For You key reaches the whole organization, so only an organization admin handles it. A
 * Platform key acts with its maker's role, so an admin or a member makes one; a viewer cannot.
 */
function requireOrgKeyRights(
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  kind: ApiKeyKind,
): void {
  if (scope.scopeType !== 'org') return;
  if (kind === 'platform') {
    requireAction(principal, 'api-key:create', resourceOfScope(scope));
    return;
  }
  requireAction(principal, 'member:update', resourceOfScope(scope));
}

export async function listApiKeys(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  query: PageQuery,
): Promise<{ items: Plain<ApiKeyResponse>[]; nextCursor: string | null; hasMore: boolean }> {
  assertValidScope(scope);
  requireAction(principal, 'api-key:list', resourceOfScope(scope));

  const limit = query.limit;
  const conditions: SQL[] = [
    eq(apiKeyTable.organizationId, scope.organizationId),
    eq(apiKeyTable.scopeType, scope.scopeType),
    eq(apiKeyTable.principalUserId, principal.userId),
  ];
  if (scope.ownerUserId) conditions.push(eq(apiKeyTable.ownerUserId, scope.ownerUserId));

  if (query.cursor) {
    const { createdAt, id } = decodeCursor(query.cursor);
    const clause = or(
      lt(apiKeyTable.createdAt, new Date(createdAt)),
      and(lte(apiKeyTable.createdAt, new Date(createdAt)), lt(apiKeyTable.id, id)),
    );
    if (clause) conditions.push(clause);
  }

  const rows = await db
    .select()
    .from(apiKeyTable)
    .where(and(...conditions))
    .orderBy(desc(apiKeyTable.createdAt))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const items = rows.slice(0, limit).map(toApiKeyResponse);
  const last = items[items.length - 1];
  const nextCursor = hasMore && last ? encodeCursor(new Date(last.createdAt), last.id) : null;

  return { items, nextCursor, hasMore };
}

/** The For You org key: the key of the For You area, one set per organization. */
export async function createApiKey(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  body: CreateApiKeyBody,
): Promise<Plain<ApiKeyCreatedResponse>> {
  assertValidScope(scope);
  if (scope.scopeType !== 'org') throw notFound();
  requireAction(principal, 'api-key:create', resourceOfScope(scope));
  requireOrgKeyRights(principal, scope, body.kind);

  const allPermissions: Plain<ApiKeyResponse>['permissions'] =
    body.kind === 'platform'
      ? ['org:manage']
      : ['mcp:list', 'mcp:call', 'artifact:sync', 'artifact:download'];
  const invalid = body.permissions.filter((p) => !allPermissions.includes(p));
  if (invalid.length > 0) {
    throw validationFailed([
      { field: 'permissions', message: `not allowed: ${invalid.join(', ')}` },
    ]);
  }

  const now = new Date();

  const { keyId, secret, lastFour } = generateApiKeyParts(body.kind);
  const secretHash = hashToken(secret);
  const rawKey = `${keyId}.${secret}`;
  const id = randomUUID();

  await db.transaction(async (tx) => {
    // Cap: max 10 active keys per scope. The owner row is locked first, so two creates for the
    // same owner cannot both count the keys that exist before either has inserted its own.
    await lockKeyOwner(tx, 'org', scope.organizationId);
    const existingRows = await tx
      .select({ id: apiKeyTable.id })
      .from(apiKeyTable)
      .where(
        and(
          eq(apiKeyTable.organizationId, scope.organizationId),
          eq(apiKeyTable.scopeType, scope.scopeType),
          eq(apiKeyTable.principalUserId, principal.userId),
          isNull(apiKeyTable.revokedAt),
        ),
      );
    if (existingRows.length >= 10) throw appError('api_key_quota_exceeded');
    await tx.insert(apiKeyTable).values({
      id,
      keyId,
      secretHash,
      principalUserId: principal.userId,
      organizationId: scope.organizationId,
      scopeType: scope.scopeType,
      ownerUserId: scope.ownerUserId ?? null,
      createdBy: principal.userId,
      name: body.name,
      lastFour,
      permissions: body.permissions,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      revokedAt: null,
      lastUsedAt: null,
      lastUsedIp: null,
      rateLimitPerMinute: body.rateLimitPerMinute ?? API_KEY_LIMITS.requestsPerMinutePerKey,
      createdAt: now,
      updatedAt: now,
    });
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'api_key.created',
      target: { kind: 'api_key', id },
      orgId: scope.organizationId,
      context: { scope: scope.scopeType, prefix: keyId },
    });
  });

  return {
    id,
    prefix: keyId,
    name: body.name,
    scope: scope.scopeType,
    permissions: body.permissions,
    lastFour,
    expiresAt: body.expiresAt ?? null,
    revokedAt: null,
    createdAt: now.toISOString(),
    rawKey,
  };
}

export async function revokeApiKey(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  keyId: string,
): Promise<void> {
  assertValidScope(scope);
  requireAction(principal, 'api-key:revoke', resourceOfScope(scope));

  const rows = await db
    .select({ id: apiKeyTable.id, revokedAt: apiKeyTable.revokedAt, keyId: apiKeyTable.keyId })
    .from(apiKeyTable)
    .where(
      and(
        eq(apiKeyTable.id, keyId),
        eq(apiKeyTable.organizationId, scope.organizationId),
        eq(apiKeyTable.scopeType, scope.scopeType),
        eq(apiKeyTable.principalUserId, principal.userId),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) throw notFound();
  requireOrgKeyRights(
    principal,
    scope,
    apiKeyKindOf(row.keyId) === 'platform' ? 'platform' : 'foryou',
  );
  // Idempotent: already revoked is fine
  if (row.revokedAt) return;

  await db.transaction(async (tx) => {
    await tx
      .update(apiKeyTable)
      .set({ revokedAt: new Date(), updatedAt: new Date() })
      .where(eq(apiKeyTable.id, keyId));
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'api_key.revoked',
      target: { kind: 'api_key', id: keyId },
      orgId: scope.organizationId,
      context: { scope: scope.scopeType },
    });
  });
}
