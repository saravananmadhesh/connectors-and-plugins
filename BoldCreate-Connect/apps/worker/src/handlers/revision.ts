/**
 * Tells every process that cached data changed: removes the shared cache entry the revision
 * names, then publishes the revision on the single invalidation channel. A failure throws so the
 * queue retries the job; publishing the same revision twice is harmless.
 */
import {
  evictCatalogEntry,
  INVALIDATION_CHANNEL,
  parseCatalogRevision,
} from '@boldcreate-integrations/domain';
import type { CachePort, ClaimedJob } from '@boldcreate-integrations/ports';

export interface RevisionHandlerDeps {
  /** Absent when the worker has no cache configured; the job then fails and is retried. */
  cache?: CachePort | undefined;
}

export async function handleRevisionBumped(
  job: ClaimedJob,
  deps: RevisionHandlerDeps,
): Promise<void> {
  const revision = parseCatalogRevision(job.payload);
  if (!deps.cache) throw new Error('No cache is configured');
  await evictCatalogEntry(deps.cache, revision.id);
  await deps.cache.publish(
    INVALIDATION_CHANNEL,
    JSON.stringify({ type: revision.type, ...(revision.id ? { id: revision.id } : {}) }),
  );
}
