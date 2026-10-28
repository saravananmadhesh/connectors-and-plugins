/**
 * Keep a local folder in step with the plugins installed for one BoldCreate API key.
 *
 * Three calls make up the whole protocol, so any agent runtime, command line tool or editor
 * extension can do the same:
 *
 *   GET  /v1/sync                          the list of plugins and their archives (ETag / 304)
 *   GET  /v1/plugin-versions/{id}/archive  one archive, checked against its sha256
 *   POST /v1/sync/reports                  optional: tell the service what was placed
 *
 * Only Node.js built-ins are used (Node 20 or newer). The key is read from the environment, is
 * sent only to the host you name, and is never printed or written to disk. Archives are treated
 * as untrusted data: the hash is checked, paths that leave the plugin folder are refused, links
 * and device files are skipped, and size limits apply while reading.
 *
 * Run `node boldcreate-integrations-sync.mjs --help` for the command line.
 */

import { createHash } from 'node:crypto';
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

export const MAX_FILES = 2000;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
export const MAX_ARCHIVE_BYTES = 100 * 1024 * 1024;
const MAX_MANIFEST_BYTES = 8 * 1024 * 1024;

const STATE_FILE = '.boldcreate-sync.json';
const MARKER_FILE = '.boldcreate-archive';
const ARCHIVE_PATH = /^\/v1\/plugin-versions\/[A-Za-z0-9_]{3,64}\/archive$/;
const RETRY_STATUSES = new Set([429, 502, 503, 504]);

/** Anything that stops a sync; the message never contains the key. */
export class SyncError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SyncError';
  }
}

const sleepFor = (seconds) => new Promise((done) => setTimeout(done, seconds * 1000));

/** The three calls, with retries for a busy service and no redirects. */
export class Client {
  #base;
  #key;
  #timeoutMs;
  #retries;
  #sleep;

  constructor(baseUrl, apiKey, { timeoutSeconds = 30, retries = 3, sleep = sleepFor } = {}) {
    let parsed;
    try {
      parsed = new URL(baseUrl);
    } catch {
      parsed = undefined;
    }
    if (!parsed || !['http:', 'https:'].includes(parsed.protocol)) {
      throw new SyncError('The service address must start with http:// or https://');
    }
    if (!apiKey || /[\r\n ]/.test(apiKey))
      throw new SyncError('The API key is missing or malformed');
    this.#base = baseUrl.replace(/\/+$/, '');
    this.#key = apiKey;
    this.#timeoutMs = timeoutSeconds * 1000;
    this.#retries = retries;
    this.#sleep = sleep;
  }

  async request(method, path, { headers = {}, body, maxBytes }) {
    const send = { authorization: `Bearer ${this.#key}`, ...headers };
    if (body !== undefined) send['content-type'] = 'application/json';
    for (let attempt = 0; attempt <= this.#retries; attempt += 1) {
      let res;
      let data;
      try {
        res = await fetch(this.#base + path, {
          method,
          headers: send,
          body,
          redirect: 'manual',
          signal: AbortSignal.timeout(this.#timeoutMs),
        });
        data = await readLimited(res, res.ok ? maxBytes : 64 * 1024);
      } catch (error) {
        if (error instanceof SyncError) throw error;
        if (attempt < this.#retries) {
          await this.#sleep(Math.min(2 ** attempt, 10));
          continue;
        }
        throw new SyncError(`The service could not be reached (${error?.name ?? 'Error'})`);
      }
      if (res.ok || res.status === 304)
        return { status: res.status, headers: res.headers, body: data };
      if (RETRY_STATUSES.has(res.status) && attempt < this.#retries) {
        await this.#sleep(retryDelay(res.headers.get('retry-after'), attempt));
        continue;
      }
      throw new SyncError(explain(res.status, data));
    }
    throw new SyncError('The service did not answer');
  }

  /** The manifest, or `{ manifest: null, etag }` when it has not changed. */
  async manifest({ etag, target, kinds } = {}) {
    const query = new URLSearchParams();
    if (target) query.set('target', target);
    if (kinds?.length) query.set('kinds', kinds.join(','));
    const text = query.toString();
    const res = await this.request('GET', `/v1/sync${text ? `?${text}` : ''}`, {
      headers: etag ? { 'if-none-match': etag } : {},
      maxBytes: MAX_MANIFEST_BYTES,
    });
    if (res.status === 304) return { manifest: null, etag };
    try {
      return { manifest: JSON.parse(res.body.toString('utf8')), etag: res.headers.get('etag') };
    } catch {
      throw new SyncError('The service sent a manifest that is not JSON');
    }
  }

