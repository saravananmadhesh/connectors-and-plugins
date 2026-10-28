/**
 * What key-authenticated calls share: the limiter and its per-key budget, the registry entry of the
 * request being served, and the `Retry-After` value a refused call leaves on the request.
 */
import type { FastifyRequest } from 'fastify';
import { AppError, ROUTES, type RouteDef } from '@boldcreate-integrations/contracts';
import { toFastifyPath } from '@boldcreate-integrations/http-server';
import { globalKey, type LimiterPort } from '@boldcreate-integrations/ports';

/** What the key branches need from the app; set once when the server is built. */
export interface ApiGate {
  limiter: LimiterPort;
  /** Requests one key may make per minute. */
  requestsPerMinute: number;
}

declare module 'fastify' {
  interface FastifyInstance {
    apiGate: ApiGate;
  }
  interface FastifyRequest {
    /** Seconds for `Retry-After` when a key branch refused the call for rate reasons. */
    retryAfter?: number;
  }
}

const WINDOW_SECONDS = 60;

/** The api's routes by method and URL pattern, to find the entry of the request being served. */
const API_ROUTES = new Map<string, RouteDef>(
  ROUTES.filter((route) => route.app === 'api').map((route) => [
    `${route.method} ${toFastifyPath(route.pathTemplate)}`,
    route,
  ]),
);

export function routeOf(request: FastifyRequest): RouteDef | undefined {
  return API_ROUTES.get(`${request.method} ${request.routeOptions.url}`);
}

/**
 * Counts one call against the key's minute. Returns the seconds to wait when the key is over its
 * limit, null when the call may go on. An unreachable limiter refuses the call, because the limit
 * protects every caller.
 */
export async function keyRateWait(
  limiter: LimiterPort,
  subjectId: string,
  limit: number,
): Promise<number | null> {
  let result;
  try {
    result = await limiter.check(globalKey('ratelimit', 'platform-key', subjectId), {
      limit,
      windowSeconds: WINDOW_SECONDS,
    });
  } catch {
    throw new AppError('service_unavailable');
  }
  if (result.allowed) return null;
  return Math.max(1, Math.ceil((result.resetAt.getTime() - Date.now()) / 1000));
}
