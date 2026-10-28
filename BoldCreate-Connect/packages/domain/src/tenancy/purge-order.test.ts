import { describe, expect, it } from 'vitest';
import { ORG_PURGE_ORDER } from './deletion.js';

/** Each table and the tables whose rows reference it, so those must be emptied first. */
const REFERENCED_BY: Record<string, string[]> = {
  installation: ['installation_component'],
  project: ['installation', 'api_key', 'project_user'],
  organization: [
    'installation',
    'api_key',
    'project_user',
    'project',
    'org_key',
    'organization_member',
    'email_token',
    'org_policy',
  ],
};

/** The tables that appear after a table they reference, as a readable list. */
function misordered(order: readonly string[]): string[] {
  const problems: string[] = [];
  order.forEach((table, index) => {
    for (const child of REFERENCED_BY[table] ?? []) {
      const childIndex = order.indexOf(child);
      if (childIndex > index) problems.push(child + ' comes after ' + table);
    }
  });
  return problems;
}

describe('purge order', () => {
  it('empties every referencing table of an organization before the row it points at', () => {
    expect(misordered(ORG_PURGE_ORDER)).toEqual([]);
  });

  it('ends an organization purge with the organization itself', () => {
    expect(ORG_PURGE_ORDER.at(-1)).toBe('organization');
    expect(new Set(ORG_PURGE_ORDER).size).toBe(ORG_PURGE_ORDER.length);
  });
});
