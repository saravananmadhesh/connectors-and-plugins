import { describe, expect, it } from 'vitest';
import { createLogger } from './logger.js';
import { runWithContext, setKeyId, setTenant, setUserId, getContext } from './request-context.js';

function capture() {
  const lines: Record<string, unknown>[] = [];
  const destination = {
    write(chunk: string) {
      lines.push(JSON.parse(chunk) as Record<string, unknown>);
    },
  };
  return { lines, logger: createLogger({ service: 'api', level: 'debug', destination }) };
}

describe('logger', () => {
  it('adds service, ISO time and the request context inside runWithContext', () => {
    const { lines, logger } = capture();
    runWithContext({ requestId: 'req-1' }, () => {
      setTenant('org-uuid');
      setKeyId('abcd1234abcd1234');
      setUserId('user-uuid');
      logger.info('hello');
    });
    expect(lines[0]).toMatchObject({
      service: 'api',
      requestId: 'req-1',
      tenantId: 'org-uuid',
      keyId: 'abcd1234abcd1234',
      userId: 'user-uuid',
      msg: 'hello',
    });
    expect(String(lines[0]?.['time'])).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('omits the context outside a request', () => {
    const { lines, logger } = capture();
    setTenant('ignored');
    logger.info('plain');
    expect(lines[0]).not.toHaveProperty('requestId');
    expect(lines[0]).not.toHaveProperty('tenantId');
    expect(getContext()).toBeUndefined();
  });

  it('keeps contexts of concurrent requests apart', async () => {
    const { lines, logger } = capture();
    await Promise.all(
      ['a', 'b'].map((id) =>
        runWithContext({ requestId: id }, async () => {
          await new Promise((resolve) => setTimeout(resolve, id === 'a' ? 10 : 1));
          logger.info(id);
        }),
      ),
    );
    expect(lines.map((line) => [line['msg'], line['requestId']])).toEqual([
      ['b', 'b'],
      ['a', 'a'],
    ]);
  });

  it('redacts secrets, secret URLs and control characters', () => {
    const { lines, logger } = capture();
    logger.info(
      { password: 'p', url: 'https://x/cb?code=abc', note: 'a\r\nb' },
      'visit https://x/?token=zzz\nforged',
    );
    expect(lines[0]).toMatchObject({
      password: '[REDACTED]',
      url: 'https://x/cb?code=[redacted]',
      note: 'a\\r\\nb',
      msg: 'visit https://x/?token=[redacted]\\nforged',
    });
  });

  it('serialises errors', () => {
    const { lines, logger } = capture();
    logger.error({ err: new Error('boom') }, 'failed');
    expect(lines[0]?.['err']).toMatchObject({ message: 'boom' });
  });
});
