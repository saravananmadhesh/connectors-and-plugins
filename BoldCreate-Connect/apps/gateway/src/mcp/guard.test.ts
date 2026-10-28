import { describe, expect, it } from 'vitest';
import { createServerGuard } from './guard.js';

function setup() {
  let now = 1_000;
  const guard = createServerGuard({
    maxConcurrency: 2,
    failuresToOpen: 3,
    openMs: 10_000,
    now: () => now,
  });
  return {
    guard,
    advance: (ms: number) => {
      now += ms;
    },
  };
}

const take = (guard: ReturnType<typeof createServerGuard>, key = 's') => {
  const gate = guard.acquire(key);
  if (typeof gate === 'string') throw new Error(`refused: ${gate}`);
  return gate;
};

describe('server guard', () => {
  it('caps the calls in flight per server and frees a slot on release', () => {
    const { guard } = setup();
    const first = take(guard);
    take(guard);
    expect(guard.acquire('s')).toBe('busy');
    expect(typeof guard.acquire('other')).toBe('object');
    first.release('ok');
    expect(typeof guard.acquire('s')).toBe('object');
  });

  it('opens after repeated failures and refuses until the pause has passed', () => {
    const { guard, advance } = setup();
    for (let i = 0; i < 3; i += 1) take(guard).release('failure');
    expect(guard.acquire('s')).toBe('open');
    advance(10_001);
    expect(typeof guard.acquire('s')).toBe('object');
  });

  it('opens again after one more failure once the pause has passed', () => {
    const { guard, advance } = setup();
    for (let i = 0; i < 3; i += 1) take(guard).release('failure');
    advance(10_001);
    take(guard).release('failure');
    expect(guard.acquire('s')).toBe('open');
  });

  it('forgets earlier failures after one success', () => {
    const { guard, advance } = setup();
    for (let i = 0; i < 3; i += 1) take(guard).release('failure');
    advance(10_001);
    take(guard).release('ok');
    for (let i = 0; i < 2; i += 1) take(guard).release('failure');
    expect(typeof guard.acquire('s')).toBe('object');
  });

  it('counts nothing for an ignored outcome, and releases once', () => {
    const { guard } = setup();
    const gate = take(guard);
    gate.release('ignore');
    gate.release('failure');
    gate.release('failure');
    for (let i = 0; i < 2; i += 1) take(guard).release('failure');
    expect(typeof guard.acquire('s')).toBe('object');
  });
});
