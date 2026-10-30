import { describe, expect, it } from 'vitest';
import { accessLogLevel } from './access-log.js';

describe('access log level', () => {
  it.each([
    [500, false, 'error'],
    [503, true, 'error'],
    [499, false, 'warn'],
    [404, false, 'info'],
    [200, false, 'info'],
    [200, true, 'debug'],
    [304, true, 'debug'],
  ] as const)('status %i with edgeExempt=%s logs at %s', (status, edgeExempt, level) => {
    expect(accessLogLevel(status, edgeExempt)).toBe(level);
  });
});
