import { describe, expect, it, vi } from 'vitest';
import type { ErrorBatch, ErrorSink } from './error-report.js';
import { createGuardedSink, SinkPausedError } from './guarded-sink.js';

const batch: ErrorBatch = { errors: [], events: [] };

function setup(failing: { value: boolean }) {
  const write = vi.fn<ErrorSink['write']>(async () => {
    if (failing.value) throw new Error('store down');
  });
  const sink: ErrorSink = { write };
  let clock = 0;
  const onStateChange = vi.fn<(state: 'paused' | 'resumed') => void>();
  const guarded = createGuardedSink(sink, {
    failureThreshold: 2,
    pauseMs: 1000,
    onStateChange,
    now: () => clock,
  });
  return { guarded, write, onStateChange, advance: (ms: number) => (clock += ms) };
}

describe('createGuardedSink', () => {
  it('passes writes through while the store works', async () => {
    const { guarded, write, onStateChange } = setup({ value: false });
    await guarded.write(batch);
    expect(write).toHaveBeenCalledTimes(1);
    expect(onStateChange).not.toHaveBeenCalled();
  });

  it('pauses after repeated failures and skips the store while paused', async () => {
    const { guarded, write, onStateChange } = setup({ value: true });
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    expect(onStateChange).not.toHaveBeenCalled();
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    expect(onStateChange).toHaveBeenCalledExactlyOnceWith('paused');
    await expect(guarded.write(batch)).rejects.toBeInstanceOf(SinkPausedError);
    expect(write).toHaveBeenCalledTimes(2);
  });

  it('lets one batch through after the pause and resumes on success', async () => {
    const failing = { value: true };
    const { guarded, write, onStateChange, advance } = setup(failing);
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    failing.value = false;
    advance(1000);
    await guarded.write(batch);
    expect(write).toHaveBeenCalledTimes(3);
    expect(onStateChange).toHaveBeenLastCalledWith('resumed');
    await guarded.write(batch);
    expect(onStateChange).toHaveBeenCalledTimes(2);
  });

  it('pauses again when the trial batch fails, without a second notice', async () => {
    const { guarded, write, onStateChange, advance } = setup({ value: true });
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    advance(1000);
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    await expect(guarded.write(batch)).rejects.toBeInstanceOf(SinkPausedError);
    expect(write).toHaveBeenCalledTimes(3);
    expect(onStateChange).toHaveBeenCalledTimes(1);
  });

  it('counts only consecutive failures', async () => {
    const failing = { value: true };
    const { guarded, onStateChange } = setup(failing);
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    failing.value = false;
    await guarded.write(batch);
    failing.value = true;
    await expect(guarded.write(batch)).rejects.toThrow('store down');
    expect(onStateChange).not.toHaveBeenCalled();
  });
});
