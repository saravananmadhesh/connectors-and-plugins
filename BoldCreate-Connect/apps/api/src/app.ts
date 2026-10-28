import type { Logger } from 'pino';
import { AppError, ROUTES, type RouteDef } from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import type { Db, Executor } from '@boldcreate-integrations/db';
import {
  createIdempotency,
  createServer,
  toFastifyPath,
  type HttpServer,
  type IdempotencyStore,
  type WorkloadAuthenticator,
} from '@boldcreate-integrations/http-server';
import { isDeployed } from '@boldcreate-integrations/config';
import { type FlagStore } from '@boldcreate-integrations/domain';
import { API_KEY_LIMITS } from '@boldcreate-integrations/limits';
import type { Metrics } from '@boldcreate-integrations/observability';
import type { BlobPort, LimiterPort } from '@boldcreate-integrations/ports';
import type { ApiConfig } from './config.js';
import { createDenialAudit } from './denial-audit.js';
import { registerIdParamDecoding } from './id-params.js';
import { withSession } from './session-guard.js';
import { createLoginThrottle } from './auth/login-throttle.js';
import { authPolicyFromConfig } from './auth/policy.js';
import { authRoutes } from './routes/auth.js';
import { deliveryRoutes } from './routes/delivery.js';
import { gatewayRoutes } from './routes/gateway.js';
import { marketplaceRoutes } from './routes/marketplace.js';
import { orgRoutes } from './routes/orgs.js';
import { mcpRoutes, type McpRuntime } from './routes/mcp.js';
import { scopedRoutes } from './routes/scoped.js';
import { projectRoutes } from './routes/projects.js';
import { projectSelfRoutes } from './routes/project.js';
import { projectCatalogRoutes } from './routes/project-catalog.js';
import { projectSessionRoutes } from './routes/project-sessions.js';
import { createSsrfGuard, type SsrfGuard } from '@boldcreate-integrations/security';
import { projectConnectionRoutes } from './routes/project-connections.js';

export interface ApiDeps {
  db: Db;
  /** Seals secrets to organization public keys, reading them through the given transaction; the api never holds a private key. */
  sealerFor: (db: Executor) => Sealer;
  /** Called after an organization is deleted, for example to drop cached keys. */
  onOrgDeleted?: (orgId: string) => void;
  /** Outbound MCP traffic and OAuth sign-ins; the only place the api reaches an upstream server. */
  mcp: McpRuntime;
  /** Private archive storage, read only; downloads stream from it after the key is authorized. */
  blob: BlobPort;
  /** Claims and replays `Idempotency-Key` requests; `createIdempotencyStore(db)` in the real wiring. */
  idempotencyStore: IdempotencyStore;
  /** Counts sign-in attempts; when it fails, sign-in answers `service_unavailable`. */
  limiter: LimiterPort;
  /** Feature flags; without one every flag keeps its built-in value, so a flagged feature stays off. */
  flags?: FlagStore;
  /** Checks the address of a project webhook; defaults to the strict guard of a deployed system. */
  webhookGuard?: SsrfGuard;
  logger: Logger;
  metrics: Metrics;
  workload: WorkloadAuthenticator;
  /** Readiness probe of the database; `SELECT 1` in the real wiring. */
  pingDb: () => Promise<unknown>;
  onShutdown?: (() => Promise<void>)[];
}

/**
 * Builds the api's HTTP server with every route registered and no listener. The api is
 * internal: every request except the probes needs a verified workload identity whose caller id
 * is on the allow-list.
 */
