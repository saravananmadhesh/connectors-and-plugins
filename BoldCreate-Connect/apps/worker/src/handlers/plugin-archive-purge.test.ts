import { describe, expect, it, vi } from 'vitest';
import type { BlobPort, ClaimedJob } from '@boldcreate-integrations/ports';
import type { IngestionDeps } from '@boldcreate-integrations/domain';
import { handlePluginArchivePurgeRequested } from './plugin-archive-purge.js';

const A = 'a'.repeat(64);
const B = 'b'.repeat(64);

const job = (payload: unknown): ClaimedJob => ({
  id: 'job-1',
  type: 'plugin_archive.purge_requested',
  payload,
  attempts: 0,
});

/** Versions found in use answer in order; everything else is free to remove. */
function deps(inUse: boolean[]) {
  let call = 0;
  const remove = vi.fn<BlobPort['delete']>().mockResolvedValue(undefined);
  const value = {
    db: {
      select: () => ({
        from: () => ({
          where: () => ({ limit: () => Promise.resolve(inUse[call++] ? [{ id: 'v1' }] : []) }),
        }),
      }),
    },
    blob: { delete: remove },
  } as unknown as Pick<IngestionDeps, 'db' | 'blob'>;
  return { value, remove };
}

describe('plugin archive purge job', () => {
  it('removes the archives no version points at and keeps the shared ones', async () => {
    const { value, remove } = deps([true, false]);
    await handlePluginArchivePurgeRequested(job({ sha256s: [A, B] }), value);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(B);
  });

  it('refuses a payload it cannot read, without touching storage', async () => {
    const { value, remove } = deps([]);
    await expect(handlePluginArchivePurgeRequested(job({ sha256s: ['x'] }), value)).rejects.toThrow(
      'Invalid archive purge payload',
    );
    expect(remove).not.toHaveBeenCalled();
  });

  it('fails the job when storage fails, so it is retried', async () => {
    const { value, remove } = deps([false]);
    remove.mockRejectedValue(new Error('storage down'));
    await expect(handlePluginArchivePurgeRequested(job({ sha256s: [A] }), value)).rejects.toThrow(
      'storage down',
    );
  });
});
