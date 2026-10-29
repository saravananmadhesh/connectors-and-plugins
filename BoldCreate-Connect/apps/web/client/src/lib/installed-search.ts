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
  /** The error code of a sign-in that did not complete, when the server named one. */
  reason?: string | undefined;
}

const REASON = /^[a-z0-9_]{1,64}$/;

/**
 * Reads how a sign-in ended. The web server answers `failed` with a `reason`; the api names its
 * error code (or `denied`) as the outcome itself. Anything but `connected` is a failure.
 */
function signInOutcome(search: Record<string, unknown>): Pick<InstalledSearch, 'oauth' | 'reason'> {
  const { oauth, reason } = search;
  if (oauth === 'connected') return { oauth: 'connected', reason: undefined };
  if (typeof oauth !== 'string' || oauth === '') return { oauth: undefined, reason: undefined };
  const named = oauth === 'failed' ? reason : oauth;
  return {
    oauth: 'failed',
    reason: typeof named === 'string' && REASON.test(named) ? named : undefined,
  };
}

export function validateInstalledSearch(search: Record<string, unknown>): InstalledSearch {
  const tab = INSTALLED_TABS.find((item) => item.value === search.tab)?.value;
  const scope = INSTALLED_SCOPES.find((item) => item === search.scope);
  return {
    tab: tab === 'plugins' ? undefined : tab,
    scope,
    ...signInOutcome(search),
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
  };
}

const SIGN_IN_SCOPE_KEY = 'boldcreate.signInScope';

/**
 * Remembers which list a sign-in started from, so a failed return lands there again: only a
 * successful return says the scope in the address.
 */
export function rememberSignInScope(scope: InstalledScope): void {
  try {
    sessionStorage.setItem(SIGN_IN_SCOPE_KEY, scope);
  } catch {
    // Storage blocked: the page falls back to its default list.
  }
}

/** The list the last sign-in started from, when it is known. */
export function recalledSignInScope(): InstalledScope | undefined {
  try {
    const value = sessionStorage.getItem(SIGN_IN_SCOPE_KEY);
    return INSTALLED_SCOPES.find((item) => item === value);
  } catch {
    return undefined;
  }
}
