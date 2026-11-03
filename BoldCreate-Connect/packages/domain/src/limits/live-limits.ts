import type { LimitKey } from '@boldcreate-integrations/limits';
import type { LimitStore } from './limit-store.js';

/** One value of the running pod that an administrator can change. */
export interface LiveLimit {
  key: LimitKey;
  /** The value this pod started with (from its environment); used until an administrator sets one. */
  configured: number;
  /** Applies a value to the running pod. */
  apply: (value: number) => void;
}

export interface LiveLimitsOptions {
  limits: LimitStore;
  targets: readonly LiveLimit[];
  intervalMs?: number;
}

const DEFAULT_INTERVAL_MS = 5_000;

/**
 * Keeps the running pod in step with the limits an administrator sets. A value nobody has set
 * leaves the pod's own configuration alone; removing an override returns to it. The limit store
 * caches its snapshot, so polling costs no query between refreshes, and a failed refresh keeps the
 * last values. Returns a function that stops the polling.
 */
export function startLiveLimits(options: LiveLimitsOptions): () => void {
  const applied = new Map<LimitKey, number>();
  const tick = async (target: LiveLimit): Promise<void> => {
    let value = target.configured;
    try {
      const resolved = await options.limits.resolve(target.key, {});
      if (resolved.source !== 'default') value = resolved.limit;
    } catch {
      // Keep what is running: a failed read must not move a limit.
      return;
    }
    if (applied.get(target.key) === value) return;
    applied.set(target.key, value);
    try {
      target.apply(value);
    } catch {
      // A value the pod refuses is retried on the next tick with the same outcome; never throw.
      applied.delete(target.key);
    }
  };
  const run = (): void => {
    for (const target of options.targets) void tick(target);
  };
  // Starting at the configured value means the first read changes nothing unless one is stored.
  for (const target of options.targets) applied.set(target.key, target.configured);
  run();
  const timer = setInterval(run, options.intervalMs ?? DEFAULT_INTERVAL_MS);
  timer.unref();
  return () => clearInterval(timer);
}
