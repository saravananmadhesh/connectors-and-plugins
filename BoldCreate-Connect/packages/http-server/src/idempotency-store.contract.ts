import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import type { IdempotencyScope, IdempotencyStore } from './idempotency.js';

export interface IdempotencyStoreHarness {
  store: IdempotencyStore;
  /** Moves the expiry of a claim into the past. */
  expire(scope: IdempotencyScope): Promise<void>;
  cleanup(): Promise<void>;
}

const scopeOf = (overrides: Partial<IdempotencyScope> = {}): IdempotencyScope => ({
  principalKey: `usr:${randomUUID()}`,
  method: 'POST',
  routeTemplate: '/v1/things',
  idemKey: randomUUID(),
  ...overrides,
});

/** The behaviour every `IdempotencyStore` must have; each store has a runner that calls this. */
export function runIdempotencyStoreContract(
  label: string,
  make: () => Promise<IdempotencyStoreHarness>,
): void {
  describe(`idempotency store contract: ${label}`, () => {
    let harness: IdempotencyStoreHarness;
    let store: IdempotencyStore;
    beforeAll(async () => {
      harness = await make();
      store = harness.store;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('claims a free scope once and reports the holder to the next caller', async () => {
      const scope = scopeOf();
      expect(await store.begin(scope, 'h1', 60)).toEqual({ claimed: true });
      const second = await store.begin(scope, 'h2', 60);
      expect(second).toMatchObject({
        claimed: false,
        record: { requestHash: 'h1', state: 'in_progress', secretResponse: false },
      });
    });

    it('lets exactly one of many concurrent callers claim', async () => {
      const scope = scopeOf();
      const results = await Promise.all(
        Array.from({ length: 10 }, () => store.begin(scope, 'same', 60)),
      );
      expect(results.filter((r) => r.claimed)).toHaveLength(1);
    });

    it('keeps scopes apart by principal, method, route and key', async () => {
      const base = scopeOf();
      await store.begin(base, 'h', 60);
      for (const other of [
        { ...base, principalKey: `usr:${randomUUID()}` },
        { ...base, method: 'PUT' },
        { ...base, routeTemplate: '/v1/other' },
        { ...base, idemKey: randomUUID() },
      ]) {
        expect(await store.begin(other, 'h', 60)).toEqual({ claimed: true });
      }
    });

    it('stores a completed response and returns it', async () => {
      const scope = scopeOf();
      await store.begin(scope, 'h', 60);
      await store.complete(scope, 201, { id: 'x' }, { location: '/v1/things/x' }, false);
      expect(await store.get(scope)).toEqual({
        requestHash: 'h',
        state: 'completed',
        responseStatus: 201,
        responseBody: { id: 'x' },
        responseHeaders: { location: '/v1/things/x' },
        secretResponse: false,
      });
    });

    it('never stores the body of a secret response', async () => {
      const scope = scopeOf();
      await store.begin(scope, 'h', 60);
      await store.complete(scope, 201, { token: 'secret' }, null, true);
      expect(await store.get(scope)).toMatchObject({
        responseBody: null,
        secretResponse: true,
        state: 'completed',
      });
    });

    it('returns null for an unknown scope', async () => {
      expect(await store.get(scopeOf())).toBeNull();
    });

    it('frees the key when a claim is abandoned', async () => {
      const scope = scopeOf();
      await store.begin(scope, 'h', 60);
      await store.abandon(scope);
      expect(await store.get(scope)).toBeNull();
      expect(await store.begin(scope, 'other', 60)).toEqual({ claimed: true });
    });

    it('lets an expired claim be taken again', async () => {
      const scope = scopeOf();
      await store.begin(scope, 'old', 60);
      await store.complete(scope, 200, { a: 1 }, null, false);
      await harness.expire(scope);
      expect(await store.begin(scope, 'new', 60)).toEqual({ claimed: true });
      expect(await store.get(scope)).toMatchObject({
        requestHash: 'new',
        state: 'in_progress',
        responseStatus: null,
      });
    });

    it('purges expired rows in batches and keeps live ones', async () => {
      const keep = scopeOf();
      const gone = [scopeOf(), scopeOf(), scopeOf()];
      await store.begin(keep, 'h', 3600);
      for (const scope of gone) {
        await store.begin(scope, 'h', 60);
        await harness.expire(scope);
      }
      for (let round = 0; round < 50; round += 1) {
        const batch = await store.purgeExpired(2);
        expect(batch).toBeLessThanOrEqual(2);
        if (batch === 0) break;
      }
      expect(await store.get(keep)).not.toBeNull();
      for (const scope of gone) expect(await store.get(scope)).toBeNull();
    });
  });
}
