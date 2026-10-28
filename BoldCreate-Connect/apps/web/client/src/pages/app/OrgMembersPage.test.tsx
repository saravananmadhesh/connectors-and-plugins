/**
 * OrgMembersPage tests.
 * Covers: member list rendered, role badges, invite modal open/close,
 * remove member, last-owner conflict error.
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrgMembersPage } from './OrgMembersPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'o1' as Id<'org'>;
const MY_USER_ID = 'u1' as Id<'usr'>;
const ROUTE_PATH = `/orgs/$orgId/members` as const;

const ME: apiModule.MeResponse = {
  user: {
    id: MY_USER_ID,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme',
      organizationSlug: 'acme',
      role: 'ADMIN',
      status: 'active',
    },
  ],
};

const MEMBERS: apiModule.OrgMemberResponse[] = [
  {
    userId: MY_USER_ID,
    displayName: 'Ada',
    email: 'ada@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 'u2' as Id<'usr'>,
    displayName: 'Bob',
    email: 'bob@example.com',
    role: 'MEMBER',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const BACK_ROUTE = [{ path: '/orgs/$orgId', component: () => <div>org</div> }];

const QUERY_DATA = [
  { key: ['me'], data: ME },
  { key: ['org', ORG_ID, 'members'], data: { items: MEMBERS } },
];

const RENDER_OPTS = {
  extraRoutes: BACK_ROUTE,
  queryData: QUERY_DATA,
  url: `/orgs/${ORG_ID}/members`,
};

// Prevent background fetches from clearing pre-populated cache
function mockQueries() {
  vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
  vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: MEMBERS });
}

/** Opens the invite dialog and enters the addresses; any role works. */
async function fillInvite(emails: string) {
  await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
  await waitFor(() => screen.getByRole('button', { name: /invite/i }));
  await userEvent.click(screen.getByRole('button', { name: /invite/i }));
  await userEvent.type(screen.getByLabelText(/emails/i), emails);
}

