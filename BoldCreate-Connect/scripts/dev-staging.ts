/**
 * Runs all five apps on this machine against staging services: no embedded Postgres, Redis,
 * Mailpit or object store, and no generated secrets.
 *
 * Usage: pnpm dev:staging [--env-file=<path>] [--only=api,web] [--yes]
 *
 * Values come from .env.staging.local at the repo root (template: .env.staging.example).
 * Secrets are not read from anywhere else, and the launching shell's secrets are not passed on.
 * Each app restarts when its source changes. The admin and web servers serve browser clients
 * built by `pnpm build`; the clients are built here when missing.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { APP_ENTRIES, baseProcessEnv, type AppName } from './app-env.js';
import { DEV_SECRET_NAMES } from './dev-secrets.js';
import { repoRoot } from './local-infra.js';
import { STAGING_APPS, parseStagingEnv, stagingAppEnv, stagingProblems } from './staging-env.js';

function fail(message: string): never {
  console.error(`[dev:staging] ${message}`);
  process.exit(1);
}

const flag = (name: string) =>
  process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);

if (process.argv.includes('--reset-db')) fail('--reset-db is not allowed against staging');

const envFile = resolve(repoRoot, flag('env-file') ?? '.env.staging.local');
if (!existsSync(envFile)) {
  fail(`${envFile} not found. Copy .env.staging.example to .env.staging.local and fill it in.`);
}

const sections = (() => {
  try {
    return parseStagingEnv(readFileSync(envFile, 'utf8'));
  } catch (error) {
    return fail(`${envFile}: ${error instanceof Error ? error.message : String(error)}`);
  }
})();

const requested = flag('only')?.split(',') ?? [...STAGING_APPS];
const unknown = requested.filter((app) => !STAGING_APPS.includes(app as AppName));
if (unknown.length > 0) fail(`unknown app: ${unknown.join(', ')}`);
const apps = STAGING_APPS.filter((app) => requested.includes(app));

const appEnvs = new Map(apps.map((app) => [app, stagingAppEnv(app, sections)]));
const problems = apps.flatMap((app) => stagingProblems(app, appEnvs.get(app)!));
if (problems.length > 0) fail(`fix these first:\n  ${problems.join('\n  ')}`);

// Writes and the worker's outbox are real on staging; make the developer say so once.
if (!process.argv.includes('--yes')) {
  const hosts = new Set<string>();
  for (const env of appEnvs.values()) {
    for (const name of ['DATABASE_URL', 'REDIS_URL']) {
      if (env[name]) hosts.add(new URL(env[name]).host);
    }
  }
  fail(
    `this runs against shared staging services (${[...hosts].join(', ')}); ` +
      `writes are real${apps.includes('worker') ? ' and the worker sends staging email' : ''}. ` +
      'Run again with --yes to continue.',
  );
}

// The launching shell's generated dev secrets and database URL are never passed on.
const baseEnv = baseProcessEnv(process.env);
for (const name of DEV_SECRET_NAMES) delete baseEnv[name];

const processes: Array<{ label: string; proc: ChildProcess }> = [];
let stopping = false;

function run(label: string, args: string[], env: Record<string, string>, cwd = repoRoot) {
  const proc = spawn('node', args, { cwd, env, stdio: 'inherit', shell: false });
  proc.on('error', () => console.error(`[${label}] Could not start process`));
  proc.on('close', (code) => {
    if (!stopping) console.log(`[${label}] exited with code ${code}`);
  });
  processes.push({ label, proc });
  return proc;
}

// Browser clients: built once when missing (run `pnpm build` to refresh them).
for (const [app, dir] of [
  ['admin', join(repoRoot, 'apps', 'admin', 'client')],
  ['web', join(repoRoot, 'apps', 'web', 'client')],
] as const) {
  if (!apps.includes(app) || existsSync(join(dir, 'dist', 'index.html'))) continue;
  console.log(`[${app}-client] Building...`);
  const viteBin = join(dir, 'node_modules', 'vite', 'bin', 'vite.js');
  await new Promise<void>((done) => {
    run(`${app}-client`, [viteBin, 'build'], { ...baseEnv }, dir).on('close', () => done());
  });
  processes.pop();
}

for (const app of apps) {
  run(app, ['--watch', '--conditions=development', '--import', 'tsx/esm', APP_ENTRIES[app]], {
    ...baseEnv,
    ...appEnvs.get(app)!,
  });
}

function shutdown() {
  stopping = true;
  console.log('\nStopping all apps...');
  for (const { proc } of processes) proc.kill('SIGTERM');
  setTimeout(() => process.exit(0), 1500);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log(`[dev:staging] Started ${apps.join(', ')} against staging. Press Ctrl+C to stop.`);
