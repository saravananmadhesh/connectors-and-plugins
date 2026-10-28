/**
 * A repository folder can list several plugins in a marketplace manifest instead of being one
 * plugin itself. This reads that list so each plugin can become a source of its own.
 */
import { IngestionError } from './tar.js';

const MARKETPLACE_MANIFESTS = [
  '.cursor-plugin/marketplace.json',
  '.claude-plugin/marketplace.json',
  'marketplace.json',
];
const PLUGIN_MANIFESTS = ['plugin.json', '.cursor-plugin/plugin.json'];
const FOLDER_SEGMENT = /^[A-Za-z0-9._-]+$/;
const MAX_ENTRIES = 500;

export interface CollectionEntry {
  /** Folder of the plugin, relative to the folder the manifest sits in. */
  folder: string;
}

export interface Collection {
  entries: CollectionEntry[];
  /** Entries that could not be used, each with a reason fit for the operator. */
  skipped: string[];
}

export const hasPluginManifest = (files: Map<string, Buffer>): boolean =>
  PLUGIN_MANIFESTS.some((path) => files.has(path));

/** Cleans a folder written as `./plugins/a/` into `plugins/a`; null when it is not a safe folder. */
function cleanFolder(value: string): string | null {
  const parts = value
    .replace(/\\/g, '/')
    .split('/')
    .filter((part) => part !== '' && part !== '.');
  if (parts.length === 0 || parts.length > 8) return null;
  return parts.every((part) => FOLDER_SEGMENT.test(part) && part !== '..') ? parts.join('/') : null;
}

/** The plugins a marketplace manifest lists, or null when the folder has no such manifest. */
export function readCollection(files: Map<string, Buffer>): Collection | null {
  const path = MARKETPLACE_MANIFESTS.find((candidate) => files.has(candidate));
  if (!path) return null;

  let manifest: unknown;
  try {
    manifest = JSON.parse((files.get(path) as Buffer).toString('utf8'));
  } catch {
    throw new IngestionError('The marketplace manifest is not valid JSON.');
  }
  const record = manifest as Record<string, unknown> | null;
  if (typeof record !== 'object' || record === null || !Array.isArray(record['plugins'])) {
    throw new IngestionError(
      'The marketplace manifest must list its plugins in a "plugins" array.',
    );
  }
  const metadata = record['metadata'];
  const rawRoot =
    typeof metadata === 'object' && metadata !== null
      ? (metadata as Record<string, unknown>)['pluginRoot']
      : undefined;
  const root = typeof rawRoot === 'string' ? (cleanFolder(rawRoot) ?? '') : '';

  const entries: CollectionEntry[] = [];
  const skipped: string[] = [];
  const seen = new Set<string>();
  for (const item of (record['plugins'] as unknown[]).slice(0, MAX_ENTRIES)) {
    const entry = item as Record<string, unknown> | null;
    const label =
      typeof entry === 'object' && entry !== null && typeof entry['name'] === 'string'
        ? entry['name'].slice(0, 40)
        : 'an entry';
    const source = typeof entry === 'object' && entry !== null ? entry['source'] : undefined;
    if (typeof source !== 'string') {
      skipped.push(`${label}: only plugins inside this repository are supported`);
      continue;
    }
    const cleaned = cleanFolder(root && !source.startsWith('.') ? `${root}/${source}` : source);
    if (cleaned === null) {
      skipped.push(`${label}: the folder is not a safe relative path`);
      continue;
    }
    if (seen.has(cleaned)) continue;
    seen.add(cleaned);
    entries.push({ folder: cleaned });
  }
  if ((record['plugins'] as unknown[]).length > MAX_ENTRIES) {
    skipped.push(`only the first ${MAX_ENTRIES} entries are read`);
  }
  return { entries, skipped };
}
