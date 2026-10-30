/**
 * Errors and events as each service really reaches them: with the narrow login role the service
 * runs as, and through the separate pool the observability store uses. A privileged login would
 * hide a missing grant, which only shows up when deployed.
 */
import { randomUUID } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { afterAll, describe, expect, it } from 'vitest';
import {
  auditLogTable,
  createDb,
  createDbErrorSink,
  createObservabilityStore,
  errorGroupTable,
  findAlertableErrors,
  opsEventTable,
  purgeObservability,
  recordErrorAlertsSent,
  type RetentionPolicy,
} from '../../packages/db/src/index.js';
import {
  createPostgresObservabilityReader,
  getErrorGroup,
  getObservabilityStorage,
  listErrorGroups,
  listOpsEvents,
  setErrorGroupStatus,
} from '../../packages/domain/src/index.js';
import type { ErrorReport } from '../../packages/observability/src/index.js';
import { databaseUrl, roleConnectionString } from './test-env.js';

const owner = createDb({ connectionString: databaseUrl, max: 2 });
const api = createDb({ connectionString: roleConnectionString('api'), max: 2 });
const gateway = createDb({ connectionString: roleConnectionString('gateway'), max: 2 });
const worker = createDb({ connectionString: roleConnectionString('worker'), max: 2 });
const admin = createDb({ connectionString: roleConnectionString('admin'), max: 2 });
const service = `roles-${randomUUID()}`;
const actor = { subject: 'ops@example.test', requestId: 'req-1', ip: '203.0.113.9' };

