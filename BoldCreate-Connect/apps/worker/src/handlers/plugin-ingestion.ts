/**
 * Ingests one plugin source: the domain fetches the archive for its ref and stores a pending
 * version.
 * Fetch and content problems are recorded on the ingestion and do not retry; only a payload the
 * worker cannot read throws.
 */
import { runIngestion, type IngestionDeps } from '@boldcreate-integrations/domain';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

export async function handlePluginIngestionRequested(
  job: ClaimedJob,
  deps: IngestionDeps,
): Promise<void> {
  const payload = job.payload;
  const ingestionId =
    typeof payload === 'object' && payload !== null
      ? (payload as { ingestionId?: unknown }).ingestionId
      : undefined;
  if (
    typeof ingestionId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(ingestionId)
  ) {
    throw new Error('Invalid ingestion payload');
  }
  await runIngestion(deps, ingestionId);
}
