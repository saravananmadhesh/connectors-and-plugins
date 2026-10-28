/**
 * Protects upstream servers from this pod and this pod from them: a cap on calls in flight per
 * server, and a breaker that stops calling a server after repeated transport failures until a
 * pause has passed. State is process-local; each pod protects itself.
 */
export interface GuardOptions {
  maxConcurrency: number;
  failuresToOpen: number;
  openMs: number;
  now?: () => number;
}

export type GuardRefusal = 'busy' | 'open';

export interface ServerGuard {
  /** Returns a release function, or the reason the call is refused. */
  acquire(key: string): { release: (outcome: 'ok' | 'failure' | 'ignore') => void } | GuardRefusal;
}

interface State {
  inFlight: number;
  failures: number;
  openUntil: number;
}

export function createServerGuard(options: GuardOptions): ServerGuard {
  const now = options.now ?? Date.now;
  const states = new Map<string, State>();
  return {
    acquire(key) {
      const state = states.get(key) ?? { inFlight: 0, failures: 0, openUntil: 0 };
      states.set(key, state);
      if (state.openUntil > now()) return 'open';
      if (state.inFlight >= options.maxConcurrency) return 'busy';
      state.inFlight += 1;
      let released = false;
      return {
        release(outcome) {
          if (released) return;
          released = true;
          state.inFlight -= 1;
          if (outcome === 'ok') {
            state.failures = 0;
          } else if (outcome === 'failure') {
            state.failures += 1;
            if (state.failures >= options.failuresToOpen) {
              // One probe after the pause: a single further failure opens it again.
              state.openUntil = now() + options.openMs;
              state.failures = options.failuresToOpen - 1;
            }
          }
          if (state.inFlight === 0 && state.failures === 0 && state.openUntil <= now()) {
            states.delete(key);
          }
        },
      };
    },
  };
}
