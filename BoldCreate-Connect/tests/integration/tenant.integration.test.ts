/**
 * `withTenant`: the settings row policies will read are set for one transaction and gone after.
 *
 * Run: pnpm test -- --only=integration
 */
import { afterAll, describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { createDb, withTenant } from '../../packages/db/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });

afterAll(async () => {
  await pool.end();
});

async function settings(executor: Pick<typeof db, 'execute'>) {
  const result = await executor.execute(
    sql`SELECT current_setting('app.tenant', true) AS tenant, current_setting('app.user', true) AS usr`,
  );
  return result.rows[0] as { tenant: string | null; usr: string | null };
}

describe('withTenant', () => {
  it('sets the tenant and the user inside the transaction', async () => {
    const seen = await withTenant(db, { orgId: 'org-1', userId: 'user-1' }, (tx) => settings(tx));
    expect(seen).toEqual({ tenant: 'org-1', usr: 'user-1' });
  });

  it('leaves nothing behind for the next use of the pooled connection', async () => {
    await withTenant(db, { orgId: 'org-1', userId: 'user-1' }, async () => undefined);
    for (let i = 0; i < 6; i++) {
      const after = await settings(db);
      expect(after.tenant ?? '').toBe('');
      expect(after.usr ?? '').toBe('');
    }
  });

  it('keeps concurrent tenants apart', async () => {
    const results = await Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        withTenant(db, { orgId: `org-${i}`, userId: `user-${i}` }, async (tx) => {
          await new Promise<void>((resolve) => setTimeout(resolve, 5 * (i % 3)));
          return settings(tx);
        }),
      ),
    );
    results.forEach((seen, i) => expect(seen).toEqual({ tenant: `org-${i}`, usr: `user-${i}` }));
  });

  it('stores a hostile value as text', async () => {
    const hostile = `x'); DROP TABLE "user"; --`;
    const seen = await withTenant(db, { orgId: hostile, userId: 'u' }, (tx) => settings(tx));
    expect(seen.tenant).toBe(hostile);
    const users = await db.execute(sql`SELECT count(*)::int AS n FROM "user"`);
    expect((users.rows[0] as { n: number }).n).toBeGreaterThanOrEqual(0);
  });

  it('uses an empty tenant when the request belongs to no organization', async () => {
    const seen = await withTenant(db, { userId: 'user-1' }, (tx) => settings(tx));
    expect(seen).toEqual({ tenant: '', usr: 'user-1' });
  });

  it('rolls back what the function wrote when it throws', async () => {
    await expect(
      withTenant(db, { orgId: 'org-1', userId: 'user-1' }, async (tx) => {
        await tx.execute(sql`CREATE TABLE tenant_probe_rollback (id int)`);
        throw new Error('stop');
      }),
    ).rejects.toThrow('stop');
    await expect(db.execute(sql`SELECT * FROM tenant_probe_rollback`)).rejects.toThrow(
      /tenant_probe_rollback/,
    );
  });
});
