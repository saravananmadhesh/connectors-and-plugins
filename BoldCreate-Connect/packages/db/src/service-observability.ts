import type { ErrorReporter } from '@boldcreate-integrations/observability';
import { createServiceErrorReporter } from './error-sink.js';
import { createObservabilityStore, type ObservabilityStore } from './observability-store.js';

/** The settings of `observabilityDbShape` plus the service's own database address. */
export interface ServiceObservabilityConfig {
  DATABASE_URL: string;
  OBSERVABILITY_DATABASE_URL?: string | undefined;
  OBSERVABILITY_DB_POOL_MAX: number;
  OBSERVABILITY_DB_STATEMENT_TIMEOUT_MS: number;
  OBSERVABILITY_DB_LOCK_TIMEOUT_MS: number;
  OBSERVABILITY_DB_CONNECT_TIMEOUT_MS: number;
  OBSERVABILITY_SINK_FAILURE_THRESHOLD: number;
  OBSERVABILITY_SINK_PAUSE_SECONDS: number;
}

export interface ServiceObservabilityOptions {
  service: string;
  environment: string;
  config: ServiceObservabilityConfig;
  log: {
    error(fields: object, message: string): void;
    warn(fields: object, message: string): void;
    info(fields: object, message: string): void;
  };
}

export interface ServiceObservability {
  store: ObservabilityStore;
  errors: ErrorReporter;
  /** Writes what is queued, then closes the store's connections; call on shutdown. */
  close(): Promise<void>;
}

/**
 * What every service creates at start: the store for errors and events, and the reporter that
 * writes to it. The reporter pauses after repeated write failures, so a store that is down or
 * slow costs a service one skipped write every few seconds and nothing else.
 */
export function createServiceObservability(
  options: ServiceObservabilityOptions,
): ServiceObservability {
  const { config, log } = options;
  const store = createObservabilityStore({
    databaseUrl: config.DATABASE_URL,
    observabilityDatabaseUrl: config.OBSERVABILITY_DATABASE_URL,
    poolMax: config.OBSERVABILITY_DB_POOL_MAX,
    statementTimeoutMs: config.OBSERVABILITY_DB_STATEMENT_TIMEOUT_MS,
    lockTimeoutMs: config.OBSERVABILITY_DB_LOCK_TIMEOUT_MS,
    connectionTimeoutMs: config.OBSERVABILITY_DB_CONNECT_TIMEOUT_MS,
    applicationName: `${options.service}-observability`,
  });
  const errors = createServiceErrorReporter({
    service: options.service,
    environment: options.environment,
    db: store.db,
    onDrop: (reason, count) => {
      // A paused sink is already reported once when it pauses; its dropped batches stay quiet.
      if (reason !== 'sink_paused') log.error({ reason, count }, 'Error capture dropped reports');
    },
    guard: {
      failureThreshold: config.OBSERVABILITY_SINK_FAILURE_THRESHOLD,
      pauseMs: config.OBSERVABILITY_SINK_PAUSE_SECONDS * 1000,
      onStateChange: (state) =>
        state === 'paused'
          ? log.warn(
              { external: store.external },
              'Error capture paused: the observability store is not accepting writes',
            )
          : log.info({ external: store.external }, 'Error capture resumed'),
    },
  });
  return {
    store,
    errors,
    close: async () => {
      await errors.stop();
      await store.pool.end();
    },
  };
}
