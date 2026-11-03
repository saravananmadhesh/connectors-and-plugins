import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { LIMIT_DEFINITIONS } from '@boldcreate-integrations/limits';
import { createManualClock } from '../access/fake-cache.js';
import { createLimitStore } from './limit-store.js';

const KEY = 'project_requests_per_minute';
const subject = { projectId: 'fixture-project', organizationId: 'fixture-org' };

/** A database stub whose `select().from()` resolves to the rows the test sets. */
function stubDb(initial: unknown[] = []) {
  const state = { rows: initial, reads: 0, fail: false };
  const db = {
    select: () => ({
      from: async () => {
        state.reads += 1;
        if (state.fail) throw new Error('database_down');
        return state.rows;
      },
    }),
  } as unknown as Executor;
  return { state, db };
}

const globalRow = (value: number) => ({
  key: KEY,
  scope: 'global',
  scopeId: null,
  value,
  expiresAt: null,
});

describe('limit store', () => {
  it('serves the built-in value with no stored rows', async () => {
    const { db } = stubDb();
    const store = createLimitStore({ db, clock: createManualClock(), ttlSeconds: 30 });
    expect((await store.resolve(KEY, subject)).limit).toBe(LIMIT_DEFINITIONS[KEY].default);
  });

  it('reads once for many calls inside the interval, then again after it', async () => {
    const { db, state } = stubDb([globalRow(700)]);
    const clock = createManualClock();
    const store = createLimitStore({ db, clock, ttlSeconds: 30 });
    await Promise.all(Array.from({ length: 20 }, () => store.resolve(KEY, subject)));
    await store.resolve(KEY, subject);
    expect(state.reads).toBe(1);

    clock.advance(31_000);
    state.rows = [globalRow(900)];
    expect((await store.resolve(KEY, subject)).limit).toBe(900);
    expect(state.reads).toBe(2);
  });

  it('keeps the last values when a refresh fails and reports the fault', async () => {
    const { db, state } = stubDb([globalRow(700)]);
    const clock = createManualClock();
    const faults: unknown[] = [];
    const store = createLimitStore({
      db,
      clock,
      ttlSeconds: 30,
      onRefreshError: (error) => faults.push(error),
    });
    await store.resolve(KEY, subject);

    state.fail = true;
    clock.advance(31_000);
    expect((await store.resolve(KEY, subject)).limit).toBe(700);
    expect(faults).toHaveLength(1);
  });

  it('falls back to the built-in value on a cold start with a failing database', async () => {
    const { db, state } = stubDb();
    state.fail = true;
    const store = createLimitStore({ db, clock: createManualClock(), ttlSeconds: 30 });
    expect(await store.resolve(KEY, subject)).toMatchObject({
      limit: LIMIT_DEFINITIONS[KEY].default,
      source: 'default',
    });
  });

  it('does not read on every call while the database is down', async () => {
    const { db, state } = stubDb();
    state.fail = true;
    const store = createLimitStore({ db, clock: createManualClock(), ttlSeconds: 30 });
    await store.resolve(KEY, subject);
    await store.resolve(KEY, subject);
    expect(state.reads).toBe(1);
  });

  it('reads again after invalidate', async () => {
    const { db, state } = stubDb([globalRow(700)]);
    const store = createLimitStore({ db, clock: createManualClock(), ttlSeconds: 30 });
    await store.resolve(KEY, subject);
    store.invalidate();
    await store.resolve(KEY, subject);
    expect(state.reads).toBe(2);
  });

  it('throws for an unknown key', async () => {
    const { db } = stubDb();
    const store = createLimitStore({ db, clock: createManualClock(), ttlSeconds: 30 });
    await expect(store.resolve('no_such_limit' as typeof KEY, subject)).rejects.toThrow(
      'Unknown limit',
    );
  });
});
