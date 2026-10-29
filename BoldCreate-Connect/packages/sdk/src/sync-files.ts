import { createHash, randomUUID } from 'node:crypto';
import { chmod, mkdir, readFile, rename, rm, rmdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { ConnectError } from './errors.js';
import type { Lock } from './sync-plan.js';

export const MAX_ENTRIES = 500;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 50 * 1024 * 1024;

const BLOCK = 512;
const FILE_MODE = 0o644;
const SCRIPT_MODE = 0o755;
const STATE_DIR = '.connect';

const unsafe = (message: string) =>
  new ConnectError(message, { code: 'archive_unsafe', status: 0 });

export const sha256Hex = (bytes: Uint8Array): string =>
  createHash('sha256').update(bytes).digest('hex');

/** Whether a relative path stays inside the folder it is placed in. */
export function safeRelativePath(path: string): boolean {
  if (path === '' || path.includes('\0') || path.includes('\\')) return false;
  if (path.startsWith('/') || /^[A-Za-z]:/.test(path)) return false;
  return path.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

function field(header: Uint8Array, start: number, length: number): string {
  const text = Buffer.from(header.subarray(start, start + length)).toString('utf8');
  const end = text.indexOf('\0');
  return end === -1 ? text : text.slice(0, end);
}

/**
 * Reads a gzip-compressed ustar archive into a map of path to bytes. It refuses `..`, absolute
 * and drive paths, links, device files, more than 500 entries, a file over 5 MiB and a total
 * over 50 MiB. Modes in the archive are ignored.
 */
export function extractArchive(archive: Uint8Array): Map<string, Uint8Array> {
  let tar: Buffer;
  try {
    tar = gunzipSync(archive, {
      maxOutputLength: MAX_TOTAL_BYTES + MAX_ENTRIES * 2 * BLOCK + 2 * BLOCK,
    });
  } catch {
    throw unsafe('The archive could not be unpacked or is too large.');
  }
  const files = new Map<string, Uint8Array>();
  let total = 0;
  let entries = 0;
  for (let offset = 0; offset + BLOCK <= tar.length;) {
    const header = tar.subarray(offset, offset + BLOCK);
    if (header.every((byte) => byte === 0)) break;
    entries += 1;
    if (entries > MAX_ENTRIES) throw unsafe('The archive has too many entries.');
    const name = field(header, 0, 100);
    const prefix = field(header, 345, 155);
    const path = prefix === '' ? name : `${prefix}/${name}`;
    const size = Number.parseInt(field(header, 124, 12).trim() || '0', 8);
    const type = String.fromCharCode(header[156] ?? 0);
    const bodyStart = offset + BLOCK;
    const bodyEnd = bodyStart + size;
    if (Number.isNaN(size) || size < 0 || bodyEnd > tar.length) {
      throw unsafe('The archive is damaged.');
    }
    offset = bodyStart + Math.ceil(size / BLOCK) * BLOCK;
    if (type === '5') continue;
    if (type !== '0' && type !== '\0')
      throw unsafe('The archive holds an entry that is not a file.');
    if (!safeRelativePath(path)) throw unsafe('The archive holds a path that is not allowed.');
    if (size > MAX_FILE_BYTES) throw unsafe('The archive holds a file that is too large.');
    total += size;
    if (total > MAX_TOTAL_BYTES) throw unsafe('The archive is too large.');
    files.set(path, new Uint8Array(tar.subarray(bodyStart, bodyEnd)));
  }
  return files;
}

export const stateDir = (dir: string) => join(dir, STATE_DIR);
const lockPath = (dir: string) => join(stateDir(dir), 'lock.json');
const guardPath = (dir: string) => join(stateDir(dir), 'lock.pid');

/** Where a placed file lives; throws if the plugin name or path would leave the folder. */
export function destinationOf(dir: string, pluginName: string, path: string): string {
  if (!safeRelativePath(pluginName) || pluginName.includes('/') || !safeRelativePath(path)) {
    throw unsafe('A path in the manifest is not allowed.');
  }
  const root = resolve(dir);
  const full = resolve(root, pluginName, path);
  if (!full.startsWith(root + sep)) throw unsafe('A path in the manifest is not allowed.');
  return full;
}

export async function readLock(dir: string): Promise<Lock | undefined> {
  try {
    return JSON.parse(await readFile(lockPath(dir), 'utf8')) as Lock;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw new ConnectError('The lock file in the folder cannot be read.', {
      code: 'lock_unreadable',
      status: 0,
    });
  }
}

/** Written last, through a temporary file, so a stopped sync never leaves a half lock. */
export async function writeLock(dir: string, lock: Lock): Promise<void> {
  await mkdir(stateDir(dir), { recursive: true });
  const temporary = `${lockPath(dir)}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(lock, null, 2), { mode: FILE_MODE });
  await rename(temporary, lockPath(dir));
}

/** The hash of a file on disk, or undefined when it is not there. */
export async function hashOnDisk(path: string): Promise<string | undefined> {
  try {
    return sha256Hex(await readFile(path));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
}

/** True for a file that starts with `#!`, the scripts a hook runs. */
export const isScript = (bytes: Uint8Array): boolean => bytes[0] === 0x23 && bytes[1] === 0x21;

/**
 * Puts files in place: written beside the folder first, then renamed, with a fixed mode. The files
 * named in `scripts` (a hook's own scripts) are made runnable; the archive's modes are never used.
 */
export async function placeFiles(
  dir: string,
  files: ReadonlyMap<string, Uint8Array>,
  scripts: ReadonlySet<string> = new Set(),
): Promise<void> {
  const staging = join(stateDir(dir), 'tmp', randomUUID());
  await mkdir(staging, { recursive: true });
  try {
    const staged: [string, string][] = [];
    let index = 0;
    for (const [destination, bytes] of files) {
      const source = join(staging, String(index));
      index += 1;
      const mode = scripts.has(destination) ? SCRIPT_MODE : FILE_MODE;
      await writeFile(source, bytes, { mode });
      await chmod(source, mode);
      staged.push([source, destination]);
    }
    for (const [source, destination] of staged) {
      await mkdir(dirname(destination), { recursive: true });
      await rename(source, destination);
    }
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

/** Removes a file and the folders it leaves empty, up to but not including the sync folder. */
export async function removeFile(dir: string, path: string): Promise<void> {
  try {
    await unlink(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  const root = resolve(dir);
  for (let folder = dirname(path); folder.startsWith(root + sep); folder = dirname(folder)) {
    try {
      await rmdir(folder);
    } catch {
      break;
    }
  }
}

const alive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
};

export interface GuardOptions {
  timeoutMs?: number;
  pollMs?: number;
}

/**
 * One sync at a time in a folder: the guard file is created exclusively and removed afterwards.
 * A guard left by a process that no longer exists is replaced.
 */
export async function withFolderGuard<T>(
  dir: string,
  work: () => Promise<T>,
  options: GuardOptions = {},
): Promise<T> {
  await mkdir(stateDir(dir), { recursive: true });
  const deadline = Date.now() + (options.timeoutMs ?? 60_000);
  for (;;) {
    try {
      await writeFile(guardPath(dir), String(process.pid), { flag: 'wx' });
      break;
    } catch (error) {
      // On Windows a guard that another process is deleting at that moment answers EPERM or EACCES.
      const code = (error as NodeJS.ErrnoException).code;
      const busy =
        code === 'EEXIST' ||
        (process.platform === 'win32' && (code === 'EPERM' || code === 'EACCES'));
      if (!busy) throw error;
      const holder = Number.parseInt(await readFile(guardPath(dir), 'utf8').catch(() => ''), 10);
      if (!Number.isNaN(holder) && !alive(holder)) {
        await rm(guardPath(dir), { force: true });
        continue;
      }
      if (Date.now() > deadline) {
        throw new ConnectError('Another sync is running in this folder.', {
          code: 'sync_busy',
          status: 0,
        });
      }
      await new Promise((done) => setTimeout(done, options.pollMs ?? 50));
    }
  }
  try {
    return await work();
  } finally {
    await rm(guardPath(dir), { force: true });
  }
}
