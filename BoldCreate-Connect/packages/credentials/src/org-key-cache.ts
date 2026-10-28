import type { ClockPort } from '@boldcreate-integrations/ports';

interface Entry {
  orgId: string;
  key: Uint8Array;
  expiresAt: number;
}

export interface OrgKeyCache {
  /** The cached private key bytes, or undefined on a miss, after expiry or for another org. */
  get(orgKeyId: string, orgId: string): Uint8Array | undefined;
  set(orgKeyId: string, orgId: string, key: Uint8Array): void;
  /** Removes (and zeroes) every entry of an organization. */
  purgeOrg(orgId: string): void;
  clear(): void;
  readonly size: number;
}

export interface OrgKeyCacheOptions {
  max: number;
  ttlSeconds: number;
  clock: Pick<ClockPort, 'nowMs'>;
}

/**
 * A bounded least-recently-used cache of unwrapped org private keys. Entries expire after the
 * time to live and are zeroed whenever they leave the cache, for any reason.
 *
 * The cache lives in one process and is never shared through the cache port, so its entries are
 * keyed by org key id and carry the org id they belong to: a lookup for another org misses.
 */
export function createOrgKeyCache(options: OrgKeyCacheOptions): OrgKeyCache {
  // Map iteration order is insertion order: the first key is the least recently used.
  const entries = new Map<string, Entry>();

  const drop = (id: string): void => {
    const entry = entries.get(id);
    if (!entry) return;
    entry.key.fill(0);
    entries.delete(id);
  };

  return {
    get(orgKeyId, orgId) {
      const entry = entries.get(orgKeyId);
      if (!entry || entry.orgId !== orgId) return undefined;
      if (entry.expiresAt <= options.clock.nowMs()) {
        drop(orgKeyId);
        return undefined;
      }
      entries.delete(orgKeyId);
      entries.set(orgKeyId, entry);
      return entry.key;
    },

    set(orgKeyId, orgId, key) {
      drop(orgKeyId);
      entries.set(orgKeyId, {
        orgId,
        key,
        expiresAt: options.clock.nowMs() + options.ttlSeconds * 1000,
      });
      while (entries.size > options.max) {
        const oldest = entries.keys().next().value;
        if (oldest === undefined) break;
        drop(oldest);
      }
    },

    purgeOrg(orgId) {
      for (const [id, entry] of [...entries]) {
        if (entry.orgId === orgId) drop(id);
      }
    },

    clear() {
      for (const id of [...entries.keys()]) drop(id);
    },

    get size() {
      return entries.size;
    },
  };
}
