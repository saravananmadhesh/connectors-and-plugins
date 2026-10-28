/**
 * InstalledPlugins tests.
 * Covers: the update policy shown per plugin, switching it from the menu, and no menu without
 * the update ability.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { InstalledPlugins } from './InstalledPlugins';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const item = (
  policy: apiModule.UpdatePolicy,
  patch: Partial<apiModule.InstallationResponse> = {},
): apiModule.InstallationResponse => ({
  id: 'ins_1' as Id<'ins'>,
  scope: 'org',
  pluginName: 'review-tools',
  pluginLogoUrl: null,
  pluginVersion: '1.2.0',
  pluginVersionId: 'pv_1' as Id<'pv'>,
  active: true,
  updatePolicy: policy,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  required: false,
  replacedBy: null,
  ...patch,
});

function renderTable(
  policy: apiModule.UpdatePolicy,
  canUpdate = true,
  patch: Partial<apiModule.InstallationResponse> = {},
) {
  return renderWithRouter(
    () => (
      <InstalledPlugins
        orgId="org_1"
        scopeKey="org"
        items={[item(policy, patch)]}
        canUpdate={canUpdate}
        canDelete={false}
      />
    ),
    '/',
    { url: '/' },
  );
}

describe('InstalledPlugins', () => {
  afterEach(() => vi.restoreAllMocks());

  it('shows whether a plugin is pinned or follows the latest version', async () => {
    await renderTable('follow_latest');
    expect(await screen.findByText('Follows latest')).toBeInTheDocument();
  });

  it('switches a pinned plugin to follow the latest version', async () => {
    const update = vi
      .spyOn(apiModule.installations, 'update')
      .mockResolvedValue(item('follow_latest'));
    const user = userEvent.setup();
    await renderTable('pinned');
    expect(await screen.findByText('Pinned')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Actions for review-tools' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Follow latest' }));
    expect(update).toHaveBeenCalledWith('org_1', 'org', 'ins_1', {
      updatePolicy: 'follow_latest',
    });
  });

  it('offers no actions without the update ability', async () => {
    await renderTable('pinned', false);
    await screen.findByText('review-tools');
    expect(screen.queryByRole('button', { name: /Actions for/ })).not.toBeInTheDocument();
  });

  it('marks an enforced organization plugin', async () => {
    await renderTable('pinned', true, { scope: 'org', required: true });
    expect(await screen.findByText('Enforced')).toBeInTheDocument();
  });

  it('shows a replaced install as disabled and says what replaced it', async () => {
    await renderTable('pinned', true, { scope: 'user', active: false, replacedBy: 'org' });
    const badge = await screen.findByText('Disabled');
    expect(badge).toHaveAttribute('title', 'Replaced by organization install');
  });

  it('cannot enable an install that an enforced install replaced', async () => {
    const update = vi.spyOn(apiModule.installations, 'update');
    const user = userEvent.setup();
    await renderTable('pinned', true, { scope: 'org', active: false, replacedBy: 'org' });
    await user.click(await screen.findByRole('button', { name: 'Actions for review-tools' }));
    const enable = await screen.findByRole('menuitem', { name: 'Enable' });
    expect(enable).toHaveAttribute('aria-disabled', 'true');
    await user.click(enable);
    expect(update).not.toHaveBeenCalled();
  });

  it('lets a disabled install that nothing replaced be enabled again', async () => {
    const update = vi
      .spyOn(apiModule.installations, 'update')
      .mockResolvedValue(item('pinned', { scope: 'user' }));
    const user = userEvent.setup();
    await renderTable('pinned', true, { scope: 'user', active: false });
    await user.click(await screen.findByRole('button', { name: 'Actions for review-tools' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Enable' }));
    expect(update).toHaveBeenCalledWith('org_1', 'org', 'ins_1', { active: true });
  });

  it('offers no requirement toggle, whatever the scope', async () => {
    const user = userEvent.setup();
    await renderTable('pinned', true, { scope: 'org' });
    await user.click(await screen.findByRole('button', { name: 'Actions for review-tools' }));
    await screen.findByRole('menuitem', { name: 'Disable' });
    expect(screen.queryByRole('menuitem', { name: /Require|requiring/ })).not.toBeInTheDocument();
  });

  it('shows why a change was refused', async () => {
    vi.spyOn(apiModule.installations, 'update').mockRejectedValue(
      new apiModule.ApiError(422, 'validation_failed', 'Something is not right'),
    );
    const user = userEvent.setup();
    await renderTable('pinned', true, { scope: 'org' });
    await user.click(await screen.findByRole('button', { name: 'Actions for review-tools' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Follow latest' }));
    expect(await screen.findByText('Something is not right')).toBeInTheDocument();
  });
});
