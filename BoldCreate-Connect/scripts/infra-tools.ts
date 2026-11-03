/**
 * Pinned local tools: Mailpit, Redis, an S3-compatible object store (SeaweedFS) and pgweb.
 *
 * Every tool is a release asset with a sha256 recorded here. A download whose digest differs
 * is rejected and never written to disk, so a changed or tampered release cannot run.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

export interface ToolAsset {
  /** Download URL of the archive. */
  url: string;
  /** Lower-case hex sha256 of the archive. */
  sha256: string;
  /** Path of the executable relative to the extracted archive. */
  binary: string;
  /** Archive format; zip when absent. */
  format?: 'zip' | 'tar.gz';
}

export const REDIS_VERSION = '8.2.10';
export const OBJECT_STORE_VERSION = '4.48';

const redisBase = `https://github.com/redis-windows/redis-windows/releases/download/${REDIS_VERSION}`;

/**
 * Redis publishes no binaries of its own. These are the community Windows builds; other
 * platforms use an installed `redis-server` named by `REDIS_SERVER_BIN`.
 */
export const redisAssets: Record<string, ToolAsset> = {
  'win32-x64': {
    url: `${redisBase}/Redis-${REDIS_VERSION}-Windows-x64-msys2.zip`,
    sha256: '281f180eaba420f43eb18d655197d55bf804eb692bc55209264bfb284da3850f',
    binary: `Redis-${REDIS_VERSION}-Windows-x64-msys2/redis-server.exe`,
  },
};

const seaweedBase = `https://github.com/seaweedfs/seaweedfs/releases/download/${OBJECT_STORE_VERSION}`;

/**
 * SeaweedFS ships one `weed` binary that runs the whole store (master, volume, filer, S3
 * gateway, browser and admin UI) in a single process. There is no Windows arm64 build.
 */
export const objectStoreAssets: Record<string, ToolAsset> = {
  'win32-x64': {
    url: `${seaweedBase}/windows_amd64.zip`,
    sha256: 'fe90c04c0620ad1a1c756f86cd5e1443773f56a446688077a4bb5ec04c3cc874',
    binary: 'weed.exe',
  },
  'linux-x64': {
    url: `${seaweedBase}/linux_amd64.tar.gz`,
    sha256: '4a7d108384d044d95212d1342cdda9533fa55842c1c9b41f606ca3c8a9561124',
    binary: 'weed',
    format: 'tar.gz',
  },
  'linux-arm64': {
    url: `${seaweedBase}/linux_arm64.tar.gz`,
    sha256: '557e92c38c5c7d180748eb8e2b2b45e426f8e5282a4caca8e098a90d09f03a07',
    binary: 'weed',
    format: 'tar.gz',
  },
  'darwin-x64': {
    url: `${seaweedBase}/darwin_amd64.tar.gz`,
    sha256: '425ef61d2ee773d5d5175003f38bd6cc891070ae6319370354aaf5378c45d5b3',
    binary: 'weed',
    format: 'tar.gz',
  },
  'darwin-arm64': {
    url: `${seaweedBase}/darwin_arm64.tar.gz`,
    sha256: 'faa194e72a346755dc4404288b0561eb3c260351702901d8363024d5099bdd7d',
    binary: 'weed',
    format: 'tar.gz',
  },
};

export const PGWEB_VERSION = 'v0.17.0';

const pgwebBase = `https://github.com/sosedoff/pgweb/releases/download/${PGWEB_VERSION}`;

/** pgweb: a single-binary Postgres browser. The Windows archive holds a file without `.exe`. */
export const pgwebAssets: Record<string, ToolAsset> = {
  'win32-x64': {
    url: `${pgwebBase}/pgweb_windows_amd64.zip`,
    sha256: '7471bb79175549622f90877f5aec69c20ec014b3d4b3df288c1121f8775728bc',
    binary: 'pgweb_windows_amd64',
  },
  'linux-x64': {
    url: `${pgwebBase}/pgweb_linux_amd64.zip`,
    sha256: '042b70755a0ad0443ff91fe1116b89472da3b841122064942d8024297d4af9ad',
    binary: 'pgweb_linux_amd64',
  },
  'linux-arm64': {
    url: `${pgwebBase}/pgweb_linux_arm64.zip`,
    sha256: '945cb05ed683e802274369f161afbb644947f9087184e4e52e9b2725f2c622e0',
    binary: 'pgweb_linux_arm64',
  },
  'darwin-x64': {
    url: `${pgwebBase}/pgweb_darwin_amd64.zip`,
    sha256: 'da73e100ce78288c04b84e225503763b8841383e52981e5196f87e00c3440287',
    binary: 'pgweb_darwin_amd64',
  },
  'darwin-arm64': {
    url: `${pgwebBase}/pgweb_darwin_arm64.zip`,
    sha256: '508bc6f173355503a8d98b263120e1297f7e34be3b482647098d08569a30455a',
    binary: 'pgweb_darwin_arm64',
  },
};

