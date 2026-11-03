/**
 * The ramp: virtual users arrive at a fixed rate until a target is reached, then all of them keep
 * calling for a while. Each user is a host's server reading `GET /v1/project/me` with its project
 * key, then thinking for a moment. Arrivals do not wait for earlier calls (an open model), so a
 * service that falls behind shows up as latency and errors, not as a slower test.
 */
import { percentile } from './stats.js';

export interface RampInput {
  /** The gateway, without a trailing slash. */
  gatewayUrl: string;
  projectKey: string;
  /** Users in the run once the ramp is done. */
  targetUsers: number;
  /** New users started each second. */
  spawnPerSecond: number;
  /** How long one user waits between its calls. */
  thinkMs: number;
  /** Seconds all users keep calling after the last one has arrived. */
  holdSeconds: number;
  /** Longest a call may take before it counts as a timeout. */
  timeoutMs: number;
  log: (line: string) => void;
}

/** One finished call. */
export interface Sample {
  /** Seconds from the start of the run to the start of the call. */
  at: number;
  durationMs: number;
  /** HTTP status, or 0 for a call that never got an answer. */
  status: number;
}

export interface WindowSummary {
  fromSecond: number;
  users: number;
  calls: number;
  perSecond: number;
  ok: number;
  throttled: number;
  unavailable: number;
  serverErrors: number;
  noAnswer: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
}

export interface RampResult {
  input: Omit<RampInput, 'log' | 'gatewayUrl' | 'projectKey'>;
  totals: Record<string, number>;
  windows: WindowSummary[];
  /** First window where more than 1% of calls failed or p95 passed one second, if any. */
  firstDegraded: WindowSummary | null;
  failed: number;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Reduces samples to fixed windows. `usersAt` says how many users were running at a second. */
export function summarizeWindows(
  samples: readonly Sample[],
  windowSeconds: number,
  usersAt: (second: number) => number,
): WindowSummary[] {
  const byWindow = new Map<number, Sample[]>();
  for (const sample of samples) {
    const index = Math.floor(sample.at / windowSeconds);
    const bucket = byWindow.get(index);
    if (bucket) bucket.push(sample);
    else byWindow.set(index, [sample]);
  }
  return [...byWindow.entries()]
    .sort(([a], [b]) => a - b)
    .map(([index, bucket]) => {
      const sorted = bucket.map((s) => s.durationMs).sort((a, b) => a - b);
      const count = (test: (status: number) => boolean) =>
        bucket.filter((s) => test(s.status)).length;
      const from = index * windowSeconds;
      return {
        fromSecond: from,
        users: usersAt(from + windowSeconds),
        calls: bucket.length,
        perSecond: Math.round((bucket.length / windowSeconds) * 10) / 10,
        ok: count((s) => s === 200),
        throttled: count((s) => s === 429),
        unavailable: count((s) => s === 503),
        serverErrors: count((s) => s >= 500 && s !== 503),
        noAnswer: count((s) => s === 0),
        p50Ms: Math.round(percentile(sorted, 0.5)),
        p95Ms: Math.round(percentile(sorted, 0.95)),
        p99Ms: Math.round(percentile(sorted, 0.99)),
      };
    });
}

/** A window is degraded when over 1% of its calls failed or its p95 is over a second. */
export function isDegraded(window: WindowSummary): boolean {
  const failed = window.calls - window.ok;
  return window.calls > 0 && (failed / window.calls > 0.01 || window.p95Ms > 1_000);
}

export async function runRamp(input: RampInput): Promise<RampResult> {
  const { gatewayUrl, projectKey, targetUsers, spawnPerSecond, thinkMs, holdSeconds, log } = input;
  const samples: Sample[] = [];
  const started = performance.now();
  const rampSeconds = Math.ceil(targetUsers / spawnPerSecond);
  const endsAtMs = (rampSeconds + holdSeconds) * 1000;
  const elapsed = () => performance.now() - started;
  let spawned = 0;

  async function oneCall(): Promise<void> {
    const callStart = elapsed();
    let status = 0;
    try {
      const res = await fetch(`${gatewayUrl}/v1/project/me`, {
        headers: { authorization: `Bearer ${projectKey}` },
        signal: AbortSignal.timeout(input.timeoutMs),
      });
      await res.arrayBuffer();
      status = res.status;
    } catch {
      status = 0;
    }
    samples.push({ at: callStart / 1000, durationMs: elapsed() - callStart, status });
  }

  async function user(): Promise<void> {
    // A random first wait spreads the users, so they do not all call in the same instant.
    await sleep(Math.random() * thinkMs);
    while (elapsed() < endsAtMs) {
      await oneCall();
      await sleep(thinkMs * (0.5 + Math.random()));
    }
  }

  const running: Promise<void>[] = [];
  let lastLog = 0;
  for (let second = 0; second < rampSeconds; second++) {
    const batch = Math.min(spawnPerSecond, targetUsers - spawned);
    for (let i = 0; i < batch; i++) running.push(user());
    spawned += batch;
    if (second - lastLog >= 5) {
      lastLog = second;
      log(`${spawned} users, ${samples.length} calls`);
    }
    await sleep(Math.max(0, (second + 1) * 1000 - elapsed()));
  }
  log(`${spawned} users running; holding for ${holdSeconds} s`);
  await Promise.all(running);

  const usersAt = (second: number) => Math.min(targetUsers, Math.round(second * spawnPerSecond));
  const windows = summarizeWindows(samples, 10, usersAt);
  const totals: Record<string, number> = {};
  for (const sample of samples) {
    const key = sample.status === 0 ? 'no answer' : String(sample.status);
    totals[key] = (totals[key] ?? 0) + 1;
  }
  const failed = samples.filter((s) => s.status !== 200).length;
  return {
    input: {
      targetUsers,
      spawnPerSecond,
      thinkMs,
      holdSeconds,
      timeoutMs: input.timeoutMs,
    },
    totals,
    windows,
    firstDegraded: windows.find(isDegraded) ?? null,
    failed,
  };
}

/** A table of the windows, for the run log. */
export function formatWindows(windows: readonly WindowSummary[]): string {
  const header = [
    'from s',
    'users',
    'calls/s',
    'ok',
    '429',
    '503',
    '5xx',
    'none',
    'p50',
    'p95',
    'p99',
  ];
  const rows = windows.map((w) =>
    [
      w.fromSecond,
      w.users,
      w.perSecond,
      w.ok,
      w.throttled,
      w.unavailable,
      w.serverErrors,
      w.noAnswer,
      w.p50Ms,
      w.p95Ms,
      w.p99Ms,
    ].map(String),
  );
  const widths = header.map((title, i) =>
    Math.max(title.length, ...rows.map((row) => row[i]!.length)),
  );
  const line = (cells: string[]) => cells.map((cell, i) => cell.padStart(widths[i]!)).join('  ');
  return [line(header), ...rows.map(line)].join('\n');
}
