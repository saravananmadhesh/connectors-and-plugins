/**
 * Group O: Cancellation, timeout, retry
 * TypeScript SDK end-to-end cases for cancellation, timeout and retry. It uses the session "kate" (made here if group K did not run).
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/o-retry-cancel.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-o.json (this file alone).
 */
import { ConnectClient } from '../../../packages/sdk/dist/index.js';
import {
  BASE,
  state,
  uid,
  test,
  Expected,
  describe,
  ok,
  rejects,
  leaks,
  connect,
  sharedSession,
} from './lib.mjs';

const sessionK = await sharedSession('kate');

// Scenario: connect.withSignal(aborted signal).users.list(). Expected: aborted, no request.
await test('O1', 'withSignal: an aborted signal cancels the call', () =>
  rejects(() => connect.withSignal(AbortSignal.abort()).users.list(), { code: 'aborted' }),
);

// Scenario: session.withSignal(aborted).manifest(). Expected: aborted.
await test('O2', 'session.withSignal cancels too', () =>
  rejects(() => sessionK.withSignal(AbortSignal.abort()).manifest(), { code: 'aborted' }),
);

// Scenario: a fetch that answers 503 twice then passes through; users.list with backoffMs 10.
// Expected: success after 3 attempts.
await test('O3', 'GET is retried on 503', async () => {
  let calls = 0;
  const flaky = (url, init) =>
    ++calls <= 2 ? Promise.resolve(new Response('{}', { status: 503 })) : fetch(url, init);
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    fetch: flaky,
    retry: { backoffMs: 10 },
  });
  await c.users.list({ limit: 1 });
  ok(calls === 3, `calls ${calls}`);
  return { calls };
});

// Scenario: 429 with Retry-After: 1 then pass. Expected: waits about 1 s, then succeeds.
await test('O4', '429 honours Retry-After', async () => {
  let calls = 0;
  const limited = (url, init) =>
    ++calls === 1
      ? Promise.resolve(new Response('{}', { status: 429, headers: { 'retry-after': '1' } }))
      : fetch(url, init);
  const c = new ConnectClient({ apiKey: state.projectKey, baseUrl: BASE, fetch: limited });
  const t = Date.now();
  await c.plugins.list();
  const waited = Date.now() - t;
  ok(waited >= 900, `waited ${waited} ms`);
  return { calls, waited };
});

// Scenario: POST create with a fetch that fails once with a network error. Expected: retried with
// the same Idempotency-Key, one session made.
await test('O5', 'session create is retried with the same idempotency key', async () => {
  const keys = [];
  let calls = 0;
  const once = (url, init) => {
    keys.push(init.headers['idempotency-key']);
    return ++calls === 1 ? Promise.reject(new TypeError('fetch failed')) : fetch(url, init);
  };
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    fetch: once,
    retry: { backoffMs: 10 },
  });
  const s = await c.create(uid('o5'));
  ok(keys.length === 2 && keys[0] === keys[1], `keys ${keys}`);
  return { calls, id: s.id };
});

// Scenario: timeoutMs 1 with maxRetries 0. Expected: network_error (timed out), key not in message.
await test('O6', 'timeout gives network_error without the key', async () => {
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    timeoutMs: 1,
    retry: { maxRetries: 0 },
  });
  try {
    await c.usage();
  } catch (error) {
    ok(error.code === 'network_error', describe(error));
    ok(!leaks(error.message, state.projectKey), 'key in message');
    return describe(error);
  }
  throw new Expected('no timeout');
});

// Scenario: plugins:write removed... (a key without a scope) is covered by the console; here:
// a 403 maps to ConnectAuthError with code insufficient_scope — checked with the For You key on a
// project route in B3. Error objects carry requestId:
await test('O7', 'errors carry a requestId', async () => {
  try {
    await connect.sessions.get('pjs_00000000000000000000000000000000');
  } catch (error) {
    ok(
      typeof error.requestId === 'string' && error.requestId.length > 0,
      `requestId ${error.requestId}`,
    );
    return error.requestId;
  }
  throw new Expected('no error');
});
