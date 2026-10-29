import type { ComponentKind, DiscoveredPlugin, InstalledSource } from './api';
import { KIND_LABEL, KIND_PLURAL } from './plugins';

/** The most folders one install takes; the server refuses more (kept equal to the contract by a test). */
export const MAX_INSTALL_PATHS = 50;

type Tone = 'success' | 'warning' | 'info' | 'destructive' | 'secondary';

export interface StateView {
  label: string;
  tone: Tone;
  /** Why, when the state needs an explanation. */
  reason?: string;
}

export type CandidateKey = 'available' | 'installed' | 'syncing' | 'problem' | 'blocked';

/** Where a folder found in a repository stands: new, in the catalog, still syncing, broken, or unusable. */
export function candidateState(plugin: DiscoveredPlugin): StateView & { key: CandidateKey } {
  if (plugin.problem !== null) {
    return {
      key: 'blocked',
      label: "Can't be installed",
      tone: 'destructive',
      reason: plugin.problem,
    };
  }
  const installed = plugin.installed;
  if (installed === null) return { key: 'available', label: 'Not installed', tone: 'secondary' };
  if (installed.syncStatus === 'queued' || installed.syncStatus === 'running') {
    return {
      key: 'syncing',
      label: 'Installing',
      tone: 'info',
      reason: 'Its first sync is running.',
    };
  }
  if (installed.syncStatus === 'failed') {
    return {
      key: 'problem',
      label: 'Installed with problems',
      tone: 'destructive',
      reason: installed.lastError ?? 'The last sync failed.',
    };
  }
  if (installed.pluginId === null) {
    return {
      key: 'problem',
      label: 'Installed with problems',
      tone: 'warning',
      reason:
        installed.syncStatus === null
          ? 'It was added but never synced, so no plugin exists yet.'
          : 'The sync finished but did not create a plugin.',
    };
  }
  return { key: 'installed', label: 'Installed', tone: 'success' };
}

export type HealthKey = 'healthy' | 'syncing' | 'failed' | 'empty' | 'never' | 'lists';

/** How an added source is doing, from its last sync and whether a plugin came out of it. */
export function sourceHealth(source: InstalledSource): StateView & { key: HealthKey } {
  if (source.lastStatus === 'queued' || source.lastStatus === 'running') {
    return { key: 'syncing', label: 'Syncing', tone: 'info' };
  }
  if (source.lastStatus === 'failed') {
    return {
      key: 'failed',
      label: 'Sync failed',
      tone: 'destructive',
      reason: source.lastError ?? 'The last sync failed.',
    };
  }
  if (source.lastStatus === null) {
    return { key: 'never', label: 'Never synced', tone: 'secondary' };
  }
  if (source.plugin === null) {
    // A marketplace list adds a source per plugin it names and has no plugin of its own.
    return source.lastNote
      ? { key: 'lists', label: 'Lists plugins', tone: 'secondary', reason: source.lastNote }
      : {
          key: 'empty',
          label: 'No plugin created',
          tone: 'warning',
          reason: 'The sync finished but found no plugin in this folder.',
        };
  }
  return { key: 'healthy', label: 'Healthy', tone: 'success' };
}

/** A source that needs someone to look at it. */
export const needsAttention = (source: InstalledSource): boolean => {
  const key = sourceHealth(source).key;
  return key === 'failed' || key === 'empty' || key === 'never';
};

const lower = (text: string): string => (text.startsWith('MCP') ? text : text.toLowerCase());

/** "3 skills · 1 MCP server": the customizations in plain words. */
export function describeCounts(counts: Record<string, number>): string {
  return (Object.keys(KIND_PLURAL) as ComponentKind[])
    .flatMap((kind) => {
      const count = counts[kind] ?? 0;
      if (count <= 0) return [];
      return [`${count} ${lower(count === 1 ? KIND_LABEL[kind] : KIND_PLURAL[kind])}`];
    })
    .join(' · ');
}

export type CandidateFilter = 'all' | 'available' | 'installed' | 'attention';

export const CANDIDATE_FILTERS: ReadonlyArray<{ value: CandidateFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Not installed' },
  { value: 'installed', label: 'Installed' },
  { value: 'attention', label: 'Needs attention' },
];

export type HideOption = 'installed' | 'stdio';

/** Hidden until the admin asks to see them: plugins that cannot be installed yet. */
export const DEFAULT_HIDE: readonly HideOption[] = ['stdio'];

export const HIDE_OPTIONS: ReadonlyArray<{ value: HideOption; label: string }> = [
  { value: 'installed', label: 'Installed' },
  { value: 'stdio', label: 'MCP stdio' },
];

/** A plugin with an MCP server that runs as a local command; only http servers are supported for now. */
export const usesStdio = (plugin: DiscoveredPlugin): boolean =>
  plugin.mcpTransports.includes('stdio');

/** Can be selected and installed: not installed yet, and without a stdio MCP server. */
export const canInstall = (plugin: DiscoveredPlugin): boolean =>
  candidateState(plugin).key === 'available' && !usesStdio(plugin);

/**
 * The folders that match the search words (every word, anywhere in the card text) and the state
 * filter, leaving out the kinds the admin chose to hide.
 */
export function filterCandidates(
  plugins: readonly DiscoveredPlugin[],
  query: string,
  filter: CandidateFilter,
  hide: readonly HideOption[] = [],
): DiscoveredPlugin[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return plugins.filter((plugin) => {
    const key = candidateState(plugin).key;
    if (hide.includes('installed') && key === 'installed') return false;
    if (hide.includes('stdio') && usesStdio(plugin)) return false;
    if (filter === 'available' && key !== 'available') return false;
    if (filter === 'installed' && key !== 'installed') return false;
    if (filter === 'attention' && (key === 'available' || key === 'installed')) return false;
    if (words.length === 0) return true;
    const text = [
      plugin.displayName,
      plugin.name,
      plugin.summary,
      plugin.path,
      ...plugin.categories,
    ]
      .join(' ')
      .toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/** The plugin's folder on GitHub, at the branch that was inspected. */
export function githubFolderUrl(
  found: { owner: string; repository: string; ref: string },
  path: string,
): string {
  const encode = (value: string) => value.split('/').map(encodeURIComponent).join('/');
  const base = `https://github.com/${encodeURIComponent(found.owner)}/${encodeURIComponent(found.repository)}/tree/${encode(found.ref)}`;
  return path === '' ? base : `${base}/${encode(path)}`;
}
