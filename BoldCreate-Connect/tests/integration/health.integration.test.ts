/**
 * Health, readiness and metrics of all six apps, which all run on the shared server.
 */
import { describe, expect, it } from 'vitest';
import { adminUrl, apiUrl, gatewayUrl, webUrl, workerUrl } from './test-env.js';

const apps = [
  { name: 'web', url: webUrl },
  { name: 'admin', url: adminUrl },
  { name: 'api', url: apiUrl },
  { name: 'gateway', url: gatewayUrl },
  { name: 'worker', url: workerUrl },
];

describe.each(apps)('$name health', ({ name, url }) => {
  it('answers /healthz with 200', async () => {
    const res = await fetch(`${url}/healthz`);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ status: 'ok' });
  });

  it('answers /readyz with 200 when the database is reachable', async () => {
    expect((await fetch(`${url}/readyz`)).status).toBe(200);
  });

  it('exposes request metrics on /metrics', async () => {
    await fetch(`${url}/healthz`);
    const res = await fetch(`${url}/metrics`);
    expect(res.status).toBe(200);
    expect(await res.text()).toMatch(new RegExp(`^boldcreate_${name}_http_requests_total\\{`, 'm'));
  });
});

describe('admin app surface', () => {
  it('answers 404 not_found JSON for every other api path', async () => {
    for (const path of ['/api/v1/auth/me', '/api/v1/admin/unknown', '/api/v1/orgs']) {
      const res = await fetch(`${adminUrl}${path}`);
      expect(res.status).toBe(404);
      expect(await res.json()).toMatchObject({ error: { code: 'not_found' } });
    }
  });
});
