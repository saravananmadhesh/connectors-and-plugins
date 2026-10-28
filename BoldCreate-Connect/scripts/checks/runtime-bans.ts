/**
 * Repository check: no blocking calls in server code.
 *
 * Synchronous file, process and crypto calls block the event loop. They are banned in the code
 * that serves requests; startup-only modules are listed in `runtime-bans.allow.json`.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './scan.js';
import { parseSource, productionSources, readSource, walk } from './source-scan.js';

export const BANNED_CALLS = new Set([
  'readFileSync',
  'writeFileSync',
  'appendFileSync',
  'existsSync',
  'readdirSync',
  'statSync',
  'lstatSync',
  'mkdirSync',
  'mkdtempSync',
  'rmSync',
  'rmdirSync',
  'unlinkSync',
  'copyFileSync',
  'cpSync',
  'renameSync',
  'openSync',
  'readSync',
  'writeSync',
  'closeSync',
  'accessSync',
  'realpathSync',
  'symlinkSync',
  'readlinkSync',
  'chmodSync',
  'execSync',
  'execFileSync',
  'spawnSync',
  'pbkdf2Sync',
  'scryptSync',
  'randomFillSync',
  'generateKeyPairSync',
  'generatePrimeSync',
  'hkdfSync',
]);

export interface RuntimeBansAllow {
  /** Repository-relative paths of modules that only run at startup. */
  files: string[];
}

const SCOPE = [
  /^apps\/[^/]+\/src\//,
  /^apps\/web\/server\/src\//,
  /^packages\/(?:domain|http-server|adapters|credentials|security|db)\/src\//,
];

export function loadAllow(root: string): RuntimeBansAllow {
  return JSON.parse(
    readFileSync(join(root, 'scripts/checks/runtime-bans.allow.json'), 'utf8'),
  ) as RuntimeBansAllow;
}

export function checkSource(file: string, text: string): Finding[] {
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];
  const seen = new Set<string>();
  walk(program, (node) => {
    if (node.type === 'Identifier' && BANNED_CALLS.has(node['name'] as string)) {
      const key = `${lineOf(node.start)}:${String(node['name'])}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({
        rule: 'runtime/blocking-call',
        file,
        line: lineOf(node.start),
        text: `${String(node['name'])} blocks the event loop`,
      });
    }
  });
  return findings;
}

export function run(root: string): Finding[] {
  const allowed = new Set(loadAllow(root).files);
  return productionSources(root, SCOPE)
    .filter((file) => !allowed.has(file))
    .flatMap((file) => checkSource(file, readSource(root, file)));
}
