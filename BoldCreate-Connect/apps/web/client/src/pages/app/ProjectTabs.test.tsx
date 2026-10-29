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
    it('shows whether a value is set, never the value', async () => {
      await render('auth-configs');
      expect(await screen.findByText('API_TOKEN')).toBeInTheDocument();
      expect(screen.getByText('Set')).toBeInTheDocument();
      expect(screen.getByText('Not set')).toBeInTheDocument();
      const token = screen.getByLabelText('API_TOKEN');
      expect(token).toHaveAttribute('type', 'password');
      expect(token).toHaveValue('');
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

    it('says so when no plugin needs values', async () => {
      vi.spyOn(projects, 'authConfigs').mockResolvedValue(page([]));
      await render('auth-configs');
      expect(await screen.findByText('No plugin needs values from you.')).toBeInTheDocument();
    });

    it('hides the value inputs from a viewer', async () => {
      await render('auth-configs', 'VIEWER');
      await screen.findByText('API_TOKEN');
      expect(screen.queryByLabelText('API_TOKEN')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Save values' })).toBeNull();
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
