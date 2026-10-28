import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminAuditListResponse, AdminVersionSummary } from '../lib/api';
import { NO_IMPACT, PLUGIN_ID, SOME_IMPACT, detail, scanned, version } from '../test/fixtures';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';
import { EMPTY_STATS } from '../test/stats';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const OTHER_PLUGIN = '00000000-0000-4000-8000-0000000000a2';

function stubVersion(
  current: AdminVersionSummary,
  options: {
    impact?: typeof NO_IMPACT;
    pluginId?: string;
    onWrite?: (path: string, body: unknown) => FakeReply;
    audit?: AdminAuditListResponse;
  } = {},
) {
  return stubApi(
    (method, path, body) => {
      if (path.endsWith('/session')) return SESSION;
      if (method !== 'GET') {
        return options.onWrite?.(path, body) ?? { status: 200, body: scanned(current) };
      }
      if (path.startsWith('/api/v1/admin/audit')) {
        return { status: 200, body: options.audit ?? { items: [], nextCursor: null } };
      }
      if (path.endsWith('/impact')) return { status: 200, body: options.impact ?? NO_IMPACT };
      if (path.includes('/plugin-versions/')) {
        return {
          status: 200,
          body: { ...scanned(current), pluginId: options.pluginId ?? PLUGIN_ID },
        };
      }
      return { status: 200, body: detail([current]) };
    },
    EMPTY_STATS,
    null,
  );
}

const open = (current: AdminVersionSummary, tab = '') =>
  renderApp(`/plugins/${PLUGIN_ID}/versions/${current.id}${tab}`);

