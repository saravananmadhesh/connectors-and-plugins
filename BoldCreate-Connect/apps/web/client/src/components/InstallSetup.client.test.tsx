/**
 * InstallSetup tests.
 * Covers: the four setup shapes (values only, sign-in only, both, none), a stored value never shown,
 * saving values, sign-in held back until the required values are set, sign-in, reconnect and
 * disconnect, and a failed load.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InstallSetupPanel } from './InstallSetup';
import * as apiModule from '@/lib/api';
import * as navigate from '@/lib/navigate';
import type { Id } from '@boldcreate-integrations/contracts';
import { renderWithRouter } from '@/test/render-with-router';

const variable = (over: Partial<apiModule.VariableStatus> = {}): apiModule.VariableStatus => ({
  name: 'REGION',
  description: 'Where it runs',
  required: true,
  secret: false,
  isSet: false,
  custom: false,
  ...over,
});

const server = (over: Partial<apiModule.McpServerResponse> = {}) =>
  ({
    componentId: 'cmp_1',
    name: 'search',
    authType: 'oauth_dcr',
    connection: 'not_connected',
    ...over,
  }) as unknown as apiModule.McpServerResponse;

function mockSetup(variables: apiModule.VariableStatus[], servers: apiModule.McpServerResponse[]) {
  vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
    items: variables,
    nextCursor: null,
  });
  vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({
    items: servers,
    nextCursor: null,
  } as unknown as Awaited<ReturnType<typeof apiModule.mcpServers.list>>);
}

const onClose = vi.fn();

const render = () =>
  renderWithRouter(
    () => (
      <InstallSetupPanel
        orgId="org_1"
        scopeKey="me"
        installationId="ins_1"
        pluginName="review-tools"
        onClose={onClose}
      />
    ),
    '/',
    { url: '/' },
  );

describe('InstallSetupPanel', () => {
  beforeEach(() => onClose.mockClear());
  afterEach(() => vi.restoreAllMocks());

  it('asks for values only when there is no sign-in', async () => {
    mockSetup([variable()], []);
    await render();
    expect(await screen.findByLabelText('REGION')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Later' })).toBeInTheDocument();
  });

  it('asks for a sign-in only when there are no values', async () => {
    mockSetup([], [server()]);
    await render();
    expect(await screen.findByRole('button', { name: 'Sign in to search' })).toBeEnabled();
    expect(screen.queryByRole('heading', { name: 'Values' })).not.toBeInTheDocument();
  });

  it('holds the sign-in back until the required values are set', async () => {
    mockSetup([variable()], [server()]);
    await render();
    expect(await screen.findByText('Set the required values first.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in to search' })).toBeDisabled();
  });

  it('says so when the plugin needs nothing', async () => {
    mockSetup([], [server({ authType: 'none', connection: 'not_required' })]);
    await render();
    expect(await screen.findByText('review-tools needs no setup.')).toBeInTheDocument();
  });

  it('saves the typed values and never shows a stored one', async () => {
    mockSetup([variable({ name: 'TOKEN', secret: true, isSet: true })], []);
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue({
      items: [variable({ name: 'TOKEN', secret: true, isSet: true })],
      nextCursor: null,
    });
    const user = userEvent.setup();
    await render();
    const input = await screen.findByLabelText('TOKEN');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Save values' })).toBeDisabled();
    await user.type(input, 'abc123');
    await user.click(screen.getByRole('button', { name: 'Save values' }));
    await waitFor(() =>
      expect(put).toHaveBeenCalledWith('org_1', 'me', 'ins_1', { values: { TOKEN: 'abc123' } }),
    );
    await waitFor(() => expect(screen.getByLabelText('TOKEN')).toHaveValue(''));
    expect(screen.queryByDisplayValue('abc123')).not.toBeInTheDocument();
    expect(screen.queryByText('abc123')).not.toBeInTheDocument();
  });

  it('shows a failed save', async () => {
    mockSetup([variable()], []);
    vi.spyOn(apiModule.installations, 'putVariables').mockRejectedValue(
      new apiModule.ApiError(400, 'invalid', 'REGION is not allowed'),
    );
    const user = userEvent.setup();
    await render();
    await user.type(await screen.findByLabelText('REGION'), 'eu');
    await user.click(screen.getByRole('button', { name: 'Save values' }));
    expect(await screen.findByText('REGION is not allowed')).toBeInTheDocument();
  });

  it('starts the sign-in and sends the browser to the sign-in page', async () => {
    mockSetup([variable({ isSet: true })], [server()]);
    const start = vi
      .spyOn(apiModule.mcpServers, 'oauthStart')
      .mockResolvedValue({ authorizeUrl: 'https://login.example/authorize' });
    const leave = vi.spyOn(navigate, 'leaveTo').mockReturnValue(true);
    const user = userEvent.setup();
    await render();
    await user.click(await screen.findByRole('button', { name: 'Sign in to search' }));
    await waitFor(() => expect(start).toHaveBeenCalledWith('org_1', 'me', 'ins_1', 'cmp_1'));
    await waitFor(() => expect(leave).toHaveBeenCalledWith('https://login.example/authorize'));
  });

  it('refuses an address it cannot use', async () => {
    mockSetup([], [server()]);
    vi.spyOn(apiModule.mcpServers, 'oauthStart').mockResolvedValue({
      authorizeUrl: 'javascript:1',
    });
    vi.spyOn(navigate, 'leaveTo').mockReturnValue(false);
    const user = userEvent.setup();
    await render();
    await user.click(await screen.findByRole('button', { name: 'Sign in to search' }));
    expect(await screen.findByText(/cannot be used/)).toBeInTheDocument();
  });

  it('offers to sign in again, reconnect and disconnect', async () => {
    mockSetup(
      [],
      [
        server({ componentId: 'a' as Id<'cmp'>, name: 'old', connection: 'needs_reauth' }),
        server({ componentId: 'b' as Id<'cmp'>, name: 'live', connection: 'connected' }),
      ],
    );
    const out = vi
      .spyOn(apiModule.mcpServers, 'oauthDisconnect')
      .mockResolvedValue(undefined as never);
    const user = userEvent.setup();
    await render();
    expect(await screen.findByRole('button', { name: 'Sign in to old' })).toHaveTextContent(
      'Sign in again',
    );
    expect(screen.getByRole('button', { name: 'Reconnect live' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Disconnect live' }));
    await waitFor(() => expect(out).toHaveBeenCalledWith('org_1', 'me', 'ins_1', 'b'));
  });

  it('says everything is set up and offers Done', async () => {
    mockSetup([variable({ isSet: true })], [server({ connection: 'connected' })]);
    const user = userEvent.setup();
    await render();
    expect(await screen.findByText(/Everything review-tools needs is set up/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows a failed load', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockRejectedValue(new Error('down'));
    vi.spyOn(apiModule.mcpServers, 'list').mockRejectedValue(new Error('down'));
    await render();
    expect(await screen.findByText(/Could not load what review-tools needs/)).toBeInTheDocument();
  });
});
