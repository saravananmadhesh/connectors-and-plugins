/**
 * Safe reading and writing of `.tar.gz` plugin archives. Reading refuses anything that could
 * write outside the plugin folder (absolute paths, `..`, backslashes, NUL) and enforces file
 * count and size caps while decompressing. Links and special files are skipped and reported.
 * Writing is deterministic: the same files always produce the same bytes.
 */
import { gunzipSync, gzipSync } from 'node:zlib';

export class IngestionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IngestionError';
  }
}

export interface ArchiveLimits {
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
}

export const DEFAULT_ARCHIVE_LIMITS: ArchiveLimits = {
  maxFiles: 2000,
  maxFileBytes: 5 * 1024 * 1024,
  maxTotalBytes: 50 * 1024 * 1024,
};

export interface SkippedItem {
  path: string;
  reason: string;
}

export interface ExtractedArchive {
  /** Relative path (forward slashes, top-level folder removed) to content. */
  files: Map<string, Buffer>;
  skipped: SkippedItem[];
}

const BLOCK = 512;

function readString(block: Buffer, start: number, length: number): string {
  const slice = block.subarray(start, start + length);
  const end = slice.indexOf(0);
  return slice.subarray(0, end === -1 ? slice.length : end).toString('utf8');
}

function readOctal(block: Buffer, start: number, length: number): number {
  const text = readString(block, start, length).trim();
  if (text === '') return 0;
  if (!/^[0-7]+$/.test(text)) throw new IngestionError('The archive is corrupt.');
  return Number.parseInt(text, 8);
}

function parsePaxPath(body: Buffer): string | undefined {
  let offset = 0;
  let found: string | undefined;
  while (offset < body.length) {
    const space = body.indexOf(0x20, offset);
    if (space === -1) break;
    const length = Number.parseInt(body.subarray(offset, space).toString('utf8'), 10);
    if (!Number.isInteger(length) || length <= 0)
      throw new IngestionError('The archive is corrupt.');
    const record = body.subarray(space + 1, offset + length - 1).toString('utf8');
    const eq = record.indexOf('=');
    if (eq !== -1 && record.slice(0, eq) === 'path') found = record.slice(eq + 1);
    offset += length;
  }
  return found;
}

/** Validates an entry path and drops the top-level folder GitHub adds. Returns null for the folder itself. */
function cleanPath(raw: string): string | null {
  if (raw.includes('\0') || raw.includes('\\')) {
    throw new IngestionError('The archive contains an unsafe path.');
  }
  if (raw.startsWith('/') || /^[A-Za-z]:/.test(raw)) {
    throw new IngestionError('The archive contains an unsafe path.');
  }
  const segments = raw.split('/').filter((segment) => segment !== '' && segment !== '.');
  if (segments.includes('..')) throw new IngestionError('The archive contains an unsafe path.');
  const rest = segments.slice(1);
  return rest.length === 0 ? null : rest.join('/');
}

export function extractTarGz(
  archive: Uint8Array,
  limits: ArchiveLimits = DEFAULT_ARCHIVE_LIMITS,
): ExtractedArchive {
  let tar: Buffer;
  try {
    tar = gunzipSync(archive, {
      // Content plus a header, padding and possible extended header per file.
      maxOutputLength: limits.maxTotalBytes + (limits.maxFiles + 1) * 2048 + 1024,
    });
  } catch {
    throw new IngestionError('The archive is not a valid, reasonably sized .tar.gz file.');
  }

  const files = new Map<string, Buffer>();
  const skipped: SkippedItem[] = [];
  let total = 0;
  let nextPath: string | undefined;
  let offset = 0;

  while (offset + BLOCK <= tar.length) {
    const header = tar.subarray(offset, offset + BLOCK);
    if (header.every((byte) => byte === 0)) break;
    const size = readOctal(header, 124, 12);
    const type = String.fromCharCode(header[156] === 0 ? 0x30 : (header[156] ?? 0x30));
    const bodyStart = offset + BLOCK;
    const bodyEnd = bodyStart + size;
    if (bodyEnd > tar.length) throw new IngestionError('The archive is truncated.');
    offset = bodyStart + Math.ceil(size / BLOCK) * BLOCK;

    if (type === 'x') {
      nextPath = parsePaxPath(tar.subarray(bodyStart, bodyEnd));
      continue;
    }
    if (type === 'g') continue;
    if (type === 'L') {
      nextPath = readString(tar.subarray(bodyStart, bodyEnd), 0, size);
      continue;
    }

    const prefix = readString(header, 345, 155);
    const name = readString(header, 0, 100);
    const fullName = nextPath ?? (prefix ? `${prefix}/${name}` : name);
    nextPath = undefined;

    const path = cleanPath(fullName);
    if (type === '5' || path === null) continue;
    if (type !== '0') {
      skipped.push({ path, reason: type === '2' || type === '1' ? 'link' : 'special file' });
      continue;
    }
    if (size > limits.maxFileBytes) {
      throw new IngestionError('The archive contains a file that is too large.');
    }
    total += size;
    if (files.size + 1 > limits.maxFiles || total > limits.maxTotalBytes) {
      throw new IngestionError('The archive contains too many files or is too large.');
    }
    files.set(path, Buffer.from(tar.subarray(bodyStart, bodyEnd)));
  }
  return { files, skipped };
}

function octal(value: number, length: number): string {
  return value.toString(8).padStart(length - 1, '0') + '\0';
}

/** Packs files into a gzip-compressed ustar archive, sorted by path, with fixed metadata. */
export function packTarGz(files: ReadonlyMap<string, Buffer>): Buffer {
  const chunks: Buffer[] = [];
  for (const path of [...files.keys()].sort()) {
    const body = files.get(path) as Buffer;
    let name = path;
    let prefix = '';
    if (Buffer.byteLength(name) > 100) {
      const cut = name.lastIndexOf('/', 155);
      if (cut === -1 || Buffer.byteLength(name.slice(cut + 1)) > 100) {
        throw new IngestionError('A file path is too long to archive.');
      }
      prefix = name.slice(0, cut);
      name = name.slice(cut + 1);
    }
    const header = Buffer.alloc(BLOCK);
    header.write(name, 0, 100, 'utf8');
    header.write(octal(0o644, 8), 100, 8, 'ascii');
    header.write(octal(0, 8), 108, 8, 'ascii');
    header.write(octal(0, 8), 116, 8, 'ascii');
    header.write(octal(body.length, 12), 124, 12, 'ascii');
    header.write(octal(0, 12), 136, 12, 'ascii');
    header.write('        ', 148, 8, 'ascii');
    header.write('0', 156, 1, 'ascii');
    header.write('ustar\0', 257, 6, 'ascii');
    header.write('00', 263, 2, 'ascii');
    header.write(prefix, 345, 155, 'utf8');
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
    chunks.push(header, body, Buffer.alloc((BLOCK - (body.length % BLOCK)) % BLOCK));
  }
  chunks.push(Buffer.alloc(BLOCK * 2));
  return gzipSync(Buffer.concat(chunks), { level: 9 });
}
