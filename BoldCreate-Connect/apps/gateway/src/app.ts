/**
 * Gateway HTTP server, the public data plane.
 *   POST /mcp and /{server}/mcp  stateless MCP over HTTP, Bearer key.
 *   GET /v1/sync, GET /v1/sync/components/{sha256}, POST /v1/sync/reports, GET /v1/plugin-versions/{id}/archive  forwarded to the api.
 *   The routes the registry opens to project keys: forwarded to the api for `prk_` bearers only.
 *   The `/v1/session/...` routes a session's user calls: forwarded to the api for `stk_` bearers only.
 */
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Logger } from 'pino';
import { tenantKey, type LimiterPort } from '@boldcreate-integrations/ports';
import { ROUTES, type ApiKeyPrincipal, type RouteDef } from '@boldcreate-integrations/contracts';
import type { Db } from '@boldcreate-integrations/db';
import {
  authenticateKey,
  bearerKey,
  offersProjectKey,
  keyResource,
  authorize,
  type AccessDeps,
  type KeyIdentity,
} from '@boldcreate-integrations/domain';
import {
  createServer,
  toFastifyPath,
  type HttpServer,
  type WorkloadHeaders,
} from '@boldcreate-integrations/http-server';
import type { ErrorReporter, Metrics } from '@boldcreate-integrations/observability';
import { KEY_PREFIX } from '@boldcreate-integrations/security';
import { createArtifactProxy } from './artifacts.js';
import type { GatewayConfig } from './config.js';
import type { GatewayRemote } from './remote.js';
import { auditToolCall, callTool, listAllTools, type DispatchDeps } from './mcp/dispatch.js';
import { createServerGuard } from './mcp/guard.js';

/** Values an administrator can change while the pod runs; the pod reads them on every use. */
export interface GatewayRuntime {
  keyRatePerMinute: number;
  mcpMaxCalls: number;
}

export interface GatewayDeps {
  db: Db;
  /** Live values; the configuration's own when absent. */
  runtime?: GatewayRuntime;
  /** Credentials and the guarded upstream fetch, shared with the api's server tests. */
  access: AccessDeps;
  logger: Logger;
  metrics: Metrics;
  errors?: ErrorReporter;
  workloadHeaders: WorkloadHeaders;
  /** Counts requests per key; absent means no per-key limit. */
  limiter?: LimiterPort | undefined;
  /** Readiness probe of the database; `SELECT 1` in the real wiring. */
  pingDb: () => Promise<unknown>;
  onShutdown?: (() => Promise<void>)[];
  fetch?: typeof fetch;
  /** Checks a key; the real check against the database unless a test supplies one. */
  /** Servers, credentials and usage from the api; the database is used when absent. */
  remote?: GatewayRemote;
  authenticate?: (rawKey: string | null, ip: string | undefined) => Promise<KeyIdentity | null>;
}

/** Headers a host's server sends that the api needs; everything else stays behind. */
const HOST_REQUEST_HEADERS = ['authorization', 'accept', 'idempotency-key'] as const;
const HOST_RESPONSE_HEADERS = [
  'content-type',
  'content-length',
  'cache-control',
  'vary',
  'retry-after',
  'location',
  'idempotent-replay',
] as const;
/** The registry entries a project key may call; the gateway serves exactly these for projects. */
export const PROJECT_FORWARDED_ROUTES = ROUTES.filter(
  (route) => route.app === 'api' && route.principals.includes('project'),
);

/** The registry entries a session token is made for; the api serves them only behind the gateway. */
export const SESSION_FORWARDED_ROUTES = ROUTES.filter(
  (route) =>
    route.app === 'api' &&
    route.principals.includes('key') &&
    route.pathTemplate.startsWith('/v1/session/'),
);

/** Whether the header offers a session token, well formed or not; the api checks the rest. */
const offersSessionToken = (header: string | undefined): boolean =>
  typeof header === 'string' && header.startsWith(`Bearer ${KEY_PREFIX.session}`);

/** Protocol versions this gateway answers; the first is offered when the client's is unknown. */
export const SUPPORTED_PROTOCOL_VERSIONS = [
  '2025-06-18',
  '2025-11-25',
  '2025-03-26',
  '2024-11-05',
  '2026-07-28',
] as const;

interface RpcBody {
  jsonrpc?: unknown;
  id?: unknown;
  method?: unknown;
  params?: unknown;
  result?: unknown;
  error?: unknown;
}

const rpcError = (id: unknown, code: number, message: string) => ({
  jsonrpc: '2.0' as const,
  id: id ?? null,
  error: { code, message },
});

const apiError = (request: FastifyRequest, code: string, message: string) => ({
  error: { code, message, requestId: request.id },
});

