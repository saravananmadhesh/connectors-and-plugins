import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { findCommittedSecrets, scanText } from './no-committed-secrets.js';

const repoRoot = join(import.meta.dirname, '..', '..');
const PW = ['Zq8x', 'Lm2Vt9'].join('');
const HEX_64 = 'ab12'.repeat(16);
const OLD_PASSWORD = ['dev', 'password'].join('');
const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe('no committed secrets', () => {
  // Reads every tracked file; under the full run it needs more than the default 5 s.
  it('finds nothing in the tracked files of this repository', { timeout: 60_000 }, () => {
    expect(findCommittedSecrets(repoRoot)).toEqual([]);
  });

  it('fails on a seeded hex secret in a file', async () => {
    const root = await mkdtemp(join(tmpdir(), 'secrets-check-'));
    temporaryRoots.push(root);
    await writeFile(join(root, 'seed.env'), `NODE_ENV=development\nCOOKIE_SECRET=${HEX_64}\n`);

    expect(findCommittedSecrets(root, () => ['seed.env'])).toEqual([
      { file: 'seed.env', line: 2, reason: 'hex secret assigned to a secret name' },
    ]);
  });

  it('skips tracked files that no longer exist and binary files', async () => {
    const root = await mkdtemp(join(tmpdir(), 'secrets-check-'));
    temporaryRoots.push(root);
    await writeFile(join(root, 'image.bin'), Buffer.from([0, 1, 2]));

    expect(findCommittedSecrets(root, () => ['gone.txt', 'image.bin'])).toEqual([]);
  });

  describe('scanText', () => {
    it('flags quoted, JSON and TypeScript assignments', () => {
      for (const line of [
        `const SIGNING_KEY = '${HEX_64}';`,
        `"db_password": "${HEX_64}"`,
        `export API_KEY: ${HEX_64}`,
      ]) {
        expect(scanText('a.ts', line)).toHaveLength(1);
      }
    });

    it('flags the old development password', () => {
      expect(scanText('a.ts', `postgresql://app:${OLD_PASSWORD}@localhost/db`)).toEqual([
        { file: 'a.ts', line: 1, reason: 'hardcoded development password' },
      ]);
    });

    it('flags a whole API key of any kind but not a bare key id or a placeholder', () => {
      const secret = 'Zx9'.repeat(15);
      for (const prefix of ['fyk_', 'plk_', 'ptk_']) {
        expect(
          scanText('a.ts', `Authorization: Bearer ${prefix}0123456789abcdef.${secret}`),
        ).toEqual([{ file: 'a.ts', line: 1, reason: 'a whole API key' }]);
      }
      expect(scanText('a.md', 'the key id ptk_0123456789abcdef is public')).toEqual([]);
      expect(scanText('a.md', 'Bearer ptk_0123456789abcdef.<secret>')).toEqual([]);
      expect(scanText('a.ts', `const FIXTURE_KEY = 'ptk_0123456789abcdef.${secret}'`)).toEqual([]);
    });

    it('flags a URL that carries a password but not placeholders or local hosts', () => {
      const flagged = [{ file: 'a.yaml', line: 1, reason: 'a URL with an embedded password' }];
      expect(scanText('a.yaml', `url: postgresql://admin:${PW}@10.1.2.3:5432/db`)).toEqual(flagged);
      expect(scanText('a.yaml', `REDIS_URL: redis://:${PW}@cache.internal:6379`)).toEqual(flagged);
      for (const line of [
        'postgresql://user:${PASSWORD}@db.internal/app',
        'postgresql://user:REPLACE_ME_NOW@db.internal/app',
        `postgresql://app:${PW}@localhost:5432/app`,
        'https://u:p@api.test',
        'postgresql://<user>:<password>@host/db',
      ]) {
        expect(scanText('a.md', line)).toEqual([]);
      }
    });

    it('ignores a hex value that is not assigned to a secret name', () => {
      expect(scanText('a.ts', `sha256: '${HEX_64}'`)).toEqual([]);
      expect(scanText('a.ts', `const TOKEN_FIXTURE = '${HEX_64}'`)).toEqual([]);
    });

    it('ignores a shorter value and a missing value', () => {
      expect(scanText('a.ts', `COOKIE_SECRET=${HEX_64.slice(1)}`)).toEqual([]);
      expect(scanText('a.ts', 'COOKIE_SECRET=')).toEqual([]);
    });

    it('exempts deliberately seeded fixtures and reference paths', () => {
      expect(scanText('a.test.ts', `const FIXTURE_SECRET = '${HEX_64}';`)).toEqual([]);
      expect(scanText('docs/reference/x.md', `COOKIE_SECRET=${HEX_64}`)).toEqual([]);
      expect(scanText('pnpm-lock.yaml', `KEY=${HEX_64}`)).toEqual([]);
    });
  });
});
