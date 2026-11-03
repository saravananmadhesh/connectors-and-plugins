import { sql } from 'drizzle-orm';
import { setTenant } from '@boldcreate-integrations/observability';
import type { Db, Tx } from './client.js';
import { setRlsContext, type TenantContext } from './tenant.js';
import { MAINTENANCE_PURPOSES, type MaintenancePurpose } from './role-grants.js';

/**
 * Runs `fn` in a transaction that may touch rows across organizations for one named purpose.
 * Nothing in application code decides which tables that reaches: a table lists the purposes it
 * allows, and for which roles, in a row policy, so a role can only use the purposes granted to it.
 * The setting lasts for the transaction only and is empty again when a pooled connection is reused.
 */
export async function withMaintenance<T>(
  db: Db,
  purpose: MaintenancePurpose,
  fn: (tx: Tx) => Promise<T>,
): Promise<T> {
  if (!(MAINTENANCE_PURPOSES as readonly string[]).includes(purpose)) {
    throw new Error(`Unknown maintenance purpose: ${String(purpose)}`);
  }
  return db.transaction(async (tx) => {
    await tx.execute(sql`SELECT set_config('app.maintenance', ${purpose}, true)`);
    return fn(tx);
  });
}

/**
 * Ends maintenance access inside a `withMaintenance` transaction and sets the organization's own
 * context, so the rest of the transaction reads and writes as that organization and nothing more.
 * It saves a second transaction for work that has to find the tenant first.
 */
export async function leaveMaintenance(tx: Tx, context: TenantContext): Promise<void> {
  await tx.execute(sql`SELECT set_config('app.maintenance', '', true)`);
  await setRlsContext(tx, context);
  if (context.orgId) setTenant(context.orgId);
}
