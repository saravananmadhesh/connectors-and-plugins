import { useQuery } from '@tanstack/react-query';
import { auth, installations, type ScopeKey } from '@/lib/api';
import { hasAbility, useAbilities } from '@/lib/abilities';
import { useActiveOrg } from '@/lib/active-org';
import { qk } from '@/lib/query-keys';
import type { InstallScope } from '@/components/InstallMenu';

// A person installs for themselves or for the team (the whole organization).
const ALL_SCOPES: readonly InstallScope[] = ['user', 'org'];

export interface InstallOptions {
  /** An install can start: the organization and its installations are known. */
  ready: boolean;
  /** The caller cannot install anything: the organization manages the marketplace for them. */
  managed: boolean;
  /** The scopes the caller may install into and has not installed this plugin in yet. */
  available: (pluginName: string) => InstallScope[];
  /** The scopes this plugin is installed in already. */
  installedIn: (pluginName: string) => InstallScope[];
}

function useScopeInstallations(orgId: string | undefined, scopeKey: ScopeKey) {
  return useQuery({
    queryKey: [...qk.installations(scopeKey), orgId],
    queryFn: () => installations.list(orgId ?? '', scopeKey),
    enabled: Boolean(orgId),
  });
}

/**
 * Which install choices apply to a plugin for the signed-in user: scopes the user's abilities
 * allow, minus those that already hold the plugin.
 */
export function useInstallOptions(): InstallOptions {
  const me = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const orgIds = me.data?.memberships.map((m) => m.organizationId) ?? [];
  const { orgId } = useActiveOrg(orgIds);
  const { me: orgMe } = useAbilities(orgId ?? '');
  // The same keys the installed page uses, so a refresh after an install reaches these by prefix.
  const orgList = useScopeInstallations(orgId, 'org');
  const userList = useScopeInstallations(orgId, 'me');

  const names = (query: typeof orgList) =>
    new Set(query.data?.items.map((item) => item.pluginName));
  const inOrg = names(orgList);
  const inUser = names(userList);

  const orgAllowed = hasAbility(orgMe, 'installation:create');
  const personalOpen = orgMe?.policy?.allowPersonalInstalls !== false;
  // The For You data is not listed for a viewer, so a viewer installs nowhere. Admins and members
  // install at every scope they hold; they may also install for themselves a plugin the
  // organization already enforces.
  const forYou = orgMe === undefined || hasAbility(orgMe, 'installation:list');
  const manages = orgAllowed;
  const sets: Record<InstallScope, Set<string>> = { org: inOrg, user: inUser };
  const allowedFor = (scope: InstallScope, name: string): boolean => {
    if (scope === 'org') return orgAllowed;
    if (!orgId || !personalOpen || !forYou) return false;
    return manages || !inOrg.has(name);
  };

  return {
    ready: Boolean(orgId),
    managed: Boolean(orgId) && !manages && !personalOpen,
    installedIn: (name) => ALL_SCOPES.filter((scope) => sets[scope].has(name)),
    available: (name) =>
      ALL_SCOPES.filter((scope) => allowedFor(scope, name) && !sets[scope].has(name)),
  };
}
