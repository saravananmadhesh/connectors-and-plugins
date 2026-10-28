import { trace } from '@opentelemetry/api';
import { pino, type DestinationStream, type Logger, type LoggerOptions } from 'pino';
import { getContext } from './request-context.js';
import { redactSecrets } from './redact.js';

export interface CreateLoggerOptions {
  service: string;
  level?: LoggerOptions['level'];
  destination?: DestinationStream;
}

/** Pino logger with redaction, ISO timestamps, the service name and the request context. */
export function createLogger(options: CreateLoggerOptions): Logger {
  const config: LoggerOptions = {
    level: options.level ?? 'info',
    base: { service: options.service },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      log(object) {
        // Errors are serialised by pino afterwards; keep them out of the generic redaction.
        const { err, ...rest } = object as Record<string, unknown>;
        const redacted = redactSecrets(rest) as Record<string, unknown>;
        return err === undefined ? redacted : { ...redacted, err };
      },
    },
    hooks: {
      logMethod(args, method) {
        // Message strings can carry injected line breaks or secret URLs.
        const sanitized = args.map((value) =>
          typeof value === 'string' ? redactSecrets(value) : value,
        );
        method.apply(this, sanitized as Parameters<typeof method>);
      },
    },
    mixin() {
      const context = getContext();
      const traceId = trace.getActiveSpan()?.spanContext().traceId;
      return {
        ...(context?.requestId ? { requestId: context.requestId } : {}),
        ...(context?.tenantId ? { tenantId: context.tenantId } : {}),
        ...(context?.keyId ? { keyId: context.keyId } : {}),
        ...(context?.userId ? { userId: context.userId } : {}),
        ...(traceId ? { traceId } : {}),
      };
    },
  };
  return options.destination ? pino(config, options.destination) : pino(config);
}
