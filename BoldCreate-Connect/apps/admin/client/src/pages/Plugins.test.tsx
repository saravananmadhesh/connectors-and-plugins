import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminPluginDetailResponse, AdminVersionSummary } from '../lib/api';
import {
  NO_IMPACT,
  counts,
  PLUGIN_ID,
  SOME_IMPACT,
  detail,
  pageOf,
  summary,
  version,
} from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const pending = version({ id: 'v-pending', version: '2.0.0', status: 'pending', findings: 1 });
const published = version({ id: 'v-live', version: '1.0.0', status: 'published' });
const yanked = version({ id: 'v-old', version: '0.5.0', status: 'yanked' });

function stubPlugin(
  options: {
    impact?: typeof NO_IMPACT;
    plugin?: Partial<AdminPluginDetailResponse>;
    versions?: AdminVersionSummary[];
    onWrite?: (method: string, path: string, body: unknown) => FakeReply;
  } = {},
) {
  const versions = options.versions ?? [pending, published, yanked];
  return stubApi((method, path, body) => {
    if (path.endsWith('/session')) return SESSION;
    if (method !== 'GET') {
      return options.onWrite?.(method, path, body) ?? { status: 200, body: detail(versions) };
    }
    if (path.startsWith('/api/v1/admin/plugins?'))
      return { status: 200, body: pageOf([summary()]) };
    if (path === '/api/v1/admin/categories') return { status: 200, body: { items: [] } };
    if (path.endsWith('/impact')) return { status: 200, body: options.impact ?? NO_IMPACT };
    return { status: 200, body: detail(versions, options.plugin) };
  });
}

async function openMenu() {
  const user = userEvent.setup();
  await user.click(await screen.findByRole('button', { name: 'Actions for Sample plugin' }));
  return { user, menu: await screen.findByRole('menu') };
}

