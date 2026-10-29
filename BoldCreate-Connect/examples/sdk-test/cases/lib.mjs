/**
 * Shared helpers for the TypeScript SDK cases in this folder. Not a test file.
 *
 * Every case file imports this module. It reads the keys that setup-local.mjs wrote, makes the
 * project client, records each case, and when the run ends prints "<passed>/<total> passed" and
 * writes the results to examples/sdk-test/.local/ (ts-results.json for a full run of run.mjs,
 * ts-results-<groups>.json when only some groups ran).
 *
 * Settings: SDK_TEST_SYNC_DIR (keep the synced files there; see syncRoot), SDK_TEST_BASE_URL (default http://localhost:3002, the gateway), SDK_TEST_STATE
 * (default examples/sdk-test/.local/state.json), SDK_TEST_ONLY=A,K (run only those groups).
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { ConnectClient, ConnectError } from '../../../packages/sdk/dist/index.js';

export const BASE = process.env.SDK_TEST_BASE_URL ?? 'http://localhost:3002';
const LOCAL = join(import.meta.dirname, '..', '.local');
const STATE = process.env.SDK_TEST_STATE ?? join(LOCAL, 'state.json');
const ONLY = process.env.SDK_TEST_ONLY?.split(',');
export const STANDIN_WEBHOOKS = process.env.SDK_TEST_WEBHOOK_LOG; // optional file the receiver writes
export const state = JSON.parse(await readFile(STATE, 'utf8'));
export const RUN = Date.now().toString(36);
export const uid = (name) => `ts-${RUN}-${name}`;
export const P = (name) => state.plugins[name];

const results = [];
export const line = (text) => process.stdout.write(`${text}\n`);

/** Runs one case. `fn` returns evidence; throwing fails the case. */
export async function test(id, title, fn) {
  if (ONLY && !ONLY.includes(id.match(/^[A-Z]+/)[0])) return;
  const started = Date.now();
  try {
    const evidence = await fn();
    results.push({
      id,
      title,
      result: 'pass',
      evidence: short(evidence),
      ms: Date.now() - started,
    });
    line(`PASS ${id} ${title}: ${short(evidence)}`);
  } catch (error) {
    const evidence = error instanceof Expected ? error.message : describe(error);
    results.push({ id, title, result: 'fail', evidence, ms: Date.now() - started });
    line(`FAIL ${id} ${title}: ${evidence}`);
  }
}

export class Expected extends Error {}
export const describe = (e) =>
  e instanceof ConnectError
    ? `${e.constructor.name} code=${e.code} status=${e.status} ${e.message}`
    : `${e?.constructor?.name ?? 'Error'} ${e?.message ?? e}`;
export const short = (v) => {
  const text = typeof v === 'string' ? v : JSON.stringify(v);
  return (text ?? 'undefined').slice(0, 400);
};
export function ok(condition, message) {
  if (!condition) throw new Expected(message);
}
/** Expects `fn` to reject with the given class and, when set, the code or status. */
export async function rejects(fn, { type = ConnectError, code, status } = {}) {
  try {
    await fn();
  } catch (error) {
    ok(error instanceof type, `expected ${type.name}, got ${describe(error)}`);
    if (code) ok(error.code === code, `expected code ${code}, got ${describe(error)}`);
    if (status !== undefined)
      ok(error.status === status, `expected status ${status}, got ${describe(error)}`);
    return `${error.constructor.name} ${error.code} ${error.status}`;
  }
  throw new Expected('expected an error, the call succeeded');
}
export const leaks = (text, secret) => typeof text === 'string' && secret && text.includes(secret);

export const connect = new ConnectClient({ apiKey: state.projectKey, baseUrl: BASE });

export async function rawGateway(method, path, token, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json, text/event-stream',
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    const data = text.split('\n').find((l) => l.startsWith('data:'));
    json = data ? JSON.parse(data.slice(5)) : text;
  }
  return { status: res.status, json, headers: res.headers };
}

