import { describe, expect, it, vi } from 'vitest';
import {
  ConnectIntegrityError,
  ConnectNotFoundError,
  ConnectSetupRequiredError,
} from './errors.js';
import { ConnectSession } from './session.js';
import { archiveOf, bytes, empty, fakeFetch, json } from './test-support.js';

const TOKEN = 'stk_fedcba9876543210.' + 'zyxwvutsrqponmlkjihgfedcba012345';
const INFO = { id: 'pjs_1', userId: 'u1', expiresAt: '2026-11-16T00:00:00.000Z' };

const mcp = (over: Record<string, unknown> = {}) => ({
  componentId: 'cmp_1',
  name: 'search',
  serverName: 'alpha-search',
  url: 'https://gateway.test/alpha-search/mcp',
  transport: 'http',
  description: '',
  ready: true,
  setup: { kind: 'none' },
  ...over,
});

const entry = (pluginName: string, servers: unknown[]) => ({
  installationId: 'ins_1',
  pluginId: `plg_${pluginName}`,
  pluginName,
  versionId: 'pv_1',
  version: '1.0.0',
  scope: 'user',
  yanked: false,
  sha256: '',
  sizeBytes: 0,
  href: '',
  components: [],
  mcp: servers,
  setup: { kind: 'none' },
});

const manifest = (entries: unknown[]) => ({
  revision: 'rev1',
  pollAfterSeconds: 60,
  entries,
  skipped: [],
});

function session(
  routes: Parameters<typeof fakeFetch>[0],
  sleep = vi.fn<(ms: number) => Promise<void>>(async () => {}),
) {
  const fake = fakeFetch(routes);
  const value = new ConnectSession(TOKEN, INFO, {
    baseUrl: 'https://api.test',
    fetch: fake.fetch,
    sleep,
  });
  return { session: value, sleep, ...fake };
}

