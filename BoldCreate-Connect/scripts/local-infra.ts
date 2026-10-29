/**
 * Docker-free PostgreSQL and Mailpit for local development and tests.
 *
 * PostgreSQL runs from the embedded-postgres package. Mailpit is a pinned release
 * downloaded once into `.cache/tools` and checksum-verified. Data lives in a data
 * directory: persistent for `pnpm dev` (delete it to start from a new database),
 * temporary for the test runner.
 */
import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import {
  cpSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
  type WriteStream,
} from 'node:fs';
import { connect, createServer, type AddressInfo, type Server } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';
import {
  startDockerPostgres,
  connectExternalPostgres,
  type ExternalPostgres,
  type PostgresSettings,
} from './postgres-docker.js';
import {
  OBJECT_STORE_VERSION,
  REDIS_VERSION,
  ensureArchivedTool,
  objectStoreAssets,
  redisAssets,
} from './infra-tools.js';

export const repoRoot = resolve(import.meta.dirname, '..');
export const toolsCache = join(repoRoot, '.cache', 'tools');

export function sleep(ms: number) {
  return new Promise<void>((done) => setTimeout(done, ms));
}

export async function waitFor(
  label: string,
  probe: () => Promise<boolean>,
  attempts = 60,
  hasExited: () => boolean = () => false,
) {
  for (let i = 0; i < attempts; i++) {
    if (hasExited()) throw new Error(`${label} exited before it was ready`);
    try {
      if (await probe()) return;
    } catch {
      // not ready yet
    }
    await sleep(500);
  }
  throw new Error(`${label} did not become ready`);
}

// ── Mailpit download ──────────────────────────────────────────────────────────

export const MAILPIT_VERSION = 'v1.31.4';

interface MailpitAsset {
  archive: string;
  sha256: string;
  binary: string;
}

const mailpitAssets: Record<string, MailpitAsset> = {
  'win32-x64': {
    archive: 'mailpit-windows-amd64.zip',
    sha256: '0dd6ec909a6f5b2b66682b22d82abce97ab793e30766bf2f642b691e70a4a16b',
    binary: 'mailpit.exe',
  },
  'win32-arm64': {
    archive: 'mailpit-windows-arm64.zip',
    sha256: 'db337b96ace79e7a8d837b31023159062f87db35a12f8cb67304c32a09959056',
    binary: 'mailpit.exe',
  },
  'linux-x64': {
    archive: 'mailpit-linux-amd64.tar.gz',
    sha256: '30942c4605c2ca8b9f759b1bb4e3ab6a12bdfdf66e5c94644ec2c75ac41e88e7',
    binary: 'mailpit',
  },
  'linux-arm64': {
    archive: 'mailpit-linux-arm64.tar.gz',
    sha256: '010a346a8b9d454f6fa22d4fd2dbd5bf5eb7104688412b9c130d0ba33a3579c4',
    binary: 'mailpit',
  },
  'darwin-x64': {
    archive: 'mailpit-darwin-amd64.tar.gz',
    sha256: '9ff1d1b249ccb884ca48a6fca01f69f9db88b07692dd98e115294778a0b20f54',
    binary: 'mailpit',
  },
  'darwin-arm64': {
    archive: 'mailpit-darwin-arm64.tar.gz',
    sha256: '26afeae329874fa6154dd83bd2e0f307e5df858054145dc7e98ec1aa426a8381',
    binary: 'mailpit',
  },
};

