/**
 * API entrypoint. Internal: reached by the web and admin backends, never by browsers.
 */
import { createKmsFromConfig } from '@boldcreate-integrations/adapters/kms';
import { createRedisAdaptersFromConfig } from '@boldcreate-integrations/adapters/redis';
import { createS3BlobFromConfig } from '@boldcreate-integrations/adapters/s3';
import { assertDeployEnvSet, isDeployed } from '@boldcreate-integrations/config';
import {
  createOrgKeyCache,
  createSealer,
  createUnsealer,
  isCredentialFault,
} from '@boldcreate-integrations/credentials';
import {
  createAdmissionGate,
  createDb,
  createIdempotencyStore,
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
} from '@boldcreate-integrations/db';
import { systemClock } from '@boldcreate-integrations/adapters/system';
import {
  createCatalogStores,
  createLimitStore,
  createOrgKeyDirectory,
  createOrgKeyStore,
} from '@boldcreate-integrations/domain';
import {
  applyRuntimeEnv,
  createWorkloadAuthenticator,
  installProcessGuards,
} from '@boldcreate-integrations/http-server';
import {
  createLogger,
  getContext,
  createMetrics,
  registerCaptureMetrics,
  createStartupChecks,
  instrumentBoundary,
  instrumentCall,
} from '@boldcreate-integrations/observability';
import {
  createSsrfGuard,
  createUpstreamFetch,
  isUpstreamFault,
} from '@boldcreate-integrations/security';
import { buildApp } from './app.js';
import { startLiveLimits } from '@boldcreate-integrations/domain';
import { loadApiConfig } from './config.js';

assertDeployEnvSet();
const config = loadApiConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'api', level: config.LOG_LEVEL });
installProcessGuards(logger);

const admission = createAdmissionGate({
  maxConcurrency: config.DB_MAX_CONCURRENCY || config.DB_POOL_MAX,
  maxDepth: config.DB_QUEUE_MAX_DEPTH,
  maxWaitMs: config.DB_QUEUE_MAX_WAIT_SECONDS * 1000,
  ownerSharePct: config.DB_QUEUE_PROJECT_SHARE_PCT,
  onReject: (reason) => metrics.recordShed(`db_queue_${reason}`),
});
const { db, pool } = createDb({
  admission,
  admissionOwner: () => getContext()?.tenantId,
  onPoolError: (error) => logger.error({ err: error }, 'Database connection error'),
  connectionString: config.DATABASE_URL,
  max: config.DB_POOL_MAX,
  idleTimeoutMs: config.DB_POOL_IDLE_SECONDS * 1000,
  connectionTimeoutMs: config.DB_POOL_WAIT_SECONDS * 1000,
  statementTimeoutMs: config.DB_STATEMENT_TIMEOUT_MS,
  applicationName: 'api',
});

const observability = createServiceObservability({
  service: 'api',
  environment: config.DEPLOY_ENV,
  config,
  log: logger,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'api' });
metrics.observeAdmission(() => admission.stats());
registerCaptureMetrics(metrics, errors);

const PROBE_SHA256 = '0'.repeat(64);
const startup = createStartupChecks({
  service: 'api',
  errors,
  checks: {
    ...databaseStartupChecks(db, observability.store.db),
    redis: () => redis.cache.ping(),
    kms: () => kms.activeKey(),
    blob: () => blob.exists(PROBE_SHA256),
  },
  // A down cache degrades the service but does not make it unready.
  advisory: [OBSERVABILITY_STORE_CHECK, 'redis'],
  onFailure: (failure) => logger.error(failure, 'Startup check failed'),
});
const redis = createRedisAdaptersFromConfig(config);

const sealerFor = (executor: Parameters<typeof createOrgKeyDirectory>[0]) =>
  instrumentBoundary(createSealer({ orgKeys: createOrgKeyDirectory(executor) }), {
    area: 'credentials',
    errors,
    shouldReport: isCredentialFault,
  });

const catalog = createCatalogStores({
  db,
  cache: redis.cache,
  clock: systemClock,
  ttlSeconds: config.FLAG_CACHE_TTL_SECONDS,
});
const limits = createLimitStore({
  db,
  clock: systemClock,
  ttlSeconds: config.LIMIT_CACHE_TTL_SECONDS,
  onRefreshError: (error) => errors.reportError(error, { area: 'limits', operation: 'refresh' }),
});
const stopInvalidation = await catalog.startInvalidation().catch(() => {
  logger.warn('Invalidation channel unavailable; cached entries expire on their own');
  return async () => undefined;
});

