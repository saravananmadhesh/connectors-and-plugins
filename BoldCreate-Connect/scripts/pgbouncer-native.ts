/**
 * PgBouncer as a process on this machine, from the pinned and checksum-verified Windows release
 * (`pgbouncerAssets`), or a program named by `PGBOUNCER_BIN`. Settings: `pgbouncer-config.ts`.
 *
 *   pnpm pooler start    start it and print the pooled DATABASE_URL
 *   pnpm pooler stop     stop it
 *   pnpm pooler status   show whether it runs
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { connect } from 'node:net';
import { join } from 'node:path';
import { ensureArchivedTool, PGBOUNCER_VERSION, pgbouncerAssets } from './infra-tools.js';
import {
  DEFAULT_POOLER_PORT,
  LOCAL_POOL_SIZES,
  pgbouncerIni,
  pooledDatabaseUrl,
  userlist,
  type PoolerRole,
} from './pgbouncer-config.js';

const repoRoot = join(import.meta.dirname, '..');
const toolsCache = join(repoRoot, '.cache', 'tools');
const dataDir = (env: Record<string, string | undefined>) =>
  env['POOLER_DATA_DIR'] ?? join(repoRoot, '.cache', 'dev', 'pgbouncer');
const pidFile = (env: Record<string, string | undefined>) => join(dataDir(env), 'pgbouncer.pid');

/** The ini file reads a Windows path with forward slashes. */
const slashed = (path: string) => path.replaceAll('\\', '/');

const sleep = (ms: number) => new Promise<void>((done) => setTimeout(done, ms));

function portOpen(port: number): Promise<boolean> {
  return new Promise((done) => {
    const socket = connect({ host: '127.0.0.1', port });
    socket.setTimeout(500, () => {
      socket.destroy();
      done(false);
    });
    socket.once('connect', () => {
      socket.destroy();
      done(true);
    });
    socket.once('error', () => done(false));
  });
}

/** The PgBouncer program: `PGBOUNCER_BIN` when set, else the pinned release, else an error. */
async function ensurePgbouncer(env: Record<string, string | undefined>): Promise<string> {
  const override = env['PGBOUNCER_BIN'];
  if (override) {
    if (!existsSync(override)) throw new Error(`PGBOUNCER_BIN does not exist: ${override}`);
    return override;
  }
  const key = `${process.platform}-${process.arch}`;
  const asset = pgbouncerAssets[key];
  if (!asset) {
    throw new Error(
      `No pinned PgBouncer release for ${key}. Install pgbouncer and set PGBOUNCER_BIN.`,
    );
  }
  return ensureArchivedTool({
    name: 'pgbouncer',
    version: PGBOUNCER_VERSION,
    asset,
    toolsCache,
    platformKey: key,
  });
}

function readPid(env: Record<string, string | undefined>): number | undefined {
  if (!existsSync(pidFile(env))) return undefined;
  const pid = Number.parseInt(readFileSync(pidFile(env), 'utf8'), 10);
  return Number.isInteger(pid) && pid > 0 ? pid : undefined;
}

/** True only when the recorded process is PgBouncer, so a reused pid is never killed. */
function isPgbouncer(pid: number): boolean {
  const result = spawnSync('tasklist', ['/FI', `PID eq ${pid}`, '/FO', 'CSV', '/NH'], {
    encoding: 'utf8',
  });
  return result.status === 0 && result.stdout.toLowerCase().includes('pgbouncer');
}

export function nativePoolerRunning(env: Record<string, string | undefined>): boolean {
  const pid = readPid(env);
  return pid !== undefined && isPgbouncer(pid);
}

export function stopNativePooler(env: Record<string, string | undefined>): void {
  const pid = readPid(env);
  if (pid !== undefined && isPgbouncer(pid)) {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F']);
  }
  rmSync(pidFile(env), { force: true });
}

/** Starts PgBouncer and returns the pooled `DATABASE_URL`; resolves once the port accepts. */
export async function startNativePooler(env: Record<string, string | undefined>): Promise<string> {
  const databaseUrl = env['DATABASE_URL'];
  if (!databaseUrl) throw new Error('DATABASE_URL is required (run it with the dev environment)');
  const passwords = {} as Record<PoolerRole, string>;
  for (const role of Object.keys(LOCAL_POOL_SIZES) as PoolerRole[]) {
    const value = env[`DB_ROLE_PASSWORD_${role.toUpperCase()}`];
    if (!value) throw new Error(`DB_ROLE_PASSWORD_${role.toUpperCase()} is required`);
    passwords[role] = value;
  }
  stopNativePooler(env);
  const binary = await ensurePgbouncer(env);
  const port = Number(env['POOLER_PORT'] ?? DEFAULT_POOLER_PORT);
  if (await portOpen(port)) throw new Error(`Port ${port} is already in use`);

  const dir = dataDir(env);
  mkdirSync(dir, { recursive: true });
  const logPath = join(dir, 'pgbouncer.log');
  writeFileSync(join(dir, 'userlist.txt'), userlist(passwords));
  writeFileSync(
    join(dir, 'pgbouncer.ini'),
    pgbouncerIni({
      dbHost: '127.0.0.1',
      dbPort: Number(new URL(databaseUrl).port || 5432),
      poolSizes: LOCAL_POOL_SIZES,
      authFile: slashed(join(dir, 'userlist.txt')),
      listenPort: port,
      logFile: slashed(logPath),
    }),
  );

  const output = openSync(join(dir, 'pgbouncer.out'), 'a');
  const child = spawn(binary, [join(dir, 'pgbouncer.ini')], {
    detached: true,
    stdio: ['ignore', output, output],
    windowsHide: true,
  });
  child.unref();
  if (!child.pid) throw new Error('PgBouncer did not start');
  writeFileSync(pidFile(env), String(child.pid));

  for (let attempt = 0; attempt < 40; attempt++) {
    if (await portOpen(port)) return pooledDatabaseUrl(databaseUrl, port);
    if (!isPgbouncer(child.pid)) break;
    await sleep(250);
  }
  stopNativePooler(env);
  throw new Error(`PgBouncer did not accept connections on port ${port}; see ${logPath}`);
}
