import { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import type { Logger } from 'pino';
import { buildTestServer } from './testing.js';
import { createShutdown, listenForSignals } from './shutdown.js';

const logger = {
  info: vi.fn<() => void>(),
  warn: vi.fn<() => void>(),
  error: vi.fn<() => void>(),
} as unknown as Logger;
const deferred = <T = void>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
};

describe('createShutdown', () => {
  it('waits for the pre-drain, closes, then exits 0', async () => {
    const order: string[] = [];
    const exit = vi.fn<(code: number) => number>((code: number) => order.push(`exit ${code}`));
    const shutdown = createShutdown({
      predrainSeconds: 5,
      drainSeconds: 20,
      logger,
      exit,
      sleep: async (ms) => void order.push(`sleep ${ms}`),
      close: async () => void order.push('close'),
    });
    expect(shutdown.draining).toBe(false);
    await shutdown.handleSignal('SIGTERM');
    expect(shutdown.draining).toBe(true);
    expect(order).toEqual(['sleep 5000', 'close', 'exit 0']);
  });

  it('exits 1 when in-flight requests outlast the drain bound', async () => {
    const exit = vi.fn<(code: number) => void>();
    const shutdown = createShutdown({
      predrainSeconds: 0,
      drainSeconds: 0.02,
      logger,
      exit,
      sleep: async () => {},
      close: () => new Promise(() => {}),
    });
    await shutdown.handleSignal('SIGTERM');
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('exits 1 when closing fails', async () => {
    const exit = vi.fn<(code: number) => void>();
    const shutdown = createShutdown({
      predrainSeconds: 0,
      drainSeconds: 5,
      logger,
      exit,
      sleep: async () => {},
      close: async () => {
        throw new Error('close failed');
      },
    });
    await shutdown.handleSignal('SIGINT');
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('exits 1 at once on a second signal', async () => {
    const gate = deferred();
    const exit = vi.fn<(code: number) => void>();
    const shutdown = createShutdown({
      predrainSeconds: 5,
      drainSeconds: 20,
      logger,
      exit,
      sleep: () => gate.promise,
      close: async () => {},
    });
    const first = shutdown.handleSignal('SIGTERM');
    await shutdown.handleSignal('SIGTERM');
    expect(exit).toHaveBeenCalledExactlyOnceWith(1);
    gate.resolve();
    await first;
  });
});

describe('listenForSignals', () => {
  it('routes both signals and can be removed', () => {
    const source = new EventEmitter();
    const handler = vi.fn<() => void>();
    const remove = listenForSignals(source, handler);
    source.emit('SIGTERM');
    source.emit('SIGINT');
    expect(handler.mock.calls).toEqual([['SIGTERM'], ['SIGINT']]);
    remove();
    expect(source.listenerCount('SIGTERM')).toBe(0);
  });
});

describe('server drain', () => {
  it('fails readiness at once and lets an in-flight request finish', async () => {
    const signals = new EventEmitter();
    const sleepGate = deferred();
    const requestGate = deferred();
    const exit = vi.fn<(code: number) => void>();
    const hook = vi.fn<() => Promise<void>>(async () => {});
    const server = buildTestServer({
      lifecycle: { signals, exit, sleep: () => sleepGate.promise },
      onShutdown: [hook],
    });
    server.app.get('/slow', async () => {
      await requestGate.promise;
      return { done: true };
    });
    const address = await server.listen({ port: 0, host: '127.0.0.1' });
    const inFlight = fetch(`${address}/slow`);
    await new Promise((resolve) => setTimeout(resolve, 30));

    expect((await fetch(`${address}/readyz`)).status).toBe(200);
    signals.emit('SIGTERM');
    expect((await fetch(`${address}/readyz`)).status).toBe(503);
    expect((await fetch(`${address}/healthz`)).status).toBe(200);

    sleepGate.resolve();
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(exit).not.toHaveBeenCalled();
    requestGate.resolve();
    const response = await inFlight;
    expect(await response.json()).toEqual({ done: true });
    await vi.waitFor(() => expect(exit).toHaveBeenCalledWith(0));
    expect(hook).toHaveBeenCalledOnce();
  });

  it('runs every shutdown hook even when one fails, once', async () => {
    const first = vi.fn<() => Promise<void>>(async () => {
      throw new Error('hook failed');
    });
    const second = vi.fn<() => Promise<void>>(async () => {});
    const server = buildTestServer({ onShutdown: [first, second] });
    await server.close();
    await server.close();
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
