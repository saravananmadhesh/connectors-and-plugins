/**
 * Cache port and cache keys.
 *
 * `tenantKey` and `globalKey` are the only way to obtain a `CacheKey`: a key is either scoped to
 * an organization or one of a fixed list of named global caches. This helper is the one piece of
 * code that lives in the ports package.
 */

declare const cacheKeyBrand: unique symbol;

export type CacheKey = string & { readonly [cacheKeyBrand]: true };

/** Global cache names. A task that needs a new one adds it here. */
export const GLOBAL_KEY_NAMES = [
  'flag',
  'kill',
  'rev',
  'epoch',
  'neg',
  'active-keys',
  'scheduler',
  'ratelimit',
  'keyauth',
] as const;

export type GlobalKeyName = (typeof GLOBAL_KEY_NAMES)[number];

const PART = /^[A-Za-z0-9._-]+$/;

function checkedParts(parts: string[]): string[] {
  for (const part of parts) {
    if (!PART.test(part)) throw new Error(`Invalid cache key part: ${JSON.stringify(part)}`);
  }
  return parts;
}

/** `t:<orgId>:<parts...>`: a key that belongs to one organization. */
export function tenantKey(orgId: string, ...parts: string[]): CacheKey {
  if (!orgId) throw new Error('tenantKey requires an organization id');
  return ['t', ...checkedParts([orgId, ...parts])].join(':') as CacheKey;
}

/** `g:<name>:<parts...>`: a key in one of the named global caches. */
export function globalKey(name: GlobalKeyName, ...parts: string[]): CacheKey {
  if (!(GLOBAL_KEY_NAMES as readonly string[]).includes(name)) {
    throw new Error(`Unknown global cache name: ${String(name)}`);
  }
  return ['g', name, ...checkedParts(parts)].join(':') as CacheKey;
}

export interface CachePort {
  get(key: CacheKey): Promise<string | null>;
  set(key: CacheKey, value: string, opts?: { ttlSeconds?: number }): Promise<void>;
  delete(key: CacheKey): Promise<void>;
  increment(key: CacheKey, opts?: { ttlSeconds?: number }): Promise<number>;
  publish(channel: string, message: string): Promise<void>;
  subscribe(channel: string, handler: (message: string) => void): Promise<() => Promise<void>>;
  ping(): Promise<void>;
}
