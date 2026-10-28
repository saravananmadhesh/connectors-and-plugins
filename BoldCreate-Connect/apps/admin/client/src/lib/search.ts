/** Search parameters of each page. Anything else in the address is dropped. */

const TEXT_MAX = 200;

const text = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() !== '' ? value.trim().slice(0, TEXT_MAX) : undefined;

// ─── Audit
export const AUDIT_RANGES = { '24h': 86_400_000, '7d': 604_800_000, '30d': 2_592_000_000 } as const;

export interface AuditSearch {
  /** An action name or a group such as `plugin_version.`. */
  action?: string;
  result?: 'success' | 'failure' | 'denied';
  actor?: string;
  range?: keyof typeof AUDIT_RANGES;
}

export function parseAuditSearch(search: Record<string, unknown>): AuditSearch {
  const result = search['result'];
  const range = search['range'];
  const action = text(search['action']);
  const actor = text(search['actor']);
  return {
    ...(action ? { action } : {}),
    ...(actor ? { actor } : {}),
    ...(result === 'success' || result === 'failure' || result === 'denied' ? { result } : {}),
    ...(typeof range === 'string' && range in AUDIT_RANGES
      ? { range: range as keyof typeof AUDIT_RANGES }
      : {}),
  };
}

// ─── Tabs
const oneOf = <T extends string>(tabs: readonly T[], value: unknown): T | undefined =>
  tabs.find((tab) => tab === value);

export const PLUGIN_TABS = ['versions', 'customizations', 'edit', 'source', 'history'] as const;
export type PluginTab = (typeof PLUGIN_TABS)[number];
export const parsePluginSearch = (search: Record<string, unknown>): { tab?: PluginTab } => {
  const tab = oneOf(PLUGIN_TABS, search['tab']);
  return tab ? { tab } : {};
};

export const VERSION_TABS = ['contents', 'safety', 'history'] as const;
export type VersionTab = (typeof VERSION_TABS)[number];
export const parseVersionSearch = (search: Record<string, unknown>): { tab?: VersionTab } => {
  const tab = oneOf(VERSION_TABS, search['tab']);
  return tab ? { tab } : {};
};

export const DISCOVER_TABS = ['find', 'repositories'] as const;
export type DiscoverTab = (typeof DISCOVER_TABS)[number];
export const parseDiscoverSearch = (search: Record<string, unknown>): { tab?: DiscoverTab } => {
  const tab = oneOf(DISCOVER_TABS, search['tab']);
  return tab ? { tab } : {};
};
