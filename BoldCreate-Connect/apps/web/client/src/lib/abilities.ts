import { useQuery } from '@tanstack/react-query';
import type { OrgMeResponse } from '@boldcreate-integrations/contracts';
import { orgs } from './api';
import { qk } from './query-keys';

export interface Abilities {
  /** The caller's membership while it loads. */
  me: OrgMeResponse | undefined;
  isLoading: boolean;
  /** True when the server lists the action for the caller in the organization. */
  can: (action: string) => boolean;
}

/** Whether `action` is among the abilities of an `OrgMeResponse`. */
export function hasAbility(me: OrgMeResponse | undefined, action: string): boolean {
  return me?.abilities.includes(action) ?? false;
}

/**
 * What the signed-in user may do in an organization, as the server decides it. Pages gate
 * buttons on these names and never on role names.
 */
export function useAbilities(orgId: string): Abilities {
  const query = useQuery({ queryKey: qk.orgMe(orgId), queryFn: () => orgs.me(orgId) });
  return {
    me: query.data,
    isLoading: query.isLoading,
    can: (action) => hasAbility(query.data, action),
  };
}
