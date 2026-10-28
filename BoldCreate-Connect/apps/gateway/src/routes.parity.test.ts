import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES } from '@boldcreate-integrations/contracts';
import type { Unsealer } from '@boldcreate-integrations/credentials';
import type { Db } from '@boldcreate-integrations/db';
import {
  compareRoutes,
  toFastifyPath,
  type HttpServer,
} from '@boldcreate-integrations/http-server';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { buildApp, PROJECT_FORWARDED_ROUTES, SESSION_FORWARDED_ROUTES } from './app.js';
import { loadGatewayConfig } from './config.js';

const unsealer: Unsealer = {
  unseal: async () => {
    throw new Error('not used');
  },
  unsealFields: async () => {
    throw new Error('not used');
  },
};

/** The protocol endpoints speak JSON-RPC and the delivery routes belong to the api, so the registry does not list them for the gateway. */
const PROTOCOL_ROUTES = [
  'POST /mcp',
  'POST /:server/mcp',
  'GET /:server/mcp',
  'DELETE /:server/mcp',
  'GET /mcp',
  'DELETE /mcp',
  'GET /v1/sync',
  'POST /v1/sync/reports',
  'GET /v1/sync/components/:sha256',
  'GET /v1/plugin-versions/:pluginVersionId/archive',
];

/** The api routes a project key may call; the gateway forwards them for the host's server. */
const PROJECT_ROUTES = PROJECT_FORWARDED_ROUTES.map(
  (route) => `${route.method} ${toFastifyPath(route.pathTemplate)}`,
);

/** The api routes a session token is made for; the gateway forwards them for the session's user. */
const SESSION_ROUTES = SESSION_FORWARDED_ROUTES.map(
  (route) => `${route.method} ${toFastifyPath(route.pathTemplate)}`,
);

let server: HttpServer | undefined;

afterEach(async () => {
  await server?.close();
  server = undefined;
});

describe('gateway routes', () => {
  it('serve exactly the registry entries of the gateway plus the protocol endpoints', () => {
    server = buildApp(
      loadGatewayConfig({
        NODE_ENV: 'test',
        DEPLOY_ENV: 'test',
        DATABASE_URL: 'postgresql://app_gateway:pw@localhost:5432/boldcreate',
        WORKLOAD_SECRET: 'workload-secret-value-for-tests',
      }),
      {
        db: {} as Db,
        access: {
          unsealer,
          sealerFor: () => {
            throw new Error('not used');
          },
          fetcher: async () => {
            throw new Error('not used');
          },
        },
        workloadHeaders: (async () => ({})) as never,
        logger: createLogger({ service: 'gateway', level: 'silent' }),
        metrics: createMetrics({ service: 'gateway' }),
        pingDb: async () => 1,
      },
    );
    const entries = ROUTES.filter((route) => route.app === 'gateway' || route.app === 'all');
    expect(
      compareRoutes(server.routes(), entries, [
        ...PROTOCOL_ROUTES,
        ...PROJECT_ROUTES,
        ...SESSION_ROUTES,
      ]),
    ).toEqual({
      missing: [],
      unexpected: [],
    });
    const served = server.routes().map((route) => `${route.method} ${route.url}`);
    for (const route of PROTOCOL_ROUTES) expect(served).toContain(route);
    expect(PROJECT_ROUTES.length).toBeGreaterThan(0);
    for (const route of PROJECT_ROUTES) expect(served).toContain(route);
    expect(SESSION_ROUTES).toEqual(
      expect.arrayContaining([
        'GET /v1/session/catalog',
        'GET /v1/session/plugins',
        'PUT /v1/session/plugins/:pluginId',
        'DELETE /v1/session/plugins/:pluginId',
        'PUT /v1/session/plugins/:pluginId/variables',
        'PUT /v1/session/plugins/:pluginId/components/:componentId',
        'POST /v1/session/connections',
        'GET /v1/session/connections',
      ]),
    );
    for (const route of SESSION_ROUTES) expect(served).toContain(route);
  });
});
