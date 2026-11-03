import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ArrowRight,
  FolderKanban,
  PackageCheck,
  Settings,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { orgs, projects, auth, installations } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { formatDate } from '@/lib/format';
import { PUBLIC_ROLE_LABELS } from '@/lib/role-labels';
import type { MeResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { DeleteResourceDialog } from '@/components/delete-resource-dialog';
import { Page, Section } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { messageOf } from '@/components/project/paging';

const ROLE_NAMES: Record<string, string> = PUBLIC_ROLE_LABELS;

/** Order and names of the organization roles in the breakdown. */
const ROLES = [
  ['ADMIN', 'Admins'],
  ['MEMBER', 'Members'],
  ['VIEWER', 'Viewers'],
] as const;

interface Stat {
  label: string;
  value: number | undefined;
  hint: string;
  icon: LucideIcon;
  to: string;
}

function StatTile({ stat }: { stat: Stat }) {
  return (
    <Link
      to={stat.to}
      className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="flex h-full items-center gap-3 p-4 transition-colors hover:bg-muted/50">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
          <stat.icon aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-2xl leading-none font-semibold tabular-nums">
            {stat.value?.toLocaleString() ?? '–'}
          </span>
          <span className="mt-1 block truncate text-sm font-medium">{stat.label}</span>
          <span className="block truncate text-xs text-muted-foreground">{stat.hint}</span>
        </span>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </Card>
    </Link>
  );
}

/** Renames the organization; its slug and address stay as they are. */
function EditOrgDialog({
  orgId,
  name: current,
  onClose,
}: {
  orgId: string;
  name: string;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [name, setName] = useState(current);
  const [error, setError] = useState('');
  const mutation = useMutation({
    mutationFn: () => orgs.update(orgId, { name: name.trim() }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.org(orgId) });
      void qc.invalidateQueries({ queryKey: qk.me() });
      onClose();
    },
    onError: (err) => setError(messageOf(err)),
  });
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Edit organization</DialogTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError('');
            mutation.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="edit-org-name">Name</Label>
            <Input
              id="edit-org-name"
              value={name}
              maxLength={60}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={name.trim() === '' || name.trim() === current || mutation.isPending}
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** The organization at a glance: totals, how its people split by role, and its details and rules. */
export function OrgPage() {
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const meQuery = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const orgQuery = useQuery({ queryKey: qk.org(orgId), queryFn: () => orgs.get(orgId) });
  const projectsQuery = useQuery({
    queryKey: qk.projects(orgId),
    queryFn: () => projects.list(orgId),
  });
  const membersQuery = useQuery({
    queryKey: qk.orgMembers(orgId),
    queryFn: () => orgs.listMembers(orgId),
    retry: false,
  });
  // Plugins installed for the whole organization; the key leads with the scope like the Installed page.
  const installedQuery = useQuery({
    queryKey: [...qk.installations('org'), orgId],
    queryFn: () => installations.list(orgId, 'org'),
    retry: false,
  });

  const { me: orgMe, can } = useAbilities(orgId);
  const myRole =
    orgMe?.role ?? meQuery.data?.memberships.find((m) => m.organizationId === orgId)?.role;
  const canDelete = can('org:delete');
  const canEdit = can('org:update');
  const canConfigure = can('org-policy:update');

  if (orgQuery.isLoading) {
    return (
      <Page className="space-y-4" role="status" aria-label="Loading organization">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
      </Page>
    );
  }

  const org = orgQuery.data;
  const members = membersQuery.data?.items;
  const active = members?.filter((member) => member.status === 'active');
  const suspended = (members?.length ?? 0) - (active?.length ?? 0);
  const stats: Stat[] = [
    {
      label: 'Projects',
      value: projectsQuery.data?.items.length,
      hint: 'Find, open and create projects',
      icon: FolderKanban,
      to: `/orgs/${orgId}/projects`,
    },
    {
      label: 'Members',
      value: members?.length,
      hint: suspended > 0 ? `${suspended} suspended` : 'Everyone in the organization',
      icon: Users,
      to: `/orgs/${orgId}/members`,
    },
    {
      label: 'Active people',
      value: active?.length,
      hint: 'Can sign in and use the organization',
      icon: UserCheck,
      to: `/orgs/${orgId}/members`,
    },
    {
      label: 'Plugins for everyone',
      value: installedQuery.data?.items.length,
      hint: 'Installed for the whole organization',
      icon: PackageCheck,
      to: `/orgs/${orgId}/installed`,
    },
  ];

  return (
    <Page className="space-y-8">
      <PageHeader
        title={org?.name ?? 'Organization'}
        description="The organization at a glance: its people and projects."
        meta={
          org && (
            <>
              <span className="font-mono">/{org.slug}</span>
              {myRole && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Your role: {ROLE_NAMES[myRole] ?? myRole}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>Created {formatDate(org.createdAt)}</span>
            </>
          )
        }
      >
        <div className="flex gap-2">
          {canEdit && org && (
            <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <Link to="/orgs/$orgId/members" params={{ orgId }}>
              <Users />
              Members
            </Link>
          </Button>
          {canConfigure && (
            <Button asChild variant="outline" size="sm">
              <Link to="/orgs/$orgId/settings" params={{ orgId }}>
                <Settings />
                Settings
              </Link>
            </Button>
          )}
        </div>
      </PageHeader>

      <section aria-label="Totals" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} stat={stat} />
        ))}
      </section>

      <div>
        <Section
          title="Members by role"
          description="How the people of this organization are split."
        >
          <Card className="space-y-4 p-4">
            {members === undefined ? (
              <Skeleton className="h-24 w-full" />
            ) : members.length === 0 ? (
              <p className="text-sm text-muted-foreground">No members yet.</p>
            ) : (
              ROLES.map(([role, label]) => {
                const count = members.filter((member) => member.role === role).length;
                const share = Math.round((count / members.length) * 100);
                return (
                  <div key={role} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {count} · {share}%
                      </span>
                    </div>
                    <div
                      role="meter"
                      aria-label={label}
                      aria-valuemin={0}
                      aria-valuemax={members.length}
                      aria-valuenow={count}
                      className="h-2 overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </Card>
        </Section>
      </div>

      {canDelete && org && (
        <Section title="Danger zone">
          <Alert variant="destructive" role="group" className="space-y-3 bg-transparent">
            <p className="text-sm">
              Permanently delete this organization and all its projects and resources. Access is
              revoked immediately and cleanup runs in the background. External connection tokens are
              not revoked. This cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => setShowDelete(true)}>
              Delete organization
            </Button>
          </Alert>
        </Section>
      )}

      {showEdit && canEdit && org && (
        <EditOrgDialog orgId={orgId} name={org.name} onClose={() => setShowEdit(false)} />
      )}

      {showDelete && canDelete && org && (
        <DeleteResourceDialog
          name={org.name}
          slug={org.slug}
          onDelete={(confirmSlug) => orgs.delete(orgId, confirmSlug)}
          onDeleted={async () => {
            await Promise.all([
              qc.cancelQueries({ queryKey: qk.org(orgId) }),
              qc.cancelQueries({ queryKey: ['scope'] }),
              qc.cancelQueries({ queryKey: qk.me() }),
            ]);
            qc.setQueryData<MeResponse>(qk.me(), (current) =>
              current
                ? {
                    ...current,
                    memberships: current.memberships.filter(
                      (membership) => membership.organizationId !== orgId,
                    ),
                  }
                : current,
            );
            qc.removeQueries({ queryKey: qk.org(orgId) });
            // Nested resource caches do not carry organization IDs, so clear the scope caches too.
            qc.removeQueries({ queryKey: ['scope'] });
            await qc.invalidateQueries({ queryKey: qk.me(), refetchType: 'none' });
            await navigate({ to: '/orgs', replace: true });
          }}
          onClose={() => setShowDelete(false)}
        />
      )}
    </Page>
  );
}
