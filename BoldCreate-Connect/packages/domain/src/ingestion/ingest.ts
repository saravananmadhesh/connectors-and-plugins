/**
 * Turns a fetched repository archive into a `pending` plugin version: the plugin folder is
 * extracted safely, its manifest read, its contents scanned and repacked, and rows are written
 * for an operator to review. Nothing here publishes; approval is a separate step.
 */
import { createHash, randomUUID } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import {
  componentTable,
  pluginIngestionTable,
  pluginSourceTable,
  pluginTable,
  pluginVersionTable,
  type Executor,
  type Tx,
} from '@boldcreate-integrations/db';
import type { BlobPort } from '@boldcreate-integrations/ports';
import { writeAudit } from '../audit/write-audit.js';
import { linkDefaultCategory, linkManifestCategories } from '../marketplace/categories.js';
import { hasPluginManifest, readCollection } from './collection.js';
import { packComponentArchives, type ComponentArchive } from './component-archives.js';
import { parseManifest, peekManifestLabel, type ParsedManifest } from './manifest.js';
import { scanPlugin, type ScanReport } from './scan.js';
import { queueIngestion } from './sources.js';
import {
  DEFAULT_ARCHIVE_LIMITS,
  extractTarGz,
  IngestionError,
  packTarGz,
  type ArchiveLimits,
  type SkippedItem,
} from './tar.js';

export interface PreparedPlugin {
  manifest: ParsedManifest;
  scan: ScanReport;
  archive: Buffer;
  archiveSha256: string;
  /** One archive per file component, keyed `kind:name`. */
  componentArchives: Map<string, ComponentArchive>;
}

const MCP_CONFIG_FILE = 'mcp.json';

/** Keeps only the files under `folder` (empty for the whole repository) and strips the prefix. */
function filesUnder(files: Map<string, Buffer>, folder: string): Map<string, Buffer> {
  if (folder === '') return files;
  const prefix = `${folder.replace(/^\/+|\/+$/g, '')}/`;
  const picked = new Map<string, Buffer>();
  for (const [path, body] of files) {
    if (path.startsWith(prefix)) picked.set(path.slice(prefix.length), body);
  }
  if (picked.size === 0)
    throw new IngestionError('The plugin folder was not found in the repository.');
  return picked;
}

function prepareFiles(files: Map<string, Buffer>, skipped: SkippedItem[]): PreparedPlugin {
  const manifest = parseManifest(files);
  const scan = scanPlugin(files, manifest.variables, skipped);
  // The plugin's own MCP configuration never ships: agents reach MCP only through the gateway.
  // The scan above already read it from the source files.
  const shipped = new Map(files);
  shipped.delete(MCP_CONFIG_FILE);
  const archive = packTarGz(shipped);
  return {
    manifest,
    scan,
    archive,
    archiveSha256: createHash('sha256').update(archive).digest('hex'),
    componentArchives: packComponentArchives(shipped, scan.components),
  };
}

export function prepareIngestion(
  tarball: Uint8Array,
  folder: string,
  limits: ArchiveLimits = DEFAULT_ARCHIVE_LIMITS,
): PreparedPlugin {
  const extracted = extractTarGz(tarball, limits);
  return prepareFiles(filesUnder(extracted.files, folder), extracted.skipped);
}

export type InspectedSource =
  | { kind: 'plugin'; prepared: PreparedPlugin }
  | {
      /** The folder lists other plugins; `folders` are the ones found, relative to it. */
      kind: 'collection';
      folders: string[];
      skipped: string[];
    };

/** Reads a source folder as one plugin, or as a list of plugins when it has a marketplace manifest. */
export function inspectSource(
  tarball: Uint8Array,
  folder: string,
  limits: ArchiveLimits = DEFAULT_ARCHIVE_LIMITS,
): InspectedSource {
  const extracted = extractTarGz(tarball, limits);
  const files = filesUnder(extracted.files, folder);
  const collection = hasPluginManifest(files) ? null : readCollection(files);
  if (!collection) return { kind: 'plugin', prepared: prepareFiles(files, extracted.skipped) };

  const folders: string[] = [];
  const skipped = [...collection.skipped];
  for (const entry of collection.entries) {
    let inner: Map<string, Buffer> | null = null;
    try {
      inner = filesUnder(files, entry.folder);
    } catch {
      inner = null;
    }
    if (inner && hasPluginManifest(inner)) folders.push(entry.folder);
    else skipped.push(`${entry.folder}: no plugin manifest in this folder`);
  }
  return { kind: 'collection', folders, skipped };
}

