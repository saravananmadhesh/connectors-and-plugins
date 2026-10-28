import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContext {
  requestId: string;
  /** Organization uuid. */
  tenantId?: string;
  /** Public 16-character key id, never the secret. */
  keyId?: string;
  userId?: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

/** Runs `fn` with `context` as the current context. The object itself is kept, so a caller that
 * holds it (one per request) sees later `setTenant` and `setKeyId` updates. */
export function runWithContext<T>(context: RequestContext, fn: () => T): T {
  return storage.run(context, fn);
}

export function getContext(): RequestContext | undefined {
  return storage.getStore();
}

/** Records the tenant of the current request; no-op outside a request. */
export function setTenant(orgId: string): void {
  const context = storage.getStore();
  if (context) context.tenantId = orgId;
}

/** Records the public key id of the current request; no-op outside a request. */
export function setKeyId(keyId: string): void {
  const context = storage.getStore();
  if (context) context.keyId = keyId;
}

export function setUserId(userId: string): void {
  const context = storage.getStore();
  if (context) context.userId = userId;
}
