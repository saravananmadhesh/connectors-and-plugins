import { mkdir } from 'node:fs/promises';
import { ConnectError, ConnectNotFoundError } from './errors.js';
import type { ConnectSession } from './session.js';
import {
  destinationOf,
  extractArchive,
  hashOnDisk,
  placeFiles,
  readLock,
  removeFile,
  sha256Hex,
  withFolderGuard,
  writeLock,
} from './sync-files.js';
import {
  planSync,
  type ComponentRef,
  type Lock,
  type LockedComponent,
  type SyncPlan,
  type WantedComponent,
} from './sync-plan.js';
import type { FileKind, Manifest } from './types.js';

export { toMcpConfig, TOKEN_PLACEHOLDER } from './mcp-config.js';
export type { McpConfigOptions } from './mcp-config.js';
export type { ComponentRef } from './sync-plan.js';

export interface SyncOptions {
  dir: string;
  kinds?: FileKind[];
  plugins?: string[];
  onConflict?: 'skip' | 'overwrite';
  allowHooks?: boolean;
}

export interface SyncResult {
  added: ComponentRef[];
  updated: ComponentRef[];
  removed: ComponentRef[];
  unchanged: ComponentRef[];
  skipped: (ComponentRef & { reason: 'hooks_not_allowed' })[];
  /** Placed files that were changed by hand, or that were already there, and were kept. */
  modified: string[];
  /** True when the server could not be reached and the folder was left as it was. */
  stale: boolean;
}

const failsHard = (error: unknown): boolean =>
  error instanceof ConnectError &&
  !(error instanceof ConnectNotFoundError) &&
  (error.status === 0 || error.status >= 500) &&
  error.code !== 'integrity_hash' &&
  error.code !== 'integrity_size' &&
  error.code !== 'archive_unsafe';

const pluginIdsOf = (manifest: Manifest): Map<string, string> =>
  new Map(manifest.entries.map((entry) => [entry.pluginName, entry.pluginId]));

interface Applied {
  result: SyncResult;
  applied: { componentId: string; sha256: string }[];
}

async function apply(
  session: ConnectSession,
  options: SyncOptions & { onConflict: 'skip' | 'overwrite' },
  manifest: Manifest,
  lock: Lock,
  plan: SyncPlan,
): Promise<Applied> {
  const { dir, onConflict } = options;
  const result: SyncResult = {
    added: [],
    updated: [],
    removed: [],
    unchanged: [...plan.unchanged],
    skipped: [...plan.skipped],
    modified: [],
    stale: false,
  };
  const applied: Applied['applied'] = [];
  const next: Lock = {
    version: 1,
    revision: manifest.revision,
    userId: session.userId,
    components: { ...lock.components },
  };

  // Every archive is downloaded once per hash and checked before anything is written.
  const archives = new Map<string, Map<string, Uint8Array>>();
  for (const wanted of [...plan.add, ...plan.update]) {
    if (archives.has(wanted.sha256)) continue;
    archives.set(wanted.sha256, extractArchive(await session.component(wanted.sha256)));
  }

  // The files that stay owned by some component afterwards: a shared file is never removed.
  const owned = new Set<string>();
  for (const ref of plan.unchanged) {
    const locked = lock.components[ref.componentId];
    for (const path of Object.keys(locked?.files ?? {})) {
      owned.add(destinationOf(dir, locked?.pluginName ?? '', path));
    }
  }
  for (const wanted of [...plan.add, ...plan.update]) {
    for (const path of archives.get(wanted.sha256)?.keys() ?? []) {
      owned.add(destinationOf(dir, wanted.pluginName, path));
    }
  }

  const place = async (wanted: WantedComponent, known: LockedComponent | undefined) => {
    const archive = archives.get(wanted.sha256) as Map<string, Uint8Array>;
    const files = new Map<string, Uint8Array>();
    const conflicts: string[] = [];
    const hashes: Record<string, string> = {};
    for (const [path, bytes] of archive) {
      const destination = destinationOf(dir, wanted.pluginName, path);
      files.set(destination, bytes);
      hashes[path] = sha256Hex(bytes);
      const current = await hashOnDisk(destination);
      if (current === undefined || current === hashes[path]) continue;
      // A file is ours to replace only while it is still what was placed.
      if (known?.files[path] !== current) conflicts.push(destination);
    }
    if (conflicts.length > 0 && onConflict === 'skip') {
      result.modified.push(...conflicts);
      return false;
    }
    await placeFiles(dir, files);
    next.components[wanted.componentId] = {
      pluginName: wanted.pluginName,
      kind: wanted.kind,
      name: wanted.name,
      sha256: wanted.sha256,
      files: hashes,
    };
    applied.push({ componentId: wanted.componentId, sha256: wanted.sha256 });
    return true;
  };

  for (const wanted of plan.add) {
    if (await place(wanted, undefined)) result.added.push(wanted);
  }
  for (const wanted of plan.update) {
    if (await place(wanted, lock.components[wanted.componentId])) result.updated.push(wanted);
  }

  for (const gone of plan.remove) {
    const locked = lock.components[gone.componentId];
    if (!locked) continue;
    const doomed: string[] = [];
    const changed: string[] = [];
    for (const path of gone.files) {
      const destination = destinationOf(dir, locked.pluginName, path);
      if (owned.has(destination)) continue;
      const current = await hashOnDisk(destination);
      if (current !== undefined && current !== locked.files[path]) changed.push(destination);
      else doomed.push(destination);
    }
    if (changed.length > 0) {
      result.modified.push(...changed);
      if (onConflict === 'skip') continue;
      doomed.push(...changed);
    }
    for (const destination of doomed) await removeFile(dir, destination);
    delete next.components[gone.componentId];
    result.removed.push(gone);
  }

  // Anything left out (a kept file, a hook) must be looked at again, so no revision is kept and the
  // next call asks for the whole manifest. Keeping an older revision is not enough: the server can
  // come back to that same revision (a plugin added, then removed) and answer "not modified".
  if (result.modified.length > 0 || result.skipped.length > 0) next.revision = '';
  await writeLock(dir, next);
  return { result, applied };
}