export const PGBOUNCER_VERSION = '1.26.1';

/**
 * PgBouncer's own release has a Windows build (the project publishes no other binaries; Linux and
 * macOS install pgbouncer and set `PGBOUNCER_BIN`). The archive holds one folder.
 */
export const pgbouncerAssets: Record<string, ToolAsset> = {
  'win32-x64': {
    url: `https://github.com/pgbouncer/pgbouncer/releases/download/pgbouncer_${PGBOUNCER_VERSION.replaceAll('.', '_')}/pgbouncer-${PGBOUNCER_VERSION}-windows-x86_64.zip`,
    sha256: '5d3fa0bc9bd40f8845655f50a9bafd315db9e9ac51ee1a511393e9f60828b57b',
    binary: `pgbouncer-${PGBOUNCER_VERSION}-windows-x86_64/pgbouncer.exe`,
  },
};

export type FetchLike = (url: string) => Promise<{
  ok: boolean;
  status: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
}>;

/** Downloads `url` and returns the bytes only when their sha256 equals `sha256`. */
export async function downloadVerified(
  label: string,
  asset: Pick<ToolAsset, 'url' | 'sha256'>,
  fetchImpl: FetchLike = fetch,
): Promise<Uint8Array> {
  const res = await fetchImpl(asset.url);
  if (!res.ok) throw new Error(`${label} download failed: HTTP ${res.status}`);
  const data = new Uint8Array(await res.arrayBuffer());
  const actual = createHash('sha256').update(data).digest('hex');
  if (actual !== asset.sha256) {
    throw new Error(`${label} checksum mismatch: expected ${asset.sha256}, got ${actual}`);
  }
  return data;
}

/** Expands a .tar.gz archive into `dir`. */
export function extractTarGz(archivePath: string, dir: string): void {
  // Relative to the target directory: a GNU tar reads an absolute Windows path as a remote host.
  const result = spawnSync('tar', ['-xzf', basename(archivePath)], { cwd: dir, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`Extracting ${archivePath} failed: ${(result.stderr ?? '').trim()}`);
  }
}

/** Expands a zip archive into `dir`. */
export function extractZip(archivePath: string, dir: string): void {
  const result =
    process.platform === 'win32'
      ? spawnSync(
          'powershell',
          [
            '-NoProfile',
            '-Command',
            `Expand-Archive -LiteralPath '${archivePath}' -DestinationPath '${dir}' -Force`,
          ],
          { stdio: 'inherit' },
        )
      : spawnSync('unzip', ['-q', '-o', archivePath, '-d', dir], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Extracting ${archivePath} failed`);
}

/**
 * Returns the cached binary of an archived tool (zip or tar.gz), downloading, verifying and
 * extracting it when absent. A failed checksum deletes whatever was written and throws.
 */
export async function ensureArchivedTool(options: {
  name: string;
  version: string;
  asset: ToolAsset;
  toolsCache: string;
  platformKey: string;
  fetchImpl?: FetchLike;
}): Promise<string> {
  const dir = join(options.toolsCache, options.name, options.version, options.platformKey);
  const binaryPath = join(dir, options.asset.binary);
  if (existsSync(binaryPath)) return binaryPath;

  mkdirSync(dir, { recursive: true });
  console.log(`[infra] downloading ${options.asset.url}`);
  let data: Uint8Array;
  try {
    data = await downloadVerified(options.name, options.asset, options.fetchImpl);
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
  const tarball = options.asset.format === 'tar.gz';
  const archivePath = join(dir, tarball ? 'archive.tar.gz' : 'archive.zip');
  writeFileSync(archivePath, data);
  if (tarball) extractTarGz(archivePath, dir);
  else extractZip(archivePath, dir);
  rmSync(archivePath, { force: true });
  if (!existsSync(binaryPath)) throw new Error(`${options.name} archive extraction failed`);
  if (process.platform !== 'win32') spawnSync('chmod', ['+x', binaryPath]);
  return binaryPath;
}
