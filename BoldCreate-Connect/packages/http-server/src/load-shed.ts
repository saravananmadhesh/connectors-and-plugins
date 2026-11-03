import { monitorEventLoopDelay } from 'node:perf_hooks';
import { getHeapStatistics } from 'node:v8';

/** Why a pod refused a request instead of taking it on. */
export type ShedReason = 'inflight' | 'event_loop' | 'heap';

export interface LoadShedOptions {
  /** Requests a pod serves at once; 0 turns the cap off. */
  maxInflight: number;
  /** p99 event loop delay in milliseconds above which new requests are refused; 0 turns it off. */
  eventLoopLagMs: number;
  /** Percent of the heap limit above which new requests are refused; 0 turns it off. */
  heapPercent: number;
  /** Milliseconds between samples of the event loop and the heap. */
  sampleMs?: number;
  /**
   * Samples in a row over a limit before requests are refused (default 3). One garbage collection
   * or a busy moment is not overload; only a sustained one is.
   */
  sustainedSamples?: number;
  /** Test seams. */
  readLagMs?: () => number;
  readHeapPercent?: () => number;
}

export interface LoadShed {
  /** The reason to refuse a new request, or `null` to take it. Cheap: reads cached samples. */
  check(): ShedReason | null;
  /** Counts a request that was taken. Pair every call with one `leave`. */
  enter(): void;
  leave(): void;
  inflight(): number;
  /** Changes the cap while running; 0 turns it off. */
  setMaxInflight(value: number): void;
  /** Changes the event loop delay limit while running; 0 turns it off. */
  setEventLoopLagMs(value: number): void;
  /** Changes the heap limit (percent) while running; 0 turns it off. */
  setHeapPercent(value: number): void;
  stop(): void;
}

const DEFAULT_SAMPLE_MS = 500;
const DEFAULT_SUSTAINED_SAMPLES = 3;

/**
 * Keeps one pod inside its own limits. The in-flight count is exact; the event loop delay and
 * the heap are sampled on a timer so that checking a request costs two comparisons.
 */
export function createLoadShed(options: LoadShedOptions): LoadShed {
  let inflight = 0;
  let maxInflight = options.maxInflight;
  const needed = Math.max(1, Math.floor(options.sustainedSamples ?? DEFAULT_SUSTAINED_SAMPLES));
  let lagStreak = 0;
  let heapStreak = 0;

  let lagLimit = options.eventLoopLagMs;
  let heapLimit = options.heapPercent;
  // The histogram and the timer exist whatever the limits are, so a limit that starts at 0 (off)
  // can be switched on while the pod runs.
  const histogram = options.readLagMs ? null : monitorEventLoopDelay({ resolution: 20 });
  histogram?.enable();
  const readLag =
    options.readLagMs ?? (() => (histogram ? Number(histogram.percentile(99)) / 1e6 : 0));
  const readHeap =
    options.readHeapPercent ??
    (() => {
      const stats = getHeapStatistics();
      return (stats.used_heap_size / stats.heap_size_limit) * 100;
    });

  const sample = (): void => {
    if (lagLimit > 0) {
      lagStreak = readLag() > lagLimit ? lagStreak + 1 : 0;
    } else {
      lagStreak = 0;
    }
    histogram?.reset();
    heapStreak = heapLimit > 0 && readHeap() > heapLimit ? heapStreak + 1 : 0;
  };
  const timer = setInterval(sample, options.sampleMs ?? DEFAULT_SAMPLE_MS);
  timer.unref();

  return {
    check() {
      if (maxInflight > 0 && inflight >= maxInflight) return 'inflight';
      if (lagStreak >= needed) return 'event_loop';
      if (heapStreak >= needed) return 'heap';
      return null;
    },
    enter() {
      inflight += 1;
    },
    leave() {
      inflight = Math.max(0, inflight - 1);
    },
    inflight: () => inflight,
    setMaxInflight(value) {
      // A value that is not a number must not switch the cap off by accident.
      if (Number.isFinite(value)) maxInflight = Math.max(0, Math.floor(value));
    },
    setEventLoopLagMs(value) {
      if (Number.isFinite(value)) lagLimit = Math.max(0, value);
    },
    setHeapPercent(value) {
      if (Number.isFinite(value)) heapLimit = Math.min(99, Math.max(0, value));
    },
    stop() {
      clearInterval(timer);
      histogram?.disable();
    },
  };
}
