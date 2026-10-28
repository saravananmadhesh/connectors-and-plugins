/**
 * Local development launcher — starts PostgreSQL, Mailpit and all five app processes.
 *
 * No Docker or manual services by default: PostgreSQL and Mailpit are started here from
 * .cache (database in .cache/dev/postgres, kept between runs; migrations are
 * applied on every start). POSTGRES_MODE=docker or external runs PostgreSQL elsewhere, see
 * scripts/postgres-docker.ts.
 *
 * Usage: pnpm dev              start everything
 *        pnpm dev --postgres=docker   run PostgreSQL in a Docker container (or set POSTGRES_MODE)
 *        pnpm dev:docker       the same, as a script
 *        pnpm dev --reset-db   delete the dev database first and create a new one
 *
 * Read-only data browsers: pgweb for Postgres (PORT_POSTGRES_UI, 8081) and Redis Commander
 * for Redis (PORT_REDIS_UI, 8082); both are linked from the dev dashboard.
 *
 * Everything is watched: each app restarts when its source changes, and the admin client is
 * rebuilt on change (refresh the browser to see it).
 *
 * Non-secret values are read from .env.development at the repo root. Secrets are
 * generated on first start into .cache/dev/secrets.json.
 *
 * Processes (default ports; override with the optional PORT_* variables, see scripts/dev-ports.ts):
 *   api      → http://localhost:3001  (PORT_API)
 *   gateway  → http://localhost:3002  (PORT_GATEWAY)
 *   admin    → http://localhost:3004  (PORT_ADMIN)
 *   worker   → health only, http://localhost:3005  (PORT_WORKER_HEALTH)
 *   web      → http://localhost:3000  (PORT_WEB)
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { loadDevEnv } from '../packages/config/src/env.js';
import { APP_ENTRIES, appEnv, baseProcessEnv, type AppName } from './app-env.js';
import { devPorts, localUrl } from './dev-ports.js';
import { ensureDevSecrets, withSuperuserLogin } from './dev-secrets.js';
import { startDataViewers } from './data-viewers.js';
import { repoRoot, startInfra } from './local-infra.js';
import { resolvePostgresSettings } from './postgres-docker.js';
import { attachCapture, createRunCapture } from './dev-dashboard/log-capture.js';
import { openBrowser, startDashboardServer } from './dev-dashboard/server.js';

// Populate process.env from .env.development before reading any values.
loadDevEnv();

// Secrets are generated into the data directory, never committed. A reset removes the
// directory first, so the new database and the new secrets belong together.
const dataDir = join(repoRoot, '.cache', 'dev');
if (process.argv.includes('--reset-db')) rmSync(dataDir, { recursive: true, force: true });
const devSecrets = ensureDevSecrets(dataDir);
for (const [name, value] of Object.entries(devSecrets)) process.env[name] ??= value;
const ports = devPorts();
const databaseUrl = new URL(process.env['DATABASE_URL']!);
if (process.env['PORT_POSTGRES']) databaseUrl.port = String(ports.postgres);
process.env['DATABASE_URL'] = withSuperuserLogin(databaseUrl.toString(), devSecrets);

const resetDb = process.argv.includes('--reset-db');
const postgres = resolvePostgresSettings(process.env, process.argv, { reset: resetDb });
const infra = await startInfra({
  databaseUrl: process.env['DATABASE_URL']!,
  postgres,
  secrets: devSecrets,
  mailpitSmtpPort: ports.mailpitSmtp,
  mailpitHttpPort: ports.mailpitHttp,
  redisPort: ports.redis,
  redisPassword: devSecrets['REDIS_PASSWORD']!,
  objectStorePort: ports.objectStore,
  objectStoreUiPort: ports.objectStoreUi,
  objectStoreUser: devSecrets['OBJECT_STORE_ROOT_USER']!,
  objectStorePassword: devSecrets['OBJECT_STORE_ROOT_PASSWORD']!,
  bucket: 'boldcreate-dev',
  dataDir,
  logDir: join(dataDir, 'logs'),
  persistent: true,
}).catch((error: unknown) => {
  console.error(`[dev] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
const databaseWhere =
  postgres.mode === 'embedded'
    ? '.cache/dev/postgres'
    : postgres.mode === 'docker'
      ? `Docker container ${postgres.container}, ${postgres.image}`
      : 'external server';
console.log(
  infra.created
    ? `[dev] Created a new database (${databaseWhere})`
    : `[dev] Using existing database (${databaseWhere}; pnpm dev --reset-db to start over)`,
);

const stopDataViewers = await startDataViewers({
  databaseUrl: process.env['DATABASE_URL']!,
  postgresUiPort: ports.postgresUi,
  redisPort: ports.redis,
  redisPassword: devSecrets['REDIS_PASSWORD']!,
  redisUiPort: ports.redisUi,
  logDir: join(dataDir, 'logs'),
});

const dashboardServer = await startDashboardServer().catch(() => {
  console.warn(
    '[dev] Dashboard port unavailable. Use the existing dashboard or pnpm run dev:dashboard.',
  );
  return undefined;
});
const dashboardUrl = localUrl(ports.dashboard);
console.log(`[dev] Dev dashboard: ${dashboardUrl}`);
openBrowser(dashboardUrl);

const runId = `run-${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID()}`;
const capture = createRunCapture(runId);
const secrets = Object.entries(process.env)
  .filter(([key]) => /secret|password|token|key|database_url|smtp_url/i.test(key))
  .map(([, value]) => value ?? '')
  .filter(Boolean);
console.log(`[dev] Run ID: ${runId}\n[dev] Log file: ${capture.filePath}`);

const processes: Array<{ label: string; proc: ChildProcess; cleanup: () => void }> = [];

const baseEnv = baseProcessEnv(process.env);
const envContext = {
  secrets: devSecrets,
  databaseUrl: process.env['DATABASE_URL']!,
  ports: {
    web: ports.web,
    admin: ports.admin,
    api: ports.api,
    gateway: ports.gateway,
    workerHealth: ports.workerHealth,
    mailpitSmtp: ports.mailpitSmtp,
    redis: ports.redis,
  },
  objectStore: { port: ports.objectStore, bucket: 'boldcreate-dev' },
  deployEnv: 'local' as const,
  keyringPath: join(dataDir, 'kms-keyring.json'),
  // Set KMS_CLOUD_KEY_NAME to wrap keys with Cloud KMS instead of the local keyring.
  cloudKmsKeyName: process.env['KMS_CLOUD_KEY_NAME'] || undefined,
  secretsDir: join(dataDir, 'secrets'),
};

// The admin and web servers serve their built browser clients. Watch mode rebuilds each client
// on every change; the first build runs before the servers start so the pages are there at boot.
const CLIENTS = [
  { label: 'admin-client', dir: join(repoRoot, 'apps', 'admin', 'client') },
  { label: 'web-client', dir: join(repoRoot, 'apps', 'web', 'client') },
] as const;

function startClientBuild(dir: string, watch: boolean) {
  const viteBin = join(dir, 'node_modules', 'vite', 'bin', 'vite.js');
  return spawn('node', [viteBin, 'build', ...(watch ? ['--watch'] : [])], {
    cwd: dir,
    env: { ...baseEnv },
    stdio: 'pipe',
    shell: false,
  });
}

for (const { label, dir } of CLIENTS) {
  if (existsSync(join(dir, 'dist', 'index.html'))) continue;
  console.log(`[${label}] Building...`);
  const initial = startClientBuild(dir, false);
  initial.stdout?.on('data', (chunk: Buffer) => process.stdout.write(chunk));
  initial.stderr?.on('data', (chunk: Buffer) => process.stderr.write(chunk));
  await new Promise<void>((resolve) => initial.on('close', () => resolve()));
}

function startWatchedBuild(label: string, dir: string) {
  const child = startClientBuild(dir, true);
  const cleanup = attachCapture(child, { runId, service: label, capture, secrets });
  child.on('error', () => {
    console.error(`[${label}] Could not start the build watcher`);
  });
  child.on('close', (code) => {
    console.log(`[${label}] exited with code ${code}`);
    cleanup();
  });
  processes.push({ label, proc: child, cleanup });
}

// Watching only source folders keeps node_modules and build output (the client dist folders
// are rebuilt constantly) from restarting the servers; plain --watch watches every imported file.
function watchPaths(app: AppName): string[] {
  const appSrc = join(repoRoot, dirname(APP_ENTRIES[app]));
  const packageSrcs = readdirSync(join(repoRoot, 'packages'))
    .map((name) => join(repoRoot, 'packages', name, 'src'))
    .filter((dir) => existsSync(dir));
  return [appSrc, ...packageSrcs].flatMap((dir) => ['--watch-path', dir]);
}

function start(app: AppName) {
  // Restarts the process when one of its source files or a shared package's source changes.
  const child = spawn(
    'node',
    [
      '--watch',
      ...watchPaths(app),
      '--conditions=development',
      '--import',
      'tsx/esm',
      APP_ENTRIES[app],
    ],
    {
      env: { ...baseEnv, ...appEnv(app, envContext) },
      stdio: 'pipe',
      shell: false,
    },
  );

  const cleanup = attachCapture(child, { runId, service: app, capture, secrets });
  child.on('error', () => {
    console.error(`[${app}] Could not start process`);
  });
  child.on('close', (code) => {
    console.log(`[${app}] exited with code ${code}`);
    cleanup();
  });

  processes.push({ label: app, proc: child, cleanup });
}

for (const app of ['api', 'gateway', 'admin', 'worker', 'web'] as const) start(app);
for (const { label, dir } of CLIENTS) startWatchedBuild(label, dir);

// ── Graceful shutdown ─────────────────────────────────────────────────────────
function shutdown() {
  console.log('\nShutting down all processes...');
  dashboardServer?.close();
  dashboardServer?.closeAllConnections();
  for (const { label, proc } of processes) {
    proc.kill('SIGTERM');
    console.log(`  Sent SIGTERM to ${label}`);
  }
  setTimeout(() => {
    for (const { cleanup } of processes) cleanup();
    capture.close();
    stopDataViewers();
    void infra.stop().finally(() => process.exit(0));
  }, 2000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', () => capture.close());

console.log('Dev launcher started. Press Ctrl+C to stop all processes.');
