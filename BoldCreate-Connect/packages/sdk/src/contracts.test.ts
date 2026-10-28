/**
 * The client against the route registry: every call it makes names a route that exists, for the
 * kind of key that sends it, and what it sends is accepted by that route's own schemas. Sample
 * answers are parsed by the schemas too, and the hand-written types must accept what they give.
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type * as z from 'zod/v4';
import {
  AuthConfigPageSchema,
  ConnectionPageSchema,
  ProjectLogPageSchema,
  ProjectPluginResponseSchema,
  ProjectUsageResponseSchema,
  ProjectUserResponseSchema,
  PluginSetResponseSchema,
  ROUTES,
  SessionCatalogPageSchema,
  SessionCreatedResponseSchema,
  SessionResponseSchema,
  SyncResponseSchema,
  UserPluginStatePageSchema,
  formatId,
} from '@boldcreate-integrations/contracts';
import { ConnectClient } from './connect-client.js';
import { ConnectSession } from './session.js';
import { empty, fakeFetch, json, type Call } from './test-support.js';
import type {
  AuthConfig,
  CatalogPage,
  Connection,
  LogEntry,
  Manifest,
  PluginSet,
  ProjectPlugin,
  ProjectUser,
  SessionCreated,
  SessionInfo,
  Usage,
  UserPlugin,
} from './types.js';

const id = (prefix: string) => formatId(prefix, randomUUID());
const NOW = '2026-10-17T00:00:00.000Z';

const KEY = 'prk_0123456789abcdef.' + 'abcdefghijklmnopqrstuvwxyz012345';
const TOKEN = 'stk_fedcba9876543210.' + 'zyxwvutsrqponmlkjihgfedcba012345';

function routeOf(call: Call) {
  const found = ROUTES.find(
    (route) =>
      route.method === call.method &&
      new RegExp(`^${route.pathTemplate.replace(/\{[^}]+\}/g, '[^/]+')}$`).test(call.url.pathname),
  );
  return found;
}

/** What is wrong with the calls, one line each; empty when every call fits its route. */
function checkRequests(calls: Call[], keyKind: 'project' | 'key'): string[] {
  const problems: string[] = [];
  for (const call of calls) {
    const route = routeOf(call);
    if (!route) {
      problems.push(`${call.method} ${call.url.pathname} is not a route`);
      continue;
    }
    if (!route.principals.includes(keyKind)) problems.push(`${route.id} principal`);
    if (route.body && call.body !== undefined && !route.body.safeParse(call.body).success) {
      problems.push(`${route.id} body: ${JSON.stringify(call.body)}`);
    }
    if (route.query && !route.query.safeParse(Object.fromEntries(call.url.searchParams)).success) {
      problems.push(`${route.id} query: ${call.url.search}`);
    }
  }
  return problems;
}

const CMP = id('cmp');
const PLG = id('plg');
const PV = id('pv');

function projectClient() {
  const fake = fakeFetch({}, (key) => {
    if (key.startsWith('DELETE')) return empty();
    if (key.startsWith('POST') && key.includes('/connections')) {
      return json({ connectUrl: 'https://c.test', expiresAt: NOW });
    }
    return json({ items: [], nextCursor: null });
  });
  return {
    connect: new ConnectClient({ apiKey: KEY, baseUrl: 'https://api.test', fetch: fake.fetch }),
    ...fake,
  };
}

describe('requests of the project client', () => {
  it('name routes for project keys and send what the schemas accept', async () => {
    const { connect, calls } = projectClient();
    const user = 'host-user-1';
    await connect.users.list({ search: 'a', userId: user, limit: 10 });
    await connect.users.setName(user, 'Ada');
    await connect.users.plugins(user);
    await connect.users.install(user, PLG, { versionId: PV });
    await connect.users.uninstall(user, PLG);
    await connect.sessions.list({ userId: user, limit: 5 });
    await connect.sessions.get(id('pjs'));
    await connect.sessions.delete(id('pjs'));
    await connect.plugins.list();
    await connect.plugins.add(PLG);
    await connect.plugins.add(PLG, { versionId: PV });
    await connect.plugins.update(PLG, { versionId: PV });
    await connect.plugins.remove(PLG);
    await connect.plugins.catalog({ q: 'git', kind: 'mcp', featured: true, sort: 'name', page: 1 });
    await connect.catalog.mode();
    await connect.catalog.setMode('allowlist');
    await connect.catalog.allowed();
    await connect.catalog.allow(PLG);
    await connect.catalog.disallow(PLG);
    await connect.catalog.sets.list();
    await connect.catalog.sets.create('starter');
    await connect.catalog.sets.create('starter', [PLG]);
    await connect.catalog.sets.update(id('pls'), { name: 'main' });
    await connect.catalog.sets.add(id('pls'), PLG);
    await connect.catalog.sets.remove(id('pls'), PLG);
    await connect.catalog.sets.delete(id('pls'));
    await connect.authConfigs.list();
    await connect.authConfigs.setVariables(CMP, { A: 'x', B: null });
    await connect.connections.list({ userId: user, componentId: CMP });
    await connect.connections.start(user, CMP, { callbackUrl: 'https://host.test/back' });
    await connect.connections.delete(id('ucn'));
    await connect.logs.list({
      userId: user,
      action: 'tool.call',
      from: new Date(NOW),
      to: new Date(NOW),
    });
    await connect.usage({ from: new Date(NOW), to: new Date(NOW) });
    await connect.webhooks.deliveries({ status: 'failed', limit: 3 });
    expect(calls.length).toBeGreaterThan(5);
    expect(checkRequests(calls, 'project')).toEqual([]);
  });

  it('creates a session with every option the schema allows', async () => {
    const fake = fakeFetch({ 'POST /v1/project/sessions': json({}, 201) });
    const connect = new ConnectClient({
      apiKey: KEY,
      baseUrl: 'https://api.test',
      fetch: fake.fetch,
    });
    await connect
      .create('host-user-1', {
        plugins: ['alpha'],
        set: 'starter',
        expiresInSeconds: 3600,
        tools: { disable: ['alpha-search.delete_all'], disableDestructive: true },
      })
      .catch(() => undefined);
    expect(fake.calls).toHaveLength(1);
    expect(checkRequests(fake.calls, 'project')).toEqual([]);
  });
});

