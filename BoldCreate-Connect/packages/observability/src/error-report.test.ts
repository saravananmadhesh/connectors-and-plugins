import { describe, expect, it, vi } from 'vitest';
import {
  applicationFrames,
  createErrorReporter,
  fingerprintOf,
  normalizeMessage,
  type ErrorBatch,
  type ErrorSink,
} from './error-report.js';
import { runWithContext } from './request-context.js';

function memorySink() {
  const batches: ErrorBatch[] = [];
  const sink: ErrorSink = {
    async write(batch) {
      batches.push(batch);
    },
  };
  return { sink, batches };
}

const reporter = (sink: ErrorSink, extra: Record<string, unknown> = {}) =>
  createErrorReporter({
    service: 'api',
    environment: 'test',
    release: '1.0.0',
    sink,
    flushIntervalMs: 60_000,
    ...extra,
  });

describe('fingerprint', () => {
  it('ignores ids and numbers in the message', () => {
    const a = fingerprintOf('api', new Error('org 123 not found'));
    const b = fingerprintOf('api', new Error('org 987 not found'));
    expect(a.fingerprint).toBe(b.fingerprint);
    expect(a.title).toBe('Error: org <n> not found');
  });

  it('separates services, classes and areas', () => {
    const base = fingerprintOf('api', new Error('x')).fingerprint;
    expect(fingerprintOf('worker', new Error('x')).fingerprint).not.toBe(base);
    expect(fingerprintOf('api', new TypeError('x')).fingerprint).not.toBe(base);
    expect(fingerprintOf('api', new Error('x'), { area: 'kms' }).fingerprint).not.toBe(base);
  });

  it('uses the error code instead of the message when there is one', () => {
    const a = fingerprintOf('api', new Error('one'), { errorCode: 'PERMISSION_DENIED' });
    const b = fingerprintOf('api', new Error('two'), { errorCode: 'PERMISSION_DENIED' });
    expect(a.fingerprint).toBe(b.fingerprint);
  });

  it('groups one throw site reached through different operations', () => {
    const thrown = (): Error => {
      const error = new Error('db down');
      error.stack = 'Error: db down\n    at query (/srv/packages/db/src/client.ts:10:3)';
      return error;
    };
    const a = fingerprintOf('api', thrown(), { area: 'http', operation: 'GET /v1/a' });
    const b = fingerprintOf('api', thrown(), { area: 'http', operation: 'POST /v1/b' });
    expect(a.fingerprint).toBe(b.fingerprint);
  });

  it('falls back to the operation when the stack has no application frames', () => {
    const bare = (): Error => {
      const error = new Error('x');
      error.stack = 'Error: x';
      return error;
    };
    const a = fingerprintOf('api', bare(), { operation: 'GET /a' });
    const b = fingerprintOf('api', bare(), { operation: 'GET /b' });
    expect(a.fingerprint).not.toBe(b.fingerprint);
  });

  it('keeps application frames only and drops line numbers', () => {
    const stack = [
      'Error: boom',
      '    at resolve (D:\\repo\\packages\\domain\\src\\scopes.ts:88:5)',
      '    at lib (D:\\repo\\node_modules\\x\\index.js:1:1)',
      '    at node:internal/process:1:1',
      '    at authorize (/srv/apps/gateway/src/authorize.ts:42:9)',
    ].join('\n');
    expect(applicationFrames(stack)).toEqual([
      'resolve@packages/domain/src/scopes.ts',
      'authorize@apps/gateway/src/authorize.ts',
    ]);
  });

  it('normalizes uuids and long hex', () => {
    expect(normalizeMessage('id 3f2b8c1e-0000-4000-8000-000000000000 hash deadbeefdeadbeef')).toBe(
      'id <id> hash <hex>',
    );
  });
});

