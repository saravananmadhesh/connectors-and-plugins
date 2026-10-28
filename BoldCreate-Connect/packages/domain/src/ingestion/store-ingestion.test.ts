import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import type { BlobPort } from '@boldcreate-integrations/ports';
import { storeIngestion, type PreparedPlugin } from './ingest.js';

const SHA = 'd'.repeat(64);
const prepared = {
  archive: Buffer.from('files'),
  archiveSha256: SHA,
  componentArchives: new Map(),
} as unknown as PreparedPlugin;

/** An object store held in memory that counts uploads. */
function store(initial: string[] = []) {
  const objects = new Set(initial);
  let uploads = 0;
  const port = {
    exists: (sha: string) => Promise.resolve(objects.has(sha)),
    put: (sha: string) => {
      uploads += 1;
      objects.add(sha);
      return Promise.resolve();
    },
  } as unknown as BlobPort;
  return { port, objects, uploads: () => uploads };
}

const outcome = { pluginId: 'p1', pluginVersionId: 'v1', created: true };

/** A database whose transaction runs `during` first, as another process might. */
const database = (during: () => void = () => {}) =>
  ({
    transaction: () => {
      during();
      return Promise.resolve(outcome);
    },
  }) as unknown as Executor;

describe('storeIngestion archive', () => {
  it('uploads an archive that is not stored yet', async () => {
    const { port, objects, uploads } = store();
    await expect(storeIngestion(database(), port, prepared, 's1', 'sha')).resolves.toEqual(outcome);
    expect(objects.has(SHA)).toBe(true);
    expect(uploads()).toBe(1);
  });

  it('does not upload again when the same files are already stored', async () => {
    const { port, uploads } = store([SHA]);
    await storeIngestion(database(), port, prepared, 's1', 'sha');
    expect(uploads()).toBe(0);
  });

  it('puts the archive back when its removal ran while the version was being written', async () => {
    const { port, objects, uploads } = store([SHA]);
    await storeIngestion(
      database(() => objects.delete(SHA)),
      port,
      prepared,
      's1',
      'sha',
    );
    expect(objects.has(SHA)).toBe(true);
    expect(uploads()).toBe(1);
  });

  it('heals an archive that went missing before a repeated ingest', async () => {
    const { port, objects } = store();
    await storeIngestion(database(), port, prepared, 's1', 'sha');
    objects.delete(SHA);
    await storeIngestion(database(), port, prepared, 's1', 'sha');
    expect(objects.has(SHA)).toBe(true);
  });
});
