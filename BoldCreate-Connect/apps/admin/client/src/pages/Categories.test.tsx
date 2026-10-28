import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminCategoryResponse } from '../lib/api';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const category = (overrides: Partial<AdminCategoryResponse> = {}): AdminCategoryResponse => ({
  id: 'c1',
  slug: 'tools',
  name: 'Tools',
  description: 'Handy tools.',
  pluginCount: 2,
  ...overrides,
});

describe('categories page', () => {
  it('sends a visitor without a session to the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/categories');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('says what to do when there are no categories', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/categories');
    expect(await screen.findByText(/No categories yet/)).toBeInTheDocument();
  });

  it('adds a category and shows it', async () => {
    let items: AdminCategoryResponse[] = [];
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'POST') {
        items = [category({ pluginCount: 0 })];
        return { status: 201, body: items[0] };
      }
      return { status: 200, body: { items } };
    });
    await renderApp('/categories');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText('Name'), 'Tools');
    await user.type(screen.getByLabelText(/Description/), 'Handy tools.');
    await user.click(screen.getByRole('button', { name: 'Add category' }));
    expect(await screen.findByText('tools')).toBeInTheDocument();
    expect(calls.find((call) => call.method === 'POST')?.body).toEqual({
      name: 'Tools',
      description: 'Handy tools.',
    });
  });

  it('explains a name that cannot be used', async () => {
    stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'POST') return ERROR('conflict', 409);
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/categories');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText('Name'), 'Tools');
    await user.click(screen.getByRole('button', { name: 'Add category' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'cannot be done in the current state',
    );
  });

  it('lists the categories as a table with one row each', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return {
        status: 200,
        body: {
          items: [
            category(),
            category({ id: 'c2', slug: 'ops', name: 'Ops', description: '', pluginCount: 1 }),
          ],
        },
      };
    });
    await renderApp('/categories');
    const table = await screen.findByRole('table');
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['Name', 'Slug', 'Description', 'Plugins', 'Actions']);
    const rows = within(table).getAllByRole('row');
    expect(rows).toHaveLength(3);
    expect(
      within(rows[1]!)
        .getAllByRole('cell')
        .map((cell) => cell.textContent),
    ).toEqual(['Tools', 'tools', 'Handy tools.', '2 plugins', 'RenameRemove']);
    expect(within(rows[2]!).getByText('1 plugin')).toBeInTheDocument();
    expect(within(rows[2]!).getByText('—')).toBeInTheDocument();
  });

  it('shows a failed change in a row of the table under the category', async () => {
    stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'PATCH') return ERROR('conflict', 409);
      return { status: 200, body: { items: [category()] } };
    });
    await renderApp('/categories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Rename Tools' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    const alert = await screen.findByRole('alert');
    expect(alert.closest('tr')).not.toBeNull();
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(3);
  });

  it('renames a category', async () => {
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'PATCH') return { status: 200, body: category({ name: 'Helpers' }) };
      return { status: 200, body: { items: [category()] } };
    });
    await renderApp('/categories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Rename Tools' }));
    const name = screen.getAllByLabelText('Name').at(-1) as HTMLElement;
    await user.clear(name);
    await user.type(name, 'Helpers');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PATCH')?.body).toEqual({
        name: 'Helpers',
        description: 'Handy tools.',
      }),
    );
  });

  it('asks before removing and says how many plugins lose the category', async () => {
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'DELETE') return { status: 204 };
      return { status: 200, body: { items: [category()] } };
    });
    await renderApp('/categories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Remove Tools' }));
    expect(screen.getByText(/2 plugins lose it; the plugins stay/)).toBeInTheDocument();
    expect(calls.some((call) => call.method === 'DELETE')).toBe(false);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Remove Tools' }));
    await user.click(screen.getByRole('button', { name: 'Yes, remove' }));
    await waitFor(() => expect(calls.some((call) => call.method === 'DELETE')).toBe(true));
  });
});
