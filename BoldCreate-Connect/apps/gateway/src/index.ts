/**
 * Gateway entrypoint: public MCP endpoint for agents, plus sync and downloads forwarded to the api.
 */
import { createKmsFromConfig } from '@boldcreate-integrations/adapters/kms';
import { createRedisAdaptersFromConfig } from '@boldcreate-integrations/adapters/redis';
import { systemClock } from '@boldcreate-integrations/adapters/system';
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
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
} from '@boldcreate-integrations/db';
import {
  startLiveLimits,
  createRemoteLimitStore,
  createCatalogStores,
  createOrgKeyDirectory,
  createOrgKeyStore,
} from '@boldcreate-integrations/domain';
import {
  applyRuntimeEnv,
  createWorkloadHeaders,
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
import { buildApp, type GatewayRuntime } from './app.js';

import { createGatewayRemote } from './remote.js';
import { createApiKeyAuthenticator } from './key-auth.js';
import { loadGatewayConfig } from './config.js';
import { createApiPing, createReadiness } from './readiness.js';

assertDeployEnvSet();
const config = loadGatewayConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'gateway', level: config.LOG_LEVEL });
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
  connectionTimeoutMs: config.DB_POOL_WAIT_SECONDS * 1000,
});
const observability = createServiceObservability({
  service: 'gateway',
  environment: config.DEPLOY_ENV,
  config,
  log: logger,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'gateway' });
metrics.observeAdmission(() => admission.stats());
registerCaptureMetrics(metrics, errors);
const startup = createStartupChecks({
  service: 'gateway',
  errors,
  checks: {
    ...databaseStartupChecks(db, observability.store.db),
    redis: () => (redis ? redis.cache.ping() : Promise.resolve()),
  },
  // A down cache degrades the service but does not make it unready.
  advisory: [OBSERVABILITY_STORE_CHECK, 'redis'],
  onFailure: (failure) => logger.error(failure, 'Startup check failed'),
});

const orgKeyCache = createOrgKeyCache({
  max: config.ORG_KEY_CACHE_MAX,
  ttlSeconds: config.ORG_KEY_CACHE_TTL_SECONDS,
  clock: systemClock,
});

const redis = config.REDIS_URL
  ? createRedisAdaptersFromConfig({ ...config, REDIS_URL: config.REDIS_URL })
  : undefined;
const catalog = createCatalogStores({
  db,
  cache: redis?.cache,
  clock: systemClock,
  ttlSeconds: config.FLAG_CACHE_TTL_SECONDS,
});
const stopInvalidation = await catalog.startInvalidation().catch(() => {
  logger.warn('Invalidation channel unavailable; cached entries expire on their own');
  return async () => undefined;
});

const workloadHeaders = createWorkloadHeaders({
  callerId: 'gateway',
  audience: 'api',
  mode: config.WORKLOAD_AUTH_MODE,
  secret: config.WORKLOAD_SECRET,
  signingKey: config.WORKLOAD_SIGNING_KEY,
});

const runtime: GatewayRuntime = {
  keyRatePerMinute: config.KEY_RATE_LIMIT_PER_MINUTE,
  mcpMaxCalls: config.MCP_MAX_INFLIGHT_CALLS,
};

const server = buildApp(config, {
  db,
  runtime,
  ...(config.DATA_SOURCE === 'api'
    ? {
        authenticate: createApiKeyAuthenticator({
          apiBaseUrl: config.API_BASE_URL,
          workloadHeaders,
        }),
        remote: createGatewayRemote({ apiBaseUrl: config.API_BASE_URL, workloadHeaders }),
      }
    : {}),
  access: {
    unsealer: instrumentBoundary(
      createUnsealer({
        kms: instrumentBoundary(createKmsFromConfig(config), { area: 'kms', errors }),
        orgKeyStore: createOrgKeyStore(db),
        keyCache: orgKeyCache,
      }),
      { area: 'credentials', errors, shouldReport: isCredentialFault },
    ),
    sealerFor: (executor) =>
      instrumentBoundary(createSealer({ orgKeys: createOrgKeyDirectory(executor) }), {
        area: 'credentials',
        errors,
        shouldReport: isCredentialFault,
      }),
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
  logger,
  metrics,
  errors,
  workloadHeaders,
  limiter: redis ? instrumentBoundary(redis.limiter, { area: 'rate_limit', errors }) : undefined,
  pingDb: createReadiness({
    dataSource: config.DATA_SOURCE,
    pingApi: createApiPing(config.API_BASE_URL),
    pingDatabase: async () => {
      await pool.query('SELECT 1');
      await startup.readiness();
    },
  }),
  onShutdown: [
    () => stopInvalidation(),
    () => observability.close(),
    () => pool.end(),
    async () => redis?.close(),
  ],
});

// Hooks cannot be added once the server listens, so the stop is registered first.
let stopLiveLimits = (): void => undefined;
server.app.addHook('onClose', async () => stopLiveLimits());
await server.listen({ port: config.PORT });
// Values an administrator sets in the admin app, always read from the api: the gateway's database
// role has no access to the limit table (limits are reachable through the admin app and the api
// only), so reading it directly would be refused in every mode. A value nobody set leaves the
// configuration alone; 0 (off) stays off.
const limitStore = createRemoteLimitStore({ apiBaseUrl: config.API_BASE_URL, workloadHeaders });
stopLiveLimits = startLiveLimits({
  limits: limitStore,
  targets: [
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
    ...(config.MCP_MAX_INFLIGHT_CALLS > 0
      ? [
          {
            key: 'mcp_max_inflight_calls' as const,
            configured: config.MCP_MAX_INFLIGHT_CALLS,
            apply: (value: number) => {
              runtime.mcpMaxCalls = value;
            },
          },
        ]
      : []),
    ...(config.KEY_RATE_LIMIT_PER_MINUTE > 0
      ? [
          {
            key: 'key_requests_per_minute' as const,
            configured: config.KEY_RATE_LIMIT_PER_MINUTE,
            apply: (value: number) => {
              runtime.keyRatePerMinute = value;
            },
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
await startup.run();
logger.info({ port: config.PORT }, 'Gateway listening');
