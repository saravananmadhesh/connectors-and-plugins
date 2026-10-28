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
} from '@boldcreate-integrations/credentials';
import { createDb } from '@boldcreate-integrations/db';
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
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { createSsrfGuard, createUpstreamFetch } from '@boldcreate-integrations/security';
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
    unsealer: createUnsealer({
      kms: createKmsFromConfig(config),
      orgKeyStore: createOrgKeyStore(db),
      keyCache: orgKeyCache,
    }),
    sealerFor: (executor) => createSealer({ orgKeys: createOrgKeyDirectory(executor) }),
    fetcher: createUpstreamFetch(
      createSsrfGuard({
        deployed: isDeployed(config.DEPLOY_ENV),
        allowedPorts: config.UPSTREAM_ALLOWED_PORTS,
        allowHttpHosts: config.UPSTREAM_ALLOW_HTTP_HOSTS,
      }),
    ),
  },
  logger,
  metrics: createMetrics({ service: 'gateway' }),
  workloadHeaders,
  limiter: redis?.limiter,
  pingDb: () => pool.query('SELECT 1'),
  onShutdown: [() => stopInvalidation(), () => pool.end(), async () => redis?.close()],
});

await server.listen({ port: config.PORT });
logger.info({ port: config.PORT }, 'Gateway listening');
