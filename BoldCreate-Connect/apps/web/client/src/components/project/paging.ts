import { useState } from 'react';
import { ApiError } from '@/lib/api';

export const messageOf = (err: unknown): string =>
  err instanceof ApiError ? err.message : 'Something went wrong';

/** Cursor paging: `cursor` is the page being shown, `forward` opens the next, `back` the one before. */
export function useCursorPaging() {
  const [trail, setTrail] = useState<(string | undefined)[]>([undefined]);
  return {
    cursor: trail[trail.length - 1],
    hasPrevious: trail.length > 1,
    forward: (next: string) => setTrail((previous) => [...previous, next]),
    back: () => setTrail((previous) => (previous.length > 1 ? previous.slice(0, -1) : previous)),
    reset: () => setTrail([undefined]),
  };
}
