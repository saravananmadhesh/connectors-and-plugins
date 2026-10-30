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

export const PLUGIN_STAGES = [
  'needs_review',
  'pending',
  'approved',
  'published',
  'rejected',
  'yanked',
  'all',
] as const;
export type PluginStage = (typeof PLUGIN_STAGES)[number];
export const parsePluginsSearch = (search: Record<string, unknown>): { stage?: PluginStage } => {
  const stage = oneOf(PLUGIN_STAGES, search['stage']);
  return stage ? { stage } : {};
};

// ─── Observability
export const OBSERVABILITY_TABS = ['overview', 'errors', 'events', 'storage'] as const;
export type ObservabilityTab = (typeof OBSERVABILITY_TABS)[number];
export const OVERVIEW_WINDOWS = ['1h', '24h', '7d'] as const;
export type OverviewWindow = (typeof OVERVIEW_WINDOWS)[number];
export const ERROR_STATUSES = ['unresolved', 'resolved', 'ignored'] as const;
export const EVENT_SEVERITIES = ['info', 'warning', 'error'] as const;
export const OBSERVABILITY_RANGES = {
  '1h': 3_600_000,
  '24h': 86_400_000,
  '7d': 604_800_000,
  '30d': 2_592_000_000,
} as const;

export interface ObservabilitySearch {
  tab?: ObservabilityTab;
  /** Errors: the group's state. */
  status?: (typeof ERROR_STATUSES)[number];
  service?: string;
  /** Errors: the part of the service that failed. */
  area?: string;
  /** Events: how serious. */
  severity?: (typeof EVENT_SEVERITIES)[number];
  /** Events: a kind, or a prefix ending in a dot. */
  kind?: string;
  /** Errors: words to find in the title. */
  q?: string;
  /** Overview: how far back to look. */
  period?: OverviewWindow;
  range?: keyof typeof OBSERVABILITY_RANGES;
}

export function parseObservabilitySearch(search: Record<string, unknown>): ObservabilitySearch {
  const tab = oneOf(OBSERVABILITY_TABS, search['tab']);
  const status = oneOf(ERROR_STATUSES, search['status']);
  const severity = oneOf(EVENT_SEVERITIES, search['severity']);
  const range = oneOf(
    Object.keys(OBSERVABILITY_RANGES) as (keyof typeof OBSERVABILITY_RANGES)[],
    search['range'],
  );
  const service = text(search['service']);
  const area = text(search['area']);
  const kind = text(search['kind']);
  const q = text(search['q']);
  const period = oneOf(OVERVIEW_WINDOWS, search['period']);
  return {
    ...(tab ? { tab } : {}),
    ...(status ? { status } : {}),
    ...(service ? { service } : {}),
    ...(area ? { area } : {}),
    ...(severity ? { severity } : {}),
    ...(kind ? { kind } : {}),
    ...(q ? { q } : {}),
    ...(period ? { period } : {}),
    ...(range ? { range } : {}),
  };
}
