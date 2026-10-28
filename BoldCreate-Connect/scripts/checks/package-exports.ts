import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface PackageManifest {
  exports?: Record<string, unknown>;
}

const REQUIRED_CONDITIONS = ['types', 'development', 'default'] as const;

async function readManifest(path: string): Promise<PackageManifest | null> {
  try {
    return JSON.parse((await readFile(path, 'utf8')).replace(/^﻿/, '')) as PackageManifest;
  } catch {
    return null;
  }
}

/**
 * Every workspace package publishes compiled output by default and its source under the
 * `development` condition, so tooling that sets the condition runs against source while an
 * image runs the build output. Entries that are plain strings or miss a condition fail.
 */
export async function checkPackageExports(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const entries = await readdir(join(repoRoot, 'packages'), { withFileTypes: true });
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const manifest = await readManifest(join(repoRoot, 'packages', entry.name, 'package.json'));
    if (manifest === null) continue;
    const label = `packages/${entry.name}`;
    const exportsField = manifest.exports;
    if (exportsField === undefined || Object.keys(exportsField).length === 0) {
      problems.push(`${label} has no exports`);
      continue;
    }
    for (const [subpath, value] of Object.entries(exportsField)) {
      if (typeof value !== 'object' || value === null) {
        problems.push(`${label} export ${subpath} must be an object with conditions`);
        continue;
      }
      const conditions = value as Record<string, unknown>;
      for (const condition of REQUIRED_CONDITIONS) {
        if (typeof conditions[condition] !== 'string') {
          problems.push(`${label} export ${subpath} is missing the ${condition} condition`);
        }
      }
      const source = conditions.development;
      const published = conditions.default;
      if (typeof source === 'string' && !source.startsWith('./src/')) {
        problems.push(`${label} export ${subpath} development condition must point into ./src/`);
      }
      if (typeof published === 'string' && !published.startsWith('./dist/')) {
        problems.push(`${label} export ${subpath} default condition must point into ./dist/`);
      }
    }
  }
  return problems;
}
