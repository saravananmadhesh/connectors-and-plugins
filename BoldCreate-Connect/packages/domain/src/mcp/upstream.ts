/**
 * Speaks MCP over streamable HTTP to an upstream server: `initialize`, `tools/list`, `tools/call`.
 * Every request goes through an injected fetch, which in the services is the SSRF-guarded one, so
 * this module never opens a socket of its own.
 */
import { createHash } from 'node:crypto';
import type { McpToolRecord } from '@boldcreate-integrations/db';

export interface UpstreamRequest {
  method: 'GET' | 'POST';
  headers: Record<string, string>;
  body?: string;
}

export interface UpstreamResponse {
  status: number;
  headers: Headers;
  body: Buffer;
}

/** Fetches one URL; throws on a blocked address, a timeout or a transport failure. */
export type UpstreamFetch = (
  url: string,
  init: UpstreamRequest,
  options: { timeoutMs: number },
) => Promise<UpstreamResponse>;

export type UpstreamFailureCode =
  | 'upstream_unauthorized'
  | 'upstream_unavailable'
  | 'upstream_timeout'
  | 'upstream_protocol'
  | 'url_not_allowed';

export class UpstreamError extends Error {
  constructor(
    readonly code: UpstreamFailureCode,
    /** `WWW-Authenticate` of a 401, when the server sent one. */
    readonly challenge?: string,
  ) {
    super(code);
    this.name = 'UpstreamError';
  }
}

export const CONNECT_TIMEOUT_MS = 5_000;
export const DEFAULT_CALL_TIMEOUT_MS = 30_000;
export const MAX_CALL_TIMEOUT_MS = 120_000;
const PROTOCOL_VERSION = '2025-06-18';

export interface UpstreamTarget {
  url: string;
  /** Headers every request carries: the auth header and any the plugin declared. */
  headers: Record<string, string>;
}

interface JsonRpcReply {
  result?: unknown;
  error?: { code?: number; message?: string };
}

/** The reply may be plain JSON or an event stream; either way the first JSON-RPC message wins. */
function parseReply(response: UpstreamResponse): JsonRpcReply {
  const text = response.body.toString('utf8');
  const type = response.headers.get('content-type') ?? '';
  try {
    if (type.includes('text/event-stream')) {
      for (const block of text.split(/\r?\n\r?\n/)) {
        const data = block
          .split(/\r?\n/)
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.slice(5).trimStart())
          .join('\n');
        if (data) return JSON.parse(data) as JsonRpcReply;
      }
      throw new UpstreamError('upstream_protocol');
    }
    return JSON.parse(text) as JsonRpcReply;
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    throw new UpstreamError('upstream_protocol');
  }
}

function classify(status: number, response: UpstreamResponse): UpstreamError {
  if (status === 401 || status === 403) {
    return new UpstreamError(
      'upstream_unauthorized',
      response.headers.get('www-authenticate') ?? undefined,
    );
  }
  return new UpstreamError('upstream_unavailable');
}

async function send(
  fetcher: UpstreamFetch,
  target: UpstreamTarget,
  extra: Record<string, string>,
  payload: Record<string, unknown>,
  timeoutMs: number,
): Promise<UpstreamResponse> {
  let response: UpstreamResponse;
  try {
    response = await fetcher(
      target.url,
      {
        method: 'POST',
        headers: {
          ...target.headers,
          ...extra,
          'content-type': 'application/json',
          accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({ jsonrpc: '2.0', ...payload }),
      },
      { timeoutMs },
    );
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code === 'timeout') throw new UpstreamError('upstream_timeout');
    if (code === 'url_not_allowed' || code === 'redirect')
      throw new UpstreamError('url_not_allowed');
    throw new UpstreamError('upstream_unavailable');
  }
  if (response.status < 200 || response.status >= 300) throw classify(response.status, response);
  return response;
}

/** An open session on one upstream server. */
export interface UpstreamSession {
  listTools(): Promise<McpToolRecord[]>;
  callTool(
    name: string,
    args: Record<string, unknown>,
    timeoutMs?: number,
  ): Promise<{ content: unknown[]; isError: boolean }>;
}

