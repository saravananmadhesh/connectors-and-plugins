/**
 * Every table in the database has grants for every role and a row-security entry, and the entries
 * match what the migrations created: `tenant` tables enforce row security (also for their owner)
 * and have policies, and every declared maintenance purpose has its policy.
 *
 * Run: pnpm test -- --only=integration
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pg from 'pg';
import { RLS_TABLES, ROLE_GRANTS, ROLE_NAMES, dbRoleName } from '../../packages/db/src/index.js';
import { databaseUrl } from './test-env.js';

const admin = new pg.Client({ connectionString: databaseUrl });
let tables: string[] = [];
const rowSecurity = new Map<string, { enabled: boolean; forced: boolean }>();
const policies = new Map<string, Array<{ name: string; command: string; roles: string[] }>>();

beforeAll(async () => {
  await admin.connect();
  const names = await admin.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        AND table_name <> '__drizzle_migrations'
      ORDER BY table_name`,
  );
  tables = names.rows.map((row) => row.table_name);
  const classes = await admin.query<{
    relname: string;
    relrowsecurity: boolean;
    relforcerowsecurity: boolean;
  }>(
    `SELECT relname, relrowsecurity, relforcerowsecurity FROM pg_class
      WHERE relnamespace = 'public'::regnamespace AND relkind = 'r'`,
  );
  for (const row of classes.rows) {
    rowSecurity.set(row.relname, { enabled: row.relrowsecurity, forced: row.relforcerowsecurity });
  }
  const found = await admin.query<{
    tablename: string;
    policyname: string;
    cmd: string;
    roles: string;
  }>(
    `SELECT tablename, policyname, cmd, roles::text AS roles FROM pg_policies WHERE schemaname = 'public'`,
  );
  for (const row of found.rows) {
    const list = policies.get(row.tablename) ?? [];
    list.push({
      name: row.policyname,
      command: row.cmd.toLowerCase(),
      roles: row.roles.replace(/[{}]/g, '').split(',').filter(Boolean),
    });
    policies.set(row.tablename, list);
  }
});

afterAll(async () => {
  await admin.end();
});

describe('schema coverage', () => {
  it('has tables to check', () => {
    expect(tables.length).toBeGreaterThanOrEqual(20);
  });

  it('lists every table for every role and for row security, and nothing else', () => {
    const problems: string[] = [];
    for (const table of tables) {
      if (!(table in RLS_TABLES)) problems.push(`RLS_TABLES.${table}`);
      for (const role of ROLE_NAMES) {
        if (!(table in ROLE_GRANTS[role])) problems.push(`ROLE_GRANTS.${role}.${table}`);
      }
    }
    expect(problems).toEqual([]);
    for (const table of Object.keys(RLS_TABLES)) expect(tables).toContain(table);
  });

  it('enforces row security, for the owner too, with at least one policy on every tenant table', () => {
    const problems: string[] = [];
    for (const [table, entry] of Object.entries(RLS_TABLES)) {
      const security = rowSecurity.get(table);
      if (entry.rls === 'tenant') {
        if (!security?.enabled || !security.forced)
          problems.push(`${table}: row security not forced`);
        if (!policies.get(table)?.length) problems.push(`${table}: no policy`);
      } else {
        if (security?.enabled) problems.push(`${table}: row security on but declared none`);
        if (!entry.reason) problems.push(`${table}: no reason`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('has a policy for every declared maintenance purpose, limited to the roles listed', () => {
    const problems: string[] = [];
    for (const [table, entry] of Object.entries(RLS_TABLES)) {
      for (const [purpose, grant] of Object.entries(entry.maintenance ?? {})) {
        for (const command of grant.commands) {
          const name = `maintenance_${purpose}_${command}`;
          const policy = policies.get(table)?.find((p) => p.name === name);
          const roles = grant.roles.map(dbRoleName).sort().join(',');
          if (!policy) problems.push(`${table}: missing ${name}`);
          else if (policy.command !== command || policy.roles.sort().join(',') !== roles) {
            problems.push(`${table}: ${name} differs from the declaration`);
          }
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('has no maintenance policy that the declarations do not list', () => {
    const undeclared: string[] = [];
    for (const [table, list] of policies) {
      const entry = RLS_TABLES[table as keyof typeof RLS_TABLES];
      const declared = Object.entries(entry?.maintenance ?? {}).flatMap(([purpose, grant]) =>
        grant.commands.map((command) => `maintenance_${purpose}_${command}`),
      );
      for (const policy of list) {
        if (policy.name.startsWith('maintenance_') && !declared.includes(policy.name)) {
          undeclared.push(`${table}: ${policy.name}`);
        }
      }
    }
    expect(undeclared).toEqual([]);
  });
});
