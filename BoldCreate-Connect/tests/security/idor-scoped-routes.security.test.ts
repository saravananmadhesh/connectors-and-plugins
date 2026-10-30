/**
 * Insecure direct object references on every route that names an organization or user
 * scope. The routes come from the registry, so a new route is covered the day it is registered.
 *
 * Run: pnpm test -- --only=security
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { ROUTES, type RouteDef } from '../../packages/contracts/src/v1/routes.js';
import { ID_PREFIXES, formatId } from '../../packages/contracts/src/v1/ids.js';
import {
  ORG_ADMIN_ONLY,
  VIEWER_HIDDEN,
  VIEWER_HIDDEN_FOR_YOU,
} from '../../packages/domain/src/permissions/matrix.expected.js';
import {
  callApi,
  countAudit,
  createOrgFixture,
  type OrgFixture,
} from '../integration/org-fixture.js';

const SCOPED_ROUTES = ROUTES.filter(
  (route) =>
    route.app === 'api' &&
    route.exposure === 'bff' &&
    route.principals.includes('session') &&
    route.pathTemplate.includes('{orgId}') &&
    // Console routes sit under an app, and their own suite checks who may open them.
    !route.pathTemplate.includes('{appId}'),
);

const IDS_THAT_EXIST = new Set(['orgId', 'userId', 'serverName']);

const PARAM_PREFIX: Record<string, string> = {
  inviteId: ID_PREFIXES.invite,
  installationId: ID_PREFIXES.installation,
  componentId: ID_PREFIXES.component,
  keyId: ID_PREFIXES.apiKey,
  projectId: ID_PREFIXES.project,
  projectKeyId: ID_PREFIXES.projectKey,
  projectUserId: ID_PREFIXES.user,
  pluginId: ID_PREFIXES.plugin,
  setId: ID_PREFIXES.pluginSet,
  sessionId: ID_PREFIXES.projectSession,
  connectionId: ID_PREFIXES.userConnection,
  authConfigId: ID_PREFIXES.authConfig,
};

function prefixOf(route: RouteDef, name: string): string {
  const prefix = PARAM_PREFIX[name];
  if (!prefix) throw new Error(`${route.id}: no id prefix known for ${name}`);
  return prefix;
}

let fx: OrgFixture;
let ownerWireId: string;

function urlOf(route: RouteDef): string {
  const query =
    route.id === 'projectUserPluginsConsole.list' ||
    route.id === 'projectUserPluginsConsole.delete' ||
    route.id === 'projectUserPluginComponentsConsole.delete'
      ? '?userId=sample-user'
      : '';
  return path(route) + query;
}

function path(route: RouteDef): string {
  return route.pathTemplate.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (name === 'orgId') return fx.orgId;
    if (name === 'userId') return ownerWireId;
    if (name === 'serverName') return 'sample-server';
    return formatId(prefixOf(route, name), randomUUID());
  });
}

const isUserRoute = (route: RouteDef) => route.pathTemplate.includes('/me');
const isWrite = (route: RouteDef) => route.method !== 'GET';
/** A body the route accepts, so a denial can only come from who is asking. */
const bodyOf = (route: RouteDef) => {
  if (!isWrite(route)) return undefined;
  const bodies: Record<string, unknown> = {
    'projectAuthConfigsConsole.putVariables': {
      values: { API_TOKEN: 'sample-value' },
    },
    'projectAuthConfigsConsole.create': {
      componentId: formatId('cmp', randomUUID()),
      name: 'sample',
      authMode: 'dcr',
    },
    'projectAuthConfigsConsole.update': { name: 'sample' },
    'projectUserInstallModeConsole.put': { mode: 'any' },
    'projectPluginSetsConsole.create': { name: 'sample' },
    'projectPluginSetsConsole.update': { name: 'sample' },
    'projectUserPluginsConsole.put': { userId: 'sample-user' },
    'projectUserPluginVariablesConsole.put': {
      userId: 'sample-user',
      values: { API_TOKEN: 'sample-value' },
    },
    'projectUserPluginComponentsConsole.put': {
      userId: 'sample-user',
      enabled: true,
    },
    'projectWebhookConsole.put': {
      url: 'https://hooks.example.com/hook',
      events: ['user.created'],
    },
  };
  return bodies[route.id] ?? {};
};

beforeAll(async () => {
  fx = await createOrgFixture('idor');
  ownerWireId = formatId('usr', fx.users.admin.rawUserId);
}, 120_000);

describe('the registry', () => {
  it('has scoped routes of every kind to test', () => {
    expect(SCOPED_ROUTES.length).toBeGreaterThan(40);
    expect(SCOPED_ROUTES.some(isUserRoute)).toBe(true);
    expect(SCOPED_ROUTES.some((route) => !isUserRoute(route))).toBe(true);
    expect(SCOPED_ROUTES.some(isWrite)).toBe(true);
  });

  it('uses only ids this test can fill in or generate', () => {
    const unknown = SCOPED_ROUTES.flatMap((route) =>
      (route.pathTemplate.match(/{(w+)}/g) ?? [])
        .map((name) => name.slice(1, -1))
        .filter((key) => !IDS_THAT_EXIST.has(key) && !(key in PARAM_PREFIX))
        .map((key) => `${route.id}: ${key}`),
    );
    expect(unknown).toEqual([]);
  });
});

