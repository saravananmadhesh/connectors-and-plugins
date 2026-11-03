/**
 * Every metric name, in one table. The full name is `boldcreate_<service>_<name>`; owners of
 * later work add a constant here and never spell a variant. Units end in one of
 * `_seconds _bytes _total _ratio _count _state _active _up _depth _rows _events`.
 */
export const SERVICES = ['web', 'admin', 'api', 'gateway', 'worker'] as const;
export type ServiceName = (typeof SERVICES)[number];

export const METRIC_NAMES = {
  httpRequestDuration: 'http_request_duration_seconds',
  httpRequests: 'http_requests_total',
  httpInflight: 'http_inflight_count',
  rateLimited: 'rate_limited_total',
  loadShed: 'load_shed_total',
  dbQueueDepth: 'db_queue_depth',
  dbAdmittedActive: 'db_admitted_active',
  eventloopLag: 'eventloop_lag_seconds',
  heapUsed: 'heap_used_bytes',
  heapLimit: 'heap_limit_bytes',
  gcPause: 'gc_pause_seconds',
  threadpoolProbe: 'threadpool_probe_seconds',
  // Reserved: built by later work.
  revisionStale: 'revision_stale_seconds',
  redisUp: 'redis_up',
  rateLimitFallbackActive: 'rate_limit_fallback_active',
  upstreamBreakerState: 'upstream_breaker_state',
  usageBufferRows: 'usage_buffer_rows',
  outboxPendingEvents: 'outbox_pending_events',
  queueDepth: 'queue_depth',
  dbPoolWaiting: 'db_pool_waiting_count',
  errorCaptureQueued: 'error_capture_queue_depth',
  errorCaptureWritten: 'error_capture_written_total',
  errorCaptureDropped: 'error_capture_dropped_total',
  errorCaptureFlushDuration: 'error_capture_flush_seconds',
} as const;

export type MetricKey = keyof typeof METRIC_NAMES;
