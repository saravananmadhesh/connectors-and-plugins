/**
 * Error and key-event capture. Reports are redacted, grouped by a stable fingerprint, sampled and
 * queued in memory; a sink writes them in batches. Nothing here throws or waits on a request.
 */
import { createHash } from 'node:crypto';
import { SinkPausedError } from './guarded-sink.js';
import { getContext } from './request-context.js';
import { redactSecrets } from './redact.js';

export type OpsEventSeverity = 'info' | 'warning' | 'error';

/** Typed detail of a failure. Values are ids, names and codes; never secrets or payloads. */
export interface ErrorContext {
  area?: string;
  operation?: string;
  step?: string;
  provider?: string;
  errorCode?: string;
  attempt?: number;
  durationMs?: number;
  orgId?: string;
  extra?: Record<string, unknown>;
}

export interface ErrorReport {
  fingerprint: string;
  service: string;
  area: string | null;
  title: string;
  occurredAt: Date;
  environment: string;
  release: string | null;
  instanceId: string | null;
  requestId: string | null;
  traceId: string | null;
  orgId: string | null;
  /** Present for sampled occurrences only; the group count still includes the others. */
  stack: string | null;
  context: Record<string, unknown> | null;
  sampled: boolean;
}

export interface OpsEventReport {
  occurredAt: Date;
  service: string;
  kind: string;
  severity: OpsEventSeverity;
  environment: string;
  release: string | null;
  instanceId: string | null;
  orgId: string | null;
  detail: Record<string, unknown> | null;
}

export interface ErrorBatch {
  errors: ErrorReport[];
  events: OpsEventReport[];
}

/** Where batches go. The database implementation lives with the service that owns a connection. */
export interface ErrorSink {
  write(batch: ErrorBatch): Promise<void>;
}

export type DropReason = 'queue_full' | 'rate_capped' | 'write_failed' | 'sink_paused';

/** What the reporter has done since it started; read by the metrics, never on a request path. */
export interface ReporterStats {
  /** Reports waiting for the next flush. */
  queued: number;
  /** Reports the sink accepted. */
  written: number;
  /** Reports dropped, by reason. */
  dropped: Record<DropReason, number>;
  /** Batches handed to the sink, and how long the last one took. */
  flushes: number;
  lastFlushSeconds: number;
}

export interface ErrorReporterOptions {
  service: string;
  environment: string;
  release?: string;
  instanceId?: string;
  sink: ErrorSink;
  /** Called once per dropped report or failed write, with a reason; keep it cheap. */
  onDrop?: (reason: DropReason, count: number) => void;
  flushIntervalMs?: number;
  maxQueue?: number;
  maxPerMinute?: number;
  /** Stored occurrences per group before sampling starts. */
  sampleFirst?: number;
  /** After the first ones, one in this many is stored. */
  sampleEvery?: number;
  now?: () => Date;
  random?: () => number;
}

export interface ErrorReporter {
  reportError(error: unknown, context?: ErrorContext): void;
  recordOpsEvent(
    kind: string,
    severity: OpsEventSeverity,
    detail?: Record<string, unknown>,
    orgId?: string,
  ): void;
  /** Writes what is queued. Resolves even when the write fails. */
  flush(): Promise<void>;
  /** Counters for metrics. */
  stats(): ReporterStats;
  /** Stops the timer and flushes once; call on graceful shutdown. */
  stop(): Promise<void>;
}

const MAX_STACK_BYTES = 8 * 1024;
const MAX_CONTEXT_BYTES = 4 * 1024;
const MAX_TITLE = 200;

/** Splits one `at fn (file:line:col)` stack line; null for any other line. */
function parseFrame(line: string): { fn: string; file: string } | null {
  const text = line.trim();
  if (!text.startsWith('at ')) return null;
  let rest = text.slice(3);
  let fn = '<anonymous>';
  const open = rest.lastIndexOf(' (');
  if (open !== -1 && rest.endsWith(')')) {
    fn = rest.slice(0, open);
    rest = rest.slice(open + 2, -1);
  }
  const colB = rest.lastIndexOf(':');
  const colA = colB === -1 ? -1 : rest.lastIndexOf(':', colB - 1);
  return colA === -1 ? null : { fn, file: rest.slice(0, colA) };
}

/** The message with ids and numbers replaced, so the same failure keeps one title. */
export function normalizeMessage(message: string): string {
  return message
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '<id>')
    .replace(/\b[0-9a-f]{12,}\b/gi, '<hex>')
    .replace(/\d+/g, '<n>')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TITLE);
}

/** Application frames as `function@file`, without line numbers, library and runtime frames dropped. */
export function applicationFrames(stack: string | undefined, limit = 3): string[] {
  if (!stack) return [];
  const frames: string[] = [];
  for (const line of stack.split('\n')) {
    const frame = parseFrame(line);
    if (!frame) continue;
    const { fn, file } = frame;
    if (file.startsWith('node:') || file.includes('node_modules')) continue;
    frames.push(`${fn}@${file.replace(/\\/g, '/').replace(/^.*\/(apps|packages)\//, '$1/')}`);
    if (frames.length === limit) break;
  }
  return frames;
}

export function fingerprintOf(
  service: string,
  error: unknown,
  context: ErrorContext = {},
): { fingerprint: string; title: string } {
  const err = error instanceof Error ? error : undefined;
  const name = err?.name ?? typeof error;
  const message = normalizeMessage(redactText(err?.message ?? String(error)));
  const frames = applicationFrames(err?.stack);
  const parts = [
    service,
    context.area ?? '',
    // The throw site identifies the failure; the route or job that reached it is only a fallback,
    // otherwise one bug seen through ten routes would be ten issues.
    frames.length > 0 ? '' : (context.operation ?? ''),
    name,
    // Typed failures with a code are the same failure whatever the message says.
    context.errorCode ?? message,
    ...frames,
  ];
  const fingerprint = createHash('sha256').update(parts.join('\n')).digest('hex').slice(0, 32);
  return { fingerprint, title: `${name}: ${message}`.slice(0, MAX_TITLE) };
}

