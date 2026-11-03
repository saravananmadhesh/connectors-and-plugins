import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMetrics, type Metrics } from '@boldcreate-integrations/observability';
import { buildTestServer, type TestServer } from './testing.js';

const servers: TestServer[] = [];
const all: Metrics[] = [];
afterEach(async () => {
  for (const metrics of all.splice(0)) metrics.stop();
  await Promise.all(servers.splice(0).map((server) => server.app.close()));
});

function build(maxInflight: number): {
  server: TestServer;
  metrics: Metrics;
  release: () => void;
} {
  const metrics = createMetrics({ service: 'api' });
  const server = buildTestServer({ metrics, config: { HTTP_MAX_INFLIGHT: maxInflight } });
  servers.push(server);
  all.push(metrics);
  let release = (): void => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  server.app.get('/slow', async () => {
    await gate;
    return { ok: true };
  });
  return { server, metrics, release };
}

describe('pod load shedding', () => {
  it('refuses requests over the in-flight cap with a fast 503 and Retry-After', async () => {
    const { server, metrics, release } = build(2);
    const first = server.app.inject({ method: 'GET', url: '/slow' });
    const second = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));

    const refused = await server.app.inject({ method: 'GET', url: '/slow' });
    expect(refused.statusCode).toBe(503);
    expect(refused.headers['retry-after']).toBe('1');
    expect(refused.headers['x-shed-reason']).toBe('inflight');
    expect(refused.json().error.code).toBe('service_unavailable');
    expect(await metrics.scrape()).toContain('load_shed_total{reason="inflight"} 1');

    release();
    expect((await first).statusCode).toBe(200);
    expect((await second).statusCode).toBe(200);
  });

  it('takes requests again once the busy ones finish', async () => {
    const { server, release } = build(1);
    const busy = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect((await server.app.inject({ method: 'GET', url: '/slow' })).statusCode).toBe(503);
    release();
    await busy;
    expect((await server.app.inject({ method: 'GET', url: '/slow' })).statusCode).toBe(200);
  });

  it('applies a new cap to a running server', async () => {
    const { server, release } = build(1);
    const busy = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect((await server.app.inject({ method: 'GET', url: '/slow' })).statusCode).toBe(503);
    server.setMaxInflight(3);
    const second = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    release();
    expect((await second).statusCode).toBe(200);
    await busy;
  });

  it('never refuses health, readiness or metrics', async () => {
    const { server, release } = build(1);
    const busy = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect((await server.app.inject({ method: 'GET', url: '/healthz' })).statusCode).toBe(200);
    expect((await server.app.inject({ method: 'GET', url: '/readyz' })).statusCode).toBe(200);
    expect((await server.app.inject({ method: 'GET', url: '/metrics' })).statusCode).toBe(200);
    release();
    await busy;
  });

  it('does not call the audit hook for a refused request', async () => {
    const audit = vi.fn<() => Promise<void>>(async () => undefined);
    const metrics = createMetrics({ service: 'api' });
    all.push(metrics);
    const server = buildTestServer({ metrics, config: { HTTP_MAX_INFLIGHT: 1 }, hooks: { audit } });
    servers.push(server);
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    server.app.get('/slow', async () => {
      await gate;
      return { ok: true };
    });
    const first = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    const refused = await server.app.inject({ method: 'GET', url: '/slow' });
    expect(refused.statusCode).toBe(503);
    expect(audit).not.toHaveBeenCalled();
    release();
    await first;
  });

  it('counts a refusal by reason and keeps counting each one', async () => {
    const { server, metrics, release } = build(1);
    const first = server.app.inject({ method: 'GET', url: '/slow' });
    await new Promise((resolve) => setTimeout(resolve, 20));
    for (let i = 0; i < 3; i += 1) await server.app.inject({ method: 'GET', url: '/slow' });
    expect(await metrics.scrape()).toContain('load_shed_total{reason="inflight"} 3');
    release();
    await first;
  });

  it('does not refuse anything while the cap is 0', async () => {
    const { server, release } = build(0);
    const calls = Array.from({ length: 20 }, () =>
      server.app.inject({ method: 'GET', url: '/slow' }),
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    release();
    for (const call of calls) expect((await call).statusCode).toBe(200);
  });
});
