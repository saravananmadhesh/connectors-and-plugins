import { describe, expect, it } from 'vitest';
import {
  parseAuditSearch,
  parseDiscoverSearch,
  parsePluginSearch,
  parseVersionSearch,
} from './search';
import { formatDateTime, relativeTime } from './format';

describe('page search parameters', () => {
  it('keeps the audit filters it knows and drops the rest', () => {
    expect(
      parseAuditSearch({ action: ' plugin. ', result: 'denied', actor: 'ops', range: '7d', x: 1 }),
    ).toEqual({ action: 'plugin.', result: 'denied', actor: 'ops', range: '7d' });
    expect(parseAuditSearch({ result: 'maybe', range: 'forever', action: '  ', actor: 5 })).toEqual(
      {},
    );
    expect(parseAuditSearch({ actor: 'x'.repeat(500) }).actor).toHaveLength(200);
  });

  it('accepts only the tabs each page has', () => {
    expect(parsePluginSearch({ tab: 'source' })).toEqual({ tab: 'source' });
    expect(parsePluginSearch({ tab: 'safety' })).toEqual({});
    expect(parseVersionSearch({ tab: 'safety' })).toEqual({ tab: 'safety' });
    expect(parseVersionSearch({ tab: 'edit' })).toEqual({});
    expect(parseDiscoverSearch({ tab: 'repositories' })).toEqual({ tab: 'repositories' });
    expect(parseDiscoverSearch({ tab: 1 })).toEqual({});
  });
});

describe('relative time', () => {
  const now = new Date('2026-10-11T12:00:00.000Z');
  it('speaks in the largest unit that fits', () => {
    expect(relativeTime('2026-10-11T11:59:40.000Z', now)).toBe('just now');
    expect(relativeTime('2026-10-11T11:55:00.000Z', now)).toBe('5 minutes ago');
    expect(relativeTime('2026-10-11T09:00:00.000Z', now)).toBe('3 hours ago');
    expect(relativeTime('2026-10-10T12:00:00.000Z', now)).toBe('yesterday');
    expect(relativeTime('2026-09-01T12:00:00.000Z', now)).toBe('last month');
    expect(relativeTime('2024-10-11T12:00:00.000Z', now)).toBe('2 years ago');
    expect(relativeTime('2026-10-11T12:10:00.000Z', now)).toBe('in 10 minutes');
  });

  it('formats an exact time for titles', () => {
    expect(formatDateTime('2026-10-11T12:00:00.000Z')).toContain('2026');
  });
});
