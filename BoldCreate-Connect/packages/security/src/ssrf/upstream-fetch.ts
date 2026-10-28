import type { RequestInit } from 'undici';
import { guardedFetch } from './fetch.js';
import type { SsrfGuard } from './guard.js';

/** The shape the MCP client in the domain package expects; satisfied structurally. */
export type GuardedUpstreamFetch = (
  url: string,
  init: { method: 'GET' | 'POST'; headers: Record<string, string>; body?: string },
  options: { timeoutMs: number },
) => Promise<{ status: number; headers: Headers; body: Buffer }>;

/**
 * Binds the guard to outbound calls to an MCP server or its authorization server. A blocked
 * address, a redirect and a timeout surface as `SsrfError` with the matching code.
 */
export function createUpstreamFetch(guard: SsrfGuard): GuardedUpstreamFetch {
  return async (url, init, options) => {
    const request: RequestInit = {
      method: init.method,
      headers: init.headers,
      ...(init.body === undefined ? {} : { body: init.body }),
    };
    const response = await guardedFetch(guard, url, request, {
      purpose: 'mcp_upstream',
      timeoutMs: options.timeoutMs,
    });
    return { status: response.status, headers: response.headers, body: response.body };
  };
}
