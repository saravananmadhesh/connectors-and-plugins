import { describe, expect, it } from 'vitest';
import {
  eventKindText,
  formatStorage,
  recordRows,
  sinceOf,
  statusActions,
  storageShare,
} from './observability';
import { parseObservabilitySearch } from './search';

describe('observability helpers', () => {
  it('words an event kind', () => {
    expect(eventKindText('startup_check_failed')).toBe('Startup check failed');
    expect(eventKindText('key_wrap.failed')).toBe('Key wrap failed');
    expect(eventKindText('')).toBe('');
  });

  it('offers the changes that make sense for each state', () => {
    expect(statusActions('unresolved').map((action) => action.to)).toEqual(['resolved', 'ignored']);
    expect(statusActions('resolved').map((action) => action.to)).toEqual(['unresolved']);
    expect(statusActions('ignored').map((action) => action.to)).toEqual(['unresolved']);
  });

  it('counts a window back from the time the page opened, cut to the minute', () => {
    const openedAt = Date.parse('2026-03-01T12:34:56.789Z');
    expect(sinceOf('1h', openedAt)).toBe('2026-03-01T11:34:00.000Z');
    expect(sinceOf('7d', openedAt)).toBe('2026-02-22T12:34:00.000Z');
    expect(sinceOf(undefined, openedAt)).toBeUndefined();
  });

  it('formats sizes and the share of the limit', () => {
    expect(formatStorage(512)).toBe('512 B');
    expect(formatStorage(1536)).toBe('1.5 KB');
    expect(formatStorage(5 * 1024 ** 3)).toBe('5.0 GB');
    expect(storageShare(50, 200)).toBe(25);
    expect(storageShare(500, 200)).toBe(100);
    expect(storageShare(50, 0)).toBeNull();
  });

  it('lists a stored record as text', () => {
    expect(recordRows(null)).toEqual([]);
    expect(recordRows({ a: 'x', b: [1, 2], c: { d: true } })).toEqual([
      ['a', 'x'],
      ['b', '[1,2]'],
      ['c', '{"d":true}'],
    ]);
  });

  it('keeps only the search values it knows', () => {
    expect(
      parseObservabilitySearch({
        tab: 'events',
        status: 'resolved',
        severity: 'fatal',
        range: '7d',
        kind: ' key. ',
        service: '',
        other: 'x',
      }),
    ).toEqual({ tab: 'events', status: 'resolved', range: '7d', kind: 'key.' });
  });
});
