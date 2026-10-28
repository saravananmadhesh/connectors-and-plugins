import type { CacheKey, CachePort, ClockPort } from '@boldcreate-integrations/ports';

/** An in-memory cache port with a publish log, for tests of code that layers over a cache. */
export interface FakeCache extends CachePort {
  /** Makes every call reject, as an unreachable Redis does. */
  setDown(down: boolean): void;
  readonly values: Map<string, string>;
  readonly published: Array<{ channel: string; message: string }>;
  readonly reads: CacheKey[];
}

export function createFakeCache(): FakeCache {
  const values = new Map<string, string>();
  const published: Array<{ channel: string; message: string }> = [];
  const reads: CacheKey[] = [];
  const handlers = new Map<string, Set<(message: string) => void>>();
  let down = false;
  const guard = () => {
    if (down) throw new Error('redis_unavailable');
  };
  return {
    values,
    published,
    reads,
    setDown(value) {
      down = value;
    },
    async get(key) {
      guard();
      reads.push(key);
      return values.get(key) ?? null;
    },
    async set(key, value) {
      guard();
      values.set(key, value);
    },
    async delete(key) {
      guard();
      values.delete(key);
    },
    async increment(key) {
      guard();
      const next = Number(values.get(key) ?? '0') + 1;
      values.set(key, String(next));
      return next;
    },
    async publish(channel, message) {
      guard();
      published.push({ channel, message });
      for (const handler of handlers.get(channel) ?? []) handler(message);
    },
    async subscribe(channel, handler) {
      guard();
      const set = handlers.get(channel) ?? new Set();
      set.add(handler);
      handlers.set(channel, set);
      return async () => {
        set.delete(handler);
      };
    },
    async ping() {
      guard();
    },
  };
}

/** A clock whose time only moves when a test moves it. */
export function createManualClock(start = new Date('2030-01-01T00:00:00Z')): ClockPort & {
  advance(ms: number): void;
} {
  let current = start.getTime();
  return {
    now: () => new Date(current),
    nowMs: () => current,
    sleep: async () => undefined,
    advance(ms) {
      current += ms;
    },
  };
}
