/**
 * What the gateway asks the api for, one call each: the servers a key reaches, the credential
 * for one server, and the record of a call. The api checks the key again on every call. Any
 * failure to get an answer fails closed with `service_unavailable`.
 */
import type * as z from 'zod/v4';
import {
  AppError,
  GatewayAccessResponseSchema,
  GatewayServersResponseSchema,
  GatewayUsageResponseSchema,
  type ApiKeyPrincipal,
} from '@boldcreate-integrations/contracts';
import type { AccessResult, VisibleServer } from '@boldcreate-integrations/domain';
import type { WorkloadHeaders } from '@boldcreate-integrations/http-server';
import { keyOf } from './key-auth.js';

export interface GatewayRemote {
  servers: (principal: ApiKeyPrincipal, only?: string) => Promise<VisibleServer[]>;
  access: (
    principal: ApiKeyPrincipal,
    server: { installationId: string; componentId: string },
  ) => Promise<AccessResult>;
  usage: (
    principal: ApiKeyPrincipal,
    call: {
      server: string;
      tool: string;
      outcome: string;
      durationMs: number;
      requestId: string;
      ip?: string | undefined;
    },
  ) => Promise<void>;
}

export interface RemoteOptions {
  apiBaseUrl: string;
  workloadHeaders: WorkloadHeaders;
  timeoutMs?: number;
  fetch?: typeof fetch;
}

export function createGatewayRemote(options: RemoteOptions): GatewayRemote {
  const doFetch = options.fetch ?? fetch;

  async function post<S extends z.ZodType>(
    path: string,
    principal: ApiKeyPrincipal,
    body: Record<string, unknown>,
    schema: S,
    timeoutMs: number,
  ): Promise<z.infer<S>> {
    const key = keyOf(principal);
    if (!key) throw new AppError('service_unavailable');
    let response: Response;
    try {
      response = await doFetch(`${options.apiBaseUrl}/v1/gateway/${path}`, {
        method: 'POST',
        headers: { ...(await options.workloadHeaders()), 'content-type': 'application/json' },
        body: JSON.stringify({ key, ...body }),
        redirect: 'manual',
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new AppError('service_unavailable');
    }
    if (!response.ok) throw new AppError('service_unavailable');
    const parsed = schema.safeParse(await response.json().catch(() => null));
    if (!parsed.success) throw new AppError('service_unavailable');
    return parsed.data;
  }

  const timeout = options.timeoutMs ?? 3_000;
  // Opening a credential can include an OAuth refresh against the provider, so it gets longer.
  const accessTimeout = Math.max(timeout, 15_000);

  return {
    async servers(principal, only) {
      const { servers } = await post(
        'servers',
        principal,
        only === undefined ? {} : { only },
        GatewayServersResponseSchema,
        timeout,
      );
      return servers.map((server) => ({
        ...server,
        tools: server.tools.map(({ destructive, ...tool }) => ({
          ...tool,
          ...(destructive !== undefined ? { destructive } : {}),
        })),
      }));
    },
    access: (principal, server) =>
      post('access', principal, { ...server }, GatewayAccessResponseSchema, accessTimeout),
    async usage(principal, call) {
      await post('usage', principal, { ...call }, GatewayUsageResponseSchema, timeout);
    },
  };
}
