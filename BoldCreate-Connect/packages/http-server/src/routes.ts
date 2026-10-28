import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { runWithContext } from '@boldcreate-integrations/observability';
import type { RouteDef } from '@boldcreate-integrations/contracts';

/** `/v1/orgs/{orgId}/projects` becomes `/v1/orgs/:orgId/projects`. */
export function toFastifyPath(pathTemplate: string): string {
  return pathTemplate.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, ':$1');
}

export type RouteHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;

/**
 * Registers one route from its registry entry. Validation, authentication, authorization and
 * idempotency run in the server's hooks, driven by the entry stored in the route config.
 */
export function registerRoute(app: FastifyInstance, route: RouteDef, handler: RouteHandler): void {
  app.route({
    method: route.method,
    url: toFastifyPath(route.pathTemplate),
    config: { route },
    handler: (request, reply) =>
      runWithContext(request.requestContext, async () => {
        app.markStage(request, 'handler');
        return handler(request, reply);
      }),
  });
}
