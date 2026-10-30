/**
 * The admin reads and the dated delete on a store with many rows: each query must use an index,
 * not read a whole table, so the cost follows the page or the window and not the table size.
 * The size is small by default so the check is quick; raise it to size a database:
 * \`OBSERVABILITY_READ_GROUPS=2000000 OBSERVABILITY_READ_EVENTS=10000000\`. The measured figures are
 * written to \`reports/load/observability-reads.json\`.
 */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { like } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDb, errorGroupTable, opsEventTable } from '../../packages/db/src/index.js';
import {
  getObservabilityOverview,
  getObservabilityStorage,
  listErrorGroups,
  listOpsEvents,
} from '../../packages/domain/src/index.js';
import { databaseUrl } from './test-env.js';

const groups = Number(process.env['OBSERVABILITY_READ_GROUPS'] ?? 30_000);
const events = Number(process.env['OBSERVABILITY_READ_EVENTS'] ?? 150_000);
const owner = createDb({ connectionString: databaseUrl, max: 2 });
const prefix = `reads-${randomUUID().slice(0, 8)}`;
const figures: Record<string, number> = { groups, events };

const timed = async <T>(name: string, run: () => Promise<T>): Promise<T> => {
  const started = performance.now();
  const result = await run();
  figures[name] = (performance.now() - started) / 1000;
  return result;
};

/** Every node of the plan that reads a whole table. */
function sequentialScans(plan: unknown): string[] {
  const found: string[] = [];
  const walk = (node: unknown) => {
    if (typeof node !== 'object' || node === null) return;
    const record = node as Record<string, unknown>;
    if (record['Node Type'] === 'Seq Scan') found.push(String(record['Relation Name']));
    for (const value of Object.values(record)) {
      if (Array.isArray(value)) value.forEach(walk);
      else walk(value);
    }
  };
  walk(plan);
  return found;
}

async function explain(text: string, params: unknown[] = []): Promise<string[]> {
  const result = await owner.pool.query<{ 'QUERY PLAN': unknown }>(
    `EXPLAIN (FORMAT JSON) ${text}`,
    params,
  );
  return sequentialScans(result.rows[0]?.['QUERY PLAN']);
}

beforeAll(async () => {
  // Thirty days of history, a few unresolved groups among many settled ones, as in real use.
  await owner.pool.query(
    `INSERT INTO error_group (id, fingerprint, service, area, title, status, count, first_seen, last_seen)
     SELECT gen_random_uuid(), $1 || '-' || n, $1 || '-' || (n % 4), 'area-' || (n % 7),
            'Failure ' || n, CASE WHEN n % 20 = 0 THEN 'unresolved' WHEN n % 2 = 0 THEN 'resolved' ELSE 'ignored' END,
            1 + n % 500, now() - ((n % 43200) + 600) * interval '1 minute', now() - (n % 43200) * interval '1 minute'
     FROM generate_series(1, $2::int) AS n`,
    [prefix, groups],
  );
  await owner.pool.query(
    `INSERT INTO error_event (id, group_id, occurred_at, environment)
     SELECT gen_random_uuid(), g.id, g.last_seen - k * interval '1 second', 'test'
     FROM (SELECT id, last_seen FROM error_group WHERE fingerprint LIKE $1 || '-%') AS g
     CROSS JOIN generate_series(1, $2::int) AS k`,
    [prefix, Math.max(1, Math.ceil(events / groups))],
  );
  await owner.pool.query(
    `INSERT INTO ops_event (id, occurred_at, service, kind, severity, environment)
     SELECT gen_random_uuid(), now() - (n % 43200) * interval '1 minute', $1 || '-' || (n % 4),
            'kind_' || (n % 9), CASE WHEN n % 50 = 0 THEN 'error' WHEN n % 10 = 0 THEN 'warning' ELSE 'info' END, 'test'
     FROM generate_series(1, $2::int) AS n`,
    [prefix, events],
  );
  await owner.pool.query('ANALYZE error_group');
  await owner.pool.query('ANALYZE error_event');
  await owner.pool.query('ANALYZE ops_event');
}, 300_000);

