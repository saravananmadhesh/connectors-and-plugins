import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AdminAuditListResponse,
  AdminPluginDetailResponse,
  AdminStatsResponse,
} from '../lib/api';
import { PLUGIN_ID, detail } from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';
import { EMPTY_STATS } from '../test/stats';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const PLUGIN = `/api/v1/admin/plugins/${PLUGIN_ID}`;
const SOURCE = (
  lastStatus: 'succeeded' | 'queued' | 'failed' | null,
  lastError: string | null = null,
) => ({
  id: 's1',
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  path: 'alpha',
  lastStatus,
  lastSyncedAt: '2026-10-11T00:00:00.000Z',
  lastError,
});
const withDetail = (overrides: Partial<AdminPluginDetailResponse> = {}) =>
  detail([], { keywords: ['one', 'two'], description: 'The long text.', ...overrides });

describe('plugin details', () => {
  it('saves the edited details and says a sync keeps them', async () => {
    let current = withDetail();
    const calls = stubApi((method, path, body) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
      if (method === 'PATCH' && path === PLUGIN) {
        current = {
          ...current,
          ...(body as Partial<AdminPluginDetailResponse>),
          metadataEdited: true,
          updatedAt: '2026-10-12T00:00:00.000Z',
        };
        return { status: 200, body: current };
      }
      return { status: 200, body: current };
    });
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    const user = userEvent.setup();
    const name = await screen.findByLabelText('Display name');
    expect(screen.getByLabelText(/Keywords/)).toHaveValue('one, two');
    expect(screen.getByRole('button', { name: 'Save details' })).toBeDisabled();

    await user.clear(name);
    await user.type(name, 'Renamed plugin');
    await user.clear(screen.getByLabelText(/Keywords/));
    await user.type(screen.getByLabelText(/Keywords/), 'fast,  safe , ');
    await user.click(screen.getByRole('button', { name: 'Save details' }));

    expect(await screen.findByText(/Syncing from the source keeps these details/)).toBeVisible();
    expect(calls.find((call) => call.method === 'PATCH')?.body).toEqual({
      displayName: 'Renamed plugin',
      summary: 'Does sample things.',
      description: 'The long text.',
      keywords: ['fast', 'safe'],
    });
  });

  it('shows the server message when the details are refused', async () => {
    stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
      if (method === 'PATCH') return ERROR('validation_failed', 422);
      return { status: 200, body: withDetail() };
    });
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    const user = userEvent.setup();
    const name = await screen.findByLabelText('Display name');
    await user.type(name, '!');
    await user.click(screen.getByRole('button', { name: 'Save details' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});

describe('plugin source', () => {
  function stubSource(
    source: ReturnType<typeof SOURCE> | null,
    onWrite?: (method: string, path: string, body: unknown) => FakeReply | null,
  ) {
    let current = withDetail({ source });
    return stubApi((method, path, body) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
      if (method !== 'GET') {
        const custom = onWrite?.(method, path, body);
        if (custom) {
          if (path === `${PLUGIN}/source` && custom.status === 200) {
            const next = body as { owner: string; repository: string; ref: string; path: string };
            current = withDetail({
              source: { ...SOURCE('queued'), ...next },
            });
            return { status: 200, body: current };
          }
          return custom;
        }
      }
      return { status: 200, body: current };
    });
  }

  it('queues a sync from the source tab, where the button lives', async () => {
    let status: 'succeeded' | 'queued' = 'succeeded';
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
      if (method === 'POST' && path === `${PLUGIN}/sync`) {
        status = 'queued';
        return { status: 202 };
      }
      return { status: 200, body: withDetail({ source: SOURCE(status) }) };
    });
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    const panel = await screen.findByRole('region', { name: 'Source' });
    expect(within(panel).getByText('acme/plugins/alpha')).toBeInTheDocument();
    expect(within(panel).getByText('Synced')).toBeInTheDocument();
    await user.click(within(panel).getByRole('button', { name: 'Check for new versions' }));
    expect(await within(panel).findByRole('button', { name: 'Sync in progress' })).toBeDisabled();
    expect(within(panel).getByText('Waiting to sync')).toBeInTheDocument();
    expect(calls.some((call) => call.path === `${PLUGIN}/sync`)).toBe(true);
    expect(calls.some((call) => call.path.includes('plugin-sources'))).toBe(false);
  });

  it('links to the folder on GitHub', async () => {
    stubSource(SOURCE('succeeded'));
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const link = await screen.findByRole('link', { name: 'Open on GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/acme/plugins/tree/main/alpha');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('shows why the last sync failed', async () => {
    stubSource(SOURCE('failed', 'Ref not found.'));
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const panel = await screen.findByRole('region', { name: 'Source' });
    expect(within(panel).getByText('Last sync failed')).toBeInTheDocument();
    expect(within(panel).getByText('Ref not found.')).toBeInTheDocument();
  });

  it('has nothing to sync when the plugin has no source, and offers to set one', async () => {
    stubSource(null);
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    expect(await screen.findByText(/has no source, so there is nothing to sync/)).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Check for new versions' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set source' })).toBeInTheDocument();
  });

  it('moves the plugin to another repository, branch and folder', async () => {
    const calls = stubSource(SOURCE('succeeded'), (method, path) =>
      method === 'PUT' && path === `${PLUGIN}/source` ? { status: 200, body: {} } : null,
    );
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Edit source' }));
    const form = await screen.findByRole('form', { name: 'Edit source' });
    const repository = within(form).getByLabelText('Repository');
    expect(repository).toHaveValue('acme/plugins');
    fireEvent.change(repository, { target: { value: 'https://github.com/acme/other-plugins' } });
    await user.clear(within(form).getByLabelText('Branch or tag'));
    await user.type(within(form).getByLabelText('Branch or tag'), 'v2');
    await user.clear(within(form).getByLabelText('Folder in the repository'));
    await user.type(within(form).getByLabelText('Folder in the repository'), '/tools/alpha/');
    await user.click(within(form).getByRole('button', { name: 'Save and sync' }));

    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PUT')?.body).toEqual({
        owner: 'acme',
        repository: 'other-plugins',
        ref: 'v2',
        path: 'tools/alpha',
      }),
    );
    await waitFor(() => expect(screen.queryByRole('form', { name: 'Edit source' })).toBeNull());
  });

  it('takes the folder and branch from a pasted link to a folder', async () => {
    const calls = stubSource(SOURCE('succeeded'), (method, path) =>
      method === 'PUT' && path === `${PLUGIN}/source` ? { status: 200, body: {} } : null,
    );
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Edit source' }));
    const form = await screen.findByRole('form', { name: 'Edit source' });
    fireEvent.change(within(form).getByLabelText('Repository'), {
      target: { value: 'https://github.com/acme/plugins/tree/release/plugins/beta' },
    });
    await user.clear(within(form).getByLabelText('Branch or tag'));
    await user.clear(within(form).getByLabelText('Folder in the repository'));
    await user.click(within(form).getByRole('button', { name: 'Save and sync' }));
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PUT')?.body).toEqual({
        owner: 'acme',
        repository: 'plugins',
        ref: 'release',
        path: 'plugins/beta',
      }),
    );
  });

  it('refuses something that is not a repository link before asking the server', async () => {
    const calls = stubSource(SOURCE('succeeded'));
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Edit source' }));
    const form = await screen.findByRole('form', { name: 'Edit source' });
    fireEvent.change(within(form).getByLabelText('Repository'), {
      target: { value: 'https://example.com/nope' },
    });
    await user.click(within(form).getByRole('button', { name: 'Save and sync' }));
    expect(await within(form).findByRole('alert')).toHaveTextContent(
      'not a GitHub repository link',
    );
    expect(calls.some((call) => call.method === 'PUT')).toBe(false);
  });

  it('says why a source change was refused and keeps the form open', async () => {
    stubSource(SOURCE('succeeded'), (method) => (method === 'PUT' ? ERROR('conflict', 409) : null));
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Edit source' }));
    const form = await screen.findByRole('form', { name: 'Edit source' });
    await user.click(within(form).getByRole('button', { name: 'Save and sync' }));
    expect(await within(form).findByRole('alert')).toHaveTextContent(
      'cannot be done in the current state',
    );
    expect(screen.getByRole('form', { name: 'Edit source' })).toBeInTheDocument();
  });

  it('closes the form without saving when cancelled', async () => {
    const calls = stubSource(SOURCE('succeeded'));
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Edit source' }));
    await user.click(await screen.findByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('form', { name: 'Edit source' })).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'PUT')).toBe(false);
  });
});

