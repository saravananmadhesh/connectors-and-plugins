import { afterEach, describe, expect, it } from 'vitest';
import { trace } from '@opentelemetry/api';
import { createLogger } from './logger.js';
import { initTracing, withSpan, type Tracing } from './tracing.js';

describe('tracing', () => {
  let tracing: Tracing | undefined;
  afterEach(async () => {
    await tracing?.shutdown();
    tracing = undefined;
  });

  it('installs no exporter without an endpoint', () => {
    tracing = initTracing({ service: 'api' });
    expect(tracing.exporting).toBe(false);
  });

  it('exports when an endpoint is configured', async () => {
    tracing = initTracing({ service: 'api', endpoint: 'http://127.0.0.1:1' });
    expect(tracing.exporting).toBe(true);
  });

  it('makes the span context available and puts the trace id in log lines', async () => {
    tracing = initTracing({ service: 'api' });
    const lines: Record<string, unknown>[] = [];
    const logger = createLogger({
      service: 'api',
      destination: { write: (chunk: string) => lines.push(JSON.parse(chunk)) },
    });
    const traceId = await withSpan('work', () => {
      logger.info('inside');
      return trace.getActiveSpan()?.spanContext().traceId;
    });
    expect(traceId).toMatch(/^[a-f0-9]{32}$/);
    expect(lines[0]?.['traceId']).toBe(traceId);
    logger.info('outside');
    expect(lines[1]).not.toHaveProperty('traceId');
  });

  it('rethrows errors from the span body', async () => {
    tracing = initTracing({ service: 'api' });
    await expect(
      withSpan('fails', () => {
        throw new Error('nope');
      }),
    ).rejects.toThrow('nope');
  });
});
