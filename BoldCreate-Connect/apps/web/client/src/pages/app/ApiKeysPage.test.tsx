/**
 * ApiKeysPage tests.
 * Covers: only active keys are listed, create takes no scope and uses the personal route,
 * the new key is shown once, revoke asks first, load and server failures.
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiKeysPage } from './ApiKeysPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'org-1' as Id<'org'>;

const ME: apiModule.MeResponse = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada Lovelace',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme Corp',
      organizationSlug: 'acme-corp',
      role: 'MEMBER',
      status: 'active',
    },
  ],
};

function key(id: string, name: string, revokedAt: string | null = null): apiModule.ApiKeyResponse {
  return {
    id: id as Id<'key'>,
    prefix: 'bc_live_abcdefgh',
    name,
    scope: 'user',
    permissions: ['mcp:list', 'mcp:call'],
    lastFour: '1234',
    expiresAt: null,
    revokedAt,
    createdAt: '2026-01-01T00:00:00.000Z',
  };
}

const ME_DATA = { key: ['me'], data: ME };

function keysData(items: apiModule.ApiKeyResponse[]) {
  return { key: ['org', ORG_ID, 'api-keys'], data: { items, nextCursor: null } };
}

describe('ApiKeysPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('lists active keys and leaves revoked keys out', async () => {
    await renderWithRouter(ApiKeysPage, '/api-keys', {
      queryData: [
        ME_DATA,
        keysData([key('k1', 'laptop agent'), key('k2', 'old bot', '2026-02-01')]),
      ],
    });
    expect(screen.getByText('laptop agent')).toBeInTheDocument();
    expect(screen.queryByText('old bot')).not.toBeInTheDocument();
    expect(screen.queryByText('Revoked')).not.toBeInTheDocument();
  });

  it('names the organization the keys belong to', async () => {
    await renderWithRouter(ApiKeysPage, '/api-keys', { queryData: [ME_DATA, keysData([])] });
    expect(screen.getByText(/for you keys of acme corp/i)).toBeInTheDocument();
  });

  it('shows the empty state when every key is revoked', async () => {
    await renderWithRouter(ApiKeysPage, '/api-keys', {
      queryData: [ME_DATA, keysData([key('k2', 'old bot', '2026-02-01')])],
    });
    expect(screen.getByText('No API keys yet')).toBeInTheDocument();
  });

  it('creates an organization key without asking for a scope and shows it once', async () => {
    const create = vi.spyOn(apiModule.orgApiKeys, 'create').mockResolvedValue({
      ...key('k3', 'ci agent'),
      rawKey: 'bc_live_abcdefgh.secretvalue',
    });
    await renderWithRouter(ApiKeysPage, '/api-keys', { queryData: [ME_DATA, keysData([])] });
    await userEvent.click(screen.getByRole('button', { name: /create key/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(within(dialog).queryByText(/scope|team only|this team/i)).not.toBeInTheDocument();
    await userEvent.type(within(dialog).getByLabelText('Name'), 'ci agent');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText(/bc_live_abcdefgh\.secretvalue/)).toBeInTheDocument(),
    );
    expect(create).toHaveBeenCalledWith(ORG_ID, {
      name: 'ci agent',
      permissions: ['mcp:list', 'mcp:call'],
    });
  });

  it('shows the server message when creating is refused', async () => {
    vi.spyOn(apiModule.orgApiKeys, 'create').mockRejectedValue(
      new apiModule.ApiError(403, 'forbidden', 'Personal API keys are turned off.'),
    );
    await renderWithRouter(ApiKeysPage, '/api-keys', { queryData: [ME_DATA, keysData([])] });
    await userEvent.click(screen.getByRole('button', { name: /create key/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    await userEvent.type(within(dialog).getByLabelText('Name'), 'ci agent');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(within(dialog).getByRole('alert')).toHaveTextContent(
        'Personal API keys are turned off.',
      ),
    );
  });

  it('revokes a key after confirmation', async () => {
    const revoke = vi.spyOn(apiModule.orgApiKeys, 'revoke').mockResolvedValue(undefined);
    await renderWithRouter(ApiKeysPage, '/api-keys', {
      queryData: [ME_DATA, keysData([key('k1', 'laptop agent')])],
    });
    await userEvent.click(screen.getByRole('button', { name: 'Actions for laptop agent' }));
    await userEvent.click(await screen.findByRole('menuitem', { name: /revoke/i }));
    expect(revoke).not.toHaveBeenCalled();
    const dialog = screen.getByRole('dialog', { hidden: true });
    await userEvent.click(within(dialog).getByRole('button', { name: 'Revoke' }));
    await waitFor(() => expect(revoke).toHaveBeenCalledWith(ORG_ID, 'k1'));
  });

  it('shows the server message when revoking fails', async () => {
    vi.spyOn(apiModule.orgApiKeys, 'revoke').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'The key is already revoked.'),
    );
    await renderWithRouter(ApiKeysPage, '/api-keys', {
      queryData: [ME_DATA, keysData([key('k1', 'laptop agent')])],
    });
    await userEvent.click(screen.getByRole('button', { name: 'Actions for laptop agent' }));
    await userEvent.click(await screen.findByRole('menuitem', { name: /revoke/i }));
    await userEvent.click(
      within(screen.getByRole('dialog', { hidden: true })).getByRole('button', { name: 'Revoke' }),
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('The key is already revoked.'),
    );
  });

  it('offers a retry when the keys cannot be loaded', async () => {
    const list = vi
      .spyOn(apiModule.orgApiKeys, 'list')
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue({ items: [key('k1', 'laptop agent')], nextCursor: null });
    await renderWithRouter(ApiKeysPage, '/api-keys', { queryData: [ME_DATA] });
    await userEvent.click(await screen.findByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(screen.getByText('laptop agent')).toBeInTheDocument());
    expect(list).toHaveBeenCalledTimes(2);
  });
});
