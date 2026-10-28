import { describe, it, expect } from 'vitest';
import { AppError, toErrorBody } from './app-error.js';
import { ERROR_MESSAGES } from './errors.js';

describe('AppError', () => {
  it('uses the fixed message of its code', () => {
    const err = new AppError('not_found');
    expect(err.message).toBe(ERROR_MESSAGES.not_found);
    expect(err.code).toBe('not_found');
    expect(err.details).toBeUndefined();
  });

  it('accepts details for validation_failed only', () => {
    const details = [{ field: 'email', message: 'invalid' }];
    expect(new AppError('validation_failed', details).details).toEqual(details);
    expect(() => new AppError('forbidden', details)).toThrow('details are only allowed');
  });

  it('builds a response body without a stack', () => {
    const body = toErrorBody(
      new AppError('validation_failed', [{ field: 'a', message: 'b' }]),
      'req-1',
    );
    expect(body).toEqual({
      error: {
        code: 'validation_failed',
        message: ERROR_MESSAGES.validation_failed,
        requestId: 'req-1',
        details: [{ field: 'a', message: 'b' }],
      },
    });
    expect(JSON.stringify(body)).not.toContain('stack');
    expect(toErrorBody(new AppError('conflict'), 'r').error).not.toHaveProperty('details');
  });
});
