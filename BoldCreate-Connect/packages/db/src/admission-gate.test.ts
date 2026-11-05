import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AdmissionRefused,
  createAdmissionGate,
  type AdmissionGateOptions,
  type AdmissionRejection,
} from './admission-gate.js';

afterEach(() => vi.useRealTimers());

const gate = (over: Partial<AdmissionGateOptions> = {}) =>
  createAdmissionGate({ maxConcurrency: 2, maxDepth: 2, maxWaitMs: 1000, ...over });

describe('admission gate fair share', () => {
  const full = () => gate({ maxConcurrency: 1, maxDepth: 4, ownerSharePct: 50 });

  it('limits one owner to its share of the queue while another owner waits', async () => {
    const g = full();
    await g.acquire('a');
    void g.acquire('a').catch(() => undefined);
    void g.acquire('b').catch(() => undefined);
    void g.acquire('a').catch(() => undefined);
    await expect(g.acquire('a')).rejects.toThrow('share is used up');
    expect(g.stats().waiting).toBe(3);
    void g.acquire('b').catch(() => undefined);
    expect(g.stats().waiting).toBe(4);
  });

  it('lets an owner use more of the queue when nobody else waits', async () => {
    const g = full();
    await g.acquire('a');
    for (let i = 0; i < 4; i += 1) void g.acquire('a').catch(() => undefined);
    expect(g.stats().waiting).toBe(4);
  });

  it('frees an owner place when its waiter is served', async () => {
    const g = full();
    const first = await g.acquire('a');
    const second = g.acquire('a');
    void g.acquire('b').catch(() => undefined);
    void g.acquire('a').catch(() => undefined);
    first();
    (await second)();
    void g.acquire('a').catch(() => undefined);
    expect(g.stats().waiting).toBe(2);
  });

  it('ignores callers with no owner', async () => {
    const g = full();
    await g.acquire();
    for (let i = 0; i < 4; i += 1) void g.acquire().catch(() => undefined);
    expect(g.stats().waiting).toBe(4);
  });
});

describe('admission gate', () => {
  it('admits callers up to the concurrency limit at once', async () => {
    const g = gate();
    await g.acquire();
    await g.acquire();
    expect(g.stats()).toEqual({ active: 2, waiting: 0 });
  });

  it('serves waiting callers in order as slots come back', async () => {
    const g = gate({ maxConcurrency: 1 });
    const first = await g.acquire();
    const order: number[] = [];
    const second = g.acquire().then((release) => (order.push(2), release));
    const third = g.acquire().then((release) => (order.push(3), release));
    expect(g.stats()).toEqual({ active: 1, waiting: 2 });
    first();
    (await second)();
    await third;
    expect(order).toEqual([2, 3]);
  });

  it('refuses at once when the queue is full', async () => {
    const onReject = vi.fn<(reason: AdmissionRejection) => void>();
    const g = gate({ maxConcurrency: 1, maxDepth: 1, onReject });
    await g.acquire();
    void g.acquire().catch(() => undefined);
    await expect(g.acquire()).rejects.toThrow('database admission queue');
    expect(onReject).toHaveBeenCalledWith('full');
  });

  it('refuses a caller whose wait ran out and frees its place', async () => {
    vi.useFakeTimers();
    const onReject = vi.fn<(reason: AdmissionRejection) => void>();
    const g = gate({ maxConcurrency: 1, maxWaitMs: 50, onReject });
    await g.acquire();
    const outcome = g.acquire().catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(60);
    expect(await outcome).toBeInstanceOf(AdmissionRefused);
    expect(g.stats().waiting).toBe(0);
    expect(onReject).toHaveBeenCalledWith('timeout');
  });

  it('ignores a second release of the same slot', async () => {
    const g = gate({ maxConcurrency: 1 });
    const release = await g.acquire();
    release();
    release();
    expect(g.stats().active).toBe(0);
  });

  it('ignores limits that are not usable numbers', async () => {
    const g = gate({ maxConcurrency: 1, maxDepth: 1 });
    await g.acquire();
    g.update({ maxConcurrency: Number.NaN, maxDepth: -3, maxWaitMs: Number.POSITIVE_INFINITY });
    void g.acquire().catch(() => undefined);
    await expect(g.acquire()).rejects.toThrow('queue is full');
    expect(g.stats()).toEqual({ active: 1, waiting: 1 });
  });

  it('refuses everything that cannot run at once while the depth is zero', async () => {
    const g = gate({ maxConcurrency: 1, maxDepth: 0 });
    const release = await g.acquire();
    await expect(g.acquire()).rejects.toThrow('database admission queue');
    release();
    await expect(g.acquire()).resolves.toBeTypeOf('function');
  });

  it('applies a smaller depth to new callers and lets the ones already waiting finish', async () => {
    const g = gate({ maxConcurrency: 1, maxDepth: 3 });
    const first = await g.acquire();
    const waiting = [g.acquire(), g.acquire(), g.acquire()];
    g.update({ maxDepth: 1 });
    await expect(g.acquire()).rejects.toThrow('queue is full');
    first();
    for (const next of waiting) (await next)();
    expect(g.stats()).toEqual({ active: 0, waiting: 0 });
  });

  it('admits waiters when the limit is raised while running', async () => {
    const g = gate({ maxConcurrency: 1 });
    await g.acquire();
    const waiting = g.acquire();
    g.update({ maxConcurrency: 2 });
    await waiting;
    expect(g.stats()).toEqual({ active: 2, waiting: 0 });
  });
});