describe('version page', () => {
  it('shows the version, where it stands and what it contains', async () => {
    stubVersion(version({ id: 'v1', version: '2.0.0', status: 'pending', findings: 1 }));
    await open(version({ id: 'v1' }));
    expect(await screen.findByRole('heading', { name: /Sample plugin/ })).toHaveTextContent(
      'v2.0.0',
    );
    expect(screen.getByText('Pending review', { selector: 'span.rounded-md' })).toBeInTheDocument();
    const steps = screen.getByRole('list', { name: 'Progress' });
    expect(within(steps).getByText('Pending review')).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText(/commit/)).toHaveTextContent('aaaaaaaaaaaa');

    // Each type is one line until it is opened.
    const skills = await screen.findByRole('button', { name: /Skills/ });
    expect(skills).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Reviews a change')).not.toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(skills);
    expect(screen.getByText('Reviews a change')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Rules/ }));
    expect(screen.getByText('Style rules')).toBeInTheDocument();
    // A customization links to its file at the commit the version was read from.
    expect(screen.getByRole('link', { name: 'review' })).toHaveAttribute(
      'href',
      `https://github.com/acme/plugins/blob/${'a'.repeat(40)}/sample/skills/review/SKILL.md`,
    );
    expect(screen.getByRole('link', { name: 'style' })).toHaveAttribute(
      'href',
      `https://github.com/acme/plugins/blob/${'a'.repeat(40)}/sample/rules/style.md`,
    );
  });

  it('reopens a rejected version so it can be reviewed again', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'rejected' }));
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    expect(screen.queryByRole('button', { name: 'Publish' })).not.toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: 'Reopen' }));
    await waitFor(() =>
      expect(calls.some((call) => call.path.endsWith('/plugin-versions/v1/reopen'))).toBe(true),
    );
  });

  it('keeps the safety findings on their own tab and names the tab in the address', async () => {
    stubVersion(version({ id: 'v1', status: 'pending', findings: 1 }));
    const { router } = await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('tab', { name: /Safety review/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('1 possible secret found');
    expect(screen.getByText('echo done')).toBeInTheDocument();
    expect(screen.getByText('https://mcp.example.test')).toBeInTheDocument();
    expect(screen.getByText('API_TOKEN')).toBeInTheDocument();
    expect(screen.getByText(/Links are not copied/)).toBeInTheDocument();
    expect(router.state.location.search).toEqual({ tab: 'safety' });
  });

  it('approves a pending version and offers reject, but not publish, until it is approved', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'pending' }));
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    expect(await screen.findByRole('button', { name: 'Reject' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Publish' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Yank' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    await waitFor(() =>
      expect(calls.some((call) => call.path.endsWith('/plugin-versions/v1/approve'))).toBe(true),
    );
  });

  it('publishes an approved version after warning about the secrets found in it', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'approved', findings: 2 }));
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: 'Publish' }));

    const dialog = await screen.findByRole('dialog', { name: 'Publish version 1.0.0?' });
    expect(within(dialog).getByText('2 possible secrets were found in it.')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Publish version' }));
    await waitFor(() =>
      expect(calls.some((call) => call.path.endsWith('/plugin-versions/v1/publish'))).toBe(true),
    );
  });

  it('offers no step on a rejected or yanked version', async () => {
    stubVersion(version({ id: 'v1', status: 'rejected' }));
    await open(version({ id: 'v1' }));
    expect(await screen.findByText(/Rejected. It stays on record/)).toBeInTheDocument();
    for (const name of ['Approve', 'Reject', 'Publish', 'Yank']) {
      expect(screen.queryByRole('button', { name })).not.toBeInTheDocument();
    }
  });

  it('closes the publish question without changing anything', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'approved' }));
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Publish' }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'POST')).toBe(false);
  });

  it('shows a refused step in plain words', async () => {
    stubVersion(version({ id: 'v1', status: 'pending' }), {
      onWrite: () => ERROR('conflict', 409),
    });
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Reject' }));
    expect(await screen.findByText(/cannot be done in the current state/)).toBeInTheDocument();
  });

  it('asks for force before yanking a version that is installed', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'published' }), { impact: SOME_IMPACT });
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Yank' }));
    expect(
      await screen.findByText(/Affects 3 installations in 2 organizations/),
    ).toBeInTheDocument();
    const confirm = screen.getByRole('button', { name: 'Yank version' });
    expect(confirm).toBeDisabled();
    await user.click(screen.getByLabelText(/I understand/));
    await user.click(confirm);
    await waitFor(() =>
      expect(calls.find((call) => call.path.endsWith('/v1/yank'))?.body).toEqual({ force: true }),
    );
  });

  it('yanks without force when nothing is installed', async () => {
    const calls = stubVersion(version({ id: 'v1', status: 'published' }));
    await open(version({ id: 'v1' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Yank' }));
    expect(await screen.findByText(/Nothing is installed/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Yank version' }));
    await waitFor(() =>
      expect(calls.find((call) => call.path.endsWith('/v1/yank'))?.body).toEqual({ force: false }),
    );
  });

  it('lists what was done to the version on its history tab', async () => {
    stubVersion(version({ id: 'v1', status: 'published' }), {
      audit: {
        nextCursor: null,
        items: [
          {
            id: '00000000-0000-4000-8000-0000000000c1',
            at: '2026-10-11T08:00:00.000Z',
            actorId: 'ops@example.test',
            actorKind: 'platform_admin',
            action: 'plugin_version.published',
            targetKind: 'plugin_version',
            targetId: 'v1',
            result: 'success',
            context: { pluginId: PLUGIN_ID, version: '1.0.0', from: 'rejected' },
            orgId: null,
            requestId: null,
            ip: null,
          },
        ],
      },
    });
    await open(version({ id: 'v1' }), '?tab=history');
    expect(await screen.findByText('Published a version')).toBeInTheDocument();
    expect(screen.getByText('version 1.0.0')).toBeInTheDocument();
  });

  it('says so when nothing was done to the version yet', async () => {
    stubVersion(version({ id: 'v1', status: 'pending' }));
    await open(version({ id: 'v1' }), '?tab=history');
    expect(await screen.findByText('Nothing recorded for this version yet')).toBeInTheDocument();
  });

  it('does not show a version under a plugin it does not belong to', async () => {
    stubVersion(version({ id: 'v1' }), { pluginId: OTHER_PLUGIN });
    await open(version({ id: 'v1' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('belongs to another plugin');
  });

  it('tells the operator when the version does not exist', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.includes('/plugin-versions/')) return ERROR('not_found', 404);
      return { status: 200, body: detail([]) };
    });
    await open(version({ id: 'gone' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('no longer exists');
  });
});
