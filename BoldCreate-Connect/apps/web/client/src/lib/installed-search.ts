import type { ComponentKind } from './api';

export type InstalledTab = 'plugins' | ComponentKind;

export const INSTALLED_TABS: readonly { value: InstalledTab; label: string }[] = [
  { value: 'plugins', label: 'Plugins' },
  { value: 'agent', label: 'Agents' },
  { value: 'skill', label: 'Skills' },
  { value: 'mcp', label: 'MCPs' },
  { value: 'hook', label: 'Hooks' },
  { value: 'rule', label: 'Rules' },
];

/** Who an installed list is about: the whole organization or the caller alone. */
export type InstalledScope = 'org' | 'me';

export const INSTALLED_SCOPES: readonly InstalledScope[] = ['org', 'me'];

export type OAuthResult = 'connected' | 'failed';

/** The installed view's filters as they live in the address. */
export interface InstalledSearch {
  tab?: InstalledTab | undefined;
  scope?: InstalledScope | undefined;
  q?: string | undefined;
  /** How a sign-in to an MCP server ended; set when the provider sends the member back. */
  oauth?: OAuthResult | undefined;
}

export function validateInstalledSearch(search: Record<string, unknown>): InstalledSearch {
  const tab = INSTALLED_TABS.find((item) => item.value === search.tab)?.value;
  const scope = INSTALLED_SCOPES.find((item) => item === search.scope);
  return {
    tab: tab === 'plugins' ? undefined : tab,
    scope,
    oauth: search.oauth === 'connected' || search.oauth === 'failed' ? search.oauth : undefined,
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
  };
}
