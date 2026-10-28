import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const APPENDIX_HEADING = '## Packages';
const ROW_PATTERN = /^\|\s*`([a-z0-9-]+)`\s*\|/;

export async function listPackageFolders(repoRoot: string): Promise<string[]> {
  const entries = await readdir(join(repoRoot, 'packages'), { withFileTypes: true });
  const folders: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      await readFile(join(repoRoot, 'packages', entry.name, 'package.json'), 'utf8');
      folders.push(entry.name);
    } catch {
      // a folder without package.json is not a package
    }
  }
  return folders.sort();
}

export function parseDispositionRows(adr: string): string[] {
  const start = adr.indexOf(APPENDIX_HEADING);
  if (start === -1) return [];
  const rows: string[] = [];
  for (const line of adr.slice(start + APPENDIX_HEADING.length).split('\n')) {
    const match = ROW_PATTERN.exec(line);
    if (match?.[1] !== undefined) rows.push(match[1]);
  }
  return rows;
}

export async function findUndispositionedPackages(repoRoot: string): Promise<string[]> {
  const adr = await readFile(join(repoRoot, 'docs', 'architecture', 'overview.md'), 'utf8');
  const rows = new Set(parseDispositionRows(adr));
  return (await listPackageFolders(repoRoot)).filter((name) => !rows.has(name));
}
