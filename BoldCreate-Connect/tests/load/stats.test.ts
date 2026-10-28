import { describe, expect, it } from 'vitest';
import { Recorder, formatSummary, percentile } from './stats.js';

describe('percentile', () => {
  it('uses the nearest rank and is 0 for no values', () => {
    const values = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(percentile(values, 0.5)).toBe(50);
    expect(percentile(values, 0.95)).toBe(95);
    expect(percentile(values, 0.99)).toBe(99);
    expect(percentile(values, 1)).toBe(100);
    expect(percentile([7], 0.99)).toBe(7);
    expect(percentile([], 0.5)).toBe(0);
  });
});

describe('Recorder', () => {
  it('counts calls, failures and throttled retries for each label', () => {
    const recorder = new Recorder();
    recorder.record('read', 10, true);
    recorder.record('read', 30, true);
    recorder.record('read', 20, false);
    recorder.record('write', 5, true);
    recorder.throttle('read');
    recorder.throttle('read');
    expect(recorder.summary()).toEqual([
      {
        label: 'read',
        calls: 3,
        failed: 1,
        throttled: 2,
        p50Ms: 20,
        p95Ms: 30,
        p99Ms: 30,
        maxMs: 30,
      },
      { label: 'write', calls: 1, failed: 0, throttled: 0, p50Ms: 5, p95Ms: 5, p99Ms: 5, maxMs: 5 },
    ]);
    expect(recorder.totalFailed()).toBe(1);
  });

  it('is empty before any call', () => {
    expect(new Recorder().summary()).toEqual([]);
    expect(new Recorder().totalFailed()).toBe(0);
  });
});

describe('formatSummary', () => {
  it('lines the columns up under a header', () => {
    const recorder = new Recorder();
    recorder.record('mint personal key', 12, true);
    const lines = formatSummary(recorder.summary()).split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^call\s+calls\s+failed\s+429s\s+p50 ms/);
    expect(lines[1]).toMatch(/^mint personal key\s+1\s+0\s+0\s+12/);
  });
});
