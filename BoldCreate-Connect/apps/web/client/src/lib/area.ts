import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

/** The two parts of the website: one person using plugins, and the developer surface. */
export type AreaKind = 'for-you' | 'platform';

export const AREA_STORAGE_KEY = 'web-area';

/** What each area holds, shown as a tooltip on its switcher button. */
export const AREA_HINTS: Record<AreaKind, string> = {
  'for-you':
    'Plugins from the marketplace, installed for you or your organization, and API keys for your agents.',
  platform: 'Projects: the apps you build on this platform, with their users, keys and sessions.',
};

export const AREA_LABELS: Record<AreaKind, string> = {
  'for-you': 'For You',
  platform: 'Platform',
};

export function readArea(): AreaKind | undefined {
  try {
    const raw = window.localStorage.getItem(AREA_STORAGE_KEY);
    return raw === 'for-you' || raw === 'platform' ? raw : undefined;
  } catch {
    return undefined;
  }
}

export function saveArea(area: AreaKind): void {
  try {
    window.localStorage.setItem(AREA_STORAGE_KEY, area);
  } catch {
    // Storage can be blocked; the choice then lasts until the page closes.
  }
}

const clean = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

/** The pages of one organization about using plugins; every one carries its organization. */
const FOR_YOU_PATH = /^\/orgs\/[^/]+\/(get-started|marketplace|installed|api-keys)(\/|$)/;
const PROJECT_PATH = /^\/orgs\/[^/]+\/projects\/[^/]+(\/|$)/;

/** Whether the address is a page of one project, which has its own sections. */
export function inProject(pathname: string): boolean {
  return PROJECT_PATH.test(clean(pathname));
}

/**
 * The area an address belongs to. The organization pages and the project list are shared by both
 * areas, so they belong to neither and keep the one the person was in.
 */
export function pathArea(pathname: string): AreaKind | undefined {
  const path = clean(pathname);
  if (FOR_YOU_PATH.test(path)) return 'for-you';
  if (PROJECT_PATH.test(path)) return 'platform';
  return undefined;
}

/** The areas a person may enter: a viewer has no For You data, so only Platform is offered. */
const BOTH_AREAS: readonly AreaKind[] = ['for-you', 'platform'];
const PLATFORM_ONLY: readonly AreaKind[] = ['platform'];

export function availableAreas(canUseForYou: boolean): readonly AreaKind[] {
  return canUseForYou ? BOTH_AREAS : PLATFORM_ONLY;
}

/**
 * The area the sidebar shows: the page decides it when it has an area, else the last choice, else
 * the first area on offer. An area that is not on offer is never returned.
 */
export function resolveArea(
  pathname: string,
  last: AreaKind | undefined,
  areas: readonly AreaKind[],
): AreaKind {
  const wanted = pathArea(pathname) ?? last;
  if (wanted && areas.includes(wanted)) return wanted;
  return areas[0] ?? 'platform';
}

/**
 * Where a switch lands: the first page of the area, or the page already open when it belongs to
 * that area. A shared page (the organization) belongs to neither, so a switch leaves it
 * for the default page of the area chosen.
 */
export function areaDestination(
  pathname: string,
  area: AreaKind,
  orgId: string | undefined,
): string {
  if (pathArea(pathname) === area) return clean(pathname);
  // Without an organization there is nothing to open; the home address says what to do.
  if (!orgId) return '/orgs';
  return area === 'for-you' ? `/orgs/${orgId}/marketplace` : `/orgs/${orgId}/projects`;
}

/** The area for the current address, remembered for the pages that have none of their own. */
export function useArea(areas: readonly AreaKind[]): AreaKind {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const own = pathArea(pathname);
  const area = resolveArea(pathname, readArea(), areas);
  useEffect(() => {
    if (own && areas.includes(own)) saveArea(own);
  }, [own, areas]);
  return area;
}
