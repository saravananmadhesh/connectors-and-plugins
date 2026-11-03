import { useCallback, useState } from 'react';

/** Values kept for the life of the page, so leaving a tab and coming back finds it as it was. */
const memory = new Map<string, unknown>();

/** Like `useState`, but the value outlives the component until the page is reloaded; a null key remembers nothing. */
export function useRemembered<T>(key: string | null, initial: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() =>
    key !== null && memory.has(key) ? (memory.get(key) as T) : initial,
  );
  const set = useCallback(
    (next: T) => {
      if (key !== null) memory.set(key, next);
      setValue(next);
    },
    [key],
  );
  return [value, set];
}

/** Reads a remembered value without subscribing to it. */
export function recall<T>(key: string): T | undefined {
  return memory.get(key) as T | undefined;
}

/** Forgets everything; for tests. */
export function forgetAll(): void {
  memory.clear();
}
