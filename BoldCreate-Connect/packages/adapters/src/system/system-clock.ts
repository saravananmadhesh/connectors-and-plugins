import type { ClockPort } from '@boldcreate-integrations/ports';

/** The real clock. */
export const systemClock: ClockPort = {
  now: () => new Date(),
  nowMs: () => Date.now(),
  sleep(ms, signal) {
    return new Promise<void>((resolve, reject) => {
      if (signal?.aborted) return reject(new Error('aborted'));
      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      }, ms);
      const onAbort = () => {
        clearTimeout(timer);
        reject(new Error('aborted'));
      };
      signal?.addEventListener('abort', onAbort, { once: true });
    });
  },
};
