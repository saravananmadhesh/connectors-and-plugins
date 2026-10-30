/**
 * How the error store behaves under a burst of failures from many instances while other queries
 * keep running. The size is small by default so the check is quick; raise it to size a database:
 * `OBSERVABILITY_STORM_REPORTS=200000 OBSERVABILITY_STORM_INSTANCES=24`. A report with the
 * measured figures is written to `reports/load/observability.json`.
 */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { eq } from 'drizzle-orm';
import { afterAll, describe, expect, it } from 'vitest';
import {
  createDb,
  createDbErrorSink,
  errorGroupTable,
  opsEventTable,
  purgeObservability,
} from '../../packages/db/src/index.js';
import { createErrorReporter } from '../../packages/observability/src/index.js';
import { databaseUrl, roleConnectionString } from './test-env.js';

const reports = Number(process.env['OBSERVABILITY_STORM_REPORTS'] ?? 3000);
const instances = Number(process.env['OBSERVABILITY_STORM_INSTANCES'] ?? 6);
const fingerprints = 8;

const owner = createDb({ connectionString: databaseUrl, max: 2 });
const store = createDb({ connectionString: roleConnectionString('api'), max: instances });
const requests = createDb({ connectionString: roleConnectionString('api'), max: 2 });
const service = `capacity-${randomUUID()}`;

const percentile = (values: number[], p: number) =>
  [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * p))] ??
  0;

afterAll(async () => {
  await owner.db.delete(errorGroupTable).where(eq(errorGroupTable.service, service));
  await owner.db.delete(opsEventTable).where(eq(opsEventTable.service, service));
  await Promise.all([owner, store, requests].map(({ pool }) => pool.end()));
});

describe('error store under a burst of failures', () => {
  it('keeps every count, bounds the writes and leaves other queries fast', async () => {
    const writeSeconds: number[] = [];
    const sink = createDbErrorSink(store.db);
    const timedSink = {
      async write(batch: Parameters<typeof sink.write>[0]) {
        const started = performance.now();
        await sink.write(batch);
        writeSeconds.push((performance.now() - started) / 1000);
      },
    };
    const reporters = Array.from({ length: instances }, (_, index) =>
      createErrorReporter({
        service,
        environment: 'test',
        instanceId: `pod-${index}`,
        sink: timedSink,
        flushIntervalMs: 60_000,
        maxQueue: reports,
        maxPerMinute: reports,
      }),
    );

    const probe: number[] = [];
    let running = true;
    const prober = (async () => {
      while (running) {
        const started = performance.now();
        await requests.pool.query('SELECT 1');
        probe.push((performance.now() - started) / 1000);
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    })();

    const started = performance.now();
    const perInstance = Math.floor(reports / instances);
    await Promise.all(
      reporters.map(async (reporter, index) => {
        for (let i = 0; i < perInstance; i += 1) {
          reporter.reportError(new Error(`storm ${i % fingerprints}`), {
            area: `storm-${(i + index) % fingerprints}`,
          });
          // Flush the way the timer would, every few hundred reports.
          if (i % 250 === 249) await reporter.flush();
        }
        await reporter.stop();
      }),
    );
    const stormSeconds = (performance.now() - started) / 1000;
    running = false;
    await prober;

    const groups = await owner.db
      .select()
      .from(errorGroupTable)
      .where(eq(errorGroupTable.service, service));
    const total = groups.reduce((sum, group) => sum + group.count, 0);
    expect(total).toBe(perInstance * instances);
    expect(groups.length).toBeLessThanOrEqual(fingerprints * fingerprints);

    const retentionStarted = performance.now();
    await purgeObservability(
      owner.db,
      {
        errorEventDays: 14,
        errorGroupDays: 30,
        opsEventDays: 30,
        longLivedOpsKinds: [],
        longLivedOpsEventDays: 90,
        batchSize: 1000,
        maxTotalBytes: 0,
        batchPauseMs: 10,
        maxRunMs: 60_000,
      },
      new Date(),
    );
    const retentionSeconds = (performance.now() - retentionStarted) / 1000;

    const figures = {
      reports: perInstance * instances,
      instances,
      stormSeconds,
      writes: writeSeconds.length,
      writeP50Seconds: percentile(writeSeconds, 0.5),
      writeP95Seconds: percentile(writeSeconds, 0.95),
      otherQueryP50Seconds: percentile(probe, 0.5),
      otherQueryP99Seconds: percentile(probe, 0.99),
      retentionSeconds,
    };
    await mkdir('reports/load', { recursive: true });
    await writeFile('reports/load/observability.json', JSON.stringify(figures, null, 2));

    // Generous limits: they catch a pathological regression, not a slow machine.
    expect(figures.writeP95Seconds).toBeLessThan(5);
    expect(figures.otherQueryP99Seconds).toBeLessThan(2);
  });
});