describe('a member of another organization', () => {
  it('gets 404 from every scoped route and every denial leaves an audit row', async () => {
    const stranger = fx.stranger;
    const before = await countAudit('permission.denied', stranger.rawUserId, fx.rawOrgId);
    for (const route of SCOPED_ROUTES) {
      const res = await callApi(route.method, urlOf(route), stranger, bodyOf(route));
      expect(res.status, `${route.id} ${route.method} ${route.pathTemplate}`).toBe(404);
    }
    const after = await countAudit('permission.denied', stranger.rawUserId, fx.rawOrgId);
    expect(after - before).toBe(SCOPED_ROUTES.length);
  }, 120_000);
});

describe('a suspended member', () => {
  it('gets 404 from every scoped route', async () => {
    for (const route of SCOPED_ROUTES) {
      const res = await callApi(route.method, urlOf(route), fx.users.suspended, bodyOf(route));
      expect(res.status, `${route.id} ${route.pathTemplate}`).toBe(404);
    }
  }, 120_000);
});

const actionIn = (route: RouteDef, list: readonly string[]) =>
  route.action !== null && list.includes(route.action);
/** The For You data lives at organization and user scope; project routes sit under a project. */
const isForYouRoute = (route: RouteDef) => !route.pathTemplate.includes('{projectId}');

describe('a viewer', () => {
  it('gets 404 from every settings, key and For You route', async () => {
    const hidden = SCOPED_ROUTES.filter(
      (route) =>
        actionIn(route, VIEWER_HIDDEN) ||
        (isForYouRoute(route) && actionIn(route, VIEWER_HIDDEN_FOR_YOU)),
    );
    expect(hidden.length).toBeGreaterThan(10);
    for (const route of hidden) {
      const res = await callApi(route.method, urlOf(route), fx.users.viewer, bodyOf(route));
      expect(res.status, `${route.id} ${route.pathTemplate}`).toBe(404);
    }
  }, 120_000);

  it('gets 403 from every route that only an admin may take', async () => {
    const adminOnly = SCOPED_ROUTES.filter((route) => actionIn(route, ORG_ADMIN_ONLY));
    expect(adminOnly.length).toBeGreaterThan(3);
    for (const route of adminOnly) {
      const res = await callApi(route.method, urlOf(route), fx.users.viewer, bodyOf(route));
      expect(res.status, `${route.id} ${route.pathTemplate}`).toBe(403);
    }
  }, 120_000);

  it('gets 403 from every write on a project', async () => {
    const writes = SCOPED_ROUTES.filter(
      (route) => !isForYouRoute(route) && isWrite(route) && !actionIn(route, VIEWER_HIDDEN),
    );
    expect(writes.length).toBeGreaterThan(5);
    for (const route of writes) {
      const res = await callApi(route.method, urlOf(route), fx.users.viewer, bodyOf(route));
      expect(res.status, `${route.id} ${route.pathTemplate}`).toBe(403);
    }
  }, 120_000);
});

describe('a member', () => {
  it('gets 403 from every route that only an admin may take', async () => {
    for (const route of SCOPED_ROUTES.filter((r) => actionIn(r, ORG_ADMIN_ONLY))) {
      const res = await callApi(route.method, urlOf(route), fx.users.member, bodyOf(route));
      expect(res.status, `${route.id} ${route.pathTemplate}`).toBe(403);
    }
  }, 120_000);
});

describe('the organization keys', () => {
  it('cannot be listed, made or revoked by a viewer or a stranger', async () => {
    const key = await callApi('POST', `/v1/orgs/${fx.orgId}/api-keys`, fx.users.admin, {
      name: 'Org Key',
      permissions: ['mcp:list'],
    });
    expect(key.status).toBe(201);
    const { id } = (await key.json()) as { id: string };

    for (const other of [fx.users.viewer, fx.stranger]) {
      for (const [method, path] of [
        ['GET', `/v1/orgs/${fx.orgId}/api-keys`],
        ['DELETE', `/v1/orgs/${fx.orgId}/api-keys/${id}`],
      ] as const) {
        const res = await callApi(method, path, other);
        expect([403, 404]).toContain(res.status);
      }
    }
    // A member may hold keys of their own, but never sees or revokes another member's key.
    const memberList = await callApi('GET', `/v1/orgs/${fx.orgId}/api-keys`, fx.users.member);
    const listed = (await memberList.json()) as { items?: { id: string }[] };
    expect((listed.items ?? []).map((item) => item.id)).not.toContain(id);
    const memberRevoke = await callApi(
      'DELETE',
      `/v1/orgs/${fx.orgId}/api-keys/${id}`,
      fx.users.member,
    );
    expect([403, 404]).toContain(memberRevoke.status);

    const own = await callApi('DELETE', `/v1/orgs/${fx.orgId}/api-keys/${id}`, fx.users.admin);
    expect(own.status).toBe(204);
  });
});
