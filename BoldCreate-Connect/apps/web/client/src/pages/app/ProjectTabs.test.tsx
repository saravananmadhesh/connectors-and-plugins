/** The users, plugins and logs tabs of a project: what they list and what a member may change. */
import { screen, waitFor } from '@testing-library/react';
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
  renderWithRouter(ProjectPage, ROUTE, {
    url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}?tab=${tab}`,
    queryData: baseData(role),
  });

const server = (isSet: boolean, over: Record<string, unknown> = {}) =>
  ({
    componentId: 'cmp_1',
    pluginId: 'plg_1',
    pluginName: 'alpha',
    pluginDisplayName: 'Alpha',
    serverName: 'search',
    url: 'https://search.example.test/mcp',
    variables: [
      {
        name: 'API_TOKEN',
        required: true,
        secret: true,
        isSet,
        description: 'Token for search',
        custom: false,
      },
      {
        name: 'REGION',
        required: false,
        secret: false,
        isSet: false,
        description: '',
        custom: false,
      },
    ],
    authConfigCount: 0,
    defaultAuthConfigId: null,
    ...over,
  }) as unknown as Awaited<ReturnType<typeof projects.servers>>['items'][number];

const authConfig = (over: Record<string, unknown> = {}) =>
  ({
    id: 'acf_1',
    componentId: 'cmp_1',
    pluginId: 'plg_1',
    pluginName: 'alpha',
    serverName: 'search',
    name: 'Default',
    authMode: 'dcr',
    isDefault: true,
    status: 'active',
    clientId: null,
    clientSecretSet: false,
    secretSet: false,
    secretLastFour: null,
    scopes: null,
    callbackUrl: 'https://app.example.test/api/v1/oauth/callback',
    variables: [],
    ...over,
  }) as unknown as Awaited<ReturnType<typeof projects.authConfigs>>['items'][number];

describe('project tabs', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(projects, 'get').mockResolvedValue(project());
    vi.spyOn(projects, 'users').mockResolvedValue(page([projectUser()]));
    vi.spyOn(projects, 'plugins').mockResolvedValue(page([projectPlugin()]));
    vi.spyOn(projects, 'servers').mockResolvedValue(page([server(true)]));
    vi.spyOn(projects, 'authConfigs').mockResolvedValue(page([]));
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

    it('adds a plugin from the catalog', async () => {
      vi.spyOn(marketplace, 'listCategories').mockResolvedValue({ items: [] } as Awaited<
        ReturnType<typeof marketplace.listCategories>
      >);
      vi.spyOn(projects, 'catalog').mockResolvedValue({
        items: [{ id: 'plg_2', displayName: 'Beta', summary: 'Second plugin' }],
        total: 1,
        page: 1,
        pageSize: 8,
      } as Awaited<ReturnType<typeof projects.catalog>>);
      const put = vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Add plugin' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await waitFor(() => expect(put).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'plg_2'));
    });

    it('opens the setup of an added plugin whose server still needs a value', async () => {
      vi.spyOn(marketplace, 'listCategories').mockResolvedValue({ items: [] } as Awaited<
        ReturnType<typeof marketplace.listCategories>
      >);
      vi.spyOn(projects, 'catalog').mockResolvedValue({
        items: [{ id: 'plg_1', displayName: 'Alpha', summary: 'First plugin' }],
        total: 1,
        page: 1,
        pageSize: 8,
      } as Awaited<ReturnType<typeof projects.catalog>>);
      vi.spyOn(projects, 'plugins').mockResolvedValue(page([]));
      vi.spyOn(projects, 'servers').mockResolvedValue(page([server(false)]));
      vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      const save = vi
        .spyOn(projects, 'putAuthConfigVariables')
        .mockResolvedValue({ items: [], nextCursor: null });
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Add plugin' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Alpha' }));
      expect(await screen.findByRole('heading', { name: 'Set up Alpha' })).toBeInTheDocument();
      expect(screen.getByText('Needs values')).toBeInTheDocument();
      await userEvent.type(screen.getByLabelText('API_TOKEN'), SECRET_VALUE);
      await userEvent.click(screen.getByRole('button', { name: 'Save values' }));
      await waitFor(() =>
        expect(save).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'cmp_1', { API_TOKEN: SECRET_VALUE }),
      );
      await userEvent.click(screen.getByRole('button', { name: 'Later' }));
      await waitFor(() =>
        expect(screen.queryByRole('heading', { name: 'Set up Alpha' })).toBeNull(),
      );
    });

    it('asks for nothing when the added plugin is ready', async () => {
      vi.spyOn(marketplace, 'listCategories').mockResolvedValue({ items: [] } as Awaited<
        ReturnType<typeof marketplace.listCategories>
      >);
      vi.spyOn(projects, 'catalog').mockResolvedValue({
        items: [{ id: 'plg_2', displayName: 'Beta', summary: 'Second plugin' }],
        total: 1,
        page: 1,
        pageSize: 8,
      } as Awaited<ReturnType<typeof projects.catalog>>);
      const servers = vi.spyOn(projects, 'servers').mockResolvedValue(page([server(false)]));
      vi.spyOn(projects, 'putPlugin').mockResolvedValue(projectPlugin());
      await render('plugins');
      await userEvent.click(await screen.findByRole('button', { name: 'Add plugin' }));
      await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
      await waitFor(() => expect(servers).toHaveBeenCalled());
      expect(screen.queryByRole('heading', { name: /^Set up/ })).toBeNull();
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

    it('no longer carries the values of the auth configs', async () => {
      await render('plugins');
      await screen.findByText('Alpha');
      expect(screen.queryByLabelText('API_TOKEN')).toBeNull();
      expect(projects.authConfigs).not.toHaveBeenCalled();
    });
  });

  describe('auth configs', () => {
    it('lists a server that has no config yet, with what it needs and never a value', async () => {
      vi.spyOn(projects, 'servers').mockResolvedValue(page([server(false)]));
      await render('auth-configs');
      expect(await screen.findByText('Alpha · search')).toBeInTheDocument();
      expect(screen.getByText('Needs values')).toBeInTheDocument();
      expect(screen.getAllByText('Not set')).toHaveLength(2);
      const token = screen.getByLabelText('API_TOKEN');
      expect(token).toHaveAttribute('type', 'password');
      expect(token).toHaveValue('');
      expect(screen.getByRole('button', { name: 'Add sign-in for search' })).toBeInTheDocument();
    });

    it('sends only the values that were typed, and clears them after', async () => {
      const save = vi
        .spyOn(projects, 'putAuthConfigVariables')
        .mockResolvedValue({ items: [], nextCursor: null });
      await render('auth-configs');
      const token = await screen.findByLabelText('API_TOKEN');
      expect(screen.getByRole('button', { name: 'Save values' })).toBeDisabled();
      await userEvent.type(token, SECRET_VALUE);
      await userEvent.click(screen.getByRole('button', { name: 'Save values' }));
      await waitFor(() =>
        expect(save).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'cmp_1', {
          API_TOKEN: SECRET_VALUE,
        }),
      );
      await waitFor(() => expect(screen.getByLabelText('API_TOKEN')).toHaveValue(''));
      expect(screen.queryByText(SECRET_VALUE)).toBeNull();
    });

    it('creates an OAuth config with a client ID as the default for a server', async () => {
      vi.spyOn(projects, 'servers').mockResolvedValue(page([server(true, { variables: [] })]));
      const create = vi.spyOn(projects, 'createAuthConfig').mockResolvedValue(authConfig());
      await render('auth-configs');
      expect(await screen.findByText('No sign-in set up')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Add sign-in for search' }));
      await userEvent.selectOptions(screen.getByLabelText('How users sign in'), 'oauth_client');
      const add = screen.getByRole('button', { name: 'Add sign-in' });
      expect(add).toBeDisabled();
      await userEvent.type(screen.getByLabelText('Client ID'), 'client-123');
      await userEvent.type(screen.getByLabelText('Scopes (optional)'), 'repo read:org');
      await userEvent.click(add);
      await waitFor(() =>
        expect(create).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, {
          componentId: 'cmp_1',
          name: 'Default',
          authMode: 'oauth_client',
          isDefault: true,
          clientId: 'client-123',
          scopes: 'repo read:org',
        }),
      );
    });

    it('creates a shared API key config and never shows the key again', async () => {
      vi.spyOn(projects, 'servers').mockResolvedValue(page([server(true, { variables: [] })]));
      const create = vi.spyOn(projects, 'createAuthConfig').mockResolvedValue(authConfig());
      await render('auth-configs');
      await userEvent.click(await screen.findByRole('button', { name: 'Add sign-in for search' }));
      await userEvent.selectOptions(screen.getByLabelText('How users sign in'), 'shared_secret');
      expect(screen.getByLabelText('API key')).toHaveAttribute('type', 'password');
      await userEvent.type(screen.getByLabelText('API key'), SECRET_VALUE);
      await userEvent.click(screen.getByRole('button', { name: 'Add sign-in' }));
      await waitFor(() =>
        expect(create).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, {
          componentId: 'cmp_1',
          name: 'Default',
          authMode: 'shared_secret',
          isDefault: true,
          secret: SECRET_VALUE,
        }),
      );
      await waitFor(() => expect(screen.queryByLabelText('API key')).toBeNull());
    });

    it('shows an existing config under its server and changes or removes it', async () => {
      vi.spyOn(projects, 'servers').mockResolvedValue(
        page([server(true, { authConfigCount: 2, defaultAuthConfigId: 'acf_1' })]),
      );
      vi.spyOn(projects, 'authConfigs').mockResolvedValue(
        page([
          authConfig(),
          authConfig({
            id: 'acf_2',
            name: 'Backup key',
            authMode: 'shared_secret',
            isDefault: false,
            secretSet: true,
            secretLastFour: 'abcd',
            status: 'disabled',
          }),
        ]),
      );
      const update = vi.spyOn(projects, 'updateAuthConfig').mockResolvedValue(authConfig());
      const remove = vi.spyOn(projects, 'deleteAuthConfig').mockResolvedValue(undefined);
      await render('auth-configs');
      expect(await screen.findByText('Backup key')).toBeInTheDocument();
      expect(screen.getByText('Ready')).toBeInTheDocument();
      expect(screen.getByText('ends in abcd')).toBeInTheDocument();
      expect(
        screen.getByText('https://app.example.test/api/v1/oauth/callback'),
      ).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Make Backup key the default' }));
      await waitFor(() =>
        expect(update).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'acf_2', { isDefault: true }),
      );
      await userEvent.click(screen.getByRole('button', { name: 'Turn on Backup key' }));
      await waitFor(() =>
        expect(update).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'acf_2', { status: 'active' }),
      );
      await userEvent.click(screen.getByRole('button', { name: 'Remove Backup key' }));
      await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
      await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'acf_2'));
    });

    it('says so when the project has no MCP server', async () => {
      vi.spyOn(projects, 'servers').mockResolvedValue(page([]));
      await render('auth-configs');
      expect(await screen.findByText('No MCP servers yet')).toBeInTheDocument();
    });

    it('hides every input and action from a viewer', async () => {
      vi.spyOn(projects, 'authConfigs').mockResolvedValue(page([authConfig()]));
      await render('auth-configs', 'VIEWER');
      await screen.findByText('API_TOKEN');
      expect(screen.queryByLabelText('API_TOKEN')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Save values' })).toBeNull();
      expect(screen.queryByRole('button', { name: /Add sign-in/ })).toBeNull();
      expect(screen.queryByRole('button', { name: /Remove/ })).toBeNull();
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
