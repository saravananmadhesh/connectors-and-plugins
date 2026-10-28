/**
 * UpgradeDialog tests.
 * Covers: only other published versions are offered, the result lists dropped and new components,
 * nothing to move to, and a refused change shown with the server's message.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { UpgradeDialog } from './UpgradeDialog';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const INSTALLATION = {
  id: 'ins_1',
  pluginName: 'review-tools',
  pluginLogoUrl: null,
  pluginVersion: '1.0.0',
  pluginVersionId: 'pv_1',
} as unknown as apiModule.InstallationResponse;

const version = (id: string, v: string, status: string) => ({
  id,
  pluginId: 'plg_1',
  version: v,
  status,
  publishedAt: '2026-01-01T00:00:00.000Z',
});

type Versions = Awaited<ReturnType<typeof apiModule.marketplace.listVersions>>;
const listing = (...items: ReturnType<typeof version>[]) =>
  ({ items, nextCursor: null }) as unknown as Versions;

function renderDialog() {
  return renderWithRouter(
    () => <UpgradeDialog orgId="o" scopeKey="org" installation={INSTALLATION} onClose={() => {}} />,
    '/',
    { url: '/' },
  );
}

describe('UpgradeDialog', () => {
  beforeEach(() => {
    vi.spyOn(apiModule.marketplace, 'getVersion').mockResolvedValue(
      version('pv_1', '1.0.0', 'published') as unknown as Awaited<
        ReturnType<typeof apiModule.marketplace.getVersion>
      >,
    );
  });
  afterEach(() => vi.restoreAllMocks());

  it('offers other published versions only and reports what changed', async () => {
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue(
      listing(
        version('pv_1', '1.0.0', 'published'),
        version('pv_2', '2.0.0', 'published'),
        version('pv_3', '3.0.0', 'yanked'),
      ),
    );
    const upgrade = vi.spyOn(apiModule.installations, 'upgrade').mockResolvedValue({
      installationId: 'ins_1',
      newVersion: '2.0.0',
      droppedComponents: ['old-skill'],
      newDisabledComponents: [],
    } as unknown as Awaited<ReturnType<typeof apiModule.installations.upgrade>>);
    const user = userEvent.setup();
    await renderDialog();
    expect(await screen.findByRole('radio', { name: /2\.0\.0/ })).toBeChecked();
    expect(screen.queryByRole('radio', { name: /3\.0\.0/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: /1\.0\.0/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Change version' }));
    expect(upgrade).toHaveBeenCalledWith('o', 'org', 'ins_1', { pluginVersionId: 'pv_2' });
    expect(await screen.findByText(/Now on v2\.0\.0/)).toBeInTheDocument();
    expect(screen.getByText(/old-skill/)).toBeInTheDocument();
  });

  it('says so when there is nothing to move to', async () => {
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue(
      listing(version('pv_1', '1.0.0', 'published')),
    );
    await renderDialog();
    expect(await screen.findByText(/no other published version/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change version' })).toBeDisabled();
  });

  it('shows the server message when the change is refused', async () => {
    vi.spyOn(apiModule.marketplace, 'listVersions').mockResolvedValue(
      listing(version('pv_2', '2.0.0', 'published')),
    );
    vi.spyOn(apiModule.installations, 'upgrade').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Version is blocked'),
    );
    const user = userEvent.setup();
    await renderDialog();
    await user.click(await screen.findByRole('button', { name: 'Change version' }));
    expect(await screen.findByText('Version is blocked')).toBeInTheDocument();
  });
});
