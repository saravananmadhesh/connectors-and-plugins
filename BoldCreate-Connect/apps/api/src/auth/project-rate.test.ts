import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FastifyRequest } from 'fastify';
import { AppError } from '@boldcreate-integrations/contracts';
import type { LimitStore } from '@boldcreate-integrations/domain';
import type { CacheKey, LimiterPort } from '@boldcreate-integrations/ports';
import { countProjectCall } from './project.js';

const NOW = new Date('2030-01-01T00:00:00Z').getTime();

function requestWith(limiter: LimiterPort, limit = 100) {
  const limits: LimitStore = {
    resolve: async () => ({ limit, windowSeconds: 60, source: 'default' }),
    invalidate: () => undefined,
  };
  return {
    server: { apiGate: { limiter, requestsPerMinute: 3000, limits } },
  } as unknown as FastifyRequest;
}

const limiterReturning = (result: {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}): LimiterPort => ({
  check: async (_key: CacheKey) => result,
  reset: async () => undefined,
});

describe('countProjectCall', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('records the limit, what is left and the whole seconds until the window ends', async () => {
    const request = requestWith(
      limiterReturning({ allowed: true, remaining: 41, resetAt: new Date(NOW + 17_200) }),
    );
    await countProjectCall(request, 'fixture-project');
    expect(request.projectRate).toEqual({
      limit: 100,
      remaining: 41,
      windowSeconds: 60,
      resetSeconds: 18,
    });
    expect(request.retryAfter).toBeUndefined();
  });

  it('never reports a reset of less than one second', async () => {
    const request = requestWith(
      limiterReturning({ allowed: true, remaining: 1, resetAt: new Date(NOW - 5_000) }),
    );
    await countProjectCall(request, 'fixture-project');
    expect(request.projectRate?.resetSeconds).toBe(1);
  });

  it('refuses a call over the limit and gives the same delay in retry-after and reset', async () => {
    const request = requestWith(
      limiterReturning({ allowed: false, remaining: -3, resetAt: new Date(NOW + 9_500) }),
    );
    await expect(countProjectCall(request, 'fixture-project')).rejects.toMatchObject({
      code: 'rate_limited',
    });
    expect(request.projectRate).toMatchObject({ remaining: 0, resetSeconds: 10 });
    expect(request.retryAfter).toBe(10);
  });

  it('refuses the call when the limiter is unreachable', async () => {
    const down: LimiterPort = {
      check: async () => {
        throw new Error('redis_unavailable');
      },
      reset: async () => undefined,
    };
    const request = requestWith(down);
    await expect(countProjectCall(request, 'fixture-project')).rejects.toBeInstanceOf(AppError);
    await expect(countProjectCall(request, 'fixture-project')).rejects.toMatchObject({
      code: 'service_unavailable',
    });
    expect(request.projectRate).toBeUndefined();
  });
});
