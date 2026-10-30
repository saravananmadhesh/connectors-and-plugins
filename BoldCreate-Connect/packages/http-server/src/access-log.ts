/** Status the access line records for a request the client left before the answer was sent. */
export const ABORTED_STATUS = 499;

/**
 * The level of a request's access line. Successful requests only matter when debugging; a failed
 * or aborted one must survive the production log level, because that line is what a stored error
 * is matched against.
 */
export function accessLogLevel(
  status: number,
  edgeExempt: boolean,
): 'error' | 'warn' | 'info' | 'debug' {
  if (status >= 500) return 'error';
  if (status === ABORTED_STATUS) return 'warn';
  return edgeExempt ? 'debug' : 'info';
}
