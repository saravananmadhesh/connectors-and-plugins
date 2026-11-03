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
  leaveMaintenance,
  withMaintenance,
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
  /** Null for a key that never expires. */
  expiresAt: Date | null;
}

export interface ProjectKeyAuthOptions {
  now?: () => Date;
  /** Address of the caller; checked against the key's allowed addresses and kept as last-used. */
  ip?: string | undefined;
  /** When set, a verified key is trusted for the cache's lifetime instead of asked about each call. */
  cache?: ProjectKeyCache | undefined;
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
  const secretHash = hashToken(secret);
  const clock = options.now ?? (() => new Date());

  const cache = options.cache;
  if (!cache)
    return (await verifyProjectKey(db, keyId, secretHash, options, clock()))?.identity ?? null;
  return cache
    .resolve(`${keyId}.${secretHash}`, clock().getTime(), async () =>
      verifyProjectKey(db, keyId, secretHash, options, clock()),
    )
    .then((entry) => admit(entry, options.ip, clock()));
}

/** A key that passed every check but the caller's address, as held between calls. */
interface VerifiedKey {
  identity: ProjectKeyIdentity;
  allowedCidrs: string[] | null;
}

/** The checks that depend on the caller or the moment, so they run on a cached key too. */
function admit(
  entry: VerifiedKey | null,
  ip: string | undefined,
  now: Date,
): ProjectKeyIdentity | null {
  if (!entry) return null;
  const { identity, allowedCidrs } = entry;
  if (identity.expiresAt !== null && identity.expiresAt <= now) return null;
  if (allowedCidrs && allowedCidrs.length > 0 && !ipInCidrs(ip, allowedCidrs)) return null;
  return identity;
}

/**
 * Looks the key up and checks it, in one transaction: the tenant is not known before the key is, so
 * the lookup runs under the maintenance setting, which is dropped before the tenant one is set.
 */
async function verifyProjectKey(
  db: Db,
  keyId: string,
  secretHash: string,
  options: ProjectKeyAuthOptions,
  now: Date,
): Promise<VerifiedKey | null> {
  return withMaintenance(db, 'key_lookup', async (tx) => {
    const [row] = await tx
      .select({
        key: projectKeyTable,
        projectStatus: projectTable.status,
        organizationId: projectTable.organizationId,
      })
      .from(projectKeyTable)
      .innerJoin(projectTable, eq(projectTable.id, projectKeyTable.projectId))
      .where(eq(projectKeyTable.keyId, keyId))
      .limit(1);

    // Always compare, so the time taken does not say whether the key id exists.
    const secretMatches = safeCompareHash(secretHash, row ? row.key.secretHash : UNKNOWN_KEY_HASH);
    if (!row || !secretMatches) return null;
    const { key } = row;
    if (key.revokedAt || (key.expiresAt !== null && key.expiresAt <= now)) return null;
    if (row.projectStatus !== 'active') return null;
    if (
      key.allowedCidrs &&
      key.allowedCidrs.length > 0 &&
      !ipInCidrs(options.ip, key.allowedCidrs)
    ) {
      return null;
    }

    // Maintenance access ends here; what follows reads and writes as the key's organization.
    await leaveMaintenance(tx, { orgId: row.organizationId });
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
    if (!org) return null;
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

    return {
      identity: {
        keyRowId: key.id,
        keyId: key.keyId,
        projectId: key.projectId,
        organizationId: row.organizationId,
        scopes: key.scopes as ProjectKeyScope[],
        expiresAt: key.expiresAt,
      },
      allowedCidrs: key.allowedCidrs ?? null,
    };
  });
}

export interface ProjectKeyCacheOptions {
  /** How long a verified key is trusted without asking the database; a revoked key works this long. */
  ttlSeconds: number;
  /** Keys held at once; the oldest goes first. */
  maxEntries: number;
}

/**
 * Remembers verified project keys in this process and lets calls that arrive together for the same
 * key share one lookup. Only a successful check is kept, so a wrong key always reaches the database
 * and a newly valid key works at once.
 */
export interface ProjectKeyCache {
  resolve(
    cacheKey: string,
    nowMs: number,
    load: () => Promise<VerifiedKey | null>,
  ): Promise<VerifiedKey | null>;
  /** Forgets every key; for tests and for a revocation that must take effect now. */
  clear(): void;
}

export function createProjectKeyCache(options: ProjectKeyCacheOptions): ProjectKeyCache {
  const ttlMs = options.ttlSeconds * 1000;
  const held = new Map<string, { entry: VerifiedKey; expiresAtMs: number }>();
  const pending = new Map<string, Promise<VerifiedKey | null>>();

  return {
    async resolve(cacheKey, nowMs, load) {
      if (ttlMs <= 0) return load();
      const hit = held.get(cacheKey);
      if (hit && hit.expiresAtMs > nowMs) return hit.entry;
      if (hit) held.delete(cacheKey);

      const inFlight = pending.get(cacheKey);
      if (inFlight) return inFlight;

      const started = load()
        .then((entry) => {
          if (entry) {
            const keyEnd = entry.identity.expiresAt?.getTime() ?? Infinity;
            held.delete(cacheKey);
            held.set(cacheKey, { entry, expiresAtMs: Math.min(nowMs + ttlMs, keyEnd) });
            while (held.size > options.maxEntries) {
              const oldest = held.keys().next().value;
              if (oldest === undefined) break;
              held.delete(oldest);
            }
          }
          return entry;
        })
        .finally(() => pending.delete(cacheKey));
      pending.set(cacheKey, started);
      return started;
    },
    clear() {
      held.clear();
    },
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
      expiresAt: identity.expiresAt?.toISOString() ?? null,
    },
  };
}
