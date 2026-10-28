import { fetch, type RequestInit } from 'undici';
import { createPinnedDispatcher } from './dispatcher.js';
import { SsrfError } from './errors.js';
import type { SsrfGuard } from './guard.js';
import { SSRF_PURPOSES, type SsrfPurpose } from './purposes.js';

export interface GuardedFetchOptions {
  purpose: SsrfPurpose;
  /** May lower, never raise, the purpose limit. */
  timeoutMs?: number;
  /** May lower, never raise, the purpose limit. */
  maxBytes?: number;
  allowedHosts?: string[];
}

export interface GuardedResponse {
  status: number;
  headers: Headers;
  body: Buffer;
  /** For `manual-return` purposes: the validated redirect target, or null. */
  redirectTo: URL | null;
}

/**
 * Fetches a URL through the guard. The body is buffered up to the byte cap. `Authorization` and
 * `Cookie` are only sent when the caller sets them on `init`; a redirect hop is a new call, so
 * nothing is forwarded across it.
 */
export async function guardedFetch(
  guard: SsrfGuard,
  raw: string,
  init: RequestInit,
  options: GuardedFetchOptions,
): Promise<GuardedResponse> {
  const limits = SSRF_PURPOSES[options.purpose];
  const maxBytes = Math.min(options.maxBytes ?? limits.maxBytes, limits.maxBytes);
  const timeoutMs = Math.min(options.timeoutMs ?? limits.timeoutMs, limits.timeoutMs);
  const checked = await guard.checkUrl(raw, {
    purpose: options.purpose,
    ...(options.allowedHosts ? { allowedHosts: options.allowedHosts } : {}),
  });
  const dispatcher = createPinnedDispatcher(guard, {
    purpose: options.purpose,
    ...(options.allowedHosts ? { allowedHosts: options.allowedHosts } : {}),
    pinned: { [checked.servername]: { address: checked.address, family: checked.family } },
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new SsrfError('timeout')), timeoutMs);
  try {
    let response;
    try {
      response = await fetch(checked.url, {
        ...init,
        redirect: 'manual',
        dispatcher,
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof SsrfError) throw error;
      if (controller.signal.aborted && controller.signal.reason instanceof SsrfError) {
        throw controller.signal.reason;
      }
      throw new SsrfError('url_not_allowed', 'dns');
    }

    const isRedirect = response.status >= 300 && response.status < 400;
    let redirectTo: URL | null = null;
    if (isRedirect) {
      if (limits.redirect === 'error') throw new SsrfError('redirect', 'redirect');
      const location = response.headers.get('location');
      if (location !== null) {
        try {
          const target = new URL(location, checked.url).toString();
          const next = await guard.checkUrl(target, {
            purpose: options.purpose,
            ...(options.allowedHosts ? { allowedHosts: options.allowedHosts } : {}),
          });
          redirectTo = next.url;
        } catch {
          throw new SsrfError('redirect', 'redirect');
        }
      }
    }

    const chunks: Uint8Array[] = [];
    let total = 0;
    if (response.body) {
      try {
        for await (const chunk of response.body) {
          total += chunk.byteLength;
          if (total > maxBytes) {
            controller.abort(new SsrfError('too_large'));
            throw new SsrfError('too_large');
          }
          chunks.push(chunk);
        }
      } catch (error) {
        if (error instanceof SsrfError) throw error;
        if (controller.signal.reason instanceof SsrfError) throw controller.signal.reason;
        throw error;
      }
    }
    return {
      status: response.status,
      headers: response.headers as unknown as Headers,
      body: Buffer.concat(chunks),
      redirectTo,
    };
  } finally {
    clearTimeout(timer);
    await dispatcher.close();
  }
}
