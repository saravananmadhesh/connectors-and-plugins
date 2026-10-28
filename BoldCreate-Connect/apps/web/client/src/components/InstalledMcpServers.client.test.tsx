/**
 * InstalledMcpServers tests.
 * Covers: the list with health and sign-in state, the details dialog (status, tools, auth types,
 * secrets kept out of the form, saving, the connection test), the member sign-in and sign-out, the
 * read-only view, a server that runs locally, and a failed save.
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { InstalledMcpServers } from './InstalledMcpServers';
import * as apiModule from '@/lib/api';
import * as navigate from '@/lib/navigate';
import { renderWithRouter } from '@/test/render-with-router';

const installation = {
  id: 'ins_1',
  scope: 'org',
  pluginName: 'review-tools',
  pluginLogoUrl: null,
  pluginVersion: '1.0.0',
  pluginVersionId: 'pv_1',
  active: true,
  updatePolicy: 'pinned',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as unknown as apiModule.InstallationResponse;

const server = (patch: Partial<apiModule.McpServerResponse> = {}): apiModule.McpServerResponse =>
  ({
    installationId: 'ins_1',
    componentId: 'cmp_1',
    name: 'docs',
    transport: 'http',
    url: 'https://docs.example.test/mcp',
    authType: 'none',
    apiKeyLastFour: null,
    oauthClientId: null,
    oauthClientSecretSet: false,
    oauthScopes: null,
    oauthDiscoveredScopes: [],
    oauthDiscovered: false,
    callTimeoutMs: null,
    health: 'unknown',
    healthCheckedAt: null,
    lastError: null,
    tools: [],
    toolsRefreshedAt: null,
    connection: 'not_required',
    ...patch,
  }) as apiModule.McpServerResponse;

const NO_OAUTH: apiModule.McpOAuthDiscoverResponse = {
  discovered: false,
  dynamicRegistration: false,
  scopes: [],
  callbackUrl: 'https://app.example.test/v1/oauth/callback',
};

function show(
  first: apiModule.McpServerResponse,
  canUpdate = true,
  discovery: apiModule.McpOAuthDiscoverResponse = NO_OAUTH,
) {
  vi.spyOn(apiModule.mcpServers, 'oauthDiscover').mockResolvedValue(discovery);
  vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
    items: [],
    nextCursor: null,
  });
  const list = vi
    .spyOn(apiModule.mcpServers, 'list')
    .mockResolvedValue({ items: [first], nextCursor: null });
  const result = renderWithRouter(
    () => (
      <InstalledMcpServers
        orgId="org_1"
        scopeKey="org"
        items={[installation]}
        canUpdate={canUpdate}
      />
    ),
    '/',
    { url: '/' },
  );
  return { list, result };
}

async function openDetails() {
  const user = userEvent.setup();
  await user.click(await screen.findByRole('button', { name: 'Details of docs' }));
  return { user, dialog: await screen.findByRole('dialog') };
}

describe('InstalledMcpServers', () => {
  afterEach(() => vi.restoreAllMocks());

  it('lists each server with its authentication and state', async () => {
    show(server({ authType: 'oauth_dcr', health: 'healthy', connection: 'not_connected' }));
    expect(await screen.findByText('docs')).toBeInTheDocument();
    expect(screen.getByText('review-tools')).toBeInTheDocument();
    expect(screen.getByText('OAuth (automatic registration)')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Not signed in')).toBeInTheDocument();
  });

  it('says so when no installed plugin ships a server', async () => {
    vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
    await renderWithRouter(
      () => <InstalledMcpServers orgId="org_1" scopeKey="org" items={[installation]} canUpdate />,
      '/',
      { url: '/' },
    );
    expect(await screen.findByText('No MCP servers installed')).toBeInTheDocument();
  });

  it('reports a list that could not be loaded', async () => {
    vi.spyOn(apiModule.mcpServers, 'list').mockRejectedValue(new Error('down'));
    await renderWithRouter(
      () => <InstalledMcpServers orgId="org_1" scopeKey="org" items={[installation]} canUpdate />,
      '/',
      { url: '/' },
    );
    expect(await screen.findByText('Some MCP servers could not be loaded.')).toBeInTheDocument();
  });

  it('shows the tools of a server and a hint when it has none yet', async () => {
    show(
      server({
        tools: [{ name: 'search', description: 'Find pages' }],
        health: 'healthy',
        healthCheckedAt: new Date().toISOString(),
      }),
    );
    const { dialog } = await openDetails();
    expect(within(dialog).getByText('Tools (1)')).toBeInTheDocument();
    expect(within(dialog).getByText('search')).toBeInTheDocument();
    expect(within(dialog).getByText('Find pages')).toBeInTheDocument();
  });

  it('suggests a test when no tools are known', async () => {
    show(server());
    const { dialog } = await openDetails();
    expect(within(dialog).getByText(/Test the connection to list them/)).toBeInTheDocument();
  });

  it('tests the connection and shows the result', async () => {
    show(server());
    const probed = server({
      health: 'healthy',
      tools: [{ name: 'search', description: '' }],
    });
    const test = vi.spyOn(apiModule.mcpServers, 'test').mockResolvedValue({
      health: 'healthy',
      lastError: null,
      toolCount: 1,
      server: probed,
    });
    const { user, dialog } = await openDetails();
    await user.click(within(dialog).getByRole('button', { name: 'Test connection' }));
    expect(test).toHaveBeenCalledWith('org_1', 'org', 'ins_1', 'cmp_1');
    expect(await within(dialog).findByText('Connected. 1 tool found.')).toBeInTheDocument();
    expect(within(dialog).getByText('Tools (1)')).toBeInTheDocument();
  });

  it('explains a failed test with a plain sentence', async () => {
    show(server({ health: 'unreachable', lastError: 'upstream_timeout' }));
    const { dialog } = await openDetails();
    expect(within(dialog).getByText('Unreachable')).toBeInTheDocument();
    expect(within(dialog).getByText('The server did not answer in time.')).toBeInTheDocument();
  });

  it('shows an error when the test itself cannot run', async () => {
    show(server());
    vi.spyOn(apiModule.mcpServers, 'test').mockRejectedValue(
      new apiModule.ApiError(429, 'rate_limited', 'Too many requests'),
    );
    const { user, dialog } = await openDetails();
    await user.click(within(dialog).getByRole('button', { name: 'Test connection' }));
    expect(await within(dialog).findByText('Too many requests')).toBeInTheDocument();
  });

  it('saves an api key and never shows the stored one', async () => {
    show(server());
    const saved = server({ authType: 'api_key', apiKeyLastFour: 'wxyz' });
    const put = vi.spyOn(apiModule.mcpServers, 'putAuth').mockResolvedValue(saved);
    const { user, dialog } = await openDetails();

    const save = within(dialog).getByRole('button', { name: 'Save authentication' });
    expect(save).toBeDisabled();
    await user.selectOptions(within(dialog).getByLabelText('Type'), 'api_key');
    expect(within(dialog).getByText('Enter the API key')).toBeInTheDocument();
    expect(save).toBeDisabled();

    await user.type(within(dialog).getByLabelText('API key'), 'secret-value-wxyz');
    expect(save).toBeEnabled();
    await user.click(save);

    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', 'cmp_1', {
      authType: 'api_key',
      apiKey: 'secret-value-wxyz',
      callTimeoutMs: null,
    });
    expect(await within(dialog).findByText('Saved.')).toBeInTheDocument();
    const field = within(dialog).getByLabelText('API key') as HTMLInputElement;
    expect(field.value).toBe('');
    expect(field.placeholder).toContain('wxyz');
    expect(dialog.textContent).not.toContain('secret-value-wxyz');
  });

  it('asks for a client id and keeps a stored secret when the field is blank', async () => {
    show(server({ authType: 'oauth_client', oauthClientId: 'abc', oauthClientSecretSet: true }));
    const put = vi
      .spyOn(apiModule.mcpServers, 'putAuth')
      .mockResolvedValue(
        server({ authType: 'oauth_client', oauthClientId: 'def', oauthClientSecretSet: true }),
      );
    const { user, dialog } = await openDetails();
    const id = within(dialog).getByLabelText('Client ID');
    await user.clear(id);
    expect(within(dialog).getByText('Enter the client ID')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Save authentication' })).toBeDisabled();
    await user.type(id, 'def');
    await user.click(within(dialog).getByRole('button', { name: 'Save authentication' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', 'cmp_1', {
      authType: 'oauth_client',
      clientId: 'def',
      scopes: '',
      callTimeoutMs: null,
    });
  });

  it('fills the scopes from what the server publishes until they are edited', async () => {
    show(server({ authType: 'oauth_dcr' }), true, {
      ...NO_OAUTH,
      discovered: true,
      dynamicRegistration: true,
      scopes: ['repo', 'read:user'],
    });
    const { user, dialog } = await openDetails();
    const field = (await within(dialog).findByDisplayValue('repo read:user')) as HTMLInputElement;
    expect(within(dialog).getByText(/filled in from the server/i)).toBeInTheDocument();
    await user.clear(field);
    await user.type(field, 'repo');
    expect(field.value).toBe('repo');
  });

  it('offers only none and api key when the server publishes no sign-in details', async () => {
    show(server());
    const { dialog } = await openDetails();
    await within(dialog).findByLabelText('Type');
    const names = within(within(dialog).getByLabelText('Type'))
      .getAllByRole('option')
      .map((option) => option.textContent);
    expect(names).toEqual(['None', 'API key']);
  });

  it('leaves out automatic registration when the server does not allow it', async () => {
    show(server(), true, { ...NO_OAUTH, discovered: true, scopes: ['repo'] });
    const { dialog } = await openDetails();
    await waitFor(() =>
      expect(within(within(dialog).getByLabelText('Type')).getAllByRole('option')).toHaveLength(3),
    );
    const names = within(within(dialog).getByLabelText('Type'))
      .getAllByRole('option')
      .map((option) => option.textContent);
    expect(names).toEqual(['None', 'API key', 'OAuth (client ID)']);
  });

  it('shows the callback address, read only, for a client ID setup', async () => {
    show(server({ authType: 'oauth_client', oauthClientId: 'abc' }), true, {
      ...NO_OAUTH,
      discovered: true,
    });
    const { dialog } = await openDetails();
    const field = (await within(dialog).findByDisplayValue(
      'https://app.example.test/v1/oauth/callback',
    )) as HTMLInputElement;
    expect(field.readOnly).toBe(true);
  });

  it('checks the call timeout before saving', async () => {
    show(server());
    const { user, dialog } = await openDetails();
    await user.type(within(dialog).getByLabelText('Call timeout (seconds)'), '500');
    expect(within(dialog).getByText(/Use a whole number from 1 to 120/)).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Save authentication' })).toBeDisabled();
  });

  it('shows why a save failed and keeps what was typed', async () => {
    show(server());
    vi.spyOn(apiModule.mcpServers, 'putAuth').mockRejectedValue(
      new apiModule.ApiError(422, 'validation_failed', 'The key is not valid'),
    );
    const { user, dialog } = await openDetails();
    await user.selectOptions(within(dialog).getByLabelText('Type'), 'api_key');
    await user.type(within(dialog).getByLabelText('API key'), 'abc');
    await user.click(within(dialog).getByRole('button', { name: 'Save authentication' }));
    expect(await within(dialog).findByText('The key is not valid')).toBeInTheDocument();
    expect((within(dialog).getByLabelText('API key') as HTMLInputElement).value).toBe('abc');
  });

  it('shows the variables of the installation inside the details, with fixed names', async () => {
    show(server());
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [
        {
          name: 'GITHUB_TOKEN',
          description: 'Personal access token',
          required: true,
          secret: true,
          isSet: false,
          custom: false,
        },
      ],
      nextCursor: null,
    });
    const { dialog } = await openDetails();
    expect(await within(dialog).findByDisplayValue('GITHUB_TOKEN')).toHaveAttribute('readonly');
    expect(within(dialog).getByLabelText('Value of GITHUB_TOKEN')).toHaveAttribute(
      'type',
      'password',
    );
    expect(
      within(dialog).queryByRole('button', { name: 'Edit variables' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Variables for review-tools')).not.toBeInTheDocument();
  });

  it('puts the environment variables first, then authentication, sign-in and tools', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'not_connected' }));
    const { dialog } = await openDetails();
    const order = ['Status', 'Environment', 'Authentication', 'Your sign-in', 'Tools'].map((name) =>
      within(dialog).getByRole('region', { name }),
    );
    for (let i = 1; i < order.length; i += 1) {
      expect(order[i - 1]!.compareDocumentPosition(order[i]!)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    }
  });

  it('starts the member sign-in and sends the browser to the sign-in service', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'not_connected' }));
    const start = vi
      .spyOn(apiModule.mcpServers, 'oauthStart')
      .mockResolvedValue({ authorizeUrl: 'https://idp.example.test/authorize?state=s' });
    const leave = vi.spyOn(navigate, 'leaveTo').mockReturnValue(true);
    const { user, dialog } = await openDetails();
    await user.click(within(dialog).getByRole('button', { name: 'Sign in' }));
    await waitFor(() =>
      expect(leave).toHaveBeenCalledWith('https://idp.example.test/authorize?state=s'),
    );
    expect(start).toHaveBeenCalledWith('org_1', 'org', 'ins_1', 'cmp_1');
  });

  it('refuses to follow an address that is not a web address', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'not_connected' }));
    vi.spyOn(apiModule.mcpServers, 'oauthStart').mockResolvedValue({
      authorizeUrl: 'javascript:alert(1)',
    });
    const { user, dialog } = await openDetails();
    await user.click(within(dialog).getByRole('button', { name: 'Sign in' }));
    expect(await within(dialog).findByText(/cannot be used/)).toBeInTheDocument();
  });

  it('offers to sign in again when the sign-in service no longer accepts the tokens', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'needs_reauth' }));
    const { dialog } = await openDetails();
    expect(within(dialog).getByText('Sign-in expired')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Sign in again' })).toBeInTheDocument();
  });

  it('signs the member out of a connected server', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'connected' }));
    const out = vi.spyOn(apiModule.mcpServers, 'oauthDisconnect').mockResolvedValue(undefined);
    const { user, dialog } = await openDetails();
    await user.click(within(dialog).getByRole('button', { name: 'Sign out' }));
    expect(out).toHaveBeenCalledWith('org_1', 'org', 'ins_1', 'cmp_1');
    expect(await within(dialog).findByText('Not signed in')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('has no sign-in section for a server without a member sign-in', async () => {
    show(server({ authType: 'api_key', apiKeyLastFour: 'abcd' }));
    const { dialog } = await openDetails();
    expect(within(dialog).queryByRole('region', { name: 'Your sign-in' })).not.toBeInTheDocument();
  });

  it('is read-only without the update ability but still lets a member sign in', async () => {
    show(server({ authType: 'oauth_dcr', connection: 'not_connected' }), false);
    const { dialog } = await openDetails();
    expect(
      within(dialog).queryByRole('button', { name: 'Save authentication' }),
    ).not.toBeInTheDocument();
    expect(
      within(dialog).queryByRole('button', { name: 'Test connection' }),
    ).not.toBeInTheDocument();
    expect(within(dialog).getByLabelText('Type')).toBeDisabled();
    expect(
      within(dialog).queryByRole('button', { name: 'Save variables' }),
    ).not.toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: 'Add variable' })).not.toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Sign in' })).toBeEnabled();
  });

  it('explains that a local server cannot go through the gateway', async () => {
    show(server({ transport: 'stdio', url: null }));
    const { dialog } = await openDetails();
    expect(within(dialog).getByText(/runs on your own machine/)).toBeInTheDocument();
    expect(within(dialog).queryByLabelText('Type')).not.toBeInTheDocument();
    expect(
      within(dialog).queryByRole('button', { name: 'Test connection' }),
    ).not.toBeInTheDocument();
  });
});
