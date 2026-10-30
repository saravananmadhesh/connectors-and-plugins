/** The admin reads and status changes for errors and events, against real Postgres. */
import { randomUUID } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { afterAll, describe, expect, it } from 'vitest';
import {
  auditLogTable,
  createDb,
  errorEventTable,
  errorGroupTable,
  opsEventTable,
  withMaintenance,
} from '../../packages/db/src/index.js';
import {
  deleteErrorGroup,
  getErrorGroup,
  getObservabilityOverview,
  getObservabilityStorage,
  listErrorGroups,
  listOpsEvents,
  purgeObservabilityData,
  setErrorGroupStatus,
} from '../../packages/domain/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const service = `admin-observability-${randomUUID()}`;
const actor = { subject: 'ops@example.test', requestId: 'req-1', ip: '203.0.113.9' };
const at = (secondsAgo: number) => new Date(Date.now() - secondsAgo * 1000);

async function group(secondsAgo: number): Promise<string> {
  const id = randomUUID();
  await db.insert(errorGroupTable).values({
    id,
    fingerprint: `${service}-${id}`,
    service,
    area: 'kms',
    title: `Error: ${id}`,
    count: 3,
    firstSeen: at(secondsAgo + 10),
    lastSeen: at(secondsAgo),
  });
  return id;
}

afterAll(async () => {
  await db.delete(errorGroupTable).where(eq(errorGroupTable.service, service));
  await db.delete(opsEventTable).where(eq(opsEventTable.service, service));
  await withMaintenance(db, 'admin_read', (tx) =>
    tx.delete(auditLogTable).where(eq(auditLogTable.actorId, actor.subject)),
  ).catch(() => undefined);
  await pool.end();
});

describe('admin observability', () => {
  it('pages the error list newest first without repeats or gaps', async () => {
    const ids = [await group(30), await group(20), await group(10), await group(5)];
    const first = await listErrorGroups(db, { limit: 3, service });
    expect(first.items.map((item) => item.id)).toEqual([ids[3], ids[2], ids[1]]);
    expect(first.nextCursor).not.toBeNull();
    const second = await listErrorGroups(db, {
      limit: 3,
      service,
      ...(first.nextCursor ? { cursor: first.nextCursor } : {}),
    });
    expect(second.items.map((item) => item.id)).toEqual([ids[0]]);
    expect(second.nextCursor).toBeNull();
  });

  it('filters by status and ignores a cursor it cannot read', async () => {
    const id = await group(50);
    await db.update(errorGroupTable).set({ status: 'ignored' }).where(eq(errorGroupTable.id, id));
    const ignored = await listErrorGroups(db, { limit: 50, service, status: 'ignored' });
    expect(ignored.items.map((item) => item.id)).toEqual([id]);
    const garbled = await listErrorGroups(db, { limit: 50, service, cursor: 'not-a-cursor' });
    expect(garbled.items.length).toBeGreaterThan(1);
  });

  it('shows a group with its newest stored occurrences', async () => {
    const id = await group(40);
    for (const age of [3, 2, 1]) {
      await db.insert(errorEventTable).values({
        id: randomUUID(),
        groupId: id,
        occurredAt: at(age),
        environment: 'test',
        stack: `Error at ${age}`,
      });
    }
    const detail = await getErrorGroup(db, id);
    expect(detail.group.id).toBe(id);
    expect(detail.occurrences.map((item) => item.stack)).toEqual([
      'Error at 1',
      'Error at 2',
      'Error at 3',
    ]);
    await expect(getErrorGroup(db, randomUUID())).rejects.toMatchObject({ code: 'not_found' });
  });

  it('deletes a resolved group with its occurrences and an audit row, and keeps an open one', async () => {
    const id = await group(60);
    await db
      .insert(errorEventTable)
      .values({ id: randomUUID(), groupId: id, occurredAt: at(60), environment: 'test' });
    await expect(deleteErrorGroup(db, db, id, actor)).rejects.toMatchObject({ code: 'conflict' });
    await setErrorGroupStatus(db, db, id, { status: 'ignored' }, actor);
    await deleteErrorGroup(db, db, id, actor);
    await expect(getErrorGroup(db, id)).rejects.toMatchObject({ code: 'not_found' });
    expect(await db.select().from(errorEventTable).where(eq(errorEventTable.groupId, id))).toEqual(
      [],
    );
    const rows = await withMaintenance(db, 'admin_read', (tx) =>
      tx
        .select()
        .from(auditLogTable)
        .where(
          and(
            eq(auditLogTable.targetId, id),
            eq(auditLogTable.action, 'admin.error_group_deleted'),
          ),
        ),
    );
    expect(rows).toHaveLength(1);
    await expect(deleteErrorGroup(db, db, randomUUID(), actor)).rejects.toMatchObject({
      code: 'not_found',
    });
  });

  it('resolves and reopens a group, writing one audit row per real change', async () => {
    const id = await group(60);
    const resolved = await setErrorGroupStatus(db, db, id, { status: 'resolved' }, actor);
    expect(resolved.group).toMatchObject({ status: 'resolved', resolvedBy: actor.subject });
    expect(resolved.group.resolvedAt).not.toBeNull();

    await setErrorGroupStatus(db, db, id, { status: 'resolved' }, actor);
    const reopened = await setErrorGroupStatus(db, db, id, { status: 'unresolved' }, actor);
    expect(reopened.group).toMatchObject({
      status: 'unresolved',
      resolvedAt: null,
      resolvedBy: null,
    });

    const rows = await withMaintenance(db, 'admin_read', (tx) =>
      tx
        .select()
        .from(auditLogTable)
        .where(
          and(
            eq(auditLogTable.targetId, id),
            eq(auditLogTable.action, 'admin.error_status_changed'),
          ),
        ),
    );
    expect(rows).toHaveLength(2);
    await expect(
      setErrorGroupStatus(db, db, randomUUID(), { status: 'ignored' }, actor),
    ).rejects.toMatchObject({ code: 'not_found' });
  });

  it('lists events by kind prefix and severity', async () => {
    for (const [kind, severity] of [
      ['job_attempt_failed', 'warning'],
      ['startup_check_failed', 'error'],
      ['startup_check_passed', 'info'],
    ] as const) {
      await db.insert(opsEventTable).values({
        id: randomUUID(),
        occurredAt: new Date(),
        service,
        kind,
        severity,
        environment: 'test',
      });
    }
    const startup = await listOpsEvents(db, { limit: 50, service, kind: 'startup_' });
    expect(startup.items).toHaveLength(0);
    const exact = await listOpsEvents(db, { limit: 50, service, kind: 'startup_check_failed' });
    expect(exact.items).toHaveLength(1);
    const errors = await listOpsEvents(db, { limit: 50, service, severity: 'error' });
    expect(errors.items.map((item) => item.kind)).toEqual(['startup_check_failed']);
  });

  it('reports the size and oldest entry of each table', async () => {
    const storage = await getObservabilityStorage(db, 1000);
    expect(storage.tables.map((row) => row.table)).toEqual([
      'error_group',
      'error_event',
      'ops_event',
    ]);
    expect(storage.maxTotalBytes).toBe(1000);
    expect(storage.totalBytes).toBeGreaterThan(0);
    expect(storage.tables[0]?.rows).toBeGreaterThan(0);
  });
});

