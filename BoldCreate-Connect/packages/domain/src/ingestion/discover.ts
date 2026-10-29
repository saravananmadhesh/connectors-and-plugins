/**
 * Inspecting a repository before installing from it: list the plugins found, then add a source
 * for only the folders the operator picked. Nothing is stored until a source is added; the
 * worker then ingests each one as a pending version.
 */
import { and, eq } from 'drizzle-orm';
import { pluginSourceTable, pluginTable, type Executor } from '@boldcreate-integrations/db';
import type {
  DiscoverPluginsBody,
  DiscoverPluginsResponse,
  InstallPluginsBody,
  InstallPluginsResponse,
} from '@boldcreate-integrations/contracts';
import { AppError, validationFailed } from '../errors.js';
import { discoverPlugins, type IngestionDeps } from './ingest.js';
import { logoUrl } from './logo.js';
import { createSource, isOwnerAllowed, toSourceResponse, type SourceActor } from './sources.js';
import { IngestionError } from './tar.js';

export interface DiscoverDeps {
  db: Executor;
  fetchArchive: IngestionDeps['fetchArchive'];
  allowedOwners: readonly string[];
}

function requireOwner(allowedOwners: readonly string[], owner: string): void {
  if (!isOwnerAllowed(allowedOwners, owner)) {
    throw validationFailed([{ field: 'owner', message: 'This owner is not on the allow-list.' }]);
  }
}

type KnownSource = {
  sourceId: string;
  syncStatus: 'queued' | 'running' | 'succeeded' | 'failed' | null;
  lastSyncedAt: Date | null;
  lastError: string | null;
  pluginId: string | null;
  pluginStatus: 'active' | 'deprecated' | 'suspended' | null;
};

function installedOf(
  row: KnownSource | undefined,
): DiscoverPluginsResponse['plugins'][number]['installed'] {
  if (!row) return null;
  return {
    sourceId: row.sourceId,
    pluginId: row.pluginId,
    pluginStatus: row.pluginStatus,
    syncStatus: row.syncStatus,
    lastSyncedAt: row.lastSyncedAt?.toISOString() ?? null,
    lastError: row.lastError,
  };
}

/** Downloads the repository at `ref` and lists the plugins in it, marking those already added. */
export async function discoverRepository(
  deps: DiscoverDeps,
  body: DiscoverPluginsBody,
): Promise<DiscoverPluginsResponse> {
  requireOwner(deps.allowedOwners, body.owner);
  let found: ReturnType<typeof discoverPlugins>;
  let commitSha: string;
  try {
    const fetched = await deps.fetchArchive(body);
    commitSha = fetched.commitSha;
    found = discoverPlugins(fetched.tarball, body.path);
  } catch (error) {
    const message =
      error instanceof IngestionError ? error.message : 'The repository could not be inspected.';
    throw validationFailed([{ field: 'repository', message }]);
  }

  const known = await deps.db
    .select({
      sourceId: pluginSourceTable.id,
      path: pluginSourceTable.path,
      syncStatus: pluginSourceTable.lastStatus,
      lastSyncedAt: pluginSourceTable.lastSyncedAt,
      lastError: pluginSourceTable.lastError,
      pluginId: pluginTable.id,
      pluginStatus: pluginTable.status,
    })
    .from(pluginSourceTable)
    .leftJoin(pluginTable, eq(pluginTable.sourceId, pluginSourceTable.id))
    .where(
      and(
        eq(pluginSourceTable.owner, body.owner),
        eq(pluginSourceTable.repository, body.repository),
        eq(pluginSourceTable.ref, body.ref),
      ),
    );
  const installedByPath = new Map(known.map((row) => [row.path, row]));

  return {
    owner: body.owner,
    repository: body.repository,
    ref: body.ref,
    commitSha,
    layout: found.layout,
    notes: found.notes,
    plugins: found.candidates.map((candidate) => ({
      path: candidate.path,
      name: candidate.manifest?.name ?? null,
      displayName: candidate.manifest?.displayName ?? candidate.label,
      logoUrl: logoUrl(body, commitSha, candidate.path, candidate.logo),
      version: candidate.manifest?.version ?? null,
      summary: candidate.manifest?.summary ?? null,
      categories: candidate.manifest?.categories ?? [],
      componentCounts: candidate.componentCounts,
      mcpTransports: candidate.mcpTransports,
      problem: candidate.problem,
      installed: installedOf(installedByPath.get(candidate.path)),
    })),
  };
}

/** Adds a source for each chosen folder and queues its sync; folders already added are left alone. */
export async function installPlugins(
  db: Executor,
  allowedOwners: readonly string[],
  body: InstallPluginsBody,
  actor: SourceActor,
): Promise<InstallPluginsResponse> {
  requireOwner(allowedOwners, body.owner);
  const items: InstallPluginsResponse['items'] = [];
  for (const path of new Set(body.paths)) {
    const where = and(
      eq(pluginSourceTable.owner, body.owner),
      eq(pluginSourceTable.repository, body.repository),
      eq(pluginSourceTable.ref, body.ref),
      eq(pluginSourceTable.path, path),
    );
    const [existing] = await db.select().from(pluginSourceTable).where(where);
    if (existing) {
      items.push({ path, outcome: 'exists', source: toSourceResponse(existing) });
      continue;
    }
    try {
      const source = await createSource(
        db,
        allowedOwners,
        {
          owner: body.owner,
          repository: body.repository,
          ref: body.ref,
          path,
          featured: body.featured,
          verified: body.verified,
          visibility: body.visibility,
        },
        actor,
      );
      items.push({ path, outcome: 'added', source });
    } catch (error) {
      // Added by someone else between the check and the insert.
      if (!(error instanceof AppError) || error.code !== 'conflict') throw error;
      const [raced] = await db.select().from(pluginSourceTable).where(where);
      if (!raced) throw error;
      items.push({ path, outcome: 'exists', source: toSourceResponse(raced) });
    }
  }
  return { items };
}
