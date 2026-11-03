import { describe, expect, it } from 'vitest';
import {
  MAX_PAGE,
  parseVitestEntries,
  queryEntries,
  relativeFile,
  type TestEntry,
} from './test-entries.js';

const report = JSON.stringify({
  testResults: [
    {
      name: 'D:\\Repo\\scripts\\a.test.ts',
      status: 'failed',
      assertionResults: [
        { fullName: 'a works', status: 'passed', duration: 1.6 },
        { fullName: 'a breaks', status: 'failed', duration: 12, failureMessages: ['boom\nstack'] },
        { title: 'a later', status: 'pending', duration: null },
      ],
    },
    {
      name: 'D:\\Repo\\scripts\\broken.test.ts',
      status: 'failed',
      message: 'Cannot find module',
      assertionResults: [],
    },
    {
      name: '/elsewhere/b.test.ts',
      status: 'passed',
      assertionResults: [{ title: 'b ok', status: 'passed' }],
    },
  ],
});

describe('relativeFile', () => {
  it('uses forward slashes and strips the repository root', () => {
    expect(relativeFile('D:\\Repo\\scripts\\a.test.ts', 'D:\\Repo')).toBe('scripts/a.test.ts');
    expect(relativeFile('d:/repo/scripts/a.test.ts', 'D:\\Repo\\')).toBe('scripts/a.test.ts');
  });

  it('leaves a file outside the root as it is, and a file with no root', () => {
    expect(relativeFile('/elsewhere/b.test.ts', 'D:\\Repo')).toBe('/elsewhere/b.test.ts');
    expect(relativeFile('D:\\Repo\\x.ts')).toBe('D:/Repo/x.ts');
    expect(relativeFile('D:\\RepoOther\\x.ts', 'D:\\Repo')).toBe('D:/RepoOther/x.ts');
  });
});

describe('parseVitestEntries', () => {
  const entries = parseVitestEntries(report, 'D:\\Repo');

  it('lists every test with its status and rounded duration', () => {
    expect(entries.map((entry) => [entry.name, entry.status, entry.durationMs])).toEqual([
      ['a works', 'passed', 2],
      ['a breaks', 'failed', 12],
      ['a later', 'skipped', 0],
      ['(suite failed to run)', 'failed', 0],
      ['b ok', 'passed', 0],
    ]);
  });

  it('keeps a failure message only on the failed tests', () => {
    expect(entries.find((entry) => entry.name === 'a breaks')?.message).toBe('boom\nstack');
    expect(entries.find((entry) => entry.name === 'a works')).not.toHaveProperty('message');
  });

  it('reports a suite that failed to load as one failed test with its message', () => {
    expect(entries.find((entry) => entry.file === 'scripts/broken.test.ts')).toMatchObject({
      status: 'failed',
      message: 'Cannot find module',
    });
  });

  it('cuts a very long failure message', () => {
    const long = JSON.stringify({
      testResults: [
        {
          name: 'x',
          assertionResults: [{ title: 't', status: 'failed', failureMessages: ['m'.repeat(5000)] }],
        },
      ],
    });
    expect(parseVitestEntries(long)[0]?.message).toHaveLength(1500);
  });

  it('returns nothing for a report with no results, and throws on text that is not json', () => {
    expect(parseVitestEntries('{}')).toEqual([]);
    expect(() => parseVitestEntries('nope')).toThrow(SyntaxError);
  });
});

describe('queryEntries', () => {
  const entries: TestEntry[] = [
    { file: 'a.test.ts', name: 'alpha works', status: 'passed', durationMs: 1 },
    { file: 'a.test.ts', name: 'alpha breaks', status: 'failed', durationMs: 2, message: 'x' },
    { file: 'b.test.ts', name: 'beta skipped', status: 'skipped', durationMs: 0 },
    { file: 'c.test.ts', name: 'gamma works', status: 'passed', durationMs: 3 },
  ];

  it('counts every status whatever the filter', () => {
    const page = queryEntries(entries, { status: 'failed' });
    expect(page.counts).toEqual({ passed: 2, failed: 1, skipped: 1 });
    expect(page).toMatchObject({ total: 4, matched: 1 });
    expect(page.items.map((entry) => entry.name)).toEqual(['alpha breaks']);
  });

  it('matches text in the name or the file, ignoring case', () => {
    expect(queryEntries(entries, { q: 'WORKS' }).matched).toBe(2);
    expect(queryEntries(entries, { q: 'b.test' }).items.map((entry) => entry.name)).toEqual([
      'beta skipped',
    ]);
    expect(queryEntries(entries, { q: '  ' }).matched).toBe(4);
  });

  it('combines the status and the text', () => {
    expect(queryEntries(entries, { status: 'passed', q: 'gamma' }).matched).toBe(1);
    expect(queryEntries(entries, { status: 'failed', q: 'gamma' }).matched).toBe(0);
  });

  it('pages, and keeps the offset and limit inside safe bounds', () => {
    expect(queryEntries(entries, { limit: 2 }).items).toHaveLength(2);
    expect(queryEntries(entries, { limit: 2, offset: 3 }).items.map((e) => e.name)).toEqual([
      'gamma works',
    ]);
    expect(queryEntries(entries, { offset: -5 }).offset).toBe(0);
    expect(queryEntries(entries, { limit: 0 }).items).toHaveLength(1);
    const many = Array.from({ length: 900 }, (_, n): TestEntry => ({
      file: 'f',
      name: `t${n}`,
      status: 'passed',
      durationMs: 0,
    }));
    expect(queryEntries(many, { limit: 99999 }).items).toHaveLength(MAX_PAGE);
  });

  it('treats an unknown status as no filter', () => {
    expect(queryEntries(entries, { status: 'all' }).matched).toBe(4);
    expect(queryEntries(entries, {}).matched).toBe(4);
  });

  it('is empty for no tests', () => {
    expect(queryEntries([], { q: 'x' })).toMatchObject({ total: 0, matched: 0, items: [] });
  });
});
