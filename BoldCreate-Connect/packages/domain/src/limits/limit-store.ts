import { limitSettingTable, type Executor } from '@boldcreate-integrations/db';
import { isLimitKey, type LimitKey } from '@boldcreate-integrations/limits';
import type { ClockPort } from '@boldcreate-integrations/ports';
import {
  buildSnapshot,
  resolveLimit,
  type LimitSnapshot,
  type LimitSubject,
  type ResolvedLimit,
} from './resolve-limit.js';

export interface LimitStoreOptions {
  db: Executor;
  clock: ClockPort;
  /** How long a loaded set of values is served before it is read again. */
  ttlSeconds: number;
  /** Told when a refresh fails, so the fault is reported without failing the request. */
  onRefreshError?: ((error: unknown) => void) | undefined;
}

export interface LimitStore {
  /** The value for a subject. Never throws: a failed read serves the last values, then the built-ins. */
  resolve(key: LimitKey, subject: LimitSubject): Promise<ResolvedLimit>;
  /** Drops the loaded values so the next call reads again. */
  invalidate(): void;
}

/**
 * Serves limits from one in-process snapshot of the whole `limit_setting` table. A project with
 * no override costs no query, a burst after expiry causes one read, and a failed read keeps the
 * previous snapshot (or the built-ins on a cold start) so a limit is never unbounded.
 */
export function createLimitStore(options: LimitStoreOptions): LimitStore {
  const { db, clock, ttlSeconds, onRefreshError } = options;
  let snapshot: LimitSnapshot = buildSnapshot([]);
  let expiresAt = 0;
  let inFlight: Promise<void> | null = null;

  const load = async (): Promise<void> => {
    try {
      const rows = await db.select().from(limitSettingTable);
      snapshot = buildSnapshot(rows);
    } catch (error) {
      onRefreshError?.(error);
    } finally {
      // A failed read also waits out the interval, so an outage does not turn into a read per call.
      expiresAt = clock.nowMs() + ttlSeconds * 1000;
      inFlight = null;
    }
  };

  return {
    async resolve(key, subject) {
      if (!isLimitKey(key)) throw new Error(`Unknown limit: ${key}`);
      if (clock.nowMs() >= expiresAt) {
        inFlight ??= load();
        await inFlight;
      }
      return resolveLimit(snapshot, key, subject, clock.now());
    },
    invalidate() {
      expiresAt = 0;
    },
  };
}
