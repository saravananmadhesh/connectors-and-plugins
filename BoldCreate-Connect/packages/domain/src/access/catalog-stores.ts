import type { Executor } from '@boldcreate-integrations/db';
import type { CachePort, ClockPort } from '@boldcreate-integrations/ports';
import { startInvalidation } from './catalog-revision.js';
import { createFlagStore, type FlagStore } from './flags.js';
import { createKillSwitchStore, type KillSwitchStore } from './kill-switch.js';

export interface CatalogStoresOptions {
  db: Executor;
  cache?: CachePort | undefined;
  clock: ClockPort;
  /** `FLAG_CACHE_TTL_SECONDS`: the bound on staleness when the invalidation channel is down. */
  ttlSeconds: number;
}

export interface CatalogStores {
  flags: FlagStore;
  killSwitches: KillSwitchStore;
  /** Subscribes to the invalidation channel; resolves to the unsubscribe function. */
  startInvalidation(): Promise<() => Promise<void>>;
}

/** The flag and kill switch stores of a process, sharing one cache and one subscription. */
export function createCatalogStores(options: CatalogStoresOptions): CatalogStores {
  const flags = createFlagStore(options);
  const killSwitches = createKillSwitchStore(options);
  return {
    flags,
    killSwitches,
    async startInvalidation() {
      if (!options.cache) return async () => undefined;
      return startInvalidation(options.cache, [flags, killSwitches]);
    },
  };
}
