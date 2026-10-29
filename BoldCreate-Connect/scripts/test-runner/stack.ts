/**
 * Isolated, Docker-free stack for live tests: temporary PostgreSQL and Mailpit plus the
 * six app processes, all on non-default ports so a running
 * development stack is never touched.
 */
import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  type WriteStream,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadDevEnv } from '../../packages/config/src/env.js';
import { APP_ENTRIES, appEnv, baseProcessEnv, type AppName } from '../app-env.js';
import { ensureDevSecrets, withSuperuserLogin } from '../dev-secrets.js';
import {
  repoRoot,
  sleep,
  startInfra,
  stopLeftoverInfra,
  waitFor,
  type Infra,
} from '../local-infra.js';
import { resolvePostgresSettings } from '../postgres-docker.js';

export interface StackPorts {
  postgres: number;
  mailpitSmtp: number;
  mailpitHttp: number;
  redis: number;
  objectStore: number;
  web: number;
  api: number;
  gateway: number;
  admin: number;
  workerHealth: number;
  /** Port of the upstream fixture server the integration tests start. */
  upstreamFixture: number;
}

export const defaultPorts: StackPorts = {
  postgres: 54329,
  mailpitSmtp: 11025,
  mailpitHttp: 18025,
  redis: 16379,
  objectStore: 19000,
  web: 13000,
  api: 13001,
  gateway: 13002,
  admin: 13004,
  workerHealth: 13005,
  upstreamFixture: 13990,
};

export interface RunningStack {
  env: Record<string, string>;
  /**
   * Starts the web process again, so it serves the client files of a build that finished after
   * the stack came up (the static file list is read once at start).
   */
  restartWeb: () => Promise<void>;
  stop: () => Promise<void>;
}

/**
 * Every run keeps its database and pid files in a new temporary directory, so a run that was
 * killed leaves its services holding the default ports. Stops those and removes the directories.
 */
async function stopStaleStacks() {
  for (const entry of readdirSync(tmpdir())) {
    if (!entry.startsWith('boldcreate-test-')) continue;
    const staleDir = join(tmpdir(), entry);
    await stopLeftoverInfra(staleDir);
    try {
      rmSync(staleDir, { recursive: true, force: true });
    } catch {
      // still locked by a process that is shutting down; the next run removes it
    }
  }
}

/**
 * A killed run can leave postgres child processes alive after their postmaster and its pid
 * file are gone, still holding the port. Stops embedded PostgreSQL processes that own the
 * isolated test port, or are children of its owner. Windows only; elsewhere the pid file works.
 */
function stopPostgresHoldingPort(port: number) {
  if (process.platform !== 'win32') return;
  const script = [
    `$owners = @(Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { $_.OwningProcess } | Sort-Object -Unique)`,
    'if ($owners.Count -eq 0) { exit 0 }',
    'Get-CimInstance Win32_Process -Filter "Name=\'postgres.exe\'" |',
    '  Where-Object { $owners -contains $_.ProcessId -or $owners -contains $_.ParentProcessId } |',
    '  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }',
  ].join('\n');
  spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', script], {
    stdio: 'ignore',
  });
}

