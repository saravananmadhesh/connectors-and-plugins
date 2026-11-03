import { describe, expect, it, vi } from 'vitest';
import { createRemoteLimitStore } from './remote-limit-store.js';

const reply = (values: Record<string, number>, ok = true) =>
  ({ ok, json: async () => ({ values }) }) as unknown as Response;

const headers = async () => ({ authorization: 'workload' });

describe('createRemoteLimitStore', () => {
  it('serves a stored value as global and a missing one as the built-in', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => reply({ pod_max_inflight: 300 }));
    const store = createRemoteLimitStore({
      apiBaseUrl: 'http://api',
      workloadHeaders: headers,
      fetch: fetchMock,
    });
    expect(await store.resolve('pod_max_inflight', {})).toMatchObject({
      limit: 300,
      source: 'global',
    });
    expect(await store.resolve('db_queue_max_depth', {})).toMatchObject({
      limit: 100,
      source: 'default',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe('http://api/v1/gateway/limits');
  });

  it('reads once for a burst and again after the interval', async () => {
    let at = 0;
    const fetchMock = vi.fn<typeof fetch>(async () => reply({}));
    const store = createRemoteLimitStore({
      apiBaseUrl: 'http://api',
      workloadHeaders: headers,
      fetch: fetchMock,
      ttlMs: 1000,
      now: () => at,
    });
    await Promise.all([
      store.resolve('pod_max_inflight', {}),
      store.resolve('pod_max_inflight', {}),
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    at = 1500;
    await store.resolve('pod_max_inflight', {});
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('keeps the last values when the api cannot be reached or answers badly', async () => {
    let at = 0;
    const answers = [
      async () => reply({ pod_max_inflight: 300 }),
      async () => {
        throw new Error('down');
      },
      async () => reply({}, false),
      async () => ({ ok: true, json: async () => ({ nope: 1 }) }) as unknown as Response,
    ];
    let i = 0;
    const store = createRemoteLimitStore({
      apiBaseUrl: 'http://api',
      workloadHeaders: headers,
      fetch: vi.fn<typeof fetch>(() => answers[Math.min(i++, answers.length - 1)]!()),
      ttlMs: 10,
      now: () => at,
    });
    for (let n = 0; n < 4; n += 1) {
      at += 20;
      expect(await store.resolve('pod_max_inflight', {})).toMatchObject({ limit: 300 });
    }
  });

  it('starts from the built-in value when the first read fails', async () => {
    const store = createRemoteLimitStore({
      apiBaseUrl: 'http://api',
      workloadHeaders: headers,
      fetch: vi.fn<typeof fetch>(async () => {
        throw new Error('down');
      }),
    });
    expect(await store.resolve('pod_max_inflight', {})).toMatchObject({
      limit: 200,
      source: 'default',
    });
  });

  it('reads again after invalidate', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => reply({}));
    const store = createRemoteLimitStore({
      apiBaseUrl: 'http://api',
      workloadHeaders: headers,
      fetch: fetchMock,
    });
    await store.resolve('pod_max_inflight', {});
    store.invalidate();
    await store.resolve('pod_max_inflight', {});
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
