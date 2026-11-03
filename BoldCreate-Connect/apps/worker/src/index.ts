/**
 * Worker entrypoint — outbox delivery and cleanup only.
 * No ingress. No connection credentials or admin grants.
 *
 * Delivery loop:
 * 1. Claim up to 10 pending rows whose nextAttemptAt <= now and lease is expired/null.
 * 2. For each row, parse the payload and dispatch to the correct email template.
 * 3. On success: mark delivered, erase payload.
 * 4. On failure: increment attempts, set exponential nextAttemptAt, release lease.
 *    After 6 attempts the DB check prevents further increments; mark failed.
 */
import {
  createDb,
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
  createIdempotencyStore,
  purgeExpiredProjectIdempotency,
} from '@boldcreate-integrations/db';
import { systemClock } from '@boldcreate-integrations/adapters/system';
import { createPostgresQueue } from '@boldcreate-integrations/adapters/postgres-queue';
import {
  applyRuntimeEnv,
  createServer,
  installProcessGuards,
} from '@boldcreate-integrations/http-server';
import {
  createCatalogStores,
  createGithubFetcher,
  createOrgKeyStore,
  WEBHOOK_TIMEOUT_MS,
} from '@boldcreate-integrations/domain';
import {
  createOrgKeyCache,
  createUnsealer,
  isCredentialFault,
} from '@boldcreate-integrations/credentials';
import {
  createLogger,
  createMetrics,
  registerCaptureMetrics,
  createStartupChecks,
  instrumentBoundary,
} from '@boldcreate-integrations/observability';
import { assertDeployEnvSet, isDeployed } from '@boldcreate-integrations/config';
import { createSsrfGuard, guardedFetch } from '@boldcreate-integrations/security';
import { createAdapters } from './adapters.js';
import { loadWorkerConfig } from './config.js';
import { ensureIdempotencyPurgeScheduled } from './handlers/idempotency-purge.js';
import { ensureObservabilityAlertScheduled } from './handlers/observability-alert.js';
import { ensureObservabilityRetentionScheduled } from './handlers/observability-retention.js';
import { ensureProjectWebhookScheduled } from './handlers/project-webhook.js';
import { pollJobs } from './jobs.js';

assertDeployEnvSet();
const config = loadWorkerConfig();
applyRuntimeEnv(config);
const log = createLogger({ service: 'worker', level: config.LOG_LEVEL });
installProcessGuards(log);

const { db, pool } = createDb({
  connectionString: config.DATABASE_URL,
  max: config.DB_POOL_MAX,
  onPoolError: (error) => log.error({ err: error }, 'Database connection error'),
});
const observability = createServiceObservability({
  service: 'worker',
  environment: config.DEPLOY_ENV,
  config,
  log: log,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'worker' });
registerCaptureMetrics(metrics, errors);
const PROBE_SHA256 = '0'.repeat(64);
const startup = createStartupChecks({
  service: 'worker',
  errors,
  checks: {
    ...databaseStartupChecks(db, observability.store.db),
    redis: () => (redis ? redis.cache.ping() : Promise.resolve()),
    kms: () => kms.activeKey(),
    blob: () => blob.exists(PROBE_SHA256),
  },
  // A down cache degrades the service but does not make it unready.
  advisory: [OBSERVABILITY_STORE_CHECK, 'redis'],
  onFailure: (failure) => log.error(failure, 'Startup check failed'),
});

// ── Adapters ──────────────────────────────────────────────────────────────────

const adapters = createAdapters(config);
const { email: emailAdapter, redis } = adapters;
const kms = instrumentBoundary(adapters.kms, { area: 'kms', errors });
const blob = instrumentBoundary(adapters.blob, { area: 'blob', errors });
const queue = createPostgresQueue(db);
const catalog = createCatalogStores({
  db,
  cache: redis?.cache,
  clock: systemClock,
  ttlSeconds: config.FLAG_CACHE_TTL_SECONDS,
});
const stopInvalidation = await catalog.startInvalidation().catch(() => {
  log.warn('Invalidation channel unavailable; cached entries expire on their own');
  return async () => undefined;
});
const idempotencyStore = createIdempotencyStore(db);
const unsealer = instrumentBoundary(
  createUnsealer({
    kms,
    orgKeyStore: createOrgKeyStore(db),
    keyCache: createOrgKeyCache({ max: 1000, ttlSeconds: 300, clock: systemClock }),
  }),
  { area: 'credentials', errors, shouldReport: isCredentialFault },
);
const webhookGuard = createSsrfGuard({
  deployed: isDeployed(config.DEPLOY_ENV),
  allowedPorts: config.WEBHOOK_ALLOWED_PORTS,
  allowHttpHosts: config.WEBHOOK_ALLOW_HTTP_HOSTS,
});

// ── Poll loop ─────────────────────────────────────────────────────────────────

let running = true;
let wake: (() => void) | undefined;

