/**
 * Row-level security, as the real app roles see it: a request without a tenant sees nothing,
 * a pooled connection never carries a tenant to the next transaction, one tenant cannot read or
 * write another's rows, and cross-tenant access exists only through a named maintenance purpose.
 *
 * Run: pnpm test -- --only=security
 */
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import {
  createDb,
  organizationMemberTable,
  projectTable,
  withMaintenance,
  withTenant,
  type MaintenancePurpose,
} from '../../packages/db/src/index.js';
import { checkSource, run as runNoSessionGuc } from '../../scripts/checks/no-session-guc.js';
import {
  createSignedInUser,
  sql as superSql,
  type SignedInUser,
} from '../integration/signed-in-user.js';
import { roleConnectionString } from '../integration/test-env.js';

const root = resolve(import.meta.dirname, '../..');
const apiPool = createDb({ connectionString: roleConnectionString('api'), max: 2 });
const singlePool = createDb({ connectionString: roleConnectionString('api'), max: 1 });
const adminPool = createDb({ connectionString: roleConnectionString('admin'), max: 1 });
const workerPool = createDb({ connectionString: roleConnectionString('worker'), max: 1 });

let a: SignedInUser;
let b: SignedInUser;

/** Messages of an error and its causes: the driver error sits under drizzle's "Failed query". */
async function failureText(pending: Promise<unknown>): Promise<string> {
  try {
    await pending;
  } catch (error) {
    const messages: string[] = [];
    for (let current: unknown = error; current instanceof Error; current = current.cause) {
      messages.push(current.message);
    }
    return messages.join(' | ');
  }
  return 'did not fail';
}

const currentSettings = async (db: typeof apiPool.db) => {
  const result = await db.execute(
    sql`SELECT current_setting('app.tenant', true) AS tenant, current_setting('app.user', true) AS usr, current_setting('app.maintenance', true) AS maintenance`,
  );
  const row = result.rows[0] as {
    tenant: string | null;
    usr: string | null;
    maintenance: string | null;
  };
  // A setting that was never set on the connection reads as null, one that was set locally as empty.
  return { tenant: row.tenant ?? '', usr: row.usr ?? '', maintenance: row.maintenance ?? '' };
};

beforeAll(async () => {
  a = await createSignedInUser('rls-a');
  b = await createSignedInUser('rls-b');
}, 90_000);

afterAll(async () => {
  await Promise.all([
    apiPool.pool.end(),
    singlePool.pool.end(),
    adminPool.pool.end(),
    workerPool.pool.end(),
  ]);
});

describe('tenant isolation', () => {
  it('does not leak a tenant to the next transaction on a reused connection', async () => {
    const { db } = singlePool;
    const first = await withTenant(db, { orgId: a.rawOrgId, userId: a.rawUserId }, (tx) =>
      tx.select().from(projectTable),
    );
    expect(first.length).toBeGreaterThan(0);
    expect(first.every((row) => row.organizationId === a.rawOrgId)).toBe(true);

    expect(await db.select().from(projectTable)).toEqual([]);
    expect(await currentSettings(db)).toEqual({ tenant: '', usr: '', maintenance: '' });

    const third = await withTenant(db, { orgId: b.rawOrgId, userId: b.rawUserId }, (tx) =>
      tx.select().from(projectTable),
    );
    expect(third.length).toBeGreaterThan(0);
    expect(third.every((row) => row.organizationId === b.rawOrgId)).toBe(true);
  });

  it('never returns a foreign row across 200 interleaved transactions on a small pool', async () => {
    const { db } = apiPool;
    const owners = [a, b];
    let foreign = 0;
    let next = 0;
    const worker = async () => {
      while (next < 200) {
        const index = next++;
        const owner = owners[index % 2]!;
        const rows = await withTenant(
          db,
          { orgId: owner.rawOrgId, userId: owner.rawUserId },
          async (tx) => {
            if (index % 3 === 0) await new Promise<void>((done) => setTimeout(done, 2));
            return tx.select().from(projectTable);
          },
        );
        if (rows.length === 0 || rows.some((row) => row.organizationId !== owner.rawOrgId))
          foreign += 1;
        const outside = await currentSettings(db);
        if (outside.tenant) foreign += 1;
      }
    };
    await Promise.all(Array.from({ length: 8 }, worker));
    expect(foreign).toBe(0);
  }, 60_000);

  it('shows nothing to a query that forgot its tenant', async () => {
    const { db } = apiPool;
    expect(await db.select().from(projectTable)).toEqual([]);
    const count = await db.execute(sql`SELECT count(*)::int AS n FROM installation`);
    expect((count.rows[0] as { n: number }).n).toBe(0);
  });

  it('rejects a write for another tenant and affects none of its rows', async () => {
    const { db } = apiPool;
    const insertText = await failureText(
      withTenant(db, { orgId: a.rawOrgId, userId: a.rawUserId }, (tx) =>
        tx.insert(projectTable).values({
          id: randomUUID(),
          organizationId: b.rawOrgId,
          name: 'Intruder',
          createdBy: a.rawUserId,
        }),
      ),
    );
    expect(insertText).toMatch(/row-level security/i);

    const [updated, deleted] = await withTenant(
      db,
      { orgId: a.rawOrgId, userId: a.rawUserId },
      async (tx) => [
        await tx
          .update(projectTable)
          .set({ name: 'Hijacked' })
          .where(eq(projectTable.organizationId, b.rawOrgId))
          .returning({ id: projectTable.id }),
        await tx
          .delete(projectTable)
          .where(eq(projectTable.organizationId, b.rawOrgId))
          .returning({ id: projectTable.id }),
      ],
    );
    expect(updated).toEqual([]);
    expect(deleted).toEqual([]);
    const intact = await superSql<{ name: string }>(
      `SELECT name FROM project WHERE organization_id = $1`,
      [b.rawOrgId],
    );
    expect(intact.length).toBeGreaterThan(0);
    expect(intact.every((row) => row.name !== 'Hijacked')).toBe(true);
  });

  it("shows memberships by user across organizations, only the caller's own", async () => {
    const { db } = apiPool;
    const rows = await withTenant(db, { userId: a.rawUserId }, (tx) =>
      tx.select().from(organizationMemberTable),
    );
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((row) => row.userId === a.rawUserId)).toBe(true);
    expect(rows.some((row) => row.organizationId === b.rawOrgId)).toBe(false);
  });

  it('treats a hostile tenant value as inert: it fails the uuid cast and nothing runs', async () => {
    const { db } = apiPool;
    const castText = await failureText(
      withTenant(db, { orgId: `'; DROP TABLE project; --`, userId: a.rawUserId }, (tx) =>
        tx.select().from(projectTable),
      ),
    );
    expect(castText).toMatch(/invalid input syntax for type uuid/i);
    const projects = await superSql<{ n: number }>(`SELECT count(*)::int AS n FROM project`);
    expect(projects[0]!.n).toBeGreaterThan(0);
  });

  it('rejects session-level settings in application code', () => {
    const findings = checkSource(
      'apps/api/src/x.ts',
      "sql`SELECT set_config('app.tenant', ${id}, false)`",
    );
    expect(findings.map((f) => f.rule)).toEqual(['guc/session-level']);
    expect(runNoSessionGuc(root)).toEqual([]);
  });
});

