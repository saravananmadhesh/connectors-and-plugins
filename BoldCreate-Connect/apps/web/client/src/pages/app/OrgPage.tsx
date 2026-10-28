import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import type { MeResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DeleteResourceDialog } from '@/components/delete-resource-dialog';
import { Page, Section } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';

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
            {stat.value ?? '–'}
          </span>
          <span className="mt-1 block truncate text-sm font-medium">{stat.label}</span>
          <span className="block truncate text-xs text-muted-foreground">{stat.hint}</span>
        </span>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </Card>
    </Link>
  );
}

const allowed = (value: boolean) => (value ? 'Allowed' : 'Not allowed');

/** The organization at a glance: totals, how its people split by role, and its details and rules. */
export function OrgPage() {
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);

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
  const policy = orgMe?.policy;
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
      to: '/installed',
    },
  ];
  const details: { label: string; value: string; mono?: boolean }[] = [
    { label: 'Slug', value: `/${org?.slug ?? ''}`, mono: true },
    { label: 'Your role', value: myRole ?? '–' },
    { label: 'Created', value: org ? formatDate(org.createdAt) : '–' },
    { label: 'Updated', value: org ? formatDate(org.updatedAt) : '–' },
    ...(policy
      ? [
          { label: 'Personal plugin installs', value: allowed(policy.allowPersonalInstalls) },
          { label: 'Personal API keys', value: allowed(policy.allowPersonalApiKeys) },
          {
            label: 'Longest key lifetime',
            value: policy.maxPersonalKeyExpiryDays
              ? `${policy.maxPersonalKeyExpiryDays} days`
              : 'No limit',
          },
        ]
      : []),
  ];

  return (
    <Page className="space-y-8">
      <PageHeader
        title={org?.name ?? 'Organization'}
        description="The organization at a glance: its people, projects and rules."
      >
        <div className="flex gap-2">
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

      <div className="grid gap-8 lg:grid-cols-2">
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

        <Section title="Details" description="Who this organization is and the rules it sets.">
          <Card>
            <dl className="divide-y text-sm">
              {details.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className={row.mono ? 'font-mono break-all' : 'text-right'}>{row.value}</dd>
                </div>
              ))}
            </dl>
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
            await navigate({ to: '/marketplace', replace: true });
          }}
          onClose={() => setShowDelete(false)}
        />
      )}
    </Page>
  );
}