async function pollOnce(): Promise<void> {
  await pollJobs(queue, {
    emailAdapter,
    baseUrl: config.APP_BASE_URL,
    log,
    errors,
    orgKeys: { db, kms },
    revision: { cache: redis?.cache },
    ingestion: {
      db,
      blob,
      allowedOwners: config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      fetchArchive: createGithubFetcher({
        guard: createSsrfGuard({ deployed: isDeployed(config.DEPLOY_ENV) }),
        token: config.GITHUB_TOKEN,
      }),
    },
    webhooks: {
      db,
      unseal: ({ orgId, projectId, envelope }) =>
        unsealer.unseal({
          purpose: 'webhook_secret',
          orgId,
          subject: { kind: 'project', id: projectId },
          envelope,
        }),
      post: async (url, request) => {
        const response = await guardedFetch(
          webhookGuard,
          url,
          { method: 'POST', headers: request.headers, body: request.body },
          { purpose: 'webhook', timeoutMs: WEBHOOK_TIMEOUT_MS },
        );
        return response.status;
      },
      intervalSeconds: config.WEBHOOK_DISPATCH_INTERVAL_SECONDS,
      lagSeconds: config.WEBHOOK_EVENT_LAG_SECONDS,
      retryBaseSeconds: config.WEBHOOK_RETRY_BASE_SECONDS,
      onError: (step) => log.error({ step }, 'Webhook dispatch step failed'),
    },
    idempotency: {
      db,
      store: idempotencyStore,
      purgeProject: (limit) => purgeExpiredProjectIdempotency(db, limit),
      intervalSeconds: config.IDEMPOTENCY_PURGE_INTERVAL_SECONDS,
      batchSize: config.IDEMPOTENCY_PURGE_BATCH_SIZE,
    },
    alerts: {
      db,
      store: observability.store.db,
      email: emailAdapter,
      errors,
      recipients: config.OBSERVABILITY_ALERT_EMAILS,
      intervalSeconds: config.OBSERVABILITY_ALERT_INTERVAL_SECONDS,
      baseUrl: config.APP_BASE_URL,
      adminUrl: config.OBSERVABILITY_ADMIN_URL,
      policy: {
        // A new error stays "new" for two checks, so a check that failed is retried once.
        newGroupWindowSeconds: config.OBSERVABILITY_ALERT_INTERVAL_SECONDS * 2,
        spikeWindowSeconds: config.OBSERVABILITY_ALERT_SPIKE_WINDOW_SECONDS,
        spikeOccurrences: config.OBSERVABILITY_ALERT_SPIKE_OCCURRENCES,
        cooldownSeconds: config.OBSERVABILITY_ALERT_COOLDOWN_SECONDS,
        maxGroups: config.OBSERVABILITY_ALERT_MAX_GROUPS,
      },
    },
    retention: {
      db,
      store: observability.store.db,
      errors,
      intervalSeconds: config.OBSERVABILITY_RETENTION_INTERVAL_SECONDS,
      catchUpSeconds: config.OBSERVABILITY_RETENTION_CATCH_UP_SECONDS,
      policy: {
        errorEventDays: config.OBSERVABILITY_ERROR_EVENT_DAYS,
        errorGroupDays: config.OBSERVABILITY_ERROR_GROUP_DAYS,
        opsEventDays: config.OBSERVABILITY_OPS_EVENT_DAYS,
        longLivedOpsKinds: config.OBSERVABILITY_LONG_LIVED_EVENT_KINDS,
        longLivedOpsEventDays: config.OBSERVABILITY_LONG_LIVED_EVENT_DAYS,
        batchSize: config.OBSERVABILITY_RETENTION_BATCH_SIZE,
        maxTotalBytes: config.OBSERVABILITY_MAX_TOTAL_BYTES,
        batchPauseMs: config.OBSERVABILITY_RETENTION_BATCH_PAUSE_MS,
        maxRunMs: config.OBSERVABILITY_RETENTION_MAX_RUN_SECONDS * 1000,
      },
    },
  });
}

async function loop(): Promise<void> {
  log.info({ emailAdapter: config.EMAIL_ADAPTER }, 'Worker started');
  try {
    await ensureIdempotencyPurgeScheduled(db);
  } catch {
    log.error('Could not schedule the idempotency purge');
  }
  try {
    await ensureObservabilityRetentionScheduled(db);
  } catch {
    log.error('Could not schedule the observability retention');
  }
  if (config.OBSERVABILITY_ALERT_EMAILS.length > 0) {
    try {
      await ensureObservabilityAlertScheduled(db);
    } catch {
      log.error('Could not schedule the observability alert');
    }
  }
  try {
    await ensureProjectWebhookScheduled(db);
  } catch {
    log.error('Could not schedule the webhook dispatcher');
  }
  while (running) {
    try {
      await pollOnce();
    } catch {
      log.error('Poll error');
    }
    if (!running) break;
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, config.OUTBOX_POLL_INTERVAL_MS);
      wake = () => {
        clearTimeout(timer);
        resolve();
      };
    });
  }
  log.info('Worker stopped');
}

// ── Health server and graceful shutdown ───────────────────────────────────────

const polling = loop();

const health = createServer({
  service: 'worker',
  config,
  logger: log,
  metrics,
  errors,
  readinessChecks: { db: () => pool.query('SELECT 1'), startup: () => startup.readiness() },
  onShutdown: [
    async () => {
      log.info('Shutdown requested, stopping after the current batch');
      running = false;
      wake?.();
      await polling;
      await stopInvalidation();
      await redis?.close();
      await observability.close();
      await pool.end();
    },
  ],
});
await health.listen({ port: config.HEALTH_PORT });
await startup.run();
await polling;
