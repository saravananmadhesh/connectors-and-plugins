import { describe, expect, it } from 'vitest';
import type { Db, Tx } from './client.js';
import { withMaintenance } from './maintenance.js';
import type { MaintenancePurpose } from './role-grants.js';

function fakeDb() {
  const executed: unknown[] = [];
  const tx = {
    execute: async (query: unknown) => {
      executed.push(query);
    },
  } as unknown as Tx;
  const db = {
    transaction: async (fn: (tx: Tx) => Promise<unknown>) => fn(tx),
  } as unknown as Db;
  return { db, executed };
}

describe('withMaintenance', () => {
  it('sets the purpose for the transaction, then runs the callback', async () => {
    const { db, executed } = fakeDb();
    const result = await withMaintenance(db, 'admin_read', async () => 'done');
    expect(result).toBe('done');
    expect(executed).toHaveLength(1);
    expect(JSON.stringify(executed[0])).toContain('app.maintenance');
  });

  it('rejects a purpose that is not in the closed list, before any statement', async () => {
    const { db, executed } = fakeDb();
    await expect(
      withMaintenance(db, 'anything' as MaintenancePurpose, async () => 'never'),
    ).rejects.toThrow('Unknown maintenance purpose');
    expect(executed).toHaveLength(0);
  });
});