describe('searching errors by title', () => {
  it('finds words in a title without case, and treats % and _ as plain characters', async () => {
    const exact = randomUUID();
    await db.insert(errorGroupTable).values([
      {
        id: randomUUID(),
        fingerprint: `${service}-a-${exact}`,
        service,
        title: `Connection Timeout talking to billing ${exact}`,
        firstSeen: at(30),
        lastSeen: at(20),
      },
      {
        id: randomUUID(),
        fingerprint: `${service}-b-${exact}`,
        service,
        title: `Disk 100% full ${exact}`,
        firstSeen: at(30),
        lastSeen: at(21),
      },
    ]);
    const timeout = await listErrorGroups(db, { limit: 50, service, q: 'connection timeout' });
    expect(timeout.items.map((item) => item.title)).toEqual([
      `Connection Timeout talking to billing ${exact}`,
    ]);
    expect((await listErrorGroups(db, { limit: 50, service, q: '100%' })).items).toHaveLength(1);
    expect((await listErrorGroups(db, { limit: 50, service, q: '%' })).items).toHaveLength(1);
    expect((await listErrorGroups(db, { limit: 50, service, q: 'a_b' })).items).toHaveLength(0);
  });
});

describe('overview', () => {
  it('counts what happened in the window and ranks the loudest unresolved errors', async () => {
    const own = `${service}-overview`;
    const insert = (values: Partial<typeof errorGroupTable.$inferInsert>) =>
      db.insert(errorGroupTable).values({
        id: randomUUID(),
        fingerprint: `${own}-${randomUUID()}`,
        service: own,
        title: 'Overview fixture',
        ...values,
      });
    await insert({
      count: 2_000_000_000,
      firstSeen: at(600),
      lastSeen: at(60),
      title: 'Loud and old',
    });
    await insert({
      count: 1_999_999_999,
      firstSeen: at(60),
      lastSeen: at(30),
      title: 'Quiet and new',
    });
    await insert({
      count: 99,
      status: 'resolved',
      firstSeen: at(600),
      lastSeen: at(30),
      title: 'Resolved noise',
    });
    await insert({ count: 1, firstSeen: at(900_000), lastSeen: at(800_000), title: 'Last week' });
    for (const [kind, severity] of [
      ['job_attempt_failed', 'warning'],
      ['startup_check_failed', 'error'],
      ['deploy_started', 'info'],
    ] as const) {
      await db.insert(opsEventTable).values({
        id: randomUUID(),
        occurredAt: at(120),
        service: own,
        kind,
        severity,
        environment: 'test',
      });
    }
    const overview = await getObservabilityOverview(db, { window: '24h' });
    const ours = overview.services.find((row) => row.service === own);
    expect(ours).toEqual({ service: own, activeGroups: 3, problemEvents: 2 });
    expect(overview.activeGroups).toBeGreaterThanOrEqual(3);
    expect(overview.newGroups).toBeGreaterThanOrEqual(1);
    expect(overview.events.error).toBeGreaterThanOrEqual(1);
    expect(overview.events.warning).toBeGreaterThanOrEqual(1);
    expect(overview.events.info).toBeGreaterThanOrEqual(1);
    const ownTop = overview.topGroups.filter((item) => item.service === own);
    expect(ownTop.map((item) => item.title)).toEqual(['Loud and old', 'Quiet and new']);
    expect(overview.topGroups.length).toBeLessThanOrEqual(5);
    const weekly = await getObservabilityOverview(db, { window: '7d' });
    expect(weekly.services.find((row) => row.service === own)?.activeGroups).toBe(3);
    await db.delete(errorGroupTable).where(eq(errorGroupTable.service, own));
    await db.delete(opsEventTable).where(eq(opsEventTable.service, own));
  });
});

