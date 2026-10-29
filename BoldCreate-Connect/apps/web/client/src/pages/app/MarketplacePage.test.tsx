/**
 * MarketplacePage tests.
 * Covers: cards with logo, name and customization counts, the logo fallback, search, multi
 * select categories and sort sent to the API, refresh, numbered pages, the install menu by scope
 * and the installed mark, empty states (nothing published, nothing matches) and the error retry.
 */
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MarketplacePage } from './MarketplacePage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

vi.mock('@/components/InstallDialog', () => ({
  InstallDialog: ({
    pluginName,
    version,
    scope,
  }: {
    pluginName: string;
    version: { id: string };
    scope: string;
  }) => (
    <div>
      installing {pluginName} {version.id} for {scope}
    </div>
  ),
}));

const ORG_ID = 'org_1' as Id<'org'>;

const plugin = (n: number): apiModule.PluginListItemResponse => ({
  id: `plg_${n}` as Id<'plg'>,
  name: `plugin-${n}`,
  displayName: `Plugin ${n}`,
  summary: `Summary ${n}`,
  keywords: [],
  status: 'active',
  visibility: 'public',
  publisherOrganizationId: null,
  featured: false,
  verified: false,
  categories: [{ slug: 'tools', name: 'Tools' }],
  logoUrl: null,
  updatedAt: new Date().toISOString(),
  latestVersion: { id: `pv_${n}` as Id<'pv'>, version: '1.0.0' },
  componentCounts: { agent: 0, skill: 2, mcp: 1, hook: 0, rule: 0 },
});

const page = (items: apiModule.PluginListItemResponse[], total = items.length, current = 1) => ({
  items,
  total,
  page: current,
  pageSize: 24,
});

const CATEGORIES = {
  items: [
    { slug: 'tools', name: 'Tools', description: '', pluginCount: 2 },
    { slug: 'data', name: 'Data', description: '', pluginCount: 1 },
  ],
};

const ME = {
  user: { id: 'usr_1', email: 'a@example.com', displayName: 'Ada' },
  memberships: [{ organizationId: ORG_ID, organizationName: 'Acme' }],
} as unknown as apiModule.MeResponse;

const EXTRA = [{ path: '/orgs/$orgId/marketplace/$pluginId', component: () => <div>detail</div> }];

function renderPage(url = `/orgs/${ORG_ID}/marketplace`) {
  return renderWithRouter(MarketplacePage, '/orgs/$orgId/marketplace', { extraRoutes: EXTRA, url });
}

function mockList(result = page([plugin(1), plugin(2)])) {
  return vi.spyOn(apiModule.marketplace, 'listPlugins').mockResolvedValue(result);
}

function mockAbilities(abilities: string[]) {
  vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
    userId: 'usr_1',
    role: 'member',
    // Everyone but a viewer lists the For You data, which is what lets them install for themselves.
    abilities: ['installation:list', ...abilities],
  } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
}

/** The plugin names installed per scope key: `org` or `me`. */
function mockInstalled(byScope: Record<string, string[]>, required: string[] = []) {
  vi.spyOn(apiModule.installations, 'list').mockImplementation((_orgId, scopeKey) =>
    Promise.resolve({
      items: (byScope[scopeKey] ?? []).map((pluginName) => ({
        pluginName,
        required: required.includes(pluginName),
      })),
      nextCursor: null,
    } as unknown as Awaited<ReturnType<typeof apiModule.installations.list>>),
  );
}

