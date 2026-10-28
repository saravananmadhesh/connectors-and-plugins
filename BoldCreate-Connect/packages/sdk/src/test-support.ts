import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

export interface Call {
  method: string;
  url: URL;
  headers: Record<string, string>;
  body: unknown;
}

export type Reply = Response | (() => Response | Promise<Response>) | Error;

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });

export const empty = (status = 204, headers: Record<string, string> = {}): Response =>
  new Response(null, { status, headers });

export const bytes = (
  data: Uint8Array,
  status = 200,
  headers: Record<string, string> = {},
): Response => new Response(data as Uint8Array<ArrayBuffer>, { status, headers });

export const failure = (status: number, code: string, message = 'No.'): Response =>
  json({ error: { code, message, requestId: 'req_1' } }, status);

/**
 * A fetch that answers from a list of routes `METHOD /path`, in the order given for repeated
 * calls, and records every call it receives.
 */
export function fakeFetch(
  routes: Record<string, Reply | Reply[]>,
  fallback?: (key: string) => Reply,
) {
  const calls: Call[] = [];
  const queues = new Map<string, Reply[]>(
    Object.entries(routes).map(([key, value]) => [
      key,
      Array.isArray(value) ? [...value] : [value],
    ]),
  );
  const impl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(input));
    const method = init?.method ?? 'GET';
    const headers = Object.fromEntries(
      Object.entries((init?.headers ?? {}) as Record<string, string>).map(([k, v]) => [
        k.toLowerCase(),
        v,
      ]),
    );
    const body = typeof init?.body === 'string' ? JSON.parse(init.body) : undefined;
    calls.push({ method, url, headers, body });
    const key = `${method} ${url.pathname}`;
    const queue = queues.get(key) ?? (fallback ? [fallback(key)] : undefined);
    if (!queue) throw new Error(`No reply set for ${key}`);
    const reply = queue.length > 1 ? (queue.shift() as Reply) : (queue[0] as Reply);
    if (reply instanceof Error) throw reply;
    return typeof reply === 'function' ? reply() : reply.clone();
  }) as typeof fetch;
  return { fetch: impl, calls };
}

const BLOCK = 512;
const octal = (value: number, length: number) => value.toString(8).padStart(length - 1, '0') + '\0';

export interface TarEntry {
  path: string;
  body?: Uint8Array;
  /** Tar type flag; `0` is a file. */
  type?: string;
}

/** A gzip-compressed ustar archive, with room for the entries a safe reader must refuse. */
export function tarGz(entries: TarEntry[]): Uint8Array {
  const chunks: Buffer[] = [];
  for (const entry of entries) {
    const body = Buffer.from(entry.body ?? new Uint8Array());
    const header = Buffer.alloc(BLOCK);
    header.write(entry.path, 0, 100, 'utf8');
    header.write(octal(0o644, 8), 100, 8, 'ascii');
    header.write(octal(0, 8), 108, 8, 'ascii');
    header.write(octal(0, 8), 116, 8, 'ascii');
    header.write(octal(body.length, 12), 124, 12, 'ascii');
    header.write(octal(0, 12), 136, 12, 'ascii');
    header.write('        ', 148, 8, 'ascii');
    header.write(entry.type ?? '0', 156, 1, 'ascii');
    header.write('ustar\0', 257, 6, 'ascii');
    header.write('00', 263, 2, 'ascii');
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
    chunks.push(header, body, Buffer.alloc((BLOCK - (body.length % BLOCK)) % BLOCK));
  }
  chunks.push(Buffer.alloc(BLOCK * 2));
  return gzipSync(Buffer.concat(chunks));
}

export const text = (value: string) => new TextEncoder().encode(value);

export const sha256 = (data: Uint8Array) => createHash('sha256').update(data).digest('hex');

/** An archive of files with its hash, as a component download. */
export function archiveOf(files: Record<string, string>) {
  const data = tarGz(Object.entries(files).map(([path, body]) => ({ path, body: text(body) })));
  return { data, sha256: sha256(data) };
}
