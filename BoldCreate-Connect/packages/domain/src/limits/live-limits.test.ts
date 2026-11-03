import { afterEach, describe, expect, it, vi } from 'vitest';
import type { LimitStore } from './limit-store.js';
import type { LimitKey } from '@boldcreate-integrations/limits';
import { startLiveLimits, type LiveLimit } from './live-limits.js';

afterEach(() => vi.useRealTimers());

type Answer = { limit: number; source: 'global' | 'default' } | Error;

/** Answers each read in turn and keeps repeating the last answer. */
const store = (answers: Answer[], key?: LimitKey): LimitStore => {
  let i = 0;
  return {
    resolve: async (asked) => {
      const answer = answers[Math.min(i, answers.length - 1)];
      if (key === undefined || asked === key) i += 1;
      if (answer instanceof Error) throw answer;
      return { limit: answer?.limit ?? 0, windowSeconds: 1, source: answer?.source ?? 'default' };
    },
    invalidate: () => undefined,
  };
};

const target = (apply: (value: number) => void, configured = 200): LiveLimit => ({
  key: 'pod_max_inflight',
  configured,
  apply,
});

const settle = async (ms = 0): Promise<void> => {
  await vi.advanceTimersByTimeAsync(ms);
};

describe('startLiveLimits', () => {
  it('applies a stored value and again only when it changes', async () => {
    vi.useFakeTimers();
    const apply = vi.fn<(n: number) => void>();
    const stop = startLiveLimits({
      limits: store([
        { limit: 300, source: 'global' },
        { limit: 300, source: 'global' },
        { limit: 450, source: 'global' },
      ]),
      targets: [target(apply)],
      intervalMs: 1000,
    });
    await settle();
    await settle(1000);
    await settle(1000);
    stop();
    expect(apply.mock.calls.map((c) => c[0])).toEqual([300, 450]);
  });

  it('leaves the pod configuration alone while nothing is stored', async () => {
    vi.useFakeTimers();
    const apply = vi.fn<(n: number) => void>();
    const stop = startLiveLimits({
      limits: store([{ limit: 200, source: 'default' }]),
      targets: [target(apply, 500)],
      intervalMs: 1000,
    });
    await settle(3000);
    stop();
    expect(apply).not.toHaveBeenCalled();
  });

  it('returns to the configured value when the stored one is removed', async () => {
    vi.useFakeTimers();
    const apply = vi.fn<(n: number) => void>();
    const stop = startLiveLimits({
      limits: store([
        { limit: 900, source: 'global' },
        { limit: 200, source: 'default' },
      ]),
      targets: [target(apply, 500)],
      intervalMs: 1000,
    });
    await settle();
    await settle(1000);
    stop();
    expect(apply.mock.calls.map((c) => c[0])).toEqual([900, 500]);
  });

  it('keeps the running value when a read fails', async () => {
    vi.useFakeTimers();
    const apply = vi.fn<(n: number) => void>();
    const stop = startLiveLimits({
      limits: store([{ limit: 900, source: 'global' }, new Error('database down')]),
      targets: [target(apply)],
      intervalMs: 1000,
    });
    await settle();
    await settle(3000);
    stop();
    expect(apply.mock.calls.map((c) => c[0])).toEqual([900]);
  });

  it('survives a pod that refuses a value and tries again on the next read', async () => {
    vi.useFakeTimers();
    const apply = vi
      .fn<(n: number) => void>()
      .mockImplementationOnce(() => {
        throw new Error('refused');
      })
      .mockImplementation(() => undefined);
    const stop = startLiveLimits({
      limits: store([{ limit: 900, source: 'global' }]),
      targets: [target(apply)],
      intervalMs: 1000,
    });
    await settle();
    await settle(1000);
    stop();
    expect(apply).toHaveBeenCalledTimes(2);
    expect(apply).toHaveBeenLastCalledWith(900);
  });

  it('follows each limit on its own', async () => {
    vi.useFakeTimers();
    const first = vi.fn<(n: number) => void>();
    const second = vi.fn<(n: number) => void>();
    const limits: LimitStore = {
      resolve: async (key) =>
        key === 'pod_max_inflight'
          ? { limit: 700, windowSeconds: 1, source: 'global' }
          : { limit: 5, windowSeconds: 1, source: 'default' },
      invalidate: () => undefined,
    };
    const stop = startLiveLimits({
      limits,
      targets: [target(first), { key: 'db_queue_max_depth', configured: 100, apply: second }],
    });
    await settle();
    stop();
    expect(first).toHaveBeenCalledWith(700);
    expect(second).not.toHaveBeenCalled();
  });

  it('does nothing without targets', async () => {
    vi.useFakeTimers();
    const resolve = vi.fn<LimitStore['resolve']>();
    const stop = startLiveLimits({ limits: { resolve, invalidate: () => undefined }, targets: [] });
    await settle(20_000);
    stop();
    expect(resolve).not.toHaveBeenCalled();
  });

  it('stops polling when stopped', async () => {
    vi.useFakeTimers();
    const resolve = vi.fn<LimitStore['resolve']>(async () => ({
      limit: 1,
      windowSeconds: 1,
      source: 'global',
    }));
    const stop = startLiveLimits({
      limits: { resolve, invalidate: () => undefined },
      targets: [target(() => undefined)],
      intervalMs: 1000,
    });
    await settle();
    stop();
    const calls = resolve.mock.calls.length;
    await settle(5000);
    expect(resolve.mock.calls.length).toBe(calls);
  });
});
