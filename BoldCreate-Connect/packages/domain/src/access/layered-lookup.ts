import type { CacheKey, CachePort, ClockPort } from '@boldcreate-integrations/ports';

const MAX_LOCAL_ENTRIES = 10_000;

export interface LayeredLookupOptions {
  /** Shared cache between processes; absent when the process has no cache configured. */
  cache?: CachePort | undefined;
  clock: ClockPort;
  /** Lifetime of a process-local entry and of the shared entry written after a database read. */
  ttlSeconds: number;
}

export interface LayeredLookup {
  /** Process-local entry, then the shared cache, then `load` (Postgres); the result is cached. */
  read(id: string, key: CacheKey, load: () => Promise<boolean>): Promise<boolean>;
  /** Drops every process-local entry. */
  clear(): void;
}

/**
 * The read path of the flag and kill-switch stores. When the shared cache is unreachable the
 * read falls through to the database; a value is never served from memory past its lifetime.
 */
export function createLayeredLookup(options: LayeredLookupOptions): LayeredLookup {
  const { cache, clock, ttlSeconds } = options;
  const entries = new Map<string, { value: boolean; expiresAt: number }>();

  return {
    async read(id, key, load) {
      const now = clock.nowMs();
      const hit = entries.get(id);
      if (hit && hit.expiresAt > now) return hit.value;

      let value: boolean | undefined;
      if (cache) {
        try {
          const raw = await cache.get(key);
          if (raw === '1') value = true;
          else if (raw === '0') value = false;
        } catch {
          // The shared cache is down: read the database instead.
        }
      }
      if (value === undefined) {
        value = await load();
        if (cache) {
          try {
            await cache.set(key, value ? '1' : '0', { ttlSeconds });
          } catch {
            // Not cached; the next read loads again.
          }
        }
      }
      if (entries.size >= MAX_LOCAL_ENTRIES) entries.clear();
      entries.set(id, { value, expiresAt: now + ttlSeconds * 1000 });
      return value;
    },
    clear() {
      entries.clear();
    },
  };
}
