export type ProjectTab =
  | 'overview'
  | 'users'
  | 'sessions'
  | 'plugins'
  | 'auth-configs'
  | 'connections'
  | 'catalog'
  | 'logs'
  | 'keys'
  | 'settings';

export const PROJECT_TABS: readonly { value: ProjectTab; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'users', label: 'Users' },
  { value: 'sessions', label: 'Sessions' },
  { value: 'plugins', label: 'Plugins' },
  { value: 'auth-configs', label: 'Auth configs' },
  { value: 'connections', label: 'Connections' },
  { value: 'catalog', label: 'Catalog' },
  { value: 'logs', label: 'Logs' },
  { value: 'keys', label: 'API keys' },
  { value: 'settings', label: 'Settings' },
];

/** The project page's tab as it lives in the address; the overview is the default and is left out. */
export interface ProjectSearch {
  tab?: ProjectTab | undefined;
}

export function validateProjectSearch(search: Record<string, unknown>): ProjectSearch {
  const tab = PROJECT_TABS.find((item) => item.value === search.tab)?.value;
  return { tab: tab === 'overview' ? undefined : tab };
}
