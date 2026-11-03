/**
 * Adjustable limits against real Postgres: the table's own checks, the admin operations with their
 * audit rows, and the store reading what the admin operations wrote. Rows written here are removed.
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDb } from '../../packages/db/src/index.js';
import {
  createLimitStore,
  listAdminLimits,
  resetGlobalLimit,
  setGlobalLimit,
} from '../../packages/domain/src/index.js';
import { LIMIT_DEFINITIONS } from '../../packages/limits/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const ADMIN = randomUUID();
const KEY = 'project_requests_per_minute';
const actor = { identityId: ADMIN, subject: 'limits-test@example.test' };
const definition = LIMIT_DEFINITIONS[KEY];

const clock = {
  now: () => new Date(),
  nowMs: () => Date.now(),
  sleep: async () => undefined,
};

async function clearGlobal(): Promise<void> {
  await pool.query(`DELETE FROM limit_setting WHERE key = $1`, [KEY]);
}

async function auditActions(): Promise<string[]> {
  const result = await pool.query(
    `SELECT action FROM audit_log WHERE target_id = $1 AND action LIKE 'limit.%' ORDER BY created_at`,
    [KEY],
  );
  return result.rows.map((row: { action: string }) => row.action);
}

beforeAll(async () => {
  await pool.query(
    `INSERT INTO platform_admin_identity (id, idp_tenant_id, oid, granted_by) VALUES ($1, $2, $3, 'limits-test')`,
    [ADMIN, `tenant-${ADMIN}`, `oid-${ADMIN}`],
  );
  await clearGlobal();
});

afterAll(async () => {
  await clearGlobal();
  await pool.query(`DELETE FROM audit_log WHERE target_id = $1 AND action LIKE 'limit.%'`, [KEY]);
  await pool.query(`DELETE FROM platform_admin_identity WHERE id = $1`, [ADMIN]);
  await pool.end();
});

describe('limit_setting constraints', () => {
  it('allows one global row per key', async () => {
    await pool.query(
      `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ($1, 'global', NULL, 100, 'fixture-first')`,
      [KEY],
    );
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ($1, 'global', NULL, 200, 'fixture-second')`,
        [KEY],
      ),
    ).rejects.toThrow(/limit_setting_global_unique/);
    await clearGlobal();
  });

  it('requires a scope id for organization and project rows and forbids one for global', async () => {
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ($1, 'project', NULL, 100, 'fixture')`,
        [KEY],
      ),
    ).rejects.toThrow(/limit_setting_scope_id_check/);
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ($1, 'global', $2, 100, 'fixture')`,
        [KEY, randomUUID()],
      ),
    ).rejects.toThrow(/limit_setting_scope_id_check/);
  });

  it('allows one row per key, scope and scope id', async () => {
    const projectId = randomUUID();
    const insert = () =>
      pool.query(
        `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ($1, 'project', $2, 100, 'fixture')`,
        [KEY, projectId],
      );
    await insert();
    await expect(insert()).rejects.toThrow(/limit_setting_scoped_unique/);
    await clearGlobal();
  });

  it('rejects a non-positive value, an unknown scope and an empty reason', async () => {
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, value, reason) VALUES ($1, 'global', 0, 'fixture')`,
        [KEY],
      ),
    ).rejects.toThrow(/limit_setting_value_positive/);
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, value, reason) VALUES ($1, 'team', 5, 'fixture')`,
        [KEY],
      ),
    ).rejects.toThrow(/limit_setting_scope_check/);
    await expect(
      pool.query(
        `INSERT INTO limit_setting (key, scope, value, reason) VALUES ($1, 'global', 5, '')`,
        [KEY],
      ),
    ).rejects.toThrow(/limit_setting_reason_length/);
  });
});

describe('admin limit operations', () => {
  it('lists the built-in value when nothing is stored', async () => {
    await clearGlobal();
    const item = (await listAdminLimits(db)).find((entry) => entry.key === KEY);
    expect(item).toMatchObject({
      globalValue: null,
      effectiveValue: definition.default,
      defaultValue: definition.default,
      min: definition.min,
      max: definition.max,
    });
  });

  it('sets, changes and resets the global value with an audit row each', async () => {
    const first = await setGlobalLimit(db, KEY, { value: 7000, reason: 'launch week' }, actor);
    expect(first).toMatchObject({ globalValue: 7000, effectiveValue: 7000, reason: 'launch week' });

    const second = await setGlobalLimit(db, KEY, { value: 9000, reason: 'second raise' }, actor);
    expect(second.globalValue).toBe(9000);
    const rows = await pool.query(`SELECT count(*)::int AS n FROM limit_setting WHERE key = $1`, [
      KEY,
    ]);
    expect(rows.rows[0].n).toBe(1);

    const reset = await resetGlobalLimit(db, KEY, { reason: 'back to normal' }, actor);
    expect(reset).toMatchObject({ globalValue: null, effectiveValue: definition.default });

    expect(await auditActions()).toEqual(['limit.changed', 'limit.changed', 'limit.reset']);
    const context = await pool.query(
      `SELECT context FROM audit_log WHERE target_id = $1 AND action = 'limit.changed' ORDER BY created_at LIMIT 1`,
      [KEY],
    );
    expect(JSON.parse(context.rows[0].context as string)).toMatchObject({
      scope: 'global',
      from: definition.default,
      to: 7000,
      reason: 'launch week',
    });
  });

  it('rejects a value outside the bounds and an unknown key without writing anything', async () => {
    await clearGlobal();
    await expect(
      setGlobalLimit(db, KEY, { value: definition.min - 1, reason: 'too low' }, actor),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    await expect(
      setGlobalLimit(db, KEY, { value: definition.max + 1, reason: 'too high' }, actor),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    await expect(
      setGlobalLimit(db, 'no_such_limit', { value: 100, reason: 'unknown' }, actor),
    ).rejects.toMatchObject({ code: 'not_found' });

    const rows = await pool.query(`SELECT count(*)::int AS n FROM limit_setting WHERE key = $1`, [
      KEY,
    ]);
    expect(rows.rows[0].n).toBe(0);
  });

  it('resetting a limit that was never set changes nothing and writes no audit row', async () => {
    await clearGlobal();
    const before = (await auditActions()).length;
    await resetGlobalLimit(db, KEY, { reason: 'nothing to reset' }, actor);
    expect((await auditActions()).length).toBe(before);
  });
});

describe('limit store over real rows', () => {
  it('serves the value an administrator set and falls back after a reset', async () => {
    await clearGlobal();
    const store = createLimitStore({ db, clock, ttlSeconds: 30 });
    const subject = { projectId: randomUUID(), organizationId: randomUUID() };
    expect(await store.resolve(KEY, subject)).toMatchObject({
      limit: definition.default,
      source: 'default',
    });

    await setGlobalLimit(db, KEY, { value: 1234, reason: 'store check' }, actor);
    store.invalidate();
    expect(await store.resolve(KEY, subject)).toMatchObject({ limit: 1234, source: 'global' });

    await resetGlobalLimit(db, KEY, { reason: 'store check done' }, actor);
    store.invalidate();
    expect((await store.resolve(KEY, subject)).source).toBe('default');
  });

  it('applies an organization row and a project row written directly, for the future levels', async () => {
    await clearGlobal();
    const organizationId = randomUUID();
    const projectId = randomUUID();
    await pool.query(
      `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES
        ($1, 'organization', $2, 2000, 'fixture-org'), ($1, 'project', $3, 3000, 'fixture-project')`,
      [KEY, organizationId, projectId],
    );
    const store = createLimitStore({ db, clock, ttlSeconds: 30 });
    expect(await store.resolve(KEY, { projectId, organizationId })).toMatchObject({
      limit: 3000,
      source: 'project',
    });
    expect(await store.resolve(KEY, { projectId: randomUUID(), organizationId })).toMatchObject({
      limit: 2000,
      source: 'organization',
    });
    await clearGlobal();
  });
});
