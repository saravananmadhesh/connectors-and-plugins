/**
 * The gateway reads the limits an administrator set through a read-only api route. Only the
 * gateway's workload identity may call it, and it returns numbers only.
 */
import { describe, expect, it } from 'vitest';
import { workloadHeaders } from './signed-in-user.js';
import { apiUrl } from './test-env.js';

const read = (caller = 'gateway', method = 'GET') =>
  fetch(`${apiUrl}/v1/gateway/limits`, {
    method,
    headers: { ...workloadHeaders, 'x-caller-id': caller },
  });

describe('GET /v1/gateway/limits', () => {
  it('returns stored values as numbers, never cached', async () => {
    const res = await read();
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('no-store');
    const body = (await res.json()) as { values: Record<string, unknown> };
    expect(Object.keys(body)).toEqual(['values']);
    for (const value of Object.values(body.values)) expect(typeof value).toBe('number');
  });

  it('refuses every caller except the gateway', async () => {
    expect((await read('web')).status).toBe(403);
    expect((await read('admin')).status).toBe(403);
  });

  it('refuses a request without a workload identity', async () => {
    const res = await fetch(`${apiUrl}/v1/gateway/limits`);
    expect(res.status).toBe(401);
  });

  it('has no way to change a value', async () => {
    const res = await read('gateway', 'POST');
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });
});