/** Runs the handshake and returns a session; throws `UpstreamError` on any failure. */
export async function openSession(
  fetcher: UpstreamFetch,
  target: UpstreamTarget,
): Promise<UpstreamSession> {
  const init = await send(
    fetcher,
    target,
    {},
    {
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: { name: 'boldcreate-gateway', version: '1.0.0' },
      },
    },
    CONNECT_TIMEOUT_MS,
  );
  const reply = parseReply(init);
  if (reply.error || !reply.result) throw new UpstreamError('upstream_protocol');
  const sessionId = init.headers.get('mcp-session-id');
  const session: Record<string, string> = {
    'mcp-protocol-version': PROTOCOL_VERSION,
    ...(sessionId ? { 'mcp-session-id': sessionId } : {}),
  };
  // The acknowledgement has no reply; a server that rejects it is not worth failing over.
  await send(
    fetcher,
    target,
    session,
    { method: 'notifications/initialized' },
    CONNECT_TIMEOUT_MS,
  ).catch((error: unknown) => {
    if (error instanceof UpstreamError && error.code !== 'upstream_unavailable') throw error;
  });

  let counter = 1;
  return {
    async listTools() {
      const tools: McpToolRecord[] = [];
      let cursor: string | undefined;
      for (let page = 0; page < 20; page += 1) {
        counter += 1;
        const response = await send(
          fetcher,
          target,
          session,
          { id: counter, method: 'tools/list', params: cursor ? { cursor } : {} },
          DEFAULT_CALL_TIMEOUT_MS,
        );
        const message = parseReply(response);
        if (message.error) throw new UpstreamError('upstream_protocol');
        const result = (message.result ?? {}) as { tools?: unknown; nextCursor?: unknown };
        if (!Array.isArray(result.tools)) throw new UpstreamError('upstream_protocol');
        for (const raw of result.tools as Record<string, unknown>[]) {
          if (typeof raw['name'] !== 'string') continue;
          tools.push({
            name: raw['name'],
            description: typeof raw['description'] === 'string' ? raw['description'] : '',
            inputSchema:
              typeof raw['inputSchema'] === 'object' && raw['inputSchema'] !== null
                ? (raw['inputSchema'] as Record<string, unknown>)
                : { type: 'object' },
            ...(typeof (raw['annotations'] as { destructiveHint?: unknown } | undefined)
              ?.destructiveHint === 'boolean'
              ? {
                  destructive: (raw['annotations'] as { destructiveHint: boolean }).destructiveHint,
                }
              : {}),
          });
        }
        if (typeof result.nextCursor !== 'string' || result.nextCursor === '') break;
        cursor = result.nextCursor;
      }
      return tools;
    },
    async callTool(name, args, timeoutMs = DEFAULT_CALL_TIMEOUT_MS) {
      counter += 1;
      const response = await send(
        fetcher,
        target,
        session,
        { id: counter, method: 'tools/call', params: { name, arguments: args } },
        Math.min(timeoutMs, MAX_CALL_TIMEOUT_MS),
      );
      const message = parseReply(response);
      if (message.error) {
        return {
          content: [{ type: 'text', text: message.error.message ?? 'The tool failed.' }],
          isError: true,
        };
      }
      const result = (message.result ?? {}) as { content?: unknown; isError?: unknown };
      return {
        content: Array.isArray(result.content) ? result.content : [],
        isError: result.isError === true,
      };
    },
  };
}

/** Stable digest of a tool list, so a refresh that changed nothing is cheap to recognise. */
export function hashTools(tools: McpToolRecord[]): string {
  const ordered = [...tools].sort((a, b) => a.name.localeCompare(b.name));
  return createHash('sha256').update(JSON.stringify(ordered)).digest('hex');
}

/** Replaces `${NAME}` with the stored value; an unknown name is left as written. */
export function expandVariables(text: string, values: ReadonlyMap<string, string>): string {
  return text.replace(/\$\{([A-Za-z0-9_-]{1,64})\}/g, (whole, name: string) => {
    return values.get(name) ?? whole;
  });
}
