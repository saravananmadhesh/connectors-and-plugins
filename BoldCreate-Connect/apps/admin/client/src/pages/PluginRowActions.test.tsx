import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminPluginSummary } from '../lib/api';
import { PLUGIN_ID, counts, detail, pageOf, summary } from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const LIST = '/api/v1/admin/plugins?';
const PLUGIN = `/api/v1/admin/plugins/${PLUGIN_ID}`;

const source = (lastStatus: 'queued' | 'running' | 'succeeded' | 'failed', lastError = '') => ({
  id: 's1',
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  path: 'sample',
  lastStatus,
  lastSyncedAt: null,
  lastError: lastError || null,
});

function stubList(
  item: AdminPluginSummary,
  extra: (method: string, path: string) => FakeReply | null = () => null,
) {
  return stubApi((method, path) => {
    if (path.endsWith('/session')) return SESSION;
    const custom = extra(method, path);
    if (custom) return custom;
    if (path === PLUGIN) return { status: 200, body: detail([]) };
    if (path.startsWith(LIST)) return { status: 200, body: pageOf([item]) };
    return { status: 200, body: { items: [] } };
  });
}

async function openMenu(name = 'Sample plugin') {
  const user = userEvent.setup();
  await user.click(await screen.findByRole('button', { name: `Actions for ${name}` }));
  return { user, menu: await screen.findByRole('menu') };
}

