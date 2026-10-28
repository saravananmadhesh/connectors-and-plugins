const clean = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

export interface Crumb {
  label: string;
  /** Absent on the page the user is on. */
  to?: string;
}

export interface TrailNames {
  /** The organization the pages are in: its name and id, for the first crumb of org-scoped pages. */
  org?: string | undefined;
  orgId?: string | undefined;
  project?: string | undefined;
}

/** Pages that belong to the active organization. */
const ORG_PAGES: Record<string, string> = {
  '/get-started': 'Get started',
  '/marketplace': 'Marketplace',
  '/installed': 'Installed',
  '/api-keys': 'API keys',
};

/** Pages that belong to the person, not to an organization. */
const PERSONAL_PAGES: Record<string, string> = {
  '/profile': 'Profile',
};

/** The group name for personal pages. It names a group, not a page, so it is not a link. */
export const PERSONAL_GROUP = 'Personal';

/**
 * The breadcrumb for an address: where the page sits, from the organization down. Every crumb but
 * the last links to its page. Addresses the app does not know give an empty trail.
 */
export function buildTrail(pathname: string, names: TrailNames = {}): Crumb[] {
  const path = clean(pathname);
  const trail = trailFor(path, names);
  const last = trail[trail.length - 1];
  if (last) delete last.to;
  return trail;
}

function trailFor(path: string, names: TrailNames): Crumb[] {
  const personal = PERSONAL_PAGES[path];
  if (personal) return [{ label: PERSONAL_GROUP }, { label: personal, to: path }];
  // Without an organization there is nothing to put first, and a lone page is its own title.
  const root: Crumb[] = names.orgId
    ? [{ label: names.org ?? 'Organization', to: `/orgs/${names.orgId}` }]
    : [];
  const orgPage = ORG_PAGES[path];
  if (orgPage) return [...root, { label: orgPage, to: path }];

  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'marketplace') {
    return parts.length === 2
      ? [...root, { label: 'Marketplace', to: '/marketplace' }, { label: 'Plugin' }]
      : [];
  }
  if (parts[0] !== 'orgs' || !parts[1]) return [];
  const [, orgId, section, projectId] = parts;
  const org: Crumb = { label: names.org ?? 'Organization', to: `/orgs/${orgId}` };
  if (!section) return [org, { label: 'Overview', to: path }];
  if (section === 'members' || section === 'settings') {
    if (parts.length !== 3) return [];
    return [org, { label: section === 'members' ? 'Members' : 'Settings', to: path }];
  }
  if (section === 'projects') {
    if (parts.length > 4) return [];
    const projects: Crumb = { label: 'Projects', to: `/orgs/${orgId}/projects` };
    if (!projectId) return [org, projects];
    return [org, projects, { label: names.project ?? 'Project', to: path }];
  }
  return [];
}

/** The window title for a trail: the page first, then where it sits, then the product. */
export function trailTitle(trail: readonly Crumb[], product: string): string {
  return [...trail.map((crumb) => crumb.label).reverse(), product].join(' · ');
}

/**
 * Where a switch lands. The user keeps the members page when the new organization has one;
 * anything else lands on the overview of the new organization.
 */
export function scopeDestination(pathname: string, target: { orgId: string }): string {
  const base = `/orgs/${target.orgId}`;
  return clean(pathname).endsWith('/members') ? `${base}/members` : base;
}
