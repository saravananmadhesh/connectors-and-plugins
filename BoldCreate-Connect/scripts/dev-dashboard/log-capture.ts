/** Bounded local JSONL capture shared by all development child processes. */
import {
  closeSync,
  mkdirSync,
  openSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { StringDecoder } from 'node:string_decoder';
import type { ChildProcess } from 'node:child_process';
import { redactSecrets } from '../../packages/observability/src/redact.js';

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const MAX_LINE_CHARS = 64 * 1024;
const logsDir = fileURLToPath(new URL('./logs/', import.meta.url));
const levels: Record<number, string> = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal',
};

export interface LogRecord {
  runId: string;
  service: string;
  ts: string;
  severity: string;
  msg: string;
  stream: 'stdout' | 'stderr';
  requestId?: string;
  workflowId?: string;
  status?: number;
  statusClass?: string;
  [key: string]: unknown;
}

function scrubText(text: string, secrets: readonly string[]): string {
  let result = text;
  for (const secret of secrets) {
    if (secret.length >= 4) result = result.split(secret).join('[REDACTED]');
  }
  return result
    .replace(/\b(Bearer|Basic)\s+[A-Za-z0-9+/_.=~-]+/gi, '$1 [REDACTED]')
    .replace(/([a-z][a-z0-9+.-]*:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[REDACTED]@')
    .replace(
      /((?:password|token|secret|authorization|cookie|api[_-]?key)\s*[=:]\s*)(?:"[^"]*"|'[^']*'|[^\s,;&]+)/gi,
      '$1[REDACTED]',
    );
}

function scrubValue(value: unknown, secrets: readonly string[]): unknown {
  if (typeof value === 'string') return scrubText(value, secrets);
  if (Array.isArray(value)) return value.map((entry) => scrubValue(entry, secrets));
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, scrubValue(entry, secrets)]),
    );
  }
  return value;
}

export function parseLine(
  line: string,
  runId: string,
  service: string,
  stream: 'stdout' | 'stderr',
  secrets: readonly string[] = [],
): LogRecord {
  let fields: Record<string, unknown> = {};
  try {
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      fields = scrubValue(redactSecrets(value), secrets) as Record<string, unknown>;
    }
  } catch {
    // Non-JSON output remains searchable after text redaction.
  }
  const time = typeof fields['time'] === 'number' ? new Date(fields['time']) : new Date();
  const res = fields['res'];
  const code =
    res !== null && typeof res === 'object'
      ? (res as Record<string, unknown>)['statusCode']
      : fields['statusCode'];
  const status =
    typeof code === 'number' && Number.isInteger(code) && code >= 100 && code <= 599
      ? code
      : undefined;
  const record: LogRecord = {
    ...fields,
    runId,
    service,
    stream,
    ts: Number.isFinite(time.getTime()) ? time.toISOString() : new Date().toISOString(),
    severity:
      typeof fields['level'] === 'number'
        ? (levels[fields['level']] ?? 'info')
        : stream === 'stderr'
          ? 'error'
          : 'info',
    msg:
      typeof fields['msg'] === 'string'
        ? fields['msg']
        : Object.keys(fields).length
          ? JSON.stringify(fields)
          : scrubText(line.trim(), secrets),
  };
  delete record['status'];
  delete record['statusClass'];
  if (status !== undefined) {
    record.status = status;
    record.statusClass = `${Math.floor(status / 100)}xx`;
  }
  if (typeof fields['reqId'] === 'string') record.requestId = fields['reqId'];
  return record;
}

export interface LogCapture {
  filePath: string;
  write(record: LogRecord): void;
  close(): void;
}

/** Keep at most twenty runs, deleting files older than seven days at startup. */
export function createRunCapture(runId: string, directory = logsDir): LogCapture {
  if (!/^run-[a-zA-Z0-9-]+$/.test(runId)) throw new Error('Invalid log run identifier');
  mkdirSync(directory, { recursive: true });
  const files = readdirSync(directory)
    .filter((name) => /^run-.*\.jsonl$/.test(name))
    .map((name) => ({ path: join(directory, name), time: statSync(join(directory, name)).mtimeMs }))
    .sort((a, b) => b.time - a.time);
  files.forEach((file, index) => {
    if (index >= 19 || Date.now() - file.time > 7 * 24 * 60 * 60 * 1000) unlinkSync(file.path);
  });
  const filePath = join(directory, `${runId}.jsonl`);
  let fd: number | undefined = openSync(filePath, 'wx', 0o600);
  let bytes = 0;
  let failed = false;
  return {
    filePath,
    write(record) {
      if (fd === undefined || failed) return;
      const line = JSON.stringify(record) + '\n';
      const size = Buffer.byteLength(line);
      if (bytes + size > MAX_FILE_BYTES) {
        failed = true;
        process.stderr.write(
          '[dev] Log capture reached its 50 MiB limit; terminal output continues.\n',
        );
        return;
      }
      try {
        writeSync(fd, line);
        bytes += size;
      } catch {
        failed = true;
        process.stderr.write('[dev] Log file write failed; terminal output continues.\n');
      }
    },
    close() {
      if (fd !== undefined) {
        closeSync(fd);
        fd = undefined;
      }
    },
  };
}

export function attachCapture(
  child: ChildProcess,
  opts: { runId: string; service: string; capture: LogCapture; secrets?: readonly string[] },
): () => void {
  const flushers: Array<() => void> = [];
  for (const channel of ['stdout', 'stderr'] as const) {
    const decoder = new StringDecoder('utf8');
    let partial = '';
    let oversized = false;
    let ended = false;
    function emit() {
      if (oversized) partial = '[Oversized log line omitted]';
      if (partial.trim()) {
        const record = parseLine(partial, opts.runId, opts.service, channel, opts.secrets);
        process[channel].write(`[${opts.service}] ${record.msg}\n`);
        opts.capture.write(record);
      }
      partial = '';
      oversized = false;
    }
    function consume(text: string) {
      for (const part of text.split(/(?<=\n)/)) {
        const complete = part.endsWith('\n');
        if (!oversized) {
          partial += complete ? part.slice(0, -1) : part;
          if (partial.length > MAX_LINE_CHARS) {
            oversized = true;
            partial = '';
          }
        }
        if (complete) emit();
      }
    }
    function flush() {
      if (!ended) {
        ended = true;
        consume(decoder.end());
        emit();
      }
    }
    child[channel]?.on('data', (chunk: Buffer) => consume(decoder.write(chunk)));
    child[channel]?.once('end', flush);
    flushers.push(flush);
  }
  return () => flushers.forEach((flush) => flush());
}