  /** One archive; refused unless it is exactly what the manifest promised. */
  async archive(href, sha256, size) {
    if (typeof href !== 'string' || !ARCHIVE_PATH.test(href)) {
      throw new SyncError('The manifest points at an address that is not an archive');
    }
    if (!Number.isInteger(size) || size < 0 || size > MAX_ARCHIVE_BYTES) {
      throw new SyncError('The archive is larger than this client accepts');
    }
    const res = await this.request('GET', href, { maxBytes: size + 1 });
    if (res.body.length !== size) throw new SyncError('The archive has the wrong size');
    if (createHash('sha256').update(res.body).digest('hex') !== sha256) {
      throw new SyncError('The archive does not match its hash');
    }
    return res.body;
  }

  async report(applied, { skipped = [], target } = {}) {
    const payload = { applied, skipped, ...(target ? { target } : {}) };
    await this.request('POST', '/v1/sync/reports', {
      body: JSON.stringify(payload),
      maxBytes: 64 * 1024,
    });
  }
}

async function readLimited(res, limit) {
  const declared = Number(res.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > limit) {
    await res.body?.cancel();
    throw new SyncError('The service sent more data than expected');
  }
  const chunks = [];
  let total = 0;
  if (res.body) {
    for await (const chunk of res.body) {
      total += chunk.length;
      if (total > limit) throw new SyncError('The service sent more data than expected');
      chunks.push(chunk);
    }
  }
  return Buffer.concat(chunks);
}

function retryDelay(header, attempt) {
  if (header && /^\d+$/.test(header)) return Math.min(Number(header), 30);
  return Math.min(2 ** attempt, 10);
}

function explain(status, body) {
  let code = '';
  try {
    code = JSON.parse(body.toString('utf8')).error.code ?? '';
  } catch {
    code = '';
  }
  const hint =
    {
      401: 'the key is wrong, revoked or expired',
      403: 'the key lacks the artifact:sync or artifact:download permission',
      404: 'not found, or not visible to this key',
      416: 'the requested range is not valid',
    }[status] ?? 'the service refused the request';
  return `The service answered ${status}${code ? ` ${code}` : ''}: ${hint}`;
}

// ── Extraction ───────────────────────────────────────────────────────────────

/** A safe relative path, or `null` when the member must be refused. */
export function clean(name) {
  if (!name || name.includes('\0') || name.includes('\\') || name.startsWith('/')) return null;
  const parts = name.split('/').filter((part) => part !== '' && part !== '.');
  if (parts.length === 0 || parts.includes('..')) return null;
  if (/^[A-Za-z]:/.test(parts[0])) return null;
  return parts.join('/');
}

const text = (block, from, length) => {
  const slice = block.subarray(from, from + length);
  const end = slice.indexOf(0);
  return slice.subarray(0, end === -1 ? length : end).toString('utf8');
};

function octal(block, from, length) {
  const value = text(block, from, length).trim();
  if (value === '' || !/^[0-7]+$/.test(value))
    throw new SyncError('The archive is not a readable .tar.gz file');
  return parseInt(value, 8);
}

