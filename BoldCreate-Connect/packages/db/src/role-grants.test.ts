import { describe, it, expect } from 'vitest';
import { getTableConfig, pgTable, text, uuid, type PgTable } from 'drizzle-orm/pg-core';
import * as schema from './schema/index.js';
import { RLS_TABLES, ROLE_GRANTS, ROLE_NAMES } from './role-grants.js';

function tableNames(source: Record<string, unknown>): string[] {
  const names: string[] = [];
  for (const value of Object.values(source)) {
    if (value && typeof value === 'object' && 'getSQL' in value) {
      try {
        names.push(getTableConfig(value as PgTable).name);
      } catch {
        // not a table
      }
    }
  }
  return names;
}

function missing(names: string[]): string[] {
  const problems: string[] = [];
  for (const name of names) {
    if (!(name in RLS_TABLES)) problems.push(`RLS_TABLES.${name}`);
    for (const role of ROLE_NAMES) {
      if (!(name in ROLE_GRANTS[role])) problems.push(`ROLE_GRANTS.${role}.${name}`);
    }
  }
  return problems;
}

describe('role grants coverage', () => {
  it('has an entry for every schema table, for every role, and for RLS', () => {
    const names = tableNames(schema);
    expect(names.length).toBeGreaterThanOrEqual(20);
    expect(missing(names)).toEqual([]);
  });

  it('has no entry for a table that does not exist', () => {
    const names = new Set(tableNames(schema));
    for (const name of Object.keys(RLS_TABLES)) expect(names.has(name)).toBe(true);
    for (const role of ROLE_NAMES) {
      for (const name of Object.keys(ROLE_GRANTS[role])) expect(names.has(name)).toBe(true);
    }
  });

  it('fails for a table that was added without entries', () => {
    const extra = pgTable('extra_table', { id: uuid('id').primaryKey(), name: text('name') });
    const names = tableNames({ ...schema, extra });
    expect(missing(names)).toContain('RLS_TABLES.extra_table');
    expect(missing(names)).toContain('ROLE_GRANTS.api.extra_table');
  });

  it('gives every table without row-level security a reason', () => {
    const withoutReason = Object.entries(RLS_TABLES)
      .filter(([, entry]) => entry.rls === 'none' && !entry.reason)
      .map(([name]) => name);
    expect(withoutReason).toEqual([]);
  });
});
