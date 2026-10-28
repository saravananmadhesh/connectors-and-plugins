import { describe, it, expect } from 'vitest';
import {
  ARGON2_MEMORY_KIB,
  ARGON2_PARALLELISM,
  ARGON2_TIME_COST,
  createPasswordHasher,
  hashPassword,
  verifyPassword,
} from './password.js';

describe('password hashing', () => {
  it('hashes a password and verifies it', async () => {
    const hash = await hashPassword('correct-horse-battery-staple');
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await verifyPassword(hash, 'correct-horse-battery-staple')).toBe(true);
  });

  it('rejects a wrong password', async () => {
    const hash = await hashPassword('correct-horse-battery-staple');
    expect(await verifyPassword(hash, 'wrong-password')).toBe(false);
  });

  it('produces different hashes for the same password', async () => {
    const h1 = await hashPassword('same-password');
    const h2 = await hashPassword('same-password');
    expect(h1).not.toBe(h2);
  });

  it('returns false for a malformed hash', async () => {
    expect(await verifyPassword('not-a-hash', 'password')).toBe(false);
  });
});

describe('createPasswordHasher', () => {
  const deferred = () => {
    let resolve!: () => void;
    const promise = new Promise<void>((r) => (resolve = r));
    return { promise, resolve };
  };

  it('exposes the Argon2id parameters', () => {
    expect([ARGON2_MEMORY_KIB, ARGON2_TIME_COST, ARGON2_PARALLELISM]).toEqual([65536, 3, 1]);
  });

  it('never exceeds the semaphore size with 100 parallel calls', async () => {
    let active = 0;
    let peak = 0;
    const hasher = createPasswordHasher({
      maxConcurrency: 4,
      hashFn: async (plaintext) => {
        active += 1;
        peak = Math.max(peak, active);
        await new Promise((resolve) => setTimeout(resolve, 1));
        active -= 1;
        return `hash:${plaintext}`;
      },
    });
    const results = await Promise.all(
      Array.from({ length: 100 }, (_, i) => hasher.hash(String(i))),
    );
    expect(results).toHaveLength(100);
    expect(peak).toBe(4);
  });

  it('serves the queue first in, first out', async () => {
    const order: string[] = [];
    const gate = deferred();
    const hasher = createPasswordHasher({
      maxConcurrency: 1,
      hashFn: async (plaintext) => {
        order.push(plaintext);
        if (plaintext === 'first') await gate.promise;
        return plaintext;
      },
    });
    const calls = ['first', 'second', 'third', 'fourth'].map((p) => hasher.hash(p));
    gate.resolve();
    await Promise.all(calls);
    expect(order).toEqual(['first', 'second', 'third', 'fourth']);
  });

  it('releases the permit when a call throws', async () => {
    const hasher = createPasswordHasher({
      maxConcurrency: 1,
      hashFn: async (plaintext) => {
        if (plaintext === 'bad') throw new Error('boom');
        return plaintext;
      },
    });
    await expect(hasher.hash('bad')).rejects.toThrow('boom');
    await expect(hasher.hash('good')).resolves.toBe('good');
  });

  it('verify returns false when the verifier throws', async () => {
    const hasher = createPasswordHasher({
      maxConcurrency: 1,
      verifyFn: async () => {
        throw new Error('malformed');
      },
    });
    expect(await hasher.verify('x', 'y')).toBe(false);
  });

  it('rejects a non-positive concurrency', () => {
    expect(() => createPasswordHasher({ maxConcurrency: 0 })).toThrow('at least 1');
  });
});
