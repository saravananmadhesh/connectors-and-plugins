import { describe, expect, it } from 'vitest';
import { createLogger } from './logger.js';
import { runWithContext, setTenant } from './request-context.js';

const ORG_ID = '3f0c1d52-6f0e-4a57-9b0a-2f1f6a2d9c11';

function capture() {
  const lines: Record<string, unknown>[] = [];
  const destination = {
    write(chunk: string) {
      lines.push(JSON.parse(chunk) as Record<string, unknown>);
    },
  };
  return { lines, logger: createLogger({ service: 'api', level: 'debug', destination }) };
}

describe('tenant in log lines', () => {
  it('carries the org uuid once the tenant is set, also across awaits', async () => {
    const { lines, logger } = capture();
    await runWithContext({ requestId: 'r1' }, async () => {
      logger.info('before');
      setTenant(ORG_ID);
      await new Promise((resolve) => setTimeout(resolve, 1));
      logger.info('after');
    });
    expect(lines[0]).not.toHaveProperty('tenantId');
    expect(lines[1]).toMatchObject({ tenantId: ORG_ID, requestId: 'r1' });
  });

  it('has no tenant outside a request context', () => {
    const { lines, logger } = capture();
    setTenant(ORG_ID);
    logger.info('outside');
    expect(lines[0]).not.toHaveProperty('tenantId');
  });

  it('does not leak the tenant into a concurrent request', async () => {
    const { lines, logger } = capture();
    await Promise.all([
      runWithContext({ requestId: 'a' }, async () => {
        setTenant(ORG_ID);
        await new Promise((resolve) => setTimeout(resolve, 5));
        logger.info('a');
      }),
      runWithContext({ requestId: 'b' }, async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        logger.info('b');
      }),
    ]);
    const byRequest = Object.fromEntries(lines.map((line) => [line['requestId'], line]));
    expect(byRequest['a']).toMatchObject({ tenantId: ORG_ID });
    expect(byRequest['b']).not.toHaveProperty('tenantId');
  });
});
