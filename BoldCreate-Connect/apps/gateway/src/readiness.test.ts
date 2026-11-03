import { describe, expect, it, vi } from 'vitest';
import { createApiPing, createReadiness } from './readiness.js';

describe('createReadiness', () => {
  it('in api mode never touches the database', async () => {
    const pingApi = vi.fn<() => Promise<string>>(async () => 'api');
    const pingDatabase = vi.fn<() => Promise<string>>(async () => {
      throw new Error('database down');
    });
    const ready = createReadiness({ dataSource: 'api', pingApi, pingDatabase });
    await expect(ready()).resolves.toBe('api');
    expect(pingDatabase).not.toHaveBeenCalled();
  });

  it('in api mode is not ready when the api is not', async () => {
    const ready = createReadiness({
      dataSource: 'api',
      pingApi: async () => {
        throw new Error('api down');
      },
      pingDatabase: async () => 'db',
    });
    await expect(ready()).rejects.toThrow('api down');
  });

  it('in database mode checks the database', async () => {
    const pingApi = vi.fn<() => Promise<string>>(async () => 'api');
    const ready = createReadiness({
      dataSource: 'database',
      pingApi,
      pingDatabase: async () => 'db',
    });
    await expect(ready()).resolves.toBe('db');
    expect(pingApi).not.toHaveBeenCalled();
  });
});

describe('createApiPing', () => {
  it('resolves when the api answers 200 and asks for /healthz', async () => {
    const doFetch = vi.fn<() => Promise<Response>>(
      async () => new Response('{}', { status: 200 }),
    ) as unknown as typeof fetch;
    await expect(createApiPing('http://api:3001', doFetch)()).resolves.toBeUndefined();
    expect(vi.mocked(doFetch).mock.calls[0]?.[0]).toBe('http://api:3001/healthz');
  });

  it('rejects on a non-2xx answer', async () => {
    const doFetch = (async () => new Response('', { status: 503 })) as unknown as typeof fetch;
    await expect(createApiPing('http://api:3001', doFetch)()).rejects.toThrow('503');
  });

  it('rejects when the api cannot be reached', async () => {
    const doFetch = (async () => {
      throw new Error('ECONNREFUSED');
    }) as unknown as typeof fetch;
    await expect(createApiPing('http://api:3001', doFetch)()).rejects.toThrow('ECONNREFUSED');
  });
});
