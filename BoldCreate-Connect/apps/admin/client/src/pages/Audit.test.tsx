import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminAuditEntry, AdminAuditListResponse } from '../lib/api';
import { PLUGIN_ID } from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';
import { EMPTY_STATS } from '../test/stats';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

let counter = 0;
const entry = (overrides: Partial<AdminAuditEntry> = {}): AdminAuditEntry => {
  counter += 1;
  return {
    id: `00000000-0000-4000-8000-${String(counter).padStart(12, '0')}`,
    at: new Date(Date.now() - counter * 3_600_000).toISOString(),
    actorId: 'ops@example.test',
    actorKind: 'platform_admin',
    action: 'plugin.updated',
    targetKind: 'plugin',
    targetId: PLUGIN_ID,
    result: 'success',
    context: { name: 'alpha', fields: ['summary'] },
    orgId: null,
    requestId: 'req-1',
    ip: '203.0.113.7',
    ...overrides,
  };
};

function stubAudit(reply: (query: URLSearchParams) => AdminAuditListResponse | FakeReply) {
  return stubApi(
    (_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.startsWith('/api/v1/admin/audit')) {
        const result = reply(new URL(path, 'http://localhost').searchParams);
        return 'items' in result ? { status: 200, body: result } : result;
      }
      return { status: 200, body: { items: [] } };
    },
    EMPTY_STATS,
    null,
  );
}

const lastAudit = (calls: { path: string }[]) =>
  new URL(
    calls.filter((call) => call.path.startsWith('/api/v1/admin/audit')).at(-1)!.path,
    'http://x',
  ).searchParams;

