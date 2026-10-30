/** The retention purge against real Postgres: cutoffs, long-lived kinds, cascade and size guard. */
import { randomUUID } from 'node:crypto';
import { and, eq, like } from 'drizzle-orm';
import { afterAll, describe, expect, it } from 'vitest';
import {
  createDb,
  errorEventTable,
  errorGroupTable,
  opsEventTable,
  purgeObservability,
  type RetentionPolicy,
} from '../../packages/db/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const service = `retention-${randomUUID()}`;
const now = new Date('2026-06-30T00:00:00Z');
const daysAgo = (days: number) => new Date(now.getTime() - days * 86_400_000);

const policy: RetentionPolicy = {
  errorEventDays: 14,
  errorGroupDays: 30,
  opsEventDays: 30,
  longLivedOpsKinds: ['key_created'],
  longLivedOpsEventDays: 90,
  batchSize: 2,
  maxTotalBytes: 0,
};

async function group(lastSeenDaysAgo: number) {
  const id = randomUUID();
  await db.insert(errorGroupTable).values({
    id,
    fingerprint: `${service}-${id}`,
    service,
    area: 'test',
    title: 'Error: boom',
    count: 1,
    firstSeen: daysAgo(lastSeenDaysAgo),
    lastSeen: daysAgo(lastSeenDaysAgo),
  });
  return id;
}

async function occurrence(groupId: string, ageDays: number) {
  await db.insert(errorEventTable).values({
    id: randomUUID(),
    groupId,
    occurredAt: daysAgo(ageDays),
    environment: 'test',
  });
}

async function ops(kind: string, ageDays: number) {
  await db.insert(opsEventTable).values({
    id: randomUUID(),
    occurredAt: daysAgo(ageDays),
    service,
    kind,
    severity: 'info',
    environment: 'test',
  });
}

afterAll(async () => {
  await db.delete(errorGroupTable).where(eq(errorGroupTable.service, service));
  await db.delete(opsEventTable).where(eq(opsEventTable.service, service));
  await pool.end();
});

describe('observability retention', () => {
  it('removes expired rows in batches and keeps the rest', async () => {
    const recent = await group(1);
    const stale = await group(45);
    for (const age of [20, 19, 18, 17, 1]) await occurrence(recent, age);
    await occurrence(stale, 2);
    for (const age of [40, 35, 31, 5]) await ops('job_attempt_failed', age);
    for (const age of [60, 100]) await ops('key_created', age);

    const result = await purgeObservability(db, policy, now);

    expect(result.errorEvents).toBeGreaterThanOrEqual(4);
    expect(result.errorGroups).toBeGreaterThanOrEqual(1);
    const events = await db
      .select()
      .from(errorEventTable)
      .where(eq(errorEventTable.groupId, recent));
    expect(events).toHaveLength(1);
    const groups = await db
      .select()
      .from(errorGroupTable)
      .where(eq(errorGroupTable.service, service));
    expect(groups.map((row) => row.id)).toEqual([recent]);
    const remaining = await db
      .select()
      .from(opsEventTable)
      .where(eq(opsEventTable.service, service));
    expect(remaining.map((row) => `${row.kind}`).sort()).toEqual([
      'job_attempt_failed',
      'key_created',
    ]);
  });

  it('removes the oldest occurrences early when the tables are over their size limit', async () => {
    const id = await group(1);
    for (const age of [5, 4, 3]) await occurrence(id, age);
    const result = await purgeObservability(db, { ...policy, maxTotalBytes: 1 }, now);
    expect(result.sizeGuardRemoved).toBeGreaterThanOrEqual(3);
    const events = await db.select().from(errorEventTable).where(eq(errorEventTable.groupId, id));
    expect(events).toHaveLength(0);
  });

  it('stops at its time limit with rows left, and the next run finishes the job', async () => {
    for (let i = 0; i < 7; i += 1) await ops(`paced_${i}`, 60);
    const left = () =>
      db
        .select()
        .from(opsEventTable)
        .where(and(eq(opsEventTable.service, service), like(opsEventTable.kind, 'paced_%')));
    const limited = await purgeObservability(db, { ...policy, batchPauseMs: 5, maxRunMs: 1 }, now);
    expect(limited.truncated).toBe(true);
    expect((await left()).length).toBeGreaterThan(0);

    const finished = await purgeObservability(db, policy, now);
    expect(finished.truncated).toBe(false);
    expect(await left()).toHaveLength(0);
  });
});
