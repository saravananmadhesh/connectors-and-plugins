import type { Logger } from 'pino';
import type * as DbModule from '@boldcreate-integrations/db';
import type * as DomainModule from '@boldcreate-integrations/domain';
import type * as ServersModule from './servers.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { createServerGuard } from './guard.js';

/** How many tenant transactions are open right now, and the most there were at once. */
const state = vi.hoisted(() => ({ open: 0, duringCall: -1 }));

vi.mock('@boldcreate-integrations/db', async (original) => ({
  ...(await original<typeof DbModule>()),
  withTenant: async (_db: unknown, _tenant: unknown, fn: (tx: unknown) => Promise<unknown>) => {
    state.open += 1;
    try {
      return await fn({});
    } finally {
      state.open -= 1;
    }
  },
}));

const session = vi.hoisted(() => ({
  callTool: vi.fn<(tool: string, args: unknown, timeout: number) => Promise<unknown>>(),
}));

vi.mock('@boldcreate-integrations/domain', async (original) => ({
  ...(await original<typeof DomainModule>()),
  resolveAccess: async () => ({
    ok: true,
    target: { url: 'https://upstream.test/mcp', headers: {} },
    authType: 'none',
    callTimeoutMs: null,
    serverName: 'github',
  }),
  openSession: async () => session,
}));

vi.mock('./servers.js', async (original) => ({
  ...(await original<typeof ServersModule>()),
  loadVisibleServers: async () => [
    {
      name: 'github',
      installationId: 'inst-1',
      componentId: 'comp-1',
      pluginName: 'plugin',
      authType: 'none',
      tools: [{ name: 'search', description: 'd', inputSchema: {} }],
      discovered: true,
    },
  ],
}));

const { callTool } = await import('./dispatch.js');

const principal = {
  kind: 'api_key',
  keyId: 'fyk_0123456789abcdef',
  orgId: 'org-1',
  scope: 'org',
  preset: 'agent',
  permissions: ['mcp:list', 'mcp:call'],
} as unknown as ApiKeyPrincipal;

const logger = {
  warn: vi.fn<() => void>(),
  error: vi.fn<() => void>(),
  info: vi.fn<() => void>(),
} as unknown as Logger;

function deps(maxTotalConcurrency: number) {
  return {
    db: {} as never,
    access: { fetcher: vi.fn<() => void>() } as never,
    guard: createServerGuard({
      maxConcurrency: 10,
      maxTotalConcurrency,
      failuresToOpen: 3,
      openMs: 1000,
    }),
    logger,
    appBaseUrl: 'https://app.test',
    resultMaxBytes: 100_000,
  };
}

beforeEach(() => {
  state.open = 0;
  state.duringCall = -1;
  session.callTool.mockReset();
});
afterEach(() => vi.clearAllMocks());

describe('callTool and the database', () => {
  it('holds no database transaction while the upstream call runs', async () => {
    session.callTool.mockImplementation(async () => {
      state.duringCall = state.open;
      return { content: [{ type: 'text', text: 'ok' }], isError: false };
    });
    const outcome = await callTool(deps(0), principal, 'github__search', {});
    expect(outcome).toMatchObject({ kind: 'result', outcome: 'ok' });
    expect(state.duringCall).toBe(0);
    expect(state.open).toBe(0);
  });

  it('holds no database transaction when the upstream call fails', async () => {
    session.callTool.mockImplementation(async () => {
      state.duringCall = state.open;
      throw new Error('boom');
    });
    const outcome = await callTool(deps(0), principal, 'github__search', {});
    expect(outcome).toMatchObject({ kind: 'result', outcome: 'error' });
    expect(state.duringCall).toBe(0);
    expect(state.open).toBe(0);
  });
});

describe('callTool and the pod-wide cap', () => {
  it('answers busy for a call over the cap and serves it once a call finishes', async () => {
    let finish: () => void = () => undefined;
    session.callTool.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = () => resolve({ content: [], isError: false });
        }),
    );
    session.callTool.mockResolvedValue({ content: [], isError: false });
    const shared = deps(1);
    const slow = callTool(shared, principal, 'github__search', {});
    await vi.waitFor(() => expect(session.callTool).toHaveBeenCalledTimes(1));

    const refused = await callTool(shared, principal, 'github__search', {});
    expect(refused).toMatchObject({ kind: 'result', outcome: 'busy' });
    expect(session.callTool).toHaveBeenCalledTimes(1);

    finish();
    await slow;
    const served = await callTool(shared, principal, 'github__search', {});
    expect(served).toMatchObject({ kind: 'result', outcome: 'ok' });
  });

  it('gives the slot back when the upstream call throws', async () => {
    session.callTool.mockRejectedValueOnce(new Error('boom'));
    session.callTool.mockResolvedValue({ content: [], isError: false });
    const shared = deps(1);
    await callTool(shared, principal, 'github__search', {});
    const next = await callTool(shared, principal, 'github__search', {});
    expect(next).toMatchObject({ outcome: 'ok' });
  });
});