export async function startStack(options: {
  logDir: string;
  ports?: Partial<StackPorts>;
}): Promise<RunningStack> {
  const ports = { ...defaultPorts, ...options.ports };
  mkdirSync(options.logDir, { recursive: true });

  loadDevEnv();
  await stopStaleStacks();
  stopPostgresHoldingPort(ports.postgres);
  await sleep(500);
  // Secrets are new on every run and live only in this temporary directory, which also
  // holds the database and is removed when the stack stops.
  const dataDir = mkdtempSync(join(tmpdir(), 'boldcreate-test-'));
  const devSecrets = ensureDevSecrets(dataDir);
  const databaseUrl = withSuperuserLogin(
    `postgresql://localhost:${ports.postgres}/boldcreate`,
    devSecrets,
  );
  const base: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) base[key] = value;
  }
  delete base['FORCE_COLOR'];
  Object.assign(base, devSecrets, {
    NO_COLOR: '1',
    NODE_ENV: 'development',
    DATABASE_URL: databaseUrl,
    MAILPIT_SMTP_URL: `smtp://localhost:${ports.mailpitSmtp}`,
    TEST_UPSTREAM_PORT: String(ports.upstreamFixture),
    TEST_WEB_URL: `http://localhost:${ports.web}`,
    TEST_API_URL: `http://localhost:${ports.api}`,
    TEST_GATEWAY_URL: `http://localhost:${ports.gateway}`,
    TEST_ADMIN_URL: `http://localhost:${ports.admin}`,
    TEST_WORKER_URL: `http://localhost:${ports.workerHealth}`,
    TEST_MAILPIT_URL: `http://localhost:${ports.mailpitHttp}`,
    TEST_REDIS_URL: `redis://:${devSecrets['REDIS_PASSWORD']}@127.0.0.1:${ports.redis}`,
    TEST_S3_ENDPOINT: `http://127.0.0.1:${ports.objectStore}`,
    TEST_KMS_KEYRING_PATH: join(dataDir, 'kms-keyring.json'),
    TEST_SECRETS_DIR: join(dataDir, 'secrets'),
    TEST_LOG_DIR: options.logDir,
    TEST_S3_BUCKET: 'boldcreate-test',
    TEST_S3_ACCESS_KEY_ID: devSecrets['OBJECT_STORE_ROOT_USER']!,
    TEST_S3_SECRET_ACCESS_KEY: devSecrets['OBJECT_STORE_ROOT_PASSWORD']!,
  });

  const children: ChildProcess[] = [];
  const crashed: string[] = [];
  let stopping = false;
  const logs: WriteStream[] = [];
  let infra: Infra | undefined;

  const stop = async () => {
    stopping = true;
    for (const child of children) child.kill();
    await sleep(500);
    for (const log of logs) log.end();
    if (infra) await infra.stop();
  };

  // Each app gets only its own keys; the test process keeps the generated secrets in `base`.
  const appContext = {
    secrets: devSecrets,
    databaseUrl,
    ports,
    deployEnv: 'test' as const,
    objectStore: { port: ports.objectStore, bucket: 'boldcreate-test' },
    keyringPath: join(dataDir, 'kms-keyring.json'),
    secretsDir: join(dataDir, 'secrets'),
    overrides: {
      // The suites sign in from one address many times a minute; the throttle itself is tested
      // against its own api instance.
      api: {
        LOGIN_THROTTLE_IP_EMAIL_LIMIT: '100000',
        LOGIN_THROTTLE_IP_LIMIT: '100000',
        UPSTREAM_ALLOWED_PORTS: String(ports.upstreamFixture),
      },
      // The admin app accepts this owner; the worker accepts none, so a queued sync fails at once
      // and the suites never reach out to GitHub.
      admin: { PLUGIN_SOURCE_ALLOWED_OWNERS: 'fixture-owner' },
      worker: {
        PLUGIN_SOURCE_ALLOWED_OWNERS: '',
        WEBHOOK_ALLOW_HTTP_HOSTS: 'localhost,127.0.0.1',
        WEBHOOK_ALLOWED_PORTS: String(ports.upstreamFixture),
        WEBHOOK_DISPATCH_INTERVAL_SECONDS: '1',
        WEBHOOK_EVENT_LAG_SECONDS: '0',
        WEBHOOK_RETRY_BASE_SECONDS: '0',
      },
      gateway: { UPSTREAM_ALLOWED_PORTS: String(ports.upstreamFixture) },
    },
  };
  const replaced = new WeakSet<ChildProcess>();
  const launch = (app: AppName) => {
    const log = createWriteStream(join(options.logDir, `${app}.log`));
    logs.push(log);
    const child = spawn(
      process.execPath,
      ['--conditions=development', '--import', 'tsx/esm', APP_ENTRIES[app]],
      {
        cwd: repoRoot,
        env: { ...baseProcessEnv(process.env), NO_COLOR: '1', ...appEnv(app, appContext) },
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
    child.stdout?.pipe(log, { end: false });
    child.stderr?.pipe(log, { end: false });
    child.on('exit', (code) => {
      if (!stopping && !replaced.has(child)) crashed.push(`${app} exited with code ${code}`);
    });
    children.push(child);
    return child;
  };
  let webProcess: ChildProcess | undefined;
  const waitHealthy = (label: string, port: number) =>
    waitFor(label, async () => {
      if (crashed.length > 0) return true;
      return (await fetch(`http://localhost:${port}/healthz`)).ok;
    });
  const restartWeb = async () => {
    const previous = webProcess;
    if (!previous) return;
    replaced.add(previous);
    previous.kill();
    await new Promise<void>((resolveExit) => {
      if (previous.exitCode !== null) resolveExit();
      else previous.once('exit', () => resolveExit());
    });
    webProcess = launch('web');
    await waitHealthy('web', ports.web);
    if (crashed.length > 0) throw new Error(`${crashed.join('; ')} (see service logs)`);
  };

  try {
    infra = await startInfra({
      databaseUrl,
      postgres: resolvePostgresSettings(process.env, [], {
        container: `boldcreate-test-postgres-${ports.postgres}`,
      }),
      secrets: devSecrets,
      mailpitSmtpPort: ports.mailpitSmtp,
      mailpitHttpPort: ports.mailpitHttp,
      redisPort: ports.redis,
      redisPassword: devSecrets['REDIS_PASSWORD']!,
      objectStorePort: ports.objectStore,
      objectStoreUser: devSecrets['OBJECT_STORE_ROOT_USER']!,
      objectStorePassword: devSecrets['OBJECT_STORE_ROOT_PASSWORD']!,
      bucket: 'boldcreate-test',
      dataDir,
      logDir: options.logDir,
      persistent: false,
    });

    for (const app of ['api', 'gateway', 'admin', 'worker', 'web'] as const) {
      const child = launch(app);
      if (app === 'web') webProcess = child;
    }

    for (const [label, port] of [
      ['api', ports.api],
      ['gateway', ports.gateway],
      ['admin', ports.admin],
      ['web', ports.web],
      ['worker', ports.workerHealth],
    ] as const) {
      await waitFor(label, async () => {
        if (crashed.length > 0) return true;
        return (await fetch(`http://localhost:${port}/healthz`)).ok;
      });
    }

    // The worker also logs when its poll loop has started
    await waitFor('worker', async () => {
      if (crashed.length > 0) return true;
      const log = join(options.logDir, 'worker.log');
      return existsSync(log) && readFileSync(log, 'utf8').includes('Worker started');
    });
    if (crashed.length > 0) {
      throw new Error(`${crashed.join('; ')} (see service logs in ${options.logDir})`);
    }
  } catch (error) {
    await stop();
    throw error;
  }

  return { env: base, restartWeb, stop };
}
