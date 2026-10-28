import type {
  IdempotencyClaim,
  IdempotencyRecord,
  IdempotencyScope,
  IdempotencyStore,
} from './idempotency.js';

interface Entry extends IdempotencyRecord {
  expiresAt: number;
}

const keyOf = (scope: IdempotencyScope): string =>
  JSON.stringify([scope.principalKey, scope.method, scope.routeTemplate, scope.idemKey]);

export interface MemoryIdempotencyStore extends IdempotencyStore {
  /** Moves the expiry of a claim into the past. */
  expire(scope: IdempotencyScope): void;
}

/**
 * A process-local store with the semantics of the database one: an expired claim no longer holds
 * its key. For tests and single-process use.
 */
export function createMemoryIdempotencyStore(
  now: () => number = () => Date.now(),
): MemoryIdempotencyStore {
  const entries = new Map<string, Entry>();
  const live = (key: string): Entry | undefined => {
    const entry = entries.get(key);
    return entry && entry.expiresAt > now() ? entry : undefined;
  };
  const view = ({ expiresAt: _expiresAt, ...record }: Entry): IdempotencyRecord => ({ ...record });

  return {
    async begin(scope, requestHash, ttlSeconds): Promise<IdempotencyClaim> {
      const key = keyOf(scope);
      const held = live(key);
      if (held) return { claimed: false, record: view(held) };
      entries.set(key, {
        requestHash,
        state: 'in_progress',
        responseStatus: null,
        responseBody: null,
        responseHeaders: null,
        secretResponse: false,
        expiresAt: now() + ttlSeconds * 1000,
      });
      return { claimed: true };
    },
    async get(scope) {
      const entry = entries.get(keyOf(scope));
      return entry ? view(entry) : null;
    },
    async complete(scope, status, body, headers, secretResponse) {
      const entry = entries.get(keyOf(scope));
      if (!entry) return;
      entry.state = 'completed';
      entry.responseStatus = status;
      entry.responseBody = secretResponse ? null : body;
      entry.responseHeaders = headers;
      entry.secretResponse = secretResponse;
    },
    async abandon(scope) {
      entries.delete(keyOf(scope));
    },
    async purgeExpired(limit) {
      let removed = 0;
      for (const [key, entry] of entries) {
        if (removed >= limit) break;
        if (entry.expiresAt <= now()) {
          entries.delete(key);
          removed += 1;
        }
      }
      return removed;
    },
    expire(scope) {
      const entry = entries.get(keyOf(scope));
      if (entry) entry.expiresAt = now() - 1;
    },
  };
}
