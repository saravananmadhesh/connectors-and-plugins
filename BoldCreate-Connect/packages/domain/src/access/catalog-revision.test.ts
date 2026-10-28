import { describe, expect, it } from 'vitest';
import { globalKey } from '@boldcreate-integrations/ports';
import {
  evictCatalogEntry,
  flagChangeId,
  INVALIDATION_CHANNEL,
  killChangeId,
  parseCatalogRevision,
  startInvalidation,
} from './catalog-revision.js';
import { createFakeCache } from './fake-cache.js';

const TARGET = '0b0f6b5e-2a63-4f3e-9d7a-5f4f4b2f9a11';

describe('catalog revision payload', () => {
  it('accepts a catalog revision with and without an id', () => {
    expect(parseCatalogRevision({ type: 'catalog' })).toEqual({ type: 'catalog' });
    expect(parseCatalogRevision({ type: 'catalog', id: 'flag:oauth_dcr' })).toEqual({
      type: 'catalog',
      id: 'flag:oauth_dcr',
    });
  });

  it.each([
    null,
    'text',
    [],
    { type: 'other' },
    { type: 'catalog', id: 7 },
    { type: 'catalog', id: '' },
  ])('rejects %j', (payload) => {
    expect(() => parseCatalogRevision(payload)).toThrow(/Invalid revision/);
  });
});

describe('evictCatalogEntry', () => {
  it('removes the shared entry of a flag and of a kill switch', async () => {
    const cache = createFakeCache();
    cache.values.set(globalKey('flag', 'oauth_dcr'), '1');
    cache.values.set(globalKey('kill', 'plugin', TARGET), '1');

    await evictCatalogEntry(cache, flagChangeId('oauth_dcr'));
    await evictCatalogEntry(cache, killChangeId('plugin', TARGET));

    expect(cache.values.size).toBe(0);
  });

  it('ignores a missing or unknown id', async () => {
    const cache = createFakeCache();
    cache.values.set(globalKey('flag', 'oauth_dcr'), '1');
    await evictCatalogEntry(cache, undefined);
    await evictCatalogEntry(cache, 'something-else');
    expect(cache.values.size).toBe(1);
  });
});

describe('startInvalidation', () => {
  it('drops the entries of every store on a catalog message only', async () => {
    const cache = createFakeCache();
    let dropped = 0;
    const stop = await startInvalidation(cache, [
      { invalidate: () => (dropped += 1) },
      { invalidate: () => (dropped += 1) },
    ]);

    await cache.publish(INVALIDATION_CHANNEL, JSON.stringify({ type: 'catalog', id: 'flag:x' }));
    expect(dropped).toBe(2);

    await cache.publish(INVALIDATION_CHANNEL, JSON.stringify({ type: 'other' }));
    await cache.publish(INVALIDATION_CHANNEL, 'not json');
    expect(dropped).toBe(2);

    await stop();
    await cache.publish(INVALIDATION_CHANNEL, JSON.stringify({ type: 'catalog' }));
    expect(dropped).toBe(2);
  });
});
