import type { EventEmitter } from 'node:events';
import type { Logger } from 'pino';

export interface ProcessGuardOptions {
  exit?: (code: number) => void;
  target?: Pick<EventEmitter, 'on' | 'off'>;
}

/**
 * Logs an uncaught exception or unhandled rejection at `fatal` and exits with code 1, so the
 * orchestrator restarts a process whose state can no longer be trusted. Returns an uninstall
 * function.
 */
export function installProcessGuards(
  logger: Logger,
  options: ProcessGuardOptions = {},
): () => void {
  const exit = options.exit ?? ((code: number) => process.exit(code));
  const target = options.target ?? process;
  const fail = (message: string) => (err: unknown) => {
    logger.fatal({ err }, message);
    logger.flush();
    exit(1);
  };
  const onException = fail('uncaught exception');
  const onRejection = fail('unhandled rejection');
  target.on('uncaughtException', onException);
  target.on('unhandledRejection', onRejection);
  return () => {
    target.off('uncaughtException', onException);
    target.off('unhandledRejection', onRejection);
  };
}