export interface PluginCandidate {
  /** Folder of the plugin inside the repository. */
  path: string;
  manifest: ParsedManifest | null;
  /** The folder's own title when its manifest could not be accepted, so it is not listed by path. */
  label: string | null;
  /** The plugin's logo file inside the folder, only when the archive really holds it. */
  logo: string | null;
  componentCounts: Record<string, number>;
  /** How the plugin's MCP servers connect, each kind once. */
  mcpTransports: ('http' | 'stdio')[];
  /** Why the folder cannot be installed; null when it can. */
  problem: string | null;
}

export interface Discovery {
  layout: 'plugin' | 'collection';
  candidates: PluginCandidate[];
  notes: string[];
}

const join = (base: string, folder: string): string => (base === '' ? folder : `${base}/${folder}`);

function candidateOf(
  path: string,
  files: Map<string, Buffer>,
  skipped: SkippedItem[],
): PluginCandidate {
  try {
    const { manifest, scan } = prepareFiles(files, skipped);
    const componentCounts: Record<string, number> = {};
    for (const component of scan.components) {
      componentCounts[component.kind] = (componentCounts[component.kind] ?? 0) + 1;
    }
    const logo = manifest.logo !== null && files.has(manifest.logo) ? manifest.logo : null;
    const mcpTransports = [...new Set(scan.mcpServers.map((server) => server.transport))].sort();
    return { path, manifest, label: null, logo, componentCounts, mcpTransports, problem: null };
  } catch (error) {
    const problem =
      error instanceof IngestionError
        ? error.message
        : 'This folder could not be read as a plugin.';
    return {
      path,
      manifest: null,
      label: peekManifestLabel(files),
      logo: null,
      componentCounts: {},
      mcpTransports: [],
      problem,
    };
  }
}

/**
 * Looks at a repository folder without storing anything: one plugin, or every plugin a marketplace
 * manifest lists. A folder that cannot be read is reported with its reason instead of failing the
 * whole inspection.
 */
export function discoverPlugins(
  tarball: Uint8Array,
  folder: string,
  limits: ArchiveLimits = DEFAULT_ARCHIVE_LIMITS,
): Discovery {
  const extracted = extractTarGz(tarball, limits);
  const files = filesUnder(extracted.files, folder);
  const collection = hasPluginManifest(files) ? null : readCollection(files);
  if (!collection) {
    return {
      layout: 'plugin',
      candidates: [candidateOf(folder, files, extracted.skipped)],
      notes: [],
    };
  }
  const candidates: PluginCandidate[] = [];
  const notes = [...collection.skipped];
  for (const entry of collection.entries) {
    const path = join(folder, entry.folder);
    let inner: Map<string, Buffer> | null = null;
    try {
      inner = filesUnder(files, entry.folder);
    } catch {
      inner = null;
    }
    if (inner && hasPluginManifest(inner)) {
      candidates.push(candidateOf(path, inner, []));
    } else {
      candidates.push({
        path,
        manifest: null,
        label: null,
        logo: null,
        componentCounts: {},
        mcpTransports: [],
        problem: 'No plugin manifest in this folder.',
      });
    }
  }
  return { layout: 'collection', candidates, notes };
}

export interface StoreResult {
  pluginId: string;
  pluginVersionId: string;
  /** False when this exact commit had already been ingested. */
  created: boolean;
}

