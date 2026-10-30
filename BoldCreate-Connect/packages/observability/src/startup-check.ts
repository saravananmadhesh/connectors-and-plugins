import type { ErrorReporter } from './error-report.js';

export type StartupCheck = () => Promise<unknown>;

export interface StartupCheckFailure {
  check: string;
  /** Error class only; the message can carry connection strings or secrets. */
  errorClass: string;
}

export interface StartupChecks {
  /** Records the deploy marker, runs every check and records one event per failing check. */
  run(): Promise<StartupCheckFailure[]>;
  /**
   * For a readiness probe: rejects while a check that failed at start still fails, and passes
   * again once it recovers, so a pod that started before its dependency came up heals itself.
   */
  readiness(): Promise<void>;
}

export interface StartupChecksOptions {
  service: string;
  errors: Pick<ErrorReporter, 'recordOpsEvent'>;
  checks: Record<string, StartupCheck>;
  /** Called with each failure so the service can print it at error level. */
  onFailure: (failure: StartupCheckFailure) => void;
  /**
   * Checks that are reported when they fail but never make the service unready, such as the
   * store that holds errors and events: losing it must not take the service out of rotation.
   */
  advisory?: readonly string[];
  /** Longest a single check may take before it counts as failed. */
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 5000;

function withTimeout(check: StartupCheck, timeoutMs: number): Promise<unknown> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error('check timed out')), timeoutMs);
  });
  return Promise.race([check(), timeout]).finally(() => clearTimeout(timer));
}

/**
 * Checks that decide whether a service can work in this environment, such as database access with
 * the role it runs as, key service reachability or the presence of required settings. A check that
 * fails here is the usual reason something works locally and not when deployed.
 */
export function createStartupChecks(options: StartupChecksOptions): StartupChecks {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const failing = new Set<string>();
  const advisory = new Set(options.advisory ?? []);

  const attempt = async (
    name: string,
    check: StartupCheck,
  ): Promise<StartupCheckFailure | null> => {
    try {
      await withTimeout(check, timeoutMs);
      failing.delete(name);
      return null;
    } catch (error) {
      failing.add(name);
      return { check: name, errorClass: error instanceof Error ? error.name : 'NonError' };
    }
  };

  return {
    async run() {
      options.errors.recordOpsEvent('deploy_started', 'info', {
        area: 'startup',
        operation: options.service,
      });
      const results = await Promise.all(
        Object.entries(options.checks).map(([name, check]) => attempt(name, check)),
      );
      const failures = results.filter((result): result is StartupCheckFailure => result !== null);
      for (const failure of failures) {
        options.onFailure(failure);
        options.errors.recordOpsEvent('startup_check_failed', 'error', {
          area: 'startup',
          operation: failure.check,
          errorClass: failure.errorClass,
        });
      }
      return failures;
    },
    async readiness() {
      const blocking = () => [...failing].filter((name) => !advisory.has(name));
      const retry = blocking().flatMap((name) => {
        const check = options.checks[name];
        return check ? [attempt(name, check)] : [];
      });
      await Promise.all(retry);
      const stillFailing = blocking();
      if (stillFailing.length > 0) {
        throw new Error(`startup checks failing: ${stillFailing.join(', ')}`);
      }
    },
  };
}