/** One JSON-RPC call on an MCP server the way an agent would make it. */
export async function mcpCall(server, method, params, sessionId) {
  const res = await fetch(server.url, {
    method: 'POST',
    headers: {
      ...server.headers,
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      'mcp-protocol-version': '2025-06-18',
      ...(sessionId ? { 'mcp-session-id': sessionId } : {}),
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: Math.floor(Math.random() * 1e6), method, params }),
  });
  const text = await res.text();
  const data = text.trim().startsWith('{')
    ? JSON.parse(text)
    : JSON.parse((text.split('\n').find((l) => l.startsWith('data:')) ?? 'data:null').slice(5));
  return { status: res.status, data, sessionId: res.headers.get('mcp-session-id') ?? sessionId };
}

// ─── What several groups share ────────────────────────────────────────────────────────────────
// A group run on its own makes these itself; in a full run the first group that needs one makes it.

/** The host user most groups act on. Group D creates it; other groups create it if D did not run. */
export const userA = uid('alice');
const knownUsers = new Set();
export const markUser = (userId) => knownUsers.add(userId);
export async function ensureUser(userId) {
  if (knownUsers.has(userId)) return;
  await connect.create(userId);
  knownUsers.add(userId);
}

/** The id of a project MCP plugin's server component, read through users.plugins. */
export const mcpOf = async (userId, name) =>
  (await connect.users.plugins(userId)).find((p) => p.name === name)?.mcp[0]?.componentId;

let components;
/** The Context7 and DeepWiki server components (used by groups G, H and K). */
export async function mcpComponents() {
  if (!components) {
    const g = (await connect.create(uid('g'))).userId;
    components = {
      context7Component: await mcpOf(g, 'context7'),
      deepwikiComponent: await mcpOf(g, 'deepwiki'),
    };
  }
  return components;
}

const sessions = new Map();
/** One session per name, shared by the groups that use it (K, L and O use 'kate'). */
export async function sharedSession(name) {
  if (!sessions.has(name)) sessions.set(name, await connect.create(uid(name)));
  return sessions.get(name);
}

/**
 * The folder the sync groups (M, Q) write the synced plugin files into. By default a temporary
 * folder that is deleted when the run ends. Set SDK_TEST_SYNC_DIR to keep the files: each run then
 * writes to <SDK_TEST_SYNC_DIR>/ts-<run id>/, one subfolder per case (for example ts-…-mia/).
 */
const KEEP_SYNC = process.env.SDK_TEST_SYNC_DIR;
export const syncRoot = KEEP_SYNC
  ? join(resolve(KEEP_SYNC), `ts-${RUN}`)
  : await mkdtemp(join(tmpdir(), 'sdk-sync-'));
mkdirSync(syncRoot, { recursive: true });

// ─── Summary when the run ends ────────────────────────────────────────────────────────────────

let fullRun = false;
/** run.mjs calls this when it runs every group, so the results go to ts-results.json. */
export const markFullRun = () => (fullRun = true);
let written = false;
process.on('beforeExit', () => {
  if (written) return;
  written = true;
  const passed = results.filter((r) => r.result === 'pass').length;
  line(`\n${passed}/${results.length} passed`);
  const groups = [...new Set(results.map((r) => r.id.match(/^[A-Z]+/)[0]))].join('').toLowerCase();
  const file = fullRun && !ONLY ? 'ts-results.json' : `ts-results-${groups || 'none'}.json`;
  writeFileSync(
    join(LOCAL, file),
    `${JSON.stringify({ run: RUN, base: BASE, results }, null, 2)}\n`,
  );
  if (KEEP_SYNC) line(`synced files kept in ${syncRoot}`);
  else rmSync(syncRoot, { recursive: true, force: true });
  process.exitCode = passed === results.length ? 0 : 1;
});
