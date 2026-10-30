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
  createDb,
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
} from '@boldcreate-integrations/db';
import {
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
import { createGatewayRemote } from './remote.js';
import { createApiKeyAuthenticator } from './key-auth.js';
import { loadGatewayConfig } from './config.js';

assertDeployEnvSet();
const config = loadGatewayConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'gateway', level: config.LOG_LEVEL });
installProcessGuards(logger);

const { db, pool } = createDb({ connectionString: config.DATABASE_URL, max: config.DB_POOL_MAX });
const observability = createServiceObservability({
  service: 'gateway',
  environment: config.DEPLOY_ENV,
  config,
  log: logger,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'gateway' });
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

const server = buildApp(config, {
  db,
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
  pingDb: async () => {
    await pool.query('SELECT 1');
    await startup.readiness();
  },
  onShutdown: [
    () => stopInvalidation(),
    () => observability.close(),
    () => pool.end(),
    async () => redis?.close(),
  ],
});

await server.listen({ port: config.PORT });
await startup.run();
logger.info({ port: config.PORT }, 'Gateway listening');
