import { describe, expect, it, vi } from 'vitest';
import {
  ConnectAuthError,
  ConnectError,
  ConnectNotFoundError,
  ConnectRateLimitError,
  redact,
} from './errors.js';
import { allPages, checkBaseUrl, checkUserId, Http, retryAfterOf } from './http.js';
import { empty, failure, fakeFetch, json } from './test-support.js';

const KEY = 'prk_0123456789abcdef.' + 'abcdefghijklmnopqrstuvwxyz012345';

function client(
  routes: Parameters<typeof fakeFetch>[0],
  sleep = vi.fn<(ms: number) => Promise<void>>(async () => {}),
) {
  const fake = fakeFetch(routes);
  const http = new Http({ baseUrl: 'https://api.test/', token: KEY, fetch: fake.fetch, sleep });
  return { http, sleep, ...fake };
}

describe('Http', () => {
  it('sends the bearer token, the query and a JSON body', async () => {
    const { http, calls } = client({ 'POST /v1/x': json({ ok: true }, 201) });
    await http.json('POST', '/v1/x', { query: { a: 1, b: undefined, c: 'z' }, body: { n: 1 } });
    expect(calls[0]?.url.href).toBe('https://api.test/v1/x?a=1&c=z');
    expect(calls[0]?.headers['authorization']).toBe(`Bearer ${KEY}`);
    expect(calls[0]?.headers['content-type']).toBe('application/json');
    expect(calls[0]?.body).toEqual({ n: 1 });
  });

  it('gives undefined for an answer with no body', async () => {
    const { http } = client({ 'DELETE /v1/x': empty() });
    expect(await http.json('DELETE', '/v1/x')).toBeUndefined();
  });

  it.each([
    [401, ConnectAuthError],
    [403, ConnectAuthError],
    [404, ConnectNotFoundError],
    [500, ConnectError],
  ])('maps status %i to its error class', async (status, kind) => {
    const { http } = client({ 'DELETE /v1/x': failure(status, 'some_code', 'Message') });
    const error = await http.json('DELETE', '/v1/x').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(kind);
    expect(error).toMatchObject({ code: 'some_code', status, requestId: 'req_1' });
  });

  it('uses the status when the answer has no JSON body', async () => {
    const { http } = client({ 'DELETE /v1/x': new Response('<html>', { status: 400 }) });
    await expect(http.json('DELETE', '/v1/x')).rejects.toMatchObject({
      code: 'http_400',
      status: 400,
    });
  });

  it('carries the wait of a rate limit', async () => {
    const answer = json({ error: { code: 'rate_limited', message: 'Slow', requestId: 'r' } }, 429, {
      'retry-after': '7',
    });
    const { http } = client({ 'POST /v1/x': answer });
    const error = (await http
      .json('POST', '/v1/x')
      .catch((e: unknown) => e)) as ConnectRateLimitError;
    expect(error).toBeInstanceOf(ConnectRateLimitError);
    expect(error.retryAfterSeconds).toBe(7);
  });

  it('retries a read on 503, 502 and 429 and honours Retry-After', async () => {
    const { http, calls, sleep } = client({
      'GET /v1/x': [
        failure(503, 'service_unavailable'),
        json({ error: { code: 'rate_limited', message: 'm', requestId: 'r' } }, 429, {
          'retry-after': '2',
        }),
        failure(502, 'bad_gateway'),
        json({ ok: 1 }),
      ],
    });
    expect(await http.json('GET', '/v1/x')).toEqual({ ok: 1 });
    expect(calls).toHaveLength(4);
    expect(sleep.mock.calls.map((call) => call[0])).toEqual([250, 2000, 1000]);
  });

  it('gives up after three retries', async () => {
    const { http, calls } = client({ 'GET /v1/x': failure(503, 'service_unavailable') });
    await expect(http.json('GET', '/v1/x')).rejects.toMatchObject({ status: 503 });
    expect(calls).toHaveLength(4);
  });

  it('retries a read after a network error, then reports it', async () => {
    const { http, calls } = client({ 'GET /v1/x': new Error('socket hang up') });
    await expect(http.json('GET', '/v1/x')).rejects.toMatchObject({
      code: 'network_error',
      status: 0,
    });
    expect(calls).toHaveLength(4);
  });

  it('never retries a POST', async () => {
    const { http, calls } = client({ 'POST /v1/x': failure(503, 'service_unavailable') });
    await expect(http.json('POST', '/v1/x', { body: {} })).rejects.toMatchObject({ status: 503 });
    expect(calls).toHaveLength(1);
  });

  it('retries a POST that carries an idempotency key, with the same key each time', async () => {
    const { http, calls } = client({
      'POST /v1/x': [failure(503, 'service_unavailable'), new Error('reset'), json({ ok: true })],
    });
    expect(await http.json('POST', '/v1/x', { body: {}, idempotencyKey: true })).toEqual({
      ok: true,
    });
    const keys = calls.map((call) => call.headers['idempotency-key']);
    expect(keys).toHaveLength(3);
    expect(new Set(keys).size).toBe(1);
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('uses the key it is given and refuses one the API would not accept', async () => {
    const { http, calls } = client({ 'POST /v1/x': json({}) });
    await http.json('POST', '/v1/x', { body: {}, idempotencyKey: 'my-key-1' });
    expect(calls[0]?.headers['idempotency-key']).toBe('my-key-1');
    for (const bad of ['', 'has space', 'é', 'k'.repeat(256)]) {
      await expect(http.json('POST', '/v1/x', { idempotencyKey: bad })).rejects.toMatchObject({
        code: 'invalid_idempotency_key',
      });
    }
    expect(calls).toHaveLength(1);
  });

  it('retries a PUT and a DELETE, which can be repeated safely', async () => {
    const { http, calls } = client({
      'PUT /v1/y': [failure(503, 'service_unavailable'), json({ ok: true })],
      'DELETE /v1/z': [new Error('reset'), empty()],
    });
    expect(await http.json('PUT', '/v1/y', { body: {} })).toEqual({ ok: true });
    expect(await http.json('DELETE', '/v1/z')).toBeUndefined();
    expect(calls).toHaveLength(4);
  });

  it('follows the retry settings, and 0 retries turns retrying off', async () => {
    const sleeps: number[] = [];
    const fake = fakeFetch({ 'GET /v1/x': failure(503, 'service_unavailable') });
    const http = new Http({
      baseUrl: 'https://api.test',
      token: KEY,
      fetch: fake.fetch,
      sleep: async (ms) => void sleeps.push(ms),
      retry: { maxRetries: 2, backoffMs: 100, maxWaitMs: 150 },
    });
    await expect(http.json('GET', '/v1/x')).rejects.toMatchObject({ status: 503 });
    expect(fake.calls).toHaveLength(3);
    expect(sleeps).toEqual([100, 150]);

    const off = fakeFetch({ 'GET /v1/x': failure(503, 'service_unavailable') });
    const once = new Http({
      baseUrl: 'https://api.test',
      token: KEY,
      fetch: off.fetch,
      retry: { maxRetries: 0 },
    });
    await expect(once.json('GET', '/v1/x')).rejects.toMatchObject({ status: 503 });
    expect(off.calls).toHaveLength(1);
  });

  it('rejects settings that are not numbers of 0 or more', () => {
    for (const retry of [{ maxRetries: -1 }, { backoffMs: Number.NaN }]) {
      expect(() => new Http({ baseUrl: 'https://api.test', token: KEY, retry })).toThrow(
        expect.objectContaining({ code: 'invalid_option' }),
      );
    }
    expect(() => new Http({ baseUrl: 'https://api.test', token: KEY, timeoutMs: -5 })).toThrow(
      expect.objectContaining({ code: 'invalid_option' }),
    );
  });

  it('stops at once, without a retry, when the caller cancels', async () => {
    const controller = new AbortController();
    const fake = fakeFetch({ 'GET /v1/x': failure(503, 'service_unavailable') });
    const http = new Http({
      baseUrl: 'https://api.test',
      token: KEY,
      fetch: fake.fetch,
      signal: controller.signal,
      sleep: async () => controller.abort(),
    });
    await expect(http.json('GET', '/v1/x')).rejects.toMatchObject({ code: 'aborted', status: 0 });
    expect(fake.calls).toHaveLength(1);

    const before = new AbortController();
    before.abort();
    const never = new Http({
      baseUrl: 'https://api.test',
      token: KEY,
      fetch: fake.fetch,
      signal: before.signal,
    });
    await expect(never.json('GET', '/v1/x')).rejects.toMatchObject({ code: 'aborted' });
    expect(fake.calls).toHaveLength(1);
  });

  it('turns an answer that is not JSON into an error of the API', async () => {
    const { http } = client({ 'GET /v1/x': new Response('<html>', { status: 200 }) });
    await expect(http.json('GET', '/v1/x')).rejects.toMatchObject({
      code: 'invalid_response',
      status: 200,
    });
  });

  it('accepts https and loopback http only, and no credentials in the address', () => {
    for (const ok of [
      'https://api.test',
      'http://localhost:3000',
      'http://127.0.0.1:1',
      'http://[::1]:1',
    ]) {
      expect(() => checkBaseUrl(ok)).not.toThrow();
    }
    for (const bad of ['http://api.test', 'ftp://x', 'not a url', 'https://u:p@api.test']) {
      expect(() => checkBaseUrl(bad)).toThrow(
        expect.objectContaining({ code: 'invalid_base_url' }),
      );
    }
    expect(() => checkBaseUrl('http://api.test', true)).not.toThrow();
  });

  it('checks a user id has 1 to 255 characters', () => {
    expect(() => checkUserId('a'.repeat(255))).not.toThrow();
    for (const bad of ['', 'a'.repeat(256)]) {
      expect(() => checkUserId(bad)).toThrow(expect.objectContaining({ code: 'invalid_user_id' }));
    }
  });

  it('does not retry a 404 or a 401', async () => {
    const { http, calls } = client({ 'GET /v1/x': failure(404, 'not_found') });
    await expect(http.json('GET', '/v1/x')).rejects.toBeInstanceOf(ConnectNotFoundError);
    expect(calls).toHaveLength(1);
  });

  it('stops a call that takes longer than the timeout', async () => {
    const fake = fakeFetch({});
    const slow = ((_url: string, init?: RequestInit) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
      })) as unknown as typeof fetch;
    const http = new Http({
      baseUrl: 'https://api.test',
      token: KEY,
      fetch: slow,
      timeoutMs: 5,
      sleep: async () => {},
    });
    await expect(http.json('POST', '/v1/x')).rejects.toMatchObject({ code: 'network_error' });
    expect(fake.calls).toHaveLength(0);
  });

  it('never puts a key in an error message', async () => {
    const { http } = client({
      'POST /v1/x': failure(400, 'validation_failed', `bad key ${KEY} given`),
    });
    const error = (await http.json('POST', '/v1/x').catch((e: unknown) => e)) as Error;
    expect(error.message).not.toContain('abcdefghijklmnopqrstuvwxyz012345');
    expect(error.message).toContain('prk_0123456789abcdef');
  });

  it('follows the cursor through every page', async () => {
    const { http, calls } = client({
      'GET /v1/list': [
        json({ items: [1, 2], nextCursor: 'c1' }),
        json({ items: [3], nextCursor: null }),
      ],
    });
    expect(await allPages<number>(http, '/v1/list', { userId: 'u' })).toEqual([1, 2, 3]);
    expect(calls[0]?.url.search).toBe('?userId=u&limit=100');
    expect(calls[1]?.url.searchParams.get('cursor')).toBe('c1');
  });
});

describe('retryAfterOf', () => {
  it.each([
    ['3', 3],
    [' 12 ', 12],
    ['Wed, 21 Oct 2026 07:28:00 GMT', undefined],
    ['-1', undefined],
    [null, undefined],
  ])('reads %s as %s', (value, expected) => {
    expect(retryAfterOf(value)).toBe(expected);
  });
});

describe('redact', () => {
  it('keeps the key id and drops the secret', () => {
    expect(redact(`x ${KEY} y`)).toBe('x prk_0123456789abcdef.[redacted] y');
  });

  it.each(['fyk', 'plk', 'ptk', 'prk', 'stk'])('covers the %s prefix', (prefix) => {
    expect(redact(`${prefix}_0123456789abcdef.${'a'.repeat(30)}`)).toContain('[redacted]');
  });
});
