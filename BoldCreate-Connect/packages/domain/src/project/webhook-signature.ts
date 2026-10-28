/**
 * The signature a host checks on a webhook: HMAC-SHA256 over `<id>.<timestamp>.<rawBody>` with the
 * project's secret, in base64, sent as `v1,<signature>`. A header may carry several signatures
 * separated by spaces; any one that matches is enough. A timestamp outside the tolerance is
 * refused, so a captured request cannot be replayed later.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const WEBHOOK_SIGNATURE_VERSION = 'v1';
/** Seconds a timestamp may differ from the clock of the receiver. */
export const WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS = 300;

export function signWebhook(input: {
  secret: string;
  id: string;
  /** Seconds since the epoch, as sent in `webhook-timestamp`. */
  timestamp: number;
  body: string;
}): string {
  const digest = createHmac('sha256', input.secret)
    .update(`${input.id}.${input.timestamp}.${input.body}`)
    .digest('base64');
  return `${WEBHOOK_SIGNATURE_VERSION},${digest}`;
}

export function verifyWebhook(input: {
  secret: string;
  id: string;
  timestamp: string;
  signature: string;
  body: string;
  now?: Date;
  toleranceSeconds?: number;
}): boolean {
  if (!/^\d{1,12}$/.test(input.timestamp)) return false;
  const timestamp = Number(input.timestamp);
  const nowSeconds = Math.floor((input.now ?? new Date()).getTime() / 1000);
  const tolerance = input.toleranceSeconds ?? WEBHOOK_TIMESTAMP_TOLERANCE_SECONDS;
  if (Math.abs(nowSeconds - timestamp) > tolerance) return false;
  const expected = Buffer.from(
    signWebhook({ secret: input.secret, id: input.id, timestamp, body: input.body }),
  );
  return input.signature.split(' ').some((candidate) => {
    const given = Buffer.from(candidate);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
