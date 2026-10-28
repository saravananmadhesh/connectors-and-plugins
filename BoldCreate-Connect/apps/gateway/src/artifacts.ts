/**
 * Sync and archive downloads share the gateway's public host so an agent needs one address and
 * one key. The api owns the logic and the storage; this only forwards the call with the gateway's
 * workload identity and streams the answer back, relaying a fixed list of headers.
 */
import { Readable } from 'node:stream';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { WorkloadHeaders } from '@boldcreate-integrations/http-server';

export interface ArtifactProxyOptions {
  apiBaseUrl: string;
  workloadHeaders: WorkloadHeaders;
  /** Request headers handed to the api; the agent default unless a caller needs more. */
  requestHeaders?: readonly string[];
  /** Response headers relayed back; the agent default unless a caller needs more. */
  responseHeaders?: readonly string[];
  /** Methods whose JSON body is forwarded; `POST` only unless a caller needs more. */
  bodyMethods?: readonly string[];
  /** Time allowed until the api starts answering; the body then streams without a cap. */
  headersTimeoutMs?: number;
  fetch?: typeof fetch;
}

/** Request headers the api needs from the agent; everything else stays behind. */
const FORWARD_REQUEST: readonly string[] = [
  'authorization',
  'if-none-match',
  'range',
  'if-range',
  'accept',
];

/** Response headers relayed to the agent; never `set-cookie` or anything internal. */
const RELAY_RESPONSE: readonly string[] = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'cache-control',
  'vary',
  'retry-after',
];

export function createArtifactProxy(options: ArtifactProxyOptions) {
  const doFetch = options.fetch ?? fetch;
  const headersTimeoutMs = options.headersTimeoutMs ?? 15_000;
  const requestHeaders = options.requestHeaders ?? FORWARD_REQUEST;
  const responseHeaders = options.responseHeaders ?? RELAY_RESPONSE;
  const bodyMethods = options.bodyMethods ?? ['POST'];

  return async function forward(
    request: FastifyRequest,
    reply: FastifyReply,
    path: string,
  ): Promise<FastifyReply> {
    const headers: Record<string, string> = { ...(await options.workloadHeaders()) };
    for (const name of requestHeaders) {
      const value = request.headers[name];
      if (typeof value === 'string') headers[name] = value;
    }
    if (request.clientIp) headers['x-forwarded-for'] = request.clientIp;
    const sendsBody = bodyMethods.includes(request.method);
    if (sendsBody) headers['content-type'] = 'application/json';

    const search = request.raw.url?.includes('?') ? `?${request.raw.url.split('?')[1] ?? ''}` : '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), headersTimeoutMs);
    reply.raw.once('close', () => controller.abort());

    let upstream: Response;
    try {
      upstream = await doFetch(`${options.apiBaseUrl}${path}${search}`, {
        method: request.method,
        headers,
        ...(sendsBody ? { body: JSON.stringify(request.body ?? {}) } : {}),
        redirect: 'manual',
        signal: controller.signal,
      });
    } catch {
      return reply.status(502).send({
        error: {
          code: 'upstream_unavailable',
          message: 'The service is unavailable.',
          requestId: request.id,
        },
      });
    } finally {
      clearTimeout(timer);
    }

    for (const name of responseHeaders) {
      const value = upstream.headers.get(name);
      if (value !== null) void reply.header(name, value);
    }
    if (!upstream.body || upstream.status === 204 || upstream.status === 304) {
      return reply.status(upstream.status).send();
    }
    return reply.status(upstream.status).send(Readable.fromWeb(upstream.body as never));
  };
}