async function writeRows(
  tx: Tx,
  prepared: PreparedPlugin,
  sourceId: string,
  commitSha: string,
): Promise<StoreResult> {
  const { manifest } = prepared;
  const [semverMajor, semverMinor, semverPatch] = manifest.version.split('.').map(Number) as [
    number,
    number,
    number,
  ];

  let [plugin] = await tx.select().from(pluginTable).where(eq(pluginTable.name, manifest.name));
  if (plugin && plugin.sourceId !== sourceId) {
    throw new IngestionError('A plugin with this name already exists from another source.');
  }
  const fields = {
    displayName: manifest.displayName,
    summary: manifest.summary,
    description: manifest.description,
    keywords: manifest.keywords,
    updatedAt: new Date(),
  };
  if (plugin) {
    // An operator's edit to the details stays; a sync only replaces what was never edited.
    if (!plugin.metadataEdited) {
      await tx.update(pluginTable).set(fields).where(eq(pluginTable.id, plugin.id));
    }
  } else {
    const [source] = await tx
      .select({
        featured: pluginSourceTable.featured,
        verified: pluginSourceTable.verified,
        visibility: pluginSourceTable.visibility,
      })
      .from(pluginSourceTable)
      .where(eq(pluginSourceTable.id, sourceId));
    [plugin] = await tx
      .insert(pluginTable)
      .values({ id: randomUUID(), name: manifest.name, sourceId, ...source, ...fields })
      .returning();
  }
  const pluginId = (plugin as typeof pluginTable.$inferSelect).id;

  // Categories the manifest names are linked, and created when they do not exist yet.
  const unusableCategories = await linkManifestCategories(tx, pluginId, manifest.categories);
  for (const name of unusableCategories) {
    prepared.scan.skipped.push({
      path: 'manifest',
      reason: `Category "${name.slice(0, 60)}" cannot be used as a category name.`,
    });
  }

  await linkDefaultCategory(tx, pluginId);

  const [existing] = await tx
    .select()
    .from(pluginVersionTable)
    .where(
      and(
        eq(pluginVersionTable.pluginId, pluginId),
        eq(pluginVersionTable.version, manifest.version),
      ),
    );
  if (existing) {
    if (existing.commitSha === commitSha) {
      return { pluginId, pluginVersionId: existing.id, created: false };
    }
    throw new IngestionError(
      `Version ${manifest.version} was already ingested from a different commit. Raise the version in the manifest.`,
    );
  }

  const manifestJson = JSON.stringify(manifest.raw);
  const [version] = await tx
    .insert(pluginVersionTable)
    .values({
      id: randomUUID(),
      pluginId,
      version: manifest.version,
      major: semverMajor,
      minor: semverMinor,
      patch: semverPatch,
      manifestSchemaVersion: manifest.format,
      manifest: manifest.raw,
      manifestSha256: createHash('sha256').update(manifestJson).digest('hex'),
      status: 'pending',
      commitSha,
      archiveSha256: prepared.archiveSha256,
      archiveSizeBytes: prepared.archive.length,
      scan: prepared.scan,
    })
    .returning({ id: pluginVersionTable.id });
  const pluginVersionId = (version as { id: string }).id;

  if (prepared.scan.components.length > 0) {
    await tx.insert(componentTable).values(
      prepared.scan.components.map((component) => ({
        id: randomUUID(),
        pluginVersionId,
        kind: component.kind,
        name: component.name,
        description: component.description,
        metadata: component.metadata,
        archiveSha256:
          prepared.componentArchives.get(`${component.kind}:${component.name}`)?.sha256 ?? null,
        archiveSizeBytes:
          prepared.componentArchives.get(`${component.kind}:${component.name}`)?.sizeBytes ?? null,
      })),
    );
  }
  return { pluginId, pluginVersionId, created: true };
}

export async function storeIngestion(
  db: Executor,
  blob: BlobPort,
  prepared: PreparedPlugin,
  sourceId: string,
  commitSha: string,
): Promise<StoreResult> {
  await ensureArchive(blob, prepared);
  const stored = await db.transaction((tx) => writeRows(tx, prepared, sourceId, commitSha));
  // Removing the archive of a deleted plugin may have run for these same files in between. The
  // version exists now and protects the archive, so put it back if it was taken.
  await ensureArchive(blob, prepared);
  return stored;
}

/** Stores the archive unless an object with the same content hash is already there. */
async function ensureArchive(blob: BlobPort, prepared: PreparedPlugin): Promise<void> {
  const objects: { sha256: string; bytes: Buffer }[] = [
    { sha256: prepared.archiveSha256, bytes: prepared.archive },
    ...[...prepared.componentArchives.values()].map(({ sha256, bytes }) => ({ sha256, bytes })),
  ];
  const done = new Set<string>();
  for (const { sha256, bytes } of objects) {
    if (done.has(sha256)) continue;
    done.add(sha256);
    if (await blob.exists(sha256)) continue;
    await blob.put(sha256, bytes, { sizeBytes: bytes.length });
  }
}

export interface FetchedArchive {
  commitSha: string;
  tarball: Uint8Array;
}

export interface IngestionDeps {
  db: Executor;
  blob: BlobPort;
  /** Resolves the source's ref to a commit and downloads that commit. */
  fetchArchive: (source: {
    owner: string;
    repository: string;
    ref: string;
  }) => Promise<FetchedArchive>;
  /** Owners whose repositories may be ingested; compared lower-cased. */
  allowedOwners: readonly string[];
}

/** Prefix of `created_by` on sources that were found inside a repository rather than added. */
export const DISCOVERED_BY = 'discovery:';

type SourceRow = typeof pluginSourceTable.$inferSelect;

