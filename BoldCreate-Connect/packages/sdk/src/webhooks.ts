import type * as NodeCryptoModule from 'node:crypto';
import { ConnectError } from './errors.js';
import type { Http } from './http.js';
import type { Page, PageOptions, WebhookDelivery, WebhookEvent } from './types.js';

export const DEFAULT_TOLERANCE_SECONDS = 300;

export interface VerifyOptions {
  rawBody: string | Uint8Array;
  headers: Record<string, string | string[] | undefined>;
  secret: string;
  toleranceSeconds?: number | undefined;
  /** The time to compare with; tests set it. */
  now?: Date | undefined;
}

type NodeCrypto = typeof NodeCryptoModule;

/** The crypto module of the running Node, loaded on use so a browser bundle never pulls it in. */
function nodeCrypto(): NodeCrypto {
  const loaded = (
    globalThis as { process?: { getBuiltinModule?: (name: string) => unknown } }
  ).process?.getBuiltinModule?.('node:crypto');
  if (!loaded) {
    throw new ConnectError('Checking a webhook signature needs Node.', {
      code: 'unsupported_runtime',
      status: 0,
    });
  }
  return loaded as NodeCrypto;
}

function headerOf(headers: VerifyOptions['headers'], name: string): string | undefined {
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === name) return Array.isArray(value) ? value[0] : value;
  }
  return undefined;
}

const invalid = (message: string) =>
  new ConnectError(message, { code: 'webhook_invalid', status: 400 });

/**
 * Checks the signature and the age of a webhook and returns its body. The signature is HMAC-SHA256
 * over `<webhook-id>.<webhook-timestamp>.<raw body>` in base64, sent as `v1,<signature>`; a header
 * with several signatures passes when any one matches. Pass the body exactly as it arrived.
 */
export function verifyWebhook(options: VerifyOptions): WebhookEvent {
  const id = headerOf(options.headers, 'webhook-id');
  const timestamp = headerOf(options.headers, 'webhook-timestamp');
  const signature = headerOf(options.headers, 'webhook-signature');
  if (!id || !timestamp || !signature) throw invalid('The webhook headers are missing.');
  if (!/^\d{1,12}$/.test(timestamp)) throw invalid('The webhook timestamp is not valid.');

  const nowSeconds = Math.floor((options.now ?? new Date()).getTime() / 1000);
  const tolerance = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  if (Math.abs(nowSeconds - Number(timestamp)) > tolerance) {
    throw invalid('The webhook timestamp is outside the allowed time.');
  }

  const { createHmac, timingSafeEqual } = nodeCrypto();
  const body =
    typeof options.rawBody === 'string'
      ? options.rawBody
      : new TextDecoder().decode(options.rawBody);
  const expected = Buffer.from(
    `v1,${createHmac('sha256', options.secret).update(`${id}.${timestamp}.${body}`).digest('base64')}`,
  );
  const matches = signature.split(' ').some((candidate) => {
    const given = Buffer.from(candidate);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!matches) throw invalid('The webhook signature does not match.');

  try {
    return JSON.parse(body) as WebhookEvent;
  } catch {
    throw invalid('The webhook body is not JSON.');
  }
}

export function webhooksApi(http: Http) {
  return {
    verify: verifyWebhook,

    deliveries: (options: PageOptions & { status?: WebhookDelivery['status'] } = {}) =>
      http.json<Page<WebhookDelivery>>('GET', '/v1/project/webhook/deliveries', {
        query: { ...options },
      }),
  };
}
