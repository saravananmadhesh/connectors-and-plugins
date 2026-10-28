import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { FLAG_DEFAULTS, type FlagKey } from '@boldcreate-integrations/limits';
import { globalKey } from '@boldcreate-integrations/ports';
import { createFakeCache, createManualClock } from './fake-cache.js';
import { createFlagStore } from './flags.js';

/** A database stub whose select chain returns the rows the test sets and counts the reads. */
function stubDb(initial: Array<{ enabled: boolean }> = []) {
  const state = { rows: initial, reads: 0 };
  const chain = {
    from: () => chain,
    where: () => chain,
    limit: async () => {
      state.reads += 1;
      return state.rows;
    },
  };
  return { state, db: { select: () => chain } as unknown as Executor };
}

const KEY: FlagKey = 'oauth_dcr';

describe('flag store', () => {
  it('falls back to the built-in default when no row exists', async () => {
    const { db } = stubDb();
    const store = createFlagStore({ db, clock: createManualClock(), ttlSeconds: 5 });
    for (const key of Object.keys(FLAG_DEFAULTS) as FlagKey[]) {
      expect(await store.isEnabled(key)).toBe(FLAG_DEFAULTS[key]);
    }
  });

  it('throws for an unknown flag key', async () => {
    const { db } = stubDb();
    const store = createFlagStore({ db, clock: createManualClock(), ttlSeconds: 5 });
    await expect(store.isEnabled('no_such_flag' as FlagKey)).rejects.toThrow(
      'Unknown feature flag',
    );
  });

  it('reads the process-local entry before the shared cache and the database', async () => {
    const { db, state } = stubDb([{ enabled: true }]);
    const cache = createFakeCache();
    const store = createFlagStore({ db, cache, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isEnabled(KEY)).toBe(true);
    expect(await store.isEnabled(KEY)).toBe(true);

    expect(state.reads).toBe(1);
    expect(cache.reads).toHaveLength(1);
    expect(cache.values.get(globalKey('flag', KEY))).toBe('1');
  });

  it('uses the shared cache before the database', async () => {
    const { db, state } = stubDb([{ enabled: false }]);
    const cache = createFakeCache();
    cache.values.set(globalKey('flag', KEY), '1');
    const store = createFlagStore({ db, cache, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isEnabled(KEY)).toBe(true);
    expect(state.reads).toBe(0);
  });

  it('reloads after the lifetime of the local entry', async () => {
    const { db, state } = stubDb([{ enabled: true }]);
    const clock = createManualClock();
    const store = createFlagStore({ db, clock, ttlSeconds: 5 });

    expect(await store.isEnabled(KEY)).toBe(true);
    state.rows = [{ enabled: false }];
    clock.advance(4_999);
    expect(await store.isEnabled(KEY)).toBe(true);
    clock.advance(1);
    expect(await store.isEnabled(KEY)).toBe(false);
    expect(state.reads).toBe(2);
  });

  it('reads the database when the shared cache is unavailable', async () => {
    const { db, state } = stubDb([{ enabled: true }]);
    const cache = createFakeCache();
    cache.setDown(true);
    const store = createFlagStore({ db, cache, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isEnabled(KEY)).toBe(true);
    expect(state.reads).toBe(1);
  });

  it('drops the local entries on invalidate', async () => {
    const { db, state } = stubDb([{ enabled: false }]);
    const store = createFlagStore({ db, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isEnabled(KEY)).toBe(false);
    state.rows = [{ enabled: true }];
    store.invalidate();
    expect(await store.isEnabled(KEY)).toBe(true);
  });
});