const blob = instrumentBoundary(createS3BlobFromConfig(config), { area: 'blob', errors });
const kms = instrumentBoundary(createKmsFromConfig(config), { area: 'kms', errors });

const server = await buildApp(config, {
  db,
  limiter: instrumentBoundary(redis.limiter, { area: 'rate_limit', errors }),
  flags: catalog.flags,
  limits,
  idempotencyStore: createIdempotencyStore(db),
  blob,
  sealerFor,
  mcp: {
    deps: {
      sealerFor,
      unsealer: instrumentBoundary(
        createUnsealer({
          kms,
          orgKeyStore: createOrgKeyStore(db),
          keyCache: createOrgKeyCache({
            max: config.ORG_KEY_CACHE_MAX,
            ttlSeconds: config.ORG_KEY_CACHE_TTL_SECONDS,
            clock: systemClock,
          }),
        }),
        { area: 'credentials', errors, shouldReport: isCredentialFault },
      ),
      fetcher: instrumentCall(
        createUpstreamFetch(
          createSsrfGuard({
            deployed: isDeployed(config.DEPLOY_ENV),
            allowedPorts: config.UPSTREAM_ALLOWED_PORTS,
            allowHttpHosts: config.UPSTREAM_ALLOW_HTTP_HOSTS,
          }),
        ),
        'fetch',
        { area: 'upstream', errors, shouldReport: isUpstreamFault },
      ),
    },
    redirectUri: config.OAUTH_REDIRECT_URI,
    appBaseUrl: config.APP_BASE_URL,
  },
  webhookGuard: createSsrfGuard({
    deployed: isDeployed(config.DEPLOY_ENV),
    allowedPorts: config.UPSTREAM_ALLOWED_PORTS,
    allowHttpHosts: config.UPSTREAM_ALLOW_HTTP_HOSTS,
  }),
  logger,
  metrics,
  errors,
  workload: createWorkloadAuthenticator({
    service: 'api',
    mode: config.WORKLOAD_AUTH_MODE,
    secret: config.WORKLOAD_SECRET,
    trustedKeys: config.WORKLOAD_TRUSTED_KEYS,
  }),
  pingDb: async () => {
    await pool.query('SELECT 1');
    await startup.readiness();
  },
  onShutdown: [
    () => stopInvalidation(),
    () => observability.close(),
    () => pool.end(),
    () => redis.close(),
  ],
});

// Hooks cannot be added once the server listens, so the stop is registered first.
let stopLiveLimits = (): void => undefined;
server.app.addHook('onClose', async () => stopLiveLimits());
await server.listen({ port: config.PORT });
stopLiveLimits = startLiveLimits({
  limits,
  targets: [
    // 0 is the operator's break-glass: the cap stays off whatever an administrator sets.
    ...(config.HTTP_MAX_INFLIGHT > 0
      ? [
          {
            key: 'pod_max_inflight' as const,
            configured: config.HTTP_MAX_INFLIGHT,
            apply: (value: number) => server.setMaxInflight(value),
          },
        ]
      : []),
    ...(config.EVENT_LOOP_LAG_SHED_MS > 0
      ? [
          {
            key: 'event_loop_lag_shed_ms' as const,
            configured: config.EVENT_LOOP_LAG_SHED_MS,
            apply: (value: number) => server.setEventLoopLagMs(value),
          },
        ]
      : []),
    ...(config.HEAP_SHED_PERCENT > 0
      ? [
          {
            key: 'heap_shed_percent' as const,
            configured: config.HEAP_SHED_PERCENT,
            apply: (value: number) => server.setHeapPercent(value),
          },
        ]
      : []),
    {
      key: 'db_queue_max_depth',
      configured: config.DB_QUEUE_MAX_DEPTH,
      apply: (value) => admission.update({ maxDepth: value }),
    },
    {
      key: 'db_queue_max_wait_seconds',
      configured: config.DB_QUEUE_MAX_WAIT_SECONDS,
      apply: (value) => admission.update({ maxWaitMs: value * 1000 }),
    },
    {
      key: 'db_queue_project_share_pct',
      configured: config.DB_QUEUE_PROJECT_SHARE_PCT,
      apply: (value) => admission.update({ ownerSharePct: value }),
    },
  ],
});
logger.info({ port: config.PORT }, 'API listening');
await startup.run();
