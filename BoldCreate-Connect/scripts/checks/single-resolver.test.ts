import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './single-resolver.js';

const root = resolve(import.meta.dirname, '../..');

describe('one resolver', () => {
  it.each([
    'const rows = await effectiveInstallations(tx, principal);',
    'return pickEffective(rows);',
    'const picked = pickEffective (rows);',
  ])('flags a decision made outside the resolver: %s', (code) => {
    const findings = checkSource('apps/gateway/src/mcp/other.ts', code);
    expect(findings.map((finding) => finding.rule)).toEqual(['resolver/own-decision']);
  });

  it('lets the resolver and its helper file use the deciding functions', () => {
    const code = 'await effectiveInstallations(tx, principal); pickEffective(rows);';
    expect(checkSource('packages/domain/src/delivery/resolve-delivery.ts', code)).toEqual([]);
    expect(checkSource('packages/domain/src/delivery/visibility.ts', code)).toEqual([]);
  });

  it.each([
    'packages/domain/src/delivery/sync.ts',
    'packages/domain/src/delivery/archive.ts',
    'packages/domain/src/mcp/visible-servers.ts',
  ])('flags an entry point that does not call the resolver: %s', (file) => {
    const findings = checkSource(file, 'const installs = await myOwnQuery(tx);');
    expect(findings.map((finding) => finding.rule)).toEqual(['resolver/entry-point']);
    expect(checkSource(file, 'await resolveDelivery(tx, principal);')).toEqual([]);
  });

  it('ignores a name that only contains the function name', () => {
    expect(checkSource('apps/api/src/x.ts', 'const myPickEffectiveCount = 3;')).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
