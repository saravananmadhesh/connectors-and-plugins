import type { RouteDef } from '@boldcreate-integrations/contracts';
import { toFastifyPath } from './routes.js';

export interface RouteParity {
  /** Registry entries the server does not serve. */
  missing: string[];
  /** Served routes without a registry entry or an allowed exception. */
  unexpected: string[];
}

/**
 * Compares the routes a server registered with the registry entries it is meant to serve, in
 * both directions. `HEAD` is ignored. `allowed` lists served routes that are not described by
 * the registry on purpose, as `METHOD /path` in Fastify spelling.
 */
export function compareRoutes(
  served: readonly { method: string; url: string }[],
  entries: readonly Pick<RouteDef, 'method' | 'pathTemplate'>[],
  allowed: readonly string[] = [],
): RouteParity {
  const servedKeys = new Set(
    served
      .filter((route) => route.method !== 'HEAD')
      .map((route) => `${route.method} ${route.url}`),
  );
  const expectedKeys = new Set(
    entries.map((entry) => `${entry.method} ${toFastifyPath(entry.pathTemplate)}`),
  );
  const allowedKeys = new Set(allowed);
  return {
    missing: [...expectedKeys].filter((key) => !servedKeys.has(key)).sort(),
    unexpected: [...servedKeys]
      .filter((key) => !expectedKeys.has(key) && !allowedKeys.has(key))
      .sort(),
  };
}
