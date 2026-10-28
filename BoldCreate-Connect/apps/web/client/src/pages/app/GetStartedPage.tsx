import { useQuery } from '@tanstack/react-query';
import { FolderKanban } from 'lucide-react';
import { auth } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { useActiveOrg } from '@/lib/active-org';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { SetupChecklist } from '@/components/SetupChecklist';

/** The first steps for the organization the user is working in, ticked off as the data confirms them. */
export function GetStartedPage() {
  const me = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const orgIds = (me.data?.memberships ?? []).map((m) => m.organizationId);
  const { orgId } = useActiveOrg(orgIds);
  const orgName = me.data?.memberships.find((m) => m.organizationId === orgId)?.organizationName;

  return (
    <Page className="space-y-6">
      <PageHeader
        title="Get started"
        description={
          orgName
            ? `Set up ${orgName} in a few steps and connect your agent.`
            : 'Set up your organization in a few steps and connect your agent.'
        }
      />
      {me.isPending ? (
        <Skeleton className="h-64 w-full" role="status" aria-label="Loading steps" />
      ) : orgId ? (
        <SetupChecklist orgId={orgId} />
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="Create an organization first."
          description="Plugins and API keys belong to an organization, so the steps start once you have one."
        />
      )}
    </Page>
  );
}