describe('deleting records older than a date', () => {
  const day = (days: number) => new Date(Date.now() - days * 86_400_000);
  const auditOf = async (table: string) =>
    withMaintenance(db, 'admin_read', (tx) =>
      tx
        .select()
        .from(auditLogTable)
        .where(
          and(
            eq(auditLogTable.targetId, table),
            eq(auditLogTable.action, 'admin.observability_purged'),
            eq(auditLogTable.actorId, actor.subject),
          ),
        ),
    );

  it('removes occurrences older than the date and keeps the newer ones', async () => {
    const id = await group(10);
    for (const days of [9, 6, 0.04]) {
      await db.insert(errorEventTable).values({
        id: randomUUID(),
        groupId: id,
        occurredAt: day(days),
        environment: 'test',
      });
    }
    const before = (await auditOf('error_event')).length;
    const result = await purgeObservabilityData(
      db,
      db,
      { table: 'error_event', before: day(3).toISOString() },
      actor,
    );
    expect(result.done).toBe(true);
    expect(result.removed).toBeGreaterThanOrEqual(2);
    const left = await db.select().from(errorEventTable).where(eq(errorEventTable.groupId, id));
    expect(left).toHaveLength(1);
    expect((await auditOf('error_event')).length).toBe(before + 1);
  });

  it('removes old resolved and ignored errors with their occurrences, never an unresolved one', async () => {
    const mk = async (status: 'unresolved' | 'resolved' | 'ignored') => {
      const id = randomUUID();
      await db.insert(errorGroupTable).values({
        id,
        fingerprint: `${service}-purge-${id}`,
        service,
        title: `Old ${status}`,
        status,
        firstSeen: day(25),
        lastSeen: day(20),
      });
      await db
        .insert(errorEventTable)
        .values({ id: randomUUID(), groupId: id, occurredAt: day(12), environment: 'test' });
      return id;
    };
    const [open, resolved, ignored] = [
      await mk('unresolved'),
      await mk('resolved'),
      await mk('ignored'),
    ];
    const result = await purgeObservabilityData(
      db,
      db,
      { table: 'error_group', before: day(10).toISOString() },
      actor,
    );
    expect(result.done).toBe(true);
    await expect(getErrorGroup(db, resolved)).rejects.toMatchObject({ code: 'not_found' });
    await expect(getErrorGroup(db, ignored)).rejects.toMatchObject({ code: 'not_found' });
    expect((await getErrorGroup(db, open)).occurrences).toHaveLength(1);
    expect(
      await db.select().from(errorEventTable).where(eq(errorEventTable.groupId, resolved)),
    ).toEqual([]);
  });

  it('removes old events, and stops at its limit so a caller repeats it', async () => {
    const own = `${service}-purge-events`;
    await db.insert(opsEventTable).values(
      Array.from({ length: 6 }, () => ({
        id: randomUUID(),
        occurredAt: day(20),
        service: own,
        kind: 'job_attempt_failed',
        severity: 'warning' as const,
        environment: 'test',
      })),
    );
    const step = await purgeObservabilityData(
      db,
      db,
      { table: 'ops_event', before: day(10).toISOString() },
      actor,
      { batchSize: 1, maxRunMs: 1 },
    );
    expect(step.removed).toBeGreaterThanOrEqual(1);
    let removed = step.removed;
    let done = step.done;
    for (let guard = 0; !done && guard < 100; guard += 1) {
      const next = await purgeObservabilityData(
        db,
        db,
        { table: 'ops_event', before: day(10).toISOString() },
        actor,
        { batchSize: 2, maxRunMs: 50 },
      );
      removed += next.removed;
      done = next.done;
    }
    expect(done).toBe(true);
    expect(removed).toBeGreaterThanOrEqual(6);
    expect(await db.select().from(opsEventTable).where(eq(opsEventTable.service, own))).toEqual([]);
  });

  it('refuses a date in the future and records nothing', async () => {
    const before = (await auditOf('ops_event')).length;
    await expect(
      purgeObservabilityData(
        db,
        db,
        { table: 'ops_event', before: new Date(Date.now() + 3_600_000).toISOString() },
        actor,
      ),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    expect((await auditOf('ops_event')).length).toBe(before);
  });
});
