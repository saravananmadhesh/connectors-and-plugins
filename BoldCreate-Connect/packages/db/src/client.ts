import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema/index.js';

export type Db = NodePgDatabase<typeof schema>;

/** What domain functions run against: the database handle or an open transaction. */
export type Executor = PgDatabase<NodePgQueryResultHKT, typeof schema>;

/** An open transaction. */
export type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];

export interface DbConfig {
  connectionString?: string;
  databaseUrl?: string;
  max?: number;
  poolMax?: number;
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

/**
 * TLS is on for every remote host (managed databases need it) and off for a local one, which the
 * embedded development database is. `sslmode=disable` or `DB_SSL=false` turns it off anywhere;
 * `sslmode=require` or `DB_SSL=true` turns it on for a local host too.
 */
export function resolveSsl(
  hostname: string,
  sslmode: string | null,
  override: string | undefined = process.env.DB_SSL,
): pg.PoolConfig['ssl'] {
  const flag = override?.trim().toLowerCase();
  if (flag === 'false' || flag === '0') return false;
  if (flag === 'true' || flag === '1') return { rejectUnauthorized: false };
  if (sslmode === 'disable') return false;
  if (sslmode && sslmode !== 'allow' && sslmode !== 'prefer') return { rejectUnauthorized: false };
  return LOCAL_HOSTS.has(hostname) ? false : { rejectUnauthorized: false };
}

/**
 * Create a Drizzle database client bound to the given connection string.
 * The pool is not started until the first query.
 */
export function createDb(config: DbConfig): { db: Db; pool: pg.Pool } {
  let poolConfig: pg.PoolConfig;
  const rawUrl = config.databaseUrl ?? config.connectionString ?? process.env.DATABASE_URL ?? '';
  const max = config.poolMax ?? config.max ?? 10;
  try {
    const parsed = new URL(rawUrl);
    poolConfig = {
      host: parsed.hostname,
      port: parsed.port ? Number.parseInt(parsed.port, 10) : 5432,
      user: parsed.username ? decodeURIComponent(parsed.username) : undefined,
      password: parsed.password ? decodeURIComponent(parsed.password) : undefined,
      database: parsed.pathname ? parsed.pathname.replace(/^\//, '') : 'postgres',
      ssl: resolveSsl(parsed.hostname, parsed.searchParams.get('sslmode')),
      max,
    };
  } catch {
    poolConfig = { connectionString: rawUrl, max };
  }

  const pool = new pg.Pool(poolConfig);

  const db = drizzle(pool, { schema });
  return { db, pool };
}
