import {
  AppError,
  ERROR_HTTP_STATUS,
  RETRY_AFTER_CODES,
  toErrorBody,
  type ApiError,
  type ErrorCode,
} from '@boldcreate-integrations/contracts';

export interface MappedError {
  code: ErrorCode;
  status: number;
  body: ApiError;
  retryAfterSeconds: number | undefined;
  /** False for the errors a client causes; true when the server should log the cause. */
  unexpected: boolean;
}

function frameworkCode(err: unknown): ErrorCode | null {
  const status = (err as { statusCode?: unknown } | null)?.statusCode;
  if (status === 400) return 'validation_failed';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  if (status === 405) return 'method_not_allowed';
  if (status === 413) return 'payload_too_large';
  if (status === 415) return 'unsupported_media_type';
  return null;
}

/**
 * True when the database had no connection to give: the role is at its connection limit (`53300`)
 * or the pool's wait for a free connection ran out. The caller can retry, so it is a 503.
 */
export function isDbSaturated(err: unknown): boolean {
  const e = err as { code?: unknown; message?: unknown } | null;
  if (e?.code === '53300') return true;
  return (
    typeof e?.message === 'string' &&
    (e.message.startsWith('timeout exceeded when trying to connect') ||
      e.message.startsWith('too many connections'))
  );
}

/** True for the errors Fastify raises while reading and parsing the request body. */
export function isParseError(err: unknown): boolean {
  const code = (err as { code?: unknown } | null)?.code;
  return typeof code === 'string' && code.startsWith('FST_ERR_CTP_');
}

/**
 * Maps any thrown value to the response of its registered code. The message is the fixed text of
 * the code; exception text never leaves the process.
 */
export function mapError(
  err: unknown,
  requestId: string,
  retryAfterSeconds: Partial<Record<ErrorCode, number>> = {},
): MappedError {
  const appError = err instanceof AppError ? err : undefined;
  const saturated = !appError && isDbSaturated(err);
  const framework = appError || saturated ? null : frameworkCode(err);
  const code: ErrorCode =
    appError?.code ?? (saturated ? 'service_unavailable' : framework) ?? 'internal_error';
  const body = toErrorBody(
    appError && appError.code === code ? appError : new AppError(code),
    requestId,
  );
  return {
    code,
    status: ERROR_HTTP_STATUS[code],
    body,
    retryAfterSeconds: RETRY_AFTER_CODES.includes(code)
      ? (retryAfterSeconds[code] ?? 1)
      : undefined,
    // A saturated database is logged, because it is the signal to add capacity.
    unexpected: code === 'internal_error' || saturated,
  };
}
