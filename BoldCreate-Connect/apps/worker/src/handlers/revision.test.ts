import { describe, expect, it, vi } from 'vitest';
import type { CachePort, ClaimedJob } from '@boldcreate-integrations/ports';
import { handleRevisionBumped } from './revision.js';

function job(payload: unknown): ClaimedJob {
  return { id: 'job-1', type: 'revision.bumped', payload, attempts: 0 };
}

function fakeCache() {
  return {
    delete: vi.fn<CachePort['delete']>().mockResolvedValue(undefined),
    publish: vi.fn<CachePort['publish']>().mockResolvedValue(undefined),
  } as unknown as CachePort & {
    delete: ReturnType<typeof vi.fn<CachePort['delete']>>;
    publish: ReturnType<typeof vi.fn<CachePort['publish']>>;
  };
}

describe('revision job', () => {
  it('removes the shared entry, then publishes the revision on the single channel', async () => {
    const cache = fakeCache();
    const order: string[] = [];
    cache.delete.mockImplementation(async () => void order.push('delete'));
    cache.publish.mockImplementation(async () => void order.push('publish'));

    await handleRevisionBumped(job({ type: 'catalog', id: 'flag:oauth_dcr' }), { cache });

    expect(order).toEqual(['delete', 'publish']);
    expect(cache.delete).toHaveBeenCalledWith('g:flag:oauth_dcr');
    expect(cache.publish).toHaveBeenCalledWith(
      'boldcreate:invalidate',
      JSON.stringify({ type: 'catalog', id: 'flag:oauth_dcr' }),
    );
  });

  it('publishes a revision without an id and removes nothing', async () => {
    const cache = fakeCache();
    await handleRevisionBumped(job({ type: 'catalog' }), { cache });
    expect(cache.delete).not.toHaveBeenCalled();
    expect(cache.publish).toHaveBeenCalledWith(
      'boldcreate:invalidate',
      JSON.stringify({ type: 'catalog' }),
    );
  });

  it('fails so the queue retries when publishing fails', async () => {
    const cache = fakeCache();
    cache.publish.mockRejectedValue(new Error('redis_unavailable'));
    await expect(
      handleRevisionBumped(job({ type: 'catalog', id: 'flag:oauth_dcr' }), { cache }),
    ).rejects.toThrow('redis_unavailable');
  });

  it('fails when no cache is configured', async () => {
    await expect(handleRevisionBumped(job({ type: 'catalog' }), {})).rejects.toThrow(
      'No cache is configured',
    );
  });

  it('rejects a malformed payload', async () => {
    await expect(
      handleRevisionBumped(job({ type: 'plugin' }), { cache: fakeCache() }),
    ).rejects.toThrow('Invalid revision type');
  });
});
