import { Counter, Gauge } from 'prom-client';
import type { ErrorReporter, ReporterStats } from './error-report.js';
import { metricName, type Metrics } from './metrics.js';

/**
 * Exposes how the error reporter is doing on the service's metrics endpoint: queue depth, what
 * was written, what was dropped and why, and how long the last write took. Values are read when
 * the endpoint is scraped, so the reporter pays nothing per report.
 */
export function registerCaptureMetrics(
  metrics: Pick<Metrics, 'registry' | 'service'>,
  reporter: Pick<ErrorReporter, 'stats'>,
): void {
  const { registry, service } = metrics;
  const read = (): ReporterStats => reporter.stats();

  new Gauge({
    name: metricName(service, 'errorCaptureQueued'),
    help: 'Reports waiting for the next write to the error store',
    registers: [registry],
    collect() {
      this.set(read().queued);
    },
  });
  new Gauge({
    name: metricName(service, 'errorCaptureFlushDuration'),
    help: 'Seconds the last write to the error store took',
    registers: [registry],
    collect() {
      this.set(read().lastFlushSeconds);
    },
  });
  // The reporter keeps running totals; each scrape adds what is new to the counters.
  let seenWritten = 0;
  new Counter({
    name: metricName(service, 'errorCaptureWritten'),
    help: 'Reports written to the error store',
    registers: [registry],
    collect() {
      const total = read().written;
      this.inc(total - seenWritten);
      seenWritten = total;
    },
  });
  const seenDropped = new Map<string, number>();
  new Counter({
    name: metricName(service, 'errorCaptureDropped'),
    help: 'Reports dropped before they were stored, by reason',
    labelNames: ['reason'],
    registers: [registry],
    collect() {
      for (const [reason, total] of Object.entries(read().dropped)) {
        this.inc({ reason }, total - (seenDropped.get(reason) ?? 0));
        seenDropped.set(reason, total);
      }
    },
  });
}
