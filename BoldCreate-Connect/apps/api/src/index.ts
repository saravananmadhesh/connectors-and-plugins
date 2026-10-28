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
} from '@boldcreate-integrations/credentials';
import { createDb, createIdempotencyStore } from '@boldcreate-integrations/db';
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
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { createSsrfGuard, createUpstreamFetch } from '@boldcreate-integrations/security';
import { buildApp } from './app.js';
import { loadApiConfig } from './config.js';

assertDeployEnvSet();
const config = loadApiConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'api', level: config.LOG_LEVEL });
installProcessGuards(logger);

const { db, pool } = createDb({ connectionString: config.DATABASE_URL, max: config.DB_POOL_MAX });

const redis = createRedisAdaptersFromConfig(config);

const sealerFor = (executor: Parameters<typeof createOrgKeyDirectory>[0]) =>
  createSealer({ orgKeys: createOrgKeyDirectory(executor) });

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

const server = await buildApp(config, {
  db,
  limiter: redis.limiter,
  flags: catalog.flags,
  idempotencyStore: createIdempotencyStore(db),
  blob: createS3BlobFromConfig(config),
  sealerFor,
  mcp: {
    deps: {
      sealerFor,
      unsealer: createUnsealer({
        kms: createKmsFromConfig(config),
        orgKeyStore: createOrgKeyStore(db),
        keyCache: createOrgKeyCache({
          max: config.ORG_KEY_CACHE_MAX,
          ttlSeconds: config.ORG_KEY_CACHE_TTL_SECONDS,
          clock: systemClock,
        }),
      }),
      fetcher: createUpstreamFetch(
        createSsrfGuard({
          deployed: isDeployed(config.DEPLOY_ENV),
          allowedPorts: config.UPSTREAM_ALLOWED_PORTS,
          allowHttpHosts: config.UPSTREAM_ALLOW_HTTP_HOSTS,
        }),
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
  metrics: createMetrics({ service: 'api' }),
  workload: createWorkloadAuthenticator({
    service: 'api',
    mode: config.WORKLOAD_AUTH_MODE,
    secret: config.WORKLOAD_SECRET,
    trustedKeys: config.WORKLOAD_TRUSTED_KEYS,
  }),
  pingDb: () => pool.query('SELECT 1'),
  onShutdown: [() => stopInvalidation(), () => pool.end(), () => redis.close()],
});

await server.listen({ port: config.PORT });
logger.info({ port: config.PORT }, 'API listening');