/** Files of a `.tar.gz` archive and the notes about what was left out. */
export function readArchive(data) {
  let tar;
  try {
    tar = gunzipSync(data, { maxOutputLength: MAX_TOTAL_BYTES + MAX_FILES * 1024 + 1024 * 1024 });
  } catch {
    throw new SyncError('The archive is not a readable .tar.gz file');
  }
  const files = new Map();
  const notes = [];
  let total = 0;
  let longName = null;
  let paxName = null;
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const size = octal(header, 124, 12);
    const kind = String.fromCharCode(header[156] || 48);
    const bodyStart = offset + 512;
    if (bodyStart + size > tar.length)
      throw new SyncError('The archive is not a readable .tar.gz file');
    const body = tar.subarray(bodyStart, bodyStart + size);
    offset = bodyStart + Math.ceil(size / 512) * 512;

    if (kind === 'L') {
      longName = text(body, 0, body.length);
      continue;
    }
    if (kind === 'x') {
      const match = /\d+ path=([^\n]*)\n/.exec(body.toString('utf8'));
      if (match) paxName = match[1];
      continue;
    }
    if (kind === 'g') continue;

    const prefix = text(header, 345, 155);
    const base = text(header, 0, 100);
    const name = paxName ?? longName ?? (prefix ? `${prefix}/${base}` : base);
    longName = null;
    paxName = null;
    if (kind === '5') continue;
    const safe = clean(name);
    if (safe === null)
      throw new SyncError('The archive holds a path that leaves the plugin folder');
    if (kind !== '0' && kind !== '\0') {
      notes.push(`skipped ${safe}: not a regular file`);
      continue;
    }
    if (size > MAX_FILE_BYTES) throw new SyncError('The archive holds a file that is too large');
    total += size;
    if (total > MAX_TOTAL_BYTES || files.size >= MAX_FILES) {
      throw new SyncError('The archive holds more than this client accepts');
    }
    files.set(safe, Buffer.from(body));
  }
  return { files, notes };
}

/** A folder name for a plugin; never empty and never a path. */
export function folderName(pluginName) {
  const cleaned = String(pluginName)
    .replace(/[^A-Za-z0-9._-]/g, '_')
    .replace(/^\.+|\.+$/g, '');
  return (cleaned || 'plugin').slice(0, 100);
}

