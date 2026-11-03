import { describe, expect, it, vi } from 'vitest';
import { createProjectKeyCache, type ProjectKeyIdentity } from './project-auth.js';

function verified(expiresAt: Date | null = null) {
  const identity: ProjectKeyIdentity = {
    keyRowId: 'row',
    keyId: 'k',
    projectId: 'p',
    organizationId: 'o',
    scopes: [],
    expiresAt,
  };
  return { identity, allowedCidrs: null };
}

describe('createProjectKeyCache', () => {
  it('serves a verified key from memory until its time is up', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    const load = vi.fn<() => Promise<ReturnType<typeof verified>>>(async () => verified());
    await cache.resolve('a', 0, load);
    await cache.resolve('a', 29_999, load);
    expect(load).toHaveBeenCalledTimes(1);
    await cache.resolve('a', 30_000, load);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('shares one lookup between calls that arrive together', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    const load = vi.fn<() => Promise<ReturnType<typeof verified>>>(async () => verified());
    await Promise.all(Array.from({ length: 50 }, () => cache.resolve('a', 0, load)));
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('does not keep a refused key, so a key that becomes valid works at once', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    const load = vi.fn<() => Promise<null>>(async () => null);
    expect(await cache.resolve('a', 0, load)).toBeNull();
    expect(await cache.resolve('a', 1, load)).toBeNull();
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('does not keep a failed lookup and lets the next call try again', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    const load = vi
      .fn<() => Promise<ReturnType<typeof verified>>>()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce(verified());
    await expect(cache.resolve('a', 0, load)).rejects.toThrow('down');
    await expect(cache.resolve('a', 1, load)).resolves.toMatchObject({ allowedCidrs: null });
  });

  it('never trusts a key past its own expiry', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    const load = vi.fn<() => Promise<ReturnType<typeof verified>>>(async () =>
      verified(new Date(5_000)),
    );
    await cache.resolve('a', 0, load);
    await cache.resolve('a', 5_000, load);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('drops the oldest key when it is full', async () => {
    const cache = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 2 });
    const load = vi.fn<() => Promise<ReturnType<typeof verified>>>(async () => verified());
    await cache.resolve('a', 0, load);
    await cache.resolve('b', 0, load);
    await cache.resolve('c', 0, load);
    expect(load).toHaveBeenCalledTimes(3);
    await cache.resolve('a', 1, load);
    expect(load).toHaveBeenCalledTimes(4);
    await cache.resolve('c', 1, load);
    expect(load).toHaveBeenCalledTimes(4);
  });

  it('asks every time when the time is zero, and clear forgets what is held', async () => {
    const off = createProjectKeyCache({ ttlSeconds: 0, maxEntries: 10 });
    const load = vi.fn<() => Promise<ReturnType<typeof verified>>>(async () => verified());
    await off.resolve('a', 0, load);
    await off.resolve('a', 0, load);
    expect(load).toHaveBeenCalledTimes(2);

    const on = createProjectKeyCache({ ttlSeconds: 30, maxEntries: 10 });
    await on.resolve('a', 0, load);
    on.clear();
    await on.resolve('a', 1, load);
    expect(load).toHaveBeenCalledTimes(4);
  });
});