/** Builds the gateway's HTTP server with every route registered and no listener. */
export function buildApp(config: GatewayConfig, deps: GatewayDeps): HttpServer {
  const { db } = deps;
  const server = createServer({
    service: 'gateway',
    config,
    logger: deps.logger,
    metrics: deps.metrics,
    ...(deps.errors ? { errors: deps.errors } : {}),
    readinessChecks: { db: deps.pingDb },
    ...(deps.onShutdown ? { onShutdown: deps.onShutdown } : {}),
  });
  const { app } = server;

  const runtime: GatewayRuntime = deps.runtime ?? {
    keyRatePerMinute: config.KEY_RATE_LIMIT_PER_MINUTE,
    mcpMaxCalls: config.MCP_MAX_INFLIGHT_CALLS,
  };
  const dispatch: DispatchDeps = {
    db,
    remote: deps.remote,
    access: deps.access,
    logger: deps.logger,
    appBaseUrl: config.APP_BASE_URL,
    resultMaxBytes: config.TOOL_RESULT_MAX_BYTES,
    guard: createServerGuard({
      maxConcurrency: config.SERVER_MAX_CONCURRENCY,
      maxTotalConcurrency: () => runtime.mcpMaxCalls,
      failuresToOpen: config.BREAKER_FAILURES,
      openMs: config.BREAKER_OPEN_SECONDS * 1000,
    }),
  };
  const forward = createArtifactProxy({
    apiBaseUrl: config.API_BASE_URL,
    workloadHeaders: deps.workloadHeaders,
    ...(deps.fetch ? { fetch: deps.fetch } : {}),
  });

  const forwardHost = createArtifactProxy({
    apiBaseUrl: config.API_BASE_URL,
    workloadHeaders: deps.workloadHeaders,
    requestHeaders: HOST_REQUEST_HEADERS,
    responseHeaders: HOST_RESPONSE_HEADERS,
    bodyMethods: ['POST', 'PUT', 'PATCH'],
    ...(deps.fetch ? { fetch: deps.fetch } : {}),
  });

  /** Authenticates and rate-limits one request; replies and returns null when it must stop. */
  async function admit(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<ApiKeyPrincipal | null> {
    const check = deps.authenticate ?? ((raw, ip) => authenticateKey(db, raw, { ip }));
    const identity = await check(bearerKey(request.headers.authorization), request.clientIp);
    if (!identity) {
      void reply.header('www-authenticate', 'Bearer');
      void reply
        .status(401)
        .send(apiError(request, 'unauthenticated', 'A valid Bearer key is required.'));
      return null;
    }
    const limit = runtime.keyRatePerMinute;
    if (deps.limiter && limit > 0) {
      try {
        const result = await deps.limiter.check(
          tenantKey(identity.principal.orgId, 'gateway-key', identity.keyRowId),
          { limit, windowSeconds: 60 },
        );
        if (!result.allowed) {
          const wait = Math.max(1, Math.ceil((result.resetAt.getTime() - Date.now()) / 1000));
          void reply.header('retry-after', String(wait));
          void reply
            .status(429)
            .send(apiError(request, 'rate_limited', 'Too many requests for this key.'));
          return null;
        }
      } catch {
        // A limiter outage must not take the data plane down; the other guards still apply.
      }
    }
    return identity.principal;
  }

  const allowed = (principal: ApiKeyPrincipal, action: 'mcp:list' | 'mcp:call'): boolean =>
    authorize(principal, action, keyResource(principal)).allowed;

  async function handleMcp(
    request: FastifyRequest,
    reply: FastifyReply,
    only?: string,
    direct = false,
  ) {
    const principal = await admit(request, reply);
    if (!principal) return reply;

    const body = request.body as RpcBody | RpcBody[] | undefined;
    if (Array.isArray(body) || body === undefined || body === null || typeof body !== 'object') {
      return reply.status(400).send(rpcError(null, -32600, 'Invalid Request'));
    }
    const version = request.headers['mcp-protocol-version'];
    if (
      typeof version === 'string' &&
      !(SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(version)
    ) {
      return reply.status(400).send(rpcError(body.id, -32600, 'Unsupported protocol version'));
    }

    // Notifications and responses from the client carry nothing to answer.
    if (
      body.method === undefined ||
      (typeof body.method === 'string' && body.method.startsWith('notifications/'))
    ) {
      return reply.status(202).send();
    }
    if (body.jsonrpc !== '2.0' || typeof body.method !== 'string') {
      return reply.status(400).send(rpcError(body.id, -32600, 'Invalid Request'));
    }
    const id = body.id;
    const params = (body.params ?? {}) as Record<string, unknown>;
    const ok = (result: unknown) => reply.status(200).send({ jsonrpc: '2.0', id, result });
    const fail = (code: number, message: string) =>
      reply.status(200).send(rpcError(id, code, message));

    switch (body.method) {
      case 'initialize': {
        const asked =
          typeof params['protocolVersion'] === 'string' ? params['protocolVersion'] : '';
        const protocolVersion = (SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(asked)
          ? asked
          : SUPPORTED_PROTOCOL_VERSIONS[0];
        return ok({
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: 'boldcreate-gateway', version: '1.0.0' },
        });
      }
      case 'ping':
        return ok({});
      case 'tools/list': {
        if (!allowed(principal, 'mcp:list')) return fail(-32603, 'This key may not list tools.');
        const listing = await listAllTools(dispatch, principal, only, direct);
        const notes = {
          ...(listing.unavailable.length > 0 ? { unavailable: listing.unavailable } : {}),
          ...(listing.skipped.length > 0 ? { skipped: listing.skipped } : {}),
        };
        return ok({
          tools: listing.tools,
          ...(Object.keys(notes).length > 0 ? { _meta: { boldcreate: notes } } : {}),
        });
      }
      case 'tools/call': {
        if (!allowed(principal, 'mcp:call')) return fail(-32603, 'This key may not call tools.');
        const name = params['name'];
        if (typeof name !== 'string' || name === '')
          return fail(-32602, 'A tool name is required.');
        const rawArgs = params['arguments'];
        if (
          rawArgs !== undefined &&
          (typeof rawArgs !== 'object' || rawArgs === null || Array.isArray(rawArgs))
        ) {
          return fail(-32602, 'Arguments must be an object.');
        }
        const started = Date.now();
        const outcome = await callTool(
          dispatch,
          principal,
          name,
          (rawArgs ?? {}) as Record<string, unknown>,
          only,
          direct,
        );
        if (outcome.kind === 'tool_disabled') {
          return reply
            .status(403)
            .send(
              rpcError(
                id,
                -32003,
                `tool_disabled: ${name.slice(0, 80)} is not available to this key.`,
              ),
            );
        }
        if (outcome.kind === 'unknown_tool')
          return fail(-32602, `Unknown tool: ${name.slice(0, 80)}`);
        void auditToolCall(
          dispatch,
          principal,
          {
            server: outcome.server,
            tool: outcome.tool,
            outcome: outcome.outcome,
            durationMs: Date.now() - started,
          },
          request.id,
          request.clientIp,
        );
        return ok(outcome.result);
      }
      default:
        return fail(-32601, `Method not found: ${body.method.slice(0, 80)}`);
    }
  }

  const methodNotAllowed = async (_request: FastifyRequest, reply: FastifyReply) => {
    void reply.header('allow', 'POST');
    return reply.status(405).send();
  };

  app.post('/mcp', (request, reply) => handleMcp(request, reply));
  // One server, tools under their own names (no `{server}__` prefix).
  app.post('/:server/mcp', (request, reply) => {
    const { server: name } = request.params as { server: string };
    return handleMcp(request, reply, name.toLowerCase(), true);
  });
  app.get('/:server/mcp', methodNotAllowed);
  app.delete('/:server/mcp', methodNotAllowed);
  app.get('/mcp', methodNotAllowed);
  app.delete('/mcp', methodNotAllowed);

  app.get('/v1/sync', (request, reply) => forward(request, reply, '/v1/sync'));
  app.post('/v1/sync/reports', (request, reply) => forward(request, reply, '/v1/sync/reports'));
  app.get('/v1/sync/components/:sha256', (request, reply) => {
    const { sha256 } = request.params as { sha256: string };
    return forward(request, reply, `/v1/sync/components/${encodeURIComponent(sha256)}`);
  });
  app.get('/v1/plugin-versions/:pluginVersionId/archive', (request, reply) => {
    const { pluginVersionId } = request.params as { pluginVersionId: string };
    return forward(
      request,
      reply,
      `/v1/plugin-versions/${encodeURIComponent(pluginVersionId)}/archive`,
    );
  });

  // Project and session routes: the api decides everything; here only the credential made for
  // the route is let through, so a project route never sees a session token or another key, and a
  // session route never sees a project key or another key.
  const forwardOnly = (routes: readonly RouteDef[], offers: (header?: string) => boolean) => {
    for (const route of routes) {
      app.route({
        method: route.method,
        url: toFastifyPath(route.pathTemplate),
        handler: (request, reply) => {
          if (!offers(request.headers.authorization)) {
            void reply.header('www-authenticate', 'Bearer');
            return reply
              .status(401)
              .send(apiError(request, 'unauthenticated', 'A valid Bearer key is required.'));
          }
          const path = request.raw.url?.split('?')[0] ?? route.pathTemplate;
          return forwardHost(request, reply, path);
        },
      });
    }
  };
  forwardOnly(PROJECT_FORWARDED_ROUTES, offersProjectKey);
  forwardOnly(SESSION_FORWARDED_ROUTES, offersSessionToken);

  return server;
}
