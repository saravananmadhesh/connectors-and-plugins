import { describe, it, expect } from 'vitest';
import { FakeClock } from './fake-clock.js';

describe('FakeClock', () => {
  it('starts at the given time and only moves when told', () => {
    const clock = new FakeClock(new Date('2026-02-03T04:05:06.000Z'));
    expect(clock.now().toISOString()).toBe('2026-02-03T04:05:06.000Z');
    expect(clock.nowMs()).toBe(clock.now().getTime());
    clock.advance(1500);
    expect(clock.now().toISOString()).toBe('2026-02-03T04:05:07.500Z');
    clock.set(new Date('2030-01-01T00:00:00.000Z'));
    expect(clock.now().getUTCFullYear()).toBe(2030);
  });

  it('wakes a sleeper when time reaches its deadline', async () => {
    const clock = new FakeClock();
    let woke = false;
    const sleeping = clock.sleep(1000).then(() => {
      woke = true;
    });
    clock.advance(999);
    await Promise.resolve();
    expect(woke).toBe(false);
    clock.advance(1);
    await sleeping;
    expect(woke).toBe(true);
  });

  it('rejects a sleep that is aborted', async () => {
    const clock = new FakeClock();
    const controller = new AbortController();
    const sleeping = clock.sleep(1000, controller.signal);
    controller.abort();
    await expect(sleeping).rejects.toThrow('aborted');
    await expect(clock.sleep(10, controller.signal)).rejects.toThrow('aborted');
  });
});
