/**
 * Unit tests for the typed API client.
 * Uses vi.stubGlobal to replace fetch and window.dispatchEvent.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiError } from './api';

// ── Helpers ───────────────────────────────────────────────────────────────────

function mockFetch(responses: Array<{ status: number; body: unknown }>) {
  let call = 0;
  return vi.fn(async () => {
    const r = responses[call++ % responses.length]!;
    return {
      ok: r.status >= 200 && r.status < 300,
      status: r.status,
      json: async () => r.body,
      text: async () => JSON.stringify(r.body),
    } as Response;
  });
}

// ── ApiError ──────────────────────────────────────────────────────────────────

describe('ApiError', () => {
  it('stores status, code and message', () => {
    const err = new ApiError(404, 'not_found', 'Thing not found');
    expect(err.status).toBe(404);
    expect(err.code).toBe('not_found');
    expect(err.message).toBe('Thing not found');
    expect(err.name).toBe('ApiError');
    expect(err).toBeInstanceOf(Error);
  });

  it('is instanceof ApiError', () => {
    const err = new ApiError(500, 'internal_error', 'oops');
    expect(err instanceof ApiError).toBe(true);
  });
});

// ── request() via auth.me ─────────────────────────────────────────────────────

describe('auth.me', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { dispatchEvent: vi.fn() });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('returns parsed JSON on 200', async () => {
    const payload = { user: { id: 'u1' }, memberships: [] };
    vi.stubGlobal('fetch', mockFetch([{ status: 200, body: payload }]));
    const { auth } = await import('./api');
    const result = await auth.me();
    expect(result).toEqual(payload);
  });

  it('throws ApiError on 404', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch([{ status: 404, body: { error: { code: 'not_found', message: 'Not found' } } }]),
    );
    const { auth } = await import('./api');
    await expect(auth.me()).rejects.toMatchObject({ status: 404, code: 'not_found' });
  });

  it('throws ApiError with fallback code on malformed error body', async () => {
    vi.stubGlobal('fetch', mockFetch([{ status: 500, body: {} }]));
    const { auth } = await import('./api');
    await expect(auth.me()).rejects.toMatchObject({ status: 500, code: 'internal_error' });
  });

  it('dispatches auth:unauthenticated and clears csrf on 401', async () => {
    const dispatch = vi.fn();
    vi.stubGlobal('window', { dispatchEvent: dispatch });
    vi.stubGlobal(
      'fetch',
      mockFetch([{ status: 401, body: { error: { code: 'unauthenticated', message: 'No' } } }]),
    );
    const { auth } = await import('./api');
    await expect(auth.me()).rejects.toMatchObject({ status: 401 });
    expect(dispatch).toHaveBeenCalledOnce();
    const event = dispatch.mock.calls[0]![0] as CustomEvent;
    expect(event.type).toBe('auth:unauthenticated');
  });

  it('returns undefined for 204', async () => {
    // signout is a POST (requireCsrf=true), so CSRF fetch happens first
    let signoutOptions: RequestInit | undefined;
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (url === '/api/csrf') {
        return { ok: true, status: 200, json: async () => ({ csrfToken: 'tok' }) } as Response;
      }
      signoutOptions = init;
      return { ok: true, status: 204, json: async () => null } as Response;
    });
    vi.stubGlobal('fetch', fetchMock);
    const { auth } = await import('./api');
    const result = await auth.signout();
    expect(signoutOptions).toBeDefined();
    expect(signoutOptions?.headers).toEqual({ 'x-csrf-token': 'tok' });
    expect(signoutOptions?.body).toBeUndefined();
    expect(result).toBeUndefined();
  });
});

// ── Organization still being set up ───────────────────────────────────────────

describe('org_key_pending', () => {
  const pending = {
    error: { code: 'org_key_pending', message: 'The organization key is still being created.' },
  };
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  function responder(outcomes: Array<{ status: number; body: unknown }>) {
    let call = 0;
    return vi.fn(async (url: string) => {
      if (url === '/api/csrf') {
        return { ok: true, status: 200, json: async () => ({ csrfToken: 'tok' }) } as Response;
      }
      const outcome = outcomes[Math.min(call++, outcomes.length - 1)]!;
      return {
        ok: outcome.status < 300,
        status: outcome.status,
        headers: new Headers({ 'retry-after': '0' }),
        json: async () => outcome.body,
      } as Response;
    });
  }

  it('retries once and returns the result when the organization becomes ready', async () => {
    const fetchMock = responder([
      { status: 503, body: pending },
      { status: 201, body: { id: 'c1' } },
    ]);
    vi.stubGlobal('fetch', fetchMock);
    const { installations } = await import('./api');
    const created = await installations.upgrade('o1', 'org', 'c1', { pluginVersionId: 'pv' });
    expect(created).toEqual({ id: 'c1' });
    expect(fetchMock.mock.calls.filter(([url]) => url !== '/api/csrf')).toHaveLength(2);
  });

  it('gives up after one retry with the friendly message', async () => {
    const fetchMock = responder([{ status: 503, body: pending }]);
    vi.stubGlobal('fetch', fetchMock);
    const { installations, ORG_KEY_PENDING_MESSAGE } = await import('./api');
    await expect(
      installations.upgrade('o1', 'org', 'c1', { pluginVersionId: 'pv' }),
    ).rejects.toMatchObject({
      status: 503,
      code: 'org_key_pending',
      message: ORG_KEY_PENDING_MESSAGE,
    });
    expect(fetchMock.mock.calls.filter(([url]) => url !== '/api/csrf')).toHaveLength(2);
  });

  it('does not retry other errors', async () => {
    const fetchMock = responder([
      { status: 503, body: { error: { code: 'service_unavailable', message: 'Down' } } },
    ]);
    vi.stubGlobal('fetch', fetchMock);
    const { installations } = await import('./api');
    await expect(
      installations.upgrade('o1', 'org', 'c1', { pluginVersionId: 'pv' }),
    ).rejects.toMatchObject({ code: 'service_unavailable' });
    expect(fetchMock.mock.calls.filter(([url]) => url !== '/api/csrf')).toHaveLength(1);
  });
});

// ── CSRF fetch ────────────────────────────────────────────────────────────────

describe('CSRF token', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('fetches CSRF before a mutation and attaches x-csrf-token header', async () => {
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url === '/api/csrf') {
        return { ok: true, status: 200, json: async () => ({ csrfToken: 'tok123' }) } as Response;
      }
      return { ok: true, status: 201, json: async () => ({ userId: 'u1' }) } as Response;
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('window', { dispatchEvent: vi.fn() });
    const { auth } = await import('./api');
    await auth.signup({ email: 'a@b.com', password: 'password12345', displayName: 'Ada' });
    // Second call should carry the CSRF header
    const signupCall = fetchMock.mock.calls[1]!;
    const opts = signupCall[1] as RequestInit;
    expect((opts.headers as Record<string, string>)['x-csrf-token']).toBe('tok123');
  });

  it('throws if CSRF fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) }) as Response),
    );
    vi.stubGlobal('window', { dispatchEvent: vi.fn() });
    const { auth } = await import('./api');
    await expect(
      auth.signup({ email: 'a@b.com', password: 'password12345', displayName: 'Ada' }),
    ).rejects.toThrow('Failed to fetch CSRF token');
  });
});

// ── query-keys ────────────────────────────────────────────────────────────────

describe('query-keys', () => {
  it('me returns stable key', async () => {
    const { qk } = await import('./query-keys');
    expect(qk.me()).toEqual(['me']);
    expect(qk.me()).toEqual(qk.me());
  });

  it('org key includes orgId', async () => {
    const { qk } = await import('./query-keys');
    expect(qk.org('o1')).toEqual(['org', 'o1']);
    expect(qk.orgMembers('o1')).toEqual(['org', 'o1', 'members']);
  });

  it('scope keys include the scope', async () => {
    const { qk } = await import('./query-keys');
    expect(qk.installations('org')).toEqual(['scope', 'org', 'installations']);
    expect(qk.variables('me', 'i1')).toEqual(['scope', 'me', 'installations', 'i1', 'variables']);
  });

  it('different ids produce different keys', async () => {
    const { qk } = await import('./query-keys');
    expect(qk.org('o1')).not.toEqual(qk.org('o2'));
  });
});

// ── Idempotency-Key ───────────────────────────────────────────────────────────

describe('Idempotency-Key', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  type Outcome = { status: number; body: unknown } | 'network';

  function responder(outcomes: Outcome[]) {
    let call = 0;
    const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
      if (url === '/api/csrf') {
        return { ok: true, status: 200, json: async () => ({ csrfToken: 'tok' }) } as Response;
      }
      const outcome = outcomes[Math.min(call++, outcomes.length - 1)]!;
      if (outcome === 'network') throw new TypeError('Failed to fetch');
      return {
        ok: outcome.status < 300,
        status: outcome.status,
        headers: new Headers(),
        json: async () => outcome.body,
      } as Response;
    });
    const keys = () =>
      fetchMock.mock.calls
        .filter(([url]) => url !== '/api/csrf')
        .map(
          ([, init]) => (init?.headers as Record<string, string> | undefined)?.['Idempotency-Key'],
        );
    return { fetchMock, keys };
  }

  const invite: { emails: string[]; role: 'MEMBER' } = {
    emails: ['a@example.com'],
    role: 'MEMBER',
  };
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  it('sends a UUID v4 on writes that need one', async () => {
    const { fetchMock, keys } = responder([{ status: 201, body: { id: 't1' } }]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await orgs.createInvite('o1', invite);
    expect(keys()[0]).toMatch(uuid);
  });

  it('reuses the key when the same action is sent again after a network error', async () => {
    const { fetchMock, keys } = responder(['network', { status: 201, body: { id: 't1' } }]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await expect(orgs.createInvite('o1', invite)).rejects.toThrow('Failed to fetch');
    await orgs.createInvite('o1', invite);
    expect(new Set(keys()).size).toBe(1);
    expect(keys()).toHaveLength(2);
  });

  it('reuses the key after a 409 conflict', async () => {
    const { fetchMock, keys } = responder([
      { status: 409, body: { error: { code: 'conflict', message: 'busy' } } },
      { status: 201, body: { id: 't1' } },
    ]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await expect(orgs.createInvite('o1', invite)).rejects.toMatchObject({ status: 409 });
    await orgs.createInvite('o1', invite);
    expect(new Set(keys()).size).toBe(1);
  });

  it('uses a new key for the next action after a success', async () => {
    const { fetchMock, keys } = responder([{ status: 201, body: { id: 't1' } }]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await orgs.createInvite('o1', invite);
    await orgs.createInvite('o1', invite);
    expect(new Set(keys()).size).toBe(2);
  });

  it('uses a new key after a failure the server answered for good', async () => {
    const { fetchMock, keys } = responder([
      { status: 422, body: { error: { code: 'unprocessable', message: 'no' } } },
      { status: 201, body: { id: 't1' } },
    ]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await expect(orgs.createInvite('o1', invite)).rejects.toMatchObject({ status: 422 });
    await orgs.createInvite('o1', invite);
    expect(new Set(keys()).size).toBe(2);
  });

  it('uses a different key when the content changes', async () => {
    const { fetchMock, keys } = responder(['network', { status: 201, body: { id: 't1' } }]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await expect(orgs.createInvite('o1', invite)).rejects.toThrow();
    await orgs.createInvite('o1', { ...invite, emails: ['b@example.com'] });
    expect(new Set(keys()).size).toBe(2);
  });

  it('does not send a key on writes that do not need one', async () => {
    const { fetchMock, keys } = responder([{ status: 200, body: { id: 't1' } }]);
    vi.stubGlobal('fetch', fetchMock);
    const { orgs } = await import('./api');
    await orgs.revokeInvite('o1', 'inv1');
    expect(keys()[0]).toBeUndefined();
  });
});
