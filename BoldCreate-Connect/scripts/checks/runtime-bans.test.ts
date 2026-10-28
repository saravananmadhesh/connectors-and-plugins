import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, loadAllow, run } from './runtime-bans.js';

const root = resolve(import.meta.dirname, '../..');

describe('runtime bans', () => {
  it('flags a synchronous file read', () => {
    const findings = checkSource(
      'apps/api/src/x.ts',
      "import { readFileSync } from 'node:fs';\nreadFileSync('a');\n",
    );
    expect(findings.map((finding) => finding.line)).toEqual([1, 2]);
    expect(findings[0]?.rule).toBe('runtime/blocking-call');
  });

  it.each([
    'fs.writeFileSync(a, b)',
    'child_process.execSync(a)',
    'crypto.pbkdf2Sync(a, b, 1, 1, "x")',
    'scryptSync(a, b, 1)',
    'randomFillSync(buffer)',
    'generateKeyPairSync("ec")',
    'existsSync(a)',
  ])('flags %s', (code) => {
    expect(checkSource('apps/api/src/x.ts', code)).toHaveLength(1);
  });

  it('accepts the asynchronous forms', () => {
    const code = "import { readFile } from 'node:fs/promises';\nawait readFile('a');\n";
    expect(checkSource('apps/api/src/x.ts', code)).toEqual([]);
  });

  it('lists the startup-only modules that may block', () => {
    expect(loadAllow(root).files).toContain('packages/adapters/src/kms/local.ts');
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
