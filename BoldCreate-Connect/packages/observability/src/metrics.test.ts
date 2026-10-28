import { afterEach, describe, expect, it } from 'vitest';
import { METRIC_NAMES } from './metric-names.js';
import { createMetrics, metricName, statusClass, type Metrics } from './metrics.js';
import type { MetricKey } from './metric-names.js';

const NAME_PATTERN =
  /^boldcreate_[a-z]+(_[a-z]+)+_(seconds|bytes|total|ratio|count|state|active|up|depth|rows|events)$/;

describe('metricName', () => {
  it('builds a valid name for every listed key and service', () => {
    for (const key of Object.keys(METRIC_NAMES) as MetricKey[]) {
      expect(metricName('gateway', key)).toMatch(NAME_PATTERN);
    }
    expect(metricName('api', 'httpRequests')).toBe('boldcreate_api_http_requests_total');
  });

  it('rejects unlisted keys and unknown services', () => {
    expect(() => metricName('api', 'made_up' as MetricKey)).toThrow('not listed');
    expect(() => metricName('billing', 'redisUp')).toThrow('unknown service');
  });

  it('classifies status codes', () => {
    expect([200, 302, 404, 503].map(statusClass)).toEqual(['2xx', '3xx', '4xx', '5xx']);
  });
});

describe('createMetrics', () => {
  let metrics: Metrics | undefined;
  afterEach(() => metrics?.stop());

  it('exposes the HTTP and runtime metrics', async () => {
    metrics = createMetrics({ service: 'api', threadpoolProbeIntervalMs: 20 });
    metrics.requestStarted();
    metrics.recordRequest({ method: 'GET', route: '/v1/orgs/:orgId', status: 200, seconds: 0.02 });
    metrics.requestFinished();
    await new Promise((resolve) => setTimeout(resolve, 60));
    const text = await metrics.scrape();
    for (const key of [
      'httpRequestDuration',
      'httpRequests',
      'httpInflight',
      'eventloopLag',
      'heapUsed',
      'heapLimit',
      'gcPause',
      'threadpoolProbe',
    ] as const) {
      expect(text).toContain(`# TYPE ${metricName('api', key)} `);
    }
    expect(text).toContain(
      'boldcreate_api_http_requests_total{method="GET",route="/v1/orgs/:orgId",status_class="2xx"} 1',
    );
    expect(text).not.toMatch(/boldcreate_api_threadpool_probe_seconds_count 0\n/);
  });

  it('raises the event loop gauge after a blocked loop and resets it per scrape', async () => {
    metrics = createMetrics({ service: 'worker' });
    await new Promise((resolve) => setTimeout(resolve, 30));
    const end = Date.now() + 200;
    while (Date.now() < end) {
      // Block the event loop.
    }
    await new Promise((resolve) => setTimeout(resolve, 40));
    const value = (await metrics.scrape()).match(
      /^boldcreate_worker_eventloop_lag_seconds (\S+)$/m,
    );
    expect(Number(value?.[1])).toBeGreaterThan(0.1);
    await new Promise((resolve) => setTimeout(resolve, 30));
    const again = (await metrics.scrape()).match(
      /^boldcreate_worker_eventloop_lag_seconds (\S+)$/m,
    );
    expect(Number(again?.[1])).toBeLessThan(0.1);
  });
});
