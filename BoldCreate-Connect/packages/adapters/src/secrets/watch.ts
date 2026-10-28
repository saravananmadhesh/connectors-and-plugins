import type { SecretValue } from '@boldcreate-integrations/ports';

export const DEFAULT_WATCH_INTERVAL_SECONDS = 60;

/**
 * Polls a secret and calls the handler when its version differs from the last one seen. The
 * first successful read is the baseline and does not call the handler; a failed read is
 * retried at the next tick. Reads never overlap, and the returned function stops the loop.
 */
export function pollSecret(
  read: () => Promise<SecretValue>,
  handler: (secret: SecretValue) => void,
  intervalSeconds: number = DEFAULT_WATCH_INTERVAL_SECONDS,
): () => void {
  let stopped = false;
  let timer: NodeJS.Timeout | undefined;
  let lastVersion: string | undefined;

  const tick = async (): Promise<void> => {
    try {
      const secret = await read();
      if (stopped) return;
      if (lastVersion !== undefined && secret.version !== lastVersion) handler(secret);
      lastVersion = secret.version;
    } catch {
      // The next tick reads again.
    }
    if (!stopped) {
      timer = setTimeout(() => void tick(), intervalSeconds * 1000);
      timer.unref();
    }
  };

  void tick();
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
  };
}
