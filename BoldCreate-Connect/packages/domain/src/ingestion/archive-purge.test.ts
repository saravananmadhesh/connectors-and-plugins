import { describe, expect, it } from 'vitest';
import type { Executor, Inserter } from '@boldcreate-integrations/db';
import {
  ARCHIVE_PURGE_JOB,
  archiveHashesOf,
  parseArchivePurgePayload,
  purgeArchives,
  requestArchivePurge,
} from './archive-purge.js';

const A = 'a'.repeat(64);
const B = 'b'.repeat(64);
const C = 'c'.repeat(64);

/** Records the rows an insert receives. */
function inserter() {
  const rows: Record<string, unknown>[] = [];
  const tx = {
    insert: () => ({
      values: (row: Record<string, unknown>) => {
        rows.push(row);
        return Promise.resolve();
      },
    }),
  } as unknown as Inserter;
  return { tx, rows };
}

/**
 * A database whose lookups answer in call order: each archive is looked up among versions and, when
 * no version uses it, among components.
 */
function database(inUseOrder: boolean[]) {
  let call = 0;
  return {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: () => Promise.resolve(inUseOrder[call++] ? [{ id: 'v1' }] : []),
        }),
      }),
    }),
  } as unknown as Pick<Executor, 'select'>;
}

function blob() {
  const deleted: string[] = [];
  return {
    deleted,
    port: {
      delete: (sha: string) => {
        deleted.push(sha);
        return Promise.resolve();
      },
    },
  };
}

describe('requestArchivePurge', () => {
  it('queues one job with each archive once', async () => {
    const { tx, rows } = inserter();
    await requestArchivePurge(tx, [A, B, A]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ eventType: ARCHIVE_PURGE_JOB, status: 'pending' });
    expect(JSON.parse(rows[0]!['payload'] as string)).toEqual({ sha256s: [A, B] });
  });

  it('ignores a version that has no archive and anything that is not a hash', async () => {
    const { tx, rows } = inserter();
    await requestArchivePurge(tx, [null, 'not-a-hash', 'A'.repeat(64), A]);
    expect(JSON.parse(rows[0]!['payload'] as string)).toEqual({ sha256s: [A] });
  });

  it('queues nothing when there is nothing to remove', async () => {
    const { tx, rows } = inserter();
    await requestArchivePurge(tx, []);
    await requestArchivePurge(tx, [null]);
    expect(rows).toEqual([]);
  });

  it('splits a very large delete into several jobs', async () => {
    const { tx, rows } = inserter();
    const many = Array.from({ length: 450 }, (_, i) => i.toString(16).padStart(64, '0'));
    await requestArchivePurge(tx, many);
    expect(rows).toHaveLength(3);
    const sizes = rows.map(
      (row) => (JSON.parse(row['payload'] as string).sha256s as string[]).length,
    );
    expect(sizes).toEqual([200, 200, 50]);
  });
});

describe('archiveHashesOf', () => {
  /** Answers the version query, then the component query, without a limit. */
  function lookups(versions: unknown[], components: unknown[]) {
    const answers = [versions, components];
    return {
      select: () => ({
        from: () => ({ where: () => Promise.resolve(answers.shift() ?? []) }),
      }),
    } as unknown as Pick<Executor, 'select'>;
  }

  it('lists the archive of each version and of each component, leaving out empty ones', async () => {
    const found = await archiveHashesOf(
      lookups(
        [
          { id: 'v1', sha256: A },
          { id: 'v2', sha256: null },
        ],
        [{ sha256: B }, { sha256: null }],
      ),
      ['p1'],
    );
    expect(found).toEqual([A, B]);
  });

  it('asks nothing when there are no plugins or no versions', async () => {
    expect(await archiveHashesOf(lookups([], []), [])).toEqual([]);
    expect(await archiveHashesOf(lookups([], []), ['p1'])).toEqual([]);
  });
});

describe('purgeArchives', () => {
  it('removes an archive nothing points at', async () => {
    const { port, deleted } = blob();
    const result = await purgeArchives(database([false, false]), port, [A]);
    expect(result).toEqual({ removed: [A], kept: [] });
    expect(deleted).toEqual([A]);
  });

  it('keeps an archive a version still points at, because versions can share one', async () => {
    const { port, deleted } = blob();
    const result = await purgeArchives(database([true, false, false, true]), port, [A, B, C]);
    expect(result).toEqual({ removed: [B], kept: [A, C] });
    expect(deleted).toEqual([B]);
  });

  it('keeps an archive a component still points at', async () => {
    const { port, deleted } = blob();
    const result = await purgeArchives(database([false, true]), port, [A]);
    expect(result).toEqual({ removed: [], kept: [A] });
    expect(deleted).toEqual([]);
  });

  it('looks at each archive once and skips anything that is not a hash', async () => {
    const { port, deleted } = blob();
    const result = await purgeArchives(database([false, false]), port, [A, A, 'x/../y']);
    expect(result.removed).toEqual([A]);
    expect(deleted).toEqual([A]);
  });

  it('lets a failed removal fail the job so it is retried', async () => {
    const failing = { delete: () => Promise.reject(new Error('storage down')) };
    await expect(purgeArchives(database([false, false]), failing, [A])).rejects.toThrow(
      'storage down',
    );
  });
});

describe('parseArchivePurgePayload', () => {
  it('returns the hashes', () => {
    expect(parseArchivePurgePayload({ sha256s: [A, B] })).toEqual([A, B]);
  });

  it.each([
    ['nothing', undefined],
    ['null', null],
    ['no list', {}],
    ['not a list', { sha256s: A }],
    ['an empty list', { sha256s: [] }],
    ['a hash that is not one', { sha256s: [A, 'nope'] }],
    ['a value that is not text', { sha256s: [5] }],
    ['too many', { sha256s: Array.from({ length: 201 }, () => A) }],
  ])('refuses %s', (_label, payload) => {
    expect(() => parseArchivePurgePayload(payload)).toThrow('Invalid archive purge payload');
  });
});
