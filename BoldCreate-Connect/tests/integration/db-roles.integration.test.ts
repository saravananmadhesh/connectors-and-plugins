/**
 * Least-privilege database roles, one real login per app role.
 *
 * The allow/deny cases are generated from `ROLE_GRANTS`: for every role, table and privilege the
 * statement either passes the privilege check or fails with `permission denied`. Statements run
 * in a transaction that is rolled back, and are written so that they touch no row.
 *
 * Run: pnpm test -- --only=integration
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pg from 'pg';
import {
  ROLE_GRANTS,
  ROLE_NAMES,
  applyRoleGrants,
  dbRoleName,
  type LoginRole,
  type Privilege,
  type RoleName,
} from '../../packages/db/src/index.js';
import { databaseUrl, requireEnv, roleConnectionString } from './test-env.js';

const clients = new Map<RoleName, pg.Client>();
const admin = new pg.Client({ connectionString: databaseUrl });
let columnsOf: Record<string, string[]> = {};

const quote = (name: string) => `"${name}"`;

/** Runs one statement in a transaction that is always rolled back; returns the error, if any. */
async function attempt(role: RoleName, statement: string): Promise<Error | undefined> {
  const client = clients.get(role)!;
  await client.query('BEGIN');
  try {
    await client.query(statement);
    return undefined;
  } catch (error) {
    return error as Error;
  } finally {
    await client.query('ROLLBACK');
  }
}

const isDenied = (error: Error | undefined) =>
  /permission denied|must be owner/i.test(error?.message ?? '');

/** What happened, in words that show the statement when a case fails. */
const outcome = (role: RoleName, statement: string, error: Error | undefined) =>
  isDenied(error)
    ? `denied for ${role}: ${statement}`
    : `allowed for ${role}: ${statement}${error ? ` (then failed: ${error.message})` : ''}`;

/** Passes the privilege check: success, or a failure that is not a privilege failure. */
async function expectAllowed(role: RoleName, statement: string) {
  const error = await attempt(role, statement);
  expect(outcome(role, statement, error)).toMatch(/^allowed /);
}

async function expectDenied(role: RoleName, statement: string) {
  const error = await attempt(role, statement);
  expect(outcome(role, statement, error)).toMatch(/^denied /);
}

function statementFor(privilege: Privilege, table: string, columns: string[]): string {
  const target = quote(table);
  if (privilege === 'select') return `SELECT * FROM ${target} LIMIT 0`;
  if (privilege === 'insert') return `INSERT INTO ${target} DEFAULT VALUES`;
  if (privilege === 'update')
    return `UPDATE ${target} SET ${quote(columns[0]!)} = NULL WHERE false`;
  return `DELETE FROM ${target} WHERE false`;
}

beforeAll(async () => {
  await admin.connect();
  for (const role of ROLE_NAMES) {
    const client = new pg.Client({ connectionString: roleConnectionString(role) });
    await client.connect();
    clients.set(role, client);
  }
  const result = await admin.query<{ table_name: string; column_name: string }>(
    `SELECT table_name, column_name FROM information_schema.columns
      WHERE table_schema = 'public' ORDER BY table_name, ordinal_position`,
  );
  columnsOf = {};
  for (const row of result.rows) (columnsOf[row.table_name] ??= []).push(row.column_name);
});

afterAll(async () => {
  for (const client of clients.values()) await client.end();
  await admin.end();
});

describe.each(ROLE_NAMES)('app_%s role matches its grants', (role) => {
  const entries = Object.entries(ROLE_GRANTS[role]);

  it.each(entries)('%s', async (table, grant) => {
    const columns = columnsOf[table]!;
    for (const privilege of ['select', 'insert', 'update', 'delete'] as const) {
      const allowed = grant.privileges.includes(privilege);
      const columnList =
        privilege === 'select' || privilege === 'update' ? grant.columns?.[privilege] : undefined;
      if (allowed && privilege === 'select' && columnList) {
        // Only the listed columns can be read; a star select names every column and fails.
        await expectAllowed(
          role,
          `SELECT ${columnList.map(quote).join(', ')} FROM ${quote(table)} LIMIT 0`,
        );
        await expectDenied(role, statementFor('select', table, columns));
      } else if (allowed && privilege === 'update' && columnList) {
        await expectAllowed(
          role,
          `UPDATE ${quote(table)} SET ${quote(columnList[0]!)} = NULL WHERE false`,
        );
        const other = columns.find((column) => !columnList.includes(column))!;
        await expectDenied(role, `UPDATE ${quote(table)} SET ${quote(other)} = NULL WHERE false`);
      } else if (allowed) {
        await expectAllowed(role, statementFor(privilege, table, columns));
      } else {
        await expectDenied(role, statementFor(privilege, table, columns));
      }
    }
  });
});

describe('definition changes are denied to every app role', () => {
  it.each(ROLE_NAMES)('app_%s cannot create, alter, drop or truncate', async (role) => {
    await expectDenied(role, 'CREATE TABLE intruder (id int)');
    await expectDenied(role, 'ALTER TABLE "project" ADD COLUMN intruder int');
    await expectDenied(role, 'DROP TABLE "project"');
    await expectDenied(role, 'TRUNCATE "audit_log"');
    await expectDenied(role, 'CREATE SCHEMA intruder');
  });
});

