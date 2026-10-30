import { randomUUID } from 'node:crypto';
import { sql } from 'drizzle-orm';
import {
  createErrorReporter,
  createGuardedSink,
  type GuardedSinkOptions,
  type ErrorBatch,
  type ErrorReporter,
  type ErrorSink,
} from '@boldcreate-integrations/observability';
import type { Executor } from './client.js';
import { errorEventTable, errorGroupTable, opsEventTable } from './schema/index.js';

interface GroupTotal {
  count: number;
  last: Date;
  first: Date;
  latest: ErrorBatch['errors'][number];
}

/**
 * Writes a batch of reports. Each fingerprint is one atomic upsert, so concurrent services never
 * create a second group; a group that was resolved opens again when it recurs. Only sampled
 * occurrences get an `error_event` row, yet every occurrence adds to the group's count.
 */
export function createDbErrorSink(db: Executor): ErrorSink {
  return {
    async write(batch) {
      const totals = new Map<string, GroupTotal>();
      for (const report of batch.errors) {
        const total = totals.get(report.fingerprint);
        if (!total) {
          totals.set(report.fingerprint, {
            count: 1,
            first: report.occurredAt,
            last: report.occurredAt,
            latest: report,
          });
        } else {
          total.count += 1;
          if (report.occurredAt >= total.last) {
            total.last = report.occurredAt;
            total.latest = report;
          }
          if (report.occurredAt < total.first) total.first = report.occurredAt;
        }
      }

      // One statement for every group. Rows go in fingerprint order, so two services upserting
      // overlapping sets lock the rows in the same order and cannot wait on each other.
      const rows = [...totals]
        .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([fingerprint, total]) => ({
          id: randomUUID(),
          fingerprint,
          service: total.latest.service,
          area: total.latest.area,
          title: total.latest.title,
          count: total.count,
          firstSeen: total.first,
          lastSeen: total.last,
          appVersion: total.latest.release,
        }));
      const ids = new Map<string, string>();
      if (rows.length > 0) {
        const written = await db
          .insert(errorGroupTable)
          .values(rows)
          .onConflictDoUpdate({
            target: errorGroupTable.fingerprint,
            set: {
              count: sql`${errorGroupTable.count} + excluded.count`,
              lastSeen: sql`GREATEST(${errorGroupTable.lastSeen}, excluded.last_seen)`,
              appVersion: sql`excluded.app_version`,
              status: sql`CASE WHEN ${errorGroupTable.status} = 'resolved' THEN 'unresolved' ELSE ${errorGroupTable.status} END`,
              resolvedAt: sql`CASE WHEN ${errorGroupTable.status} = 'resolved' THEN NULL ELSE ${errorGroupTable.resolvedAt} END`,
              resolvedBy: sql`CASE WHEN ${errorGroupTable.status} = 'resolved' THEN NULL ELSE ${errorGroupTable.resolvedBy} END`,
            },
          })
          .returning({ id: errorGroupTable.id, fingerprint: errorGroupTable.fingerprint });
        for (const row of written) ids.set(row.fingerprint, row.id);
      }

      const events = batch.errors.flatMap((report) => {
        const groupId = ids.get(report.fingerprint);
        if (!report.sampled || !groupId) return [];
        return [
          {
            id: randomUUID(),
            groupId,
            occurredAt: report.occurredAt,
            environment: report.environment,
            appVersion: report.release,
            instanceId: report.instanceId,
            requestId: report.requestId,
            traceId: report.traceId,
            orgId: report.orgId,
            stack: report.stack,
            context: report.context,
          },
        ];
      });
      if (events.length > 0) await db.insert(errorEventTable).values(events);

      if (batch.events.length > 0) {
        await db.insert(opsEventTable).values(
          batch.events.map((event) => ({
            id: randomUUID(),
            occurredAt: event.occurredAt,
            service: event.service,
            kind: event.kind,
            severity: event.severity,
            environment: event.environment,
            appVersion: event.release,
            instanceId: event.instanceId,
            orgId: event.orgId,
            detail: event.detail,
          })),
        );
      }
    },
  };
}

/**
 * Start-up checks every service with a database shares: that it can connect as its own role, and
 * that the error tables exist and are readable to it, which is what a missing migration or grant
 * in a deployed environment looks like.
 */
export function databaseStartupChecks(
  db: Executor,
  store: Executor = db,
): Record<string, () => Promise<unknown>> {
  return {
    database: () => db.execute(sql`SELECT 1`),
    error_tables: () => store.select({ id: errorGroupTable.id }).from(errorGroupTable).limit(1),
  };
}

/** The check of `databaseStartupChecks` that concerns the observability store, not the service. */
export const OBSERVABILITY_STORE_CHECK = 'error_tables';

/** The reporter a service creates at start: stores to the database and tags every report. */
export function createServiceErrorReporter(options: {
  service: string;
  environment: string;
  db: Executor;
  onDrop: (reason: string, count: number) => void;
  /** Pauses writes after repeated failures; see `createGuardedSink`. Unset writes every batch. */
  guard?: Omit<GuardedSinkOptions, 'now'>;
}): ErrorReporter {
  const release = process.env['APP_RELEASE'];
  const instanceId = process.env['HOSTNAME'];
  return createErrorReporter({
    service: options.service,
    environment: options.environment,
    ...(release ? { release } : {}),
    ...(instanceId ? { instanceId } : {}),
    sink: options.guard
      ? createGuardedSink(createDbErrorSink(options.db), options.guard)
      : createDbErrorSink(options.db),
    onDrop: options.onDrop,
  });
}
