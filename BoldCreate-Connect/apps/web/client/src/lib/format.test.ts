import { describe, expect, it } from 'vitest';
import { formatDate, relativeTime } from './format';

const NOW = new Date('2026-10-11T12:00:00.000Z');

describe('relativeTime', () => {
  it('says just now for the last minute', () => {
    expect(relativeTime('2026-10-11T11:59:40.000Z', NOW)).toBe('just now');
  });

  it('counts back in the largest fitting unit', () => {
    expect(relativeTime('2026-10-11T09:00:00.000Z', NOW)).toBe('3 hours ago');
    expect(relativeTime('2026-10-10T12:00:00.000Z', NOW)).toBe('yesterday');
    expect(relativeTime('2026-07-11T12:00:00.000Z', NOW)).toBe('3 months ago');
  });

  it('counts forward for a future time', () => {
    expect(relativeTime('2026-10-11T14:00:00.000Z', NOW)).toBe('in 2 hours');
  });
});

describe('formatDate', () => {
  it('formats a calendar date', () => {
    expect(formatDate('2026-10-11T12:00:00.000Z')).toMatch(/2026|26/);
  });
});