describe('requests of a session', () => {
  it('name routes for session tokens and send what the schemas accept', async () => {
    const fake = fakeFetch({}, (key) => {
      if (key.startsWith('DELETE') || key.startsWith('POST /v1/sync/reports')) return empty();
      if (key.startsWith('POST /v1/session/connections')) {
        return json({ redirectUrl: 'https://l.test' });
      }
      if (key === 'GET /v1/sync') {
        return json({ revision: 'r', pollAfterSeconds: 1, entries: [], skipped: [] });
      }
      if (key.includes('/catalog')) return json({ items: [], total: 0, page: 1, pageSize: 25 });
      return json({ items: [], nextCursor: null });
    });
    const session = new ConnectSession(
      TOKEN,
      { id: id('pjs'), userId: 'u', expiresAt: NOW },
      { baseUrl: 'https://api.test', fetch: fake.fetch },
    );
    await session.mcp();
    await session.authorize(CMP, { callbackUrl: 'https://host.test/back' });
    await session.authConfigs();
    await session.catalog({ q: 'git', featured: false });
    await session.plugins.list();
    await session.plugins.install(PLG, { versionId: PV });
    await session.plugins.update(PLG, { versionId: PV });
    await session.plugins.remove(PLG);
    await session.plugins.setVariables(PLG, { A: 'x', B: null });
    await session.manifest({ kinds: ['skill', 'rule'], plugins: ['alpha'], revision: 'r0' });
    await session.report({ applied: [{ componentId: CMP, sha256: 'a'.repeat(64) }] });
    await session.component('a'.repeat(64)).catch(() => undefined);
    expect(fake.calls.length).toBeGreaterThan(5);
    expect(checkRequests(fake.calls, 'key')).toEqual([]);
  });
});

/** Compile time: the type of what a schema gives must be assignable to the client's type. */
const accepts =
  <Sdk>() =>
  <Out extends Sdk>(schema: z.ZodType<Out>, sample: unknown): Out =>
    schema.parse(sample);

