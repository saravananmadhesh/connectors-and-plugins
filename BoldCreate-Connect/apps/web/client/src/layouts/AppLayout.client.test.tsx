/**
 * AppLayout tests.
 * Covers: the two areas and what the sidebar lists in each, the breadcrumb, the window title, the
 * keyboard shortcut, the skip link and the other things that frame every page.
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Id } from '@boldcreate-integrations/contracts';
import { AppLayout } from './AppLayout';
import * as apiModule from '@/lib/api';
import { AREA_STORAGE_KEY } from '@/lib/area';
import { readSetupFlag } from '@/lib/setup-progress';
import { renderWithRouter } from '@/test/render-with-router';

const ORG_ID = 'o1' as Id<'org'>;
const NOW = new Date().toISOString();

const meWith = (role: 'ADMIN' | 'VIEWER'): apiModule.MeResponse => ({
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: NOW,
    status: 'active',
    createdAt: NOW,
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme',
      organizationSlug: 'acme',
      role,
      status: 'active',
    },
  ],
});

interface Options {
  role?: 'ADMIN' | 'VIEWER';
}

async function show(path: string, url: string, options: Options = {}) {
  const { role = 'ADMIN' } = options;
  const me = meWith(role);
  vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me);
  return renderWithRouter(AppLayout, path, {
    queryData: [{ key: ['me'], data: me }],
    url,
    extraRoutes: [
      ...(path === '/orgs/$orgId/projects'
        ? []
        : [{ path: '/orgs/$orgId/projects', component: () => <p>Projects</p> }]),
      ...(path === '/marketplace'
        ? []
        : [{ path: '/marketplace', component: () => <p>Marketplace</p> }]),
    ],
  });
}

const sidebar = () => screen.getByRole('navigation', { name: 'Main' });
const names = (group: HTMLElement) =>
  within(group)
    .getAllByRole('link')
    .map((l) => l.textContent);

describe('AppLayout', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    document.title = '';
  });

  describe('in the For You area', () => {
    it('lists the plugin pages, then the organization, then the person', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`);
      expect(within(sidebar()).getByText('Organization')).toBeInTheDocument();
      expect(names(sidebar())).toEqual([
        'Get started',
        'Marketplace',
        'Installed',
        'API keys',
        'Overview',
        'Members',
        'Settings',
        'Profile',
      ]);
      expect(within(sidebar()).getByRole('link', { name: 'Overview' })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('hides Settings from someone who cannot change the policy', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`, { role: 'VIEWER' });
      await screen.findByRole('link', { name: 'Overview' });
      expect(within(sidebar()).queryByRole('link', { name: 'Settings' })).not.toBeInTheDocument();
    });

    it('shows a viewer the overview and projects: no For You pages, no members', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`, { role: 'VIEWER' });
      await screen.findByRole('link', { name: 'Overview' });
      expect(names(sidebar())).toEqual(['Overview', 'Projects', 'Profile']);
    });

    it('keeps the sidebar quiet: no hover hints on its links', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`);
      await screen.findByRole('link', { name: 'Members' });
      expect(within(sidebar()).queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument();
      expect(
        within(sidebar()).getByRole('link', { name: 'Members' }),
      ).not.toHaveAccessibleDescription();
    });

    it('offers only the way back inside a project, not the organization pages', async () => {
      window.localStorage.setItem(AREA_STORAGE_KEY, 'platform');
      await show('/orgs/$orgId/projects/$projectId', `/orgs/${ORG_ID}/projects/prj_1`);
      const back = await within(sidebar()).findByRole('link', { name: 'All projects' });
      expect(back).toHaveAttribute('href', `/orgs/${ORG_ID}/projects`);
      expect(back).not.toHaveAttribute('aria-current');
      expect(within(sidebar()).queryByText('Organization')).not.toBeInTheDocument();
      expect(within(sidebar()).queryByRole('link', { name: 'Members' })).not.toBeInTheDocument();
    });

    it('lists the sections of the open project in the sidebar', async () => {
      window.localStorage.setItem(AREA_STORAGE_KEY, 'platform');
      await show('/orgs/$orgId/projects/$projectId', `/orgs/${ORG_ID}/projects/prj_1`);
      const overview = await within(sidebar()).findByRole('link', { name: 'Overview' });
      expect(overview).toHaveAttribute('aria-current', 'page');
      expect(within(sidebar()).getByRole('link', { name: 'Users' })).toHaveAttribute(
        'href',
        `/orgs/${ORG_ID}/projects/prj_1?tab=users`,
      );
      expect(within(sidebar()).getByRole('link', { name: 'Users' })).not.toHaveAttribute(
        'aria-current',
      );
    });

    it('leaves projects to Platform', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`);
      await screen.findByRole('link', { name: 'Members' });
      expect(within(sidebar()).queryByRole('link', { name: 'Projects' })).not.toBeInTheDocument();
    });

    it('titles the window and shows the breadcrumb of the overview', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`);
      await waitFor(() => expect(document.title).toBe('Overview · Acme · BoldCreate'));
      const crumbs = await screen.findByRole('navigation', { name: 'Breadcrumb' });
      expect(within(crumbs).getByRole('link', { name: 'Acme' })).toHaveAttribute(
        'href',
        `/orgs/${ORG_ID}`,
      );
      expect(within(crumbs).getByText('Overview')).toHaveAttribute('aria-current', 'page');
    });

    it('lists Get started first, above the marketplace', async () => {
      await show('/orgs/$orgId', `/orgs/${ORG_ID}`);
      expect(await within(sidebar()).findByRole('link', { name: 'Get started' })).toHaveAttribute(
        'href',
        '/get-started',
      );
    });
  });

  describe('the two areas', () => {
    const segment = (name: RegExp) => screen.findByRole('button', { name });

    it('lists For You and Platform for an admin, with the current one pressed', async () => {
      await show('/marketplace', '/marketplace');
      expect(await segment(/For You/)).toHaveAttribute('aria-pressed', 'true');
      expect(await segment(/Platform/)).toHaveAttribute('aria-pressed', 'false');
    });

    it('goes to the projects of Platform and remembers the choice', async () => {
      const { router } = await show('/marketplace', '/marketplace');
      await userEvent.click(await segment(/Platform/));
      await waitFor(() => expect(router.state.location.pathname).toBe(`/orgs/${ORG_ID}/projects`));
      expect(window.localStorage.getItem(AREA_STORAGE_KEY)).toBe('platform');
    });

    it('switches to For You from an organization page, landing on the marketplace', async () => {
      window.localStorage.setItem(AREA_STORAGE_KEY, 'platform');
      const { router } = await show('/orgs/$orgId/members', `/orgs/${ORG_ID}/members`);
      await userEvent.click(await segment(/For You/));
      await waitFor(() => expect(router.state.location.pathname).toBe('/marketplace'));
    });

    it('shows the organization and project pages alone in Platform', async () => {
      window.localStorage.setItem(AREA_STORAGE_KEY, 'platform');
      await show('/profile', '/profile');
      await screen.findByRole('link', { name: 'Projects' });
      expect(names(sidebar())).toEqual(['Overview', 'Projects', 'Members', 'Settings', 'Profile']);
      expect(await segment(/Platform/)).toHaveAttribute('aria-pressed', 'true');
    });

    it('lets a For You page decide the area, whatever was chosen last', async () => {
      window.localStorage.setItem(AREA_STORAGE_KEY, 'platform');
      await show('/installed', '/installed');
      expect(await segment(/For You/)).toHaveAttribute('aria-pressed', 'true');
      expect(within(sidebar()).getByRole('link', { name: 'Installed' })).toBeInTheDocument();
    });

    it('offers a viewer no choice of area and no plugin pages', async () => {
      await show('/orgs/$orgId/projects', `/orgs/${ORG_ID}/projects`, { role: 'VIEWER' });
      await screen.findByRole('link', { name: 'Projects' });
      expect(screen.queryByRole('group', { name: 'Area' })).not.toBeInTheDocument();
      expect(within(sidebar()).queryByRole('link', { name: 'Installed' })).not.toBeInTheDocument();
    });

    it('keeps the organization switcher at the foot of the sidebar, above the user', async () => {
      await show('/marketplace', '/marketplace');
      const org = await screen.findByRole('button', { name: 'Switch organization' });
      const user = screen.getByRole('region', { name: 'Signed-in user' });
      const area = screen.getByRole('group', { name: 'Area' });
      const follows = (a: Element, b: Element) =>
        Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      expect(follows(area, org)).toBe(true);
      expect(follows(org, user)).toBe(true);
    });

    it('shows a viewer not found on a For You address, not the page', async () => {
      await show('/installed', '/installed', { role: 'VIEWER' });
      expect(await screen.findByText('Page not found')).toBeInTheDocument();
      expect(within(sidebar()).queryByRole('link', { name: 'Installed' })).not.toBeInTheDocument();
    });
  });

  describe('on a page outside any organization', () => {
    it('keeps the organization group', async () => {
      await show('/marketplace', '/marketplace');
      expect(await within(sidebar()).findByText('Organization')).toBeInTheDocument();
    });

    it('remembers that the marketplace was visited, and only then', async () => {
      await show('/installed', '/installed');
      await screen.findByRole('navigation', { name: 'Breadcrumb' });
      expect(readSetupFlag('browsed-marketplace', ORG_ID)).toBe(false);
      await show('/marketplace', '/marketplace');
      await waitFor(() => expect(readSetupFlag('browsed-marketplace', ORG_ID)).toBe(true));
    });

    it('titles the window with the page and the product', async () => {
      await show('/marketplace', '/marketplace');
      await waitFor(() => expect(document.title).toBe('Marketplace · Acme · BoldCreate'));
    });

    it('starts the breadcrumb at the organization, which links to its overview', async () => {
      await show('/installed', '/installed');
      const crumbs = await screen.findByRole('navigation', { name: 'Breadcrumb' });
      expect(within(crumbs).getByRole('link', { name: 'Acme' })).toHaveAttribute(
        'href',
        '/orgs/o1',
      );
      expect(within(crumbs).getByText('Installed')).toHaveAttribute('aria-current', 'page');
    });

    it('puts Profile under Personal, a name that is not a link', async () => {
      await show('/profile', '/profile');
      const crumbs = await screen.findByRole('navigation', { name: 'Breadcrumb' });
      expect(within(crumbs).getByText('Personal')).toBeInTheDocument();
      expect(within(crumbs).queryByRole('link', { name: 'Personal' })).not.toBeInTheDocument();
      const personal = (await within(sidebar()).findByText('Personal'))
        .parentElement as HTMLElement;
      const names = within(personal)
        .getAllByRole('link')
        .map((link) => link.textContent);
      expect(names).toEqual(['Profile']);
    });

    it('shows the plugin page under the marketplace', async () => {
      await show('/marketplace/$pluginId', '/marketplace/p1');
      const crumbs = await screen.findByRole('navigation', { name: 'Breadcrumb' });
      expect(within(crumbs).getByRole('link', { name: 'Marketplace' })).toHaveAttribute(
        'href',
        '/marketplace',
      );
      expect(within(crumbs).getByText('Plugin')).toHaveAttribute('aria-current', 'page');
    });

    it('shows no breadcrumb for an address it does not know and titles it with the product', async () => {
      await show('/somewhere', '/somewhere');
      await screen.findByRole('link', { name: 'Marketplace' });
      expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).not.toBeInTheDocument();
      await waitFor(() => expect(document.title).toBe('BoldCreate'));
    });
  });

  describe('keyboard', () => {
    it('opens the search for an organization with Ctrl+K', async () => {
      await show('/marketplace', '/marketplace');
      await screen.findByRole('button', { name: 'Switch organization' });
      await userEvent.keyboard('{Control>}k{/Control}');
      expect(
        await screen.findByRole('dialog', { name: 'Switch organization' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('opens it with the Command key too, and ignores other shortcuts', async () => {
      await show('/marketplace', '/marketplace');
      await screen.findByRole('button', { name: 'Switch organization' });
      await userEvent.keyboard('{Control>}j{/Control}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      await userEvent.keyboard('{Meta>}k{/Meta}');
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });

    it('offers a link that skips the navigation, to the main content', async () => {
      await show('/marketplace', '/marketplace');
      const skip = await screen.findByRole('link', { name: 'Skip to main content' });
      expect(skip).toHaveAttribute('href', '#main-content');
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    });

    it('closes the open navigation drawer with Escape', async () => {
      await show('/marketplace', '/marketplace');
      await userEvent.click(await screen.findByRole('button', { name: 'Open navigation' }));
      expect(screen.getAllByRole('button', { name: 'Close navigation' }).length).toBeGreaterThan(0);
      await userEvent.keyboard('{Escape}');
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument(),
      );
    });
  });

  describe('when the profile does not load', () => {
    it('says so and offers to try again', async () => {
      vi.spyOn(apiModule.auth, 'me').mockRejectedValue(new Error('down'));
      await renderWithRouter(AppLayout, '/marketplace', { queryData: [] });
      expect(await screen.findByText(/could not load your profile/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    });
  });
});
