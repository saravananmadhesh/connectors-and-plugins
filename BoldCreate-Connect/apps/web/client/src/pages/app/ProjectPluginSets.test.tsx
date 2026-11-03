/** The plugin sets a project keeps, in its settings tab. */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, marketplace, projects } from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { ORG_ID, PROJECT_ID, baseData, page, project, type TestRole } from '@/test/projects';
import { ProjectPage } from './ProjectPage';

const ROUTE = '/orgs/$orgId/projects/$projectId';

const render = (role: TestRole = 'ADMIN') =>
  renderWithRouter(ProjectPage, `${ROUTE}/$tab`, {
    url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}/settings`,
    queryData: baseData(role),
  });

const asSet = (id: string, name: string, plugins: { pluginId: string; displayName: string }[]) =>
  ({ id, name, plugins }) as unknown as Awaited<
    ReturnType<typeof projects.pluginSets>
  >['items'][number];

describe('plugin sets in settings', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(projects, 'get').mockResolvedValue(project());
    vi.spyOn(projects, 'webhook').mockRejectedValue(new ApiError(404, 'not_found', 'None'));
    vi.spyOn(projects, 'pluginSets').mockResolvedValue(
      page([asSet('set_1', 'Starter', [{ pluginId: 'plg_1', displayName: 'Alpha' }])]) as Awaited<
        ReturnType<typeof projects.pluginSets>
      >,
    );
    vi.spyOn(marketplace, 'listCategories').mockResolvedValue({ items: [] } as Awaited<
      ReturnType<typeof marketplace.listCategories>
    >);
    vi.spyOn(projects, 'catalog').mockResolvedValue({
      items: [
        {
          id: 'plg_2',
          displayName: 'Beta',
          summary: 'Second plugin',
          logoUrl: null,
          verified: false,
          featured: false,
          componentCounts: { agent: 0, skill: 2, mcp: 0, hook: 0, rule: 0 },
        },
      ],
      total: 1,
      page: 1,
      pageSize: 8,
    } as Awaited<ReturnType<typeof projects.catalog>>);
  });

  it('shows the sets', async () => {
    await render();
    expect(await screen.findByText('Starter')).toBeInTheDocument();
  });

  it('creates a set', async () => {
    const create = vi.spyOn(projects, 'createPluginSet').mockResolvedValue(undefined as never);
    await render();
    await userEvent.click(await screen.findByRole('button', { name: 'Create set' }));
    await userEvent.type(await screen.findByLabelText('Name'), 'Extras');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(create).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, { name: 'Extras' }),
    );
  });

  it('shows the message of the server when a set cannot be created', async () => {
    vi.spyOn(projects, 'createPluginSet').mockRejectedValue(new ApiError(409, 'dup', 'Name taken'));
    await render();
    await userEvent.click(await screen.findByRole('button', { name: 'Create set' }));
    await userEvent.type(await screen.findByLabelText('Name'), 'Starter');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(await screen.findByText('Name taken')).toBeInTheDocument();
  });

  it('renames a set', async () => {
    const rename = vi.spyOn(projects, 'renamePluginSet').mockResolvedValue(undefined as never);
    await render();
    await userEvent.click(await screen.findByLabelText('Rename Starter'));
    const name = await screen.findByLabelText('Name');
    await userEvent.clear(name);
    await userEvent.type(name, 'Basics');
    await userEvent.click(screen.getByRole('button', { name: 'Rename' }));
    await waitFor(() => expect(rename).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'set_1', 'Basics'));
  });

  it('adds a plugin to a set', async () => {
    const add = vi.spyOn(projects, 'addToPluginSet').mockResolvedValue(undefined as never);
    await render();
    await userEvent.click(await screen.findByRole('button', { name: 'Add to Starter' }));
    await userEvent.click(await screen.findByRole('button', { name: 'Add Beta' }));
    await waitFor(() => expect(add).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'set_1', 'plg_2'));
  });

  it('removes a plugin from a set', async () => {
    const remove = vi.spyOn(projects, 'removeFromPluginSet').mockResolvedValue(undefined as never);
    await render();
    await userEvent.click(await screen.findByLabelText('Remove Alpha from Starter'));
    await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'set_1', 'plg_1'));
  });

  it('deletes a set after a confirm', async () => {
    const remove = vi.spyOn(projects, 'deletePluginSet').mockResolvedValue(undefined as never);
    await render();
    await userEvent.click(await screen.findByLabelText('Delete Starter'));
    await userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(remove).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, 'set_1'));
  });

  it('shows an error with a retry when the sets cannot be loaded', async () => {
    vi.spyOn(projects, 'pluginSets').mockRejectedValue(new ApiError(500, 'internal_error', 'Boom'));
    await render();
    expect(await screen.findByText(/Could not load plugin sets. Boom/)).toBeInTheDocument();
  });
});