function redactText(value: string): string {
  return String(redactSecrets(value));
}

function truncate(value: string, bytes: number): string {
  return Buffer.byteLength(value) <= bytes ? value : `${value.slice(0, bytes - 16)}...[truncated]`;
}

function causeChain(error: unknown): { name: string; message: string }[] {
  const chain: { name: string; message: string }[] = [];
  let current = error instanceof Error ? error.cause : undefined;
  while (current instanceof Error && chain.length < 3) {
    chain.push({ name: current.name, message: redactText(current.message).slice(0, 300) });
    current = current.cause;
  }
  return chain;
}

function buildContext(error: unknown, context: ErrorContext): Record<string, unknown> | null {
  const { orgId: _orgId, extra, ...typed } = context;
  const cause = causeChain(error);
  const raw = { ...typed, ...(extra ? { extra } : {}), ...(cause.length ? { cause } : {}) };
  if (Object.keys(raw).length === 0) return null;
  const redacted = redactSecrets(raw) as Record<string, unknown>;
  return Buffer.byteLength(JSON.stringify(redacted)) <= MAX_CONTEXT_BYTES
    ? redacted
    : { truncated: true, area: context.area ?? null, operation: context.operation ?? null };
}

export function createErrorReporter(options: ErrorReporterOptions): ErrorReporter {
  const {
    service,
    environment,
    sink,
    flushIntervalMs = 5000,
    maxQueue = 500,
    maxPerMinute = 600,
    sampleFirst = 5,
    sampleEvery = 100,
    now = () => new Date(),
    random = Math.random,
  } = options;
  const release = options.release ?? null;
  const instanceId = options.instanceId ?? null;

  let errors: ErrorReport[] = [];
  let events: OpsEventReport[] = [];
  const seen = new Map<string, number>();
  let windowStart = 0;
  let inWindow = 0;
  let flushing: Promise<void> | undefined;
  const stats: Omit<ReporterStats, 'queued'> = {
    written: 0,
    dropped: { queue_full: 0, rate_capped: 0, write_failed: 0, sink_paused: 0 },
    flushes: 0,
    lastFlushSeconds: 0,
  };
  const drop = (reason: DropReason, count: number): void => {
    stats.dropped[reason] += count;
    options.onDrop?.(reason, count);
  };

  const admit = (): boolean => {
    const at = now().getTime();
    if (at - windowStart >= 60_000) {
      windowStart = at;
      inWindow = 0;
    }
    if (inWindow >= maxPerMinute) {
      drop('rate_capped', 1);
      return false;
    }
    inWindow += 1;
    return true;
  };

  const push = <T>(queue: T[], item: T): void => {
    if (queue.length >= maxQueue) {
      queue.shift();
      drop('queue_full', 1);
    }
    queue.push(item);
  };

  const flush = (): Promise<void> => {
    flushing ??= (async () => {
      const batch: ErrorBatch = { errors, events };
      errors = [];
      events = [];
      if (batch.errors.length === 0 && batch.events.length === 0) return;
      const size = batch.errors.length + batch.events.length;
      const started = performance.now();
      try {
        await sink.write(batch);
        stats.written += size;
        stats.flushes += 1;
        stats.lastFlushSeconds = (performance.now() - started) / 1000;
      } catch (error) {
        drop(error instanceof SinkPausedError ? 'sink_paused' : 'write_failed', size);
      }
    })().finally(() => {
      flushing = undefined;
    });
    return flushing;
  };

  const timer = setInterval(() => void flush(), flushIntervalMs);
  timer.unref();

  return {
    reportError(error, context = {}) {
      try {
        if (!admit()) return;
        const { fingerprint, title } = fingerprintOf(service, error, context);
        const count = (seen.get(fingerprint) ?? 0) + 1;
        if (seen.size > 5000) seen.clear();
        seen.set(fingerprint, count);
        const sampled = count <= sampleFirst || random() * sampleEvery < 1;
        const request = getContext();
        const err = error instanceof Error ? error : undefined;
        push(errors, {
          fingerprint,
          service,
          area: context.area ?? null,
          title,
          occurredAt: now(),
          environment,
          release,
          instanceId,
          requestId: request?.requestId ?? null,
          traceId: null,
          orgId: context.orgId ?? request?.tenantId ?? null,
          stack: sampled && err?.stack ? truncate(redactText(err.stack), MAX_STACK_BYTES) : null,
          context: sampled ? buildContext(error, context) : null,
          sampled,
        });
      } catch {
        // Reporting must never break the caller.
      }
    },
    recordOpsEvent(kind, severity, detail, orgId) {
      try {
        if (!admit()) return;
        push(events, {
          occurredAt: now(),
          service,
          kind,
          severity,
          environment,
          release,
          instanceId,
          orgId: orgId ?? getContext()?.tenantId ?? null,
          detail: detail ? (redactSecrets(detail) as Record<string, unknown>) : null,
        });
      } catch {
        // Reporting must never break the caller.
      }
    },
    flush,
    stats: () => ({
      ...stats,
      dropped: { ...stats.dropped },
      queued: errors.length + events.length,
    }),
    async stop() {
      clearInterval(timer);
      await flush();
    },
  };
}