function report(fingerprint: string, overrides: Partial<ErrorReport> = {}): ErrorReport {
  return {
    fingerprint,
    service,
    area: 'kms',
    title: `Error: ${fingerprint}`,
    occurredAt: new Date(),
    environment: 'test',
    release: '2.0.0',
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

const groupOf = async (fingerprint: string) =>
  (
    await owner.db
      .select()
      .from(errorGroupTable)
      .where(eq(errorGroupTable.fingerprint, fingerprint))
  )[0];

afterAll(async () => {
  await owner.db.delete(errorGroupTable).where(eq(errorGroupTable.service, service));
  await owner.db.delete(opsEventTable).where(eq(opsEventTable.service, service));
  await Promise.all([owner, api, gateway, worker, admin].map(({ pool }) => pool.end()));
});

describe('the sink under the service roles', () => {
  it.each([
    ['api', api],
    ['gateway', gateway],
  ])('%s writes a batch of groups in one go, and reopens a resolved one', async (_name, handle) => {
    const sink = createDbErrorSink(handle.db);
    const [first, second, third] = [randomUUID(), randomUUID(), randomUUID()].map(
      (id) => `${service}-${id}`,
    );

    await sink.write({
      errors: [report(third!), report(first!), report(first!, { sampled: false }), report(second!)],
      events: [
        {
          service,
          kind: 'roles_check',
          severity: 'info',
          occurredAt: new Date(),
          environment: 'test',
          release: '2.0.0',
          instanceId: 'pod-1',
          orgId: null,
          detail: { ok: true },
        },
      ],
    });
    expect((await groupOf(first!))?.count).toBe(2);
    expect((await groupOf(second!))?.count).toBe(1);
    expect((await groupOf(third!))?.appVersion).toBe('2.0.0');

    await owner.db
      .update(errorGroupTable)
      .set({ status: 'resolved', resolvedAt: new Date(), resolvedBy: 'ops@example.test' })
      .where(eq(errorGroupTable.fingerprint, first!));
    await sink.write({ errors: [report(first!, { release: '2.0.1' })], events: [] });
    expect(await groupOf(first!)).toMatchObject({
      status: 'unresolved',
      count: 3,
      appVersion: '2.0.1',
      resolvedAt: null,
    });
  });
});

describe('the worker role', () => {
  const policy: RetentionPolicy = {
    errorEventDays: 14,
    errorGroupDays: 30,
    opsEventDays: 30,
    longLivedOpsKinds: ['key_created'],
    longLivedOpsEventDays: 90,
    batchSize: 100,
    maxTotalBytes: 0,
  };

  it('purges, finds alertable errors and records the alerts it sent', async () => {
    const fingerprint = `${service}-${randomUUID()}`;
    await createDbErrorSink(api.db).write({ errors: [report(fingerprint)], events: [] });
    const now = new Date();

    await expect(purgeObservability(worker.db, policy, now)).resolves.toMatchObject({
      sizeGuardRemoved: 0,
    });

    const alertPolicy = {
      newGroupWindowSeconds: 600,
      spikeWindowSeconds: 600,
      spikeOccurrences: 20,
      cooldownSeconds: 3600,
      maxGroups: 1000,
    };
    const found = (await findAlertableErrors(worker.db, alertPolicy, now)).filter(
      (candidate) => candidate.service === service,
    );
    expect(found.length).toBeGreaterThan(0);
    await recordErrorAlertsSent(worker.db, found, 1, now);
    const after = await findAlertableErrors(worker.db, alertPolicy, now);
    expect(after.some((candidate) => candidate.service === service)).toBe(false);
  });

  it('removes expired rows even though it may only read the columns it filters on', async () => {
    const fingerprint = `${service}-${randomUUID()}`;
    await createDbErrorSink(api.db).write({
      errors: [report(fingerprint, { occurredAt: new Date(Date.now() - 40 * 86_400_000) })],
      events: [],
    });
    await owner.db
      .update(errorGroupTable)
      .set({ lastSeen: new Date(Date.now() - 40 * 86_400_000) })
      .where(eq(errorGroupTable.fingerprint, fingerprint));
    const result = await purgeObservability(worker.db, policy, new Date());
    expect(result.errorGroups).toBeGreaterThanOrEqual(1);
    expect(await groupOf(fingerprint)).toBeUndefined();
  });
});

describe('the admin role', () => {
  it('reads errors and events, reports storage and changes a status with an audit row', async () => {
    const fingerprint = `${service}-${randomUUID()}`;
    await createDbErrorSink(api.db).write({
      errors: [report(fingerprint)],
      events: [
        {
          service,
          kind: 'roles_check',
          severity: 'warning',
          occurredAt: new Date(),
          environment: 'test',
          release: null,
          instanceId: null,
          orgId: null,
          detail: null,
        },
      ],
    });
    const id = (await groupOf(fingerprint))!.id;

    const list = await listErrorGroups(admin.db, { limit: 100, service });
    expect(list.items.some((item) => item.id === id)).toBe(true);
    expect((await getErrorGroup(admin.db, id)).occurrences).toHaveLength(1);
    expect((await listOpsEvents(admin.db, { limit: 10, service })).items.length).toBeGreaterThan(0);
    expect((await getObservabilityStorage(admin.db, 0)).tables).toHaveLength(3);

    const changed = await setErrorGroupStatus(admin.db, admin.db, id, { status: 'ignored' }, actor);
    expect(changed.group.status).toBe('ignored');
    const audit = await owner.db.select().from(auditLogTable).where(eq(auditLogTable.targetId, id));
    expect(audit.map((row) => row.action)).toContain('admin.error_status_changed');
  });
});

describe('the admin reader', () => {
  it('serves every admin read and the status change through one interface', async () => {
    const fingerprint = `${service}-${randomUUID()}`;
    await createDbErrorSink(api.db).write({ errors: [report(fingerprint)], events: [] });
    const id = (await groupOf(fingerprint))!.id;
    const reader = createPostgresObservabilityReader({
      store: admin.db,
      audit: admin.db,
      maxTotalBytes: 0,
    });

    expect(
      (await reader.listErrorGroups({ limit: 100, service })).items.map((i) => i.id),
    ).toContain(id);
    expect((await reader.getErrorGroup(id)).group.id).toBe(id);
    expect((await reader.setErrorGroupStatus(id, { status: 'ignored' }, actor)).group.status).toBe(
      'ignored',
    );
    expect((await reader.listOpsEvents({ limit: 5 })).items).toBeDefined();
    expect((await reader.getStorage()).tables).toHaveLength(3);
  });
});

describe('the admin dated delete', () => {
  it('removes old rows of every table through the admin role, with an audit row', async () => {
    const fingerprint = `${service}-${randomUUID()}`;
    await createDbErrorSink(api.db).write({
      errors: [report(fingerprint, { occurredAt: new Date(Date.now() - 12 * 86_400_000) })],
      events: [
        {
          service,
          kind: 'roles_purge',
          severity: 'info',
          occurredAt: new Date(Date.now() - 12 * 86_400_000),
          environment: 'test',
          release: null,
          instanceId: null,
          orgId: null,
          detail: null,
        },
      ],
    });
    await owner.db
      .update(errorGroupTable)
      .set({ status: 'resolved', lastSeen: new Date(Date.now() - 12 * 86_400_000) })
      .where(eq(errorGroupTable.fingerprint, fingerprint));
    const before = new Date(Date.now() - 10 * 86_400_000).toISOString();
    const reader = createPostgresObservabilityReader({
      store: admin.db,
      audit: admin.db,
      maxTotalBytes: 0,
    });

    for (const table of ['error_event', 'error_group', 'ops_event'] as const) {
      await expect(reader.purge({ table, before }, actor)).resolves.toMatchObject({ done: true });
    }
    expect(await groupOf(fingerprint)).toBeUndefined();
    expect(
      await owner.db
        .select()
        .from(opsEventTable)
        .where(and(eq(opsEventTable.service, service), eq(opsEventTable.kind, 'roles_purge'))),
    ).toEqual([]);
    const audit = await owner.db
      .select()
      .from(auditLogTable)
      .where(eq(auditLogTable.action, 'admin.observability_purged'));
    expect(audit.map((row) => row.targetId)).toEqual(
      expect.arrayContaining(['error_event', 'error_group', 'ops_event']),
    );
  });
});

describe('a separate observability store', () => {
  it('has a pool of its own with the configured limits, and works with no shared transaction', async () => {
    const store = createObservabilityStore({
      databaseUrl,
      observabilityDatabaseUrl: roleConnectionString('admin'),
      poolMax: 2,
      statementTimeoutMs: 7_000,
      lockTimeoutMs: 1_500,
      connectionTimeoutMs: 2_500,
      applicationName: 'roles-observability',
    });
    try {
      expect(store.external).toBe(true);
      expect(store.pool).not.toBe(admin.pool);
      expect(store.pool.options).toMatchObject({
        max: 2,
        statement_timeout: 7_000,
        connectionTimeoutMillis: 2_500,
        application_name: 'roles-observability',
      });
      const [settings] = (
        await store.pool.query<{ lock_timeout: string; statement_timeout: string }>(
          `SELECT current_setting('lock_timeout') AS lock_timeout,
                  current_setting('statement_timeout') AS statement_timeout`,
        )
      ).rows;
      expect(settings).toEqual({ lock_timeout: '1500ms', statement_timeout: '7s' });

      const fingerprint = `${service}-${randomUUID()}`;
      await createDbErrorSink(api.db).write({ errors: [report(fingerprint)], events: [] });
      const id = (await groupOf(fingerprint))!.id;
      // Group in one handle, audit row through another: no transaction spans them.
      await setErrorGroupStatus(store.db, admin.db, id, { status: 'resolved' }, actor);
      expect((await getErrorGroup(store.db, id)).group.status).toBe('resolved');
      const audit = await owner.db
        .select()
        .from(auditLogTable)
        .where(eq(auditLogTable.targetId, id));
      expect(audit.map((row) => row.action)).toContain('admin.error_status_changed');
    } finally {
      await store.pool.end();
    }
  });

  it('keeps the main database untouched when the store is unset: same database, own pool', () => {
    const store = createObservabilityStore({
      databaseUrl,
      poolMax: 2,
      statementTimeoutMs: 5_000,
      lockTimeoutMs: 1_000,
      connectionTimeoutMs: 1_000,
      applicationName: 'x',
    });
    expect(store.external).toBe(false);
    void store.pool.end();
  });
});
