/**
 * OrgPage tests.
 * Covers: org name, totals, role split, details and rules, Members and Settings links, deletion.
 */
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrgPage } from './OrgPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { orgMeFor } from '@/test/org-me';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'o1' as Id<'org'>;
const ROUTE_PATH = '/orgs/$orgId' as const;

const ORG: apiModule.OrgResponse = {
  id: ORG_ID,
  name: 'Acme Corp',
  slug: 'acme-corp',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const ME: apiModule.MeResponse = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme Corp',
      organizationSlug: 'acme-corp',
      role: 'ADMIN',
      status: 'active',
    },
  ],
};

const EXTRA = [{ path: '/orgs/$orgId/members', component: () => <div>members</div> }];

const RENDER_OPTS = {
  extraRoutes: EXTRA,
  queryData: [
    { key: ['me'], data: ME },
    { key: ['org', ORG_ID], data: ORG },
  ],
  url: `/orgs/${ORG_ID}`,
};

describe('OrgPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'get').mockResolvedValue(ORG);
    vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: [] });
    vi.spyOn(apiModule.installations, 'list').mockResolvedValue({ items: [], nextCursor: null });
  });

  it('renders org name', async () => {
    await renderWithRouter(OrgPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => expect(screen.getByText('Acme Corp')).toBeInTheDocument());
  });

  it('links an owner to the organization settings', async () => {
    await renderWithRouter(OrgPage, ROUTE_PATH, RENDER_OPTS);
    expect(screen.getByRole('link', { name: /settings/i })).toHaveAttribute(
      'href',
      `/orgs/${ORG_ID}/settings`,
    );
  });

  it('hides the settings link from a viewer', async () => {
    const meMember: apiModule.MeResponse = {
      ...ME,
      memberships: [{ ...ME.memberships[0]!, role: 'VIEWER' }],
    };
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(meMember);
    await renderWithRouter(OrgPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: meMember },
        { key: ['org', ORG_ID], data: ORG },
      ],
    });
    await waitFor(() => expect(screen.getByText('Acme Corp')).toBeInTheDocument());
    expect(screen.queryByRole('link', { name: /settings/i })).not.toBeInTheDocument();
  });

  it('renames the organization from the header', async () => {
    const update = vi
      .spyOn(apiModule.orgs, 'update')
      .mockResolvedValue({ ...ORG, name: 'Acme Inc' });
    await renderWithRouter(OrgPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const dialog = within(await screen.findByRole('dialog'));
    expect(dialog.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    await userEvent.clear(dialog.getByLabelText('Name'));
    await userEvent.type(dialog.getByLabelText('Name'), 'Acme Inc');
    await userEvent.click(dialog.getByRole('button', { name: 'Save changes' }));
    await waitFor(() =>
      expect(update).toHaveBeenCalledExactlyOnceWith(ORG_ID, { name: 'Acme Inc' }),
    );
  });

  it('allows an owner to delete an empty organization', async () => {
    await renderWithRouter(OrgPage, ROUTE_PATH, RENDER_OPTS);
    expect(screen.getByRole('button', { name: 'Delete organization' })).toBeEnabled();
  });

  it('queues organization deletion, navigates to the home address and clears affected caches', async () => {
    const deleteOrg = vi
      .spyOn(apiModule.orgs, 'delete')
      .mockResolvedValue({ status: 'deletion_pending', purgeAfter: '2026-01-01T00:00:00.000Z' });
    const { router, qc } = await renderWithRouter(OrgPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      extraRoutes: [...EXTRA, { path: '/orgs', component: () => <div>home</div> }],
      queryData: [
        ...RENDER_OPTS.queryData,
        { key: ['org', ORG_ID, 'members'], data: { items: [] } },
        { key: ['scope', 'org', 'installations'], data: { items: [] } },
        { key: ['org', 'other-org'], data: { ...ORG, id: 'other-org' } },
        { key: ['marketplace', 'plugins'], data: { items: [] } },
      ],
    });
    await userEvent.click(screen.getByRole('button', { name: 'Delete organization' }));
    const dialog = within(screen.getByRole('dialog'));
    fireEvent.change(dialog.getByLabelText(/type acme-corp to confirm/i), {
      target: { value: 'acme-corp' },
    });
    expect(dialog.getByRole('button', { name: 'Delete organization' })).toBeDisabled();
    await userEvent.click(dialog.getByRole('checkbox'));
    await userEvent.click(dialog.getByRole('button', { name: 'Delete organization' }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/orgs'));
    expect(deleteOrg).toHaveBeenCalledExactlyOnceWith(ORG_ID, ORG.slug);
    expect(qc.getQueriesData({ queryKey: ['org', ORG_ID] })).toEqual([]);
    expect(qc.getQueriesData({ queryKey: ['scope'] })).toEqual([]);
    expect(qc.getQueryData<apiModule.MeResponse>(['me'])?.memberships).toEqual([]);
    expect(qc.getQueryState(['me'])?.isInvalidated).toBe(true);
    expect(qc.getQueryData(['org', 'other-org'])).toBeDefined();
    expect(qc.getQueryData(['marketplace', 'plugins'])).toEqual({ items: [] });
  });

  it('does not offer organization deletion to members', async () => {
    await renderWithRouter(OrgPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: { ...ME, memberships: [{ ...ME.memberships[0], role: 'MEMBER' }] } },
        { key: ['org', ORG_ID], data: ORG },
      ],
    });
    expect(screen.queryByRole('button', { name: 'Delete organization' })).not.toBeInTheDocument();
  });

  const member = (n: number, role: 'ADMIN' | 'MEMBER' | 'VIEWER', status = 'active') =>
    ({
      userId: `u${n}`,
      displayName: `Person ${n}`,
      email: `p${n}@example.com`,
      role,
      status,
      createdAt: new Date().toISOString(),
    }) as apiModule.OrgMemberResponse;

  const show = (members: apiModule.OrgMemberResponse[], projectCount = 0, installed = 0) => {
    vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: members });
    vi.spyOn(apiModule.projects, 'list').mockResolvedValue({
      items: Array.from({ length: projectCount }, (_, i) => ({ id: `p${i}` })),
      nextCursor: null,
    } as unknown as Awaited<ReturnType<typeof apiModule.projects.list>>);
    vi.spyOn(apiModule.installations, 'list').mockResolvedValue({
      items: Array.from({ length: installed }, (_, i) => ({ id: `i${i}` })),
      nextCursor: null,
    } as unknown as Awaited<ReturnType<typeof apiModule.installations.list>>);
    return renderWithRouter(OrgPage, ROUTE_PATH, {
      extraRoutes: EXTRA,
      queryData: [
        { key: ['me'], data: ME },
        { key: ['org', ORG_ID], data: ORG },
      ],
      url: `/orgs/${ORG_ID}`,
    });
  };

  it('shows totals that link to the pages that manage them', async () => {
    await show([member(1, 'ADMIN'), member(2, 'VIEWER'), member(3, 'VIEWER', 'suspended')], 4, 2);
    const totals = within(await screen.findByRole('region', { name: 'Totals' }));
    expect(await totals.findByRole('link', { name: /^4s*Projects/ })).toHaveAttribute(
      'href',
      `/orgs/${ORG_ID}/projects`,
    );
    expect(await totals.findByRole('link', { name: /^3s*Memberss*1 suspended/ })).toHaveAttribute(
      'href',
      `/orgs/${ORG_ID}/members`,
    );
    expect(await totals.findByRole('link', { name: /^2s*Active people/ })).toBeInTheDocument();
    expect(await totals.findByRole('link', { name: /^2s*Plugins for everyone/ })).toHaveAttribute(
      'href',
      `/orgs/${ORG_ID}/installed`,
    );
  });

  it('splits the members by role', async () => {
    await show([member(1, 'ADMIN'), member(2, 'VIEWER'), member(3, 'VIEWER'), member(4, 'VIEWER')]);
    const viewers = await screen.findByRole('meter', { name: 'Viewers' });
    expect(viewers).toHaveAttribute('aria-valuenow', '3');
    expect(viewers).toHaveAttribute('aria-valuemax', '4');
    expect(screen.getByRole('meter', { name: 'Admins' })).toHaveAttribute('aria-valuenow', '1');
    expect(screen.getByRole('meter', { name: 'Members' })).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('3 · 75%')).toBeInTheDocument();
  });

  it('says so when there are no members to split', async () => {
    await show([]);
    expect(await screen.findByText('No members yet.')).toBeInTheDocument();
  });

  it('shows who the organization is under its title, and leaves its rules to Settings', async () => {
    const orgMe = orgMeFor('u1', 'ADMIN');
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMe);
    await show([member(1, 'ADMIN')]);
    expect(await screen.findByText('/acme-corp')).toBeInTheDocument();
    expect(await screen.findByText(/^Your role: /)).toBeInTheDocument();
    expect(screen.getByText(/^Created /)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Details' })).toBeNull();
    expect(screen.queryByText('Personal plugin installs')).toBeNull();
  });

  it('shows a dash instead of a total that could not be loaded', async () => {
    vi.spyOn(apiModule.orgs, 'listMembers').mockRejectedValue(new Error('no'));
    vi.spyOn(apiModule.installations, 'list').mockRejectedValue(new Error('no'));
    await renderWithRouter(OrgPage, ROUTE_PATH, {
      extraRoutes: EXTRA,
      queryData: [
        { key: ['me'], data: ME },
        { key: ['org', ORG_ID], data: ORG },
      ],
      url: `/orgs/${ORG_ID}`,
    });
    const totals = within(await screen.findByRole('region', { name: 'Totals' }));
    expect(await totals.findByRole('link', { name: /^–s*Members/ })).toBeInTheDocument();
  });

  it('shows a placeholder while the org query is loading', async () => {
    vi.spyOn(apiModule.orgs, 'get').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(OrgPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [{ key: ['me'], data: ME }],
    });
    expect(screen.getByRole('status', { name: 'Loading organization' })).toBeInTheDocument();
  });
});
