/**
 * Web entrypoint: the browser-facing backend and the single-page app.
 */
import { assertDeployEnvSet } from '@boldcreate-integrations/config';
import {
  applyRuntimeEnv,
  createWorkloadHeaders,
  installProcessGuards,
} from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp } from './app.js';
import { loadWebConfig } from './config.js';

assertDeployEnvSet();
const config = loadWebConfig();
applyRuntimeEnv(config);
const logger = createLogger({ service: 'web', level: config.LOG_LEVEL });
installProcessGuards(logger);

const server = await buildApp(config, {
  logger,
  metrics: createMetrics({ service: 'web' }),
  workloadHeaders: createWorkloadHeaders({
    callerId: 'web',
    audience: 'api',
    mode: config.WORKLOAD_AUTH_MODE,
    secret: config.WORKLOAD_SECRET,
    signingKey: config.WORKLOAD_SIGNING_KEY,
  }),
});

await server.listen({ port: config.PORT });
logger.info({ port: config.PORT }, 'Web listening');
