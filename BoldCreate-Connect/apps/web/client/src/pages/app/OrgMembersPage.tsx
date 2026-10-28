import { useParams } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { UserPlus, Trash2, Ban, RotateCcw } from 'lucide-react';
import { orgs, auth, ApiError } from '@/lib/api';
import type { CreateInviteResponse, OrgRole, UiRole } from '@/lib/api';
import { INVITE_EMAILS_MAX, INVITE_ROLES, parseEmails } from '@/lib/invite-roles';
import { useAbilities } from '@/lib/abilities';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip } from '@/components/ui/tooltip';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { RoleBadge } from '@/components/StatusBadge';

/** The roles an admin can give a member; the same three the invite offers. */
const ROLE_OPTIONS: readonly { value: OrgRole; label: string }[] = INVITE_ROLES.map((entry) => ({
  value: entry.value as OrgRole,
  label: entry.label,
}));

const OUTCOME_LABEL = {
  invited: 'Invited',
  already_member: 'Already a member',
} as const;

function InviteDialog({ orgId, onClose }: { orgId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const [text, setText] = useState('');
  const [role, setRole] = useState<UiRole>(INVITE_ROLES[0]!.value);
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState<CreateInviteResponse | null>(null);

  const option = INVITE_ROLES.find((entry) => entry.value === role)!;
  const { valid, invalid } = useMemo(() => parseEmails(text), [text]);
  const tooMany = valid.length > INVITE_EMAILS_MAX;

  const mutation = useMutation({
    mutationFn: () => orgs.createInvite(orgId, { emails: valid, role }),
    onSuccess: (response) => {
      setResult(response);
      void qc.invalidateQueries({ queryKey: qk.orgMembers(orgId) });
    },
    onError: (err) => setServerError(err instanceof ApiError ? err.message : 'Failed to invite'),
  });

  const ready = valid.length > 0 && invalid.length === 0 && !tooMany;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        {result ? (
          <div className="space-y-4">
            <DialogTitle>Invitations sent</DialogTitle>
            <ul className="divide-y rounded-md border text-sm">
              {result.results.map((entry) => (
                <li key={entry.email} className="flex items-center justify-between gap-3 px-3 py-2">
                  <span className="truncate">{entry.email}</span>
                  <Badge variant="outline">{OUTCOME_LABEL[entry.status]}</Badge>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <Button onClick={onClose}>Done</Button>
            </div>
          </div>
        ) : (
          <>
            <DialogTitle>Invite members</DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setServerError('');
                mutation.mutate();
              }}
              className="mt-4 space-y-4"
            >
              {serverError && <Alert variant="destructive">{serverError}</Alert>}
              <div className="space-y-1.5">
                <Label htmlFor="invite-emails">Emails</Label>
                <Textarea
                  id="invite-emails"
                  placeholder="colleague@example.com, other@example.com"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  aria-describedby="invite-emails-help"
                />
                <p
                  id="invite-emails-help"
                  className={
                    invalid.length > 0 || tooMany
                      ? 'text-xs text-destructive'
                      : 'text-xs text-muted-foreground'
                  }
                >
                  {invalid.length > 0
                    ? `Not an email address: ${invalid.join(', ')}`
                    : tooMany
                      ? `Invite at most ${INVITE_EMAILS_MAX} people at once.`
                      : 'Paste several addresses, separated by commas, spaces or new lines.'}
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-role">Role</Label>
                <Select
                  id="invite-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UiRole)}
                >
                  {INVITE_ROLES.map((entry) => (
                    <option key={entry.value} value={entry.value}>
                      {entry.label}
                    </option>
                  ))}
                </Select>
                <p className="text-xs text-muted-foreground">{option.hint}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={mutation.isPending || !ready}>
                  {mutation.isPending && <Spinner />}
                  {valid.length > 1 ? `Send ${valid.length} invites` : 'Send invite'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function OrgMembersPage() {
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const qc = useQueryClient();
  const [showInvite, setShowInvite] = useState(false);
  const [removeError, setRemoveError] = useState('');

  const meQuery = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const membersQuery = useQuery({
    queryKey: qk.orgMembers(orgId),
    queryFn: () => orgs.listMembers(orgId),
  });

  const { can } = useAbilities(orgId);
  const myUserId = meQuery.data?.user.id;
  const canInvite = can('invite:create');
  const canManage = can('member:remove');
  const canSuspend = can('member:update');
  const canChangeRole = can('member:update');

  const removeMutation = useMutation({
    mutationFn: (userId: string) => orgs.removeMember(orgId, userId),
    onSuccess: () => void qc.invalidateQueries({ queryKey: qk.orgMembers(orgId) }),
    onError: (err) => setRemoveError(err instanceof ApiError ? err.message : 'Failed to remove'),
  });

  const statusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'suspended' }) =>
      orgs.updateMember(orgId, userId, { status }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: qk.orgMembers(orgId) }),
    onError: (err) => setRemoveError(err instanceof ApiError ? err.message : 'Failed to update'),
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: OrgRole }) =>
      orgs.updateMember(orgId, userId, { role }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: qk.orgMembers(orgId) }),
    onError: (err) => setRemoveError(err instanceof ApiError ? err.message : 'Failed to update'),
  });

  const members = membersQuery.data?.items ?? [];

  return (
    <Page className="space-y-6">
      <PageHeader title="Members" description="People in this organization and what they can do.">
        {canInvite && (
          <Button onClick={() => setShowInvite(true)}>
            <UserPlus />
            Invite
          </Button>
        )}
      </PageHeader>

      {removeError && <Alert variant="destructive">{removeError}</Alert>}

      {membersQuery.isLoading ? (
        <Skeleton className="h-40 w-full" role="status" aria-label="Loading members" />
      ) : (
        <Card>
          <ul className="divide-y">
            {members.map((m) => (
              <li key={m.userId} className="flex items-center gap-3 px-4 py-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium text-muted-foreground uppercase">
                  {m.displayName.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                </div>
                {canChangeRole && m.userId !== myUserId ? (
                  <Select
                    aria-label={`Role of ${m.displayName}`}
                    value={m.role}
                    disabled={roleMutation.isPending}
                    onChange={(e) => {
                      setRemoveError('');
                      roleMutation.mutate({ userId: m.userId, role: e.target.value as OrgRole });
                    }}
                    className="w-40"
                  >
                    {ROLE_OPTIONS.map((entry) => (
                      <option key={entry.value} value={entry.value}>
                        {entry.label}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <RoleBadge role={m.role} />
                )}
                {m.status === 'suspended' && <Badge variant="warning">Suspended</Badge>}
                {canSuspend && m.userId !== myUserId && (
                  <Tooltip
                    label={
                      m.status === 'suspended'
                        ? 'Reinstate: restore their access'
                        : 'Suspend: pause their access, keep their place'
                    }
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setRemoveError('');
                        statusMutation.mutate({
                          userId: m.userId,
                          status: m.status === 'suspended' ? 'active' : 'suspended',
                        });
                      }}
                      disabled={statusMutation.isPending}
                      aria-label={
                        m.status === 'suspended'
                          ? `Reinstate ${m.displayName}`
                          : `Suspend ${m.displayName}`
                      }
                    >
                      {m.status === 'suspended' ? <RotateCcw /> : <Ban />}
                    </Button>
                  </Tooltip>
                )}
                {canManage && m.userId !== myUserId && (
                  <Tooltip label="Remove from the organization">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeMutation.mutate(m.userId)}
                      disabled={removeMutation.isPending}
                      aria-label={`Remove ${m.displayName}`}
                    >
                      <Trash2 />
                    </Button>
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {showInvite && <InviteDialog orgId={orgId} onClose={() => setShowInvite(false)} />}
    </Page>
  );
}
