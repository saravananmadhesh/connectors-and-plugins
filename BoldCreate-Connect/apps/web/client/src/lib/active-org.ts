import { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';

export const ACTIVE_ORG_STORAGE_KEY = 'web-active-org';

export interface ActiveOrg {
  orgId?: string | undefined;
}

/** The last organization the user worked in; the id only, nothing secret. */
export function readActiveOrg(): ActiveOrg {
  try {
    const raw = window.localStorage.getItem(ACTIVE_ORG_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ActiveOrg;
    return { orgId: typeof parsed.orgId === 'string' ? parsed.orgId : undefined };
  } catch {
    return {};
  }
}

export function saveActiveOrg(active: ActiveOrg): void {
  try {
    window.localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, JSON.stringify(active));
  } catch {
    // Storage can be blocked; the choice then lasts until the page closes.
  }
}

/**
 * Picks the active organization. The address wins, then the saved choice when it is still valid,
 * then the first organization.
 */
export function resolveActiveOrg(
  route: ActiveOrg,
  saved: ActiveOrg,
  orgIds: readonly string[],
): ActiveOrg {
  const orgId =
    route.orgId ??
    (saved.orgId && orgIds.includes(saved.orgId) ? saved.orgId : undefined) ??
    orgIds[0];
  return orgId ? { orgId } : {};
}

/** The active organization, remembered across visits. */
export function useActiveOrg(orgIds: readonly string[]): ActiveOrg {
  const params = useParams({ strict: false }) as ActiveOrg;
  const { orgId } = resolveActiveOrg(params, readActiveOrg(), orgIds);
  useEffect(() => {
    if (params.orgId) saveActiveOrg({ orgId: params.orgId });
  }, [params.orgId]);
  return { orgId };
}