/** Put a plugin's files in `root/name`, replacing any earlier copy in one step. */
export function place(files, root, name, versions) {
  const final = join(root, name);
  const staging = join(root, `.${name}.incoming`);
  const previous = join(root, `.${name}.previous`);
  for (const leftover of [staging, previous]) rmSync(leftover, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });
  try {
    for (const [relative, content] of files) {
      const target = join(staging, ...relative.split('/'));
      mkdirSync(join(target, '..'), { recursive: true });
      writeFileSync(target, content);
    }
    writeFileSync(join(staging, MARKER_FILE), JSON.stringify(versions));
    if (exists(final)) renameSync(final, previous);
    renameSync(staging, final);
  } catch (error) {
    rmSync(staging, { recursive: true, force: true });
    if (exists(previous) && !exists(final)) renameSync(previous, final);
    throw error;
  }
  rmSync(previous, { recursive: true, force: true });
}

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function readJson(path) {
  try {
    const value = JSON.parse(readFileSync(path, 'utf8'));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

const marker = (folder) => readJson(join(folder, MARKER_FILE));

// ── Sync ─────────────────────────────────────────────────────────────────────

function intact(root, plugins) {
  return plugins.every((plugin) => marker(join(root, plugin.dir))?.sha256 === plugin.sha256);
}

/** Folders that hold `<skill>/SKILL.md` files, for runtimes that load skills. */
export function skillDirs(root, plugins) {
  return plugins.map((plugin) => join(root, plugin.dir, 'skills')).filter((dir) => exists(dir));
}

/**
 * Bring `root` in line with the key's installed plugins.
 *
 * Unchanged revisions cost one request that answers 304. Archives are only downloaded when their
 * hash differs from what is on disk, and only folders this tool made are ever removed.
 */
export async function sync(client, root, { target, kinds, report = false } = {}) {
  root = resolve(root);
  mkdirSync(root, { recursive: true });
  const wanted = kinds?.length ? [...kinds] : undefined;
  const query = JSON.stringify([target ?? null, wanted ?? null]);
  const state = readJson(join(root, STATE_FILE)) ?? {};
  const same = state.query === query;
  const known = same && Array.isArray(state.plugins) ? state.plugins : [];
  let etag = same ? state.etag : undefined;
  if (etag && !intact(root, known)) etag = undefined; // something was deleted by hand

  const { manifest, etag: newEtag } = await client.manifest({ etag, target, kinds: wanted });
  if (manifest === null) {
    return {
      changed: false,
      revision: state.revision ?? null,
      pollAfterSeconds: Number(state.pollAfterSeconds ?? 300),
      applied: [],
      unchanged: [],
      removed: [],
      skippedByServer: [],
      warnings: [],
      plugins: known,
    };
  }

  const result = {
    changed: true,
    revision: manifest.revision ?? null,
    pollAfterSeconds: Number(manifest.pollAfterSeconds ?? 300),
    applied: [],
    unchanged: [],
    removed: [],
    skippedByServer: manifest.skipped ?? [],
    warnings: [],
    plugins: [],
  };
  const seen = new Map();
  for (const entry of manifest.entries ?? []) {
    const name = folderName(entry.pluginName);
    if (seen.has(name) && seen.get(name) !== entry.versionId) {
      result.warnings.push(`${entry.pluginName}: two entries share a folder; kept the first`);
      continue;
    }
    seen.set(name, entry.versionId);
    if (entry.yanked) {
      result.warnings.push(`${entry.pluginName} ${entry.version} was withdrawn by its publisher`);
    }
    result.plugins.push({
      dir: name,
      name: entry.pluginName,
      version: entry.version,
      versionId: entry.versionId,
      sha256: entry.sha256,
      components: entry.components ?? [],
    });
    if (marker(join(root, name))?.sha256 === entry.sha256) {
      result.unchanged.push(entry.pluginName);
      continue;
    }
    const data = await client.archive(entry.href, entry.sha256, Number(entry.sizeBytes));
    const { files, notes } = readArchive(data);
    for (const note of notes) result.warnings.push(`${entry.pluginName}: ${note}`);
    place(files, root, name, { sha256: entry.sha256, versionId: entry.versionId });
    result.applied.push({ versionId: entry.versionId, sha256: entry.sha256 });
  }

  for (const child of readdirSync(root, { withFileTypes: true })) {
    if (child.isDirectory() && !seen.has(child.name) && marker(join(root, child.name)) !== null) {
      rmSync(join(root, child.name), { recursive: true, force: true });
      result.removed.push(child.name);
    }
  }

  const temporary = join(root, `${STATE_FILE}.tmp`);
  writeFileSync(
    temporary,
    JSON.stringify({
      query,
      etag: newEtag,
      revision: result.revision,
      pollAfterSeconds: result.pollAfterSeconds,
      plugins: result.plugins,
    }),
  );
  renameSync(temporary, join(root, STATE_FILE));
  if (report && result.applied.length > 0) await client.report(result.applied, { target });
  return result;
}

// ── Command line ─────────────────────────────────────────────────────────────

export async function main(argv = process.argv.slice(2), env = process.env) {
  const out = (line) => process.stdout.write(`${line}\n`);
  const err = (line) => process.stderr.write(`${line}\n`);
  let args;
  try {
    args = parseArgs({
      args: argv,
      options: {
        url: { type: 'string', default: env.BOLDCREATE_INTEGRATIONS_URL },
        dir: { type: 'string', default: 'boldcreate-plugins' },
        target: { type: 'string' },
        kinds: { type: 'string' },
        report: { type: 'boolean', default: false },
        watch: { type: 'boolean', default: false },
        help: { type: 'boolean', default: false },
      },
    }).values;
  } catch (error) {
    err(`error: ${error.message}`);
    return 2;
  }
  if (args.help) {
    out(
      'Usage: node boldcreate-integrations-sync.mjs [--url <gateway>] [--dir <folder>] [--target <client>]\n' +
        '       [--kinds skill,rule] [--report] [--watch]\n' +
        'The API key is read from BOLDCREATE_INTEGRATIONS_API_KEY; the address from --url or BOLDCREATE_INTEGRATIONS_URL.',
    );
    return 0;
  }
  if (!args.url) {
    err('Set BOLDCREATE_INTEGRATIONS_URL or pass --url');
    return 2;
  }
  try {
    const client = new Client(args.url, env.BOLDCREATE_INTEGRATIONS_API_KEY ?? '');
    const kinds = (args.kinds ?? '').split(',').filter(Boolean);
    for (;;) {
      const result = await sync(client, args.dir, {
        target: args.target,
        kinds,
        report: args.report,
      });
      out(
        `revision ${result.revision}: ` +
          (result.changed
            ? `${result.applied.length} updated, ${result.unchanged.length} current, ${result.removed.length} removed`
            : 'unchanged'),
      );
      for (const warning of result.warnings) err(`warning: ${warning}`);
      if (!args.watch) return 0;
      await sleepFor(Math.max(30, result.pollAfterSeconds));
    }
  } catch (error) {
    if (error instanceof SyncError) {
      err(`error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await main();
}