describe('MarketplacePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(apiModule.marketplace, 'listCategories').mockResolvedValue(CATEGORIES);
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    mockAbilities(['installation:create']);
    mockInstalled({ me: ['plugin-2'] });
  });
  afterEach(() => vi.restoreAllMocks());

  it('shows each plugin as a card with its name and what it customizes', async () => {
    mockList();
    await renderPage();
    expect(await screen.findByText('Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
    expect(screen.getAllByText('Skills')).toHaveLength(2);
    expect(screen.getAllByText('MCP')).toHaveLength(2);
    expect(screen.queryByText('Agents')).not.toBeInTheDocument();
    expect(screen.queryByText('Summary 1')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Plugin 1 details' })).toHaveAttribute(
      'href',
      `/orgs/${ORG_ID}/marketplace/plg_1`,
    );
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('shows the plugin logo and falls back to the tile when the logo fails', async () => {
    const logoUrl = 'https://raw.githubusercontent.com/o/r/abc/icon.png';
    mockList(page([{ ...plugin(1), logoUrl }]));
    const { container } = await renderPage();
    await screen.findByText('Plugin 1');
    const logo = container.querySelector(`img[src="${logoUrl}"]`);
    expect(logo).not.toBeNull();

    fireEvent.error(logo as Element);
    await waitFor(() => expect(container.querySelector('img')).toBeNull());
    expect(screen.getByText('Plugin 1')).toBeInTheDocument();
  });

  it('sends the search, ticked categories and sort to the API and returns to the first page', async () => {
    const list = mockList(page([plugin(1)], 60));
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');

    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 })),
    );

    await user.click(screen.getByRole('button', { name: 'Categories' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: /Tools/ }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /Data/ }));
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(
        expect.objectContaining({ categories: 'tools,data', page: 1 }),
      ),
    );
    await user.keyboard('{Escape}');

    await user.click(screen.getByRole('button', { name: 'Sort by' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Name A to Z' }));
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(
        expect.objectContaining({ sort: 'name', categories: 'tools,data' }),
      ),
    );

    await user.type(screen.getByLabelText('Search plugins'), 'review');
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(expect.objectContaining({ q: 'review' })),
    );
  });

  it('shows how many categories are ticked and clears them', async () => {
    mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(screen.getByRole('button', { name: 'Categories' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: /Tools/ }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /Data/ }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Categories' })).toHaveTextContent('2 categories');

    await user.click(screen.getByRole('button', { name: 'Categories' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Clear selection' }));
    expect(screen.getByRole('button', { name: 'Categories' })).toHaveTextContent('All categories');
  });

  it('refreshes the list on request', async () => {
    const list = mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(list).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: 'Refresh' }));
    await waitFor(() => expect(list).toHaveBeenCalledTimes(2));
  });

  it('pages with numbers and a count of everything that matches', async () => {
    const list = mockList(page([plugin(1)], 60));
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    const pages = screen.getByRole('navigation', { name: 'Pages' });
    expect(within(pages).getByText('1–24 of 60')).toBeInTheDocument();
    expect(within(pages).getByRole('button', { name: 'Previous page' })).toBeDisabled();

    await user.click(within(pages).getByRole('button', { name: 'Next page' }));
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 })),
    );
  });

  it('shows no page controls when everything fits on one page', async () => {
    mockList();
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(screen.queryByRole('navigation', { name: 'Pages' })).not.toBeInTheDocument();
  });

  it('moves to the last page when the address asks for one past the end', async () => {
    const list = vi
      .spyOn(apiModule.marketplace, 'listPlugins')
      .mockResolvedValue(page([plugin(1)], 30, 1));
    await renderPage(`/orgs/${ORG_ID}/marketplace?page=9`);
    await waitFor(() =>
      expect(list).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 })),
    );
  });

  it('opens the install dialog from the scope menu', async () => {
    mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(await screen.findByRole('button', { name: 'Install Plugin 1' }));
    await user.click(await screen.findByRole('menuitem', { name: 'For team' }));
    expect(await screen.findByText('installing Plugin 1 pv_1 for org')).toBeInTheDocument();
  });

  it('hides the scope a plugin is already installed in', async () => {
    mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(await screen.findByRole('button', { name: 'Install Plugin 2' }));
    expect(await screen.findByRole('menuitem', { name: 'For team' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'For me' })).not.toBeInTheDocument();
  });

  it('shows a plain installed mark once every offered scope holds the plugin', async () => {
    mockList();
    mockInstalled({ org: ['plugin-2'], me: ['plugin-2'] });
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(await screen.findByLabelText('Plugin 2 is installed')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Install Plugin 2' })).not.toBeInTheDocument();
  });

  it('offers only For me to a member who cannot install for the organization', async () => {
    mockList();
    mockAbilities([]);
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(await screen.findByRole('button', { name: 'Install Plugin 1' }));
    expect(await screen.findByRole('menuitem', { name: 'For me' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'For team' })).not.toBeInTheDocument();
  });

  it('still offers the narrower scopes once the organization holds the plugin', async () => {
    mockList();
    mockInstalled({ org: ['plugin-1'] });
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(await screen.findByRole('button', { name: 'Install Plugin 1' }));
    expect(await screen.findByRole('menuitem', { name: 'For me' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'For team' })).not.toBeInTheDocument();
  });

  it('shows the verified and featured marks only when the plugin has them', async () => {
    mockList(
      page([
        { ...plugin(1), verified: true },
        { ...plugin(2), featured: true },
      ]),
    );
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(screen.getAllByRole('img', { name: 'Verified' })).toHaveLength(1);
    expect(screen.getAllByRole('img', { name: 'Featured' })).toHaveLength(1);
  });

  it('lists categories without counts', async () => {
    mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(screen.getByRole('button', { name: 'Categories' }));
    const tools = await screen.findByRole('menuitemcheckbox', { name: 'Tools' });
    expect(tools).toBeInTheDocument();
  });

  it('offers For team and For me, and passes the choice on', async () => {
    mockList();
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText('Plugin 1');
    await user.click(await screen.findByRole('button', { name: 'Install Plugin 1' }));
    expect(await screen.findByRole('menuitem', { name: 'For team' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'For me' }));
    expect(await screen.findByText('installing Plugin 1 pv_1 for user')).toBeInTheDocument();
  });

  it('offers no install when the plugin has no published version', async () => {
    mockList(page([{ ...plugin(1), latestVersion: null }]));
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(screen.queryByRole('button', { name: /^Install/ })).not.toBeInTheDocument();
  });

  it('says what to do when nothing is published', async () => {
    mockList(page([]));
    await renderPage();
    expect(await screen.findByText(/No plugins are published yet/)).toBeInTheDocument();
  });

  it('says what to do when filters match nothing', async () => {
    mockList(page([]));
    const user = userEvent.setup();
    await renderPage();
    await screen.findByText(/No plugins are published yet/);
    await user.type(screen.getByLabelText('Search plugins'), 'zzz');
    expect(await screen.findByText(/No plugins match these filters/)).toBeInTheDocument();
  });

  it('shows a plain error with a retry', async () => {
    vi.spyOn(apiModule.marketplace, 'listPlugins')
      .mockRejectedValueOnce(new apiModule.ApiError(500, 'internal_error', 'boom'))
      .mockResolvedValueOnce(page([plugin(1)]));
    const user = userEvent.setup();
    await renderPage();
    expect(await screen.findByText(/Could not load the marketplace/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByText('Plugin 1')).toBeInTheDocument();
  });

  it('renders no install button and no notice for a member who cannot install anything', async () => {
    mockList();
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
      userId: 'usr_1',
      role: 'member',
      abilities: ['installation:list'],
      policy: { allowPersonalInstalls: false },
    } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(screen.queryByRole('button', { name: /^Install / })).not.toBeInTheDocument();
    expect(screen.queryByText(/Managed by your organization/)).not.toBeInTheDocument();
  });

  it('offers a viewer no install at all, even when personal installs are open', async () => {
    mockList();
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
      userId: 'usr_1',
      role: 'viewer',
      abilities: ['org:read', 'project:read'],
      policy: { allowPersonalInstalls: true },
    } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
    await renderPage();
    await screen.findByText('Plugin 1');
    expect(screen.queryByRole('button', { name: /^Install / })).not.toBeInTheDocument();
  });
});
