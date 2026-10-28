import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminPluginSummary } from '../lib/api';
import { counts, pageOf, summary } from '../test/fixtures';
import { renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const LIST = '/api/v1/admin/plugins?';

const plugin = (n: number, overrides: Partial<AdminPluginSummary> = {}): AdminPluginSummary =>
  summary({
    id: `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`,
    name: `plugin-${n}`,
    displayName: `Plugin ${n}`,
    ...overrides,
  });

const queryOf = (path: string): URLSearchParams => new URL(path, 'http://x').searchParams;

/** Serves the plugin list from `items`, ignoring the filters; the tests look at what was asked. */
function stubList(
  items: AdminPluginSummary[],
  extra: (method: string, path: string, body: unknown) => FakeReply | null = () => null,
  total = items.length,
) {
  return stubApi((method, path, body) => {
    if (path.endsWith('/session')) return SESSION;
    const custom = extra(method, path, body);
    if (custom) return custom;
    if (path === '/api/v1/admin/categories') {
      return {
        status: 200,
        body: {
          items: [{ id: 'c1', slug: 'tools', name: 'Tools', description: '', pluginCount: 1 }],
        },
      };
    }
    if (path.startsWith(LIST)) return { status: 200, body: pageOf(items, { total }) };
    return { status: 200, body: { items: [] } };
  });
}

// The sidebar asks for a page of one to count what waits for review; the table never does.
const lastList = (calls: { path: string }[]) =>
  queryOf(
    [...calls]
      .reverse()
      .find((call) => call.path.startsWith(LIST) && queryOf(call.path).get('pageSize') !== '1')
      ?.path ?? '',
  );

describe('plugin list', () => {
  it('says what to do when there are no plugins', async () => {
    stubList([]);
    await renderApp('/plugins');
    expect(await screen.findByText(/No plugins yet/)).toBeInTheDocument();
  });

  it('shows source, customizations, version, state and installations of each plugin', async () => {
    stubList([
      plugin(1, {
        kinds: ['mcp', 'skill'],
        componentCounts: { mcp: 2, skill: 3 },
        versionCounts: counts({ pending: 1, published: 2, yanked: 1 }),
        installations: 4,
        publishedVersion: '2.0.0',
        featured: true,
        categories: [{ id: 'c1', slug: 'tools', name: 'Tools' }],
      }),
      plugin(2, {
        status: 'suspended',
        visibility: 'private',
        kinds: [],
        componentCounts: {},
        source: null,
        versionCounts: counts({ approved: 1 }),
        publishedVersion: null,
      }),
    ]);
    await renderApp('/plugins');
    const first = (await screen.findByText('Plugin 1')).closest('tr') as HTMLElement;
    expect(within(first).getByText('acme/plugins')).toBeInTheDocument();
    expect(within(first).getByText('@main')).toBeInTheDocument();
    expect(
      within(first).getByRole('button', { name: '5 customizations in Plugin 1' }),
    ).toBeInTheDocument();
    expect(within(first).getByText('v2.0.0')).toBeInTheDocument();
    // The grid shows the published version only, not the state of the other versions.
    expect(within(first).queryByText(/to review|yanked|rejected/)).not.toBeInTheDocument();
    expect(within(first).getByText('Featured')).toBeInTheDocument();
    // The category column is hidden until it is picked.
    expect(within(first).queryByText('Tools')).not.toBeInTheDocument();
    expect(screen.queryByRole('columnheader', { name: 'Category' })).not.toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Columns' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: 'Category' }));
    expect(
      screen.getByRole('columnheader', { name: 'Category', hidden: true }),
    ).toBeInTheDocument();
    expect(within(first).getByText('Tools')).toBeInTheDocument();
    expect(within(first).getByText('4')).toBeInTheDocument();
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Installs' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('columnheader', { name: 'Installs' })).not.toBeInTheDocument();
    expect(within(first).getByText('Public')).toBeInTheDocument();

    const second = screen.getByText('Plugin 2').closest('tr') as HTMLElement;
    expect(within(second).getByText('Suspended')).toBeInTheDocument();
    expect(within(second).getByText('Private')).toBeInTheDocument();
    expect(within(second).getByText('None published')).toBeInTheDocument();
    expect(within(second).getByText('No source')).toBeInTheDocument();
    expect(within(second).getByText('—')).toBeInTheDocument();
    expect(first.querySelector('input[type="checkbox"]')).toBeNull();
  });

  it('lists the count per type when the total is hovered or focused', async () => {
    stubList([plugin(1, { componentCounts: { mcp: 2, skill: 3 } })]);
    await renderApp('/plugins');
    const user = userEvent.setup();
    const total = await screen.findByRole('button', { name: '5 customizations in Plugin 1' });
    await user.hover(total);
    const card = await screen.findByText('In this plugin');
    expect(within(card.parentElement as HTMLElement).getByText('Skills')).toBeInTheDocument();
    expect(within(card.parentElement as HTMLElement).getByText('MCP servers')).toBeInTheDocument();
    expect(within(card.parentElement as HTMLElement).getByText('3')).toBeInTheDocument();
    expect(within(card.parentElement as HTMLElement).queryByText('Hooks')).not.toBeInTheDocument();
  });

  it('asks the server to filter and sort and goes back to the first page', async () => {
    const calls = stubList([plugin(1)], () => null, 60);
    await renderApp('/plugins');
    const user = userEvent.setup();
    await screen.findByText('Plugin 1');
    expect(lastList(calls).get('page')).toBe('1');
    expect(lastList(calls).get('pageSize')).toBe('25');

    await user.click(screen.getByRole('button', { name: /Next/ }));
    await waitFor(() => expect(lastList(calls).get('page')).toBe('2'));

    await user.selectOptions(screen.getByLabelText('State'), 'suspended');
    await user.selectOptions(screen.getByLabelText('Visibility'), 'private');
    await user.selectOptions(screen.getByLabelText('Type'), 'mcp');
    await user.selectOptions(screen.getByLabelText('Version'), 'needs_review');
    await user.selectOptions(await screen.findByLabelText('Category'), 'tools');
    await user.selectOptions(screen.getByLabelText('Sort by'), 'installations');
    await user.click(screen.getByRole('button', { name: 'Sorted ascending' }));
    await waitFor(() => {
      const asked = lastList(calls);
      expect(Object.fromEntries(asked)).toEqual({
        page: '1',
        pageSize: '25',
        sort: 'installations',
        direction: 'desc',
        status: 'suspended',
        visibility: 'private',
        kind: 'mcp',
        versionStatus: 'needs_review',
        category: 'tools',
      });
    });
    await user.selectOptions(screen.getByLabelText('Per page'), '100');
    await waitFor(() => expect(lastList(calls).get('pageSize')).toBe('100'));
  });

  it('searches after typing stops and says when nothing matches', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
      if (path.startsWith(LIST)) {
        return { status: 200, body: pageOf(queryOf(path).get('q') === null ? [plugin(1)] : []) };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/plugins');
    const user = userEvent.setup();
    await screen.findByText('Plugin 1');
    await user.type(screen.getByLabelText('Search'), 'zzz');
    expect(await screen.findByText('No plugin matches these filters.')).toBeInTheDocument();
    expect(lastList(calls).get('q')).toBe('zzz');
  });

  it('pages through a long list and keeps the selection across pages', async () => {
    stubList([plugin(1), plugin(2)], () => null, 60);
    await renderApp('/plugins');
    const user = userEvent.setup();
    await screen.findByText('Plugin 1');
    expect(screen.getByText('Showing 1–2 of 60')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/ })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Select' }));
    await user.click(screen.getByLabelText('Select Plugin 1'));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await screen.findByText('Page 2 of 3');
    const bar = screen.getByRole('region', { name: 'Bulk actions' });
    expect(within(bar).getByText('1 selected')).toBeInTheDocument();
  });

  it('selects everything shown and clears the selection', async () => {
    stubList([plugin(1), plugin(2), plugin(3)]);
    await renderApp('/plugins');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Select' }));
    await user.click(await screen.findByLabelText('Select all shown'));
    const bar = screen.getByRole('region', { name: 'Bulk actions' });
    expect(within(bar).getByText('3 selected')).toBeInTheDocument();
    await user.click(within(bar).getByRole('button', { name: 'Clear' }));
    expect(screen.queryByRole('region', { name: 'Bulk actions' })).not.toBeInTheDocument();
  });

  it('leaves selecting mode and forgets the selection when Select is pressed again', async () => {
    stubList([plugin(1), plugin(2)]);
    await renderApp('/plugins');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Select' }));
    await user.click(screen.getByLabelText('Select Plugin 1'));
    expect(screen.getByRole('region', { name: 'Bulk actions' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Select' }));
    expect(screen.queryByRole('region', { name: 'Bulk actions' })).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Select Plugin 1')).not.toBeInTheDocument();
  });
});

describe('bulk actions on plugins', () => {
  const items = [plugin(1), plugin(2), plugin(3)];

  async function selectTwo() {
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Select' }));
    await user.click(await screen.findByLabelText('Select Plugin 1'));
    await user.click(screen.getByLabelText('Select Plugin 2'));
    return { user, bar: screen.getByRole('region', { name: 'Bulk actions' }) };
  }

  it('syncs the selected plugins', async () => {
    const calls = stubList(items, (method, path) =>
      method === 'POST' && path.endsWith('/bulk-sync')
        ? { status: 200, body: { queued: [items[0]!.id], skipped: [items[1]!.id] } }
        : null,
    );
    await renderApp('/plugins');
    const { user, bar } = await selectTwo();
    await user.click(within(bar).getByRole('button', { name: 'Sync selected' }));
    expect(
      await screen.findByText(
        'Sync queued for 1 plugin; 1 left out (already syncing or no source).',
      ),
    ).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/bulk-sync'))?.body).toEqual({
      ids: [items[0]!.id, items[1]!.id],
    });
  });

  it('publishes the latest version of the selected plugins', async () => {
    const calls = stubList(items, (method, path) =>
      method === 'POST' && path.endsWith('/bulk-publish-latest')
        ? {
            status: 200,
            body: {
              published: [{ id: items[0]!.id, versionId: items[0]!.id, version: '2.0.0' }],
              skipped: [{ id: items[1]!.id, reason: 'already_published' }],
            },
          }
        : null,
    );
    await renderApp('/plugins');
    const { user, bar } = await selectTwo();
    await user.click(within(bar).getByRole('button', { name: 'Publish latest' }));
    expect(
      await screen.findByText(
        'Published the latest version of 1 plugin; 1 left out (already published, rejected or yanked).',
      ),
    ).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/bulk-publish-latest'))?.body).toEqual({
      ids: [items[0]!.id, items[1]!.id],
    });
  });

  it('changes the state and offers to apply it to installed plugins anyway', async () => {
    let attempt = 0;
    const calls = stubList(items, (method, path, body) => {
      if (method !== 'POST' || !path.endsWith('/bulk-update')) return null;
      attempt += 1;
      const ids = (body as { ids: string[] }).ids;
      return attempt === 1
        ? {
            status: 200,
            body: { updated: [ids[0]], skipped: [{ id: ids[1], reason: 'installed' }] },
          }
        : { status: 200, body: { updated: ids, skipped: [] } };
    });
    await renderApp('/plugins');
    const { user, bar } = await selectTwo();
    await user.selectOptions(within(bar).getByLabelText('New state'), 'suspended');
    await user.click(within(bar).getByRole('button', { name: 'Apply state' }));
    expect(await screen.findByText(/1 plugin is installed by members/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Apply anyway' }));
    await waitFor(() => expect(attempt).toBe(2));
    const updates = calls.filter((call) => call.path.endsWith('/bulk-update'));
    expect(updates[0]?.body).toEqual({
      ids: [items[0]!.id, items[1]!.id],
      status: 'suspended',
      force: false,
    });
    expect(updates[1]?.body).toEqual({ ids: [items[1]!.id], status: 'suspended', force: true });
  });

  it('makes the selected plugins private or public', async () => {
    const calls = stubList(items, (method, path, body) =>
      method === 'POST' && path.endsWith('/bulk-update')
        ? { status: 200, body: { updated: (body as { ids: string[] }).ids, skipped: [] } }
        : null,
    );
    await renderApp('/plugins');
    const { user, bar } = await selectTwo();
    await user.click(within(bar).getByRole('button', { name: 'Make private' }));
    expect(await screen.findByText('Updated 2 plugins.')).toBeInTheDocument();
    await user.click(within(bar).getByRole('button', { name: 'Make public' }));
    await waitFor(() =>
      expect(
        calls.filter((call) => call.path.endsWith('/bulk-update')).map((call) => call.body),
      ).toEqual([
        { ids: [items[0]!.id, items[1]!.id], visibility: 'private', force: false },
        { ids: [items[0]!.id, items[1]!.id], visibility: 'public', force: false },
      ]),
    );
  });

  it('deletes the selected plugins after a confirmation and reports the ones kept', async () => {
    let remaining = items;
    const calls = stubList(items, (method, path, body) => {
      if (method === 'POST' && path.endsWith('/bulk-delete')) {
        const ids = (body as { ids: string[] }).ids;
        remaining = remaining.filter((item) => item.id === items[1]!.id || !ids.includes(item.id));
        return {
          status: 200,
          body: {
            deleted: ids.filter((id) => id !== items[1]!.id),
            skipped: [{ id: items[1]!.id, reason: 'installed' }],
          },
        };
      }
      if (path.startsWith(LIST)) return { status: 200, body: pageOf(remaining) };
      return null;
    });
    await renderApp('/plugins');
    const { user, bar } = await selectTwo();
    await user.click(within(bar).getByRole('button', { name: 'Delete selected' }));
    expect(calls.some((call) => call.path.endsWith('/bulk-delete'))).toBe(false);
    await user.click(within(bar).getByRole('button', { name: 'Yes, delete' }));

    expect(
      await screen.findByText('Deleted 1 plugin; 1 kept because members have them installed.'),
    ).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Plugin 1')).not.toBeInTheDocument());
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
  });

  it('shows no bulk actions until something is selected', async () => {
    stubList(items);
    await renderApp('/plugins');
    await screen.findByText('Plugin 1');
    expect(screen.queryByRole('region', { name: 'Bulk actions' })).not.toBeInTheDocument();
  });
});