describe('ConnectSession', () => {
  describe('identity', () => {
    it('rebuilds from a stored token and what toJSON gave', () => {
      const value = ConnectSession.fromToken(TOKEN, INFO);
      expect(value.toJSON()).toEqual(INFO);
      expect(value.expiresAt).toEqual(new Date(INFO.expiresAt));
    });

    it('refuses a token that is not a session token', () => {
      expect(() => ConnectSession.fromToken('prk_0123456789abcdef.x', INFO)).toThrow(/stk_/);
    });

    it('never shows the token when stored, printed or listed', () => {
      const { session: value } = session({});
      expect(JSON.stringify(value)).not.toContain('zyxwvuts');
      expect(Object.keys(value)).toEqual(['id', 'userId', 'expiresAt', 'plugins']);
      expect(JSON.stringify(Object.values(value))).not.toContain('zyxwvuts');
    });

    it('cannot be renewed when it was not created by ConnectClient', () => {
      const { session: value } = session({});
      expect(() => value.refresh()).toThrow(/cannot be renewed/);
    });
  });

  describe('mcp', () => {
    const routes = {
      'GET /v1/sync': json(
        manifest([
          entry('alpha', [mcp()]),
          entry('beta', [
            mcp({
              componentId: 'cmp_2',
              serverName: 'beta-db',
              ready: false,
              setup: { kind: 'connect' },
            }),
          ]),
        ]),
      ),
    };

    it('lists every server with the session token in its headers', async () => {
      const { session: value } = session(routes);
      const servers = await value.mcp();
      expect(servers.map((server) => server.name)).toEqual(['alpha-search', 'beta-db']);
      expect(servers[0]?.headers).toEqual({ Authorization: `Bearer ${TOKEN}` });
      expect(servers[1]).toMatchObject({ ready: false, setup: { kind: 'connect' } });
    });

    it('narrows to one plugin by name or id', async () => {
      const { session: value } = session(routes);
      expect((await value.mcp({ plugin: 'beta' })).map((s) => s.name)).toEqual(['beta-db']);
      expect((await value.mcp({ plugin: 'plg_alpha' })).map((s) => s.name)).toEqual([
        'alpha-search',
      ]);
    });

    it('raises with the setup when a server is not ready and that was required', async () => {
      const { session: value } = session(routes);
      const error = await value
        .mcp({ plugin: 'beta', requireReady: true })
        .catch((e: unknown) => e);
      expect(error).toBeInstanceOf(ConnectSetupRequiredError);
      expect((error as ConnectSetupRequiredError).setup).toEqual({ kind: 'connect' });
    });

    it('gives nothing when the manifest has not changed', async () => {
      const { session: value } = session({ 'GET /v1/sync': empty(304) });
      expect(await value.mcp()).toEqual([]);
    });
  });

  describe('authorize', () => {
    const connections = (...items: unknown[]) => json({ items, nextCursor: null });
    const active = { id: 'ucn_1', componentId: 'cmp_1', status: 'active' };

    it('starts with a component id and waits until the sign-in shows up', async () => {
      const {
        session: value,
        calls,
        sleep,
      } = session({
        'POST /v1/session/connections': json({ redirectUrl: 'https://login.test/go' }),
        'GET /v1/session/connections': [connections(), connections(), connections(active)],
      });
      const request = await value.authorize('cmp_1', { callbackUrl: 'https://host.test/back' });
      expect(request.redirectUrl).toBe('https://login.test/go');
      expect(calls[0]?.body).toEqual({
        componentId: 'cmp_1',
        callbackUrl: 'https://host.test/back',
      });
      expect((await request.waitForConnection({ pollIntervalMs: 10 })).id).toBe('ucn_1');
      expect(sleep).toHaveBeenCalledTimes(2);
    });

    it('finds the component by the name of the server', async () => {
      const { session: value, calls } = session({
        'GET /v1/sync': json(manifest([entry('alpha', [mcp()])])),
        'POST /v1/session/connections': json({ redirectUrl: 'https://login.test/go' }),
      });
      await value.authorize('alpha-search', { callbackUrl: 'https://host.test/back' });
      expect(calls[1]?.body).toMatchObject({ componentId: 'cmp_1' });
    });

    it('says so when no server has that name', async () => {
      const { session: value } = session({ 'GET /v1/sync': json(manifest([])) });
      await expect(
        value.authorize('nope', { callbackUrl: 'https://h.test' }),
      ).rejects.toBeInstanceOf(ConnectNotFoundError);
    });

    it('says so when the manifest has not changed and no server can be named', async () => {
      const { session: value } = session({ 'GET /v1/sync': empty(304) });
      await expect(
        value.authorize('nope', { callbackUrl: 'https://h.test' }),
      ).rejects.toMatchObject({ code: 'not_found' });
    });

    it('stops waiting at the time limit and ignores a sign-in that needs another', async () => {
      const { session: value } = session({
        'POST /v1/session/connections': json({ redirectUrl: 'https://login.test/go' }),
        'GET /v1/session/connections': connections({ ...active, status: 'needs_reauth' }),
      });
      const request = await value.authorize('cmp_1', { callbackUrl: 'https://h.test' });
      await expect(
        request.waitForConnection({ timeoutMs: 5, pollIntervalMs: 10 }),
      ).rejects.toMatchObject({ code: 'connection_timeout' });
    });
  });

  describe('plugins and the catalog', () => {
    const USER_PLUGIN = {
      pluginId: 'plg_1',
      mcp: [
        {
          componentId: 'cmp_1',
          serverName: 'alpha-search',
          authConfigId: null,
          authMode: 'oauth_dcr',
          setup: { kind: 'connect' },
          ready: false,
        },
      ],
    };

    it('lists the plugins and what their servers need', async () => {
      const { session: value } = session({
        'GET /v1/session/plugins': json({ items: [USER_PLUGIN], nextCursor: null }),
      });
      expect(await value.plugins.list()).toHaveLength(1);
      expect(await value.authConfigs()).toEqual([
        {
          pluginId: 'plg_1',
          componentId: 'cmp_1',
          serverName: 'alpha-search',
          authConfigId: null,
          authMode: 'oauth_dcr',
          setup: { kind: 'connect' },
          ready: false,
        },
      ]);
    });

    it('installs, updates, removes and sets variables', async () => {
      const { session: value, calls } = session({
        'PUT /v1/session/plugins/plg_1': json({ pluginId: 'plg_1' }, 201),
        'DELETE /v1/session/plugins/plg_1': empty(),
        'PUT /v1/session/plugins/plg_1/variables': json(USER_PLUGIN),
      });
      await value.plugins.install('plg_1');
      await value.plugins.update('plg_1', { versionId: 'pv_2' });
      await value.plugins.remove('plg_1');
      await value.plugins.setVariables('plg_1', { TOKEN: 'x' });
      expect(calls.map((call) => call.body)).toEqual([
        {},
        { versionId: 'pv_2' },
        undefined,
        { values: { TOKEN: 'x' } },
      ]);
    });

    it('searches the catalog the user may install from', async () => {
      const { session: value, calls } = session({
        'GET /v1/session/catalog': json({ items: [], total: 0, page: 1, pageSize: 25 }),
      });
      await value.catalog({ q: 'git', featured: false });
      expect(calls[0]?.url.search).toBe('?q=git&featured=false');
    });
  });

  describe('manifest', () => {
    it('sends the filters and the last revision', async () => {
      const { session: value, calls } = session({ 'GET /v1/sync': json(manifest([])) });
      const result = await value.manifest({
        revision: 'rev0',
        kinds: ['skill', 'rule'],
        plugins: ['alpha'],
      });
      expect(result).toMatchObject({ revision: 'rev1' });
      expect(calls[0]?.url.search).toBe('?kinds=skill%2Crule&plugins=alpha');
      expect(calls[0]?.headers['if-none-match']).toBe('"rev0"');
    });

    it('answers notModified when the revision is current', async () => {
      const { session: value } = session({ 'GET /v1/sync': empty(304) });
      expect(await value.manifest({ revision: 'rev1' })).toEqual({ notModified: true });
    });
  });

  describe('component', () => {
    const archive = archiveOf({ 'SKILL.md': 'hello' });

    it('returns the bytes when hash and size match', async () => {
      const { session: value } = session({
        [`GET /v1/sync/components/${archive.sha256}`]: bytes(archive.data, 200, {
          'content-length': String(archive.data.length),
        }),
      });
      expect(await value.component(archive.sha256)).toEqual(new Uint8Array(archive.data));
    });

    it('refuses bytes that do not match the hash, without retrying', async () => {
      const { session: value, calls } = session({
        [`GET /v1/sync/components/${archive.sha256}`]: bytes(new Uint8Array([1, 2, 3])),
      });
      await expect(value.component(archive.sha256)).rejects.toBeInstanceOf(ConnectIntegrityError);
      expect(calls).toHaveLength(1);
    });

    it('refuses a size that differs from the announced one', async () => {
      const { session: value } = session({
        [`GET /v1/sync/components/${archive.sha256}`]: bytes(archive.data, 200, {
          'content-length': '3',
        }),
      });
      await expect(value.component(archive.sha256)).rejects.toMatchObject({
        code: 'integrity_size',
      });
    });
  });

  describe('report', () => {
    it('sends what was placed', async () => {
      const { session: value, calls } = session({ 'POST /v1/sync/reports': empty() });
      await value.report({ applied: [{ componentId: 'cmp_1', sha256: 'a'.repeat(64) }] });
      expect(calls[0]?.body).toEqual({
        applied: [{ componentId: 'cmp_1', sha256: 'a'.repeat(64) }],
        skipped: [],
      });
    });
  });
});
