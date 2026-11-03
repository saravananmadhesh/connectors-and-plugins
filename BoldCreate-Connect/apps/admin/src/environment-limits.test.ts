import { describe, expect, it } from 'vitest';
import type { AdminConfig } from './config.js';
import { environmentLimits } from './environment-limits.js';

const config = {
  BODY_LIMIT_BYTES: 262_144,
  MAX_HEADER_BYTES: 16_384,
  SHUTDOWN_DRAIN_SECONDS: 20,
  UV_THREADPOOL_SIZE: 8,
  DATABASE_URL: 'postgres://user:secret@db/app',
} as unknown as AdminConfig;

describe('environmentLimits', () => {
  it('lists the fixed numbers of the service', () => {
    const byKey = Object.fromEntries(environmentLimits(config).map((item) => [item.key, item]));
    expect(byKey['body_limit_bytes']?.value).toBe(262_144);
    expect(byKey['max_header_bytes']?.value).toBe(16_384);
    expect(byKey['shutdown_drain_seconds']?.value).toBe(20);
    expect(byKey['uv_threadpool_size']?.value).toBe(8);
  });

  it('never carries a secret, address or key', () => {
    expect(JSON.stringify(environmentLimits(config))).not.toMatch(/secret|postgres|:\/\//);
  });

  it('gives every item a number, so the screen can show it without an edit path', () => {
    for (const item of environmentLimits(config)) expect(Number.isFinite(item.value)).toBe(true);
  });
});
