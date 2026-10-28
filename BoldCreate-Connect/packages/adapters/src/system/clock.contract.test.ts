import { runClockContract } from '../contract/clock.contract.js';
import { FakeClock } from './fake-clock.js';
import { systemClock } from './system-clock.js';

runClockContract('system', () => ({
  clock: systemClock,
  advance: (ms) => new Promise<void>((resolve) => setTimeout(resolve, ms)),
}));

runClockContract('fake', () => {
  const clock = new FakeClock();
  return { clock, advance: (ms) => clock.advance(ms) };
});
