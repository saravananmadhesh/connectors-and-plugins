import { ERROR_MESSAGES, type ApiError, type ErrorCode } from './errors.js';

export interface ErrorDetail {
  field: string;
  message: string;
}

/**
 * The one error type that crosses layers. The message is always the fixed text of the code;
 * field-level information travels in `details` and only for `validation_failed`.
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly details: ErrorDetail[] | undefined;

  constructor(code: ErrorCode, details?: ErrorDetail[]) {
    if (details !== undefined && code !== 'validation_failed') {
      throw new Error('details are only allowed with validation_failed');
    }
    super(ERROR_MESSAGES[code]);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

/** The response body for an error. Never contains a stack or exception text. */
export function toErrorBody(err: AppError, requestId: string): ApiError {
  return {
    error: {
      code: err.code,
      message: err.message,
      requestId,
      ...(err.details ? { details: err.details } : {}),
    },
  };
}
