/**
 * Admin entrypoint: health, readiness, admin sign-in and the single-page app.
 */
import { assertDeployEnvSet, isDeployed } from '@boldcreate-integrations/config';
import { createDb } from '@boldcreate-integrations/db';
import {
  createDefaultGithubFetcher,
  syncConfiguredAdminEmails,
} from '@boldcreate-integrations/domain';
import { applyRuntimeEnv, installProcessGuards } from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadAdminConfig } from './config.js';

assertDeployEnvSet();
const config = loadAdminConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'admin', level: config.LOG_LEVEL });
installProcessGuards(logger);

const { db, pool } = createDb({ connectionString: config.DATABASE_URL, max: config.DB_POOL_MAX });

// The addresses in the settings are kept on the allow-list table, next to those added in the app.
await syncConfiguredAdminEmails(db, config.ADMIN_ALLOWED_EMAILS);

const server = await buildApp(config, {
  logger,
  metrics: createMetrics({ service: 'admin' }),
  db,
  pingDb: () => pool.query('SELECT 1'),
  fetchArchive: createDefaultGithubFetcher({
    deployed: isDeployed(config.DEPLOY_ENV),
    token: config.GITHUB_TOKEN,
  }),
  onShutdown: [() => pool.end()],
});

await server.listen({ port: config.PORT });
logger.info({ port: config.PORT }, 'Admin listening');
