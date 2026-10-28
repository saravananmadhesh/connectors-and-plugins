/**
 * Error contract on the live API: envelope, request id header and detail rules.
 *
 * Run: pnpm test -- --only=integration
 */
import { describe, it, expect } from 'vitest';
import { apiUrl, requireEnv } from './test-env.js';

const apiHeaders = {
  'x-caller-id': 'web',
  'x-workload-secret': requireEnv('WORKLOAD_SECRET'),
  'Content-Type': 'application/json',
};

interface ErrorBody {
  error: { code: string; message: string; requestId: string; details?: unknown };
}

describe('error contract', () => {
  it('answers an unauthenticated request with 401 and a matching request id', async () => {
    const res = await fetch(`${apiUrl}/v1/orgs`, { headers: apiHeaders });
    expect(res.status).toBe(401);
    const body = (await res.json()) as ErrorBody;
    expect(body.error.code).toBe('unauthenticated');
    expect(body.error.requestId).toBeTruthy();
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId);
  });

  it('includes details for validation_failed', async () => {
    const res = await fetch(`${apiUrl}/v1/auth/signup`, {
      method: 'POST',
      headers: { ...apiHeaders, 'idempotency-key': 'error-contract-signup' },
      body: JSON.stringify({ email: 'not-an-email', password: 'short', displayName: '' }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as ErrorBody;
    expect(body.error.code).toBe('validation_failed');
    expect(Array.isArray(body.error.details)).toBe(true);
  });

  it('answers forbidden without details', async () => {
    const res = await fetch(`${apiUrl}/v1/auth/session`, {
      method: 'POST',
      headers: { 'x-caller-id': 'web', 'x-workload-secret': 'wrong-secret' },
    });
    expect([401, 403]).toContain(res.status);
    const body = (await res.json()) as ErrorBody;
    expect(body.error).not.toHaveProperty('details');
  });

  it('answers an unknown route with the standard envelope', async () => {
    const res = await fetch(`${apiUrl}/v1/does-not-exist`, { headers: apiHeaders });
    expect(res.status).toBe(404);
    expect(((await res.json()) as ErrorBody).error.code).toBe('not_found');
  });
});