describe('maintenance purposes', () => {
  const marker = `rls-${randomUUID()}`;

  beforeAll(async () => {
    for (const owner of [a, b]) {
      await superSql(
        `INSERT INTO audit_log (id, actor_id, actor_kind, action, org_id) VALUES ($1, 'rls-test', 'system', $2, $3)`,
        [randomUUID(), marker, owner.rawOrgId],
      );
    }
  });

  const markerRows = (tx: { execute: typeof apiPool.db.execute }) =>
    tx.execute(sql`SELECT DISTINCT org_id FROM audit_log WHERE action = ${marker}`);

  it('lets the admin role read the audit log of every organization for admin_read', async () => {
    const result = await withMaintenance(adminPool.db, 'admin_read', markerRows);
    const orgs = result.rows.map((row) => (row as { org_id: string }).org_id).sort();
    expect(orgs).toEqual([a.rawOrgId, b.rawOrgId].sort());
  });

  it('gives the same call from another role nothing: the purpose is not granted to it', async () => {
    const result = await withMaintenance(apiPool.db, 'admin_read', markerRows);
    expect(result.rows).toEqual([]);
  });

  it('leaves no maintenance setting on the connection afterwards', async () => {
    await withMaintenance(adminPool.db, 'admin_read', markerRows);
    expect((await currentSettings(adminPool.db)).maintenance ?? '').toBe('');
    expect(await markerRows(adminPool.db).then((r) => r.rows)).toEqual([]);
  });

  it('rejects an unknown purpose at compile time and at runtime', async () => {
    // @ts-expect-error the purpose is not in the closed list
    const call = withMaintenance(adminPool.db, 'anything', async () => 'never');
    await expect(call).rejects.toThrow('Unknown maintenance purpose');
    const unlisted: MaintenancePurpose = 'purge';
    // No policy grants this purpose on the audit log, so it shows nothing even to the worker.
    const none = await withMaintenance(workerPool.db, unlisted, markerRows);
    expect(none.rows).toEqual([]);
  });

  it('lets the worker select and delete audit rows across organizations for retention only', async () => {
    const seen = await withMaintenance(workerPool.db, 'retention', markerRows);
    expect(seen.rows).toHaveLength(2);
    const removed = await withMaintenance(workerPool.db, 'retention', (tx) =>
      tx.execute(sql`DELETE FROM audit_log WHERE action = ${marker} RETURNING id`),
    );
    expect(removed.rows).toHaveLength(2);
    const deniedText = await failureText(
      workerPool.db.execute(sql`SELECT id FROM api_key LIMIT 1`),
    );
    expect(deniedText).toMatch(/permission denied/i);
  });
});