/** Everything the lock holds in the part of the folder this call looks after, as unchanged. */
function asUnchanged(lock: Lock): SyncResult {
  return {
    added: [],
    updated: [],
    removed: [],
    unchanged: Object.entries(lock.components).map(([componentId, locked]) => ({
      componentId,
      pluginName: locked.pluginName,
      kind: locked.kind,
      name: locked.name,
    })),
    skipped: [],
    modified: [],
    stale: false,
  };
}

/**
 * Brings the plugin files of a session's user into a folder and keeps them current. Files are
 * checked against their hash before they are placed, a file changed by hand is kept, and the
 * token is never written to disk. A server that cannot be reached leaves the folder as it was
 * and the result says `stale`.
 */
export async function syncPlugins(
  session: ConnectSession,
  options: SyncOptions,
): Promise<SyncResult> {
  const settings = { ...options, onConflict: options.onConflict ?? 'skip' } as const;
  const scope = {
    kinds: options.kinds,
    plugins: options.plugins,
    allowHooks: options.allowHooks === true,
  };
  await mkdir(options.dir, { recursive: true });

  return withFolderGuard(options.dir, async () => {
    const lock = await readLock(options.dir);
    if (lock && lock.userId !== session.userId) {
      throw new ConnectError('The folder belongs to another user.', {
        code: 'lock_owner_mismatch',
        status: 0,
      });
    }
    const base: Lock = lock ?? {
      version: 1,
      revision: '',
      userId: session.userId,
      components: {},
    };

    let revision = lock?.revision;
    for (let attempt = 0; ; attempt += 1) {
      let manifest: Manifest | { notModified: true };
      try {
        manifest = await session.manifest({
          ...(revision ? { revision } : {}),
          ...(options.kinds ? { kinds: options.kinds } : {}),
          ...(options.plugins ? { plugins: options.plugins } : {}),
        });
      } catch (error) {
        if (lock && failsHard(error)) return { ...asUnchanged(lock), stale: true };
        throw error;
      }
      if ('notModified' in manifest) return asUnchanged(base);

      const plan = planSync(manifest, lock, scope, pluginIdsOf(manifest));
      try {
        const { result, applied } = await apply(session, settings, manifest, base, plan);
        if (applied.length > 0) await session.report({ applied }).catch(() => undefined);
        return result;
      } catch (error) {
        if (error instanceof ConnectNotFoundError && attempt === 0) {
          revision = undefined;
          continue;
        }
        if (lock && failsHard(error)) return { ...asUnchanged(lock), stale: true };
        throw error;
      }
    }
  });
}
