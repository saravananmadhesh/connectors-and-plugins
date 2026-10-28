/** ProjectsPage: the list, its empty and error states, and creating a project. */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, projects } from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { ORG_ID, PROJECT_ID, meAs, page, project, type TestRole } from '@/test/projects';
import { ProjectsPage } from './ProjectsPage';

const ROUTE = '/orgs/$orgId/projects';
const render = (items = [project()], role: TestRole = 'ADMIN') =>
  renderWithRouter(ProjectsPage, ROUTE, {
    url: `/orgs/${ORG_ID}/projects`,
    queryData: [
      { key: ['me'], data: meAs(role) },
      { key: ['org', ORG_ID, 'projects', { cursor: undefined }], data: page(items) },
    ],
    extraRoutes: [{ path: '/orgs/$orgId/projects/$projectId', component: () => <div>one</div> }],
  });

const submit = () => screen.getAllByRole('button', { name: 'Create project' }).at(-1)!;

describe('ProjectsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('lists the projects with their status and a link to each', async () => {
    await render();
    const link = await screen.findByRole('link', { name: 'Storefront' });
    expect(link).toHaveAttribute('href', `/orgs/${ORG_ID}/projects/${PROJECT_ID}`);
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('says so when there are no projects, and offers to create one', async () => {
    await render([]);
    expect(await screen.findByText('No projects yet')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /create project/i }).length).toBeGreaterThan(0);
  });

  it('leaves the create button out for a viewer', async () => {
    await render([project()], 'VIEWER');
    await screen.findByRole('link', { name: 'Storefront' });
    expect(screen.queryByRole('button', { name: /create project/i })).toBeNull();
  });

  it('shows an error with a retry when the list cannot be loaded', async () => {
    vi.spyOn(projects, 'list').mockRejectedValue(new ApiError(500, 'internal_error', 'Boom'));
    await renderWithRouter(ProjectsPage, ROUTE, {
      url: `/orgs/${ORG_ID}/projects`,
      queryData: [{ key: ['me'], data: meAs('ADMIN') }],
    });
    expect(await screen.findByText(/Could not load projects. Boom/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('creates a project from a name and return origins', async () => {
    const create = vi.spyOn(projects, 'create').mockResolvedValue(project({ name: 'Docs' }));
    vi.spyOn(projects, 'list').mockResolvedValue(page([project()]));
    await render();
    await userEvent.click(await screen.findByRole('button', { name: /create project/i }));
    await userEvent.type(screen.getByLabelText('Name'), ' Docs ');
    await userEvent.type(
      screen.getByLabelText('Return origins'),
      'https://a.example.com, https://b.example.com',
    );
    await userEvent.click(submit());
    await waitFor(() =>
      expect(create).toHaveBeenCalledWith(ORG_ID, {
        name: 'Docs',
        returnOrigins: ['https://a.example.com', 'https://b.example.com'],
      }),
    );
    await waitFor(() => expect(screen.queryByLabelText('Name')).toBeNull());
  });

  it('shows the message of the server when creating fails', async () => {
    vi.spyOn(projects, 'create').mockRejectedValue(new ApiError(409, 'conflict', 'Name taken'));
    await render();
    await userEvent.click(await screen.findByRole('button', { name: /create project/i }));
    await userEvent.type(screen.getByLabelText('Name'), 'Storefront');
    await userEvent.click(submit());
    expect(await screen.findByText('Name taken')).toBeInTheDocument();
  });
});
