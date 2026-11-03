/**
 * Limits for a gateway that has no database of its own: it reads the values an administrator set
 * from the api (read only, numbers only) and keeps the last answer if the api cannot be reached.
 */
import {
  GatewayLimitsResponseSchema,
  type GatewayLimitsResponse,
} from '@boldcreate-integrations/contracts';
import type { LimitStore } from './limit-store.js';
import { LIMIT_DEFINITIONS } from '@boldcreate-integrations/limits';

export interface RemoteLimitsOptions {
  apiBaseUrl: string;
  workloadHeaders: () => Promise<Record<string, string>>;
  /** How long an answer is reused. */
  ttlMs?: number;
  timeoutMs?: number;
  fetch?: typeof fetch;
  now?: () => number;
}

export function createRemoteLimitStore(options: RemoteLimitsOptions): LimitStore {
  const doFetch = options.fetch ?? fetch;
  const now = options.now ?? Date.now;
  const ttlMs = options.ttlMs ?? 5_000;
  let values: GatewayLimitsResponse['values'] = {};
  let loadedAt = Number.NEGATIVE_INFINITY;
  let loading: Promise<void> | null = null;

  async function load(): Promise<void> {
    try {
      const response = await doFetch(`${options.apiBaseUrl}/v1/gateway/limits`, {
        method: 'GET',
        headers: await options.workloadHeaders(),
        redirect: 'manual',
        signal: AbortSignal.timeout(options.timeoutMs ?? 3_000),
      });
      if (!response.ok) return;
      const parsed = GatewayLimitsResponseSchema.safeParse(await response.json().catch(() => null));
      if (parsed.success) values = parsed.data.values;
    } catch {
      // Keep the last values: an unreachable api must not move a limit.
    } finally {
      // A failed read is retried after one interval, not on every call.
      loadedAt = now();
    }
  }

  return {
    async resolve(key) {
      if (now() - loadedAt >= ttlMs) {
        loading ??= load().finally(() => {
          loading = null;
        });
        await loading;
      }
      const stored = values[key];
      const definition = LIMIT_DEFINITIONS[key];
      if (stored !== undefined) {
        return { limit: stored, windowSeconds: definition.windowSeconds, source: 'global' };
      }
      return {
        limit: definition.default,
        windowSeconds: definition.windowSeconds,
        source: 'default',
      };
    },
    invalidate() {
      loadedAt = Number.NEGATIVE_INFINITY;
    },
  };
}
