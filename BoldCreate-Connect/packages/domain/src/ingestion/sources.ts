/**
 * Plugin sources as the admin app manages them: add a GitHub folder, list, queue a sync, remove.
 * Syncing only queues work; the worker fetches and ingests.
 */
import { randomUUID } from 'node:crypto';
import { desc, eq, inArray } from 'drizzle-orm';
import {
  insertOutbox,
  insertOutboxBatch,
  pluginIngestionTable,
  pluginSourceTable,
  pluginTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  AdminPluginSourceBody,
  BulkSourceDeleteResponse,
  BulkSourceSyncResponse,
  CreatePluginSourceBody,
  InstalledSource,
  PluginIngestionResponse,
  PluginSourceResponse,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { conflict, isUniqueViolation, notFound, validationFailed } from '../errors.js';

export interface SourceActor {
  /** Admin email. */
  subject: string;
  requestId?: string | undefined;
  ip?: string | undefined;
}

type SourceRow = typeof pluginSourceTable.$inferSelect;
type IngestionRow = typeof pluginIngestionTable.$inferSelect;

const iso = (date: Date | null): string | null => (date ? date.toISOString() : null);

export function toSourceResponse(row: SourceRow): PluginSourceResponse {
  return {
    id: row.id,
    owner: row.owner,
    repository: row.repository,
    ref: row.ref,
    path: row.path,
    lastCommitSha: row.lastCommitSha,
    lastSyncedAt: iso(row.lastSyncedAt),
    lastStatus: row.lastStatus,
    lastError: row.lastError,
    lastNote: row.lastNote,
    createdAt: row.createdAt.toISOString(),
  };
}

export function toIngestionResponse(row: IngestionRow): PluginIngestionResponse {
  return {
    id: row.id,
    sourceId: row.sourceId,
    status: row.status,
    commitSha: row.commitSha,
    pluginVersionId: row.pluginVersionId,
    error: row.error,
    requestedBy: row.requestedBy,
    createdAt: row.createdAt.toISOString(),
    finishedAt: iso(row.finishedAt),
  };
}

export const isOwnerAllowed = (allowedOwners: readonly string[], owner: string): boolean => {
  if (allowedOwners.includes('*')) return true;
  return allowedOwners.some((allowed) => allowed.toLowerCase() === owner.toLowerCase());
};

export async function queueIngestion(
  tx: Pick<Executor, 'insert' | 'update' | 'transaction'>,
  sourceId: string,
  actor: SourceActor,
): Promise<IngestionRow> {
  const [ingestion] = await tx
    .insert(pluginIngestionTable)
    .values({ id: randomUUID(), sourceId, requestedBy: actor.subject })
    .returning();
  await tx
    .update(pluginSourceTable)
    .set({ lastStatus: 'queued', lastError: null })
    .where(eq(pluginSourceTable.id, sourceId));
  await insertOutbox(tx, {
    type: 'plugin_ingestion.requested',
    payload: { ingestionId: (ingestion as IngestionRow).id },
  });
  return ingestion as IngestionRow;
}

/** Every source with the plugin made from it, newest first. A source with no plugin never produced one. */
export async function listSources(db: Executor): Promise<InstalledSource[]> {
  const rows = await db
    .select({
      source: pluginSourceTable,
      pluginId: pluginTable.id,
      pluginName: pluginTable.name,
      pluginDisplayName: pluginTable.displayName,
      pluginStatus: pluginTable.status,
    })
    .from(pluginSourceTable)
    .leftJoin(pluginTable, eq(pluginTable.sourceId, pluginSourceTable.id))
    .orderBy(desc(pluginSourceTable.createdAt), pluginSourceTable.path);
  return rows.map((row) => ({
    ...toSourceResponse(row.source),
    plugin:
      row.pluginId && row.pluginName && row.pluginDisplayName && row.pluginStatus
        ? {
            id: row.pluginId,
            name: row.pluginName,
            displayName: row.pluginDisplayName,
            status: row.pluginStatus,
          }
        : null,
  }));
}

/** Adds a source and queues its first sync. Only owners on the allow-list are accepted. */
export async function createSource(
  db: Executor,
  allowedOwners: readonly string[],
  body: CreatePluginSourceBody,
  actor: SourceActor,
): Promise<PluginSourceResponse> {
  if (!isOwnerAllowed(allowedOwners, body.owner)) {
    throw validationFailed([{ field: 'owner', message: 'This owner is not on the allow-list.' }]);
  }
  try {
    return await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(pluginSourceTable)
        .values({ id: randomUUID(), ...body, createdBy: actor.subject })
        .returning();
      const source = row as SourceRow;
      await queueIngestion(tx, source.id, actor);
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'plugin_source.created',
        target: { kind: 'plugin_source', id: source.id },
        context: { owner: body.owner, repository: body.repository, ref: body.ref, path: body.path },
        requestId: actor.requestId,
        ip: actor.ip,
      });
      const [queued] = await tx
        .select()
        .from(pluginSourceTable)
        .where(eq(pluginSourceTable.id, source.id));
      return toSourceResponse(queued as SourceRow);
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

/**
 * Points a source at another repository, branch or folder and queues a sync from there. Refused
 * while a sync of the source is waiting or running; what was read before stays in the catalog.
 */
export async function updateSource(
  db: Executor,
  allowedOwners: readonly string[],
  sourceId: string,
  body: AdminPluginSourceBody,
  actor: SourceActor,
): Promise<PluginSourceResponse> {
  if (!isOwnerAllowed(allowedOwners, body.owner)) {
    throw validationFailed([{ field: 'owner', message: 'This owner is not on the allow-list.' }]);
  }
  try {
    return await db.transaction(async (tx) => {
      const [current] = await tx
        .select()
        .from(pluginSourceTable)
        .where(eq(pluginSourceTable.id, sourceId))
        .for('update');
      if (!current) throw notFound();
      if (current.lastStatus === 'queued' || current.lastStatus === 'running') throw conflict();
      await tx
        .update(pluginSourceTable)
        .set({ ...body, lastCommitSha: null, lastError: null, lastNote: null, lastStatus: null })
        .where(eq(pluginSourceTable.id, sourceId));
      await queueIngestion(tx, sourceId, actor);
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'plugin_source.updated',
        target: { kind: 'plugin_source', id: sourceId },
        context: {
          from: {
            owner: current.owner,
            repository: current.repository,
            ref: current.ref,
            path: current.path,
          },
          to: body,
        },
        requestId: actor.requestId,
        ip: actor.ip,
      });
      const [queued] = await tx
        .select()
        .from(pluginSourceTable)
        .where(eq(pluginSourceTable.id, sourceId));
      return toSourceResponse(queued as SourceRow);
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

/** Queues another sync unless one is already waiting or running. */
export async function requestSync(
  db: Executor,
  sourceId: string,
  actor: SourceActor,
): Promise<PluginIngestionResponse> {
  return db.transaction(async (tx) => {
    const [source] = await tx
      .select()
      .from(pluginSourceTable)
      .where(eq(pluginSourceTable.id, sourceId))
      .for('update');
    if (!source) throw notFound();
    if (source.lastStatus === 'queued' || source.lastStatus === 'running') throw conflict();
    const ingestion = await queueIngestion(tx, sourceId, actor);
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'plugin_ingestion.requested',
      target: { kind: 'plugin_source', id: sourceId },
      requestId: actor.requestId,
      ip: actor.ip,
    });
    return toIngestionResponse(ingestion);
  });
}

export async function listIngestions(
  db: Executor,
  sourceId: string,
): Promise<PluginIngestionResponse[]> {
  const [source] = await db
    .select({ id: pluginSourceTable.id })
    .from(pluginSourceTable)
    .where(eq(pluginSourceTable.id, sourceId));
  if (!source) throw notFound();
  const rows = await db
    .select()
    .from(pluginIngestionTable)
    .where(eq(pluginIngestionTable.sourceId, sourceId))
    .orderBy(desc(pluginIngestionTable.createdAt))
    .limit(20);
  return rows.map(toIngestionResponse);
}

export async function deleteSource(
  db: Executor,
  sourceId: string,
  actor: SourceActor,
): Promise<void> {
  await db.transaction(async (tx) => {
    const removed = await tx
      .delete(pluginSourceTable)
      .where(eq(pluginSourceTable.id, sourceId))
      .returning({ id: pluginSourceTable.id });
    if (removed.length === 0) throw notFound();
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'plugin_source.deleted',
      target: { kind: 'plugin_source', id: sourceId },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
}

/**
 * Queues a sync for each source that is not already waiting or running, with one query per step
 * rather than one transaction per source.
 */
export async function requestBulkSync(
  db: Executor,
  ids: readonly string[],
  actor: SourceActor,
): Promise<BulkSourceSyncResponse> {
  return db.transaction(async (tx) => {
    const found = await tx
      .select({ id: pluginSourceTable.id, lastStatus: pluginSourceTable.lastStatus })
      .from(pluginSourceTable)
      .where(inArray(pluginSourceTable.id, [...ids]))
      .for('update');
    const queued = found
      .filter((row) => row.lastStatus !== 'queued' && row.lastStatus !== 'running')
      .map((row) => row.id);
    const queuedSet = new Set(queued);
    const skipped = ids.filter((id) => !queuedSet.has(id));
    if (queued.length === 0) return { queued, skipped };

    const ingestions = queued.map((sourceId) => ({
      id: randomUUID(),
      sourceId,
      requestedBy: actor.subject,
    }));
    await tx.insert(pluginIngestionTable).values(ingestions);
    await tx
      .update(pluginSourceTable)
      .set({ lastStatus: 'queued', lastError: null })
      .where(inArray(pluginSourceTable.id, queued));
    await insertOutboxBatch(
      tx,
      'plugin_ingestion.requested',
      ingestions.map((ingestion) => ({ ingestionId: ingestion.id })),
    );
    for (const sourceId of queued) {
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'plugin_ingestion.requested',
        target: { kind: 'plugin_source', id: sourceId },
        requestId: actor.requestId,
        ip: actor.ip,
      });
    }
    return { queued, skipped };
  });
}

/** Removes many sources with one delete; ingestion history goes with them. */
export async function deleteSources(
  db: Executor,
  ids: readonly string[],
  actor: SourceActor,
): Promise<BulkSourceDeleteResponse> {
  return db.transaction(async (tx) => {
    const removed = await tx
      .delete(pluginSourceTable)
      .where(inArray(pluginSourceTable.id, [...ids]))
      .returning({ id: pluginSourceTable.id });
    for (const { id } of removed) {
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'plugin_source.deleted',
        target: { kind: 'plugin_source', id },
        requestId: actor.requestId,
        ip: actor.ip,
      });
    }
    return { deleted: removed.map((row) => row.id) };
  });
}