describe('dashboard', () => {
  const stats: AdminStatsResponse = {
    ...EMPTY_STATS,
    totals: {
      plugins: 12,
      versions: 30,
      sources: 9,
      categories: 4,
      installations: 21,
      organizations: 5,
      users: 8,
    },
    pluginsByStatus: { active: 10, deprecated: 1, suspended: 1 },
    versionsByStatus: { pending: 2, approved: 1, published: 25, rejected: 1, yanked: 1 },
    needsReview: 3,
    sourcesByStatus: { succeeded: 7, failed: 2, queued: 0, running: 0, neverSynced: 0 },
    timeline: [
      { date: '2026-10-10', versionsIngested: 2, syncsSucceeded: 3, syncsFailed: 1 },
      { date: '2026-10-11', versionsIngested: 0, syncsSucceeded: 1, syncsFailed: 0 },
    ],
    categories: [{ name: 'General', plugins: 12 }],
    topPlugins: [{ id: PLUGIN_ID, name: 'alpha', displayName: 'Alpha', installations: 9 }],
    components: {
      total: 14,
      byKind: { skill: 6, agent: 2, mcp: 3, hook: 1, rule: 2 },
      pluginsByKind: { skill: 5, agent: 2, mcp: 3, hook: 1, rule: 2 },
    },
  };
  const activity: AdminAuditListResponse = {
    nextCursor: null,
    items: [
      {
        id: '00000000-0000-4000-8000-0000000000c1',
        at: '2026-10-11T08:00:00.000Z',
        actorId: 'ops@example.test',
        actorKind: 'platform_admin',
        action: 'plugin.updated',
        targetKind: 'plugin',
        targetId: PLUGIN_ID,
        result: 'success',
        context: { name: 'alpha' },
        orgId: null,
        requestId: null,
        ip: null,
      },
    ],
  };

  it('shows the totals, the customizations, what needs attention and the activity', async () => {
    stubApi(
      (_method, path) => {
        if (path.endsWith('/session')) return SESSION;
        return { status: 200, body: { items: [] } };
      },
      stats,
      activity,
    );
    await renderApp('/');
    const section = await screen.findByRole('region', { name: 'Statistics' });
    expect(await within(section).findByText('10 active')).toBeInTheDocument();
    expect(within(section).getByText('25 published')).toBeInTheDocument();
    expect(within(section).getByText('In published versions')).toBeInTheDocument();
    expect(within(section).getByText('14')).toBeInTheDocument();
    expect(within(section).getByText(/3 plugins have versions waiting for review/)).toBeVisible();
    expect(within(section).getByText(/2 sources failed the last sync/)).toBeVisible();
    expect(within(section).getByText(/5 syncs finished, 1 failed; 2 new versions/)).toBeVisible();
    const kinds = within(section).getByRole('region', { name: 'Customizations by type' });
    expect(kinds).toHaveTextContent('Skills');
    expect(kinds).toHaveTextContent('MCP servers');
    expect(
      within(section).getByRole('region', { name: 'Plugins that include each type' }),
    ).toHaveTextContent('Agents');
    expect(within(section).getByRole('region', { name: 'Plugins per category' })).toHaveTextContent(
      'General',
    );
    expect(
      within(section).getByRole('region', { name: 'Most installed plugins' }),
    ).toHaveTextContent('Alpha');

    // Counts are numbers, not bars scaled to the largest one.
    const byCategory = within(section).getByRole('region', { name: 'Plugins per category' });
    expect(within(byCategory).getByText('12')).toBeInTheDocument();
    expect(byCategory.querySelector('[style*="width"]')).toBeNull();
    expect(
      within(section).getByRole('region', { name: 'Versions by status' }).querySelector('[style]'),
    ).toBeNull();

    const recent = within(section).getByRole('region', { name: 'Recent activity' });
    expect(within(recent).getByText('Edited the details of a plugin')).toBeInTheDocument();
    expect(within(recent).getByRole('link', { name: 'alpha' })).toHaveAttribute(
      'href',
      `/plugins/${PLUGIN_ID}`,
    );
    expect(within(recent).getByRole('link', { name: 'View all' })).toHaveAttribute(
      'href',
      '/audit',
    );
  });

  it('says there is no activity yet', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/');
    const recent = await screen.findByRole('region', { name: 'Recent activity' });
    expect(await within(recent).findByText('No activity yet.')).toBeInTheDocument();
  });

  it('shows the error when the activity cannot be loaded', async () => {
    stubApi(
      (_method, path) => {
        if (path.endsWith('/session')) return SESSION;
        if (path.startsWith('/api/v1/admin/audit')) return ERROR('internal', 500);
        return { status: 200, body: { items: [] } };
      },
      EMPTY_STATS,
      null,
    );
    await renderApp('/');
    const recent = await screen.findByRole('region', { name: 'Recent activity' });
    expect(await within(recent).findByRole('alert')).toBeInTheDocument();
  });

  it('loads another period when it is chosen', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: '90 days' }));
    await screen.findByRole('button', { name: '90 days', pressed: true });
    expect(calls.some((call) => call.path === '/api/v1/admin/stats?days=90')).toBe(true);
  });

  it('shows the error when the statistics cannot be loaded', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return ERROR('internal', 500);
    }, null);
    await renderApp('/');
    expect((await screen.findAllByRole('alert')).length).toBeGreaterThan(0);
  });
});
