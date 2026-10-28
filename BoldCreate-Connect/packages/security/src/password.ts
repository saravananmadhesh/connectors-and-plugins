/**
 * Password hashing and verification using Argon2id.
 * Only call from the API process — never in the browser or worker.
 */
import argon2 from 'argon2';

/** Argon2id parameters. Changing them is a one-way decision: stored hashes keep their own. */
export const ARGON2_MEMORY_KIB = 65536; // 64 MiB
export const ARGON2_TIME_COST = 3;
export const ARGON2_PARALLELISM = 1;

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: ARGON2_MEMORY_KIB,
  timeCost: ARGON2_TIME_COST,
  parallelism: ARGON2_PARALLELISM,
} as const;

/** Default bound on concurrent hash or verify calls (each needs 64 MiB). */
export const DEFAULT_ARGON2_MAX_CONCURRENCY = 4;

export interface PasswordHasher {
  hash(plaintext: string): Promise<string>;
  verify(hash: string, plaintext: string): Promise<boolean>;
}

export interface PasswordHasherOptions {
  maxConcurrency: number;
  /** Replaceable so tests can count concurrent calls without running Argon2. */
  hashFn?: (plaintext: string) => Promise<string>;
  verifyFn?: (hash: string, plaintext: string) => Promise<boolean>;
}

/** Counting semaphore with a FIFO queue; a permit is released even when the task throws. */
function createSemaphore(limit: number): <T>(task: () => Promise<T>) => Promise<T> {
  if (!Number.isInteger(limit) || limit < 1) throw new Error('maxConcurrency must be at least 1');
  let active = 0;
  const waiting: (() => void)[] = [];
  const release = (): void => {
    const next = waiting.shift();
    if (next) next();
    else active -= 1;
  };
  return async (task) => {
    if (active < limit) active += 1;
    else await new Promise<void>((resolve) => waiting.push(resolve));
    try {
      return await task();
    } finally {
      release();
    }
  };
}

/** Argon2id behind a semaphore, so a burst of logins cannot exhaust memory or the thread pool. */
export function createPasswordHasher(options: PasswordHasherOptions): PasswordHasher {
  const limited = createSemaphore(options.maxConcurrency);
  const hashFn = options.hashFn ?? ((plaintext) => argon2.hash(plaintext, ARGON2_OPTIONS));
  const verifyFn = options.verifyFn ?? ((hash, plaintext) => argon2.verify(hash, plaintext));
  return {
    hash: (plaintext) => limited(() => hashFn(plaintext)),
    async verify(hash, plaintext) {
      try {
        return await limited(() => verifyFn(hash, plaintext));
      } catch {
        return false;
      }
    },
  };
}

const defaultHasher = createPasswordHasher({ maxConcurrency: DEFAULT_ARGON2_MAX_CONCURRENCY });

export function hashPassword(plaintext: string): Promise<string> {
  return defaultHasher.hash(plaintext);
}

export function verifyPassword(hash: string, plaintext: string): Promise<boolean> {
  return defaultHasher.verify(hash, plaintext);
}
