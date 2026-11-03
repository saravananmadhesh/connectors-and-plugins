import { describe, expect, it } from 'vitest';
import { formatWindows, isDegraded, summarizeWindows, type Sample } from './ramp.js';

const sample = (at: number, durationMs: number, status: number): Sample => ({
  at,
  durationMs,
  status,
});

describe('summarizeWindows', () => {
  it('groups calls by window and counts each kind of answer', () => {
    const windows = summarizeWindows(
      [
        sample(0.5, 10, 200),
        sample(1, 20, 200),
        sample(2, 30, 429),
        sample(3, 40, 503),
        sample(4, 50, 500),
        sample(5, 60, 0),
        sample(11, 5, 200),
      ],
      10,
      (second) => second * 10,
    );
    expect(windows).toHaveLength(2);
    expect(windows[0]).toMatchObject({
      fromSecond: 0,
      users: 100,
      calls: 6,
      ok: 2,
      throttled: 1,
      unavailable: 1,
      serverErrors: 1,
      noAnswer: 1,
    });
    expect(windows[1]).toMatchObject({ fromSecond: 10, calls: 1, ok: 1, perSecond: 0.1 });
  });

  it('reports percentiles of the durations in a window', () => {
    const calls = Array.from({ length: 100 }, (_, i) => sample(1, i + 1, 200));
    const [window] = summarizeWindows(calls, 10, () => 1);
    expect(window).toMatchObject({ p50Ms: 50, p95Ms: 95, p99Ms: 99 });
  });

  it('gives nothing for no calls', () => {
    expect(summarizeWindows([], 10, () => 0)).toEqual([]);
  });
});

describe('isDegraded', () => {
  const healthy = summarizeWindows([sample(1, 20, 200)], 10, () => 1)[0]!;

  it('accepts a window of fast, successful calls', () => {
    expect(isDegraded(healthy)).toBe(false);
  });

  it('flags a window with more than 1% failures', () => {
    const calls = [
      ...Array.from({ length: 98 }, () => sample(1, 5, 200)),
      sample(1, 5, 503),
      sample(1, 5, 503),
    ];
    expect(isDegraded(summarizeWindows(calls, 10, () => 1)[0]!)).toBe(true);
  });

  it('flags a window whose p95 is over a second', () => {
    expect(isDegraded(summarizeWindows([sample(1, 1_500, 200)], 10, () => 1)[0]!)).toBe(true);
  });

  it('tolerates one failure in a hundred', () => {
    const calls = [...Array.from({ length: 99 }, () => sample(1, 5, 200)), sample(1, 5, 503)];
    expect(isDegraded(summarizeWindows(calls, 10, () => 1)[0]!)).toBe(false);
  });
});

describe('formatWindows', () => {
  it('prints a header and one line per window', () => {
    const text = formatWindows(summarizeWindows([sample(1, 20, 200)], 10, () => 1));
    expect(text.split('\n')).toHaveLength(2);
    expect(text).toContain('calls/s');
  });
});
