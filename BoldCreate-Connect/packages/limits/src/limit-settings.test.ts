import { describe, expect, it } from 'vitest';
import {
  LIMIT_DEFINITIONS,
  LIMIT_KEYS,
  WRITABLE_LIMIT_SCOPES,
  isLimitKey,
} from './limit-settings.js';

describe('limit definitions', () => {
  it('keeps every built-in value inside its own bounds', () => {
    for (const key of LIMIT_KEYS) {
      const { default: builtIn, min, max, windowSeconds } = LIMIT_DEFINITIONS[key];
      expect(min).toBeGreaterThan(0);
      expect(builtIn).toBeGreaterThanOrEqual(min);
      expect(builtIn).toBeLessThanOrEqual(max);
      expect(windowSeconds).toBeGreaterThan(0);
    }
  });

  it('uses keys the database format check accepts', () => {
    for (const key of LIMIT_KEYS) expect(key).toMatch(/^[a-z][a-z0-9_]{1,63}$/);
  });

  it('recognises only defined keys', () => {
    expect(isLimitKey('project_requests_per_minute')).toBe(true);
    expect(isLimitKey('toString')).toBe(false);
    expect(isLimitKey('nope')).toBe(false);
  });

  it('names the unit of every limit', () => {
    expect(LIMIT_DEFINITIONS.pod_max_inflight.unit).toBe('concurrent');
    expect(LIMIT_DEFINITIONS.project_requests_per_minute.unit).toBe('per_window');
  });

  it('gives each new capacity limit its unit and group', () => {
    expect(LIMIT_DEFINITIONS.db_queue_max_depth).toMatchObject({
      unit: 'callers',
      group: 'Capacity',
    });
    expect(LIMIT_DEFINITIONS.db_queue_max_wait_seconds).toMatchObject({ unit: 'seconds', max: 30 });
    expect(LIMIT_DEFINITIONS.db_queue_project_share_pct).toMatchObject({
      unit: 'percent',
      max: 100,
    });
  });

  it('keeps the wait for the database below the longest request', () => {
    expect(LIMIT_DEFINITIONS.db_queue_max_wait_seconds.max).toBeLessThanOrEqual(30);
  });

  it('lets administrators write the global level only', () => {
    expect(WRITABLE_LIMIT_SCOPES).toEqual(['global']);
  });
});

describe('limits that follow the admin app in every service', () => {
  it('lists the gateway and shedding limits with sane bounds', () => {
    for (const key of [
      'key_requests_per_minute',
      'mcp_max_inflight_calls',
      'event_loop_lag_shed_ms',
      'heap_shed_percent',
    ] as const) {
      const limit = LIMIT_DEFINITIONS[key];
      expect(limit.min).toBeLessThanOrEqual(limit.default);
      expect(limit.default).toBeLessThanOrEqual(limit.max);
      expect(Number.isInteger(limit.default)).toBe(true);
    }
    expect(LIMIT_DEFINITIONS.event_loop_lag_shed_ms.unit).toBe('milliseconds');
    expect(LIMIT_DEFINITIONS.heap_shed_percent.max).toBeLessThanOrEqual(99);
  });

  it('keeps the built-in values equal to the configuration defaults', () => {
    expect(LIMIT_DEFINITIONS.key_requests_per_minute.default).toBe(600);
    expect(LIMIT_DEFINITIONS.mcp_max_inflight_calls.default).toBe(100);
    expect(LIMIT_DEFINITIONS.event_loop_lag_shed_ms.default).toBe(250);
    expect(LIMIT_DEFINITIONS.heap_shed_percent.default).toBe(85);
  });
});
