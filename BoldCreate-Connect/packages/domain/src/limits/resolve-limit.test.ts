import { describe, expect, it } from 'vitest';
import { LIMIT_DEFINITIONS } from '@boldcreate-integrations/limits';
import { buildSnapshot, resolveLimit, type StoredLimit } from './resolve-limit.js';

const KEY = 'project_requests_per_minute';
const NOW = new Date('2030-01-01T00:00:00Z');
const subject = { projectId: 'fixture-project', organizationId: 'fixture-org' };

const row = (overrides: Partial<StoredLimit>): StoredLimit => ({
  key: KEY,
  scope: 'global',
  scopeId: null,
  value: 1000,
  expiresAt: null,
  ...overrides,
});

describe('resolveLimit', () => {
  it('uses the built-in value when nothing is stored', () => {
    expect(resolveLimit(buildSnapshot([]), KEY, subject, NOW)).toEqual({
      limit: LIMIT_DEFINITIONS[KEY].default,
      windowSeconds: LIMIT_DEFINITIONS[KEY].windowSeconds,
      source: 'default',
    });
  });

  it('uses the global value over the built-in one', () => {
    const result = resolveLimit(buildSnapshot([row({ value: 700 })]), KEY, subject, NOW);
    expect(result).toMatchObject({ limit: 700, source: 'global' });
  });

  it('prefers organization over global and project over organization', () => {
    const rows = [
      row({ value: 700 }),
      row({ scope: 'organization', scopeId: 'fixture-org', value: 800 }),
      row({ scope: 'project', scopeId: 'fixture-project', value: 900 }),
    ];
    const snapshot = buildSnapshot(rows);
    expect(resolveLimit(snapshot, KEY, subject, NOW)).toMatchObject({
      limit: 900,
      source: 'project',
    });
    expect(resolveLimit(snapshot, KEY, { organizationId: 'fixture-org' }, NOW)).toMatchObject({
      limit: 800,
      source: 'organization',
    });
  });

  it('lets a project override be lower than its organization value', () => {
    const snapshot = buildSnapshot([
      row({ scope: 'organization', scopeId: 'fixture-org', value: 5000 }),
      row({ scope: 'project', scopeId: 'fixture-project', value: 100 }),
    ]);
    expect(resolveLimit(snapshot, KEY, subject, NOW).limit).toBe(100);
  });

  it('does not apply another project or organization value', () => {
    const snapshot = buildSnapshot([
      row({ scope: 'project', scopeId: 'fixture-other-project', value: 1 }),
      row({ scope: 'organization', scopeId: 'fixture-other-org', value: 2 }),
    ]);
    expect(resolveLimit(snapshot, KEY, subject, NOW).source).toBe('default');
  });

  it('skips a value past its expiry and falls to the next level', () => {
    const snapshot = buildSnapshot([
      row({ value: 700 }),
      row({
        scope: 'project',
        scopeId: 'fixture-project',
        value: 9000,
        expiresAt: new Date(NOW.getTime() - 1),
      }),
    ]);
    expect(resolveLimit(snapshot, KEY, subject, NOW)).toMatchObject({
      limit: 700,
      source: 'global',
    });
  });

  it('treats a value that expires exactly now as expired and one in the future as live', () => {
    const at = (expiresAt: Date) =>
      resolveLimit(buildSnapshot([row({ expiresAt })]), KEY, subject, NOW).source;
    expect(at(NOW)).toBe('default');
    expect(at(new Date(NOW.getTime() + 1))).toBe('global');
  });
});