afterAll(async () => {
  await owner.db.delete(errorGroupTable).where(like(errorGroupTable.service, `${prefix}%`));
  await owner.db.delete(opsEventTable).where(like(opsEventTable.service, `${prefix}%`));
  await mkdir('reports/load', { recursive: true });
  await writeFile('reports/load/observability-reads.json', JSON.stringify(figures, null, 2));
  await owner.pool.end();
});

describe('admin reads on a large store', () => {
  it('lists errors newest first, with and without filters, from an index', async () => {
    expect(
      await explain('SELECT * FROM error_group ORDER BY last_seen DESC, id DESC LIMIT 51'),
    ).toEqual([]);
    expect(
      await explain(
        `SELECT * FROM error_group WHERE status = 'unresolved' ORDER BY last_seen DESC, id DESC LIMIT 51`,
      ),
    ).toEqual([]);
    const page = await timed('listErrorsSeconds', () =>
      listErrorGroups(owner.db, { limit: 50, service: `${prefix}-1` }),
    );
    expect(page.items).toHaveLength(50);
    const searched = await timed('searchErrorsSeconds', () =>
      listErrorGroups(owner.db, { limit: 50, q: `${prefix} nothing` }),
    );
    expect(searched.items).toHaveLength(0);
  });

  it('lists events by service, severity and kind from an index', async () => {
    expect(
      await explain(
        `SELECT * FROM ops_event WHERE service = $1 ORDER BY occurred_at DESC, id DESC LIMIT 51`,
        [`${prefix}-1`],
      ),
    ).toEqual([]);
    expect(
      await explain(
        `SELECT * FROM ops_event WHERE severity = 'error' ORDER BY occurred_at DESC, id DESC LIMIT 51`,
      ),
    ).toEqual([]);
    const page = await timed('listEventsSeconds', () =>
      listOpsEvents(owner.db, { limit: 50, severity: 'error' }),
    );
    expect(page.items.length).toBeGreaterThan(0);
  });

  it('builds the overview from the window, not from the table', async () => {
    expect(
      await explain(
        `SELECT service, count(*) FROM error_group WHERE last_seen >= now() - interval '1 hour' GROUP BY service`,
      ),
    ).toEqual([]);
    expect(
      await explain(
        `SELECT severity, count(*) FROM ops_event WHERE occurred_at >= now() - interval '1 hour' GROUP BY severity`,
      ),
    ).toEqual([]);
    const overview = await timed('overviewSeconds', () =>
      getObservabilityOverview(owner.db, { window: '24h' }),
    );
    expect(overview.activeGroups).toBeGreaterThan(0);
  });

  it('reports storage without counting every row of a large table', async () => {
    const storage = await timed('storageSeconds', () => getObservabilityStorage(owner.db, 0));
    expect(storage.tables.map((row) => row.table)).toEqual([
      'error_group',
      'error_event',
      'ops_event',
    ]);
    expect(storage.tables[2]?.oldest).not.toBeNull();
    expect(await explain('SELECT min(last_seen) FROM error_group')).toEqual([]);
    expect(await explain('SELECT min(occurred_at) FROM ops_event')).toEqual([]);
  });

  it('finds the rows a dated delete removes from an index', async () => {
    expect(
      await explain(
        `SELECT id FROM error_event WHERE occurred_at < now() - interval '20 days' LIMIT 500`,
      ),
    ).toEqual([]);
    expect(
      await explain(
        `SELECT id FROM ops_event WHERE occurred_at < now() - interval '29 days' LIMIT 500`,
      ),
    ).toEqual([]);
    expect(
      await explain(
        `SELECT id FROM error_group WHERE last_seen < now() - interval '20 days' AND status <> 'unresolved' LIMIT 500`,
      ),
    ).toEqual([]);
  });
});