/** Returns the path to the cached Mailpit binary, downloading and verifying it when absent. */
export async function ensureMailpit(): Promise<string> {
  const key = `${process.platform}-${process.arch}`;
  const asset = mailpitAssets[key];
  if (!asset) throw new Error(`No pinned Mailpit release for platform ${key}`);

  const dir = join(toolsCache, 'mailpit', MAILPIT_VERSION, key);
  const binaryPath = join(dir, asset.binary);
  if (existsSync(binaryPath)) return binaryPath;

  mkdirSync(dir, { recursive: true });
  const url = `https://github.com/axllent/mailpit/releases/download/${MAILPIT_VERSION}/${asset.archive}`;
  console.log(`[infra] downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Mailpit download failed: HTTP ${res.status}`);
  const data = new Uint8Array(await res.arrayBuffer());

  const actual = createHash('sha256').update(data).digest('hex');
  if (actual !== asset.sha256) {
    throw new Error(`Mailpit checksum mismatch: expected ${asset.sha256}, got ${actual}`);
  }

  const archivePath = join(dir, asset.archive);
  writeFileSync(archivePath, data);
  // Zip archives (Windows) are expanded with PowerShell, because a GNU tar on PATH cannot read them.
  const extract = asset.archive.endsWith('.zip')
    ? spawnSync(
        'powershell',
        [
          '-NoProfile',
          '-Command',
          `Expand-Archive -LiteralPath '${archivePath}' -DestinationPath '${dir}' -Force`,
        ],
        { stdio: 'inherit' },
      )
    : spawnSync('tar', ['-xzf', asset.archive], { cwd: dir, stdio: 'inherit' });
  rmSync(archivePath, { force: true });
  if (extract.status !== 0 || !existsSync(binaryPath)) {
    throw new Error('Mailpit archive extraction failed');
  }
  if (process.platform !== 'win32') {
    spawnSync('chmod', ['+x', binaryPath]);
  }
  return binaryPath;
}

// ── Redis and object store binaries ───────────────────────────────────────────

/** Returns the Redis server binary: a pinned download, or the file named by REDIS_SERVER_BIN. */
export async function ensureRedis(): Promise<string> {
  const override = process.env['REDIS_SERVER_BIN'];
  if (override) {
    if (!existsSync(override)) throw new Error(`REDIS_SERVER_BIN does not exist: ${override}`);
    return override;
  }
  const key = `${process.platform}-${process.arch}`;
  const asset = redisAssets[key];
  if (!asset) {
    throw new Error(
      `No pinned Redis release for platform ${key}. Install redis-server and set REDIS_SERVER_BIN.`,
    );
  }
  return ensureArchivedTool({
    name: 'redis',
    version: REDIS_VERSION,
    asset,
    toolsCache,
    platformKey: key,
  });
}

/** Returns the S3-compatible object store binary (SeaweedFS `weed`). */
export async function ensureObjectStore(): Promise<string> {
  const key = `${process.platform}-${process.arch}`;
  const asset = objectStoreAssets[key];
  if (!asset) throw new Error(`No pinned object store release for platform ${key}`);
  return ensureArchivedTool({
    name: 'object-store',
    version: OBJECT_STORE_VERSION,
    asset,
    toolsCache,
    platformKey: key,
  });
}

/** Sends AUTH and PING over a raw socket; true when the server answers PONG. */
function redisPing(port: number, password: string): Promise<boolean> {
  return new Promise((done) => {
    const socket = connect({ host: '127.0.0.1', port });
    let received = '';
    socket.setTimeout(1000, () => {
      socket.destroy();
      done(false);
    });
    socket.once('connect', () => socket.write(`AUTH ${password}\r\nPING\r\n`));
    socket.on('data', (chunk) => {
      received += chunk.toString();
      if (received.includes('+PONG')) {
        socket.destroy();
        done(true);
      }
    });
    socket.once('error', () => done(false));
  });
}

// ── PostgreSQL cluster template ───────────────────────────────────────────────

/**
 * Creating a PostgreSQL cluster (initdb) takes about ten seconds and gives the same result
 * every time, so it is done once per package version and login and copied afterwards.
 * The template has its own random password, stored inside it; a run replaces that password
 * with its own right after the first start, so run secrets never reach the cache.
 * Delete `.cache/tools` to rebuild it.
 */
const TEMPLATE_PASSWORD_FILE = 'template-password';
/** UTF-8 text whatever the Windows code page is; part of the template key so a change rebuilds it. */
const CLUSTER_INITDB_FLAGS = ['--encoding=UTF8'];

