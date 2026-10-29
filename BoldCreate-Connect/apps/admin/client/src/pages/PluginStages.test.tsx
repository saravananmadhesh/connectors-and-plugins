import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PluginSourceResponse } from '../lib/api';
import { counts, pageOf, summary } from '../test/fixtures';
import { renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const source = (
  id: string,
  overrides: Partial<PluginSourceResponse> = {},
): PluginSourceResponse => ({
  id,
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  path: id,
  lastCommitSha: null,
  lastSyncedAt: null,
  lastStatus: 'failed',
  lastError: 'Ref not found.',
  lastNote: null,
  createdAt: '2026-10-11T00:00:00.000Z',
  ...overrides,
});

describe('plugins page review stages', () => {
  it('lists only the plugins that wait for review and says so when none do', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/plugin-sources') return { status: 200, body: { items: [] } };
      if (path.startsWith('/api/v1/admin/plugins?')) return { status: 200, body: pageOf([]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/plugins?stage=needs_review');
    expect(await screen.findByText('Nothing is waiting for review.')).toBeInTheDocument();
    expect(
      calls.some(
        (call) =>
          call.path.includes('versionStatus=needs_review') && call.path.includes('pageSize=25'),
      ),
    ).toBe(true);
    expect(screen.queryByRole('region', { name: 'Failed syncs' })).not.toBeInTheDocument();
    // The version filter is fixed on this page.
    expect(screen.queryByLabelText('Version')).not.toBeInTheDocument();
  });

  it('shows the plugins with a version to review', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path === '/api/v1/admin/plugin-sources') return { status: 200, body: { items: [] } };
      if (path.startsWith('/api/v1/admin/plugins?')) {
        return {
          status: 200,
          body: pageOf([summary({ versionCounts: counts({ pending: 2 }) })]),
        };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/plugins?stage=needs_review');
    expect(await screen.findByText('Sample plugin')).toBeInTheDocument();
    expect(screen.queryByText('2 to review')).not.toBeInTheDocument();
  });

  it('has a tab for every stage of the review cycle', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.startsWith('/api/v1/admin/plugins?')) return { status: 200, body: pageOf([]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/plugins');
    const user = userEvent.setup();
    const labels = (await screen.findAllByRole('tab')).map((tab) => tab.textContent);
    expect(labels).toEqual([
      'All',
      'To review',
      'Awaiting approval',
      'Ready to publish',
      'Published',
      'Rejected',
      'Yanked',
    ]);
    expect(screen.getByRole('tab', { name: /^All/ })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: /^Rejected/ }));
    expect(await screen.findByText('No version was rejected.')).toBeInTheDocument();
    expect(calls.some((call) => call.path.includes('versionStatus=rejected'))).toBe(true);

    await user.click(screen.getByRole('tab', { name: /^Ready to publish/ }));
    expect(
      await screen.findByText('No approved version is waiting to be published.'),
    ).toBeInTheDocument();
    expect(calls.some((call) => call.path.includes('versionStatus=approved'))).toBe(true);

    await user.click(screen.getByRole('tab', { name: /^To review/ }));
    expect(await screen.findByText('Nothing is waiting for review.')).toBeInTheDocument();
  });

  it('retries or removes the repositories that failed to sync', async () => {
    let sources = [
      source('one'),
      source('two'),
      source('fine', { lastStatus: 'succeeded', lastError: null }),
    ];
    const calls = stubApi((method, path, body) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/bulk-sync')) {
        return { status: 200, body: { queued: (body as { ids: string[] }).ids, skipped: [] } };
      }
      if (path.endsWith('/bulk-delete') && path.includes('plugin-sources')) {
        const ids = (body as { ids: string[] }).ids;
        sources = sources.filter((item) => !ids.includes(item.id));
        return { status: 200, body: { deleted: ids } };
      }
      if (method === 'GET' && path === '/api/v1/admin/plugin-sources') {
        return { status: 200, body: { items: sources } };
      }
      if (path.startsWith('/api/v1/admin/plugins?')) return { status: 200, body: pageOf([]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/plugins?stage=needs_review');
    const user = userEvent.setup();
    const region = await screen.findByRole('region', { name: 'Failed syncs' });
    expect(region).toHaveTextContent('github.com/acme/plugins/one');
    expect(region).toHaveTextContent('github.com/acme/plugins/two');
    expect(region).not.toHaveTextContent('/fine');
    expect(screen.getAllByText('Ref not found.')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Retry all failed' }));
    expect(await screen.findByText('Sync queued for 2 of 2.')).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/bulk-sync'))?.body).toEqual({
      ids: ['one', 'two'],
    });

    await user.click(screen.getByRole('button', { name: 'Remove all failed' }));
    expect(await screen.findByText('Removed 2 failed sources.')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: 'Failed syncs' })).not.toBeInTheDocument(),
    );
  });
});
