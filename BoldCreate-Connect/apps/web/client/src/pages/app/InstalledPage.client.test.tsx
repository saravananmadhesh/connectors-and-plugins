/**
 * InstalledPage tests.
 * Covers: scope pills (organization, and me only when personal installs are allowed), the list read
 * from the route of the chosen scope, search by name, and the empty state.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InstalledPage } from './InstalledPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'org_1' as Id<'org'>;

const ME = {
  user: { id: 'usr_1', email: 'a@example.com', displayName: 'Ada' },
  memberships: [{ organizationId: ORG_ID, organizationName: 'Acme' }],
} as unknown as apiModule.MeResponse;

const orgMe = (abilities: string[]) =>
  ({
    userId: 'usr_1',
    role: 'MEMBER',
    abilities,
    policy: { allowPersonalInstalls: true },
  }) as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>;

const install = (name: string, scope: 'org' | 'user') => ({
  id: `ins_${name}`,
  scope,
  pluginName: name,
  pluginLogoUrl: null,
  pluginVersion: '1.0.0',
  pluginVersionId: 'pv_1',
  active: true,
  updatePolicy: 'pinned',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function mockApi(leads: boolean) {
  vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
  vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMe(leads ? ['installation:update'] : []));
  vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
    items: [],
    nextCursor: null,
  });
  vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
  return vi.spyOn(apiModule.installations, 'list').mockImplementation(((
    _org: string,
    key: string,
  ) =>
    Promise.resolve({
      items:
        key === 'org'
          ? [install('org-plugin', 'org'), install('shared-tools', 'org')]
          : [install('mine', 'user')],
      nextCursor: null,
    })) as unknown as typeof apiModule.installations.list);
}

const render = (url = `/orgs/${ORG_ID}/installed`) =>
  renderWithRouter(InstalledPage, '/orgs/$orgId/installed', { url });

describe('InstalledPage', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('offers the For me and For team pills', async () => {
    mockApi(false);
    await render();
    expect(await screen.findByText('mine')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'For me' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'For team' })).toBeInTheDocument();
  });

  it('drops the For me pill when personal installs are off', async () => {
    mockApi(false);
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue({
      ...orgMe([]),
      policy: { allowPersonalInstalls: false },
    } as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>);
    await render();
    expect(await screen.findByText('org-plugin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'For team' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'For me' })).not.toBeInTheDocument();
  });

  it('reads the list of the scope that is picked', async () => {
    const list = mockApi(true);
    const user = userEvent.setup();
    await render();
    expect(await screen.findByText('mine')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'For team' }));
    expect(await screen.findByText('org-plugin')).toBeInTheDocument();
    expect(list).toHaveBeenCalledWith(ORG_ID, 'me');
    expect(list).toHaveBeenCalledWith(ORG_ID, 'org');
  });

  it('narrows the list by the search text', async () => {
    mockApi(false);
    const user = userEvent.setup();
    await render(`/orgs/${ORG_ID}/installed?scope=org`);
    await screen.findByText('org-plugin');
    await user.type(screen.getByLabelText('Search installed'), 'shared');
    expect(await screen.findByText('shared-tools')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('org-plugin')).not.toBeInTheDocument());
  });

  it('says what to do when nothing is installed', async () => {
    mockApi(false);
    vi.spyOn(apiModule.installations, 'list').mockResolvedValue({ items: [], nextCursor: null });
    await render();
    expect(await screen.findByText('Nothing installed yet')).toBeInTheDocument();
  });

  it('says the sign-in worked after the sign-in service sends the member back', async () => {
    mockApi(false);
    vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
    await render(`/orgs/${ORG_ID}/installed?tab=mcp&oauth=connected`);
    expect(await screen.findByText('You are signed in to the server.')).toBeInTheDocument();
  });

  it('says the sign-in failed, and lets the member dismiss the notice', async () => {
    mockApi(false);
    vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
    const user = userEvent.setup();
    await render(`/orgs/${ORG_ID}/installed?tab=mcp&oauth=failed`);
    expect(await screen.findByText(/sign-in did not complete/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() =>
      expect(screen.queryByText(/sign-in did not complete/)).not.toBeInTheDocument(),
    );
  });

  it('names the reason a sign-in did not complete', async () => {
    mockApi(false);
    vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
    await render(`/orgs/${ORG_ID}/installed?tab=mcp&oauth=failed&reason=oauth_state_invalid`);
    expect(await screen.findByText(/did not complete \(oauth_state_invalid\)/)).toBeInTheDocument();
  });

  describe('setup state of a row', () => {
    const variable = (over: Partial<apiModule.VariableStatus>): apiModule.VariableStatus => ({
      name: 'REGION',
      description: '',
      required: true,
      secret: false,
      isSet: false,
      custom: false,
      ...over,
    });
    const oauth = (connection: string) =>
      ({
        componentId: 'cmp_1',
        name: 'search',
        authType: 'oauth_dcr',
        connection,
      }) as unknown as apiModule.McpServerResponse;

    function mockState(
      variables: apiModule.VariableStatus[],
      servers: apiModule.McpServerResponse[],
    ) {
      mockApi(false);
      vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
        items: variables,
        nextCursor: null,
      });
      vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({
        items: servers,
        nextCursor: null,
      } as unknown as Awaited<ReturnType<typeof apiModule.mcpServers.list>>);
    }

    it('says Installed when nothing is needed', async () => {
      mockState([], []);
      await render();
      await screen.findByText('mine');
      expect(await screen.findByText('Installed')).toBeInTheDocument();
    });

    it('says Needs setup, and reopens the setup from the badge', async () => {
      mockState([variable({})], []);
      const user = userEvent.setup();
      await render();
      await user.click(await screen.findByRole('button', { name: 'Set up mine' }));
      expect(await screen.findByRole('dialog', { name: 'Set up mine' })).toBeInTheDocument();
    });

    it('says Needs setup when a sign-in is missing', async () => {
      mockState([], [oauth('not_connected')]);
      await render();
      expect(await screen.findByText('Needs setup')).toBeInTheDocument();
    });

    it('says Connected when every sign-in is done', async () => {
      mockState([variable({ isSet: true })], [oauth('connected')]);
      await render();
      expect(await screen.findByText('Connected')).toBeInTheDocument();
    });
  });
});
