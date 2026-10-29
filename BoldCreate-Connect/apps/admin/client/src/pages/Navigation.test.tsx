import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PLUGIN_ID, detail, pageOf, summary } from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const stub = (waiting = 0) =>
  stubApi((method, path) => {
    if (path.endsWith('/session')) return SESSION;
    if (method === 'POST' && path.endsWith('/signout')) return { status: 204 };
    if (path.startsWith('/api/v1/admin/plugins?')) {
      return {
        status: 200,
        body: pageOf(waiting > 0 ? [summary()] : [], { total: waiting }),
      };
    }
    if (path === `/api/v1/admin/plugins/${PLUGIN_ID}`) return { status: 200, body: detail([]) };
    return { status: 200, body: { items: [] } };
  });

describe('admin navigation', () => {
  it('lists the audit log last, under its own heading', async () => {
    stub();
    await renderApp('/');
    const nav = await screen.findByRole('navigation', { name: 'Admin sections' });
    const links = within(nav).getAllByRole('link');
    expect(links.at(-1)).toHaveAccessibleName('Audit');
    expect(within(nav).getByText('System')).toBeInTheDocument();
  });

  it('shows the BoldConnect brand in the sidebar and no footer inside the app', async () => {
    stub();
    await renderApp('/');
    const home = await screen.findByRole('link', {
      name: 'BoldConnect by Syncfusion, Admin Console',
    });
    expect(home).toHaveAttribute('href', '/');
    expect(within(home).getByText('by Syncfusion®')).toBeInTheDocument();
    await userEvent.setup().click(within(screen.getByRole('navigation')).getByText('Categories'));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Categories' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('opens the audit page by its address', async () => {
    stub();
    await renderApp('/audit');
    expect(await screen.findByRole('heading', { level: 1, name: 'Audit' })).toBeInTheDocument();
    expect(await screen.findByText('Nothing has been recorded yet')).toBeInTheDocument();
  });

  it('shows the same sidebar and the signed-in account on every page', async () => {
    stub();
    await renderApp('/');
    const user = userEvent.setup();
    for (const [name, heading] of [
      ['Plugins', 'Plugins'],
      ['Discover', 'Discover plugins'],
      ['Categories', 'Categories'],
      ['Audit', 'Audit'],
      ['Dashboard', 'Dashboard'],
    ] as const) {
      const nav = await screen.findByRole('navigation', { name: 'Admin sections' });
      await user.click(within(nav).getByRole('link', { name }));
      expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
      const profile = screen.getByRole('region', { name: 'Account' });
      expect(within(profile).getByText('ops@example.test')).toBeInTheDocument();
      expect(
        within(screen.getByRole('navigation', { name: 'Admin sections' })).getByRole('link', {
          name,
        }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });

  it('keeps Plugins highlighted on a plugin page and has no Sources section', async () => {
    stub();
    await renderApp(`/plugins/${PLUGIN_ID}`);
    const nav = await screen.findByRole('navigation', { name: 'Admin sections' });
    expect(within(nav).getByRole('link', { name: 'Plugins' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).queryByRole('link', { name: 'Sources' })).not.toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('shows how many plugins wait for review next to Plugins', async () => {
    stub(4);
    await renderApp('/');
    const nav = await screen.findByRole('navigation', { name: 'Admin sections' });
    expect(await within(nav).findByLabelText('4 waiting')).toBeInTheDocument();
  });

  it('signs out from the sidebar and returns to the sign-in page', async () => {
    let active = true;
    stubApi((method, path) => {
      if (method === 'POST' && path.endsWith('/signout')) {
        active = false;
        return { status: 204 };
      }
      if (path.endsWith('/session')) return active ? SESSION : ERROR('unauthenticated', 401);
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Sign out' }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument(),
    );
  });

  it('opens and closes the navigation on a small screen', async () => {
    stub();
    await renderApp('/');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Open navigation' }));
    await user.click(screen.getByRole('button', { name: 'Close navigation' }));
    expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
  });

  it('does not show the navigation on the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/signin');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Admin sections' })).not.toBeInTheDocument();
  });
});
