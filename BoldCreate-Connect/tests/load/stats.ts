/** Collects the outcome of every call of a load run and reduces it to the numbers worth reporting. */
export interface CallSummary {
  label: string;
  calls: number;
  /** Calls that did not end in the status the scenario expected, after retries. */
  failed: number;
  /** Times a call was answered `429` and repeated after the wait it named. */
  throttled: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  maxMs: number;
}

/** The value at rank `p` (0 to 1) of an ascending list, by the nearest-rank rule. */
export function percentile(sorted: readonly number[], p: number): number {
  if (sorted.length === 0) return 0;
  const rank = Math.min(sorted.length, Math.max(1, Math.ceil(p * sorted.length)));
  return sorted[rank - 1]!;
}

interface Bucket {
  durations: number[];
  failed: number;
  throttled: number;
}

export class Recorder {
  private readonly buckets = new Map<string, Bucket>();

  private bucket(label: string): Bucket {
    let found = this.buckets.get(label);
    if (!found) {
      found = { durations: [], failed: 0, throttled: 0 };
      this.buckets.set(label, found);
    }
    return found;
  }

  /** One finished call: how long it took, counting only the attempt that decided the outcome. */
  record(label: string, durationMs: number, ok: boolean): void {
    const bucket = this.bucket(label);
    bucket.durations.push(durationMs);
    if (!ok) bucket.failed += 1;
  }

  throttle(label: string): void {
    this.bucket(label).throttled += 1;
  }

  summary(): CallSummary[] {
    return [...this.buckets.entries()].map(([label, bucket]) => {
      const sorted = [...bucket.durations].sort((a, b) => a - b);
      return {
        label,
        calls: sorted.length,
        failed: bucket.failed,
        throttled: bucket.throttled,
        p50Ms: Math.round(percentile(sorted, 0.5)),
        p95Ms: Math.round(percentile(sorted, 0.95)),
        p99Ms: Math.round(percentile(sorted, 0.99)),
        maxMs: Math.round(sorted[sorted.length - 1] ?? 0),
      };
    });
  }

  totalFailed(): number {
    return [...this.buckets.values()].reduce((sum, bucket) => sum + bucket.failed, 0);
  }
}

/** A fixed-width table of the summary, for the run log. */
export function formatSummary(rows: readonly CallSummary[]): string {
  const header = ['call', 'calls', 'failed', '429s', 'p50 ms', 'p95 ms', 'p99 ms', 'max ms'];
  const lines = rows.map((row) => [
    row.label,
    String(row.calls),
    String(row.failed),
    String(row.throttled),
    String(row.p50Ms),
    String(row.p95Ms),
    String(row.p99Ms),
    String(row.maxMs),
  ]);
  const widths = header.map((title, i) =>
    Math.max(title.length, ...lines.map((line) => line[i]!.length)),
  );
  const format = (cells: string[]) => cells.map((cell, i) => cell.padEnd(widths[i]!)).join('  ');
  return [format(header), ...lines.map(format)].join('\n');
}
