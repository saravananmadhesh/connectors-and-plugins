/** Editing a project's details and deleting it, from the project's overview. */
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, projects } from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { ORG_ID, PROJECT_ID, baseData, page, project, type TestRole } from '@/test/projects';
import { ProjectPage } from './ProjectPage';

const ROUTE = '/orgs/$orgId/projects/$projectId';

const render = (role: TestRole = 'ADMIN', tab?: string, shown = project()) =>
  renderWithRouter(ProjectPage, tab ? `${ROUTE}/$tab` : ROUTE, {
    url: `/orgs/${ORG_ID}/projects/${PROJECT_ID}${tab ? `/${tab}` : ''}`,
    queryData: [...baseData(role).slice(0, 1), { key: baseData(role)[1]!.key, data: shown }],
    extraRoutes: [{ path: '/orgs/$orgId/projects', component: () => <div>all projects</div> }],
  });

describe('managing a project', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn();
    vi.spyOn(projects, 'get').mockResolvedValue(project());
    vi.spyOn(projects, 'keys').mockResolvedValue(page([]));
    vi.spyOn(projects, 'usage').mockResolvedValue({
      from: '2026-01-01',
      to: '2026-01-31',
      days: [],
      topUsers: [],
    });
  });

  it('saves only the name', async () => {
    const update = vi.spyOn(projects, 'update').mockResolvedValue(project({ name: 'Shop' }));
    await render('ADMIN', 'settings');
    await userEvent.click(await screen.findByRole('button', { name: 'Edit project' }));
    const dialog = within(await screen.findByRole('dialog'));
    expect(dialog.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    await userEvent.clear(dialog.getByLabelText('Name'));
    await userEvent.type(dialog.getByLabelText('Name'), 'Shop');
    await userEvent.click(dialog.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(update).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, { name: 'Shop' }));
  });

  it('edits the return addresses in Settings, one per line', async () => {
    const update = vi.spyOn(projects, 'update').mockResolvedValue(project());
    await render('ADMIN', 'settings');
    fireEvent.change(await screen.findByLabelText('Addresses'), {
      target: { value: 'https://shop.example.com\nhttps://admin.example.com' },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Save addresses' }));
    await waitFor(() =>
      expect(update).toHaveBeenCalledWith(ORG_ID, PROJECT_ID, {
        returnOrigins: ['https://shop.example.com', 'https://admin.example.com'],
      }),
    );
  });

  it('points to Settings from the overview when no return address is set', async () => {
    await render('ADMIN', undefined, project({ returnOrigins: [] }));
    expect(await screen.findByRole('link', { name: 'Add in Settings' })).toBeInTheDocument();
  });

  it('shows why a save was refused and keeps the dialog open', async () => {
    vi.spyOn(projects, 'update').mockRejectedValue(
      new ApiError(422, 'return_origin_invalid', 'That address is not allowed'),
    );
    await render('ADMIN', 'settings');
    await userEvent.click(await screen.findByRole('button', { name: 'Edit project' }));
    const dialog = within(await screen.findByRole('dialog'));
    await userEvent.type(dialog.getByLabelText('Name'), ' 2');
    await userEvent.click(dialog.getByRole('button', { name: 'Save changes' }));
    expect(await dialog.findByText(/That address is not allowed/)).toBeInTheDocument();
  });

  it('deletes the project after the name is typed, then returns to the projects list', async () => {
    const remove = vi.spyOn(projects, 'delete').mockResolvedValue(undefined);
    const { router } = await render('ADMIN', 'settings');
    await userEvent.click(await screen.findByRole('button', { name: 'Delete project' }));
    const dialog = within(await screen.findByRole('dialog'));
    const confirm = dialog.getByRole('button', { name: 'Delete project' });
    expect(confirm).toBeDisabled();
    fireEvent.change(dialog.getByLabelText(/type storefront to confirm/i), {
      target: { value: 'Storefront' },
    });
    await userEvent.click(dialog.getByRole('checkbox'));
    await userEvent.click(confirm);
    await waitFor(() => expect(router.state.location.pathname).toBe(`/orgs/${ORG_ID}/projects`));
    expect(remove).toHaveBeenCalledExactlyOnceWith(ORG_ID, PROJECT_ID);
  });

  it('offers neither edit nor delete to a viewer', async () => {
    await render('VIEWER', 'settings');
    expect(await screen.findByRole('heading', { name: 'Storefront' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit project' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete project' })).not.toBeInTheDocument();
  });
});
