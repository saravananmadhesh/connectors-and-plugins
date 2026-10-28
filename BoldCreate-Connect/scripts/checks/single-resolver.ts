/**
 * Repository check: one function decides what a principal receives.
 *
 * `resolveDelivery` returns the effective installs and the tool policy. Sync, component download
 * and the gateway's server list call it and nothing else, so they cannot disagree. The functions
 * that pick the effective installs are called only from the resolver itself, and each of the three
 * entry points must call the resolver.
 */
import type { Finding } from './scan.js';
import { productionSources, readSource } from './source-scan.js';

const SCOPE = [/^apps\//, /^packages\//];
const DECIDING = /\b(?:effectiveInstallations|pickEffective)\s*\(/;
const DECIDERS = new Set([
  'packages/domain/src/delivery/visibility.ts',
  'packages/domain/src/delivery/resolve-delivery.ts',
]);
const ENTRY_POINTS = [
  'packages/domain/src/delivery/sync.ts',
  'packages/domain/src/delivery/archive.ts',
  'packages/domain/src/mcp/visible-servers.ts',
];

export function checkSource(file: string, text: string): Finding[] {
  const findings: Finding[] = [];
  if (!DECIDERS.has(file) && DECIDING.test(text)) {
    const offset = text.search(DECIDING);
    findings.push({
      rule: 'resolver/own-decision',
      file,
      line: text.slice(0, offset).split('\n').length,
      text: 'Installs are chosen by resolveDelivery only; call it instead',
    });
  }
  if (ENTRY_POINTS.includes(file) && !/\bresolveDelivery\s*\(/.test(text)) {
    findings.push({
      rule: 'resolver/entry-point',
      file,
      line: 1,
      text: 'This entry point must get its installs from resolveDelivery',
    });
  }
  return findings;
}

export function run(root: string): Finding[] {
  const files = productionSources(root, SCOPE);
  const missing = ENTRY_POINTS.filter((entry) => !files.includes(entry)).map((file): Finding => ({
    rule: 'resolver/entry-point',
    file,
    line: 1,
    text: 'The entry point is not where the check expects it',
  }));
  return [...missing, ...files.flatMap((file) => checkSource(file, readSource(root, file)))];
}
