import { describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { getTableName } from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';
import { PgDialect } from 'drizzle-orm/pg-core';
import type { PgTable } from 'drizzle-orm/pg-core';
import type { Db } from '@boldcreate-integrations/db';
import {
  apiKeyTable,
  auditLogTable,
  pluginTable,
  emailTokenTable,
  installationComponentTable,
  installationTable,
  organizationMemberTable,
  organizationTable,
  orgPolicyTable,
  outboxTable,
  orgKeyTable,
  userTable,
  projectTable,
} from '@boldcreate-integrations/db';
import { ORG_PURGE_ORDER, deleteOrg } from './deletion.js';

const orgId = 'deletion-org';
const actor = { userId: 'deletion-user', requestId: 'deletion-request' };
const org = { id: orgId, slug: 'delete-org' };
const dialect = new PgDialect();

type Row = Record<string, unknown>;
type Predicate = { table: PgTable; condition: SQL };
type Mutation = Predicate & { values?: Row };
type SelectResult = Promise<Row[]> & { limit: Mock<(limit: number) => Promise<Row[]>> };
type SelectWhere = { where: Mock<(condition: SQL) => SelectResult> };
type SelectFrom = { from: Mock<(table: PgTable) => SelectWhere> };
type MutationWhere = { where: Mock<(condition: SQL) => Promise<void>> };
type Insertion = Promise<void> & { onConflictDoNothing: Mock<(config: unknown) => Promise<void>> };
type InsertValues = { values: Mock<(values: Row) => Insertion> };
type UpdateSet = { set: Mock<(values: Row) => MutationWhere> };

const orgMembers = [
  { email: 'owner@example.test', displayName: 'Owner' },
  { email: 'admin@example.test', displayName: 'Admin' },
];

function createDbMock(overrides: Array<[PgTable, Row[]]> = []) {
  const rows = new Map<PgTable, Row[]>([
    [organizationTable, [org]],
    [organizationMemberTable, [{ role: 'ADMIN' }]],
    [pluginTable, []],
    [outboxTable, []],
    [userTable, orgMembers],
    ...overrides,
  ]);
  const events: string[] = [];
  const selections: Predicate[] = [];
  const deletions: Mutation[] = [];
  const updates: Mutation[] = [];
  const audits: Row[] = [];
  const deleteWhere = vi.fn<(condition: SQL) => Promise<void>>().mockResolvedValue(undefined);
  const execute = vi.fn<(query: SQL) => Promise<void>>(async (_query) => {
    events.push('lock');
  });
  // Supports .from(t).where() and .from(t).innerJoin(t2, on).where()
  const select = vi.fn<() => SelectFrom>(() => ({
    from: vi.fn<(table: PgTable) => SelectWhere>((table) => ({
      innerJoin: vi.fn<(joinTable: PgTable, _on: SQL) => SelectWhere>((_joinTable) => ({
        where: vi.fn<(condition: SQL) => SelectResult>((condition) => {
          selections.push({ table, condition });
          events.push(`select:${getTableName(table)}`);
          // For member joins return the userTable rows (email + displayName)
          const result = Promise.resolve(rows.get(userTable) ?? []);
          return Object.assign(result, {
            limit: vi.fn<(limit: number) => Promise<Row[]>>((_limit) => result),
          });
        }),
      })),
      where: vi.fn<(condition: SQL) => SelectResult>((condition) => {
        selections.push({ table, condition });
        events.push(`select:${getTableName(table)}`);
        const result = Promise.resolve(rows.get(table) ?? []);
        return Object.assign(result, {
          limit: vi.fn<(limit: number) => Promise<Row[]>>((_limit) => result),
        });
      }),
    })),
  }));
  const insert = vi.fn<(table: PgTable) => InsertValues>((table) => ({
    values: vi.fn<(values: Row) => Insertion>((values) => {
      audits.push(values);
      events.push(`insert:${getTableName(table)}`);
      return Object.assign(Promise.resolve(), {
        onConflictDoNothing: vi.fn<(config: unknown) => Promise<void>>(async () => undefined),
      });
    }),
  }));
  const remove = vi.fn<(table: PgTable) => MutationWhere>((table) => ({
    where: vi.fn<(condition: SQL) => Promise<void>>(async (condition) => {
      deletions.push({ table, condition });
      events.push(`delete:${getTableName(table)}`);
      await deleteWhere(condition);
    }),
  }));
  const update = vi.fn<(table: PgTable) => UpdateSet>((table) => ({
    set: vi.fn<(values: Row) => MutationWhere>((values) => ({
      where: vi.fn<(condition: SQL) => Promise<void>>(async (condition) => {
        updates.push({ table, condition, values });
        events.push(`update:${getTableName(table)}`);
      }),
    })),
  }));
  // Audit rows are written inside a savepoint, which here simply runs the callback on the same handle.
  const tx = {
    execute,
    select,
    insert,
    delete: remove,
    update,
    transaction: async (callback: (inner: unknown) => Promise<unknown>): Promise<unknown> =>
      callback(tx),
  };
  const commit = vi.fn<() => void>();
  const rollback = vi.fn<(error: unknown) => void>();
  const transaction = vi.fn<(callback: (transaction: typeof tx) => Promise<void>) => Promise<void>>(
    async (callback) => {
      try {
        await callback(tx);
        commit();
        events.push('commit');
      } catch (error) {
        rollback(error);
        events.push('rollback');
        throw error;
      }
    },
  );
  const db = { transaction } as unknown as Db;
  return {
    db,
    tx,
    transaction,
    commit,
    rollback,
    deleteWhere,
    events,
    selections,
    deletions,
    updates,
    audits,
  };
}

function compile(condition: SQL) {
  const query = dialect.sqlToQuery(condition);
  return { sql: query.sql, params: query.params };
}

const deletionCases = [
  {
    name: 'deleteOrg',
    run: deleteOrg,
    id: orgId,
    slug: org.slug,
    table: organizationTable,
    deletedBeforeFailure: [installationComponentTable, installationTable],
    updatedBeforeFailure: [outboxTable],
  },
];

describe.each(deletionCases)(
  '$name guards',
  ({ run, id, slug, table, deletedBeforeFailure, updatedBeforeFailure }) => {
    it('rejects a mismatched confirmation without mutations', async () => {
      const mock = createDbMock();

      await expect(run(mock.db, id, { confirmSlug: 'wrong-slug' }, actor)).rejects.toMatchObject({
        code: 'confirmation_mismatch',
      });

      expect(mock.transaction).toHaveBeenCalledExactlyOnceWith(expect.any(Function));
      expect(mock.tx.delete).not.toHaveBeenCalled();
      expect(mock.tx.insert).not.toHaveBeenCalled();
      expect(mock.tx.update).not.toHaveBeenCalled();
      expect(mock.tx.select).toHaveBeenCalledTimes(2);
      expect(mock.commit).not.toHaveBeenCalled();
      expect(mock.rollback).toHaveBeenCalledOnce();
    });

    it.each(['VIEWER', undefined])('rejects membership %s without mutations', async (role) => {
      const mock = createDbMock([[organizationMemberTable, role ? [{ role }] : []]]);

      await expect(run(mock.db, id, { confirmSlug: slug }, actor)).rejects.toMatchObject({
        code: 'forbidden',
      });

      expect(mock.tx.delete).not.toHaveBeenCalled();
      expect(mock.tx.insert).not.toHaveBeenCalled();
      expect(mock.tx.update).not.toHaveBeenCalled();
      expect(mock.tx.select).toHaveBeenCalledTimes(2);
      expect(compile(mock.selections[1]!.condition)).toEqual({
        sql: '("organization_member"."organization_id" = $1 and "organization_member"."user_id" = $2)',
        params: [orgId, actor.userId],
      });
      expect(mock.commit).not.toHaveBeenCalled();
    });

    it('rejects a missing resource without mutations', async () => {
      const mock = createDbMock([[table, []]]);

      await expect(run(mock.db, id, { confirmSlug: slug }, actor)).rejects.toMatchObject({
        code: 'not_found',
      });

      expect(mock.tx.select).toHaveBeenCalledOnce();
      expect(mock.tx.delete).not.toHaveBeenCalled();
      expect(mock.tx.insert).not.toHaveBeenCalled();
      expect(mock.tx.update).not.toHaveBeenCalled();
      expect(mock.commit).not.toHaveBeenCalled();
    });

    it('propagates a delete failure through the transaction without continuing or committing', async () => {
      const mock = createDbMock();
      const failure = new Error('cleanup failed');
      mock.deleteWhere.mockResolvedValueOnce(undefined).mockRejectedValueOnce(failure);

      await expect(run(mock.db, id, { confirmSlug: slug }, actor)).rejects.toBe(failure);

      expect(mock.transaction).toHaveBeenCalledOnce();
      expect(mock.rollback).toHaveBeenCalledExactlyOnceWith(failure);
      expect(mock.commit).not.toHaveBeenCalled();
      expect(mock.deletions.map((entry) => entry.table)).toEqual(deletedBeforeFailure);
      expect(mock.updates.map((entry) => entry.table)).toEqual(updatedBeforeFailure);
      expect(mock.audits).toHaveLength(1);
      expect(mock.events.at(-1)).toBe('rollback');
    });
  },
);

describe('deleteOrg', () => {
  it('forbids a member from deleting the organization', async () => {
    const mock = createDbMock([[organizationMemberTable, [{ role: 'MEMBER' }]]]);

    const result = deleteOrg(mock.db, orgId, { confirmSlug: org.slug }, actor);
    await expect(result).rejects.toMatchObject({
      code: 'forbidden',
    });

    expect(mock.tx.delete).not.toHaveBeenCalled();
    expect(mock.tx.insert).not.toHaveBeenCalled();
    expect(mock.tx.update).not.toHaveBeenCalled();
  });

  it('rejects published plugins before audit or cleanup', async () => {
    const mock = createDbMock([[pluginTable, [{ id: 'published-plugin' }]]]);

    const result = deleteOrg(mock.db, orgId, { confirmSlug: org.slug }, actor);
    await expect(result).rejects.toMatchObject({
      code: 'conflict',
    });

    expect(compile(mock.selections[2]!.condition)).toEqual({
      sql: '"plugin"."publisher_organization_id" = $1',
      params: [orgId],
    });
    expect(mock.tx.select).toHaveBeenCalledTimes(3);
    expect(mock.tx.delete).not.toHaveBeenCalled();
    expect(mock.tx.insert).not.toHaveBeenCalled();
    expect(mock.tx.update).not.toHaveBeenCalled();
    expect(mock.commit).not.toHaveBeenCalled();
  });

  it('audits and cleans up in order while retaining unrelated invitation emails', async () => {
    const mock = createDbMock([
      [
        outboxTable,
        [
          { id: 'matching-invite', payload: JSON.stringify({ orgId }) },
          { id: 'second-invite', payload: JSON.stringify({ orgId, to: 'invite@example.test' }) },
          { id: 'other-org-invite', payload: JSON.stringify({ orgId: 'other-org' }) },
          { id: 'empty-invite', payload: null },
          { id: 'invalid-invite', payload: '{invalid' },
          { id: 'null-invite', payload: 'null' },
          { id: 'primitive-invite', payload: '42' },
          { id: 'missing-org-invite', payload: '{}' },
        ],
      ],
    ]);

    await expect(
      deleteOrg(mock.db, orgId, { confirmSlug: org.slug }, actor),
    ).resolves.toBeUndefined();

    expect(mock.events).toEqual([
      'select:organization',
      'select:organization_member',
      'select:plugin',
      'select:organization_member', // member fetch for notifications
      'insert:audit_log',
      'update:outbox', // poison pending invites via SQL
      'delete:installation_component',
      'delete:installation',
      'delete:api_key',
      'delete:user',
      'delete:project',
      'delete:org_key',
      'delete:organization_member',
      'delete:email_token',
      'delete:org_policy',
      'delete:organization',
      'insert:outbox', // notification email — member 1
      'insert:outbox', // notification email — member 2
      'commit',
    ]);
    expect(mock.transaction).toHaveBeenCalledOnce();
    expect(mock.tx.execute).not.toHaveBeenCalled();
    // First insert is audit_log; subsequent inserts are outbox notification rows.
    expect(mock.tx.insert).toHaveBeenCalledWith(auditLogTable);
    expect(mock.tx.insert).toHaveBeenCalledWith(outboxTable);
    const auditRow = mock.audits[0]!;
    expect(auditRow).toEqual({
      id: expect.any(String),
      eventId: expect.any(String),
      actorId: actor.userId,
      actorKind: 'user_session',
      action: 'org.deleted',
      targetKind: 'organization',
      targetId: orgId,
      orgId,
      projectId: null,
      subjectUserId: null,
      result: 'success',
      context: JSON.stringify({ organizationId: orgId, slug: org.slug }),
      requestId: actor.requestId,
      ip: null,
    });
    // Notification rows follow the audit row in mock.audits.
    expect(mock.audits.slice(1)).toHaveLength(orgMembers.length);
    for (const [i, member] of orgMembers.entries()) {
      expect(mock.audits[1 + i]).toMatchObject({
        eventType: 'deletion.requested',
        status: 'pending',
        attempts: 0,
      });
      const notifPayload = JSON.parse(mock.audits[1 + i]!.payload as string) as Record<
        string,
        unknown
      >;
      expect(notifPayload.to).toBe(member.email);
      expect(notifPayload.resourceKind).toBe('org');
    }
    expect(mock.deletions.map((entry) => entry.table)).toEqual([
      installationComponentTable,
      installationTable,
      apiKeyTable,
      userTable,
      projectTable,
      orgKeyTable,
      organizationMemberTable,
      emailTokenTable,
      orgPolicyTable,
      organizationTable,
    ]);
    expect(mock.deletions.map((entry) => getTableName(entry.table))).toEqual(
      [...ORG_PURGE_ORDER].map((name) => (name === 'project_user' ? 'user' : name)),
    );
    const idColumn: Record<string, string> = {
      organization: 'id',
      org_policy: 'organization_id',
      email_token: 'org_id',
    };
    for (const { table, condition } of mock.deletions) {
      const name = getTableName(table);
      if (name === 'user') continue;
      expect(compile(condition)).toEqual({
        sql: `"${name}"."${idColumn[name] ?? 'organization_id'}" = $1`,
        params: [orgId],
      });
    }
    // Invite poison update uses SQL jsonb filter — no JS scan.
    expect(mock.updates[0]!.table).toBe(outboxTable);
    expect(mock.updates[0]!.values).toEqual({
      payload: null,
      status: 'failed',
      leaseOwner: null,
      leaseExpiresAt: null,
    });
    expect(mock.commit).toHaveBeenCalledOnce();
    expect(mock.rollback).not.toHaveBeenCalled();
  });
});
