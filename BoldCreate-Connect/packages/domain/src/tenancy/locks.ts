import { and, eq } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import { organizationMemberTable, organizationTable, userTable } from '@boldcreate-integrations/db';

/**
 * Row locks for the checks that must not race: each one reads the rows it decides over with
 * `FOR UPDATE`, always in `user_id` order, so two transactions queue up instead of both passing.
 * They are only meaningful inside a transaction.
 */

/** The active admins of an organization, locked; the set a change is judged against. */
export async function lockActiveAdmins(tx: Executor, orgId: string): Promise<string[]> {
  const rows = await tx
    .select({ userId: organizationMemberTable.userId })
    .from(organizationMemberTable)
    .where(
      and(
        eq(organizationMemberTable.organizationId, orgId),
        eq(organizationMemberTable.role, 'ADMIN'),
        eq(organizationMemberTable.status, 'active'),
      ),
    )
    .orderBy(organizationMemberTable.userId)
    .for('update');
  return rows.map((row) => row.userId);
}

export type KeyOwnerKind = 'user' | 'org';

/**
 * Locks the row that owns a set of API keys, so two creates for the same owner run one after the
 * other and the second sees the first's key when it counts. The lock is `NO KEY UPDATE`: two
 * creates still queue, but the insert's own foreign-key checks on the user and organization rows
 * are not blocked, so a user-scoped and an org-scoped create cannot wait on each other.
 */
export async function lockKeyOwner(tx: Executor, kind: KeyOwnerKind, id: string): Promise<void> {
  const table = kind === 'user' ? userTable : organizationTable;
  await tx.select({ id: table.id }).from(table).where(eq(table.id, id)).for('no key update');
}
