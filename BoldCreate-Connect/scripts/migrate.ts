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
import { fileURLToPath } from 'node:url';
import {
  applyRoleGrants,
  createRoles,
  DEFAULT_CONNECTION_LIMITS,
  type LoginRole,
  type RoleSetupOptions,
} from '../packages/db/src/role-setup.js';
import { ROLE_NAMES } from '../packages/db/src/role-grants.js';
import { loadDevEnv } from '../packages/config/src/env.js';
import { ensureDevSecrets, withSuperuserLogin } from './dev-secrets.js';
import { repoRoot } from './local-infra.js';

loadDevEnv();

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) {
  console.error('ERROR: DATABASE_URL environment variable is required');
  process.exit(1);
}
// A URL without a password is the local development database: use its generated login.
let connectionString = databaseUrl;
if (!new URL(databaseUrl).password) {
  const devSecrets = ensureDevSecrets(join(repoRoot, '.cache', 'dev'));
  connectionString = withSuperuserLogin(databaseUrl, devSecrets);
  for (const [name, value] of Object.entries(devSecrets)) process.env[name] ??= value;
}

/** Passwords and connection limits come from the environment only; a missing password is an error. */
function roleSetupOptions(): RoleSetupOptions {
  const passwords: Partial<Record<LoginRole, string>> = {};
  const connectionLimits: Partial<Record<LoginRole, number>> = {};
  for (const role of [...ROLE_NAMES, 'migrator'] as const) {
    const variable = `DB_ROLE_PASSWORD_${role.toUpperCase()}`;
    const password = process.env[variable];
    if (!password) {
      console.error(`ERROR: ${variable} environment variable is required`);
      process.exit(1);
    }
    passwords[role] = password;
    const limit = Number(
      process.env[`DB_ROLE_CONNECTION_LIMIT_${role.toUpperCase()}`] ??
        DEFAULT_CONNECTION_LIMITS[role],
    );
    connectionLimits[role] = limit;
  }
  return { passwords: passwords as Record<LoginRole, string>, connectionLimits };
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
