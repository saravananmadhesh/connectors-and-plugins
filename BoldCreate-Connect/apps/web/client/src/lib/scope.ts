import { PROJECT_TABS } from './project-search';

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

/** The sections of an organization about using plugins, as the breadcrumb names them. */
const FOR_YOU_PAGES: Record<string, string> = {
  'get-started': 'Get started',
  marketplace: 'Marketplace',
  installed: 'Installed',
  'api-keys': 'API keys',
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
  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'orgs' || !parts[1]) return [];
  const [, orgId, section, projectId] = parts;
  const org: Crumb = { label: names.org ?? 'Organization', to: `/orgs/${orgId}` };
  if (!section) return [org, { label: 'Overview', to: path }];
  const forYou = FOR_YOU_PAGES[section];
  if (forYou) {
    if (parts.length === 3) return [org, { label: forYou, to: path }];
    if (section === 'marketplace' && parts.length === 4) {
      return [org, { label: forYou, to: `/orgs/${orgId}/marketplace` }, { label: 'Plugin' }];
    }
    return [];
  }
  if (section === 'members' || section === 'settings') {
    if (parts.length !== 3) return [];
    return [org, { label: section === 'members' ? 'Members' : 'Settings', to: path }];
  }
  if (section === 'projects') {
    if (parts.length > 5) return [];
    const projects: Crumb = { label: 'Projects', to: `/orgs/${orgId}/projects` };
    if (!projectId) return [org, projects];
    const project: Crumb = {
      label: names.project ?? 'Project',
      to: `/orgs/${orgId}/projects/${projectId}`,
    };
    if (parts.length === 4) return [org, projects, project];
    // A section of the project: the project is a step up that leads back to its overview.
    const tab = PROJECT_TABS.find((item) => item.value === parts[4]);
    return tab ? [org, projects, project, { label: tab.label, to: path }] : [];
  }
  return [];
}

/** The window title for a trail: the page first, then where it sits, then the product. */
export function trailTitle(trail: readonly Crumb[], product: string): string {
  return [...trail.map((crumb) => crumb.label).reverse(), product].join(' · ');
}

/** The pages every organization has, which a switch of organization keeps the person on. */
const KEPT_SECTIONS = new Set([...Object.keys(FOR_YOU_PAGES), 'members', 'settings', 'projects']);

/**
 * Where a switch lands: the same section of the new organization (the marketplace stays the
 * marketplace, the members page stays the members page). A page inside one thing of the old
 * organization (a project, a plugin) has no twin there, so it lands on that section's list;
 * anything else lands on the overview.
 */
export function scopeDestination(pathname: string, target: { orgId: string }): string {
  const base = `/orgs/${target.orgId}`;
  const [root, , section] = clean(pathname).split('/').filter(Boolean);
  return root === 'orgs' && section && KEPT_SECTIONS.has(section) ? `${base}/${section}` : base;
}
