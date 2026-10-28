/**
 * Domain errors are `AppError` from the contracts package: a code, a fixed message and, for
 * `validation_failed` only, field details. These helpers build the common ones.
 */
import { AppError, type ErrorCode, type ErrorDetail } from '@boldcreate-integrations/contracts';

export { AppError };

export function appError(code: ErrorCode): AppError {
  return new AppError(code);
}

export function notFound(): AppError {
  return new AppError('not_found');
}

export function forbidden(): AppError {
  return new AppError('forbidden');
}

export function conflict(): AppError {
  return new AppError('conflict');
}

export function validationFailed(details?: ErrorDetail[]): AppError {
  return new AppError('validation_failed', details);
}

export function unauthenticated(): AppError {
  return new AppError('unauthenticated');
}

export function limitExceeded(): AppError {
  return new AppError('limit_exceeded');
}

/** True when the error, or a cause of it, carries this PostgreSQL SQLSTATE. */
function hasSqlState(err: unknown, code: string): boolean {
  let current: unknown = err;
  for (let depth = 0; depth < 4 && current && typeof current === 'object'; depth += 1) {
    if ((current as { code?: unknown }).code === code) return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

/** True when the error (or its cause chain) is a PostgreSQL unique violation (SQLSTATE 23505). */
export const isUniqueViolation = (err: unknown): boolean => hasSqlState(err, '23505');

/** True when the error (or its cause chain) is a foreign key violation (SQLSTATE 23503). */
export const isForeignKeyViolation = (err: unknown): boolean => hasSqlState(err, '23503');