describe('audit page', () => {
  it('lists events in words, with what they were about and who did them', async () => {
    stubAudit(() => ({
      nextCursor: null,
      items: [
        entry({
          action: 'plugin_version.published',
          targetKind: 'plugin_version',
          targetId: 'v-1',
          context: { pluginId: PLUGIN_ID, version: '1.2.0', from: 'rejected' },
        }),
        entry({ action: 'plugin.deleted', context: { name: 'gone' } }),
        entry({
          action: 'admin.sign_in_failed',
          targetKind: null,
          targetId: null,
          context: null,
          result: 'failure',
          actorId: 'intruder@example.test',
        }),
      ],
    }));
    await renderApp('/audit');
    expect(await screen.findByText('Published a version')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'version 1.2.0' })).toHaveAttribute(
      'href',
      `/plugins/${PLUGIN_ID}/versions/v-1`,
    );
    // A deleted plugin has nowhere to link to.
    expect(screen.getByText('gone')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'gone' })).not.toBeInTheDocument();
    expect(screen.getByText('Admin sign-in failed')).toBeInTheDocument();
    expect(screen.getByText('Failed', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('intruder@example.test')).toBeInTheDocument();
    expect(screen.getByText('3 events shown')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Load older events' })).not.toBeInTheDocument();
  });

  it('opens a row to the full record and closes it again', async () => {
    stubAudit(() => ({
      nextCursor: null,
      items: [entry({ orgId: '00000000-0000-4000-8000-0000000000f1' })],
    }));
    await renderApp('/audit');
    const user = userEvent.setup();
    const toggle = await screen.findByRole('button', {
      name: 'Show details of Edited the details of a plugin',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByText('Recorded details')).toBeInTheDocument();
    expect(screen.getByText('203.0.113.7')).toBeInTheDocument();
    expect(screen.getByText('req-1')).toBeInTheDocument();
    expect(screen.getByText('ops@example.test (platform admin)')).toBeInTheDocument();
    expect(screen.getByText('["summary"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy event id' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy organization id' })).toBeInTheDocument();
    await user.click(toggle);
    expect(screen.queryByText('Recorded details')).not.toBeInTheDocument();
  });

  it('says nothing else was recorded when the context is empty', async () => {
    stubAudit(() => ({
      nextCursor: null,
      items: [entry({ context: null, requestId: null, ip: null })],
    }));
    await renderApp('/audit');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /Show details/ }));
    expect(await screen.findByText('Nothing else was recorded.')).toBeInTheDocument();
  });

  it('fetches older events with the cursor the server gave', async () => {
    const calls = stubAudit((query) =>
      query.get('cursor') === 'next-page'
        ? {
            nextCursor: null,
            items: [
              entry({
                action: 'category.created',
                targetKind: 'category',
                context: { name: 'Tools' },
              }),
            ],
          }
        : { nextCursor: 'next-page', items: [entry()] },
    );
    await renderApp('/audit');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Load older events' }));
    expect(await screen.findByText('Created a category')).toBeInTheDocument();
    expect(screen.getByText('2 events shown')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Load older events' })).not.toBeInTheDocument();
    expect(lastAudit(calls).get('cursor')).toBe('next-page');
  });

  it('narrows the list by what, result and time, and keeps the choice in the address', async () => {
    const calls = stubAudit(() => ({ nextCursor: null, items: [entry()] }));
    const { router } = await renderApp('/audit');
    const user = userEvent.setup();
    await screen.findByText('Edited the details of a plugin');
    await user.selectOptions(screen.getByLabelText('What'), 'plugin_version.');
    await waitFor(() => expect(lastAudit(calls).get('action')).toBe('plugin_version.'));
    await user.selectOptions(screen.getByLabelText('Result'), 'failure');
    await waitFor(() => expect(lastAudit(calls).get('result')).toBe('failure'));
    await user.selectOptions(screen.getByLabelText('When'), '7d');
    await waitFor(() => expect(lastAudit(calls).get('since')).not.toBeNull());
    expect(router.state.location.search).toEqual({
      action: 'plugin_version.',
      result: 'failure',
      range: '7d',
    });
    const since = new Date(lastAudit(calls).get('since')!).getTime();
    expect(Date.now() - since).toBeGreaterThan(6.9 * 86_400_000);
    expect(Date.now() - since).toBeLessThan(7.1 * 86_400_000);
  });

  it('waits for typing to pause before filtering by who', async () => {
    const calls = stubAudit(() => ({ nextCursor: null, items: [entry()] }));
    const { router } = await renderApp('/audit');
    await screen.findByText('Edited the details of a plugin');
    fireEvent.change(screen.getByLabelText('Who'), { target: { value: 'ops@example.test' } });
    expect(lastAudit(calls).get('actorId')).toBeNull();
    await waitFor(() => expect(lastAudit(calls).get('actorId')).toBe('ops@example.test'));
    expect(router.state.location.search).toEqual({ actor: 'ops@example.test' });
  });

  it('starts from the filters in the address and clears them with one button', async () => {
    const calls = stubAudit(() => ({ nextCursor: null, items: [entry()] }));
    const { router } = await renderApp('/audit?action=plugin.&result=denied&actor=ops');
    const user = userEvent.setup();
    await screen.findByText('Edited the details of a plugin');
    expect(screen.getByLabelText('What')).toHaveValue('plugin.');
    expect(screen.getByLabelText('Result')).toHaveValue('denied');
    expect(screen.getByLabelText('Who')).toHaveValue('ops');
    expect(lastAudit(calls).get('actorId')).toBe('ops');

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getByLabelText('Who')).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  it('drops values in the address that it does not know', async () => {
    const calls = stubAudit(() => ({ nextCursor: null, items: [] }));
    await renderApp('/audit?result=maybe&range=forever');
    await screen.findByText('Nothing has been recorded yet');
    expect(lastAudit(calls).get('result')).toBeNull();
    expect(lastAudit(calls).get('since')).toBeNull();
  });

  it('says so when nothing has been recorded, or nothing matches the filters', async () => {
    stubAudit(() => ({ nextCursor: null, items: [] }));
    await renderApp('/audit?result=failure');
    expect(await screen.findByText('No events match these filters')).toBeInTheDocument();
  });

  it('shows the reason when the log cannot be read', async () => {
    stubAudit(() => ERROR('internal', 500));
    await renderApp('/audit');
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });

  it('falls back to readable words for an event it has no sentence for', async () => {
    stubAudit(() => ({
      nextCursor: null,
      items: [
        entry({
          action: 'kill_switch.lifted',
          targetKind: 'kill_switch',
          targetId: 'k1',
          context: null,
        }),
      ],
    }));
    await renderApp('/audit');
    const row = (await screen.findByText('Kill switch lifted')).closest('tr') as HTMLElement;
    expect(within(row).getByText('kill switch')).toBeInTheDocument();
  });
});
