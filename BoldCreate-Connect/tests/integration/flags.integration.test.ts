/**
 * Feature flags and kill switches against real Postgres and Redis, with the reading stores in
 * separate child processes (fixtures/flag-reader.ts) and the live worker delivering the
 * invalidation. Flag values written here are removed afterwards.
 */
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { resolve as resolvePath } from 'node:path';
import { createInterface } from 'node:readline';
import { sql } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createPostgresQueue } from '../../packages/adapters/src/postgres-queue/index.js';
import { globalKey } from '../../packages/ports/src/index.js';
import { createRedisAdapters } from '../../packages/adapters/src/redis/index.js';
import { createDb, insertOutbox } from '../../packages/db/src/index.js';
import {
  createKillSwitch,
  INVALIDATION_CHANNEL,
  liftKillSwitch,
  setFlag,
} from '../../packages/domain/src/index.js';
import { dispatchJob } from '../../apps/worker/src/jobs.js';
import { databaseUrl, requireEnv } from './test-env.js';

const REDIS_URL = requireEnv('TEST_REDIS_URL');
const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const redis = createRedisAdapters({ url: REDIS_URL, commandTimeoutMs: 1000 });
const ACTOR = randomUUID();
const FLAG = 'oauth_dcr';
const repoRoot = resolvePath(import.meta.dirname, '../..');

interface Reader {
  child: ChildProcessWithoutNullStreams;
  ask(command: string): Promise<string>;
  stop(): Promise<void>;
}

async function startReader(env: Record<string, string>): Promise<Reader> {
  const child = spawn(
    process.execPath,
    ['--conditions=development', '--import', 'tsx/esm', 'fixtures/flag-reader.ts'],
    {
      cwd: repoRoot,
      env: { ...process.env, DATABASE_URL: databaseUrl, TEST_REDIS_URL: REDIS_URL, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    },
  );
  const lines: string[] = [];
  const waiting: Array<(line: string) => void> = [];
  createInterface({ input: child.stdout }).on('line', (line) => {
    const next = waiting.shift();
    if (next) next(line);
    else lines.push(line);
  });
  const nextLine = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const buffered = lines.shift();
      if (buffered !== undefined) return resolve(buffered);
      const timer = setTimeout(() => reject(new Error('reader did not answer')), 60_000);
      waiting.push((line) => {
        clearTimeout(timer);
        resolve(line);
      });
    });
  expect(await nextLine()).toBe('ready');
  return {
    child,
    async ask(command) {
      child.stdin.write(`${command}\n`);
      return nextLine();
    },
    async stop() {
      child.stdin.end();
      await new Promise((resolve) => child.once('exit', resolve));
    },
  };
}

/** Asks until the answer matches, and returns how many milliseconds that took. */
async function untilAnswer(reader: Reader, command: string, expected: string): Promise<number> {
  const start = Date.now();
  while (Date.now() - start < 20_000) {
    if ((await reader.ask(command)) === expected) return Date.now() - start;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`never became ${expected}`);
}

async function count(sql: string, params: unknown[]): Promise<number> {
  const result = await pool.query<{ n: string }>(sql, params);
  return Number(result.rows[0]?.n ?? 0);
}

const readers: Reader[] = [];

async function setFlagTo(enabled: boolean): Promise<void> {
  await db.transaction((tx) => setFlag(tx, { key: FLAG, enabled, actor: ACTOR }, redis.cache));
}

beforeAll(async () => {
  await pool.query(
    `INSERT INTO platform_admin_identity (id, idp_tenant_id, oid, granted_by) VALUES ($1, $2, $3, 'flags-test')`,
    [ACTOR, `tenant-${ACTOR}`, `oid-${ACTOR}`],
  );
});

afterAll(async () => {
  for (const reader of readers) await reader.stop().catch(() => undefined);
  await pool.query(`DELETE FROM kill_switch WHERE created_by = $1`, [ACTOR]);
  await pool.query(`DELETE FROM feature_flag WHERE updated_by = $1`, [ACTOR]);
  await pool.query(`DELETE FROM platform_admin_identity WHERE id = $1`, [ACTOR]);
  await redis.cache.delete(globalKey('flag', FLAG)).catch(() => undefined);
  await redis.close();
  await pool.end();
});

