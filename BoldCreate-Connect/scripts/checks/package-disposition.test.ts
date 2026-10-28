import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  findUndispositionedPackages,
  listPackageFolders,
  parseDispositionRows,
} from './package-disposition.js';

const repoRoot = join(import.meta.dirname, '..', '..');
const temporaryRoots: string[] = [];

async function makeRepo(adr: string, packages: Record<string, boolean>): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'disposition-'));
  temporaryRoots.push(root);
  await mkdir(join(root, 'docs', 'architecture'), { recursive: true });
  await writeFile(join(root, 'docs', 'architecture', 'overview.md'), adr);
  await mkdir(join(root, 'packages'), { recursive: true });
  for (const [name, hasManifest] of Object.entries(packages)) {
    await mkdir(join(root, 'packages', name), { recursive: true });
    if (hasManifest) await writeFile(join(root, 'packages', name, 'package.json'), '{}');
  }
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe('package disposition', () => {
  it('has a row for every package folder in this repository', async () => {
    expect(await findUndispositionedPackages(repoRoot)).toEqual([]);
  });

  it('reports a package folder without a row', async () => {
    const adr = '## Packages\n\n| `known` | keep |\n';
    const root = await makeRepo(adr, { known: true, stray: true });
    expect(await findUndispositionedPackages(root)).toEqual(['stray']);
  });

  it('allows a row for a folder that does not exist yet', async () => {
    const adr = '## Packages\n\n| `known` | keep |\n| `future` | new |\n';
    const root = await makeRepo(adr, { known: true });
    expect(await findUndispositionedPackages(root)).toEqual([]);
  });

  it('ignores folders without a package manifest', async () => {
    const root = await makeRepo('## Packages\n', { empty: false });
    expect(await listPackageFolders(root)).toEqual([]);
  });

  it('ignores rows that appear before the appendix heading', () => {
    const adr = '| `early` | x |\n## Packages\n| `late` | y |\n';
    expect(parseDispositionRows(adr)).toEqual(['late']);
  });

  it('returns no rows when the appendix is missing', () => {
    expect(parseDispositionRows('# nothing here')).toEqual([]);
  });

  it('lists every real package in the architecture overview', async () => {
    expect(await findUndispositionedPackages(repoRoot)).toEqual([]);
  });

  it('carries the ADR checklist line in the pull request template', async () => {
    const template = await readFile(join(repoRoot, '.azure', 'pull_request_template.md'), 'utf8');
    expect(template).toContain(
      '- [ ] one-way-door decision => recorded in docs/architecture/decisions.md',
    );
  });
});
