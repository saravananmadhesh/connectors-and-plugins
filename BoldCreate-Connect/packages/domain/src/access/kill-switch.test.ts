import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { globalKey } from '@boldcreate-integrations/ports';
import { createFakeCache, createManualClock } from './fake-cache.js';
import { createKillSwitch, createKillSwitchStore, liftKillSwitch } from './kill-switch.js';

const TARGET = '0b0f6b5e-2a63-4f3e-9d7a-5f4f4b2f9a11';
const ACTOR = '6d1a3c0e-9e0d-4a52-8a6e-0f0a5a0b7c22';

function stubReadDb(initial: unknown[] = []) {
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

describe('kill switch reads', () => {
  it('is false without an active switch and true with one', async () => {
    const { db, state } = stubReadDb();
    const clock = createManualClock();
    const store = createKillSwitchStore({ db, clock, ttlSeconds: 5 });

    expect(await store.isKilled('plugin', TARGET)).toBe(false);
    state.rows = [{ id: 'x' }];
    clock.advance(5_000);
    expect(await store.isKilled('plugin', TARGET)).toBe(true);
  });

  it('caches per target kind and id with the shared cache value 1 or 0', async () => {
    const { db } = stubReadDb([{ id: 'x' }]);
    const cache = createFakeCache();
    const store = createKillSwitchStore({ db, cache, clock: createManualClock(), ttlSeconds: 5 });

    await store.isKilled('mcp_server', TARGET);
    expect(cache.values.get(globalKey('kill', 'mcp_server', TARGET))).toBe('1');
    expect(cache.values.has(globalKey('kill', 'plugin', TARGET))).toBe(false);
  });

  it('reads the database when the shared cache is unavailable', async () => {
    const { db, state } = stubReadDb([{ id: 'x' }]);
    const cache = createFakeCache();
    cache.setDown(true);
    const store = createKillSwitchStore({ db, cache, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isKilled('org', TARGET)).toBe(true);
    expect(state.reads).toBe(1);
  });

  it('drops the local entries on invalidate', async () => {
    const { db, state } = stubReadDb();
    const store = createKillSwitchStore({ db, clock: createManualClock(), ttlSeconds: 5 });

    expect(await store.isKilled('api_key', TARGET)).toBe(false);
    state.rows = [{ id: 'x' }];
    store.invalidate();
    expect(await store.isKilled('api_key', TARGET)).toBe(true);
  });
});

describe('kill switch writes', () => {
  it('rejects an empty or oversized reason before touching the database', async () => {
    const tx = {} as unknown as Executor;
    await expect(
      createKillSwitch(tx, { kind: 'plugin', id: TARGET, reason: '', actor: ACTOR }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    await expect(
      createKillSwitch(tx, { kind: 'plugin', id: TARGET, reason: 'x'.repeat(501), actor: ACTOR }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    await expect(
      liftKillSwitch(tx, { id: TARGET, reason: '', actor: ACTOR }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });

  it('rejects an unknown target kind', async () => {
    const tx = {} as unknown as Executor;
    await expect(
      createKillSwitch(tx, {
        kind: 'galaxy' as never,
        id: TARGET,
        reason: 'abuse',
        actor: ACTOR,
      }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });

  it('reports an identical active switch as kill_switch_conflict', async () => {
    const insertChain = {
      values: () => insertChain,
      onConflictDoNothing: () => insertChain,
      returning: async () => [],
    };
    const tx = { insert: () => insertChain } as unknown as Executor;
    await expect(
      createKillSwitch(tx, { kind: 'plugin', id: TARGET, reason: 'abuse', actor: ACTOR }),
    ).rejects.toMatchObject({ code: 'kill_switch_conflict' });
  });

  it('reports lifting a switch that is not active as not_found', async () => {
    const updateChain = {
      set: () => updateChain,
      where: () => updateChain,
      returning: async () => [],
    };
    const tx = { update: () => updateChain } as unknown as Executor;
    await expect(
      liftKillSwitch(tx, { id: TARGET, reason: 'resolved', actor: ACTOR }),
    ).rejects.toMatchObject({ code: 'not_found' });
  });
});
