import { eq } from 'drizzle-orm';
import { featureFlagTable, type Executor } from '@boldcreate-integrations/db';
import { FLAG_DEFAULTS, isFlagKey, type FlagKey } from '@boldcreate-integrations/limits';
import type { CachePort, ClockPort } from '@boldcreate-integrations/ports';
import { writeAudit } from '../audit/write-audit.js';
import { bumpCatalogRevision, flagCacheKey, flagChangeId } from './catalog-revision.js';
import { createLayeredLookup } from './layered-lookup.js';

export interface FlagStoreOptions {
  db: Executor;
  cache?: CachePort | undefined;
  clock: ClockPort;
  ttlSeconds: number;
}

export interface FlagStore {
  /** Process-local cache, then the shared cache, then Postgres, then the built-in default. */
  isEnabled(key: FlagKey): Promise<boolean>;
  /** Drops the process-local entries. */
  invalidate(): void;
}

function assertKnown(key: string): asserts key is FlagKey {
  if (!isFlagKey(key)) throw new Error(`Unknown feature flag: ${key}`);
}

export function createFlagStore(options: FlagStoreOptions): FlagStore {
  const lookup = createLayeredLookup(options);
  return {
    async isEnabled(key) {
      assertKnown(key);
      return lookup.read(key, flagCacheKey(key), async () => {
        const [row] = await options.db
          .select({ enabled: featureFlagTable.enabled })
          .from(featureFlagTable)
          .where(eq(featureFlagTable.key, key))
          .limit(1);
        return row ? row.enabled : FLAG_DEFAULTS[key];
      });
    },
    invalidate() {
      lookup.clear();
    },
  };
}

export interface SetFlagInput {
  key: string;
  enabled: boolean;
  /** Id of the platform administrator identity making the change. */
  actor: string;
  description?: string | undefined;
}

/**
 * Stores a flag value. The audit row and the revision job are written in the caller's
 * transaction, so a change that does not commit leaves neither behind. The shared cache entry is
 * dropped on a best-effort basis when a cache is given; the revision job drops it again.
 */
export async function setFlag(
  tx: Executor,
  input: SetFlagInput,
  evict?: CachePort | undefined,
): Promise<void> {
  assertKnown(input.key);
  const now = new Date();
  await tx
    .insert(featureFlagTable)
    .values({
      key: input.key,
      enabled: input.enabled,
      ...(input.description !== undefined ? { description: input.description } : {}),
      updatedBy: input.actor,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: featureFlagTable.key,
      set: {
        enabled: input.enabled,
        ...(input.description !== undefined ? { description: input.description } : {}),
        updatedBy: input.actor,
        updatedAt: now,
      },
    });
  await writeAudit(tx, {
    actor: { kind: 'platform_admin', id: input.actor },
    action: 'feature_flag.changed',
    target: { kind: 'feature_flag', id: input.key },
    context: { enabled: input.enabled },
  });
  await bumpCatalogRevision(tx, flagChangeId(input.key));
  if (evict) {
    const key = flagCacheKey(input.key);
    await evict.delete(key).catch(() => undefined);
  }
}