describe('plugin row menu', () => {
  it('syncs the plugin from the menu', async () => {
    const calls = stubList(summary({ source: source('succeeded') }), (method, path) =>
      method === 'POST' && path === `${PLUGIN}/sync` ? { status: 202 } : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Sync now' }));
    await waitFor(() => expect(calls.some((call) => call.path === `${PLUGIN}/sync`)).toBe(true));
  });

  it('shows a failed sync in the row and offers a retry', async () => {
    stubList(summary({ source: source('failed', 'Ref not found.') }));
    await renderApp('/plugins');
    expect(await screen.findByText('Sync failed')).toHaveAttribute('title', 'Ref not found.');
    const { menu } = await openMenu();
    expect(within(menu).getByRole('menuitem', { name: 'Retry sync' })).toBeInTheDocument();
  });

  it('shows a running sync in the row and blocks a second one', async () => {
    stubList(summary({ source: source('running') }));
    await renderApp('/plugins');
    expect(await screen.findByText('Syncing')).toBeInTheDocument();
    const { menu } = await openMenu();
    expect(within(menu).getByRole('menuitem', { name: 'Sync now' })).toHaveAttribute(
      'data-disabled',
    );
  });

  it('cannot sync a plugin that has no source', async () => {
    stubList(summary({ source: null }));
    await renderApp('/plugins');
    const { menu } = await openMenu();
    expect(within(menu).getByRole('menuitem', { name: 'Sync now' })).toHaveAttribute(
      'data-disabled',
    );
  });

  it.each([
    ['Make private', { visibility: 'private' }, {}],
    ['Make public', { visibility: 'public' }, { visibility: 'private' as const }],
    ['Mark as featured', { featured: true }, {}],
    ['Remove from featured', { featured: false }, { featured: true }],
    ['Mark as verified', { verified: true }, {}],
    ['Remove verified', { verified: false }, { verified: true }],
  ])('%s changes the plugin straight away', async (label, body, overrides) => {
    const calls = stubList(summary(overrides), (method, path) =>
      method === 'PATCH' && path === `${PLUGIN}/flags` ? { status: 200, body: {} } : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: label }));
    await waitFor(() => expect(calls.find((call) => call.method === 'PATCH')?.body).toEqual(body));
  });

  it('reactivates a suspended plugin without asking', async () => {
    const calls = stubList(summary({ status: 'suspended' }), (method, path) =>
      method === 'POST' && path === `${PLUGIN}/status` ? { status: 200, body: {} } : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    expect(within(menu).queryByRole('menuitem', { name: 'Suspend…' })).not.toBeInTheDocument();
    await user.click(within(menu).getByRole('menuitem', { name: 'Reactivate' }));
    await waitFor(() =>
      expect(calls.find((call) => call.path === `${PLUGIN}/status`)?.body).toEqual({
        status: 'active',
        force: false,
      }),
    );
  });

  it('shows what a suspension affects and needs an explicit go-ahead when installed', async () => {
    const calls = stubList(summary(), (method, path) => {
      if (path === `${PLUGIN}/impact`) {
        return { status: 200, body: { installations: 3, organizations: 2, users: 2 } };
      }
      return method === 'POST' && path === `${PLUGIN}/status` ? { status: 200, body: {} } : null;
    });
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Suspend…' }));

    const dialog = await screen.findByRole('dialog', { name: 'Suspend this plugin?' });
    expect(
      await within(dialog).findByText(/Affects 3 installations in 2 organizations/),
    ).toBeInTheDocument();
    const confirm = within(dialog).getByRole('button', { name: 'Suspend plugin' });
    expect(confirm).toBeDisabled();
    await user.click(within(dialog).getByRole('checkbox'));
    await user.click(confirm);
    await waitFor(() =>
      expect(calls.find((call) => call.path === `${PLUGIN}/status`)?.body).toEqual({
        status: 'suspended',
        force: true,
      }),
    );
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes the confirmation without changing anything when cancelled', async () => {
    const calls = stubList(summary(), (_method, path) =>
      path === `${PLUGIN}/impact`
        ? { status: 200, body: { installations: 0, organizations: 0, users: 0 } }
        : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Deprecate…' }));
    const dialog = await screen.findByRole('dialog', { name: 'Deprecate this plugin?' });
    expect(
      await within(dialog).findByText('Nothing is installed, so no one is affected.'),
    ).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'POST')).toBe(false);
  });

  it('refuses to delete a plugin that is installed', async () => {
    const calls = stubList(summary(), (_method, path) =>
      path === `${PLUGIN}/impact`
        ? { status: 200, body: { installations: 1, organizations: 1, users: 1 } }
        : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Delete…' }));
    const dialog = await screen.findByRole('dialog', {
      name: 'Delete this plugin and all of its versions?',
    });
    expect(
      await within(dialog).findByText(/cannot be removed while it is installed/),
    ).toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: 'Delete plugin' })).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'DELETE')).toBe(false);
  });

  it('deletes a plugin nobody has installed', async () => {
    const calls = stubList(summary(), (method, path) => {
      if (path === `${PLUGIN}/impact`) {
        return { status: 200, body: { installations: 0, organizations: 0, users: 0 } };
      }
      return method === 'DELETE' && path === PLUGIN ? { status: 204 } : null;
    });
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Delete…' }));
    const dialog = await screen.findByRole('dialog');
    await user.click(await within(dialog).findByRole('button', { name: 'Delete plugin' }));
    await waitFor(() =>
      expect(calls.some((call) => call.method === 'DELETE' && call.path === PLUGIN)).toBe(true),
    );
  });

  it('says why an action failed, in the row', async () => {
    stubList(summary(), (method, path) =>
      method === 'PATCH' && path === `${PLUGIN}/flags` ? ERROR('forbidden', 403) : null,
    );
    await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Make private' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('opens the plugin from its menu', async () => {
    stubList(summary({ versionCounts: counts({ pending: 1 }) }));
    const { router } = await renderApp('/plugins');
    const { user, menu } = await openMenu();
    await user.click(within(menu).getByRole('menuitem', { name: 'Open and review versions' }));
    await waitFor(() => expect(router.state.location.pathname).toBe(`/plugins/${PLUGIN_ID}`));
  });

  it('opens the plugin when the row is clicked', async () => {
    stubList(summary());
    const { router } = await renderApp('/plugins');
    const user = userEvent.setup();
    await user.click(await screen.findByText('sample-plugin'));
    await waitFor(() => expect(router.state.location.pathname).toBe(`/plugins/${PLUGIN_ID}`));
  });
});
