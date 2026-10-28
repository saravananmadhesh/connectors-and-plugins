import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { checkTsconfigReferences } from './tsconfig-references.js';

const repoRoot = join(import.meta.dirname, '..', '..');
const temporaryRoots: string[] = [];

interface Fixture {
  rootRefs: string[];
  packages: string[];
  appRefs: string[];
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, JSON.stringify(value));
}

async function makeRepo(fixture: Fixture): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'tsconfig-refs-'));
  temporaryRoots.push(root);
  await writeJson(join(root, 'tsconfig.json'), {
    references: fixture.rootRefs.map((path) => ({ path: `./${path}` })),
  });
  for (const name of fixture.packages) {
    await writeJson(join(root, 'packages', name, 'tsconfig.json'), {});
    await writeJson(join(root, 'packages', name, 'package.json'), {
      name: `@boldcreate-integrations/${name}`,
    });
  }
  await writeJson(join(root, 'apps', 'api', 'tsconfig.json'), {
    references: fixture.appRefs.map((path) => ({ path: `../../${path}` })),
  });
  await writeJson(join(root, 'apps', 'api', 'package.json'), {
    name: '@boldcreate-integrations/api',
    dependencies: { '@boldcreate-integrations/domain': 'workspace:*', zod: 'catalog:' },
  });
  await writeJson(join(root, 'apps', 'web', 'client', 'tsconfig.json'), {});
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe('tsconfig references', () => {
  it('passes on this repository', async () => {
    expect(await checkTsconfigReferences(repoRoot)).toEqual([]);
  });

  it('passes on a consistent fixture, skipping the web sub-packages', async () => {
    const root = await makeRepo({
      rootRefs: ['packages/domain', 'apps/api'],
      packages: ['domain'],
      appRefs: ['packages/domain'],
    });
    expect(await checkTsconfigReferences(root)).toEqual([]);
  });

  it('names a package missing from the root references', async () => {
    const root = await makeRepo({
      rootRefs: ['apps/api'],
      packages: ['domain'],
      appRefs: ['packages/domain'],
    });
    expect(await checkTsconfigReferences(root)).toEqual([
      'packages/domain is missing from root tsconfig.json references',
    ]);
  });

  it('fails on a root reference to a folder without a tsconfig', async () => {
    const root = await makeRepo({
      rootRefs: ['packages/domain', 'apps/api', 'packages/ghost'],
      packages: ['domain'],
      appRefs: ['packages/domain'],
    });
    expect(await checkTsconfigReferences(root)).toEqual([
      'root tsconfig.json references packages/ghost, which has no tsconfig.json',
    ]);
  });

  it('names an imported workspace package the app tsconfig does not reference', async () => {
    const root = await makeRepo({
      rootRefs: ['packages/domain', 'apps/api'],
      packages: ['domain'],
      appRefs: [],
    });
    expect(await checkTsconfigReferences(root)).toEqual([
      'apps/api imports @boldcreate-integrations/domain but its tsconfig.json does not reference packages/domain',
    ]);
  });
});