async function ensureClusterTemplate(user: string): Promise<{ dir: string; password: string }> {
  const packageJson = join(
    dirname(fileURLToPath(import.meta.resolve('embedded-postgres'))),
    '..',
    'package.json',
  );
  const version = (JSON.parse(readFileSync(packageJson, 'utf8')) as { version: string }).version;
  const key = createHash('sha256')
    .update(`${version}:${user}:${CLUSTER_INITDB_FLAGS.join(' ')}`)
    .digest('hex')
    .slice(0, 12);
  const template = join(toolsCache, 'pg-cluster', key);
  const readPassword = () => readFileSync(join(template, TEMPLATE_PASSWORD_FILE), 'utf8');
  if (existsSync(join(template, 'PG_VERSION'))) return { dir: template, password: readPassword() };

  // Build in a private folder and rename into place, so two runs starting together cannot corrupt it
  const building = `${template}.${process.pid}.tmp`;
  rmSync(building, { recursive: true, force: true });
  mkdirSync(dirname(building), { recursive: true });
  const password = randomBytes(32).toString('hex');
  const builder = new EmbeddedPostgres({
    databaseDir: building,
    user,
    password,
    port: 0,
    persistent: true,
    initdbFlags: CLUSTER_INITDB_FLAGS,
    onLog: () => undefined,
    onError: () => undefined,
  });
  await builder.initialise();
  writeFileSync(join(building, TEMPLATE_PASSWORD_FILE), password);
  try {
    renameSync(building, template);
  } catch {
    // another run finished first
    rmSync(building, { recursive: true, force: true });
  }
  return { dir: template, password: readPassword() };
}

const quoteIdentifier = (name: string) => `"${name.replaceAll('"', '""')}"`;
const quoteLiteral = (value: string) => `'${value.replaceAll("'", "''")}'`;

/** Replaces the template's password with the run's own and creates the database. */
async function provisionNewCluster(options: {
  port: number;
  user: string;
  templatePassword: string;
  password: string;
  database: string;
}) {
  const admin = new pg.Client({
    host: 'localhost',
    port: options.port,
    user: options.user,
    password: options.templatePassword,
    database: 'postgres',
  });
  await admin.connect();
  try {
    await admin.query(
      `ALTER ROLE ${quoteIdentifier(options.user)} PASSWORD ${quoteLiteral(options.password)}`,
    );
    await admin.query(`CREATE DATABASE ${quoteIdentifier(options.database)}`);
  } finally {
    await admin.end();
  }
}

// ── PostgreSQL + Mailpit lifecycle ────────────────────────────────────────────

export interface InfraOptions {
  /** postgresql://user:password@host:port/database — also defines the cluster's login. */
  databaseUrl: string;
  /** Where PostgreSQL runs; the embedded server when absent. See `postgres-docker.ts`. */
  postgres?: PostgresSettings;
  /** Generated secrets (for example the database role passwords) passed to the setup scripts. */
  secrets: Record<string, string>;
  mailpitSmtpPort: number;
  mailpitHttpPort: number;
  redisPort: number;
  /** Password Redis requires (generated, never committed). */
  redisPassword: string;
  /** S3 API port. */
  objectStorePort: number;
  /** Fixed port of the store's own web UI (dev); a free port is used when absent. */
  objectStoreUiPort?: number;
  objectStoreUser: string;
  objectStorePassword: string;
  /** Bucket created in the object store on start. */
  bucket: string;
  /** Holds `postgres/`, `mailpit.db` and `object-store/`. */
  dataDir: string;
  logDir: string;
  /** When false the data directory is removed on stop. */
  persistent: boolean;
  /** Delete existing data first, so a new database is created. */
  reset?: boolean;
}

