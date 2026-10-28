import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminPluginDetailResponse } from '../lib/api';
import { PLUGIN_ID, detail } from '../test/fixtures';
import { renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const TOOLS = { id: 'c1', slug: 'tools', name: 'Tools', description: '', pluginCount: 1 };
const DATA = { id: 'c2', slug: 'data', name: 'Data', description: '', pluginCount: 0 };

const detailOf = (overrides: Partial<AdminPluginDetailResponse> = {}) => detail([], overrides);

function stubClassified(plugin: Partial<AdminPluginDetailResponse>, categories = [TOOLS, DATA]) {
  return stubApi((method, path) => {
    if (path.endsWith('/session')) return SESSION;
    if (method === 'PUT' || method === 'PATCH') return { status: 200, body: detailOf(plugin) };
    if (path.endsWith('/categories')) return { status: 200, body: { items: categories } };
    return { status: 200, body: detailOf(plugin) };
  });
}

describe('plugin categories and marks', () => {
  it('shows the categories a plugin has and saves a new selection', async () => {
    const calls = stubClassified({ categories: [{ id: 'c1', slug: 'tools', name: 'Tools' }] });
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    const user = userEvent.setup();
    const toolsBox = await screen.findByRole('checkbox', { name: 'Tools' });
    expect(toolsBox).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Data' })).not.toBeChecked();
    const save = screen.getByRole('button', { name: 'Save categories' });
    expect(save).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: 'Data' }));
    await user.click(toolsBox);
    await user.click(save);
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PUT')?.body).toEqual({ categoryIds: ['c2'] }),
    );
  });

  it('changes the featured and verified marks straight away', async () => {
    const calls = stubClassified({});
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('checkbox', { name: 'Featured' }));
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PATCH')?.body).toEqual({ featured: true }),
    );
    await user.click(screen.getByRole('checkbox', { name: 'Verified' }));
    await waitFor(() =>
      expect(calls.filter((call) => call.method === 'PATCH').at(-1)?.body).toEqual({
        verified: true,
      }),
    );
  });

  it('points to the categories page when none exist', async () => {
    stubClassified({}, []);
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    expect(await screen.findByText(/There are no categories yet/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create one' })).toBeInTheDocument();
  });

  it('switches a plugin between public and private straight away', async () => {
    const calls = stubClassified({ visibility: 'private' });
    await renderApp(`/plugins/${PLUGIN_ID}?tab=edit`);
    const user = userEvent.setup();
    const toggle = await screen.findByRole('switch', { name: 'Private' });
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    await user.click(toggle);
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PATCH')?.body).toEqual({
        visibility: 'public',
      }),
    );
  });
});
