import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConnectClient } from './connect-client.js';
import { ConnectError, ConnectNotFoundError } from './errors.js';
import { ConnectSession } from './session.js';
import { empty, failure, fakeFetch, json } from './test-support.js';

const KEY = 'prk_0123456789abcdef.' + 'abcdefghijklmnopqrstuvwxyz012345';
const TOKEN = 'stk_fedcba9876543210.' + 'zyxwvutsrqponmlkjihgfedcba012345';
const page = <T>(items: T[]) => json({ items, nextCursor: null });

const SESSION = {
  id: 'pjs_1',
  userId: 'u1',
  plugins: [],
  tools: {},
  authConfigs: [],
  status: 'active',
  createdAt: '2026-10-17T00:00:00.000Z',
  expiresAt: '2026-11-16T00:00:00.000Z',
  lastUsedAt: null,
  token: TOKEN,
};

function connect(routes: Parameters<typeof fakeFetch>[0]) {
  const fake = fakeFetch(routes);
  return {
    connect: new ConnectClient({ apiKey: KEY, baseUrl: 'https://api.test', fetch: fake.fetch }),
    ...fake,
  };
}

afterEach(() => vi.unstubAllGlobals());

describe('ConnectClient', () => {
  describe('construction', () => {
    it('needs a key', () => {
      expect(() => new ConnectClient({ apiKey: '' })).toThrow(ConnectError);
    });

    it('refuses a project key in a browser and accepts a session token', () => {
      vi.stubGlobal('window', {});
      vi.stubGlobal('document', {});
      expect(() => new ConnectClient({ apiKey: KEY })).toThrow(/stay on your server/);
      expect(() => new ConnectClient({ apiKey: TOKEN })).not.toThrow();
    });

    it('accepts a project key on a server', () => {
      expect(() => new ConnectClient({ apiKey: KEY })).not.toThrow();
    });

    it('shows no key when printed or stored', () => {
      const { connect: client } = connect({});
      expect(JSON.stringify(client)).not.toContain('abcdefghij');
      expect(String(client)).not.toContain('abcdefghij');
      expect(JSON.stringify(client)).toContain('https://api.test');
      expect(JSON.stringify(new ConnectClient({ apiKey: KEY }))).toContain(
        'https://api.boldcreate.com',
      );
    });
  });

  describe('safety checks', () => {
    it('refuses an address that would send the key in clear text', () => {
      expect(() => new ConnectClient({ apiKey: KEY, baseUrl: 'http://api.example.com' })).toThrow(
        expect.objectContaining({ code: 'invalid_base_url' }),
      );
      expect(
        () =>
          new ConnectClient({
            apiKey: KEY,
            baseUrl: 'http://api.example.com',
            allowInsecureHttp: true,
          }),
      ).not.toThrow();
    });

    it('refuses a user id of the wrong length and an empty plugin list', async () => {
      const { connect: client, calls } = connect({});
      await expect(client.create('')).rejects.toMatchObject({ code: 'invalid_user_id' });
      await expect(client.create('u1', { plugins: [] })).rejects.toMatchObject({
        code: 'invalid_plugins',
      });
      await expect(client.users.install('x'.repeat(256), 'plg_1')).rejects.toMatchObject({
        code: 'invalid_user_id',
      });
      expect(calls).toHaveLength(0);
    });

    it('cancels the calls of a client and of its sessions with a signal', async () => {
      const controller = new AbortController();
      const fake = fakeFetch({ 'POST /v1/project/sessions': json(SESSION, 201) });
      const client = new ConnectClient({
        apiKey: KEY,
        baseUrl: 'https://api.test',
        fetch: fake.fetch,
      }).withSignal(controller.signal);
      const session = await client.create('u1');
      controller.abort();
      await expect(client.users.list()).rejects.toMatchObject({ code: 'aborted' });
      await expect(session.catalog()).rejects.toMatchObject({ code: 'aborted' });
      expect(fake.calls).toHaveLength(1);
    });

    it('sends one idempotency key per creation, keeps it across a retry, and makes a new one to renew', async () => {
      const fake = fakeFetch({
        'POST /v1/project/sessions': [new Error('reset'), json(SESSION, 201), json(SESSION, 201)],
      });
      const client = new ConnectClient({
        apiKey: KEY,
        baseUrl: 'https://api.test',
        fetch: fake.fetch,
        retry: { backoffMs: 0 },
      });
      const session = await client.create('u1', { idempotencyKey: 'mine-1' });
      expect(fake.calls.map((c) => c.headers['idempotency-key'])).toEqual(['mine-1', 'mine-1']);
      expect(fake.calls[0]?.body).not.toHaveProperty('idempotencyKey');

      await session.refresh();
      const renewed = fake.calls[2]?.headers['idempotency-key'];
      expect(renewed).toMatch(/^[0-9a-f-]{36}$/);
    });

    it('lets one session carry its own signal', async () => {
      const { connect: client } = connect({ 'POST /v1/project/sessions': json(SESSION, 201) });
      const session = await client.create('u1');
      const controller = new AbortController();
      controller.abort();
      await expect(session.withSignal(controller.signal).catalog()).rejects.toMatchObject({
        code: 'aborted',
      });
      expect(session.withSignal(controller.signal).token).toBe(session.token);
    });
  });

  describe('create', () => {
    it('makes a session for a user with the options', async () => {
      const { connect: client, calls } = connect({
        'POST /v1/project/sessions': json(SESSION, 201),
      });
      const session = await client.create('u1', {
        plugins: ['alpha'],
        set: 'starter',
        expiresInSeconds: 3600,
        tools: { disableDestructive: true },
      });
      expect(calls[0]?.body).toEqual({
        userId: 'u1',
        plugins: ['alpha'],
        set: 'starter',
        expiresInSeconds: 3600,
        tools: { disableDestructive: true },
      });
      expect(session).toBeInstanceOf(ConnectSession);
      expect(session.id).toBe('pjs_1');
      expect(session.userId).toBe('u1');
      expect(session.expiresAt).toEqual(new Date('2026-11-16T00:00:00.000Z'));
    });

    it('keeps the token out of what is stored or printed', async () => {
      const { connect: client } = connect({ 'POST /v1/project/sessions': json(SESSION, 201) });
      const session = await client.create('u1');
      expect(JSON.stringify(session)).not.toContain('zyxwvuts');
      expect(session.toJSON()).toEqual({
        id: 'pjs_1',
        userId: 'u1',
        expiresAt: '2026-11-16T00:00:00.000Z',
      });
      expect(Object.keys(session)).not.toContain('token');
    });

    it('renews with the same options', async () => {
      const { connect: client, calls } = connect({
        'POST /v1/project/sessions': [json(SESSION, 201), json({ ...SESSION, id: 'pjs_2' }, 201)],
      });
      const first = await client.create('u1', { plugins: ['alpha'] });
      const second = await first.refresh();
      expect(second.id).toBe('pjs_2');
      expect(calls[1]?.body).toEqual(calls[0]?.body);
    });

    it('passes on a failure', async () => {
      const { connect: client } = connect({
        'POST /v1/project/sessions': failure(404, 'not_found'),
      });
      await expect(client.create('u1')).rejects.toBeInstanceOf(ConnectNotFoundError);
    });
  });

  describe('users', () => {
    const USER = { id: 'usr_1', userId: 'u1', displayName: 'Ada' };

    it('lists with the query', async () => {
      const { connect: client, calls } = connect({ 'GET /v1/project/users': page([USER]) });
      expect((await client.users.list({ search: 'a', limit: 5 })).items).toHaveLength(1);
      expect(calls[0]?.url.search).toBe('?search=a&limit=5');
    });

    it('sets a name through the body, never the path', async () => {
      const { connect: client, calls } = connect({ 'PUT /v1/project/users': json(USER) });
      await client.users.setName('u1', 'Ada');
      expect(calls[0]?.body).toEqual({ userId: 'u1', displayName: 'Ada' });
    });

    it('reads the plugins of a user across pages', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/user-plugins': [
          json({ items: [{ pluginId: 'plg_1' }], nextCursor: 'n' }),
          json({ items: [{ pluginId: 'plg_2' }], nextCursor: null }),
        ],
      });
      expect(await client.users.plugins('u1')).toHaveLength(2);
      expect(calls[0]?.url.searchParams.get('userId')).toBe('u1');
    });

    it('installs and uninstalls for a user', async () => {
      const { connect: client, calls } = connect({
        'PUT /v1/project/user-plugins/plg_1': json({ pluginId: 'plg_1' }, 201),
        'DELETE /v1/project/user-plugins/plg_1': empty(),
      });
      await client.users.install('u1', 'plg_1', { versionId: 'pv_2' });
      await client.users.uninstall('u1', 'plg_1');
      expect(calls[0]?.body).toEqual({ userId: 'u1', versionId: 'pv_2' });
      expect(calls[1]?.url.searchParams.get('userId')).toBe('u1');
    });
  });

  describe('sessions', () => {
    it('lists, gets and deletes', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/sessions': page([SESSION]),
        'GET /v1/project/sessions/pjs_1': json(SESSION),
        'DELETE /v1/project/sessions/pjs_1': empty(),
      });
      await client.sessions.list({ userId: 'u1' });
      expect((await client.sessions.get('pjs_1')).id).toBe('pjs_1');
      await client.sessions.delete('pjs_1');
      expect(calls[0]?.url.search).toBe('?userId=u1');
      expect(calls.map((call) => call.method)).toEqual(['GET', 'GET', 'DELETE']);
    });
  });

  describe('plugins and the catalog', () => {
    const PLUGIN = { pluginId: 'plg_1', name: 'alpha' };

    it('lists, adds, updates and removes a project plugin', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/plugins': page([PLUGIN]),
        'PUT /v1/project/plugins/plg_1': json(PLUGIN),
        'DELETE /v1/project/plugins/plg_1': empty(),
      });
      expect(await client.plugins.list()).toHaveLength(1);
      await client.plugins.add('plg_1');
      await client.plugins.update('plg_1', { versionId: 'pv_2' });
      await client.plugins.remove('plg_1');
      expect(calls[1]?.body).toEqual({});
      expect(calls[2]?.body).toEqual({ versionId: 'pv_2' });
    });

    it('adds a plugin with its auth configs and variables in the body, never in the URL', async () => {
      const { connect: client, calls } = connect({ 'PUT /v1/project/plugins/plg_1': json(PLUGIN) });
      const options = {
        authConfigs: {
          tool: { name: 'Shared', authMode: 'shared_secret' as const, secret: 's3cret-value' },
        },
        variables: { API_TOKEN: 'abc' },
      };
      await client.plugins.add('plg_1', options);
      expect(calls[0]?.body).toEqual(options);
      expect(calls[0]?.url.search).toBe('');
      expect(calls[0]?.url.href).not.toContain('s3cret-value');
    });

    it('searches the catalog with flags as text', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/catalog': json({ items: [], total: 0, page: 1, pageSize: 25 }),
      });
      await client.plugins.catalog({ q: 'git', featured: true, kind: 'mcp', page: 2 });
      expect(calls[0]?.url.search).toBe('?q=git&kind=mcp&page=2&featured=true');
    });

    it('reads and sets the install mode', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/user-install-mode': json({ mode: 'allowlist' }),
        'PUT /v1/project/user-install-mode': json({ mode: 'any' }),
      });
      expect(await client.catalog.mode()).toBe('allowlist');
      await client.catalog.setMode('any');
      expect(calls[1]?.body).toEqual({ mode: 'any' });
    });

    it('manages the allowed plugins', async () => {
      const { connect: client } = connect({
        'GET /v1/project/allowed-plugins': page([{ pluginId: 'plg_1' }]),
        'PUT /v1/project/allowed-plugins/plg_1': json({ pluginId: 'plg_1' }, 201),
        'DELETE /v1/project/allowed-plugins/plg_1': empty(),
      });
      expect(await client.catalog.allowed()).toHaveLength(1);
      await client.catalog.allow('plg_1');
      await client.catalog.disallow('plg_1');
    });

    it('manages plugin sets and their members', async () => {
      const SET = { id: 'pls_1', name: 'starter', plugins: [] };
      const { connect: client, calls } = connect({
        'GET /v1/project/plugin-sets': page([SET]),
        'POST /v1/project/plugin-sets': json(SET, 201),
        'PATCH /v1/project/plugin-sets/pls_1': json(SET),
        'DELETE /v1/project/plugin-sets/pls_1': empty(),
        'PUT /v1/project/plugin-sets/pls_1/plugins/plg_1': json(SET),
        'DELETE /v1/project/plugin-sets/pls_1/plugins/plg_1': empty(),
      });
      expect(await client.catalog.sets.list()).toHaveLength(1);
      await client.catalog.sets.create('starter');
      await client.catalog.sets.create('starter', ['plg_1']);
      await client.catalog.sets.update('pls_1', { name: 'main' });
      await client.catalog.sets.add('pls_1', 'plg_1');
      await client.catalog.sets.remove('pls_1', 'plg_1');
      await client.catalog.sets.delete('pls_1');
      expect(calls[1]?.body).toEqual({ name: 'starter' });
      expect(calls[2]?.body).toEqual({ name: 'starter', plugins: ['plg_1'] });
    });
  });

  describe('auth configs, connections, logs, usage', () => {
    it('lists auth configs and sets variables with null to remove', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/auth-configs': page([{ id: 'acf_1' }]),
        'PUT /v1/project/auth-configs/cmp_1/variables': json({ items: [], nextCursor: null }),
      });
      expect(await client.authConfigs.list()).toHaveLength(1);
      await client.authConfigs.setVariables('cmp_1', { API_TOKEN: 'x', OLD: null });
      expect(calls[1]?.body).toEqual({ values: { API_TOKEN: 'x', OLD: null } });
    });

    it('lists, starts and deletes connections', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/connections': page([{ id: 'ucn_1' }]),
        'POST /v1/project/connections': json({
          connectUrl: 'https://connect.test/c',
          expiresAt: '2026-10-17T01:00:00.000Z',
        }),
        'DELETE /v1/project/connections/ucn_1': empty(),
      });
      await client.connections.list({ userId: 'u1', componentId: 'cmp_1' });
      const started = await client.connections.start('u1', 'cmp_1', {
        callbackUrl: 'https://host.test/back',
      });
      await client.connections.delete('ucn_1');
      expect(started).toEqual({
        connectUrl: 'https://connect.test/c',
        expiresAt: new Date('2026-10-17T01:00:00.000Z'),
      });
      expect(calls[0]?.url.searchParams.get('userId')).toBe('u1');
      expect(calls[1]?.body).toEqual({
        userId: 'u1',
        componentId: 'cmp_1',
        callbackUrl: 'https://host.test/back',
      });
    });

    it('reads logs and usage with dates as text', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/logs': page([]),
        'GET /v1/project/usage': json({ from: '', to: '', days: [], topUsers: [] }),
      });
      const from = new Date('2026-10-01T00:00:00Z');
      await client.logs.list({ userId: 'u1', action: 'tool.call', from });
      await client.usage({ from, to: new Date('2026-10-17T00:00:00Z') });
      expect(calls[0]?.url.searchParams.get('from')).toBe('2026-10-01T00:00:00.000Z');
      expect(calls[0]?.url.searchParams.get('action')).toBe('tool.call');
      expect(calls[1]?.url.searchParams.get('to')).toBe('2026-10-17T00:00:00.000Z');
    });

    it('reads usage with no dates', async () => {
      const { connect: client, calls } = connect({
        'GET /v1/project/usage': json({ from: '', to: '', days: [], topUsers: [] }),
      });
      await client.usage();
      expect(calls[0]?.url.search).toBe('');
    });
  });
});
