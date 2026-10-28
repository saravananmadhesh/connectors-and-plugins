import { globalKey, type CacheKey, type CachePort } from '@boldcreate-integrations/ports';
import { insertOutbox, type Executor } from '@boldcreate-integrations/db';

/** The one channel on which processes learn that cached data changed. */
export const INVALIDATION_CHANNEL = 'boldcreate:invalidate';

export interface CatalogRevision {
  type: 'catalog';
  id?: string | undefined;
}

export function flagCacheKey(key: string): CacheKey {
  return globalKey('flag', key);
}

export function killCacheKey(kind: string, id: string): CacheKey {
  return globalKey('kill', kind, id);
}

/** The revision id that names a flag change. */
export function flagChangeId(key: string): string {
  return `flag:${key}`;
}

/** The revision id that names a kill switch change. */
export function killChangeId(kind: string, id: string): string {
  return `kill:${kind}:${id}`;
}

/** Enqueues the revision bump in the caller's transaction, so it exists only if the change does. */
export async function bumpCatalogRevision(tx: Pick<Executor, 'insert'>, id: string): Promise<void> {
  const payload: CatalogRevision = { type: 'catalog', id };
  await insertOutbox(tx, { type: 'revision.bumped', payload });
}

export function parseCatalogRevision(payload: unknown): CatalogRevision {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error('Invalid revision payload');
  }
  const { type, id } = payload as Record<string, unknown>;
  if (type !== 'catalog') throw new Error('Invalid revision type');
  if (id !== undefined && (typeof id !== 'string' || id.length === 0 || id.length > 200)) {
    throw new Error('Invalid revision id');
  }
  return { type, ...(id !== undefined ? { id } : {}) };
}

/** Removes the shared cache entry a revision id names, so the next read loads current data. */
export async function evictCatalogEntry(cache: CachePort, id: string | undefined): Promise<void> {
  if (!id) return;
  let key: CacheKey | null = null;
  if (id.startsWith('flag:')) {
    key = flagCacheKey(id.slice('flag:'.length));
  } else if (id.startsWith('kill:')) {
    const [kind, target] = id.slice('kill:'.length).split(':');
    if (kind && target) key = killCacheKey(kind, target);
  }
  if (key) await cache.delete(key);
}

/**
 * Subscribes a process to the invalidation channel: a `catalog` message drops the process-local
 * entries of every given store. Returns the unsubscribe function.
 */
export async function startInvalidation(
  cache: CachePort,
  stores: ReadonlyArray<{ invalidate(): void }>,
): Promise<() => Promise<void>> {
  return cache.subscribe(INVALIDATION_CHANNEL, (message) => {
    let revision: CatalogRevision;
    try {
      revision = parseCatalogRevision(JSON.parse(message));
    } catch {
      return;
    }
    if (revision.type !== 'catalog') return;
    for (const store of stores) store.invalidate();
  });
}
