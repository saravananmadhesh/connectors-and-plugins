/**
 * The one harness for starting extra app processes next to the runner stack. A test file that
 * needs an app with its own settings (a different limit, a short timeout) starts a private
 * process on a free port, with the same per-app environment as the stack, and stops it again.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { createWriteStream, mkdirSync, type WriteStream } from 'node:fs';
import { createServer, connect } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { APP_ENTRIES, appEnv, baseProcessEnv, type AppName } from '../../../scripts/app-env.js';
import { requireEnv } from '../test-env.js';

export interface RunningApp {
  name: AppName;
  /** The port the process listens on (the health port for the worker). */
  port: number;
  url: string;
  stop: () => Promise<void>;
}

interface Registered {
  app: RunningApp;
  env: Record<string, string>;
  child: ChildProcess;
  log: WriteStream;
}

const registry = new Map<AppName, Registered>();

/** Asks the operating system for a port nobody listens on. */
export function freePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close(() => resolvePort(port));
    });
  });
}

/** True while something accepts connections on the port. */
export function isPortOpen(port: number): Promise<boolean> {
  return new Promise((resolveOpen) => {
    const socket = connect({ port, host: '127.0.0.1' });
    socket.once('connect', () => {
      socket.destroy();
      resolveOpen(true);
    });
    socket.once('error', () => resolveOpen(false));
  });
}

const portOf = (name: string) => Number(new URL(requireEnv(name)).port);

function stackContext() {
  const secrets: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) secrets[key] = value;
  }
  return {
    secrets,
    databaseUrl: requireEnv('DATABASE_URL'),
    ports: {
      web: portOf('TEST_WEB_URL'),
      admin: portOf('TEST_ADMIN_URL'),
      api: portOf('TEST_API_URL'),
      gateway: portOf('TEST_GATEWAY_URL'),
      workerHealth: portOf('TEST_WORKER_URL'),
      mailpitSmtp: Number(new URL(requireEnv('MAILPIT_SMTP_URL')).port),
      redis: Number(new URL(requireEnv('TEST_REDIS_URL')).port),
    },
    objectStore: { port: portOf('TEST_S3_ENDPOINT'), bucket: requireEnv('TEST_S3_BUCKET') },
    deployEnv: 'test' as const,
    keyringPath: requireEnv('TEST_KMS_KEYRING_PATH'),
    secretsDir: requireEnv('TEST_SECRETS_DIR'),
  };
}

async function waitHealthy(port: number, child: ChildProcess, name: string): Promise<void> {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`${name} exited with code ${child.exitCode}`);
    try {
      if ((await fetch(`http://127.0.0.1:${port}/healthz`)).ok) return;
    } catch {
      // not listening yet
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 200));
  }
  throw new Error(`${name} did not become healthy within 60 s`);
}

function launch(name: AppName, env: Record<string, string>, port: number): Registered {
  const context = stackContext();
  const portKey = name === 'worker' ? 'HEALTH_PORT' : 'PORT';
  const processEnv = {
    ...baseProcessEnv(process.env),
    NO_COLOR: '1',
    ...appEnv(name, context),
    // A private process never shares a port with the stack's own instance of the app
    [portKey]: String(port),
    ...env,
  };
  const logDir = process.env['TEST_LOG_DIR'] ?? join(tmpdir(), 'boldcreate-private-apps');
  mkdirSync(logDir, { recursive: true });
  const log = createWriteStream(join(logDir, `private-${name}-${port}.log`));
  const child = spawn(
    process.execPath,
    ['--conditions=development', '--import', 'tsx/esm', APP_ENTRIES[name]],
    {
      cwd: join(import.meta.dirname, '..', '..', '..'),
      env: processEnv,
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
  child.stdout?.pipe(log, { end: false });
  child.stderr?.pipe(log, { end: false });

  const stop = async () => {
    if (child.exitCode === null) {
      const exited = new Promise<void>((resolveExit) => child.once('exit', () => resolveExit()));
      child.kill();
      await exited;
    }
    log.end();
    registry.delete(name);
  };
  return { app: { name, port, url: `http://127.0.0.1:${port}`, stop }, env, child, log };
}

/**
 * Starts an extra process of an app with `env` on top of the stack's settings and waits until it
 * is healthy. One process per app name at a time; stop it with `stopApp`.
 */
export async function startApp(
  name: AppName,
  env: Record<string, string> = {},
): Promise<RunningApp> {
  if (registry.has(name)) throw new Error(`a private ${name} is already running`);
  const port = await freePort();
  const entry = launch(name, env, port);
  registry.set(name, entry);
  try {
    await waitHealthy(port, entry.child, name);
  } catch (error) {
    await entry.app.stop();
    throw error;
  }
  return entry.app;
}

/** Stops the private process of an app and waits until its port is released. */
export async function stopApp(name: AppName): Promise<void> {
  await registry.get(name)?.app.stop();
}

/** Stops and starts the private process again with the same settings (on a new port). */
export async function restartApp(name: AppName): Promise<RunningApp> {
  const entry = registry.get(name);
  if (!entry) throw new Error(`no private ${name} is running`);
  await entry.app.stop();
  return startApp(name, entry.env);
}

/** An api process with its own settings, for one test file. */
export function startPrivateApi(env: Record<string, string> = {}): Promise<RunningApp> {
  return startApp('api', env);
}
