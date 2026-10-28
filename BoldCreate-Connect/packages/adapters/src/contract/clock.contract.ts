import { describe, it, expect } from 'vitest';
import type { ClockPort } from '@boldcreate-integrations/ports';

/**
 * Behaviour every `ClockPort` must have. `advance` moves time forward by at least `ms`: the fake
 * clock jumps, the real clock waits.
 */
export function runClockContract(
  label: string,
  make: () => { clock: ClockPort; advance(ms: number): Promise<void> | void },
): void {
  describe(`clock contract: ${label}`, () => {
    it('reports a consistent date and millisecond value', () => {
      const { clock } = make();
      expect(Math.abs(clock.now().getTime() - clock.nowMs())).toBeLessThan(50);
    });

    it('moves forward', async () => {
      const { clock, advance } = make();
      const before = clock.nowMs();
      await advance(30);
      expect(clock.nowMs() - before).toBeGreaterThanOrEqual(29);
    });

    it('resolves sleep once the time has passed', async () => {
      const { clock, advance } = make();
      let done = false;
      const sleeping = clock.sleep(20).then(() => {
        done = true;
      });
      await advance(25);
      await sleeping;
      expect(done).toBe(true);
    });

    it('rejects sleep when the signal aborts', async () => {
      const { clock } = make();
      const controller = new AbortController();
      const sleeping = clock.sleep(60_000, controller.signal);
      controller.abort();
      await expect(sleeping).rejects.toThrow('aborted');
      await expect(clock.sleep(10, controller.signal)).rejects.toThrow('aborted');
    });
  });
}
