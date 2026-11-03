/**
 * What the code does through PgBouncer in transaction mode. Opt-in: start the local pooler with
 * `pnpm pooler start` and set `POOLER_PORT` to its port; without it these tests are skipped.
 * The database is also reached directly, to count the server connections the pooler opened.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { createDb } from '../../packages/db/src/index.js';
import { roleConnectionString } from './test-env.js';

const poolerPort = process.env['POOLER_PORT'];
const enabled = poolerPort !== undefined && poolerPort !== '';

function pooledUrl(): string {
  const url = new URL(roleConnectionString('api'));
  url.hostname = '127.0.0.1';
  url.port = String(poolerPort);
  return url.toString();
}

describe.skipIf(!enabled)('through the pooler', () => {
  const pools: { end: () => Promise<void> }[] = [];
  const open = (max: number) => {
    const { pool } = createDb({
      connectionString: pooledUrl(),
      max,
      applicationName: 'pooler-compat',
      statementTimeoutMs: 15_000,
      lockTimeoutMs: 5_000,
    });
    pools.push(pool);
    return pool;
  };
  afterAll(async () => {
    await Promise.all(pools.map((pool) => pool.end()));
  });

  it('accepts the startup parameters the services send', async () => {
    const result = await open(2).query('SELECT 1 AS ok');
    expect(result.rows[0]).toEqual({ ok: 1 });
  });

  it('keeps a transaction-local setting inside its transaction', async () => {
    const pool = open(1);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query("SELECT set_config('app.tenant_id', 'org-1', true)");
      const inside = await client.query("SELECT current_setting('app.tenant_id', true) AS value");
      expect(inside.rows[0].value).toBe('org-1');
      await client.query('COMMIT');
      const after = await client.query("SELECT current_setting('app.tenant_id', true) AS value");
      expect(after.rows[0].value ?? '').toBe('');
    } finally {
      client.release();
    }
  });

  it('never lets one client see the setting of another', async () => {
    const pool = open(10);
    const seen = await Promise.all(
      Array.from({ length: 30 }, async (_, n) => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          await client.query("SELECT set_config('app.tenant_id', $1, true)", [`org-${n}`]);
          await client.query('SELECT pg_sleep(0.01)');
          const row = await client.query("SELECT current_setting('app.tenant_id', true) AS value");
          await client.query('COMMIT');
          return row.rows[0].value as string;
        } finally {
          client.release();
        }
      }),
    );
    expect(seen).toEqual(Array.from({ length: 30 }, (_, n) => `org-${n}`));
  });

  it('serves a transaction-scoped advisory lock', async () => {
    const pool = open(2);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const locked = await client.query('SELECT pg_advisory_xact_lock(424242) IS NOT NULL AS ok');
      expect(locked.rows[0].ok).toBe(true);
      await client.query('COMMIT');
    } finally {
      client.release();
    }
  });

  it('holds the database to the pool size however many clients connect', async () => {
    const pool = open(30);
    const direct = createDb({
      connectionString: roleConnectionString('api'),
      max: 1,
      applicationName: 'count',
    });
    pools.push(direct.pool);
    let busiest = 0;
    const sampler = setInterval(() => {
      void direct.pool
        .query(
          "SELECT count(*)::int AS n FROM pg_stat_activity WHERE usename = 'app_api' AND backend_type = 'client backend' AND application_name = 'pooler-compat'",
        )
        .then((r) => {
          busiest = Math.max(busiest, r.rows[0].n as number);
        });
    }, 25);
    try {
      await Promise.all(
        Array.from({ length: 60 }, async () => {
          const client = await pool.connect();
          try {
            await client.query('SELECT pg_sleep(0.05)');
          } finally {
            client.release();
          }
        }),
      );
    } finally {
      clearInterval(sampler);
    }
    // The api pool on each deployed replica is 3; locally one pooler holds up to 6.
    expect(busiest).toBeGreaterThan(0);
    expect(busiest).toBeLessThanOrEqual(6);
  });
});
