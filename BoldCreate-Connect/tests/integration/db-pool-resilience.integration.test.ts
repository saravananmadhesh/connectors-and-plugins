/**
 * What the pool does when the database drops its connections (a restart or a failover) and when
 * its admission queue is under load, against real Postgres. Connections are told apart by
 * application name, so only this test's own backends are ended.
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createAdmissionGate, createDb } from '../../packages/db/src/index.js';
import { databaseUrl } from './test-env.js';

const APP = `resilience-${randomUUID().slice(0, 8)}`;
const admin = createDb({
  connectionString: databaseUrl,
  max: 2,
  applicationName: 'resilience-ctl',
});

async function endBackends(): Promise<number> {
  const result = await admin.pool.query(
    `SELECT pg_terminate_backend(pid) AS ended FROM pg_stat_activity
     WHERE application_name = $1 AND pid <> pg_backend_pid()`,
    [APP],
  );
  return result.rowCount ?? 0;
}

const until = async (check: () => boolean, ms = 3000): Promise<void> => {
  const stop = Date.now() + ms;
  while (!check() && Date.now() < stop) await new Promise((resolve) => setTimeout(resolve, 20));
};

beforeAll(async () => {
  await admin.pool.query('SELECT 1');
});

afterAll(async () => {
  await admin.pool.end();
});

describe('a database that drops its connections', () => {
  it('reports the error, keeps the process alive and serves the next query', async () => {
    const onPoolError = vi.fn<(error: Error) => void>();
    const { pool } = createDb({
      connectionString: databaseUrl,
      max: 3,
      applicationName: APP,
      onPoolError,
    });
    try {
      await Promise.all([pool.query('SELECT 1'), pool.query('SELECT 2'), pool.query('SELECT 3')]);
      const ended = await endBackends();
      expect(ended).toBeGreaterThan(0);
      // Each dropped connection reports once; the next query is served only after they all did.
      await until(() => onPoolError.mock.calls.length >= ended);

      expect(onPoolError).toHaveBeenCalledTimes(ended);
      const result = await pool.query('SELECT 42 AS answer');
      expect(result.rows[0]).toEqual({ answer: 42 });
    } finally {
      await pool.end();
    }
  });

  it('does not end the process when no handler is given', async () => {
    const { pool } = createDb({ connectionString: databaseUrl, max: 2, applicationName: APP });
    try {
      await pool.query('SELECT 1');
      await endBackends();
      await new Promise((resolve) => setTimeout(resolve, 200));
      const result = await pool.query('SELECT 7 AS n');
      expect(result.rows[0]).toEqual({ n: 7 });
    } finally {
      await pool.end();
    }
  });

  it('does not end the process when a held connection drops mid-transaction', async () => {
    const { pool } = createDb({ connectionString: databaseUrl, max: 2, applicationName: APP });
    try {
      const client = await pool.connect();
      // The pool stops listening once a connection is handed out, so the client adds its own.
      expect(client.listenerCount('error')).toBeGreaterThan(0);
      await client.query('BEGIN');
      await endBackends();
      // The drop arrives as an 'error' event on the held connection; nothing else listens then.
      await new Promise((resolve) => setTimeout(resolve, 200));
      await expect(client.query('SELECT 1')).rejects.toThrow(/not queryable|Connection terminated/);
      client.release(true);

      const result = await pool.query('SELECT 8 AS n');
      expect(result.rows[0]).toEqual({ n: 8 });
    } finally {
      await pool.end();
    }
  });

  it('frees the slot of a dropped connection that its caller never releases', async () => {
    // drizzle's transaction() does not release when BEGIN fails, as it does while PgBouncer stops.
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 5, maxWaitMs: 2000 });
    const { pool } = createDb({
      connectionString: databaseUrl,
      max: 1,
      applicationName: APP,
      admission,
    });
    try {
      await pool.connect();
      await endBackends();
      await until(() => admission.stats().active === 0);
      expect(admission.stats().active).toBe(0);

      const result = await pool.query('SELECT 9 AS n');
      expect(result.rows[0]).toEqual({ n: 9 });
    } finally {
      await pool.end();
    }
  });

  it('gives back the admission slot of a call whose connection was ended', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 5, maxWaitMs: 2000 });
    const { pool } = createDb({
      connectionString: databaseUrl,
      max: 2,
      applicationName: APP,
      admission,
      onPoolError: () => undefined,
    });
    try {
      const client = await pool.connect();
      expect(admission.stats().active).toBe(1);
      await endBackends();
      client.release(true);
      expect(admission.stats().active).toBe(0);

      const result = await pool.query('SELECT 1 AS ok');
      expect(result.rows[0]).toEqual({ ok: 1 });
      expect(admission.stats()).toEqual({ active: 0, waiting: 0 });
    } finally {
      await pool.end();
    }
  });
});

describe('the admission queue against a real pool', () => {
  it('serves callers beyond the limit in turn and ends with no slot held', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 2, maxDepth: 50, maxWaitMs: 5000 });
    const { pool } = createDb({
      connectionString: databaseUrl,
      max: 4,
      applicationName: APP,
      admission,
    });
    try {
      let busiest = 0;
      const results = await Promise.all(
        Array.from({ length: 20 }, async (_, n) => {
          const client = await pool.connect();
          busiest = Math.max(busiest, admission.stats().active);
          try {
            const result = await client.query('SELECT pg_sleep(0.02), $1::int AS n', [n]);
            return result.rows[0].n as number;
          } finally {
            client.release();
          }
        }),
      );
      expect(results).toEqual(Array.from({ length: 20 }, (_, n) => n));
      expect(busiest).toBeLessThanOrEqual(2);
      expect(admission.stats()).toEqual({ active: 0, waiting: 0 });
    } finally {
      await pool.end();
    }
  });

  it('refuses callers over the queue depth at once and still serves the rest', async () => {
    const reasons: string[] = [];
    const admission = createAdmissionGate({
      maxConcurrency: 1,
      maxDepth: 2,
      maxWaitMs: 5000,
      onReject: (reason) => reasons.push(reason),
    });
    const { pool } = createDb({
      connectionString: databaseUrl,
      max: 2,
      applicationName: APP,
      admission,
    });
    try {
      const holder = await pool.connect();
      const waiting = [pool.query('SELECT 1'), pool.query('SELECT 2')];
      await until(() => admission.stats().waiting === 2);
      await expect(pool.query('SELECT 3')).rejects.toThrow('database admission queue');
      expect(reasons).toEqual(['full']);

      holder.release();
      const served = await Promise.all(waiting);
      expect(served).toHaveLength(2);
      expect(admission.stats()).toEqual({ active: 0, waiting: 0 });
    } finally {
      await pool.end();
    }
  });
});
