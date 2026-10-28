/**
 * Where local PostgreSQL runs: the embedded server (default), a container this repo starts, or a
 * server you run yourself.
 *
 * Choose with `POSTGRES_MODE` (in `.env.development` or the shell) or the flag
 * `--postgres=<mode>` (for example `pnpm dev --postgres=docker`). The flag wins.
 *
 *   embedded  PostgreSQL from the embedded-postgres package (no Docker needed)
 *   docker    a container started and stopped here (`POSTGRES_DOCKER_IMAGE`, default postgres:17)
 *   external  a server you run; `DATABASE_URL` must carry a login that may create databases
 */
import { spawnSync } from 'node:child_process';
import { connect } from 'node:net';
import pg from 'pg';

const sleep = (ms: number) => new Promise<void>((done) => setTimeout(done, ms));

export type PostgresMode = 'embedded' | 'docker' | 'external';

export const POSTGRES_MODES: readonly PostgresMode[] = ['embedded', 'docker', 'external'];

export interface PostgresSettings {
  mode: PostgresMode;
  /** Docker image, `docker` mode only. Embedded PostgreSQL is version 17, so 17 is the default. */
  image: string;
  /** Container name, `docker` mode only. */
  container: string;
  /** Delete the database first (`docker`: container and volume; `external`: the database). */
  reset: boolean;
}

export const DEFAULT_POSTGRES_IMAGE = 'postgres:17';
export const DEFAULT_POSTGRES_CONTAINER = 'boldcreate-dev-postgres';

/** The flag wins over the environment; both fall back to the embedded server. */
export function resolvePostgresSettings(
  env: Record<string, string | undefined>,
  argv: readonly string[],
  overrides: Partial<Pick<PostgresSettings, 'container' | 'reset'>> = {},
): PostgresSettings {
  const flag = argv.find((value) => value.startsWith('--postgres='))?.slice('--postgres='.length);
  const raw = (flag ?? env['POSTGRES_MODE'] ?? 'embedded').trim().toLowerCase();
  if (!POSTGRES_MODES.includes(raw as PostgresMode)) {
    throw new Error(
      `POSTGRES_MODE "${raw}" is not valid. Use ${POSTGRES_MODES.join(', ')} ` +
        '(set POSTGRES_MODE or pass --postgres=<mode>).',
    );
  }
  return {
    mode: raw as PostgresMode,
    image: env['POSTGRES_DOCKER_IMAGE']?.trim() || DEFAULT_POSTGRES_IMAGE,
    container:
      overrides.container ??
      (env['POSTGRES_DOCKER_CONTAINER']?.trim() || DEFAULT_POSTGRES_CONTAINER),
    reset: overrides.reset ?? false,
  };
}

/** Same throwaway-data settings the embedded server uses, so both behave alike. */
export const DOCKER_POSTGRES_FLAGS = [
  '-c',
  'fsync=off',
  '-c',
  'synchronous_commit=off',
  '-c',
  'full_page_writes=off',
  '-c',
  'checkpoint_timeout=30min',
  '-c',
  'max_wal_size=2GB',
] as const;

/**
 * Arguments for `docker run`. The password is passed by name only (`-e POSTGRES_PASSWORD`), so it
 * never appears in the process list; the caller puts the value in the child's environment.
 */
export function dockerRunArgs(
  settings: Pick<PostgresSettings, 'image' | 'container'>,
  options: { port: number; user: string; volume: string | undefined },
): string[] {
  return [
    'run',
    '--detach',
    '--name',
    settings.container,
    '--label',
    'boldcreate=local',
    '--publish',
    `127.0.0.1:${options.port}:5432`,
    '--env',
    `POSTGRES_USER=${options.user}`,
    '--env',
    'POSTGRES_PASSWORD',
    '--env',
    'POSTGRES_DB=postgres',
    ...(options.volume ? ['--volume', `${options.volume}:/var/lib/postgresql/data`] : []),
    settings.image,
    ...DOCKER_POSTGRES_FLAGS,
  ];
}

const volumeName = (container: string) => `${container}-data`;

function docker(args: string[], env?: Record<string, string>) {
  return spawnSync('docker', args, {
    encoding: 'utf8',
    env: env ? { ...process.env, ...env } : process.env,
  });
}

export function assertDockerAvailable() {
  const result = docker(['info', '--format', '{{.ServerVersion}}']);
  if (result.error || result.status !== 0) {
    throw new Error(
      'Docker is not running or not installed. Start Docker, or use the embedded server ' +
        '(POSTGRES_MODE=embedded or --postgres=embedded).',
    );
  }
}

