import type pg from 'pg';
import { createDb, type Db } from './client.js';

/** The settings that place and bound the observability store; they come from configuration. */
export interface ObservabilityStoreConfig {
  /** The service's own database, used when no separate one is configured. */
  databaseUrl: string;
  /** A separate database for errors and events. Unset keeps them in `databaseUrl`. */
  observabilityDatabaseUrl?: string | undefined;
  /** Connections the store may hold open, so observability can never starve request handling. */
  poolMax: number;
  statementTimeoutMs: number;
  lockTimeoutMs: number;
  connectionTimeoutMs: number;
  /** Names the connections, for example `api-observability`. */
  applicationName: string;
}

export interface ObservabilityStore {
  /** Where `error_group`, `error_event` and `ops_event` are read and written. */
  db: Db;
  pool: pg.Pool;
  /** True when errors and events live in a database of their own. */
  external: boolean;
}

/**
 * The one place that decides where errors and events are stored. Everything that touches the
 * three tables takes this handle and never the service's main one, so moving them to a separate
 * database is a change of configuration and of the target of the migration script, not of code.
 *
 * The store always has a pool of its own, capped small and with short timeouts: a slow or
 * unreachable observability database delays only observability, never a request.
 */
export function createObservabilityStore(config: ObservabilityStoreConfig): ObservabilityStore {
  const external = Boolean(config.observabilityDatabaseUrl);
  const { db, pool } = createDb({
    connectionString: config.observabilityDatabaseUrl || config.databaseUrl,
    max: config.poolMax,
    statementTimeoutMs: config.statementTimeoutMs,
    lockTimeoutMs: config.lockTimeoutMs,
    connectionTimeoutMs: config.connectionTimeoutMs,
    applicationName: config.applicationName,
  });
  return { db, pool, external };
}
