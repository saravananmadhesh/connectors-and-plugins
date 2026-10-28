import { renderHook, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readSetupFlag, useSetupFlag, writeSetupFlag } from './setup-progress';

describe('setup progress', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('is open until written, per organization', () => {
    expect(readSetupFlag('connected-agent', 'o1')).toBe(false);
    writeSetupFlag('connected-agent', 'o1', true);
    expect(readSetupFlag('connected-agent', 'o1')).toBe(true);
    expect(readSetupFlag('connected-agent', 'o2')).toBe(false);
    expect(readSetupFlag('browsed-marketplace', 'o1')).toBe(false);
  });

  it('can be cleared again', () => {
    writeSetupFlag('connected-agent', 'o1', true);
    writeSetupFlag('connected-agent', 'o1', false);
    expect(readSetupFlag('connected-agent', 'o1')).toBe(false);
  });

  it('gives a hook that keeps the value and stores it', () => {
    const { result } = renderHook(() => useSetupFlag('connected-agent', 'o1'));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
    expect(readSetupFlag('connected-agent', 'o1')).toBe(true);
  });

  it('stays open when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readSetupFlag('connected-agent', 'o1')).toBe(false);
    expect(() => writeSetupFlag('connected-agent', 'o1', true)).not.toThrow();
  });
});
