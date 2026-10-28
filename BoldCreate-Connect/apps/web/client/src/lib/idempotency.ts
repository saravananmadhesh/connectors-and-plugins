/**
 * One `Idempotency-Key` per user action. The key is remembered by what the action sends, so a
 * dialog that submits again after a network error or a conflict reuses it, while the next action
 * after a success, or after a failure the server answered for good, gets a new one.
 */
const keys = new Map<string, string>();

export function keyForAction(fingerprint: string): string {
  let key = keys.get(fingerprint);
  if (key === undefined) {
    key = crypto.randomUUID();
    keys.set(fingerprint, key);
  }
  return key;
}

export function forgetActionKey(fingerprint: string): void {
  keys.delete(fingerprint);
}

/** A failure after which the same action can safely be sent again with the same key. */
export function isRetryableFailure(error: { status?: number } | unknown): boolean {
  const status = (error as { status?: unknown } | null)?.status;
  if (typeof status !== 'number') return true;
  return status === 409 || status >= 500;
}
