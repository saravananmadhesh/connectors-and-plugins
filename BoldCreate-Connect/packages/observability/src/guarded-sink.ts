import type { ErrorBatch, ErrorSink } from './error-report.js';

/** Thrown instead of a write while the sink is paused after repeated failures. */
export class SinkPausedError extends Error {
  constructor() {
    super('error sink paused after repeated write failures');
    this.name = 'SinkPausedError';
  }
}

export interface GuardedSinkOptions {
  /** Consecutive failed writes that pause the sink. */
  failureThreshold: number;
  /** How long writes are skipped once paused. */
  pauseMs: number;
  /** Called when the sink pauses or resumes, so the change can be logged once. */
  onStateChange?: (state: 'paused' | 'resumed') => void;
  now?: () => number;
}

/**
 * Wraps a sink so that an unhealthy store is left alone. After `failureThreshold` failures in a
 * row it rejects writes at once for `pauseMs` and then lets one batch through: a success resumes
 * normal writing, a failure pauses again. The reporter drops what it could not write, so no
 * request and no connection waits on a store that is down or slow.
 */
export function createGuardedSink(sink: ErrorSink, options: GuardedSinkOptions): ErrorSink {
  const now = options.now ?? Date.now;
  let failures = 0;
  let pausedUntil = 0;
  let paused = false;

  return {
    async write(batch: ErrorBatch): Promise<void> {
      if (now() < pausedUntil) throw new SinkPausedError();
      try {
        await sink.write(batch);
      } catch (error) {
        failures += 1;
        if (failures >= options.failureThreshold) {
          pausedUntil = now() + options.pauseMs;
          if (!paused) {
            paused = true;
            options.onStateChange?.('paused');
          }
        }
        throw error;
      }
      failures = 0;
      if (paused) {
        paused = false;
        options.onStateChange?.('resumed');
      }
    },
  };
}
