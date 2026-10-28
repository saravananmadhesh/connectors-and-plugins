import type {
  AdminPluginSummary,
  ComponentKind,
  PluginLifecycleStatus,
  VersionStatus,
} from './api';

export const PLUGINS_KEY = ['admin', 'plugins'] as const;
export const SOURCES_KEY = ['admin', 'plugin-sources'] as const;
export const pluginKey = (id: string) => ['admin', 'plugin', id] as const;
export const versionKey = (id: string) => ['admin', 'plugin-version', id] as const;

export const VERSION_LABEL: Record<VersionStatus, string> = {
  pending: 'Pending review',
  approved: 'Approved',
  published: 'Published',
  rejected: 'Rejected',
  yanked: 'Yanked',
};

export const REVIEW_COUNT_KEY = ['admin', 'review-count'] as const;

export const KIND_LABEL: Record<ComponentKind, string> = {
  mcp: 'MCP server',
  skill: 'Skill',
  rule: 'Rule',
  hook: 'Hook',
  agent: 'Agent',
};

/** Columns of the plugin table that can be shown or hidden; the plugin name is always shown. */
export type PluginColumn =
  | 'category'
  | 'source'
  | 'customizations'
  | 'version'
  | 'state'
  | 'installs';

export const COLUMN_LABEL: Record<PluginColumn, string> = {
  category: 'Category',
  source: 'Source',
  customizations: 'Customizations',
  version: 'Version',
  state: 'State',
  installs: 'Installs',
};

/** Everything but the category is shown to begin with. */
export const DEFAULT_COLUMNS: readonly PluginColumn[] = [
  'source',
  'customizations',
  'version',
  'state',
  'installs',
];

export const CATEGORIES_KEY = ['admin', 'categories'] as const;

export type PluginAction = 'deprecate' | 'suspend' | 'delete';

export const ACTION_COPY: Record<
  PluginAction,
  { title: string; effect: string; confirm: string; status?: PluginLifecycleStatus }
> = {
  deprecate: {
    title: 'Deprecate this plugin?',
    effect: 'It stays in the catalog marked as deprecated. Installed copies keep working.',
    confirm: 'Deprecate plugin',
    status: 'deprecated',
  },
  suspend: {
    title: 'Suspend this plugin?',
    effect:
      'It disappears from the catalog and stops serving to every installation until it is reactivated.',
    confirm: 'Suspend plugin',
    status: 'suspended',
  },
  delete: {
    title: 'Delete this plugin and all of its versions?',
    effect: 'This removes the plugin and its source from the catalog for good.',
    confirm: 'Delete plugin',
  },
};

/** Whether the plugin's source is being read right now. */
export const isSyncing = (source: AdminPluginSummary['source']): boolean =>
  source?.lastStatus === 'queued' || source?.lastStatus === 'running';

/** Kinds in the order they are listed, with their plural names. */
export const KIND_PLURAL: Record<ComponentKind, string> = {
  agent: 'Agents',
  skill: 'Skills',
  mcp: 'MCP servers',
  hook: 'Hooks',
  rule: 'Rules',
};

/** Components of a plugin, per kind in listing order, and in total. */
export function customizationCounts(plugin: Pick<AdminPluginSummary, 'componentCounts'>) {
  const rows = (Object.keys(KIND_PLURAL) as ComponentKind[]).flatMap((kind) => {
    const count = plugin.componentCounts[kind] ?? 0;
    return count > 0 ? [{ kind, label: KIND_PLURAL[kind], count }] : [];
  });
  return { rows, total: rows.reduce((sum, row) => sum + row.count, 0) };
}
