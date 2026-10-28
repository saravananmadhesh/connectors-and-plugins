import type { ClockPort } from '@boldcreate-integrations/ports';

interface Sleeper {
  wakeAt: number;
  resolve: () => void;
}

/** A clock that only moves when a test says so. */
export class FakeClock implements ClockPort {
  private current: number;
  private sleepers: Sleeper[] = [];

  constructor(start: Date | number = new Date('2026-01-01T00:00:00.000Z')) {
    this.current = typeof start === 'number' ? start : start.getTime();
  }

  now(): Date {
    return new Date(this.current);
  }

  nowMs(): number {
    return this.current;
  }

  set(date: Date): void {
    this.current = date.getTime();
    this.wake();
  }

  advance(ms: number): void {
    this.current += ms;
    this.wake();
  }

  sleep(ms: number, signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) return Promise.reject(new Error('aborted'));
    return new Promise<void>((resolve, reject) => {
      const sleeper: Sleeper = { wakeAt: this.current + ms, resolve };
      this.sleepers.push(sleeper);
      signal?.addEventListener('abort', () => {
        this.sleepers = this.sleepers.filter((s) => s !== sleeper);
        reject(new Error('aborted'));
      });
      this.wake();
    });
  }

  private wake(): void {
    const due = this.sleepers.filter((s) => s.wakeAt <= this.current);
    this.sleepers = this.sleepers.filter((s) => s.wakeAt > this.current);
    for (const sleeper of due) sleeper.resolve();
  }
}