export interface Infra {
  /** True when a new database cluster was created by this start. */
  created: boolean;
  stop: () => Promise<void>;
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

/** Reserves `count` distinct free loopback ports (all held at once, then released). */
async function freePorts(count: number): Promise<number[]> {
  const servers = await Promise.all(
    Array.from(
      { length: count },
      () =>
        new Promise<Server>((done, fail) => {
          const server = createServer();
          server.once('error', fail);
          server.listen(0, '127.0.0.1', () => done(server));
        }),
    ),
  );
  const ports = servers.map((server) => (server.address() as AddressInfo).port);
  await Promise.all(
    servers.map((server) => new Promise<void>((done) => server.close(() => done()))),
  );
  return ports;
}

function processName(pid: number): string {
  const result =
    process.platform === 'win32'
      ? spawnSync('tasklist', ['/FI', `PID eq ${pid}`, '/FO', 'CSV', '/NH'], { encoding: 'utf8' })
      : spawnSync('ps', ['-p', String(pid), '-o', 'comm='], { encoding: 'utf8' });
  return (result.stdout ?? '').toLowerCase();
}

/**
 * Stops a PostgreSQL or Mailpit process left behind by an earlier run whose terminal was
 * killed. Only a process recorded in this data directory and still named as expected
 * is touched.
 */
async function stopOrphan(pidFile: string, ...expectedNames: string[]) {
  if (!existsSync(pidFile)) return;
  const pid = Number.parseInt(readFileSync(pidFile, 'utf8').split(/\r?\n/)[0] ?? '', 10);
  const matchedName = () => expectedNames.find((name) => processName(pid).includes(name));
  const isExpected = () => matchedName() !== undefined;
  if (Number.isInteger(pid) && pid > 0 && isExpected()) {
    console.log(`[infra] stopping leftover ${matchedName()} (pid ${pid}) from an earlier run`);
    if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(pid), '/T', '/F']);
    else {
      try {
        process.kill(pid, 'SIGINT');
      } catch {
        // already gone
      }
    }
    for (let i = 0; i < 20 && isExpected(); i++) await sleep(250);
  }
  rmSync(pidFile, { force: true });
}

/** Stops every process an earlier run recorded in this data directory. */
export async function stopLeftoverInfra(dataDir: string, includePostgres = true) {
  if (includePostgres) await stopOrphan(join(dataDir, 'postgres', 'postmaster.pid'), 'postgres');
  await stopOrphan(join(dataDir, 'mailpit.pid'), 'mailpit');
  await stopOrphan(join(dataDir, 'redis.pid'), 'redis');
  // Earlier versions served the store with rclone and a second browser process.
  await stopOrphan(join(dataDir, 'object-store.pid'), 'weed', 'rclone');
  await stopOrphan(join(dataDir, 'object-store-browser.pid'), 'rclone');
}

function runScript(script: string, env: NodeJS.ProcessEnv) {
  const result = spawnSync(
    process.execPath,
    ['--conditions=development', '--import', 'tsx/esm', script],
    {
      cwd: repoRoot,
      env,
      encoding: 'utf8',
    },
  );
  if (result.status !== 0) {
    throw new Error(`${script} failed:\n${result.stdout}\n${result.stderr}`);
  }
}

