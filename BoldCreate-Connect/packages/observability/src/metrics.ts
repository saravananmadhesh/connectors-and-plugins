import { randomBytes } from 'node:crypto';
import { monitorEventLoopDelay, PerformanceObserver } from 'node:perf_hooks';
import { getHeapStatistics } from 'node:v8';
import { Counter, Gauge, Histogram, Registry } from 'prom-client';
import { METRIC_NAMES, SERVICES, type MetricKey, type ServiceName } from './metric-names.js';

const NAME_PATTERN =
  /^boldcreate_[a-z][a-z_]*_(seconds|bytes|total|ratio|count|state|active|up|depth|rows|events)$/;

/** Builds the full metric name for a key of the `METRIC_NAMES` table. */
export function metricName(service: string, key: MetricKey): string {
  if (!(SERVICES as readonly string[]).includes(service)) {
    throw new Error(`unknown service "${service}"`);
  }
  if (!Object.hasOwn(METRIC_NAMES, key)) throw new Error(`metric "${String(key)}" is not listed`);
  const name = `boldcreate_${service}_${METRIC_NAMES[key]}`;
  if (!NAME_PATTERN.test(name) || name.includes('__'))
    throw new Error(`metric name "${name}" is malformed`);
  return name;
}

export type StatusClass = '2xx' | '3xx' | '4xx' | '5xx';

export function statusClass(status: number): StatusClass {
  if (status >= 500) return '5xx';
  if (status >= 400) return '4xx';
  if (status >= 300) return '3xx';
  return '2xx';
}

export interface Metrics {
  readonly service: ServiceName;
  readonly registry: Registry;
  /** Records one finished HTTP request. `route` is the route template, never a concrete URL. */
  recordRequest(input: { method: string; route: string; status: number; seconds: number }): void;
  /** Counts one request a pod refused to take on; `reason` is a small fixed set. */
  recordShed(reason: string): void;
  /** Reports the database admission queue on each scrape; `read` must be cheap and never throw. */
  observeAdmission(read: () => { active: number; waiting: number }): void;
  requestStarted(): void;
  requestFinished(): void;
  /** Prometheus text exposition. */
  scrape(): Promise<string>;
  contentType: string;
  /** Stops the timers and observers started for the runtime metrics. */
  stop(): void;
}

export interface CreateMetricsOptions {
  service: ServiceName;
  /** Milliseconds between thread pool probes (default 5000). */
  threadpoolProbeIntervalMs?: number;
}

const DURATION_BUCKETS = [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10];
const GC_BUCKETS = [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1];

/** A metrics registry for one service: HTTP metrics and Node runtime metrics. */
export function createMetrics(options: CreateMetricsOptions): Metrics {
  const { service } = options;
  const registry = new Registry();
  const name = (key: MetricKey) => metricName(service, key);
  const httpLabels = ['method', 'route', 'status_class'];

  const duration = new Histogram({
    name: name('httpRequestDuration'),
    help: 'HTTP request duration in seconds',
    labelNames: httpLabels,
    buckets: DURATION_BUCKETS,
    registers: [registry],
  });
  const requests = new Counter({
    name: name('httpRequests'),
    help: 'HTTP requests handled',
    labelNames: httpLabels,
    registers: [registry],
  });
  // Route template only: no project, key or organization label, so the series count stays bounded.
  const rateLimited = new Counter({
    name: name('rateLimited'),
    help: 'Requests refused with 429 by route template',
    labelNames: ['route'],
    registers: [registry],
  });
  const shed = new Counter({
    name: name('loadShed'),
    help: 'Requests refused by pod load shedding, by reason',
    labelNames: ['reason'],
    registers: [registry],
  });
  const inflight = new Gauge({
    name: name('httpInflight'),
    help: 'HTTP requests in flight',
    registers: [registry],
  });

  const loopDelay = monitorEventLoopDelay({ resolution: 10 });
  loopDelay.enable();
  new Gauge({
    name: name('eventloopLag'),
    help: 'Event loop delay p99 in seconds since the last scrape',
    registers: [registry],
    collect() {
      // The histogram reports nanoseconds and is reset each scrape.
      this.set(loopDelay.count > 0 ? loopDelay.percentile(99) / 1e9 : 0);
      loopDelay.reset();
    },
  });
  new Gauge({
    name: name('heapUsed'),
    help: 'V8 heap used in bytes',
    registers: [registry],
    collect() {
      this.set(getHeapStatistics().used_heap_size);
    },
  });
  new Gauge({
    name: name('heapLimit'),
    help: 'V8 heap size limit in bytes',
    registers: [registry],
    collect() {
      this.set(getHeapStatistics().heap_size_limit);
    },
  });

  const gc = new Histogram({
    name: name('gcPause'),
    help: 'Garbage collection pause in seconds',
    buckets: GC_BUCKETS,
    registers: [registry],
  });
  const gcObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) gc.observe(entry.duration / 1000);
  });
  gcObserver.observe({ entryTypes: ['gc'] });

  const probe = new Histogram({
    name: name('threadpoolProbe'),
    help: 'Latency of a thread pool task in seconds',
    buckets: DURATION_BUCKETS,
    registers: [registry],
  });
  const probeTimer = setInterval(() => {
    const started = process.hrtime.bigint();
    randomBytes(8, () => {
      probe.observe(Number(process.hrtime.bigint() - started) / 1e9);
    });
  }, options.threadpoolProbeIntervalMs ?? 5000);
  probeTimer.unref();

  return {
    service,
    registry,
    contentType: registry.contentType,
    recordRequest({ method, route, status, seconds }) {
      const labels = { method, route, status_class: statusClass(status) };
      duration.observe(labels, seconds);
      requests.inc(labels);
      if (status === 429) rateLimited.inc({ route });
    },
    recordShed: (reason) => shed.inc({ reason }),
    observeAdmission(read) {
      new Gauge({
        name: name('dbQueueDepth'),
        help: 'Callers waiting for a database slot on this pod',
        registers: [registry],
        collect() {
          this.set(read().waiting);
        },
      });
      new Gauge({
        name: name('dbAdmittedActive'),
        help: 'Callers holding a database slot on this pod',
        registers: [registry],
        collect() {
          this.set(read().active);
        },
      });
    },
    requestStarted: () => inflight.inc(),
    requestFinished: () => inflight.dec(),
    scrape: () => registry.metrics(),
    stop() {
      clearInterval(probeTimer);
      loopDelay.disable();
      gcObserver.disconnect();
    },
  };
}
