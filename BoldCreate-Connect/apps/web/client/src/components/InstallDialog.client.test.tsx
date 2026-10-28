/**
 * InstallDialog tests.
 * Covers: the one-step flow (a short review line with the full review on demand and the update
 * type), install for the organization and for the caller alone, an organization the caller may not
 * install into, and a failed install.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InstallDialog } from './InstallDialog';
import type { InstallScope } from './InstallMenu';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'org_1' as Id<'org'>;
const VERSION = { id: 'pv_1', version: '1.2.0' };

const REVIEW: apiModule.PluginVersionReviewResponse = {
  id: 'pv_1' as Id<'pv'>,
  pluginId: 'plg_1' as Id<'plg'>,
  pluginName: 'review-tools',
  version: '1.2.0',
  scanned: true,
  fileCount: 4,
  totalBytes: 2048,
  components: [
    { kind: 'skill', name: 'review', description: '' },
    { kind: 'hook', name: 'PreToolUse', description: '' },
    { kind: 'mcp', name: 'github', description: '' },
  ],
  hookCommands: [{ event: 'PreToolUse', command: 'npm run lint' }],
  mcpServers: [{ name: 'github', transport: 'http', url: 'https://example.com/mcp' }],
  variables: [{ name: 'GITHUB_TOKEN', description: 'Access token', required: true, secret: true }],
  skipped: [{ path: 'assets/big.bin', reason: 'too large' }],
  findingCount: 0,
};

const ME = {
  user: { id: 'usr_1', email: 'a@example.com', displayName: 'Ada' },
  memberships: [{ organizationId: ORG_ID, organizationName: 'Acme' }],
} as unknown as apiModule.MeResponse;

const orgMe = (orgAbilities: string[] = []) =>
  ({
    userId: 'usr_1',
    role: 'MEMBER',
    abilities: orgAbilities,
    policy: {},
  }) as unknown as Awaited<ReturnType<typeof apiModule.orgs.me>>;

function renderDialog(scope: InstallScope = 'user') {
  return renderWithRouter(
    () => (
      <InstallDialog pluginName="review-tools" version={VERSION} scope={scope} onClose={() => {}} />
    ),
    '/',
    { url: '/' },
  );
}

const created = (id: string) =>
  ({ id }) as unknown as Awaited<ReturnType<typeof apiModule.installations.createFor>>;

describe('InstallDialog', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMe());
    vi.spyOn(apiModule.marketplace, 'getVersionReview').mockResolvedValue(REVIEW);
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({ items: [], nextCursor: null });
  });
  afterEach(() => vi.restoreAllMocks());

  it('shows one line on what it brings in and the full review on demand', async () => {
    const user = userEvent.setup();
    await renderDialog();
    expect(await screen.findByText(/1 skill · 1 MCP server · 1 hook/)).toBeInTheDocument();
    expect(screen.getByText('runs commands · needs variables')).toBeInTheDocument();
    expect(screen.queryByText('npm run lint')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Review/ }));
    expect(await screen.findByText('npm run lint')).toBeInTheDocument();
    expect(screen.getByText('GITHUB_TOKEN')).toBeInTheDocument();
    expect(screen.getByText(/assets\/big\.bin/)).toBeInTheDocument();
  });

  it('says so when the version has no recorded scan', async () => {
    vi.spyOn(apiModule.marketplace, 'getVersionReview').mockResolvedValue({
      ...REVIEW,
      scanned: false,
    });
    await renderDialog();
    expect(await screen.findByText('No recorded scan')).toBeInTheDocument();
  });

  it('installs with the chosen update policy', async () => {
    const createFor = vi
      .spyOn(apiModule.installations, 'createFor')
      .mockResolvedValue(created('ins_1'));
    const user = userEvent.setup();
    await renderDialog();
    expect(await screen.findByRole('radio', { name: /Pinned/ })).toBeChecked();

    await user.click(screen.getByRole('radio', { name: /Follow latest/ }));
    await user.click(screen.getByRole('button', { name: 'Install' }));

    expect(createFor).toHaveBeenCalledWith(ORG_ID, 'user', {
      pluginVersionId: 'pv_1',
      updatePolicy: 'follow_latest',
    });
    expect(await screen.findByText(/^Installed/)).toBeInTheDocument();
  });

  it('shows why an install failed', async () => {
    vi.spyOn(apiModule.installations, 'createFor').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Already installed'),
    );
    const user = userEvent.setup();
    await renderDialog();
    await user.click(await screen.findByRole('button', { name: 'Install' }));
    expect(await screen.findByText('Already installed')).toBeInTheDocument();
  });

  it('installs for the whole organization when the caller may', async () => {
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMe(['installation:create']));
    const createFor = vi
      .spyOn(apiModule.installations, 'createFor')
      .mockResolvedValue(
        created('ins_2') as unknown as Awaited<
          ReturnType<typeof apiModule.installations.createFor>
        >,
      );
    const user = userEvent.setup();
    await renderDialog('org');
    expect(await screen.findByText(/for your team/)).toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: 'Install' }));
    expect(createFor).toHaveBeenCalledWith(ORG_ID, 'org', {
      pluginVersionId: 'pv_1',
      updatePolicy: 'pinned',
    });
    expect(await screen.findByText(/^Installed/)).toBeInTheDocument();
  });

  it('installs for the organization without asking to require it, and says what it replaces', async () => {
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMe(['installation:create']));
    const createFor = vi
      .spyOn(apiModule.installations, 'createFor')
      .mockResolvedValue(
        created('ins_4') as unknown as Awaited<
          ReturnType<typeof apiModule.installations.createFor>
        >,
      );
    const user = userEvent.setup();
    await renderDialog('org');
    expect(await screen.findByText(/Replaces member installs/)).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Require for everyone/ })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Install' }));
    expect(createFor).toHaveBeenCalledWith(ORG_ID, 'org', {
      pluginVersionId: 'pv_1',
      updatePolicy: 'pinned',
    });
  });

  it('says nothing about replacing installs for a personal install', async () => {
    await renderDialog('user');
    await screen.findByText(/for you/);
    expect(screen.queryByText(/Replaces/)).not.toBeInTheDocument();
  });

  it('shows why a personal install is refused when the organization requires the plugin', async () => {
    vi.spyOn(apiModule.installations, 'createFor').mockRejectedValue(
      new apiModule.ApiError(
        409,
        'installation_required_by_org',
        'Your organization requires this plugin, so it cannot be replaced.',
      ),
    );
    const user = userEvent.setup();
    await renderDialog('user');
    await user.click(await screen.findByRole('button', { name: 'Install' }));
    expect(await screen.findByText(/organization requires this plugin/)).toBeInTheDocument();
  });

  it('refuses the organization option without admin access', async () => {
    await renderDialog('org');
    expect(await screen.findByText(/You need admin access/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Install' })).toBeDisabled();
  });

  it('installs just for the caller', async () => {
    const createFor = vi
      .spyOn(apiModule.installations, 'createFor')
      .mockResolvedValue(
        created('ins_3') as unknown as Awaited<
          ReturnType<typeof apiModule.installations.createFor>
        >,
      );
    const user = userEvent.setup();
    await renderDialog('user');
    expect(await screen.findByText(/for you/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Install' }));
    expect(createFor).toHaveBeenCalledWith(ORG_ID, 'user', expect.any(Object));
  });

  describe('guided setup after installing', () => {
    const variable = (name: string, isSet = false) => ({
      name,
      description: '',
      required: true,
      secret: false,
      isSet,
      custom: false,
    });
    const oauthServer = {
      componentId: 'cmp_1',
      name: 'github',
      authType: 'oauth_dcr',
      connection: 'not_connected',
    } as unknown as apiModule.McpServerResponse;

    async function install(
      variables: ReturnType<typeof variable>[],
      servers: apiModule.McpServerResponse[],
    ) {
      vi.spyOn(apiModule.installations, 'createFor').mockResolvedValue(
        created('ins_9') as unknown as Awaited<
          ReturnType<typeof apiModule.installations.createFor>
        >,
      );
      vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
        items: variables,
        nextCursor: null,
      });
      vi.spyOn(apiModule.mcpServers, 'list').mockResolvedValue({
        items: servers,
        nextCursor: null,
      } as unknown as Awaited<ReturnType<typeof apiModule.mcpServers.list>>);
      const user = userEvent.setup();
      await renderDialog('user');
      await user.click(await screen.findByRole('button', { name: 'Install' }));
    }

    it('asks for the values when the plugin has only variables', async () => {
      await install([variable('REGION')], []);
      expect(await screen.findByLabelText('REGION')).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
    });

    it('asks for the sign-in when the plugin has only an OAuth server', async () => {
      await install([], [oauthServer]);
      expect(await screen.findByRole('button', { name: 'Sign in to github' })).toBeEnabled();
      expect(screen.queryByRole('heading', { name: 'Values' })).not.toBeInTheDocument();
    });

    it('asks for the values first, then the sign-in, when it has both', async () => {
      await install([variable('REGION')], [oauthServer]);
      expect(await screen.findByLabelText('REGION')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign in to github' })).toBeDisabled();
    });

    it('goes straight to the result when the plugin needs nothing', async () => {
      await install([], []);
      expect(await screen.findByText(/^Installed/)).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.queryByRole('status', { name: 'Checking setup' })).not.toBeInTheDocument(),
      );
      expect(screen.queryByRole('heading', { name: 'Values' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Later' })).not.toBeInTheDocument();
    });
  });
});
