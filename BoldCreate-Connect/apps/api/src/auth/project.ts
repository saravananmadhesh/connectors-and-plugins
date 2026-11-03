/**
 * The project branch of the api: a call made with a project key (`Authorization: Bearer prk_...`)
 * from a host product's server. The key says which project is calling and what it may do; there is
 * no one to act as, so a project route never reads a member or a session.
 */
import type { FastifyRequest } from 'fastify';
import {
  AppError,
  ROUTES,
  projectScopeOf,
  type RouteDef,
} from '@boldcreate-integrations/contracts';
import type { Db } from '@boldcreate-integrations/db';
import {
  authenticateProjectKey,
  offersProjectKey,
  projectBearer,
  type ProjectKeyIdentity,
} from '@boldcreate-integrations/domain';
import { toFastifyPath } from '@boldcreate-integrations/http-server';
import { setKeyId, setTenant } from '@boldcreate-integrations/observability';
import { globalKey } from '@boldcreate-integrations/ports';

declare module 'fastify' {
  interface FastifyRequest {
    projectIdentity?: ProjectKeyIdentity;
    /** The project's request budget as of this call, for the `X-RateLimit-*` headers. */
    projectRate?: {
      limit: number;
      remaining: number;
      windowSeconds: number;
      /** Whole seconds until the current window ends. */
      resetSeconds: number;
    };
  }
}

/** The api's routes by method and URL pattern, to find the entry of the request being served. */
const API_ROUTES = new Map<string, RouteDef>(
  ROUTES.filter((route) => route.app === 'api').map((route) => [
    `${route.method} ${toFastifyPath(route.pathTemplate)}`,
    route,
  ]),
);

/**
 * Counts a call against its project's minute. Project keys and sessions share one budget, so a host
 * cannot widen its limit by minting more of either. An unreachable limiter refuses the call.
 */
export async function countProjectCall(
  request: FastifyRequest,
  projectId: string,
  organizationId?: string,
): Promise<void> {
  const { limiter, limits } = request.server.apiGate;
  const { limit, windowSeconds } = await limits.resolve('project_requests_per_minute', {
    projectId,
    organizationId,
  });
  let result;
  try {
    result = await limiter.check(globalKey('ratelimit', 'project', projectId), {
      limit,
      windowSeconds,
    });
  } catch {
    throw new AppError('service_unavailable');
  }
  const resetSeconds = Math.max(1, Math.ceil((result.resetAt.getTime() - Date.now()) / 1000));
  request.projectRate = {
    limit,
    remaining: Math.max(0, result.remaining),
    windowSeconds,
    resetSeconds,
  };
  if (result.allowed) return;
  request.retryAfter = resetSeconds;
  throw new AppError('rate_limited');
}

/**
 * Authenticates a project call. Order matters: the key (the same `401` for every reason), the rate
 * limit, whether the route is open to project keys, and only then the key's scope.
 */
export async function authenticateProjectCall(
  db: Db,
  request: FastifyRequest,
): Promise<ProjectKeyIdentity> {
  if (request.projectIdentity) return request.projectIdentity;
  if (!offersProjectKey(request.headers.authorization)) throw new AppError('unauthenticated');

  const identity = await authenticateProjectKey(db, projectBearer(request.headers.authorization), {
    ip: request.clientIp,
    cache: request.server.apiGate.projectKeyCache,
  });
  if (!identity) throw new AppError('unauthenticated');
  setKeyId(identity.keyId);
  setTenant(identity.organizationId);

  await countProjectCall(request, identity.projectId, identity.organizationId);

  // A route nobody opened to project keys stays closed, whatever the key holds.
  const route = API_ROUTES.get(`${request.method} ${request.routeOptions.url}`);
  const scope = route?.principals.includes('project') ? projectScopeOf(route.id) : null;
  if (!route || scope === null) throw new AppError('session_required');
  if (!identity.scopes.includes(scope)) throw new AppError('insufficient_scope');

  request.projectIdentity = identity;
  return identity;
}
