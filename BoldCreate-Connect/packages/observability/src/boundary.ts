import type { ErrorContext, ErrorReporter } from './error-report.js';

export interface BoundaryOptions {
  /** The part of the system the port stands for, such as `kms`, `blob` or `email`. */
  area: string;
  errors: Pick<ErrorReporter, 'reportError'>;
  /** Methods to watch. Every method is watched when omitted. */
  methods?: readonly string[];
  /** Return false for a failure that is an expected answer rather than a fault. */
  shouldReport?: (error: unknown, method: string) => boolean;
  /** Extra context for one failure, such as which step of a multi-step call failed. */
  describe?: (error: unknown, method: string) => Partial<ErrorContext>;
}

function codeOf(error: unknown): string | undefined {
  const code = (error as { code?: unknown } | null)?.code;
  if (typeof code === 'string' || typeof code === 'number') return String(code);
  return error instanceof Error && error.name !== 'Error' ? error.name : undefined;
}

function makeReporter(options: BoundaryOptions) {
  return (error: unknown, method: string): void => {
    try {
      if (options.shouldReport && !options.shouldReport(error, method)) return;
      const errorCode = codeOf(error);
      options.errors.reportError(error, {
        area: options.area,
        operation: `${options.area}.${method}`,
        ...(errorCode ? { errorCode } : {}),
        ...options.describe?.(error, method),
      });
    } catch {
      // Reporting must never change what the caller sees.
    }
  };
}

/** Runs `call` and reports a failure, sync or async, then throws it again unchanged. */
function guarded(call: () => unknown, report: (error: unknown) => void): unknown {
  let result: unknown;
  try {
    result = call();
  } catch (error) {
    report(error);
    throw error;
  }
  if (result instanceof Promise) {
    return result.catch((error: unknown) => {
      report(error);
      throw error;
    });
  }
  return result;
}

/**
 * Wraps a port so that every failure of a watched method is reported with the area and method
 * name, then thrown again unchanged. Callers keep their own error handling; the failure is just
 * no longer invisible when it is handled and turned into a retry or a fallback.
 */
export function instrumentBoundary<T extends object>(port: T, options: BoundaryOptions): T {
  const watched = options.methods ? new Set(options.methods) : undefined;
  const report = makeReporter(options);

  return new Proxy(port, {
    get(target, property, receiver) {
      const value: unknown = Reflect.get(target, property, receiver);
      if (typeof value !== 'function' || typeof property !== 'string') return value;
      if (watched && !watched.has(property)) return value;
      return (...args: unknown[]): unknown =>
        guarded(
          () => Reflect.apply(value, target, args),
          (error) => report(error, property),
        );
    },
  });
}

/** The same for a single function, such as an outbound fetcher; `method` names it in reports. */
export function instrumentCall<F extends (...args: never[]) => unknown>(
  fn: F,
  method: string,
  options: BoundaryOptions,
): F {
  const report = makeReporter(options);
  return ((...args: Parameters<F>): unknown =>
    guarded(
      () => fn(...args),
      (error) => report(error, method),
    )) as F;
}