export async function startInfra(options: InfraOptions): Promise<Infra> {
  const url = new URL(options.databaseUrl);
  const port = Number(url.port || 5432);
  const user = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  const database = url.pathname.slice(1);

  const postgresSettings: PostgresSettings = options.postgres ?? {
    mode: 'embedded',
    image: '',
    container: '',
    reset: false,
  };
  const embeddedPostgres = postgresSettings.mode === 'embedded';
  const pgDir = join(options.dataDir, 'postgres');
  if (options.reset) rmSync(options.dataDir, { recursive: true, force: true });
  mkdirSync(options.logDir, { recursive: true });
  mkdirSync(options.dataDir, { recursive: true });

  await stopLeftoverInfra(options.dataDir, embeddedPostgres);

  for (const [label, busyPort] of [
    ...(embeddedPostgres ? ([['PostgreSQL', port]] as const) : []),
    ['Mailpit SMTP', options.mailpitSmtpPort],
    ['Mailpit web', options.mailpitHttpPort],
    ['Redis', options.redisPort],
    ['Object store', options.objectStorePort],
    ...(options.objectStoreUiPort === undefined
      ? []
      : ([['Object store UI', options.objectStoreUiPort]] as const)),
  ] as const) {
    if (await isPortOpen(busyPort)) {
      throw new Error(
        `${label} port ${busyPort} is already in use. Stop the other instance ` +
          '(an earlier run, a native install or a container) and try again.',
      );
    }
  }

  const logs: WriteStream[] = [];
  const openLog = (name: string) => {
    const stream = createWriteStream(join(options.logDir, `${name}.log`));
    logs.push(stream);
    return stream;
  };
  const postgresLog = openLog('postgres');
  let postgres: EmbeddedPostgres | undefined;
  let externalPostgres: ExternalPostgres | undefined;
  let mailpit: ChildProcess | undefined;
  let redis: ChildProcess | undefined;
  let objectStore: ChildProcess | undefined;
  let created = false;

  const stop = async () => {
    mailpit?.kill();
    redis?.kill();
    objectStore?.kill();
    for (const name of ['mailpit', 'redis', 'object-store']) {
      rmSync(join(options.dataDir, `${name}.pid`), { force: true });
    }
    if (postgres) await postgres.stop().catch(() => undefined);
    if (externalPostgres) await externalPostgres.stop().catch(() => undefined);
    await sleep(300);
    for (const log of logs) log.end();
    if (!options.persistent) rmSync(options.dataDir, { recursive: true, force: true });
  };

  try {
    if (!embeddedPostgres) {
      externalPostgres =
        postgresSettings.mode === 'docker'
          ? await startDockerPostgres({
              settings: postgresSettings,
              port,
              user,
              password,
              database,
              persistent: options.persistent,
            })
          : await connectExternalPostgres({
              settings: postgresSettings,
              host: url.hostname || 'localhost',
              port,
              user,
              password,
              database,
            });
      created = externalPostgres.created;
    }

    // A directory without PG_VERSION is an interrupted first start: begin again
    if (embeddedPostgres) created = !existsSync(join(pgDir, 'PG_VERSION'));
    if (embeddedPostgres && created) rmSync(pgDir, { recursive: true, force: true });

    let templatePassword = password;
    if (embeddedPostgres && created) {
      const template = await ensureClusterTemplate(user);
      cpSync(template.dir, pgDir, { recursive: true });
      rmSync(join(pgDir, TEMPLATE_PASSWORD_FILE), { force: true });
      templatePassword = template.password;
    }
    if (embeddedPostgres)
      postgres = new EmbeddedPostgres({
        databaseDir: pgDir,
        user,
        password: templatePassword,
        port,
        persistent: true,
        // Throwaway local data: skip durability work so the checkpointer is not starved on Windows
        postgresFlags: [
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
        ],
        onLog: (message) => postgresLog.write(`${String(message)}\n`),
        onError: (message) => postgresLog.write(`${String(message)}\n`),
      });
    try {
      await postgres?.start();
    } catch (error) {
      throw new Error(
        `PostgreSQL failed to start (see ${join(options.logDir, 'postgres.log')}). ` +
          'If an earlier run crashed, stop any leftover postgres process and retry. ' +
          `Cause: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    if (embeddedPostgres && created) {
      await provisionNewCluster({ port, user, templatePassword, password, database });
    }

    const env = { ...process.env, ...options.secrets, DATABASE_URL: options.databaseUrl };
    runScript('scripts/migrate.ts', env);

    const binary = await ensureMailpit();
    mailpit = spawn(
      binary,
      [
        '--listen',
        `localhost:${options.mailpitHttpPort}`,
        '--smtp',
        `localhost:${options.mailpitSmtpPort}`,
        '--database',
        join(options.dataDir, 'mailpit.db'),
      ],
      { env: { ...process.env, MP_MAX_MESSAGES: '500' }, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    if (mailpit.pid) writeFileSync(join(options.dataDir, 'mailpit.pid'), String(mailpit.pid));
    const mailLog = openLog('mailpit');
    mailpit.stdout?.pipe(mailLog, { end: false });
    mailpit.stderr?.pipe(mailLog, { end: false });
    await waitFor('mailpit', async () => {
      const res = await fetch(`http://localhost:${options.mailpitHttpPort}/api/v1/info`);
      return res.ok;
    });

    const redisBinary = await ensureRedis();
    redis = spawn(
      redisBinary,
      [
        '--port',
        String(options.redisPort),
        '--bind',
        '127.0.0.1',
        '--save',
        '',
        '--appendonly',
        'no',
        '--requirepass',
        options.redisPassword,
      ],
      { cwd: options.dataDir, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    if (redis.pid) writeFileSync(join(options.dataDir, 'redis.pid'), String(redis.pid));
    const redisLog = openLog('redis');
    redis.stdout?.pipe(redisLog, { end: false });
    redis.stderr?.pipe(redisLog, { end: false });
    await waitFor('redis', () => redisPing(options.redisPort, options.redisPassword));

    const objectStoreBinary = await ensureObjectStore();
    const storeRoot = join(options.dataDir, 'object-store');
    mkdirSync(storeRoot, { recursive: true });
    // The credentials file is rewritten on every start and wins over anything stored earlier.
    const credentialsFile = join(options.dataDir, 'object-store-s3.json');
    writeFileSync(
      credentialsFile,
      JSON.stringify({
        identities: [
          {
            name: 'dev',
            credentials: [
              { accessKey: options.objectStoreUser, secretKey: options.objectStorePassword },
            ],
            actions: ['Admin', 'Read', 'Write', 'List', 'Tagging'],
          },
        ],
      }),
      { mode: 0o600 },
    );
    // Every listener is loopback only. Ports nobody needs to open are picked free each start, so
    // neither the gRPC defaults (http port + 10000) nor another stack can collide with them.
    const [masterPort, volumePort, filerPort, uiFallback, ...grpc] = await freePorts(9);
    const adminPort = options.objectStoreUiPort ?? uiFallback!;
    objectStore = spawn(
      objectStoreBinary,
      [
        'mini',
        `-dir=${storeRoot}`,
        '-ip=127.0.0.1',
        '-ip.bind=127.0.0.1',
        `-s3.port=${options.objectStorePort}`,
        `-s3.config=${credentialsFile}`,
        `-bucket=${options.bucket}`,
        `-filer.port=${filerPort}`,
        `-admin.port=${adminPort}`,
        `-master.port=${masterPort}`,
        `-volume.port=${volumePort}`,
        `-s3.port.grpc=${grpc[0]}`,
        `-filer.port.grpc=${grpc[1]}`,
        `-admin.port.grpc=${grpc[2]}`,
        `-master.port.grpc=${grpc[3]}`,
        `-volume.port.grpc=${grpc[4]}`,
        '-webdav=false',
        '-s3.port.iceberg=0',
        '-s3.port.lance=0',
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let objectStoreExited = false;
    objectStore.once('exit', () => {
      objectStoreExited = true;
    });
    if (objectStore.pid) {
      writeFileSync(join(options.dataDir, 'object-store.pid'), String(objectStore.pid));
    }
    const storeLog = openLog('object-store');
    objectStore.stdout?.pipe(storeLog, { end: false });
    objectStore.stderr?.pipe(storeLog, { end: false });
    // Ready when the S3 port accepts connections and the bucket exists in the file browser.
    await waitFor(
      'object store',
      async () => {
        if (!(await isPortOpen(options.objectStorePort))) return false;
        const res = await fetch(`http://127.0.0.1:${filerPort}/buckets/${options.bucket}/`);
        return res.ok;
      },
      120,
      () => objectStoreExited,
    );
  } catch (error) {
    await stop();
    throw error;
  }

  return { created, stop };
}
