/**
 * Helpers that keep the isolated test stack steady. A Postgres process of the stack can exit on
 * its own (the checkpointer is the usual one on Windows); Postgres then restarts all its
 * processes, which drops every connection and refuses new ones for a few seconds. These helpers
 * wait that out, and keep the lines of the Postgres log that say why, so a failure leaves evidence.
 */

/** Lines that describe a server process ending, a restart of the server, or a file or memory error. */
const SERVER_TROUBLE =
  /(was terminated by|exited with exit code|terminating any other active server processes|all server processes terminated|reinitializing|automatic recovery in progress|in recovery mode|\bPANIC\b|\bFATAL\b.*(?:could not|shutting down|terminated)|could not (?:rename|fsync|write|open|create|read|remove|map|reserve)|out of memory|no space left|Access is denied|sharing violation)/i;

/** Ordinary errors of the application (a failed query, a missing grant) are not server trouble. */
const APPLICATION_NOISE =
  /\b(permission denied for|duplicate key|violates|syntax error|relation .* does not exist)\b/i;

/** The last `max` lines of a Postgres log that point at the server itself, oldest first. */
export function postgresProblems(log: string, max = 8): string[] {
  const lines = log
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && SERVER_TROUBLE.test(line) && !APPLICATION_NOISE.test(line));
  return lines.slice(-max).map((line) => line.slice(0, 300));
}

export interface WaitOptions {
  /** Answers whether the stack is usable now; may throw, which counts as not usable. */
  check: () => Promise<boolean>;
  timeoutMs: number;
  intervalMs: number;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
}

export interface WaitResult {
  healthy: boolean;
  /** How long it waited; 0 when it was usable at once. */
  waitedMs: number;
  checks: number;
}

/** Checks until the stack is usable or the time is up. A check that throws is a failed check. */
export async function waitUntilHealthy(options: WaitOptions): Promise<WaitResult> {
  const sleep =
    options.sleep ?? ((ms: number) => new Promise<void>((done) => setTimeout(done, ms)));
  const now = options.now ?? Date.now;
  const started = now();
  let checks = 0;
  for (;;) {
    checks += 1;
    let ok = false;
    try {
      ok = await options.check();
    } catch {
      ok = false;
    }
    const waitedMs = Math.max(0, now() - started);
    if (ok) return { healthy: true, waitedMs: checks === 1 ? 0 : waitedMs, checks };
    if (waitedMs >= options.timeoutMs) return { healthy: false, waitedMs, checks };
    await sleep(options.intervalMs);
  }
}

/** The note a step carries when the stack had to recover before it could run. */
export function recoveryNote(input: {
  waitedMs: number;
  rebuilt: boolean;
  problems: readonly string[];
}): string {
  const seconds = (input.waitedMs / 1000).toFixed(1);
  const head = input.rebuilt
    ? `The test stack was not usable after ${seconds} s and was rebuilt before this step.`
    : `The test stack needed ${seconds} s to recover before this step.`;
  return input.problems.length ? `${head} Postgres log: ${input.problems.join(' | ')}` : head;
}