describe('error reporter', () => {
  it('queues, redacts and flushes in one batch', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    r.reportError(new Error('failed for https://x.test/cb?code=abc123&ok=1'), {
      area: 'oauth',
      extra: { token: 'secret-value', provider: 'github' },
    });
    await r.flush();
    expect(batches).toHaveLength(1);
    const [report] = batches[0]!.errors;
    expect(report?.title).not.toContain('abc123');
    expect(JSON.stringify(report)).not.toContain('secret-value');
    expect(report?.area).toBe('oauth');
    expect(report?.release).toBe('1.0.0');
    await r.stop();
  });

  it('takes the request and organization from the request context', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    runWithContext({ requestId: 'req-1', tenantId: 'org-1' }, () => r.reportError(new Error('x')));
    await r.flush();
    expect(batches[0]!.errors[0]).toMatchObject({ requestId: 'req-1', orgId: 'org-1' });
    await r.stop();
  });

  it('keeps a redacted cause chain', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    r.reportError(new Error('outer', { cause: new Error('inner ?token=zzz') }));
    await r.flush();
    const cause = (batches[0]!.errors[0]!.context as { cause: { message: string }[] }).cause;
    expect(cause[0]?.message).toBe('inner ?token=[redacted]');
    await r.stop();
  });

  it('stores the first occurrences, then samples', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink, { sampleFirst: 2, sampleEvery: 100, random: () => 0.99 });
    for (let i = 0; i < 6; i += 1) r.reportError(new Error('same'));
    await r.flush();
    const sampled = batches[0]!.errors.map((e) => e.sampled);
    expect(sampled).toEqual([true, true, false, false, false, false]);
    expect(batches[0]!.errors[3]!.stack).toBeNull();
    await r.stop();
  });

  it('truncates a large stack and drops an oversized context', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    const error = new Error('big');
    error.stack = `Error: big\n${'x'.repeat(20_000)}`;
    r.reportError(error, { extra: { blob: 'y'.repeat(10_000) } });
    await r.flush();
    const report = batches[0]!.errors[0]!;
    expect(Buffer.byteLength(report.stack ?? '')).toBeLessThanOrEqual(8 * 1024);
    expect(report.context).toMatchObject({ truncated: true });
    await r.stop();
  });

  it('drops the oldest when the queue is full', async () => {
    const { sink, batches } = memorySink();
    const onDrop = vi.fn<(reason: string, count: number) => void>();
    const r = reporter(sink, { maxQueue: 2, onDrop });
    r.reportError(new Error('a'));
    r.reportError(new TypeError('b'));
    r.reportError(new RangeError('c'));
    await r.flush();
    expect(batches[0]!.errors.map((e) => e.title.split(':')[0])).toEqual([
      'TypeError',
      'RangeError',
    ]);
    expect(onDrop).toHaveBeenCalledWith('queue_full', 1);
    await r.stop();
  });

  it('caps reports per minute and counts the drops', async () => {
    const { sink, batches } = memorySink();
    const onDrop = vi.fn<(reason: string, count: number) => void>();
    const r = reporter(sink, { maxPerMinute: 2, onDrop });
    for (let i = 0; i < 5; i += 1) r.reportError(new Error('x'));
    await r.flush();
    expect(batches[0]!.errors).toHaveLength(2);
    expect(onDrop).toHaveBeenCalledTimes(3);
    await r.stop();
  });

  it('never throws when the sink fails', async () => {
    const onDrop = vi.fn<(reason: string, count: number) => void>();
    const r = reporter(
      {
        async write() {
          throw new Error('db down');
        },
      },
      { onDrop },
    );
    r.reportError(new Error('x'));
    await expect(r.flush()).resolves.toBeUndefined();
    expect(onDrop).toHaveBeenCalledWith('write_failed', 1);
    await r.stop();
  });

  it('keeps an error storm to a fixed number of stored reports and writes', async () => {
    const { sink } = memorySink();
    const write = vi.spyOn(sink, 'write');
    const r = reporter(sink, { maxPerMinute: 50, maxQueue: 20 });
    for (let i = 0; i < 10_000; i += 1) r.reportError(new Error(`failure ${i % 7}`));
    const { queued, dropped } = r.stats();
    expect(queued).toBeLessThanOrEqual(20);
    expect(dropped.rate_capped + dropped.queue_full).toBeGreaterThanOrEqual(9_950);
    await r.flush();
    expect(write.mock.calls.length).toBeLessThanOrEqual(1);
    await r.stop();
  });

  it('counts what was queued, written and dropped', async () => {
    const { sink } = memorySink();
    const r = reporter(sink, { maxPerMinute: 3 });
    for (let i = 0; i < 5; i += 1) r.reportError(new Error('x'));
    expect(r.stats()).toMatchObject({ queued: 3, written: 0, dropped: { rate_capped: 2 } });
    await r.flush();
    expect(r.stats()).toMatchObject({ queued: 0, written: 3, flushes: 1 });
    await r.stop();

    const failing = reporter({
      async write() {
        throw new Error('db down');
      },
    });
    failing.reportError(new Error('y'));
    await failing.flush();
    expect(failing.stats()).toMatchObject({ written: 0, dropped: { write_failed: 1 } });
    await failing.stop();
  });

  it('survives values that cannot be inspected', async () => {
    const { sink } = memorySink();
    const r = reporter(sink);
    expect(() => r.reportError(undefined)).not.toThrow();
    expect(() => r.reportError({ toString: () => 'obj' })).not.toThrow();
    await r.stop();
  });

  it('records key events with redacted detail', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    r.recordOpsEvent('startup_check_failed', 'error', { check: 'grants', password: 'p' });
    await r.flush();
    expect(batches[0]!.events[0]).toMatchObject({
      kind: 'startup_check_failed',
      severity: 'error',
      detail: { check: 'grants', password: '[REDACTED]' },
    });
    await r.stop();
  });

  it('does not write an empty batch and flushes once on stop', async () => {
    const { sink, batches } = memorySink();
    const r = reporter(sink);
    await r.flush();
    r.recordOpsEvent('deploy', 'info');
    await r.stop();
    expect(batches).toHaveLength(1);
  });
});
