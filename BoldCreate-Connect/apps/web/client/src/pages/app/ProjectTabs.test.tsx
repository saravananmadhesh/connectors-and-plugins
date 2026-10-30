/** The users, plugins and logs tabs of a project: what they list and what a member may change. */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, marketplace, projects } from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import {
  ORG_ID,
  PROJECT_ID,
  baseData,
  page,
  project,
  projectPlugin,
  projectUser,
  type TestRole,
} from '@/test/projects';
import { ProjectPage } from './ProjectPage';

const ROUTE = '/orgs/$orgId/projects/$projectId';
const SECRET_VALUE = 'sk-live-supersecretvalue';

const render = (tab: string, role: TestRole = 'ADMIN') =>
  renderWithRouter(ProjectPage, `${ROUTE}/$tab`, {
    url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}/${tab}`,
    queryData: baseData(role),
  });

const authConfig = (isSet: boolean) =>
  ({
    id: 'acf_1',
    componentId: 'cmp_1',
    pluginName: 'alpha',
    serverName: 'search',
    authMode: 'user-credentials',
    variables: [
      { name: 'API_TOKEN', required: true, secret: true, isSet, description: 'Token for search' },
      { name: 'REGION', required: false, secret: false, isSet: false, description: null },
    ],
  }) as unknown as Awaited<ReturnType<typeof projects.authConfigs>>['items'][number];

describe('project tabs', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(projects, 'get').mockResolvedValue(project());
    vi.spyOn(projects, 'users').mockResolvedValue(page([projectUser()]));
    vi.spyOn(projects, 'plugins').mockResolvedValue(page([projectPlugin()]));
    vi.spyOn(projects, 'authConfigs').mockResolvedValue(page([authConfig(true)]));
    vi.spyOn(projects, 'logs').mockResolvedValue(
      page([
        {
          id: 'log_1',
          action: 'tool.call',
          result: 'success',
          createdAt: new Date().toISOString(),
          user: { id: 'usr_p1', userId: 'host-user-1' },
          tool: 'search',
          durationMs: 40,
        },
      ]) as Awaited<ReturnType<typeof projects.logs>>,
    );
  });

  describe('users', () => {
    it('lists the users with their counts', async () => {
      await render('users');
      expect(await screen.findByRole('button', { name: 'host-user-1' })).toBeInTheDocument();
      expect(screen.getByText('Grace')).toBeInTheDocument();
    });

    it('says so when there are none', async () => {
      vi.spyOn(projects, 'users').mockResolvedValue(page([]));
      await render('users');
      expect(await screen.findByText('No users yet')).toBeInTheDocument();
    });

    it('shows an error with a retry when the list fails', async () => {
      vi.spyOn(projects, 'users').mockRejectedValue(new ApiError(500, 'internal_error', 'Boom'));
      await render('users');
      expect(await screen.findByText(/Could not load users. Boom/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    });

    it('searches by user id', async () => {
      await render('users');
      await userEvent.type(await screen.findByLabelText('Search users'), 'gra');
      await waitFor(() =>
        expect(projects.users).toHaveBeenCalledWith(
          ORG_ID,
          PROJECT_ID,
          expect.objectContaining({ search: 'gra' }),
        ),
      );
    });

    it('deletes a user after a confirm', async () => {
      const remove = vi.spyOn(projects, 'deleteUser').mockResolvedValue(undefined);
      await render('users');
      await userEvent.click(await screen.findByRole('button', { name: 'Delete host-user-1' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Delete user' }));
      await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'usr_p1'));
    });

    it('hides delete from a viewer', async () => {
      await render('users', 'VIEWER');
      await screen.findByRole('button', { name: 'host-user-1' });
      expect(screen.queryByRole('button', { name: /^Delete / })).toBeNull();
    });

    it('opens the drawer of a user with what they have', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(page([]));
      vi.spyOn(projects, 'sessions').mockResolvedValue(page([]));
      vi.spyOn(projects, 'userPlugins').mockResolvedValue(
        [] as unknown as Awaited<ReturnType<typeof projects.userPlugins>>,
      );
      await render('users');
      await userEvent.click(await screen.findByRole('button', { name: 'host-user-1' }));
      expect(await screen.findByText('No connections.')).toBeInTheDocument();
      expect(screen.getByText('No sessions.')).toBeInTheDocument();
      expect(await screen.findByText('Recent activity')).toBeInTheDocument();
    });
  });

  describe('plugins', () => {
    const CALLBACK = 'https://app.example.test/oauth/callback';
    beforeEach(() => {
      vi.spyOn(projects, 'oauthDiscover').mockResolvedValue({
        discovered: true,
        dynamicRegistration: true,
        scopes: ['repo', 'read:user'],
        callbackUrl: CALLBACK,
      });
      vi.spyOn(projects, 'catalogPlugin').mockResolvedValue({
        components: [],
        variables: [],
      } as unknown as Awaited<ReturnType<typeof projects.catalogPlugin>>);
    });

    it('lists the plugins with their version', async () => {
      await render('plugins');
      expect(await screen.findByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('1.0.0')).toBeInTheDocument();
    });

    it('says so when there are none', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(page([]));
      await render('plugins');
      expect(await screen.findByText('No plugins yet')).toBeInTheDocument();
    });

    const offerBeta = () => {
      vi.spyOn(marketplace, 'listCategories').mockResolvedValue({ items: [] } as Awaited<
        ReturnType<typeof marketplace.listCategories>
      >);
      vi.spyOn(projects, 'catalog').mockResolvedValue({
        items: [{ id: 'plg_2', displayName: 'Beta', summary: 'Second plugin' }],
        total: 1,
        page: 1,
        pageSize: 8,
      } as Awaited<ReturnType<typeof projects.catalog>>);
    };
    const detail = (
      components: { kind: string; name: string }[],
      variables: { name: string; required: boolean; secret: boolean; description: string }[],
    ) =>
      vi
        .spyOn(projects, 'catalogPlugin')
        .mockResolvedValue({ components, variables } as unknown as Awaited<
          ReturnType<typeof projects.catalogPlugin>
        >);

    it('adds a plugin with nothing to set up at once', async () => {
      offerBeta();
      detail([{ kind: 'skill', name: 'review' }], []);
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Browse' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await waitFor(() => expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_2', {}));
    });

    it('adds a plugin with its sign-in and values in one save', async () => {
      offerBeta();
      detail(
        [{ kind: 'mcp', name: 'search' }],
        [{ name: 'API_TOKEN', required: true, secret: true, description: 'Token' }],
      );
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Browse' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await userEvent.selectOptions(await screen.findByLabelText('Type'), 'oauth_dcr');
      const dialog = screen.getByRole('dialog');
      const token = within(dialog).getByLabelText('API_TOKEN');
      expect(token).toHaveAttribute('type', 'password');
      await userEvent.type(token, SECRET_VALUE);
      await userEvent.click(within(dialog).getByRole('button', { name: 'Add plugin' }));
      await waitFor(() =>
        expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_2', {
          authConfigs: { search: { name: 'Default', authMode: 'dcr', scopes: 'repo read:user' } },
          variables: { API_TOKEN: SECRET_VALUE },
        }),
      );
    });

    it('shows the callback URL and fills the scopes from what the server publishes', async () => {
      offerBeta();
      detail([{ kind: 'mcp', name: 'search' }], []);
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Browse' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await userEvent.selectOptions(await screen.findByLabelText('Type'), 'oauth_client');
      expect(await screen.findByLabelText('Callback URL')).toHaveValue(CALLBACK);
      await waitFor(() => expect(screen.getByLabelText('Scopes')).toHaveValue('repo read:user'));
      await userEvent.type(screen.getByLabelText('Client ID'), 'client-1');
      await userEvent.click(screen.getByRole('button', { name: 'Add plugin' }));
      await waitFor(() =>
        expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_2', {
          authConfigs: {
            search: {
              name: 'Default',
              authMode: 'oauth_client',
              clientId: 'client-1',
              scopes: 'repo read:user',
            },
          },
        }),
      );
    });

    it('offers no OAuth type when the server publishes no sign-in details', async () => {
      vi.spyOn(projects, 'oauthDiscover').mockResolvedValue({
        discovered: false,
        dynamicRegistration: false,
        scopes: [],
        callbackUrl: CALLBACK,
      });
      offerBeta();
      detail([{ kind: 'mcp', name: 'search' }], []);
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Browse' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      const select = await screen.findByLabelText('Type');
      await waitFor(() => expect(within(select).queryByText(/OAuth/)).toBeNull());
      expect(within(select).getByText('API key')).toBeInTheDocument();
    });

    it('keeps the form and its values when the save fails', async () => {
      offerBeta();
      detail([{ kind: 'mcp', name: 'search' }], []);
      vi.spyOn(projects, 'putPlugin').mockRejectedValue(new ApiError(409, 'conflict', 'Taken'));
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Browse' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await userEvent.selectOptions(await screen.findByLabelText('Type'), 'api_key');
      await userEvent.type(screen.getByLabelText('API key'), SECRET_VALUE);
      await userEvent.click(screen.getByRole('button', { name: 'Add plugin' }));
      expect(await screen.findByText('Taken')).toBeInTheDocument();
      expect(screen.getByLabelText('API key')).toHaveValue(SECRET_VALUE);
    });

    const withSetup = (
      over: Partial<Awaited<ReturnType<typeof projects.plugins>>['items'][number]>,
    ) => projectPlugin(over);

    it('shows where each plugin stands, and what is missing', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(
        page([
          withSetup({ pluginId: 'plg_1' as never, setup: { status: 'ready', missing: [] } }),
          withSetup({
            pluginId: 'plg_2' as never,
            name: 'beta',
            displayName: 'Beta',
            setup: { status: 'needs_values', missing: ['API_TOKEN'] },
          }),
        ]),
      );
      await render('plugins');
      const [first] = await screen.findAllByRole('table');
      const table = within(first!);
      expect(table.getByText('Configured')).toBeInTheDocument();
      expect(table.getByText('Needs values')).toBeInTheDocument();
      expect(table.getByText('API_TOKEN')).toBeInTheDocument();
    });

    it('filters the installed plugins by status and by name', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(
        page([
          withSetup({ pluginId: 'plg_1' as never, setup: { status: 'ready', missing: [] } }),
          withSetup({
            pluginId: 'plg_2' as never,
            name: 'beta',
            displayName: 'Beta',
            setup: { status: 'needs_values', missing: ['API_TOKEN'] },
          }),
        ]),
      );
      await render('plugins');
      await userEvent.selectOptions(await screen.findByLabelText('Status'), 'needs_values');
      expect(screen.queryByRole('cell', { name: 'Alpha' })).toBeNull();
      expect(screen.getByRole('cell', { name: 'Beta' })).toBeInTheDocument();
      await userEvent.selectOptions(screen.getByLabelText('Status'), '');
      await userEvent.type(screen.getByLabelText('Search added plugins'), 'alp');
      expect(screen.getByRole('cell', { name: 'Alpha' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Beta' })).toBeNull();
    });

    it('sets up the sign-in of a server that has none, with the add call', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(
        page([
          withSetup({
            setup: { status: 'no_sign_in', missing: [] },
            servers: [
              {
                name: 'search',
                componentId: 'cmp_1' as never,
                authMode: null,
                defaultAuthConfigId: null,
              },
            ],
          }),
        ]),
      );
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Edit sign-in of Alpha' }));
      const dialog = await screen.findByRole('dialog');
      expect(within(dialog).getByRole('button', { name: 'Save sign-in' })).toBeDisabled();
      await userEvent.selectOptions(within(dialog).getByLabelText('Type'), 'oauth_dcr');
      await userEvent.click(within(dialog).getByRole('button', { name: 'Save sign-in' }));
      await waitFor(() =>
        expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_1', {
          authConfigs: { search: { name: 'Default', authMode: 'dcr', scopes: 'repo read:user' } },
        }),
      );
    });

    it('reopens a stored sign-in with its details and saves only what changed', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(
        page([
          withSetup({
            setup: { status: 'ready', missing: [] },
            servers: [
              {
                name: 'search',
                componentId: 'cmp_1' as never,
                authMode: 'oauth_client',
                defaultAuthConfigId: 'acf_1' as never,
              },
            ],
          }),
        ]),
      );
      vi.spyOn(projects, 'authConfigs').mockResolvedValue(
        page([
          {
            ...authConfig(true),
            authMode: 'oauth_client',
            clientId: 'app-1',
            clientSecretSet: true,
            scopes: 'repo',
          } as never,
        ]),
      );
      vi.spyOn(projects, 'catalogPlugin').mockResolvedValue({
        components: [],
        variables: [
          { name: 'API_TOKEN', required: true, secret: true, description: 'Token for search' },
        ],
      } as unknown as Awaited<ReturnType<typeof projects.catalogPlugin>>);
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      const update = vi
        .spyOn(projects, 'updateAuthConfig')
        .mockResolvedValue(authConfig(true) as never);
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Edit sign-in of Alpha' }));
      const dialog = await screen.findByRole('dialog');
      const client = await within(dialog).findByLabelText('Client ID');
      expect(client).toHaveValue('app-1');
      expect(within(dialog).getByLabelText('Scopes')).toHaveValue('repo');
      expect(within(dialog).getByLabelText('Client secret')).toHaveValue('');
      expect(within(dialog).getByRole('button', { name: 'Save sign-in' })).toBeDisabled();
      const token = within(dialog).getByLabelText('API_TOKEN');
      expect(token).toHaveAttribute('type', 'password');
      expect(token).toHaveValue('');
      await userEvent.type(token, SECRET_VALUE);
      await userEvent.type(within(dialog).getByLabelText('Scopes'), ' read:user');
      await userEvent.click(within(dialog).getByRole('button', { name: 'Save sign-in' }));
      await waitFor(() =>
        expect(update).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'acf_1', {
          scopes: 'repo read:user',
        }),
      );
      expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_1', {
        variables: { API_TOKEN: SECRET_VALUE },
      });
    });

    it('offers no connect button and no sign-in control to a viewer', async () => {
      vi.spyOn(projects, 'plugins').mockResolvedValue(
        page([
          withSetup({
            setup: { status: 'no_sign_in', missing: [] },
            servers: [
              {
                name: 'search',
                componentId: 'cmp_1' as never,
                authMode: null,
                defaultAuthConfigId: null,
              },
            ],
          }),
        ]),
      );
      await render('plugins', 'VIEWER');
      await screen.findByText('Alpha');
      expect(screen.queryByRole('button', { name: /connect/i })).toBeNull();
      expect(screen.queryByRole('button', { name: 'Edit sign-in of Alpha' })).toBeNull();
    });

    it('removes a plugin after a confirm', async () => {
      const remove = vi.spyOn(projects, 'removePlugin').mockResolvedValue(undefined);
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Remove Alpha' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Remove' }));
      await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_1'));
    });

    it('hides the add, version and remove controls from a viewer', async () => {
      await render('plugins', 'VIEWER');
      await screen.findByText('Alpha');
      expect(screen.queryByRole('button', { name: 'Add plugin' })).toBeNull();
      expect(screen.queryByRole('button', { name: 'Remove Alpha' })).toBeNull();
    });
  });

  describe('connections', () => {
    const connection = (over: Record<string, unknown> = {}) =>
      ({
        id: 'ucn_1',
        userId: 'host-user-1',
        componentId: 'cmp_1',
        serverName: 'search',
        authConfigId: null,
        kind: 'oauth',
        valueNames: [],
        status: 'active',
        expiresAt: null,
        createdAt: new Date().toISOString(),
        ...over,
      }) as unknown as Awaited<ReturnType<typeof projects.connections>>['items'][number];

    it('lists the connections by user', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(
        page([connection({ id: 'ucn_2', userId: 'zed', serverName: 'mail' }), connection()]),
      );
      await render('connections');
      expect(await screen.findByText('host-user-1')).toBeInTheDocument();
      const cells = screen.getAllByRole('cell').map((cell) => cell.textContent);
      expect(cells.indexOf('host-user-1')).toBeLessThan(cells.indexOf('zed'));
    });

    it('says so when there are none', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(page([]));
      await render('connections');
      expect(await screen.findByText('No connections yet')).toBeInTheDocument();
    });

    it('shows an error with a retry when the list fails', async () => {
      vi.spyOn(projects, 'connections').mockRejectedValue(
        new ApiError(500, 'internal_error', 'Boom'),
      );
      await render('connections');
      expect(await screen.findByText(/Could not load connections. Boom/)).toBeInTheDocument();
    });

    it('disconnects a user after a confirm', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(page([connection()]));
      const remove = vi.spyOn(projects, 'disconnect').mockResolvedValue(undefined);
      await render('connections');
      await userEvent.click(
        await screen.findByRole('button', { name: 'Disconnect host-user-1 from search' }),
      );
      await userEvent.click(await screen.findByRole('button', { name: 'Disconnect' }));
      await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'ucn_1'));
    });

    it('shows a failed disconnect', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(page([connection()]));
      vi.spyOn(projects, 'disconnect').mockRejectedValue(
        new ApiError(409, 'conflict', 'Already gone'),
      );
      await render('connections');
      await userEvent.click(
        await screen.findByRole('button', { name: 'Disconnect host-user-1 from search' }),
      );
      await userEvent.click(await screen.findByRole('button', { name: 'Disconnect' }));
      expect(await screen.findByText('Already gone')).toBeInTheDocument();
    });

    it('hides disconnect from a viewer, and never shows a token or value', async () => {
      vi.spyOn(projects, 'connections').mockResolvedValue(
        page([connection({ kind: 'env', valueNames: ['API_TOKEN'] })]),
      );
      await render('connections', 'VIEWER');
      await screen.findByText('host-user-1');
      expect(screen.queryByRole('button', { name: /^Disconnect/ })).toBeNull();
      expect(document.body.textContent).not.toContain(SECRET_VALUE);
    });
  });

  describe('logs', () => {
    it('lists entries with the user and detail', async () => {
      await render('logs');
      expect(await screen.findByText('tool.call')).toBeInTheDocument();
      expect(screen.getByText('host-user-1')).toBeInTheDocument();
      expect(screen.getByText('search · 40 ms')).toBeInTheDocument();
    });

    it('says so when there is no activity', async () => {
      vi.spyOn(projects, 'logs').mockResolvedValue(page([]));
      await render('logs');
      expect(await screen.findByText('No activity yet')).toBeInTheDocument();
    });

    it('filters by user and action', async () => {
      await render('logs');
      await userEvent.type(await screen.findByLabelText('Filter by user'), 'host-user-1');
      await userEvent.type(screen.getByLabelText('Filter by action'), 'tool.call');
      await waitFor(() =>
        expect(projects.logs).toHaveBeenCalledWith(
          ORG_ID,
          PROJECT_ID,
          expect.objectContaining({ userId: 'host-user-1', action: 'tool.call' }),
        ),
      );
    });

    it('shows an error with a retry when the log cannot be loaded', async () => {
      vi.spyOn(projects, 'logs').mockRejectedValue(new ApiError(500, 'internal_error', 'Boom'));
      await render('logs');
      expect(await screen.findByText(/Could not load logs. Boom/)).toBeInTheDocument();
    });
  });
});
