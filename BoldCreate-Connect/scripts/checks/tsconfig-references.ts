import { readdir, readFile } from 'node:fs/promises';
import { join, posix } from 'node:path';

interface PackageManifest {
  name?: string;
  dependencies?: Record<string, string>;
}

interface TsconfigReferences {
  references?: { path: string }[];
}

const SCOPE = '@boldcreate-integrations/';

async function readJson<T>(path: string): Promise<T | null> {
  try {
    return JSON.parse((await readFile(path, 'utf8')).replace(/^﻿/, '')) as T;
  } catch {
    return null;
  }
}

async function listReferencedPackages(
  repoRoot: string,
  group: 'apps' | 'packages',
): Promise<string[]> {
  const entries = await readdir(join(repoRoot, group), { withFileTypes: true });
  const members: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (group === 'apps' && entry.name === 'web') continue;
    const tsconfig = await readJson<TsconfigReferences>(
      join(repoRoot, group, entry.name, 'tsconfig.json'),
    );
    if (tsconfig !== null) members.push(`${group}/${entry.name}`);
  }
  return members.sort();
}

function normalizeReference(path: string, from: string): string {
  return posix.normalize(posix.join(from, path)).replace(/^\.\//, '');
}

export async function checkTsconfigReferences(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const root = await readJson<TsconfigReferences>(join(repoRoot, 'tsconfig.json'));
  const rootRefs = new Set(
    (root?.references ?? []).map((ref) => normalizeReference(ref.path, '.')),
  );
  const packages = await listReferencedPackages(repoRoot, 'packages');
  const apps = await listReferencedPackages(repoRoot, 'apps');

  for (const member of [...packages, ...apps]) {
    if (!rootRefs.has(member))
      problems.push(`${member} is missing from root tsconfig.json references`);
  }
  for (const ref of rootRefs) {
    if (!(await readJson(join(repoRoot, ref, 'tsconfig.json')))) {
      problems.push(`root tsconfig.json references ${ref}, which has no tsconfig.json`);
    }
  }

  const packageByName = new Map<string, string>();
  for (const folder of packages) {
    const manifest = await readJson<PackageManifest>(join(repoRoot, folder, 'package.json'));
    if (manifest?.name !== undefined) packageByName.set(manifest.name, folder);
  }
  for (const app of apps) {
    const manifest = await readJson<PackageManifest>(join(repoRoot, app, 'package.json'));
    const tsconfig = await readJson<TsconfigReferences>(join(repoRoot, app, 'tsconfig.json'));
    const appRefs = new Set(
      (tsconfig?.references ?? []).map((ref) => normalizeReference(ref.path, app)),
    );
    for (const [name, spec] of Object.entries(manifest?.dependencies ?? {})) {
      if (!name.startsWith(SCOPE) || !spec.startsWith('workspace:')) continue;
      const folder = packageByName.get(name);
      if (folder !== undefined && !appRefs.has(folder)) {
        problems.push(`${app} imports ${name} but its tsconfig.json does not reference ${folder}`);
      }
    }
  }
  return problems;
}
