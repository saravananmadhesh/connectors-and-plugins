/**
 * Removes the archives of deleted plugins. The admin app only records which ones its delete left
 * without a version; this worker holds the storage permission and does the removal. An archive
 * that a version still points at is kept, and removing one that is already gone is harmless, so a
 * retried job does no damage.
 */
import {
  parseArchivePurgePayload,
  purgeArchives,
  type IngestionDeps,
} from '@boldcreate-integrations/domain';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

export async function handlePluginArchivePurgeRequested(
  job: ClaimedJob,
  deps: Pick<IngestionDeps, 'db' | 'blob'>,
): Promise<void> {
  await purgeArchives(deps.db, deps.blob, parseArchivePurgePayload(job.payload));
}