describe('flag propagation between processes', { timeout: 90_000 }, () => {
  it('shows a flip made in this process in another one within seconds through the channel', async () => {
    await setFlagTo(false);
    const reader = await startReader({ FLAG_CACHE_TTL_SECONDS: '60' });
    readers.push(reader);
    expect(await reader.ask(`flag ${FLAG}`)).toBe(`flag ${FLAG} false`);

    await setFlagTo(true);
    const elapsed = await untilAnswer(reader, `flag ${FLAG}`, `flag ${FLAG} true`);

    // The worker polls once a second, then publishes; the reader's own entry lives 60 s.
    expect(elapsed).toBeLessThan(3000);
  });

  it('shows the flip within the cache lifetime plus one second when the subscription is off', async () => {
    await setFlagTo(false);
    const reader = await startReader({ FLAG_CACHE_TTL_SECONDS: '2', DISABLE_PUBSUB: '1' });
    readers.push(reader);
    expect(await reader.ask(`flag ${FLAG}`)).toBe(`flag ${FLAG} false`);

    await setFlagTo(true);
    const elapsed = await untilAnswer(reader, `flag ${FLAG}`, `flag ${FLAG} true`);

    expect(elapsed).toBeLessThanOrEqual(3000 + 500);
  });

  it('serves a flag that has no stored row from its built-in default', async () => {
    const reader = await startReader({});
    readers.push(reader);
    expect(await reader.ask('flag archive_prefetch')).toBe('flag archive_prefetch false');
  });

  it('refuses a flag key that is not declared', async () => {
    await expect(
      db.transaction((tx) => setFlag(tx, { key: 'not_a_flag', enabled: true, actor: ACTOR })),
    ).rejects.toThrow('Unknown feature flag');
  });
});

describe('kill switches', { timeout: 90_000 }, () => {
  it('creates, lifts and re-creates a switch, and a reader in another process follows', async () => {
    const target = randomUUID();
    const reader = await startReader({ FLAG_CACHE_TTL_SECONDS: '60' });
    readers.push(reader);
    const ask = `kill plugin ${target}`;
    expect(await reader.ask(ask)).toBe(`${ask} false`);

    const first = await db.transaction((tx) =>
      createKillSwitch(
        tx,
        { kind: 'plugin', id: target, reason: 'abuse report', actor: ACTOR },
        redis.cache,
      ),
    );
    await untilAnswer(reader, ask, `${ask} true`);

    await db.transaction((tx) =>
      liftKillSwitch(tx, { id: first.id, reason: 'resolved', actor: ACTOR }, redis.cache),
    );
    await untilAnswer(reader, ask, `${ask} false`);

    await db.transaction((tx) =>
      createKillSwitch(
        tx,
        { kind: 'plugin', id: target, reason: 'again', actor: ACTOR },
        redis.cache,
      ),
    );
    await untilAnswer(reader, ask, `${ask} true`);

    const rows = await pool.query(
      `SELECT lifted_at, lift_reason FROM kill_switch WHERE target_id = $1 ORDER BY created_at`,
      [target],
    );
    expect(rows.rows).toHaveLength(2);
    expect(rows.rows[0].lift_reason).toBe('resolved');
    expect(rows.rows[0].lifted_at).not.toBeNull();
    expect(rows.rows[1].lifted_at).toBeNull();
  });

  it('rejects an identical active switch with kill_switch_conflict and keeps the first one', async () => {
    const target = randomUUID();
    await db.transaction((tx) =>
      createKillSwitch(tx, { kind: 'org', id: target, reason: 'first', actor: ACTOR }),
    );
    await expect(
      db.transaction((tx) =>
        createKillSwitch(tx, { kind: 'org', id: target, reason: 'second', actor: ACTOR }),
      ),
    ).rejects.toMatchObject({ code: 'kill_switch_conflict' });
    expect(
      await count(`SELECT count(*) AS n FROM kill_switch WHERE target_id = $1`, [target]),
    ).toBe(1);
  });

  it('allows a different kind for the same target id', async () => {
    const target = randomUUID();
    await db.transaction((tx) =>
      createKillSwitch(tx, { kind: 'org', id: target, reason: 'one', actor: ACTOR }),
    );
    await db.transaction((tx) =>
      createKillSwitch(tx, { kind: 'api_key', id: target, reason: 'two', actor: ACTOR }),
    );
    expect(
      await count(`SELECT count(*) AS n FROM kill_switch WHERE target_id = $1`, [target]),
    ).toBe(2);
  });

  it('never deletes a lifted switch and cannot lift it twice', async () => {
    const target = randomUUID();
    const { id } = await db.transaction((tx) =>
      createKillSwitch(tx, { kind: 'mcp_server', id: target, reason: 'x', actor: ACTOR }),
    );
    await db.transaction((tx) => liftKillSwitch(tx, { id, reason: 'done', actor: ACTOR }));
    await expect(
      db.transaction((tx) => liftKillSwitch(tx, { id, reason: 'again', actor: ACTOR })),
    ).rejects.toMatchObject({ code: 'not_found' });
    expect(await count(`SELECT count(*) AS n FROM kill_switch WHERE id = $1`, [id])).toBe(1);
  });
});