describe('named column and table rules', () => {
  it('only app_api, app_gateway and app_worker read the wrapped private key of an organization key', async () => {
    await expectAllowed('api', 'SELECT wrapped_private_key FROM org_key LIMIT 0');
    await expectAllowed('gateway', 'SELECT wrapped_private_key FROM org_key LIMIT 0');
    await expectAllowed('worker', 'SELECT wrapped_private_key FROM org_key LIMIT 0');
    await expectDenied('admin', 'SELECT wrapped_private_key FROM org_key LIMIT 0');
    await expectAllowed('worker', 'SELECT id, version, status FROM org_key LIMIT 0');
  });

  it('app_worker cannot select from api_key', async () => {
    await expectDenied('worker', 'SELECT id FROM api_key LIMIT 0');
  });

  it('app_gateway can update only last_used_at and last_used_ip of an api key', async () => {
    await expectAllowed('gateway', 'UPDATE api_key SET last_used_at = NULL WHERE false');
    await expectAllowed('gateway', 'UPDATE api_key SET last_used_ip = NULL WHERE false');
    await expectDenied('gateway', 'UPDATE api_key SET name = NULL WHERE false');
    await expectDenied('gateway', 'UPDATE api_key SET revoked_at = NULL WHERE false');
  });

  it('app_admin cannot read organization', async () => {
    await expectDenied('admin', 'SELECT id FROM organization LIMIT 0');
  });

  it('app_worker can update key_state of an organization and no other column', async () => {
    await expectAllowed('worker', 'UPDATE organization SET key_state = NULL WHERE false');
    await expectDenied('worker', 'UPDATE organization SET name = NULL WHERE false');
    await expectDenied('worker', 'UPDATE organization SET slug = NULL WHERE false');
  });

  it('app_api can delete keys and organization keys, read admin identities, and write flags', async () => {
    await expectAllowed('api', 'DELETE FROM api_key WHERE false');
    await expectAllowed('api', 'DELETE FROM org_key WHERE false');
    await expectAllowed('api', 'SELECT id FROM platform_admin_identity LIMIT 0');
    await expectAllowed('api', 'SELECT id FROM platform_admin_session LIMIT 0');
    await expectAllowed('api', 'INSERT INTO kill_switch DEFAULT VALUES');
    await expectAllowed('api', 'UPDATE kill_switch SET id = id WHERE false');
    await expectAllowed('api', 'INSERT INTO feature_flag DEFAULT VALUES');
    await expectAllowed('api', 'UPDATE feature_flag SET key = NULL WHERE false');
    await expectDenied('api', 'DELETE FROM kill_switch WHERE false');
  });
});

describe('role attributes', () => {
  it('no app role is a superuser, and only the gateway and the migrator bypass row security', async () => {
    const result = await admin.query<{
      rolname: string;
      rolsuper: boolean;
      rolbypassrls: boolean;
      rolcanlogin: boolean;
      rolinherit: boolean;
      rolconnlimit: number;
    }>(
      `SELECT rolname, rolsuper, rolbypassrls, rolcanlogin, rolinherit, rolconnlimit
         FROM pg_roles WHERE rolname LIKE 'app\\_%' ORDER BY rolname`,
    );
    const byName = new Map(result.rows.map((row) => [row.rolname, row]));
    const logins: LoginRole[] = [...ROLE_NAMES, 'migrator'];
    for (const role of logins) {
      const row = byName.get(dbRoleName(role))!;
      expect(row).toBeDefined();
      expect(row.rolsuper).toBe(false);
      expect(row.rolcanlogin).toBe(true);
      expect(row.rolinherit).toBe(false);
      expect(row.rolconnlimit).toBeGreaterThan(0);
      expect(row.rolbypassrls).toBe(role === 'gateway' || role === 'migrator');
    }
  });

  it('the migrator owns every table in the public schema', async () => {
    const result = await admin.query<{ tablename: string; tableowner: string }>(
      `SELECT tablename, tableowner FROM pg_tables WHERE schemaname = 'public'`,
    );
    expect(result.rows.length).toBeGreaterThan(20);
    expect(result.rows.filter((row) => row.tableowner !== 'app_migrator')).toEqual([]);
  });

  it('applying the grants again changes nothing and never leaves a gap', async () => {
    const snapshot = () =>
      admin.query(
        `SELECT grantee, table_name, privilege_type FROM information_schema.role_table_grants
          WHERE table_schema = 'public' AND grantee LIKE 'app\\_%'
          UNION ALL
         SELECT grantee, table_name || '.' || column_name, privilege_type
           FROM information_schema.column_privileges
          WHERE table_schema = 'public' AND grantee LIKE 'app\\_%'
          ORDER BY 1, 2, 3`,
      );
    const before = await snapshot();
    const passwords = Object.fromEntries(
      [...ROLE_NAMES, 'migrator'].map((role) => [
        role,
        requireEnv(`DB_ROLE_PASSWORD_${role.toUpperCase()}`),
      ]),
    ) as Record<LoginRole, string>;
    const setup = new pg.Client({ connectionString: databaseUrl });
    await setup.connect();
    try {
      await applyRoleGrants(setup, { passwords });
    } finally {
      await setup.end();
    }
    expect((await snapshot()).rows).toEqual(before.rows);
    expect(before.rows.length).toBeGreaterThan(50);
  });
});