/**
 * Adds a source for each plugin folder a marketplace manifest lists and queues its first sync.
 * Folders that already have a source are left alone. Returns the note shown to the operator.
 */
async function expandCollection(
  db: Executor,
  parent: SourceRow,
  folders: string[],
  skipped: string[],
): Promise<string> {
  let added = 0;
  await db.transaction(async (tx) => {
    for (const folder of folders) {
      const path = parent.path === '' ? folder : `${parent.path}/${folder}`;
      const [child] = await tx
        .insert(pluginSourceTable)
        .values({
          id: randomUUID(),
          owner: parent.owner,
          repository: parent.repository,
          ref: parent.ref,
          path,
          createdBy: `${DISCOVERED_BY}${parent.owner}/${parent.repository}`,
        })
        .onConflictDoNothing()
        .returning();
      if (!child) continue;
      added += 1;
      await queueIngestion(tx, child.id, { subject: 'ingestion' });
      await writeAudit(tx, {
        actor: { kind: 'system', id: 'ingestion' },
        action: 'plugin_source.created',
        target: { kind: 'plugin_source', id: child.id },
        context: { owner: child.owner, repository: child.repository, ref: child.ref, path },
      });
    }
  });
  const found = `Found ${folders.length} plugin${folders.length === 1 ? '' : 's'}: ${added} new source${added === 1 ? '' : 's'} added and syncing, ${folders.length - added} already known.`;
  const left = skipped.length > 0 ? ` Left out: ${skipped.join('; ')}.` : '';
  return `${found}${left}`.slice(0, 1000);
}

const failureMessage = (error: unknown): string =>
  error instanceof IngestionError ? error.message : 'Fetching or reading the repository failed.';

/** Runs one queued ingestion to its end and records the outcome on the ingestion and the source. */
export async function runIngestion(deps: IngestionDeps, ingestionId: string): Promise<void> {
  const { db } = deps;
  const [ingestion] = await db
    .select()
    .from(pluginIngestionTable)
    .where(eq(pluginIngestionTable.id, ingestionId));
  if (!ingestion || ingestion.status !== 'queued') return;
  const [source] = await db
    .select()
    .from(pluginSourceTable)
    .where(eq(pluginSourceTable.id, ingestion.sourceId));
  if (!source) return;

  await db
    .update(pluginIngestionTable)
    .set({ status: 'running' })
    .where(eq(pluginIngestionTable.id, ingestionId));
  await db
    .update(pluginSourceTable)
    .set({ lastStatus: 'running' })
    .where(eq(pluginSourceTable.id, source.id));

  let commitSha: string | null = null;
  let outcome: StoreResult | null = null;
  let note: string | null = null;
  let error: string | null = null;
  try {
    if (!deps.allowedOwners.some((owner) => owner.toLowerCase() === source.owner.toLowerCase())) {
      throw new IngestionError('This repository owner is not on the allow-list.');
    }
    const fetched = await deps.fetchArchive(source);
    commitSha = fetched.commitSha;
    const inspected = inspectSource(fetched.tarball, source.path);
    if (inspected.kind === 'collection') {
      if (source.createdBy.startsWith(DISCOVERED_BY)) {
        throw new IngestionError(
          'This folder lists other plugins. Add each plugin folder directly.',
        );
      }
      note = await expandCollection(db, source, inspected.folders, inspected.skipped);
    } else {
      outcome = await storeIngestion(
        db,
        deps.blob,
        inspected.prepared,
        source.id,
        fetched.commitSha,
      );
    }
  } catch (caught) {
    error = failureMessage(caught);
  }

  const now = new Date();
  await db.transaction(async (tx) => {
    await tx
      .update(pluginIngestionTable)
      .set({
        status: error ? 'failed' : 'succeeded',
        commitSha,
        pluginVersionId: outcome?.pluginVersionId ?? null,
        error,
        finishedAt: now,
      })
      .where(eq(pluginIngestionTable.id, ingestionId));
    await tx
      .update(pluginSourceTable)
      .set({
        lastStatus: error ? 'failed' : 'succeeded',
        lastError: error,
        lastNote: note,
        lastSyncedAt: now,
        ...(commitSha ? { lastCommitSha: commitSha } : {}),
      })
      .where(eq(pluginSourceTable.id, source.id));
    if (outcome?.created) {
      await writeAudit(tx, {
        actor: { kind: 'system', id: 'ingestion' },
        action: 'plugin_version.ingested',
        target: { kind: 'plugin_version', id: outcome.pluginVersionId },
        context: { sourceId: source.id, commitSha },
      });
    }
  });
}
