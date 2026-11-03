/** ProjectPage: the tabs of one project, what each shows and what a member may change. */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, projects } from '@/lib/api';
import type { ProjectKeyResponse } from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import {
  ORG_ID,
  PROJECT_ID,
  baseData,
  project,
  key,
  page,
  session,
  type TestRole,
} from '@/test/projects';
import { ProjectPage } from './ProjectPage';

const ROUTE = '/orgs/$orgId/projects/$projectId';
const RAW_KEY = 'prk_0123456789abcdef.rawsecretvalue';
const SECRET = 'whsec_rawsecretvalue';

const render = (tab?: string, role: TestRole = 'ADMIN') =>
  renderWithRouter(ProjectPage, tab ? `${ROUTE}/$tab` : ROUTE, {
    url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}${tab ? `/${tab}` : ''}`,
    queryData: baseData(role),
  });

const withRaw = (over: Partial<ProjectKeyResponse> = {}) => ({ ...key(over), rawKey: RAW_KEY });

/** The day of the usage below, as the overview shows it. */
const DAY = new Date('2026-10-01T00:00:00Z').toLocaleDateString(undefined, {
  timeZone: 'UTC',
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

/** The queries inside the section the heading opens. */
const section = async (name: string) =>
  within((await screen.findByRole('heading', { name })).closest('section') as HTMLElement);

describe('ProjectPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(projects, 'usage').mockResolvedValue({
      days: [{ date: '2026-10-01', activeUsers: 3, toolCalls: 12, errors: 2 }],
      topUsers: [{ id: 'usr_p1', userId: 'host-user-1', toolCalls: 12 }],
    } as Awaited<ReturnType<typeof projects.usage>>);
    vi.spyOn(projects, 'get').mockResolvedValue(project());
    vi.spyOn(projects, 'keys').mockResolvedValue(page([key()]));
    vi.spyOn(projects, 'sessions').mockResolvedValue(page([session()]));
  });

  it('shows the name, the status and the overview first', async () => {
    await render();
    expect(await screen.findByRole('heading', { name: 'Storefront' })).toBeInTheDocument();
    // One title and one description for the page, not a second pair from a shared header.
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    // An active project says nothing; only a different status gets a badge.
    expect(screen.queryByText('active')).toBeNull();
    expect(await screen.findByText(DAY)).toBeInTheDocument();
    expect(screen.getAllByText('12', { selector: 'td' }).length).toBe(2);
  });

  it('lays the overview out as totals, then top users beside the days', async () => {
    await render();
    expect(await screen.findByRole('heading', { name: 'Storefront' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Details' })).toBeNull();
    expect(screen.queryByText(/^Created /)).toBeNull();
    const totals = within(await screen.findByRole('region', { name: 'Totals' }));
    expect(totals.getByText('16.7% of calls')).toBeInTheDocument();
    expect(totals.getByText('Last 1 day')).toBeInTheDocument();
    const top = await section('Top users');
    expect(top.getByText('host-user-1')).toBeInTheDocument();
    expect(top.getByText('100%')).toBeInTheDocument();
  });

  it('does not offer the Create key shortcut when an active project key exists', async () => {
    await render();
    await screen.findByText(DAY);
    expect(screen.queryByRole('link', { name: 'Create key' })).toBeNull();
  });

  it('offers a Create key shortcut when the project has no active keys', async () => {
    await renderWithRouter(ProjectPage, ROUTE, {
      url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}`,
      queryData: [
        baseData()[0]!,
        { key: ['org', ORG_ID, 'projects', PROJECT_ID], data: project({ activeKeyCount: 0 }) },
      ],
    });
    const link = await screen.findByRole('link', { name: 'Create key' });
    expect(link).toHaveAttribute('href', `/orgs/${ORG_ID}/projects/${PROJECT_ID}?tab=keys`);
  });

  it('leaves key creation to the API keys tab', async () => {
    await render();
    await screen.findByText(DAY);
    expect(screen.queryByRole('link', { name: 'Create key' })).toBeNull();
  });

  it('keeps the tabs on one scrolling row, pinned while the panel scrolls', async () => {
    await render();
    const row = await screen.findByRole('tablist', { name: 'Project sections' });
    expect(row).toHaveClass('overflow-x-auto', 'sticky');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveClass(
      'shrink-0',
      'whitespace-nowrap',
    );
  });

  it('offers every tab to an admin', async () => {
    await render();
    for (const name of [
      'Overview',
      'Users',
      'Sessions',
      'Plugins',
      'Connections',
      'Logs',
      'API keys',
    ]) {
      expect(await screen.findByRole('tab', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('tab', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Auth configs' })).toBeNull();
    expect(screen.queryByRole('tab', { name: 'Catalog' })).toBeNull();
  });

  it('leaves the keys and settings tabs out for a viewer', async () => {
    await render('keys', 'VIEWER');
    await screen.findByRole('tab', { name: 'Overview' });
    expect(screen.queryByRole('tab', { name: 'API keys' })).toBeNull();
    expect(screen.queryByRole('tab', { name: 'Settings' })).toBeNull();
    expect(projects.keys).not.toHaveBeenCalled();
  });

  it('shows an error with a retry when the project cannot be loaded', async () => {
    vi.spyOn(projects, 'get').mockRejectedValue(new ApiError(404, 'not_found', 'No such project'));
    await renderWithRouter(ProjectPage, ROUTE, {
      url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}`,
      queryData: [baseData()[0]!],
    });
    expect(await screen.findByText(/Could not load the project. No such project/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  describe('sessions', () => {
    it('shows all plugins when there is no plugin allow-list', async () => {
      vi.spyOn(projects, 'sessions').mockResolvedValue(page([{ ...session(), plugins: [] }]));
      await render('sessions');
      expect(await screen.findByText('All plugins')).toBeInTheDocument();
    });

    it('does not show an expiry for a revoked session', async () => {
      vi.spyOn(projects, 'sessions').mockResolvedValue(page([{ ...session(), status: 'revoked' }]));
      await render('sessions');
      const row = (await screen.findByText('revoked')).closest('tr');
      expect(row).toHaveTextContent('—');
      expect(row).not.toHaveTextContent('in 30 days');
    });

    it('lists sessions and ends one after a confirm', async () => {
      const revoke = vi.spyOn(projects, 'revokeSession').mockResolvedValue(undefined);
      await render('sessions');
      await userEvent.click(await screen.findByRole('button', { name: /Revoke session of/ }));
      await userEvent.click(await screen.findByRole('button', { name: 'Revoke' }));
      await waitFor(() => expect(revoke).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'pjs_1'));
    });

    it('says so when there are none', async () => {
      vi.spyOn(projects, 'sessions').mockResolvedValue(page([]));
      await render('sessions');
      expect(await screen.findByText('No sessions')).toBeInTheDocument();
    });

    it('hides revoke from a viewer', async () => {
      await render('sessions', 'VIEWER');
      await screen.findByText('host-user-1');
      expect(screen.queryByRole('button', { name: /Revoke session of/ })).toBeNull();
    });
  });

  describe('keys', () => {
    it('lists keys by prefix and last four only', async () => {
      await render('keys');
      expect(await screen.findByText(/prk_0123456789abcdef…wxyz/)).toBeInTheDocument();
      expect(screen.queryByText(RAW_KEY)).toBeNull();
    });

    it('says so when there are none', async () => {
      vi.spyOn(projects, 'keys').mockResolvedValue(page([]));
      await render('keys');
      expect(await screen.findByText('No keys yet')).toBeInTheDocument();
    });

    it('creates a key and shows the raw key once', async () => {
      const create = vi.spyOn(projects, 'createKey').mockResolvedValue(withRaw());
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Create key' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Create' }));
      expect(await screen.findByText(RAW_KEY)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Copy key' })).toBeInTheDocument();
      expect(create).toHaveBeenCalledTimes(1);
      expect(create.mock.calls[0]![2].scopes.length).toBeGreaterThan(0);
      await userEvent.click(screen.getByRole('button', { name: 'Done' }));
      await waitFor(() => expect(screen.queryByText(RAW_KEY)).toBeNull());
    });

    it('defaults to 90 days and can create a key that never expires', async () => {
      const create = vi.spyOn(projects, 'createKey').mockResolvedValue(withRaw());
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Create key' }));
      expect(await screen.findByRole('button', { name: '90 days' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await userEvent.click(screen.getByRole('button', { name: 'No expiry' }));
      await userEvent.click(screen.getByRole('button', { name: 'Create' }));
      await screen.findByText(RAW_KEY);
      expect(create.mock.calls[0]![2].expiresAt).toBeNull();
    });

    it('does not offer to create without a scope', async () => {
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Create key' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Clear' }));
      expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
    });

    it('shows the message of the server when creating fails', async () => {
      vi.spyOn(projects, 'createKey').mockRejectedValue(new ApiError(400, 'bad', 'Too many keys'));
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Create key' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Create' }));
      expect(await screen.findByText('Too many keys')).toBeInTheDocument();
    });

    it('rotates a key after a confirm and shows the new key once', async () => {
      const rotate = vi.spyOn(projects, 'rotateKey').mockResolvedValue(withRaw());
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Rotate key wxyz' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Rotate' }));
      expect(await screen.findByText(RAW_KEY)).toBeInTheDocument();
      expect(rotate).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'pjk_1');
    });

    it('revokes a key after a confirm', async () => {
      const revoke = vi.spyOn(projects, 'revokeKey').mockResolvedValue(undefined);
      await render('keys');
      await userEvent.click(await screen.findByRole('button', { name: 'Revoke key wxyz' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Revoke' }));
      await waitFor(() => expect(revoke).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'pjk_1'));
    });

    it('shows a revoked key without actions', async () => {
      vi.spyOn(projects, 'keys').mockResolvedValue(
        page([key({ revokedAt: new Date().toISOString() })]),
      );
      await render('keys');
      expect(await screen.findByText('revoked')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Rotate key/ })).toBeNull();
    });
  });

  describe('settings', () => {
    const hook = {
      url: 'https://example.com/hooks',
      events: ['user.created'],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Awaited<ReturnType<typeof projects.webhook>>;

    it('adds the first webhook and shows its secret once', async () => {
      vi.spyOn(projects, 'webhook').mockRejectedValue(new ApiError(404, 'not_found', 'None'));
      const put = vi
        .spyOn(projects, 'putWebhook')
        .mockResolvedValue({ ...hook, secret: SECRET } as Awaited<
          ReturnType<typeof projects.putWebhook>
        >);
      await render('settings');
      await userEvent.type(await screen.findByLabelText('Address'), 'https://example.com/hooks');
      await userEvent.click(screen.getByRole('button', { name: 'Add webhook' }));
      expect(await screen.findByText(SECRET)).toBeInTheDocument();
      expect(put).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole('button', { name: 'Done' }));
      await waitFor(() => expect(screen.queryByText(SECRET)).toBeNull());
    });

    it('never shows a secret for a webhook that exists', async () => {
      vi.spyOn(projects, 'webhook').mockResolvedValue(hook);
      vi.spyOn(projects, 'webhookDeliveries').mockResolvedValue(
        page([
          {
            id: 'whd_1',
            type: 'user.created',
            status: 'delivered',
            attempts: 1,
            lastStatusCode: 200,
            createdAt: new Date().toISOString(),
          },
        ]) as Awaited<ReturnType<typeof projects.webhookDeliveries>>,
      );
      await render('settings');
      expect(await screen.findByDisplayValue('https://example.com/hooks')).toBeInTheDocument();
      expect(await screen.findByText('delivered')).toBeInTheDocument();
      expect(screen.queryByText(SECRET)).toBeNull();
      expect(screen.getByRole('button', { name: 'Save webhook' })).toBeInTheDocument();
    });

    it('rotates the secret and shows the new one once', async () => {
      vi.spyOn(projects, 'webhook').mockResolvedValue(hook);
      vi.spyOn(projects, 'webhookDeliveries').mockResolvedValue(page([]));
      vi.spyOn(projects, 'rotateWebhookSecret').mockResolvedValue({ secret: SECRET } as Awaited<
        ReturnType<typeof projects.rotateWebhookSecret>
      >);
      await render('settings');
      await userEvent.click(await screen.findByRole('button', { name: 'Rotate secret' }));
      expect(await screen.findByText(SECRET)).toBeInTheDocument();
    });

    it('removes the webhook after a confirm', async () => {
      vi.spyOn(projects, 'webhook').mockResolvedValue(hook);
      vi.spyOn(projects, 'webhookDeliveries').mockResolvedValue(page([]));
      const remove = vi.spyOn(projects, 'deleteWebhook').mockResolvedValue(undefined);
      await render('settings');
      await userEvent.click(await screen.findByRole('button', { name: 'Remove webhook' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Remove' }));
      await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID));
    });
  });
});
