import { Registry } from 'prom-client';
import { describe, expect, it } from 'vitest';
import { registerCaptureMetrics } from './capture-metrics.js';
import type { ReporterStats } from './error-report.js';

describe('capture metrics', () => {
  it('shows the reporter state and counts only what is new at each scrape', async () => {
    const registry = new Registry();
    const stats: ReporterStats = {
      queued: 3,
      written: 10,
      dropped: { queue_full: 1, rate_capped: 0, write_failed: 2, sink_paused: 0 },
      flushes: 2,
      lastFlushSeconds: 0.25,
    };
    registerCaptureMetrics({ registry, service: 'api' }, { stats: () => stats });

    const first = await registry.metrics();
    expect(first).toContain('boldcreate_api_error_capture_queue_depth 3');
    expect(first).toContain('boldcreate_api_error_capture_flush_seconds 0.25');
    expect(first).toContain('boldcreate_api_error_capture_written_total 10');
    expect(first).toContain('boldcreate_api_error_capture_dropped_total{reason="write_failed"} 2');

    stats.written = 15;
    stats.dropped.write_failed = 2;
    stats.dropped.sink_paused = 4;
    const second = await registry.metrics();
    expect(second).toContain('boldcreate_api_error_capture_written_total 15');
    expect(second).toContain('boldcreate_api_error_capture_dropped_total{reason="write_failed"} 2');
    expect(second).toContain('boldcreate_api_error_capture_dropped_total{reason="sink_paused"} 4');
  });
});
