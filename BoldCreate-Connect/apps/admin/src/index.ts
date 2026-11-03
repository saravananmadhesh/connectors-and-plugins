/**
 * Admin entrypoint: health, readiness, admin sign-in and the single-page app.
 */
import { assertDeployEnvSet, isDeployed } from '@boldcreate-integrations/config';
import {
  createDb,
  createServiceObservability,
  OBSERVABILITY_STORE_CHECK,
  databaseStartupChecks,
} from '@boldcreate-integrations/db';
import {
  createDefaultGithubFetcher,
  syncConfiguredAdminEmails,
} from '@boldcreate-integrations/domain';
import { applyRuntimeEnv, installProcessGuards } from '@boldcreate-integrations/http-server';
import {
  createLogger,
  createMetrics,
  registerCaptureMetrics,
  createStartupChecks,
} from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadAdminConfig } from './config.js';

assertDeployEnvSet();
const config = loadAdminConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'admin', level: config.LOG_LEVEL });
installProcessGuards(logger);

const { db, pool } = createDb({
  connectionString: config.DATABASE_URL,
  max: config.DB_POOL_MAX,
  onPoolError: (error) => logger.error({ err: error }, 'Database connection error'),
});
const observability = createServiceObservability({
  service: 'admin',
  environment: config.DEPLOY_ENV,
  config,
  log: logger,
});
const errors = observability.errors;
const metrics = createMetrics({ service: 'admin' });
registerCaptureMetrics(metrics, errors);
const startup = createStartupChecks({
  service: 'admin',
  errors,
  checks: databaseStartupChecks(db, observability.store.db),
  advisory: [OBSERVABILITY_STORE_CHECK],
  onFailure: (failure) => logger.error(failure, 'Startup check failed'),
});

// The addresses in the settings are kept on the allow-list table, next to those added in the app.
await syncConfiguredAdminEmails(db, config.ADMIN_ALLOWED_EMAILS);

const server = await buildApp(config, {
  logger,
  metrics,
  errors,
  db,
  observabilityDb: observability.store.db,
  pingDb: async () => {
    await pool.query('SELECT 1');
    await startup.readiness();
  },
  fetchArchive: createDefaultGithubFetcher({
    deployed: isDeployed(config.DEPLOY_ENV),
    token: config.GITHUB_TOKEN,
  }),
  onShutdown: [() => observability.close(), () => pool.end()],
});

await server.listen({ port: config.PORT });
await startup.run();
logger.info({ port: config.PORT }, 'Admin listening');
