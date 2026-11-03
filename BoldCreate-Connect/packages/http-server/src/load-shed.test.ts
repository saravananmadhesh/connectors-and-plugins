import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLoadShed } from './load-shed.js';

afterEach(() => vi.useRealTimers());

describe('createLoadShed', () => {
  it('takes requests while under every limit', () => {
    const shed = createLoadShed({ maxInflight: 2, eventLoopLagMs: 0, heapPercent: 0 });
    expect(shed.check()).toBeNull();
    shed.enter();
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('refuses at the in-flight cap and takes requests again after one leaves', () => {
    const shed = createLoadShed({ maxInflight: 2, eventLoopLagMs: 0, heapPercent: 0 });
    shed.enter();
    shed.enter();
    expect(shed.check()).toBe('inflight');
    shed.leave();
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('changes the cap while running and 0 turns it off', () => {
    const shed = createLoadShed({ maxInflight: 1, eventLoopLagMs: 0, heapPercent: 0 });
    shed.enter();
    expect(shed.check()).toBe('inflight');
    shed.setMaxInflight(5);
    expect(shed.check()).toBeNull();
    shed.setMaxInflight(1);
    expect(shed.check()).toBe('inflight');
    shed.setMaxInflight(0);
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('ignores a cap that is not a number and rounds a fraction down', () => {
    const shed = createLoadShed({ maxInflight: 2, eventLoopLagMs: 0, heapPercent: 0 });
    shed.enter();
    shed.enter();
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      shed.setMaxInflight(bad);
      expect(shed.check()).toBe('inflight');
    }
    shed.setMaxInflight(2.9);
    expect(shed.check()).toBe('inflight');
    shed.setMaxInflight(-4);
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('never counts below zero', () => {
    const shed = createLoadShed({ maxInflight: 1, eventLoopLagMs: 0, heapPercent: 0 });
    shed.leave();
    expect(shed.inflight()).toBe(0);
    shed.stop();
  });

  it('cap 0 turns the in-flight limit off', () => {
    const shed = createLoadShed({ maxInflight: 0, eventLoopLagMs: 0, heapPercent: 0 });
    for (let i = 0; i < 1000; i += 1) shed.enter();
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('refuses while the event loop is slow and recovers when it is not', () => {
    vi.useFakeTimers();
    let lag = 10;
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 250,
      heapPercent: 0,
      sampleMs: 100,
      sustainedSamples: 1,
      readLagMs: () => lag,
    });
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    lag = 400;
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBe('event_loop');
    lag = 20;
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('does not refuse for one slow sample, only for a sustained one', () => {
    vi.useFakeTimers();
    let lag = 10;
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 250,
      heapPercent: 0,
      sampleMs: 100,
      readLagMs: () => lag,
    });
    lag = 900;
    vi.advanceTimersByTime(100);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    lag = 10;
    vi.advanceTimersByTime(100);
    lag = 900;
    vi.advanceTimersByTime(300);
    expect(shed.check()).toBe('event_loop');
    lag = 10;
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.stop();
  });

  it('treats a heap spike that is gone by the next sample as normal', () => {
    vi.useFakeTimers();
    let heap = 95;
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 0,
      heapPercent: 85,
      sampleMs: 100,
      readHeapPercent: () => heap,
    });
    vi.advanceTimersByTime(200);
    heap = 40;
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    heap = 95;
    vi.advanceTimersByTime(300);
    expect(shed.check()).toBe('heap');
    shed.stop();
  });

  it('refuses while the heap is nearly full', () => {
    vi.useFakeTimers();
    let heap = 40;
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 0,
      heapPercent: 85,
      sampleMs: 100,
      sustainedSamples: 1,
      readHeapPercent: () => heap,
    });
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    heap = 91;
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBe('heap');
    shed.stop();
  });

  it('reads the real event loop and heap without throwing', () => {
    vi.useFakeTimers();
    const shed = createLoadShed({
      maxInflight: 5,
      eventLoopLagMs: 250,
      heapPercent: 99,
      sampleMs: 50,
    });
    vi.advanceTimersByTime(200);
    expect(shed.check()).toBeNull();
    shed.stop();
  });
});

describe('limits changed while running', () => {
  it('switches the event loop limit on, changes it and off again', () => {
    vi.useFakeTimers();
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 0,
      heapPercent: 0,
      sampleMs: 100,
      sustainedSamples: 1,
      readLagMs: () => 400,
    });
    vi.advanceTimersByTime(200);
    expect(shed.check()).toBeNull();
    shed.setEventLoopLagMs(250);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBe('event_loop');
    shed.setEventLoopLagMs(500);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.setEventLoopLagMs(Number.NaN);
    shed.setEventLoopLagMs(0);
    shed.stop();
  });

  it('changes the heap limit and ignores values that are not numbers', () => {
    vi.useFakeTimers();
    const shed = createLoadShed({
      maxInflight: 0,
      eventLoopLagMs: 0,
      heapPercent: 95,
      sampleMs: 100,
      sustainedSamples: 1,
      readHeapPercent: () => 90,
    });
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.setHeapPercent(Number.NaN);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.setHeapPercent(85);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBe('heap');
    shed.setHeapPercent(0);
    vi.advanceTimersByTime(100);
    expect(shed.check()).toBeNull();
    shed.stop();
  });
});
