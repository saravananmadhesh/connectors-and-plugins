/**
 * PluginDetailPage tests.
 * Covers: overview, one tab per kind present, versions tab, unavailable plugin.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { PluginDetailPage } from './PluginDetailPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const PLUGIN_ID = 'plg_1' as Id<'plg'>;
const VERSION = {
  id: 'pv_1' as Id<'pv'>,
  pluginId: PLUGIN_ID,
  version: '1.2.0',
  publishedAt: new Date().toISOString(),
  status: 'published' as const,
};

const DETAIL: apiModule.PluginDetailResponse = {
  id: PLUGIN_ID,
  name: 'review-tools',
  displayName: 'Review tools',
  summary: 'Code review helpers',
  description: 'Longer description',
  repositoryUrl: 'https://github.com/acme/tools/tree/abc/plugin',
  keywords: [],
  status: 'active',
  visibility: 'public',
  publisherOrganizationId: null,
  featured: false,
  verified: true,
  categories: [{ slug: 'tools', name: 'Tools' }],
  logoUrl: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  latestVersion: VERSION,
  components: [
    {
      id: 'cmp_1' as Id<'cmp'>,
      kind: 'skill',
      name: 'review',
      description: 'Reviews pull requests',
      transport: null,
      url: null,
      sourceUrl: 'https://github.com/acme/tools/tree/abc/skills/review',
    },
    {
      id: 'cmp_2' as Id<'cmp'>,
      kind: 'mcp',
      name: 'github',
      description: 'GitHub server',
      transport: 'http',
      url: 'https://api.github.example/mcp',
      sourceUrl: null,
    },
  ],
};

const EXTRA = [{ path: '/marketplace', component: () => <div>marketplace</div> }];

beforeEach(() => {
  vi.spyOn(apiModule.auth, 'me').mockResolvedValue({
    user: { id: 'usr_1', email: 'a@example.com', displayName: 'Ada' },
    memberships: [{ organizationId: 'org_1', organizationName: 'Acme' }],
  } as unknown as apiModule.MeResponse);
  vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
    userId: 'usr_1',
    role: 'member',
    abilities: ['installation:list'],
  } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
  vi.spyOn(apiModule.installations, 'list').mockResolvedValue({
    items: [],
    nextCursor: null,
  });
});

function renderPage() {
  return renderWithRouter(PluginDetailPage, '/marketplace/$pluginId', {
    extraRoutes: EXTRA,
    url: `/marketplace/${PLUGIN_ID}`,
  });
}

describe('PluginDetailPage', () => {
  afterEach(() => vi.restoreAllMocks());

  it('links the title to the repository and lists customizations by kind with source links', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue(DETAIL);
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [VERSION],
      nextCursor: null,
    });
    await renderPage();
    expect(await screen.findByRole('heading', { name: /Review tools/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Review tools on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/acme/tools/tree/abc/plugin',
    );
    expect(screen.queryByRole('tab', { name: /Overview/ })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'MCPs' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Hooks' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /review/ })).toHaveAttribute(
      'href',
      'https://github.com/acme/tools/tree/abc/skills/review',
    );
    expect(screen.getByText('Reviews pull requests')).toBeInTheDocument();
    expect(screen.getByText('github')).toBeInTheDocument();
    expect(screen.getByText('http')).toBeInTheDocument();
    expect(screen.getByText('https://api.github.example/mcp')).toBeInTheDocument();
  });

  it('folds a long list after five and expands it on request', async () => {
    const skills = Array.from({ length: 7 }, (_, i) => ({
      id: `cmp_${i}` as Id<'cmp'>,
      kind: 'skill' as const,
      name: `skill-${i}`,
      description: `Skill ${i} description`,
      transport: null,
      url: null,
      sourceUrl: null,
    }));
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue({
      ...DETAIL,
      components: skills,
    });
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    const user = userEvent.setup();
    await renderPage();
    expect(await screen.findByText('skill-4')).toBeInTheDocument();
    expect(screen.queryByText('skill-5')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show 2 more skills' }));
    expect(screen.getByText('skill-6')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show fewer' }));
    expect(screen.queryByText('skill-5')).not.toBeInTheDocument();
  });

  it('shows the verified and featured marks by availability and the supported install scope', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue({ ...DETAIL, featured: true });
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [VERSION],
      nextCursor: null,
    });
    const user = userEvent.setup();
    await renderPage();
    expect(await screen.findByRole('img', { name: 'Verified' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Featured' })).toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: 'Install Review tools' }));
    expect(await screen.findByRole('menuitem', { name: 'For me' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'For team' })).not.toBeInTheDocument();
  });

  it('shows no marks for a plugin that is neither verified nor featured', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue({ ...DETAIL, verified: false });
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    await renderPage();
    await screen.findByRole('heading', { name: /Review tools/ });
    expect(screen.queryByRole('img', { name: 'Verified' })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Featured' })).not.toBeInTheDocument();
  });

  it('lists the published versions', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue(DETAIL);
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [VERSION],
      nextCursor: null,
    });
    const user = userEvent.setup();
    await renderPage();
    await user.click(await screen.findByRole('tab', { name: /^Versions/ }));
    expect(await screen.findByText('Latest')).toBeInTheDocument();
  });

  it('says so when a plugin has no components', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue({
      ...DETAIL,
      components: [],
    });
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    await renderPage();
    expect(await screen.findByText('This plugin has no customizations.')).toBeInTheDocument();
  });

  it('explains an unavailable plugin and links back', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockRejectedValue(
      new apiModule.ApiError(404, 'not_found', 'Not found'),
    );
    await renderPage();
    expect(await screen.findByText(/This plugin is not available/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to the marketplace' })).toBeInTheDocument();
  });

  it('says the organization manages installs when the member cannot install anything', async () => {
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
      userId: 'usr_1',
      role: 'member',
      abilities: ['installation:list'],
      policy: { allowPersonalInstalls: false },
    } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue(DETAIL);
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [VERSION],
      nextCursor: null,
    });
    await renderPage();
    expect(await screen.findByText('Managed by your organization')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Install / })).not.toBeInTheDocument();
  });

  it('keeps the install button for a member who may install for themselves', async () => {
    vi.spyOn(apiModule.marketplace, 'getPlugin').mockResolvedValue(DETAIL);
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue({
      items: [VERSION],
      nextCursor: null,
    });
    await renderPage();
    expect(await screen.findByRole('button', { name: /^Install / })).toBeInTheDocument();
    expect(screen.queryByText('Managed by your organization')).not.toBeInTheDocument();
  });
});
