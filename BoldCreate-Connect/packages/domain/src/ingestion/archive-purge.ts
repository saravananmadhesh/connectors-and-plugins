/**
 * Removing the archive of a deleted plugin. A plugin that is installed cannot be deleted, so once
 * its rows are gone nothing depends on its archive. The admin app only records which archives its
 * delete left without a version; the worker, which holds the storage permission, removes them.
 */
import { eq, inArray } from 'drizzle-orm';
import {
  componentTable,
  insertOutbox,
  pluginVersionTable,
  type Executor,
  type Inserter,
} from '@boldcreate-integrations/db';
import type { BlobPort } from '@boldcreate-integrations/ports';

/** The job the worker handles. */
export const ARCHIVE_PURGE_JOB = 'plugin_archive.purge_requested';

const SHA256 = /^[0-9a-f]{64}$/;

/**
 * Every archive the given plugins hold: one per version and one per component. Read it before the
 * rows are deleted, then pass it to `requestArchivePurge`.
 */
export async function archiveHashesOf(
  tx: Pick<Executor, 'select'>,
  pluginIds: readonly string[],
): Promise<string[]> {
  if (pluginIds.length === 0) return [];
  const versions = await tx
    .select({ id: pluginVersionTable.id, sha256: pluginVersionTable.archiveSha256 })
    .from(pluginVersionTable)
    .where(inArray(pluginVersionTable.pluginId, [...pluginIds]));
  if (versions.length === 0) return [];
  const components = await tx
    .select({ sha256: componentTable.archiveSha256 })
    .from(componentTable)
    .where(
      inArray(
        componentTable.pluginVersionId,
        versions.map((row) => row.id),
      ),
    );
  return [...versions, ...components]
    .map((row) => row.sha256)
    .filter((sha): sha is string => sha !== null);
}

/** Most hashes one job carries, so a bulk delete cannot make an oversized payload. */
const MAX_PER_JOB = 200;

/**
 * Queues the removal of archives inside the caller's transaction, so it exists exactly when the
 * delete committed. Hashes are listed once and anything that is not a hash is ignored.
 */
export async function requestArchivePurge(
  tx: Inserter,
  sha256s: readonly (string | null)[],
): Promise<void> {
  const wanted = [
    ...new Set(sha256s.filter((sha): sha is string => sha !== null && SHA256.test(sha))),
  ];
  for (let start = 0; start < wanted.length; start += MAX_PER_JOB) {
    await insertOutbox(tx, {
      type: ARCHIVE_PURGE_JOB,
      payload: { sha256s: wanted.slice(start, start + MAX_PER_JOB) },
    });
  }
}

export interface PurgeResult {
  removed: string[];
  /** Archives a plugin version or a component still points at, which stay. */
  kept: string[];
}

/**
 * Removes each archive no plugin version or component points at. Archives are stored by content,
 * so two versions or components with the same files share one; it goes only with the last of them. Removing an
 * archive that is already gone is not an error, so a retried job is harmless.
 */
export async function purgeArchives(
  db: Pick<Executor, 'select'>,
  blob: Pick<BlobPort, 'delete'>,
  sha256s: readonly string[],
): Promise<PurgeResult> {
  const result: PurgeResult = { removed: [], kept: [] };
  for (const sha of new Set(sha256s)) {
    if (!SHA256.test(sha)) continue;
    const inUse = await db
      .select({ id: pluginVersionTable.id })
      .from(pluginVersionTable)
      .where(eq(pluginVersionTable.archiveSha256, sha))
      .limit(1);
    const inComponent = inUse.length
      ? []
      : await db
          .select({ id: componentTable.id })
          .from(componentTable)
          .where(eq(componentTable.archiveSha256, sha))
          .limit(1);
    if (inUse.length > 0 || inComponent.length > 0) {
      result.kept.push(sha);
      continue;
    }
    await blob.delete(sha);
    result.removed.push(sha);
  }
  return result;
}

/** What a job payload must hold; anything else is a bug and is refused so it is not retried blindly. */
export function parseArchivePurgePayload(payload: unknown): string[] {
  const list =
    typeof payload === 'object' && payload !== null
      ? (payload as { sha256s?: unknown }).sha256s
      : undefined;
  if (
    !Array.isArray(list) ||
    list.length === 0 ||
    list.length > MAX_PER_JOB ||
    !list.every((sha) => typeof sha === 'string' && SHA256.test(sha))
  ) {
    throw new Error('Invalid archive purge payload');
  }
  return list as string[];
}
