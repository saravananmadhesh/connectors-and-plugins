import { describe, expect, it } from 'vitest';
import { pageNumbers } from './pagination';

describe('pageNumbers', () => {
  it('lists every page when there are few', () => {
    expect(pageNumbers(1, 3)).toEqual([1, 2, 3]);
  });

  it('keeps the first and last page and marks the gaps around the current one', () => {
    expect(pageNumbers(10, 20)).toEqual([1, 'gap', 9, 10, 11, 'gap', 20]);
  });

  it('does not mark a gap where the numbers touch', () => {
    expect(pageNumbers(2, 20)).toEqual([1, 2, 3, 'gap', 20]);
    expect(pageNumbers(20, 20)).toEqual([1, 'gap', 19, 20]);
  });
});
