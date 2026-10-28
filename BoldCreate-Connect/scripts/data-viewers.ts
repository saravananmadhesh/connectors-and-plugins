/**
 * Local data browsers started by `pnpm dev`: pgweb for Postgres and Redis Commander for Redis.
 *
 * Both are read-only, listen on loopback only and are optional: if one cannot start, the
 * rest of the stack keeps running and the problem is printed.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { copyFileSync, createWriteStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ensureArchivedTool, PGWEB_VERSION, pgwebAssets } from './infra-tools.js';
import { repoRoot, toolsCache } from './local-infra.js';

export interface DataViewerOptions {
  databaseUrl: string;
  postgresUiPort: number;
  redisPort: number;
  redisPassword: string;
  redisUiPort: number;
  logDir: string;
}

/** Returns the pgweb binary, downloading and verifying it on first use. */
export async function ensurePgweb(): Promise<string> {
  const key = `${process.platform}-${process.arch}`;
  const asset = pgwebAssets[key];
  if (!asset) throw new Error(`No pinned pgweb release for platform ${key}`);
  const binary = await ensureArchivedTool({
    name: 'pgweb',
    version: PGWEB_VERSION,
    asset,
    toolsCache,
    platformKey: key,
  });
  if (process.platform !== 'win32') return binary;
  // Windows only runs a file that ends in .exe.
  const exe = `${binary}.exe`;
  if (!existsSync(exe)) copyFileSync(binary, exe);
  return exe;
}

export async function startDataViewers(options: DataViewerOptions): Promise<() => void> {
  const children: ChildProcess[] = [];
  const launch = (name: string, command: string, args: string[]) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const log = createWriteStream(join(options.logDir, `${name}.log`));
    child.stdout?.pipe(log, { end: false });
    child.stderr?.pipe(log, { end: false });
    child.once('error', (error) => console.warn(`[dev] ${name} could not start: ${error.message}`));
    child.once('exit', (code) => {
      if (code) console.warn(`[dev] ${name} exited with code ${code} (see ${name}.log)`);
      log.end();
    });
    children.push(child);
  };

  try {
    launch('pgweb', await ensurePgweb(), [
      `--url=${options.databaseUrl}${options.databaseUrl.includes('?') ? '&' : '?'}sslmode=disable`,
      '--readonly',
      '--lock-session',
      '--skip-open',
      '--bind=127.0.0.1',
      `--listen=${options.postgresUiPort}`,
    ]);
  } catch (error) {
    console.warn(`[dev] pgweb unavailable: ${error instanceof Error ? error.message : error}`);
  }

  const commander = join(repoRoot, 'node_modules', 'redis-commander', 'bin', 'redis-commander.js');
  if (existsSync(commander)) {
    launch('redis-commander', process.execPath, [
      commander,
      '--address=127.0.0.1',
      `--port=${options.redisUiPort}`,
      '--redis-host=127.0.0.1',
      `--redis-port=${options.redisPort}`,
      `--redis-password=${options.redisPassword}`,
      '--read-only',
      '--noload',
      '--nosave',
      '--no-log-data',
    ]);
  } else {
    console.warn('[dev] redis-commander is not installed; run pnpm install');
  }

  return () => {
    for (const child of children) child.kill();
  };
}