describe('plugin detail', () => {
  it('starts with the versions and the numbers that matter, and nothing else', async () => {
    stubPlugin({ plugin: { versionCounts: counts({ pending: 1, published: 1, yanked: 1 }) } });
    const { container } = await renderApp(`/plugins/${PLUGIN_ID}`);
    expect(await screen.findByRole('heading', { name: 'Sample plugin' })).toBeInTheDocument();
    expect(screen.getByText('Does sample things.')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Versions/, selected: true })).toBeInTheDocument();

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows).toHaveLength(4);
    expect(within(rows[1] as HTMLElement).getByText('v2.0.0')).toBeInTheDocument();
    expect(within(rows[1] as HTMLElement).getByText('Pending review')).toBeInTheDocument();
    expect(within(rows[1] as HTMLElement).getByText('1 secret')).toBeInTheDocument();
    expect(within(rows[2] as HTMLElement).getByText('Published')).toBeInTheDocument();
    expect(within(rows[3] as HTMLElement).getByText('Yanked')).toBeInTheDocument();

    // The longer text, the forms and the source are behind buttons.
    expect(screen.queryByText('A longer description.')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Display name')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Source' })).not.toBeInTheDocument();
    expect(container.querySelector('[data-logo]')).not.toBeNull();
    expect(screen.getByText('1 to review')).toBeInTheDocument();
  });

  it('shows the longer text only when asked', async () => {
    stubPlugin();
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Show details' }));
    expect(screen.getByText('A longer description.')).toBeInTheDocument();
    expect(screen.getByText('sample-plugin')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Hide details' }));
    expect(screen.queryByText('A longer description.')).not.toBeInTheDocument();
  });

  it('opens a version from its row', async () => {
    stubPlugin();
    const { router } = await renderApp(`/plugins/${PLUGIN_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByText('Yanked'));
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(`/plugins/${PLUGIN_ID}/versions/v-old`),
    );
  });

  it('switches between versions, edit, source and history, and keeps the tab in the address', async () => {
    stubPlugin();
    const { router } = await renderApp(`/plugins/${PLUGIN_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('tab', { name: 'Edit' }));
    expect(await screen.findByLabelText('Display name')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    await waitFor(() => expect(router.state.location.search).toEqual({ tab: 'edit' }));

    await user.click(screen.getByRole('tab', { name: 'Source' }));
    expect(await screen.findByRole('region', { name: 'Source' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /Versions/ }));
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(router.state.location.search).toEqual({});
  });

  it('opens on the tab the address names, and moves between tabs with the arrow keys', async () => {
    stubPlugin();
    await renderApp(`/plugins/${PLUGIN_ID}?tab=source`);
    const user = userEvent.setup();
    const source = await screen.findByRole('tab', { name: 'Source', selected: true });
    source.focus();
    await user.keyboard('{ArrowRight}');
    expect(await screen.findByRole('tab', { name: 'History', selected: true })).toHaveFocus();
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(await screen.findByRole('tab', { name: 'Edit', selected: true })).toBeInTheDocument();
  });

  it('ignores a tab name it does not know', async () => {
    stubPlugin();
    await renderApp(`/plugins/${PLUGIN_ID}?tab=nonsense`);
    expect(
      await screen.findByRole('tab', { name: /Versions/, selected: true }),
    ).toBeInTheDocument();
  });

  it('says a sync failed and takes the operator to the source', async () => {
    stubPlugin({
      plugin: {
        source: {
          ...summary().source!,
          lastStatus: 'failed',
          lastError: 'Ref not found.',
        },
      },
    });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('The last sync failed.');
    expect(alert).toHaveTextContent('Ref not found.');
    const user = userEvent.setup();
    await user.click(within(alert).getByRole('button', { name: 'Open source' }));
    expect(await screen.findByRole('region', { name: 'Source' })).toBeInTheDocument();
  });

  it('shows a sync in progress without a button for it in the first view', async () => {
    stubPlugin({ plugin: { source: { ...summary().source!, lastStatus: 'running' } } });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    expect(await screen.findByText('Checking the source for new versions…')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /new versions/ })).not.toBeInTheDocument();
  });

  it('suspends a plugin from its menu', async () => {
    const calls = stubPlugin();
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const { user, menu } = await openMenu();
    expect(within(menu).queryByRole('menuitem', { name: /^Open/ })).not.toBeInTheDocument();
    await user.click(within(menu).getByRole('menuitem', { name: 'Suspend…' }));
    await user.click(await screen.findByRole('button', { name: 'Suspend plugin' }));
    await waitFor(() =>
      expect(calls.find((call) => call.path.endsWith('/status'))?.body).toEqual({
        status: 'suspended',
        force: false,
      }),
    );
  });

  it('reactivates a suspended plugin straight away', async () => {
    const calls = stubPlugin({ plugin: { status: 'suspended' } });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Reactivate' }));
    await waitFor(() =>
      expect(calls.find((call) => call.path.endsWith('/status'))?.body).toEqual({
        status: 'active',
        force: false,
      }),
    );
  });

  it('cannot delete a plugin that is installed', async () => {
    const calls = stubPlugin({ impact: SOME_IMPACT });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Delete…' }));
    expect(await screen.findByText(/cannot be removed while it is installed/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete plugin' })).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'DELETE')).toBe(false);
  });

  it('deletes an unused plugin and returns to the list', async () => {
    const calls = stubPlugin({ onWrite: () => ({ status: 204 }) });
    const { router } = await renderApp(`/plugins/${PLUGIN_ID}`);
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Delete…' }));
    await user.click(await screen.findByRole('button', { name: 'Delete plugin' }));
    await waitFor(() => expect(calls.some((call) => call.method === 'DELETE')).toBe(true));
    await waitFor(() => expect(router.state.location.pathname).toBe('/plugins'));
  });

  it('tells the operator when the plugin does not exist', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return ERROR('not_found', 404);
    });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    expect(await screen.findByRole('alert')).toHaveTextContent('no longer exists');
  });

  it('has no versions to list for a plugin that has none', async () => {
    stubPlugin({ versions: [] });
    await renderApp(`/plugins/${PLUGIN_ID}`);
    expect(await screen.findByText('This plugin has no versions yet.')).toBeInTheDocument();
  });
});
