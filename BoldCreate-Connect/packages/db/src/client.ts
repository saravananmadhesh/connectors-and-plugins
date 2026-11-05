import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import type { AdmissionGate } from './admission-gate.js';
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
  /** Server-side limit for one statement; Postgres cancels what runs longer. 0 or unset: none. */
  statementTimeoutMs?: number;
  /** How long a statement waits for a row or table lock before it fails. 0 or unset: no limit. */
  lockTimeoutMs?: number;
  /** How long a caller waits for a free connection before it fails. 0 or unset: wait forever. */
  connectionTimeoutMs?: number;
  /** Shown in `pg_stat_activity`, so a connection can be traced to the service that owns it. */
  applicationName?: string;
  /** How long a spare connection is kept before it is closed. Unset: the driver default (10 s). */
  idleTimeoutMs?: number;
  /** Called when a spare connection fails (a database restart or failover); never throws. */
  onPoolError?: (error: Error) => void;
  /** Queue in front of the pool: callers beyond its limits wait, then are refused. Unset: none. */
  admission?: AdmissionGate;
  /** Who a call counts for in the admission queue (for example the organization); unset: nobody. */
  admissionOwner?: () => string | undefined;
}

/** Pool settings that are not about where the database is. */
function poolLimits(config: DbConfig): pg.PoolConfig {
  return {
    ...(config.statementTimeoutMs
      ? {
          statement_timeout: config.statementTimeoutMs,
          query_timeout: config.statementTimeoutMs + 1000,
        }
      : {}),
    ...(config.connectionTimeoutMs ? { connectionTimeoutMillis: config.connectionTimeoutMs } : {}),
    ...(config.idleTimeoutMs ? { idleTimeoutMillis: config.idleTimeoutMs } : {}),
    ...(config.applicationName ? { application_name: config.applicationName } : {}),
    // A startup parameter, not `options`, so PgBouncer can carry it to the server connection.
    ...(config.lockTimeoutMs ? { lock_timeout: config.lockTimeoutMs } : {}),
  };
}

/** True when Postgres refused a login because the role is at its connection limit. */
export function isRoleSaturated(err: unknown): boolean {
  const e = err as { code?: unknown; message?: unknown } | null;
  return (
    e?.code === '53300' ||
    (typeof e?.message === 'string' && e.message.startsWith('too many connections'))
  );
}

const RETRY_MIN_MS = 25;
const RETRY_MAX_MS = 250;

/**
 * A pool that queues instead of failing when the role's connection limit is reached. The driver
 * already queues callers while its own pool is full, but a server-side refusal (`53300`) comes
 * back at once, so the caller never waited. Here the refusal is retried with jittered backoff
 * until `waitMs` has passed, then the original error is raised (and mapped to a 503).
 */
class QueueingPool extends pg.Pool {
  constructor(
    config: pg.PoolConfig,
    private readonly waitMs: number,
    private readonly admission?: AdmissionGate,
    private readonly ownerOf?: () => string | undefined,
  ) {
    super(config);
  }

  private async connectWithRetry(): Promise<pg.PoolClient> {
    const deadline = Date.now() + this.waitMs;
    for (;;) {
      try {
        return await super.connect();
      } catch (err) {
        if (!isRoleSaturated(err) || Date.now() >= deadline) throw err;
        const delay = RETRY_MIN_MS + Math.random() * (RETRY_MAX_MS - RETRY_MIN_MS);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Takes a slot from the admission queue, then a connection; the slot returns with the connection.
   * A connection that drops while held is handed back at once: a caller does not always release a
   * connection whose query failed (drizzle's `transaction` skips the release when `BEGIN` fails),
   * and every such connection would keep its pool place and its slot for good.
   */
  private async admitted(): Promise<pg.PoolClient> {
    const give = (await this.admission?.acquire(this.ownerOf?.())) ?? (() => undefined);
    try {
      const client = await this.connectWithRetry();
      const release = client.release.bind(client);
      let released = false;
      const releaseOnce = (error?: Error | boolean) => {
        if (released) return;
        released = true;
        client.off('error', onDrop);
        give();
        release(error);
      };
      const onDrop = (error: Error) => releaseOnce(error);
      client.once('error', onDrop);
      client.release = releaseOnce;
      return client;
    } catch (err) {
      give();
      throw err;
    }
  }

  override connect(): Promise<pg.PoolClient>;
  override connect(
    callback: (
      err: Error | undefined,
      client: pg.PoolClient | undefined,
      done: (release?: unknown) => void,
    ) => void,
  ): void;
  override connect(callback?: Parameters<pg.Pool['connect']>[0]): Promise<pg.PoolClient> | void {
    const attempt = this.admitted();
    if (!callback) return attempt;
    attempt.then(
      (client) => callback(undefined, client, (release) => client.release(release as boolean)),
      (err: Error) => callback(err, undefined, () => undefined),
    );
  }
}

/** See the `connect` listener in `createDb`: the error reaches the caller through its query. */
function ignoreHeldConnectionError(): void {}

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
      ...poolLimits(config),
    };
  } catch {
    poolConfig = { connectionString: rawUrl, max, ...poolLimits(config) };
  }

  const pool = new QueueingPool(
    poolConfig,
    config.connectionTimeoutMs ?? 0,
    config.admission,
    config.admissionOwner,
  );

  // Without a listener, an error on a spare connection is an unhandled event and ends the process.
  // The pool discards the failed connection and opens a new one on the next query.
  pool.on('error', (error) => config.onPoolError?.(error));
  // The pool listens only while a connection is spare. A connection that drops while a caller
  // holds it (PgBouncer or Postgres restarting mid-transaction) would end the process as well.
  // The caller still sees the failure on its query, and the pool discards the connection when it
  // comes back, so this listener only has to keep the process alive.
  pool.on('connect', (client) => client.on('error', ignoreHeldConnectionError));

  const db = drizzle(pool, { schema });
  return { db, pool };
}
