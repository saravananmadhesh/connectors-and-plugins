/**
 * Run Drizzle migrations against the target DATABASE_URL, then apply the role grants.
 *
 * The login roles are created before the migrations because some policies name them; the
 * grants are applied after, so every table that exists gets exactly the privileges listed for it.
 * Usage: tsx scripts/migrate.ts
 */
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import path, { join } from 'node:path';
import { connect } from 'node:net';
import { fileURLToPath } from 'node:url';
import {
  applyRoleGrants,
  createRoles,
  DEFAULT_CONNECTION_LIMITS,
  type LoginRole,
  POOLED_SESSION_DEFAULTS,
  type RoleSetupOptions,
} from '../packages/db/src/role-setup.js';
import { resolveConnectionLimits } from '../packages/db/src/connection-budget.js';
import { ROLE_NAMES } from '../packages/db/src/role-grants.js';
import { loadDevEnv } from '../packages/config/src/env.js';
import { ensureDevSecrets, withSuperuserLogin } from './dev-secrets.js';
import { devPorts } from './dev-ports.js';
import { repoRoot, startInfra } from './local-infra.js';
import { resolvePostgresSettings } from './postgres-docker.js';

loadDevEnv();

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is required');
  process.exit(1);
}
if (await migrateStartingLocalDatabase(databaseUrl)) process.exit(0);
// A URL without a password is the local development database: use its generated login.
let connectionString = databaseUrl;
if (!new URL(databaseUrl).password) {
  const devSecrets = ensureDevSecrets(join(repoRoot, '.cache', 'dev'));
  connectionString = withSuperuserLogin(databaseUrl, devSecrets);
  for (const [name, value] of Object.entries(devSecrets)) process.env[name] ??= value;
}

/** True when something accepts connections on the loopback port. */
function isPortOpen(port: number): Promise<boolean> {
  return new Promise((done) => {
    const socket = connect({ host: '127.0.0.1', port });
    socket.setTimeout(1000, () => {
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

/**
 * Stops with a clear message when something holds the port but does not answer a query, such as a
 * database left hung by a crashed run. A refused login still counts as an answer.
 */
async function assertAnswers(connectionString: string, port: number): Promise<void> {
  const client = new pg.Client({ connectionString, connectionTimeoutMillis: 5_000 });
  try {
    await client.connect();
    await client.query('select 1');
  } catch (error) {
    const code = (error as { code?: string }).code;
    // 28P01 wrong password, 28000 invalid authorization, 3D000 missing database: the server answered.
    if (code === '28P01' || code === '28000' || code === '3D000') return;
    console.error(
      `ERROR: something listens on port ${port} but does not answer (${(error as Error).message}). ` +
        'A database left hung by an earlier run may hold the port: find it with `netstat -ano | findstr :' +
        port +
        '` and stop that process, then run again.',
    );
    process.exit(1);
  } finally {
    await client.end().catch(() => undefined);
  }
}

/**
 * The local development database is started for the migration when it is not running, then stopped
 * again; its data stays in .cache/dev. A database that is already up, or any other server, is used
 * as it is.
 */
async function migrateStartingLocalDatabase(url: string): Promise<boolean> {
  const target = new URL(url);
  const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(target.hostname);
  const postgres = resolvePostgresSettings(process.env, process.argv, { reset: false });
  const port = Number(target.port || 5432);
  if (!isLocal || target.password || postgres.mode !== 'embedded') return false;
  if (await isPortOpen(port)) {
    await assertAnswers(
      withSuperuserLogin(url, ensureDevSecrets(join(repoRoot, '.cache', 'dev'))),
      port,
    );
    return false;
  }
  console.log(`Local database is not running on port ${port}; starting it for the migration.`);
  const dataDir = join(repoRoot, '.cache', 'dev');
  const secrets = ensureDevSecrets(dataDir);
  const ports = devPorts();
  const infra = await startInfra({
    databaseUrl: withSuperuserLogin(url, secrets),
    postgres,
    postgresOnly: true,
    secrets,
    mailpitSmtpPort: ports.mailpitSmtp,
    mailpitHttpPort: ports.mailpitHttp,
    redisPort: ports.redis,
    redisPassword: secrets['REDIS_PASSWORD']!,
    objectStorePort: ports.objectStore,
    objectStoreUser: secrets['OBJECT_STORE_ROOT_USER']!,
    objectStorePassword: secrets['OBJECT_STORE_ROOT_PASSWORD']!,
    bucket: 'boldcreate-dev',
    dataDir,
    logDir: join(dataDir, 'logs'),
    persistent: true,
  });
  await infra.stop();
  console.log('Local database stopped again; its data is kept in .cache/dev.');
  return true;
}

/** Passwords and connection limits come from the environment only; a missing password is an error. */
function roleSetupOptions(): RoleSetupOptions {
  const passwords: Partial<Record<LoginRole, string>> = {};
  const connectionLimits = resolveConnectionLimits(process.env, DEFAULT_CONNECTION_LIMITS);
  for (const role of [...ROLE_NAMES, 'migrator'] as const) {
    const variable = `DB_ROLE_PASSWORD_${role.toUpperCase()}`;
    const password = process.env[variable];
    if (!password) {
      console.error(`ERROR: ${variable} environment variable is required`);
      process.exit(1);
    }
    passwords[role] = password;
  }
  // DB_POOLED=1 once the services connect through the pooler: it ignores the startup
  // parameters they send, so the timeouts are stored on the roles instead.
  const sessionDefaults = process.env['DB_POOLED'] === '1' ? POOLED_SESSION_DEFAULTS : undefined;
  return {
    passwords: passwords as Record<LoginRole, string>,
    connectionLimits,
    ...(sessionDefaults ? { sessionDefaults } : {}),
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.resolve(__dirname, '../packages/db/migrations');
const options = roleSetupOptions();

const pool = new pg.Pool({ connectionString, max: 1 });
const db = drizzle(pool);

console.log('Running migrations from:', migrationsFolder);
await createRoles(pool, options);
await migrate(db, { migrationsFolder });
await applyRoleGrants(pool, options);
console.log('Migrations and role grants complete.');

await pool.end();
