import { describe, it, expect } from 'vitest';
import { ERROR_MESSAGES } from '@boldcreate-integrations/contracts';
import {
  AppError,
  appError,
  conflict,
  forbidden,
  isUniqueViolation,
  limitExceeded,
  notFound,
  unauthenticated,
  validationFailed,
} from './errors.js';

describe('domain errors', () => {
  it('are AppError instances with the fixed message of their code', () => {
    const cases = [
      [notFound(), 'not_found'],
      [forbidden(), 'forbidden'],
      [conflict(), 'conflict'],
      [validationFailed(), 'validation_failed'],
      [unauthenticated(), 'unauthenticated'],
      [limitExceeded(), 'limit_exceeded'],
      [appError('last_owner_required'), 'last_owner_required'],
    ] as const;
    for (const [err, code] of cases) {
      expect(err).toBeInstanceOf(AppError);
      expect(err).toBeInstanceOf(Error);
      expect(err.code).toBe(code);
      expect(err.message).toBe(ERROR_MESSAGES[code]);
    }
  });

  it('carries field details for validation_failed', () => {
    const details = [
      { field: 'name', message: 'Required' },
      { field: 'slug', message: 'Too long' },
    ];
    expect(validationFailed(details).details).toEqual(details);
    expect(validationFailed().details).toBeUndefined();
  });
});

describe('isUniqueViolation', () => {
  it('recognises SQLSTATE 23505 directly and through a cause chain', () => {
    expect(isUniqueViolation({ code: '23505' })).toBe(true);
    expect(isUniqueViolation(new Error('wrapped', { cause: { code: '23505' } }))).toBe(true);
  });

  it('rejects other errors and non-objects', () => {
    expect(isUniqueViolation({ code: '23503' })).toBe(false);
    expect(isUniqueViolation(new Error('plain'))).toBe(false);
    expect(isUniqueViolation('23505')).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
  });
});