describe('OrgMembersPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockQueries();
  });

  it('renders member names', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => expect(screen.getByText('Ada')).toBeInTheDocument());
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows your own role as a badge and the role of the others in a list an admin can change', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => expect(screen.getByText('ADMIN')).toBeInTheDocument());
    expect(screen.getByLabelText('Role of Bob')).toHaveValue('MEMBER');
    expect(screen.queryByLabelText('Role of Ada')).not.toBeInTheDocument();
  });

  it('shows Invite button for an admin', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /invite/i })).toBeInTheDocument(),
    );
  });

  it('opens invite modal on Invite click', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    expect(screen.getByText(/invite member/i)).toBeInTheDocument();
  });

  it('closes invite modal on Cancel', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText(/invite member/i)).not.toBeInTheDocument();
  });

  it('calls orgs.removeMember for non-self member', async () => {
    const removeSpy = vi.spyOn(apiModule.orgs, 'removeMember').mockResolvedValue(undefined);
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByLabelText(/remove bob/i));
    await userEvent.click(screen.getByLabelText(/remove bob/i));
    await waitFor(() => expect(removeSpy).toHaveBeenCalledWith(ORG_ID, 'u2'));
  });

  it('does not show remove button for own membership', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByText('Ada'));
    expect(screen.queryByLabelText(/remove ada/i)).not.toBeInTheDocument();
  });

  it('shows error when remove fails', async () => {
    // Override the removeMember mock to reject
    vi.spyOn(apiModule.orgs, 'removeMember').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Cannot remove the last owner'),
    );
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    // Wait for members to render (canManage requires meQuery to resolve)
    const removeBtn = await waitFor(() => screen.getByLabelText(/remove bob/i));
    await userEvent.click(removeBtn);
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Cannot remove the last owner'),
    );
  }, 15000);

  it('sends invite and shows success state', async () => {
    const create = vi.spyOn(apiModule.orgs, 'createInvite').mockResolvedValue({
      results: [{ email: 'charlie@example.com', status: 'invited', invite: null }],
    });
    await fillInvite('charlie@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send invite/i }));
    await waitFor(() => expect(screen.getByText(/invitations sent/i)).toBeInTheDocument());
    expect(screen.getByText('charlie@example.com')).toBeInTheDocument();
    expect(screen.getByText('Invited')).toBeInTheDocument();
    expect(create).toHaveBeenCalledWith(ORG_ID, {
      emails: ['charlie@example.com'],
      role: 'MEMBER',
    });
  });

  it('invites several addresses at once and shows what happened to each', async () => {
    const create = vi.spyOn(apiModule.orgs, 'createInvite').mockResolvedValue({
      results: [
        { email: 'a@example.com', status: 'invited', invite: null },
        { email: 'b@example.com', status: 'invited', invite: null },
        { email: 'c@example.com', status: 'already_member', invite: null },
      ],
    });
    await fillInvite('a@example.com, B@example.com\nc@example.com a@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send 3 invites/i }));
    await waitFor(() => expect(screen.getAllByText('Invited')).toHaveLength(2));
    expect(screen.getByText('Already a member')).toBeInTheDocument();
    expect(create).toHaveBeenCalledWith(ORG_ID, {
      emails: ['a@example.com', 'b@example.com', 'c@example.com'],
      role: 'MEMBER',
    });
  });

  it('offers the three organization roles', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    const options = within(screen.getByLabelText('Role')).getAllByRole('option');
    expect(options.map((option) => option.textContent)).toEqual([
      'Member (Developer)',
      'Viewer',
      'Admin',
    ]);
  });

  it('never asks for a team: the three roles belong to the organization', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    for (const name of ['Member (Developer)', 'Viewer', 'Admin']) {
      await userEvent.selectOptions(screen.getByLabelText('Role'), name);
      expect(screen.queryByLabelText('Team')).not.toBeInTheDocument();
    }
  });

  it('keeps Send disabled until there is an address', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    const send = screen.getByRole('button', { name: /send invite/i });
    expect(send).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/emails/i), 'charlie@example.com');
    expect(send).toBeEnabled();
  });

  it('describes what each role may do', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    expect(screen.getByText(/cannot invite, change roles or delete/i)).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByLabelText('Role'), 'Viewer');
    expect(screen.getByText(/cannot see for you/i)).toBeInTheDocument();
  });

  it('names an address that is not an email and blocks sending', async () => {
    await fillInvite('charlie@example.com, not-an-email');
    expect(screen.getByText(/not an email address: not-an-email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send invite/i })).toBeDisabled();
  });

  it('sends an Admin invite', async () => {
    const create = vi.spyOn(apiModule.orgs, 'createInvite').mockResolvedValue({
      results: [{ email: 'root@example.com', status: 'invited', invite: null }],
    });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    await userEvent.selectOptions(screen.getByLabelText('Role'), 'Admin');
    await userEvent.type(screen.getByLabelText(/emails/i), 'root@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send invite/i }));
    await waitFor(() => expect(create).toHaveBeenCalled());
    expect(create).toHaveBeenCalledWith(ORG_ID, { emails: ['root@example.com'], role: 'ADMIN' });
  });

  it('shows error in invite dialog on failure', async () => {
    vi.spyOn(apiModule.orgs, 'createInvite').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Already a member'),
    );
    await fillInvite('charlie@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send invite/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Already a member'));
  });

  it('shows generic fallback error on non-ApiError invite failure', async () => {
    vi.spyOn(apiModule.orgs, 'createInvite').mockRejectedValue(new Error('Network error'));
    await fillInvite('charlie@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send invite/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Failed to invite'));
  });

  it('shows generic fallback error on non-ApiError remove failure', async () => {
    vi.spyOn(apiModule.orgs, 'removeMember').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    const removeBtn = await waitFor(() => screen.getByLabelText(/remove bob/i));
    await userEvent.click(removeBtn);
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Failed to remove'));
  });

  it('hides Invite button and Remove buttons for non-manager role', async () => {
    const meMember: apiModule.MeResponse = {
      ...ME,
      memberships: [
        {
          organizationId: ORG_ID,
          organizationName: 'Acme',
          organizationSlug: 'acme',
          role: 'MEMBER',
          status: 'active',
        },
      ],
    };
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(meMember);
    vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: MEMBERS });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: meMember },
        { key: ['org', ORG_ID, 'members'], data: { items: MEMBERS } },
      ],
    });
    await waitFor(() => expect(screen.getByText('Ada')).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: /invite/i })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/remove/i)).not.toBeInTheDocument();
  });

  it('suspends a member', async () => {
    const update = vi
      .spyOn(apiModule.orgs, 'updateMember')
      .mockResolvedValue({ ...MEMBERS[1]!, status: 'suspended' });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.click(await screen.findByLabelText(/suspend bob/i));
    await waitFor(() => expect(update).toHaveBeenCalledWith(ORG_ID, 'u2', { status: 'suspended' }));
  });

  it('marks a suspended member and offers to reinstate them', async () => {
    const suspended = [MEMBERS[0]!, { ...MEMBERS[1]!, status: 'suspended' as const }];
    vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: suspended });
    const update = vi
      .spyOn(apiModule.orgs, 'updateMember')
      .mockResolvedValue({ ...MEMBERS[1]!, status: 'active' });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: ME },
        { key: ['org', ORG_ID, 'members'], data: { items: suspended } },
      ],
    });
    expect(await screen.findByText('Suspended')).toBeInTheDocument();
    expect(screen.queryByLabelText(/suspend bob/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/reinstate bob/i));
    await waitFor(() => expect(update).toHaveBeenCalledWith(ORG_ID, 'u2', { status: 'active' }));
  });

  it('shows the server message when a suspension is refused', async () => {
    vi.spyOn(apiModule.orgs, 'updateMember').mockRejectedValue(
      new apiModule.ApiError(
        409,
        'last_admin_required',
        'An organization needs at least one admin.',
      ),
    );
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.click(await screen.findByLabelText(/suspend bob/i));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'An organization needs at least one admin.',
      ),
    );
  });

  it('shows a generic message when a suspension fails without an api error', async () => {
    vi.spyOn(apiModule.orgs, 'updateMember').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.click(await screen.findByLabelText(/suspend bob/i));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Failed to update'));
  });

  it('changes the role of a member from the list', async () => {
    const update = vi
      .spyOn(apiModule.orgs, 'updateMember')
      .mockResolvedValue({ ...MEMBERS[1]!, role: 'ADMIN' });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.selectOptions(await screen.findByLabelText('Role of Bob'), 'Admin');
    await waitFor(() => expect(update).toHaveBeenCalledWith(ORG_ID, 'u2', { role: 'ADMIN' }));
  });

  it('shows why a role change was refused', async () => {
    vi.spyOn(apiModule.orgs, 'updateMember').mockRejectedValue(
      new apiModule.ApiError(403, 'forbidden', 'You do not have permission to do that.'),
    );
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.selectOptions(await screen.findByLabelText('Role of Bob'), 'Viewer');
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('You do not have permission to do that.'),
    );
  });

  it('shows a generic message when a role change fails without an api error', async () => {
    vi.spyOn(apiModule.orgs, 'updateMember').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await userEvent.selectOptions(await screen.findByLabelText('Role of Bob'), 'Viewer');
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Failed to update'));
  });

  it('offers neither suspend nor a role change to a member', async () => {
    const meMember: apiModule.MeResponse = {
      ...ME,
      memberships: [{ ...ME.memberships[0]!, role: 'MEMBER' }],
    };
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(meMember);
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: meMember },
        { key: ['org', ORG_ID, 'members'], data: { items: MEMBERS } },
      ],
    });
    await waitFor(() => expect(screen.getByText('Ada')).toBeInTheDocument());
    expect(screen.queryByLabelText(/suspend/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/role of/i)).not.toBeInTheDocument();
  });

  it('offers a suspension and a role change for others, never for yourself', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await screen.findByLabelText('Role of Bob');
    expect(screen.queryByLabelText('Role of Ada')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/suspend ada/i)).not.toBeInTheDocument();
  });

  it('shows loading spinner while members query is loading', async () => {
    vi.spyOn(apiModule.orgs, 'listMembers').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [{ key: ['me'], data: ME }],
    });
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('changes role select in invite dialog', async () => {
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, RENDER_OPTS);
    await waitFor(() => screen.getByRole('button', { name: /invite/i }));
    await userEvent.click(screen.getByRole('button', { name: /invite/i }));
    const roleSelect = screen.getByLabelText('Role');
    await userEvent.selectOptions(roleSelect, 'Admin');
    expect((roleSelect as HTMLSelectElement).value).toBe('ADMIN');
  });

  it('shows spinner while invite is pending', async () => {
    vi.spyOn(apiModule.orgs, 'createInvite').mockReturnValue(new Promise(() => {}));
    await fillInvite('charlie@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send invite/i }));
    expect(screen.getByRole('button', { name: /send invite/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('hides Invite button for non-manager role', async () => {
    const meMember: apiModule.MeResponse = {
      ...ME,
      memberships: [
        {
          organizationId: ORG_ID,
          organizationName: 'Acme',
          organizationSlug: 'acme',
          role: 'MEMBER',
          status: 'active',
        },
      ],
    };
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(meMember);
    vi.spyOn(apiModule.orgs, 'listMembers').mockResolvedValue({ items: MEMBERS });
    await renderWithRouter(OrgMembersPage, ROUTE_PATH, {
      ...RENDER_OPTS,
      queryData: [
        { key: ['me'], data: meMember },
        { key: ['org', ORG_ID, 'members'], data: { items: MEMBERS } },
      ],
    });
    // Wait for meQuery to resolve by checking the page has rendered members
    await waitFor(() => expect(screen.getByText('Ada')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());
    // Give meQuery time to resolve and re-render
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /invite/i })).not.toBeInTheDocument(),
    );
  });
});
