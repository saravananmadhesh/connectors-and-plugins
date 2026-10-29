import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useSidebarCollapsed } from './sidebar';

afterEach(() => window.localStorage.clear());

describe('sidebar width', () => {
  it('starts shown, toggles, and is remembered', () => {
    const first = renderHook(() => useSidebarCollapsed());
    expect(first.result.current[0]).toBe(false);
    act(() => first.result.current[1]());
    expect(first.result.current[0]).toBe(true);
    expect(renderHook(() => useSidebarCollapsed()).result.current[0]).toBe(true);
    act(() => first.result.current[1]());
    expect(renderHook(() => useSidebarCollapsed()).result.current[0]).toBe(false);
  });
});
