import type { EventEmitter } from 'node:events';
import type { Logger } from 'pino';

export interface ShutdownOptions {
  predrainSeconds: number;
  drainSeconds: number;
  /** Stops accepting connections and waits for in-flight requests. */
  close: () => Promise<void>;
  logger: Logger;
  exit: (code: number) => void;
  sleep: (ms: number) => Promise<void>;
}

export interface Shutdown {
  readonly draining: boolean;
  /** First call starts the shutdown; a second call while draining exits with code 1 at once. */
  handleSignal(signal: string): Promise<void>;
}

export const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms).unref();
  });

/**
 * Graceful shutdown: fail readiness first, wait for the load balancer to notice, then close with
 * a bound on how long in-flight requests may take.
 */
export function createShutdown(options: ShutdownOptions): Shutdown {
  let draining = false;
  return {
    get draining() {
      return draining;
    },
    async handleSignal(signal) {
      if (draining) {
        options.logger.warn({ signal }, 'second signal, exiting now');
        options.exit(1);
        return;
      }
      draining = true;
      options.logger.info({ signal }, 'shutdown started');
      await options.sleep(options.predrainSeconds * 1000);
      let timer: NodeJS.Timeout | undefined;
      const outcome = await Promise.race([
        options.close().then(
          () => 'closed' as const,
          () => 'failed' as const,
        ),
        new Promise<'timeout'>((resolve) => {
          timer = setTimeout(() => resolve('timeout'), options.drainSeconds * 1000);
        }),
      ]);
      clearTimeout(timer);
      if (outcome !== 'closed') {
        options.logger.error({ outcome }, 'shutdown did not complete cleanly');
        options.exit(1);
        return;
      }
      options.logger.info('shutdown complete');
      options.exit(0);
    },
  };
}

/** Subscribes to the termination signals; returns a function that removes the handlers. */
export function listenForSignals(
  source: Pick<EventEmitter, 'on' | 'off'>,
  handler: (signal: string) => void,
): () => void {
  const onTerm = () => handler('SIGTERM');
  const onInt = () => handler('SIGINT');
  source.on('SIGTERM', onTerm);
  source.on('SIGINT', onInt);
  return () => {
    source.off('SIGTERM', onTerm);
    source.off('SIGINT', onInt);
  };
}