function isPortOpen(port: number): Promise<boolean> {
  return new Promise((done) => {
    const socket = connect({ host: 'localhost', port });
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

/** Waits until the server accepts the login; a wrong password stops at once with a hint. */
async function waitForLogin(client: () => pg.Client, hint: string) {
  let last = '';
  for (let attempt = 0; attempt < 120; attempt++) {
    const probe = client();
    try {
      await probe.connect();
      await probe.end();
      return;
    } catch (error) {
      await probe.end().catch(() => undefined);
      const failure = error as { code?: string; message?: string };
      if (failure.code === '28P01') {
        throw new Error(`PostgreSQL refused the login (wrong password). ${hint}`);
      }
      last = failure.message ?? String(error);
    }
    await sleep(500);
  }
  throw new Error(`PostgreSQL did not become ready. Last error: ${last}`);
}

const quoteIdentifier = (name: string) => `"${name.replaceAll('"', '""')}"`;

/** Connects as the superuser to the `postgres` database and makes sure `database` exists. */
export async function ensureDatabase(options: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  reset: boolean;
}): Promise<boolean> {
  const admin = new pg.Client({
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: 'postgres',
  });
  await admin.connect();
  try {
    const found = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [
      options.database,
    ]);
    const exists = (found.rowCount ?? 0) > 0;
    if (exists && options.reset) {
      await admin.query(`DROP DATABASE ${quoteIdentifier(options.database)} WITH (FORCE)`);
    }
    if (!exists || options.reset) {
      await admin.query(`CREATE DATABASE ${quoteIdentifier(options.database)}`);
      return true;
    }
    return false;
  } finally {
    await admin.end();
  }
}

export interface ExternalPostgres {
  /** True when this start created the database (it did not exist, or it was reset). */
  created: boolean;
  stop: () => Promise<void>;
}

/** Starts the container (or reuses its volume), waits for the login and creates the database. */
export async function startDockerPostgres(options: {
  settings: PostgresSettings;
  port: number;
  user: string;
  password: string;
  database: string;
  /** Keep the data between runs (a named volume); false removes everything on stop. */
  persistent: boolean;
}): Promise<ExternalPostgres> {
  const { settings } = options;
  assertDockerAvailable();
  const volume = options.persistent ? volumeName(settings.container) : undefined;

  // Our own earlier container is replaced; its data stays in the volume unless this is a reset.
  docker(['rm', '--force', settings.container]);
  if (volume && settings.reset) docker(['volume', 'rm', '--force', volume]);
  if (await isPortOpen(options.port)) {
    throw new Error(
      `PostgreSQL port ${options.port} is already in use. Stop the other instance (a native ` +
        'install, another container or the embedded server) or change PORT_POSTGRES.',
    );
  }
  const volumeExisted = volume ? docker(['volume', 'inspect', volume]).status === 0 : false;

  const run = docker(dockerRunArgs(settings, { port: options.port, user: options.user, volume }), {
    POSTGRES_PASSWORD: options.password,
  });
  if (run.status !== 0) {
    throw new Error(
      `Could not start the PostgreSQL container (${settings.image}): ${(run.stderr || run.error?.message || '').trim()}`,
    );
  }

  const stop = async () => {
    if (volume) docker(['stop', '--time', '5', settings.container]);
    else docker(['rm', '--force', settings.container]);
  };
  try {
    await waitForLogin(
      () =>
        new pg.Client({
          host: 'localhost',
          port: options.port,
          user: options.user,
          password: options.password,
          database: 'postgres',
        }),
      'The volume holds an older login; run `pnpm dev --reset-db` to start over.',
    );
    const created = await ensureDatabase({
      host: 'localhost',
      port: options.port,
      user: options.user,
      password: options.password,
      database: options.database,
      reset: false,
    });
    return { created: created || !volumeExisted, stop };
  } catch (error) {
    await stop();
    throw error;
  }
}

/** Uses a server you run; `DATABASE_URL` carries the login, nothing is started or stopped. */
export async function connectExternalPostgres(options: {
  settings: PostgresSettings;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}): Promise<ExternalPostgres> {
  if (!options.password) {
    throw new Error(
      'POSTGRES_MODE=external needs a login in DATABASE_URL, for example ' +
        'postgresql://user:password@localhost:5432/boldcreate (the user must be able to create databases).',
    );
  }
  await waitForLogin(
    () =>
      new pg.Client({
        host: options.host,
        port: options.port,
        user: options.user,
        password: options.password,
        database: 'postgres',
      }),
    'Check the user and password in DATABASE_URL.',
  );
  const created = await ensureDatabase({ ...options, reset: options.settings.reset });
  return { created, stop: async () => undefined };
}
