/**
 * The result of every single test of a step, kept with its run so the dev dashboard can list them
 * and not only the failures. Pure functions, so they can be unit tested without running a suite.
 */
export type EntryStatus = 'passed' | 'failed' | 'skipped';

export interface TestEntry {
  /** Test file, relative to the repository when it lies inside it. */
  file: string;
  name: string;
  status: EntryStatus;
  durationMs: number;
  /** The first lines of the failure, for a failed test. */
  message?: string;
}

interface VitestAssertion {
  fullName?: string;
  title?: string;
  status?: string;
  duration?: number | null;
  failureMessages?: string[];
}

interface VitestFile {
  name?: string;
  status?: string;
  message?: string;
  assertionResults?: VitestAssertion[];
}

const MAX_MESSAGE = 1500;

/** Forward slashes, and relative to `root` when the file is inside it. */
export function relativeFile(file: string, root?: string): string {
  const path = file.replaceAll('\\', '/');
  if (!root) return path;
  const base = root.replaceAll('\\', '/').replace(/\/+$/, '');
  return path.toLowerCase().startsWith(`${base.toLowerCase()}/`)
    ? path.slice(base.length + 1)
    : path;
}

const statusOf = (value: string | undefined): EntryStatus =>
  value === 'passed' ? 'passed' : value === 'failed' ? 'failed' : 'skipped';

/** Every test of a Vitest JSON report, in the order the report lists them. */
export function parseVitestEntries(raw: string, root?: string): TestEntry[] {
  const doc = JSON.parse(raw) as { testResults?: VitestFile[] };
  const entries: TestEntry[] = [];
  for (const file of doc.testResults ?? []) {
    const path = relativeFile(file.name ?? '', root);
    const assertions = file.assertionResults ?? [];
    for (const test of assertions) {
      const status = statusOf(test.status);
      entries.push({
        file: path,
        name: test.fullName ?? test.title ?? '',
        status,
        durationMs: Math.max(0, Math.round(test.duration ?? 0)),
        ...(status === 'failed'
          ? { message: (test.failureMessages ?? []).join('\n').slice(0, MAX_MESSAGE) }
          : {}),
      });
    }
    // A file that failed to load, or a failing hook, reports no failed test of its own.
    if (file.status === 'failed' && !assertions.some((test) => test.status === 'failed')) {
      entries.push({
        file: path,
        name: '(suite failed to run)',
        status: 'failed',
        durationMs: 0,
        message: (file.message ?? 'Suite failed without a message').slice(0, MAX_MESSAGE),
      });
    }
  }
  return entries;
}

export interface EntryQuery {
  status?: EntryStatus | 'all';
  /** Case-insensitive text in the test name or file. */
  q?: string;
  offset?: number;
  limit?: number;
}

export interface EntryPage {
  /** Every test of the step. */
  total: number;
  /** Tests that match the status and the text. */
  matched: number;
  counts: Record<EntryStatus, number>;
  offset: number;
  items: TestEntry[];
}

export const MAX_PAGE = 500;

export function queryEntries(entries: readonly TestEntry[], query: EntryQuery = {}): EntryPage {
  const counts: Record<EntryStatus, number> = { passed: 0, failed: 0, skipped: 0 };
  for (const entry of entries) counts[entry.status] += 1;
  const text = query.q?.trim().toLowerCase().slice(0, 200) ?? '';
  const wanted = query.status && query.status !== 'all' ? query.status : undefined;
  const matches = entries.filter(
    (entry) =>
      (!wanted || entry.status === wanted) &&
      (!text || entry.name.toLowerCase().includes(text) || entry.file.toLowerCase().includes(text)),
  );
  const offset = Math.max(0, Math.floor(query.offset ?? 0));
  const limit = Math.min(MAX_PAGE, Math.max(1, Math.floor(query.limit ?? 100)));
  return {
    total: entries.length,
    matched: matches.length,
    counts,
    offset,
    items: matches.slice(offset, offset + limit),
  };
}