describe('answers of the API against the client types', () => {
  const user = {
    id: id('usr'),
    userId: 'host-user-1',
    displayName: 'Ada',
    status: 'active',
    createdAt: NOW,
    lastSeenAt: null,
    sessionCount: 1,
    connectionCount: 0,
    lastSyncedAt: null,
    connectionsMissing: 0,
  };
  const session = {
    id: id('pjs'),
    userId: 'host-user-1',
    plugins: ['alpha'],
    tools: { disableDestructive: true },
    authConfigs: [],
    status: 'active',
    createdAt: NOW,
    expiresAt: NOW,
    lastUsedAt: null,
  };
  const plugin = {
    pluginId: PLG,
    name: 'alpha',
    displayName: 'Alpha',
    versionId: PV,
    version: '1.0.0',
    createdAt: NOW,
    updatedAt: NOW,
  };
  const userPlugin = {
    pluginId: PLG,
    name: 'alpha',
    displayName: 'Alpha',
    source: 'user',
    removable: true,
    versionId: PV,
    version: '1.0.0',
    latestVersionId: PV,
    updateAvailable: false,
    installedAt: NOW,
    updatedAt: NOW,
    components: [{ componentId: CMP, kind: 'mcp', name: 'search', enabled: true }],
    variables: [{ name: 'API_TOKEN', secret: true, isSet: false }],
    mcp: [
      {
        componentId: CMP,
        serverName: 'alpha-search',
        authConfigId: null,
        authMode: 'oauth_dcr',
        setup: { kind: 'variables', names: ['API_TOKEN'] },
        ready: false,
        connection: { id: id('ucn'), status: 'active', expiresAt: null, connectedAt: NOW },
      },
    ],
  };

  it('accepts a project user, a session and a created session', () => {
    expect(accepts<ProjectUser>()(ProjectUserResponseSchema, user).userId).toBe('host-user-1');
    expect(accepts<SessionInfo>()(SessionResponseSchema, session).id).toBe(session.id);
    expect(
      accepts<SessionCreated>()(SessionCreatedResponseSchema, { ...session, token: TOKEN }).token,
    ).toBe(TOKEN);
  });

  it('accepts a project plugin and what a user has of it', () => {
    expect(accepts<ProjectPlugin>()(ProjectPluginResponseSchema, plugin).name).toBe('alpha');
    const page = accepts<{ items: UserPlugin[]; nextCursor: string | null }>()(
      UserPluginStatePageSchema,
      { items: [userPlugin], nextCursor: null },
    );
    expect(page.items[0]?.mcp[0]?.setup).toEqual({ kind: 'variables', names: ['API_TOKEN'] });
  });

  it('accepts a connection, an auth config and a plugin set', () => {
    const connection = {
      id: id('ucn'),
      userId: 'host-user-1',
      componentId: CMP,
      serverName: 'alpha-search',
      authConfigId: null,
      kind: 'oauth',
      valueNames: [],
      status: 'needs_reauth',
      expiresAt: null,
      createdAt: NOW,
    };
    accepts<{ items: Connection[]; nextCursor: string | null }>()(ConnectionPageSchema, {
      items: [connection],
      nextCursor: null,
    });
    accepts<{ items: AuthConfig[]; nextCursor: string | null }>()(AuthConfigPageSchema, {
      items: [
        {
          id: id('acf'),
          componentId: CMP,
          pluginId: PLG,
          pluginName: 'alpha',
          serverName: 'alpha-search',
          name: 'default',
          authMode: 'user_form',
          isDefault: true,
          status: 'active',
          clientId: null,
          clientSecretSet: false,
          secretSet: false,
          secretLastFour: null,
          scopes: null,
          callbackUrl: 'https://api.test/cb',
          variables: [
            {
              name: 'API_TOKEN',
              description: '',
              required: true,
              secret: true,
              isSet: false,
              custom: false,
            },
          ],
          createdAt: NOW,
          updatedAt: NOW,
        },
      ],
      nextCursor: null,
    });
    const set = accepts<PluginSet>()(PluginSetResponseSchema, {
      id: id('pls'),
      name: 'starter',
      plugins: [{ pluginId: PLG, name: 'alpha', displayName: 'Alpha' }],
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(set.name).toBe('starter');
  });

  it('accepts logs, usage and the catalog a session reads', () => {
    accepts<{ items: LogEntry[]; nextCursor: string | null }>()(ProjectLogPageSchema, {
      items: [
        {
          id: id('aud'),
          action: 'tool.call',
          result: 'success',
          createdAt: NOW,
          user: { id: id('usr'), userId: 'host-user-1' },
          target: null,
          tool: 'search',
          durationMs: 40,
        },
      ],
      nextCursor: null,
    });
    accepts<Usage>()(ProjectUsageResponseSchema, {
      from: NOW,
      to: NOW,
      days: [{ date: '2026-10-17', activeUsers: 1, toolCalls: 2, errors: 0 }],
      topUsers: [{ id: id('usr'), userId: 'host-user-1', toolCalls: 2 }],
    });
    const catalog = accepts<CatalogPage>()(SessionCatalogPageSchema, {
      items: [],
      total: 0,
      page: 1,
      pageSize: 25,
    });
    expect(catalog.total).toBe(0);
  });

  it('accepts the manifest with files and servers', () => {
    const sha = 'a'.repeat(64);
    const manifest = accepts<Manifest>()(SyncResponseSchema, {
      revision: 'rev1',
      pollAfterSeconds: 60,
      entries: [
        {
          installationId: id('ins'),
          pluginId: PLG,
          pluginName: 'alpha',
          versionId: PV,
          version: '1.0.0',
          scope: 'user',
          yanked: false,
          sha256: sha,
          sizeBytes: 10,
          href: '/v1/sync/components/x',
          components: [
            {
              id: CMP,
              kind: 'skill',
              name: 'review',
              enabled: true,
              sha256: sha,
              sizeBytes: 10,
              href: `/v1/sync/components/${sha}`,
              path: 'skills/review',
            },
          ],
          mcp: [
            {
              componentId: id('cmp'),
              name: 'search',
              serverName: 'alpha-search',
              url: 'https://gateway.test/alpha-search/mcp',
              transport: 'streamable-http',
              description: '',
              ready: true,
              setup: { kind: 'none' },
            },
          ],
          setup: { kind: 'none' },
        },
      ],
      skipped: [],
    });
    expect(manifest.entries[0]?.components[0]?.kind).toBe('skill');
  });

  it('accepts the session catalog items with the installed flag', () => {
    const parsed = SessionCatalogPageSchema.shape.items.element.shape.installed;
    expect(parsed).toBeDefined();
  });
});
