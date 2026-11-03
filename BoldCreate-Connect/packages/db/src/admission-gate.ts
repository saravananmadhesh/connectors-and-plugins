/** Counts the pod keeps for its database admission queue. */
export interface AdmissionStats {
  /** Callers holding a slot right now. */
  active: number;
  /** Callers waiting for a slot. */
  waiting: number;
}

export type AdmissionRejection = 'full' | 'timeout' | 'share';

export interface AdmissionGateOptions {
  /** Callers allowed to use the database at once. */
  maxConcurrency: number;
  /** Callers allowed to wait; one more is refused at once. */
  maxDepth: number;
  /** Milliseconds a caller waits for a slot before it is refused. */
  maxWaitMs: number;
  /**
   * Percent of the queue one owner (an organization) may fill while another owner is waiting, so
   * one noisy tenant cannot take every place. 0 or unset: no share limit.
   */
  ownerSharePct?: number;
  /** Called for each refusal with why it happened. */
  onReject?: (reason: AdmissionRejection) => void;
}

export type AdmissionLimits = Pick<
  AdmissionGateOptions,
  'maxConcurrency' | 'maxDepth' | 'maxWaitMs' | 'ownerSharePct'
>;

export interface AdmissionGate {
  /** Resolves with a function that gives the slot back; extra calls are no-ops. */
  acquire(owner?: string): Promise<() => void>;
  /** Changes the limits while running; waiting callers are admitted if the new limit allows. */
  update(next: Partial<AdmissionLimits>): void;
  stats(): AdmissionStats;
}

const REFUSAL_TEXT: Record<AdmissionRejection, string> = {
  full: 'is full',
  timeout: 'wait ran out',
  share: 'share is used up',
};

/** The refusal. The message starts the way the HTTP layer reads as a database overload (a 503). */
export class AdmissionRefused extends Error {
  readonly code = 'admission_refused';
  constructor(reason: AdmissionRejection) {
    super(`too many connections: admission queue ${REFUSAL_TEXT[reason]}`);
    this.name = 'AdmissionRefused';
  }
}

interface Waiter {
  grant: (release: () => void) => void;
  timer: NodeJS.Timeout;
  owner: string | undefined;
}

/**
 * A first-in, first-out queue in front of the database. A pod uses at most `maxConcurrency`
 * connections at once; further callers wait up to `maxWaitMs`, and once `maxDepth` callers wait,
 * new ones are refused immediately instead of growing the queue and the heap. While another
 * owner waits, one owner may fill only `ownerSharePct` of the queue.
 */
export function createAdmissionGate(options: AdmissionGateOptions): AdmissionGate {
  const limits = { ...options };
  const waiters: Waiter[] = [];
  const perOwner = new Map<string, number>();
  let active = 0;

  const leave = (waiter: Waiter): void => {
    if (waiter.owner === undefined) return;
    const left = (perOwner.get(waiter.owner) ?? 1) - 1;
    if (left <= 0) perOwner.delete(waiter.owner);
    else perOwner.set(waiter.owner, left);
  };

  const slot = (): (() => void) => {
    active += 1;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      active -= 1;
      drain();
    };
  };

  function drain(): void {
    while (waiters.length > 0 && active < limits.maxConcurrency) {
      const waiter = waiters.shift();
      if (!waiter) break;
      clearTimeout(waiter.timer);
      leave(waiter);
      waiter.grant(slot());
    }
  }

  const overShare = (owner: string | undefined): boolean => {
    const share = limits.ownerSharePct ?? 0;
    if (share <= 0 || owner === undefined) return false;
    const own = perOwner.get(owner) ?? 0;
    const others = waiters.length - own;
    const allowed = Math.max(1, Math.floor((limits.maxDepth * share) / 100));
    return others > 0 && own >= allowed;
  };

  return {
    acquire(owner) {
      if (active < limits.maxConcurrency) return Promise.resolve(slot());
      if (waiters.length >= limits.maxDepth) {
        limits.onReject?.('full');
        return Promise.reject(new AdmissionRefused('full'));
      }
      if (overShare(owner)) {
        limits.onReject?.('share');
        return Promise.reject(new AdmissionRefused('share'));
      }
      return new Promise<() => void>((resolve, reject) => {
        const waiter: Waiter = {
          grant: resolve,
          owner,
          timer: setTimeout(() => {
            const at = waiters.indexOf(waiter);
            if (at >= 0) {
              waiters.splice(at, 1);
              leave(waiter);
            }
            limits.onReject?.('timeout');
            reject(new AdmissionRefused('timeout'));
          }, limits.maxWaitMs),
        };
        if (owner !== undefined) perOwner.set(owner, (perOwner.get(owner) ?? 0) + 1);
        waiters.push(waiter);
      });
    },
    update(next) {
      // A value that is not a number would stall or open the queue; keep what is running.
      for (const [name, value] of Object.entries(next) as [keyof AdmissionLimits, number][]) {
        if (Number.isFinite(value) && value >= 0) limits[name] = value;
      }
      drain();
    },
    stats: () => ({ active, waiting: waiters.length }),
  };
}