describe('transactional writes', () => {
  it('writes the change, the audit row and the revision job together', async () => {
    const target = randomUUID();
    await db.transaction(async (tx) => {
      await createKillSwitch(tx, { kind: 'plugin_source', id: target, reason: 'x', actor: ACTOR });
      // The job is part of the same transaction: it is visible here and nowhere else.
      const inside = await tx.execute(
        sql`SELECT 1 FROM outbox WHERE event_type = 'revision.bumped' AND payload LIKE ${`%${target}%`}`,
      );
      expect(inside.rows).toHaveLength(1);
    });

    const audit = await pool.query(
      `SELECT actor_kind, actor_id, action FROM audit_log WHERE target_id = $1`,
      [target],
    );
    expect(audit.rows).toEqual([
      { actor_kind: 'platform_admin', actor_id: ACTOR, action: 'kill_switch.created' },
    ]);
  });

  it('leaves no switch, audit row or revision job when the transaction rolls back', async () => {
    const target = randomUUID();
    await expect(
      db.transaction(async (tx) => {
        await createKillSwitch(tx, { kind: 'plugin', id: target, reason: 'x', actor: ACTOR });
        const jobs = await pool.query(`SELECT 1 FROM outbox WHERE payload LIKE $1`, [
          `%${target}%`,
        ]);
        // The job is invisible to other connections until commit.
        expect(jobs.rowCount).toBe(0);
        throw new Error('abort after the change');
      }),
    ).rejects.toThrow('abort after the change');

    expect(
      await count(`SELECT count(*) AS n FROM kill_switch WHERE target_id = $1`, [target]),
    ).toBe(0);
    expect(await count(`SELECT count(*) AS n FROM audit_log WHERE target_id = $1`, [target])).toBe(
      0,
    );
    expect(
      await count(`SELECT count(*) AS n FROM outbox WHERE payload LIKE $1`, [`%${target}%`]),
    ).toBe(0);
  });

  it('rolls a flag change back with its audit row and job', async () => {
    await setFlagTo(false);
    const before = await count(
      `SELECT count(*) AS n FROM audit_log WHERE target_id = $1 AND action = 'feature_flag.changed'`,
      [FLAG],
    );
    await expect(
      db.transaction(async (tx) => {
        await setFlag(tx, { key: FLAG, enabled: true, actor: ACTOR });
        throw new Error('abort after the change');
      }),
    ).rejects.toThrow('abort after the change');

    const row = await pool.query(`SELECT enabled FROM feature_flag WHERE key = $1`, [FLAG]);
    expect(row.rows[0].enabled).toBe(false);
    expect(
      await count(
        `SELECT count(*) AS n FROM audit_log WHERE target_id = $1 AND action = 'feature_flag.changed'`,
        [FLAG],
      ),
    ).toBe(before);
  });
});