export async function buildApp(config: ApiConfig, deps: ApiDeps): Promise<HttpServer> {
  const allowed = new Set(config.BFF_CALLER_ALLOWLIST);
  const server = createServer({
    service: 'api',
    config,
    logger: deps.logger,
    metrics: deps.metrics,
    workloadVerifier: deps.workload,
    readinessChecks: { db: deps.pingDb },
    hooks: { beforeError: createDenialAudit(deps.db) },
    retryAfterSeconds: { org_key_pending: config.ORG_KEY_PENDING_RETRY_AFTER_SECONDS },
    ...(deps.onShutdown ? { onShutdown: deps.onShutdown } : {}),
  });
  const { app } = server;

  // Routes that are not in the registry yet do not pass through the server's authenticate stage.
  app.addHook('preHandler', async (request) => {
    const { route, edgeExempt } = request.routeOptions.config;
    if (route || edgeExempt) return;
    try {
      request.callerId = (await deps.workload.authenticate(request.headers)).callerId;
    } catch {
      throw new AppError('unauthenticated');
    }
    if (!allowed.has(request.callerId)) throw new AppError('forbidden');
  });

  // Registry entries that take an idempotency key, found by method and URL pattern.
  const idempotentRoutes = new Map<string, RouteDef>(
    ROUTES.filter((r) => r.app === 'api' && r.idempotency !== 'none').map((r) => [
      `${r.method} ${toFastifyPath(r.pathTemplate)}`,
      r,
    ]),
  );
  const idempotency = createIdempotency({
    store: deps.idempotencyStore,
    ttlSeconds: config.IDEMPOTENCY_TTL_SECONDS,
    principalKey: async (request, route) => {
      if (!route.principals.includes('session')) return `anon:${request.clientIp}`;
      await withSession(deps.db, request);
      return `usr:${request.userId}`;
    },
  });
  app.addHook('onSend', async (request, reply, payload) => {
    if (request.retryAfter !== undefined && !reply.hasHeader('retry-after')) {
      void reply.header('retry-after', String(request.retryAfter));
    }
    if (request.projectRate) {
      void reply.header('x-ratelimit-limit', String(request.projectRate.limit));
      void reply.header('x-ratelimit-remaining', String(request.projectRate.remaining));
      void reply.header('x-ratelimit-window-size', String(request.projectRate.windowSeconds));
    }
    return payload;
  });
  app.addHook('preHandler', async (request, reply) => {
    const route = idempotentRoutes.get(`${request.method} ${request.routeOptions.url}`);
    if (!route) return;
    await idempotency.begin(request, reply, route, null);
    if (reply.sent) return reply;
  });
  app.addHook('onSend', async (request, reply, payload) => {
    await idempotency.finish(request, reply, payload);
    return payload;
  });

  registerIdParamDecoding(app);
  app.decorate('authPolicy', authPolicyFromConfig(config));
  app.decorate('apiGate', {
    limiter: deps.limiter,
    requestsPerMinute: API_KEY_LIMITS.requestsPerMinutePerKey,
  });
  await app.register(authRoutes, {
    prefix: '/v1/auth',
    db: deps.db,
    ...(deps.onOrgDeleted ? { onOrgDeleted: deps.onOrgDeleted } : {}),
    loginThrottle: createLoginThrottle(deps.limiter, {
      ipEmailLimit: config.LOGIN_THROTTLE_IP_EMAIL_LIMIT,
      ipLimit: config.LOGIN_THROTTLE_IP_LIMIT,
      windowSeconds: config.LOGIN_THROTTLE_WINDOW_SECONDS,
    }),
  });
  await app.register(orgRoutes, {
    prefix: '/v1',
    db: deps.db,
    ...(deps.onOrgDeleted ? { onOrgDeleted: deps.onOrgDeleted } : {}),
  });
  await app.register(marketplaceRoutes, { prefix: '/v1', db: deps.db });
  await app.register(scopedRoutes, {
    prefix: '/v1',
    db: deps.db,
    sealerFor: deps.sealerFor,
  });
  await app.register(projectRoutes, {
    prefix: '/v1',
    db: deps.db,
    allowLocalOrigins: !isDeployed(config.DEPLOY_ENV),
    sealerFor: deps.sealerFor,
    redirectUri: deps.mcp.redirectUri,
    webhookGuard: deps.webhookGuard ?? createSsrfGuard({ deployed: true }),
  });
  await app.register(projectSelfRoutes, {
    prefix: '/v1',
    db: deps.db,
    sealerFor: deps.sealerFor,
    redirectUri: deps.mcp.redirectUri,
  });
  await app.register(projectCatalogRoutes, {
    prefix: '/v1',
    db: deps.db,
    sealerFor: deps.sealerFor,
  });
  await app.register(projectSessionRoutes, {
    prefix: '/v1',
    db: deps.db,
    sealerFor: deps.sealerFor,
    unsealer: deps.mcp.deps.unsealer,
  });
  await app.register(projectConnectionRoutes, {
    prefix: '/v1',
    db: deps.db,
    runtime: deps.mcp,
    sealerFor: deps.sealerFor,
  });
  await app.register(mcpRoutes, { prefix: '/v1', db: deps.db, runtime: deps.mcp });
  await app.register(gatewayRoutes, { prefix: '/v1', db: deps.db, access: deps.mcp.deps });
  await app.register(deliveryRoutes, {
    prefix: '/v1',
    db: deps.db,
    blob: deps.blob,
    maxDownloadsPerKey: config.DOWNLOADS_PER_KEY,
    gatewayUrl: config.PUBLIC_GATEWAY_URL,
  });
  return server;
}
