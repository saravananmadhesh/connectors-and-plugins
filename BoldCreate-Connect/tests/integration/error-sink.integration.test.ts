/** The error sink against real Postgres: one group per fingerprint, regressions, sampled events. */
import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { afterAll, describe, expect, it } from 'vitest';
import {
  createDb,
  createDbErrorSink,
  errorEventTable,
  errorGroupTable,
  opsEventTable,
} from '../../packages/db/src/index.js';
import type { ErrorReport } from '../../packages/observability/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const sink = createDbErrorSink(db);
const fingerprint = `test-${randomUUID()}`;

function report(overrides: Partial<ErrorReport> = {}): ErrorReport {
  return {
    fingerprint,
    service: 'api',
    area: 'kms',
    title: 'Error: boom',
    occurredAt: new Date(),
    environment: 'test',
    release: '1.0.0',
    instanceId: 'pod-1',
    requestId: 'req-1',
    traceId: null,
    orgId: null,
    stack: 'Error: boom',
    context: { step: 'unwrap' },
    sampled: true,
    ...overrides,
  };
}

const groupRow = async () =>
  (await db.select().from(errorGroupTable).where(eq(errorGroupTable.fingerprint, fingerprint)))[0];

afterAll(async () => {
  await db.delete(errorGroupTable).where(eq(errorGroupTable.fingerprint, fingerprint));
  await db.delete(opsEventTable).where(eq(opsEventTable.service, 'integration-test'));
  await pool.end();
});

describe('error sink', () => {
  it('counts every occurrence but stores only sampled events', async () => {
    await sink.write({
      errors: [report(), report({ sampled: false, stack: null, context: null }), report()],
      events: [],
    });
    const group = await groupRow();
    expect(group?.count).toBe(3);
    const events = await db
      .select()
      .from(errorEventTable)
      .where(eq(errorEventTable.groupId, group!.id));
    expect(events).toHaveLength(2);
  });

  it('does not create a second group when written concurrently', async () => {
    await Promise.all([1, 2, 3, 4].map(() => sink.write({ errors: [report()], events: [] })));
    const groups = await db
      .select()
      .from(errorGroupTable)
      .where(eq(errorGroupTable.fingerprint, fingerprint));
    expect(groups).toHaveLength(1);
    expect(groups[0]?.count).toBe(7);
  });

  it('opens a resolved group again, and leaves an ignored one ignored', async () => {
    const group = (await groupRow())!;
    await db
      .update(errorGroupTable)
      .set({ status: 'resolved', resolvedAt: new Date(), resolvedBy: 'admin' })
      .where(eq(errorGroupTable.id, group.id));
    await sink.write({ errors: [report()], events: [] });
    expect(await groupRow()).toMatchObject({
      status: 'unresolved',
      resolvedAt: null,
      resolvedBy: null,
    });

    await db
      .update(errorGroupTable)
      .set({ status: 'ignored' })
      .where(eq(errorGroupTable.id, group.id));
    await sink.write({ errors: [report()], events: [] });
    expect((await groupRow())?.status).toBe('ignored');
  });

  it('writes key events', async () => {
    await sink.write({
      errors: [],
      events: [
        {
          occurredAt: new Date(),
          service: 'integration-test',
          kind: 'startup_check_failed',
          severity: 'error',
          environment: 'test',
          release: null,
          instanceId: null,
          orgId: null,
          detail: { check: 'grants' },
        },
      ],
    });
    const rows = await db
      .select()
      .from(opsEventTable)
      .where(eq(opsEventTable.service, 'integration-test'));
    expect(rows[0]).toMatchObject({ kind: 'startup_check_failed', detail: { check: 'grants' } });
  });
});
