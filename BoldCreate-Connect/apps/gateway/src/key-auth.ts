/**
 * Checks a bearer key by asking the api, so the gateway does not need the database for it. Any
 * failure to get an answer fails closed with `service_unavailable`; a key is never admitted
 * because the api could not be reached.
 */
import {
  AppError,
  GatewayAuthenticateResponseSchema,
  type GatewayAuthenticateBody,
} from '@boldcreate-integrations/contracts';
import type { KeyIdentity } from '@boldcreate-integrations/domain';
import type { WorkloadHeaders } from '@boldcreate-integrations/http-server';

export interface ApiKeyAuthOptions {
  apiBaseUrl: string;
  workloadHeaders: WorkloadHeaders;
  /** Time allowed for the api to answer. */
  timeoutMs?: number;
  fetch?: typeof fetch;
}

const keys = new WeakMap<object, string>();

/** The bearer key a principal was admitted with, kept so later calls to the api can name it. */
export const keyOf = (principal: object): string | undefined => keys.get(principal);

export function createApiKeyAuthenticator(options: ApiKeyAuthOptions) {
  const doFetch = options.fetch ?? fetch;
  const timeoutMs = options.timeoutMs ?? 3_000;

  return async function authenticate(
    rawKey: string | null,
    ip: string | undefined,
  ): Promise<KeyIdentity | null> {
    if (!rawKey) return null;
    const body: GatewayAuthenticateBody = { key: rawKey, ...(ip ? { ip } : {}) };
    let response: Response;
    try {
      response = await doFetch(`${options.apiBaseUrl}/v1/gateway/authenticate`, {
        method: 'POST',
        headers: { ...(await options.workloadHeaders()), 'content-type': 'application/json' },
        body: JSON.stringify(body),
        redirect: 'manual',
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new AppError('service_unavailable');
    }
    if (!response.ok) throw new AppError('service_unavailable');
    const parsed = GatewayAuthenticateResponseSchema.safeParse(
      await response.json().catch(() => null),
    );
    if (!parsed.success) throw new AppError('service_unavailable');
    const { identity } = parsed.data;
    if (identity) keys.set(identity.principal, rawKey);
    return identity;
  };
}
