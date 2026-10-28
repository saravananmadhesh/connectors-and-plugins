import type { ApiKeyResponse } from '@/lib/api';

/** Keys that still work; a revoked key is gone from the user's point of view. */
export function activeKeys(items: readonly ApiKeyResponse[]): ApiKeyResponse[] {
  return items.filter((key) => !key.revokedAt);
}