describe('revision delivery', () => {
  it('keeps the job pending while publishing fails and delivers it on a later attempt', async () => {
    const queue = createPostgresQueue(db);
    const { id } = await insertOutbox(db, {
      type: 'revision.bumped',
      payload: { type: 'catalog', id: `flag:${FLAG}` },
      runAt: new Date(Date.now() + 3_600_000),
    });
    // One statement makes the row due and leased to this test, so the live worker never takes it.
    const lease = () =>
      pool.query(
        `UPDATE outbox SET lease_owner = 'flags-test', lease_expires_at = now() + interval '1 minute',
           next_attempt_at = now() WHERE id = $1`,
        [id],
      );
    const options = (cache: unknown) =>
      ({
        emailAdapter: { send: async () => undefined },
        baseUrl: 'http://localhost',
        log: { info: () => undefined, warn: () => undefined },
        orgKeys: {},
        idempotency: {},
        revision: { cache },
      }) as unknown as Parameters<typeof dispatchJob>[1];
    const job = {
      id,
      type: 'revision.bumped',
      payload: { type: 'catalog', id: `flag:${FLAG}` },
      attempts: 0,
    };

    const broken = {
      delete: async () => undefined,
      publish: async () => {
        throw new Error('redis_unavailable');
      },
    };
    await lease();
    await expect(dispatchJob(job, options(broken))).rejects.toThrow('redis_unavailable');
    await queue.fail(id, { retryAt: null, error: 'delivery failed' });

    const pending = await pool.query(
      `SELECT status, attempts, delivered_at FROM outbox WHERE id = $1`,
      [id],
    );
    expect(pending.rows[0]).toMatchObject({ status: 'pending', attempts: 1, delivered_at: null });

    const received: string[] = [];
    const stop = await redis.cache.subscribe(INVALIDATION_CHANNEL, (message) =>
      received.push(message),
    );
    await lease();
    await dispatchJob({ ...job, attempts: 1 }, options(redis.cache));
    await queue.complete(id);
    for (let i = 0; i < 20 && !received.some((m) => m.includes(`flag:${FLAG}`)); i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    await stop();

    const delivered = await pool.query(`SELECT status, delivered_at FROM outbox WHERE id = $1`, [
      id,
    ]);
    expect(delivered.rows[0].status).toBe('delivered');
    expect(delivered.rows[0].delivered_at).not.toBeNull();
    expect(received.some((m) => m.includes(`flag:${FLAG}`))).toBe(true);
  });
});

describe('flag and kill switch constraints', () => {
  async function sqlState(text: string, params: unknown[]): Promise<string> {
    try {
      await pool.query(text, params);
      return 'ok';
    } catch (error) {
      return (error as { code?: string }).code ?? 'unknown';
    }
  }

  const insertSwitch = (kind: string, target: string, reason: string, creator = ACTOR) =>
    sqlState(
      `INSERT INTO kill_switch (target_kind, target_id, reason, created_by) VALUES ($1, $2, $3, $4)`,
      [kind, target, reason, creator],
    );

  it('limits flag keys to lowercase words of 2 to 64 characters', async () => {
    for (const key of ['Bad_Key', '1abc', 'a', 'has-dash', 'x'.repeat(65)]) {
      expect(
        await sqlState(`INSERT INTO feature_flag (key, enabled) VALUES ($1, true)`, [key]),
      ).toBe('23514');
    }
  });

  it('limits switch targets to the known kinds and reasons to 1 to 500 characters', async () => {
    const target = randomUUID();
    expect(await insertSwitch('galaxy', target, 'x')).toBe('23514');
    expect(await insertSwitch('plugin', target, '')).toBe('23514');
    expect(await insertSwitch('plugin', target, 'x'.repeat(501))).toBe('23514');
    expect(await insertSwitch('plugin', target, 'x'.repeat(500))).toBe('ok');
  });

  it('requires a platform administrator identity as creator', async () => {
    expect(await insertSwitch('plugin', randomUUID(), 'x', randomUUID())).toBe('23503');
  });

  it('allows one active switch per target and a new one once it is lifted', async () => {
    const target = randomUUID();
    expect(await insertSwitch('org', target, 'first')).toBe('ok');
    expect(await insertSwitch('org', target, 'second')).toBe('23505');
    await pool.query(`UPDATE kill_switch SET lifted_at = now() WHERE target_id = $1`, [target]);
    expect(await insertSwitch('org', target, 'third')).toBe('ok');
  });
});
