/**
 * What the gateway asks of the api so that it does not need the database itself. Only the
 * gateway's workload identity may call these routes, and every route that acts for a key checks
 * that key again, so a request cannot name a tenant the key does not belong to.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import {
  AppError,
  GatewayAccessBodySchema,
  GatewayAuthenticateBodySchema,
  GatewayServersBodySchema,
  GatewayUsageBodySchema,
  type ApiKeyPrincipal,
  type GatewayAccessResponse,
  type GatewayAuthenticateResponse,
  type GatewayLimitsResponse,
  type GatewayServersResponse,
} from '@boldcreate-integrations/contracts';
import { withTenant, type Db } from '@boldcreate-integrations/db';
import {
  authenticateKey,
  bearerKey,
  loadVisibleServers,
  requireAction,
  resolveAccess,
  writeAudit,
  type AccessDeps,
  type LimitStore,
} from '@boldcreate-integrations/domain';
import { LIMIT_KEYS } from '@boldcreate-integrations/limits';

const GATEWAY_CALLER = 'gateway';

function tenant(principal: ApiKeyPrincipal) {
  return {
    orgId: principal.orgId,
    userId: principal.userId,
    ...(principal.projectId
      ? { projectId: principal.projectId, subjectUserId: principal.userId }
      : {}),
  };
}

function allow(req: FastifyRequest, action: 'workload:gateway-resolve' | 'workload:gateway-write') {
  if (req.callerId !== GATEWAY_CALLER) throw new AppError('forbidden');
  requireAction({ kind: 'workload', callerId: GATEWAY_CALLER }, action, {});
}

export async function gatewayRoutes(
  app: FastifyInstance,
  opts: { db: Db; access: AccessDeps; limits?: LimitStore },
): Promise<void> {
  const { db, access, limits } = opts;

  async function principalOf(key: string, ip?: string): Promise<ApiKeyPrincipal> {
    const identity = await authenticateKey(db, bearerKey(`Bearer ${key}`), { ip });
    if (!identity) throw new AppError('unauthenticated');
    return identity.principal;
  }

  // GET /v1/gateway/limits — the values an administrator set, so the gateway follows them. Read
  // only, numbers only, and only for the gateway's own workload identity.
  app.get('/gateway/limits', async (req, reply) => {
    allow(req, 'workload:gateway-resolve');
    const values: GatewayLimitsResponse['values'] = {};
    if (limits) {
      for (const key of LIMIT_KEYS) {
        const resolved = await limits.resolve(key, {});
        if (resolved.source !== 'default') values[key] = resolved.limit;
      }
    }
    void reply.header('cache-control', 'no-store');
    return reply.status(200).send({ values });
  });

  // POST /v1/gateway/authenticate — the same key check the gateway runs against the database.
  app.post('/gateway/authenticate', async (req, reply) => {
    allow(req, 'workload:gateway-resolve');
    const parsed = GatewayAuthenticateBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);

    const identity = await authenticateKey(db, bearerKey(`Bearer ${parsed.data.key}`), {
      ip: parsed.data.ip,
    });
    const body: GatewayAuthenticateResponse = { identity };
    return reply.status(200).send(body);
  });

  // POST /v1/gateway/servers — the servers a key reaches.
  app.post('/gateway/servers', async (req, reply) => {
    allow(req, 'workload:gateway-resolve');
    const parsed = GatewayServersBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);

    const principal = await principalOf(parsed.data.key);
    const servers = await withTenant(db, tenant(principal), (tx) =>
      loadVisibleServers(tx, principal, parsed.data.only),
    );
    const body: GatewayServersResponse = { servers };
    return reply.status(200).send(body);
  });

  // POST /v1/gateway/access — the address and credential for one server the key reaches. An
  // expired OAuth token is refreshed here, so the gateway never holds a refresh token.
  app.post('/gateway/access', async (req, reply) => {
    allow(req, 'workload:gateway-resolve');
    const parsed = GatewayAccessBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);

    const principal = await principalOf(parsed.data.key);
    const result = await withTenant(db, tenant(principal), async (tx) => {
      const visible = await loadVisibleServers(tx, principal);
      const reachable = visible.some(
        (server) =>
          server.installationId === parsed.data.installationId &&
          server.componentId === parsed.data.componentId,
      );
      if (!reachable) return { ok: false, reason: 'not_found' } as const;
      return resolveAccess(tx, access, {
        organizationId: principal.orgId,
        installationId: parsed.data.installationId,
        componentId: parsed.data.componentId,
        userId: principal.userId ?? null,
        authConfigs: principal.authConfigs,
      });
    });
    const body: GatewayAccessResponse = result;
    return reply.status(200).send(body);
  });

  // POST /v1/gateway/usage — the audit record of one tool call.
  app.post('/gateway/usage', async (req, reply) => {
    allow(req, 'workload:gateway-write');
    const parsed = GatewayUsageBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const call = parsed.data;

    const principal = await principalOf(call.key);
    await withTenant(db, tenant(principal), (tx) =>
      writeAudit(tx, {
        actor: { kind: 'api_key', id: principal.keyId },
        action: 'mcp_tool.called',
        target: { kind: 'mcp_server', id: call.server },
        orgId: principal.orgId,
        projectId: principal.projectId,
        subjectUserId: principal.userId || undefined,
        result: call.outcome === 'ok' || call.outcome === 'tool_error' ? 'success' : 'failure',
        requestId: call.requestId,
        ip: call.ip,
        context: { tool: call.tool, outcome: call.outcome, durationMs: call.durationMs },
      }),
    );
    return reply.status(200).send({ recorded: true });
  });
}
