/** Numbers to show: the first, the last and a window around the current page, with gaps marked. */
export function pageNumbers(page: number, pages: number): (number | 'gap')[] {
  const wanted = new Set([1, pages, page - 1, page, page + 1]);
  const sorted = [...wanted].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  for (const n of sorted) {
    const last = out[out.length - 1];
    if (typeof last === 'number' && n - last > 1) out.push('gap');
    out.push(n);
  }
  return out;
}
