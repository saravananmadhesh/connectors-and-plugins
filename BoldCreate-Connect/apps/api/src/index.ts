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
  createDb,
  createIdempotencyStore,
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
} from '@boldcreate-integrations/db';
import { systemClock } from '@boldcreate-integrations/adapters/system';
import {
  createCatalogStores,
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
import { loadApiConfig } from './config.js';

assertDeployEnvSet();
const config = loadApiConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'api', level: config.LOG_LEVEL });
installProcessGuards(logger);

const { db, pool } = createDb({ connectionString: config.DATABASE_URL, max: config.DB_POOL_MAX });

const observability = createServiceObservability({
  service: 'api',
  environment: config.DEPLOY_ENV,
  config,
  log: logger,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'api' });
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

await server.listen({ port: config.PORT });
logger.info({ port: config.PORT }, 'API listening');
await startup.run();
