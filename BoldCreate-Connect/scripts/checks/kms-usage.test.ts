import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './kms-usage.js';

const root = resolve(import.meta.dirname, '../..');

describe('kms usage', () => {
  it.each([
    'await kms.unwrapKey({ keyId, keyVersion, wrapped, aad });',
    'const { unwrapKey } = kms;',
    'const port = { unwrapKey: async () => new Uint8Array() };',
  ])('flags %s', (code) => {
    const findings = checkSource('apps/worker/src/x.ts', code);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings[0]?.rule).toBe('kms/unwrap-outside-readers');
  });

  it('accepts wrapping and unrelated names', () => {
    const code = [
      'await kms.wrapKey({ plaintext, aad });',
      "const text = 'unwrapKey';",
      '// unwrapKey is documented here',
    ].join('\n');
    expect(checkSource('apps/worker/src/x.ts', code)).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
