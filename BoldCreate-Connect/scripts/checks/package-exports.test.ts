import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { checkPackageExports } from './package-exports.js';

const repoRoot = join(import.meta.dirname, '..', '..');
const temporaryRoots: string[] = [];

async function makeRepo(exportsField: unknown): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'package-exports-'));
  temporaryRoots.push(root);
  await mkdir(join(root, 'packages', 'sample'), { recursive: true });
  await writeFile(
    join(root, 'packages', 'sample', 'package.json'),
    JSON.stringify({ name: '@boldcreate-integrations/sample', exports: exportsField }),
  );
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe('package exports', () => {
  it('passes on this repository, including every adapters subpath', async () => {
    expect(await checkPackageExports(repoRoot)).toEqual([]);
  });

  it('accepts a package with all three conditions', async () => {
    const root = await makeRepo({
      '.': { types: './src/index.ts', development: './src/index.ts', default: './dist/index.js' },
    });
    expect(await checkPackageExports(root)).toEqual([]);
  });

  it('fails on a fixture package without the development condition', async () => {
    const root = await makeRepo({ '.': { types: './src/index.ts', default: './dist/index.js' } });
    expect(await checkPackageExports(root)).toEqual([
      'packages/sample export . is missing the development condition',
    ]);
  });

  it('fails on a plain string entry', async () => {
    const root = await makeRepo({ '.': './src/index.ts' });
    expect(await checkPackageExports(root)).toEqual([
      'packages/sample export . must be an object with conditions',
    ]);
  });

  it('fails when a subpath entry misses a condition', async () => {
    const root = await makeRepo({
      '.': { types: './src/index.ts', development: './src/index.ts', default: './dist/index.js' },
      './extra': { development: './src/extra.ts', default: './dist/extra.js' },
    });
    expect(await checkPackageExports(root)).toEqual([
      'packages/sample export ./extra is missing the types condition',
    ]);
  });

  it('fails when the conditions point at the wrong folders', async () => {
    const root = await makeRepo({
      '.': { types: './src/index.ts', development: './dist/index.js', default: './src/index.ts' },
    });
    expect(await checkPackageExports(root)).toEqual([
      'packages/sample export . development condition must point into ./src/',
      'packages/sample export . default condition must point into ./dist/',
    ]);
  });

  it('fails on a package with no exports', async () => {
    const root = await makeRepo({});
    expect(await checkPackageExports(root)).toEqual(['packages/sample has no exports']);
  });
});
