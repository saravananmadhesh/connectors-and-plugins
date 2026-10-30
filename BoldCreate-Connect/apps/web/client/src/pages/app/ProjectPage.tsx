import { useNavigate, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { PROJECT_TABS, type ProjectTab } from '@/lib/project-search';
import { formatDate } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Tabs } from '@/components/ui/tabs';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { ConnectionsTab } from '@/components/project/ConnectionsTab';
import { KeysTab } from '@/components/project/KeysTab';
import { LogsTab } from '@/components/project/LogsTab';
import { OverviewTab } from '@/components/project/OverviewTab';
import { PluginSetsPanel } from '@/components/project/PluginSetsSection';
import { PluginsView } from '@/components/project/plugins/PluginsView';
import { SessionsTab } from '@/components/project/SessionsTab';
import { SettingsTab } from '@/components/project/SettingsTab';
import { QueryFrame, type TabProps } from '@/components/project/shared';
import { ProjectStatusBadge } from '@/components/project/status';
import { UsersTab } from '@/components/project/UsersTab';

const PANELS: Record<ProjectTab, (props: TabProps, activeKeyCount: number) => React.ReactNode> = {
  overview: (props, activeKeyCount) => <OverviewTab {...props} activeKeyCount={activeKeyCount} />,
  users: (props) => <UsersTab {...props} />,
  sessions: (props) => <SessionsTab {...props} />,
  plugins: (props) => <PluginsView {...props} />,
  connections: (props) => <ConnectionsTab {...props} />,
  logs: (props) => <LogsTab {...props} />,
  keys: (props) => <KeysTab {...props} />,
  settings: (props) => (
    <div className="space-y-8">
      <SettingsTab {...props} />
      <PluginSetsPanel orgId={props.orgId} projectId={props.projectId} />
    </div>
  ),
};

export function ProjectPage() {
  const {
    orgId,
    projectId,
    tab = 'overview',
  } = useParams({ strict: false }) as { orgId: string; projectId: string; tab?: ProjectTab };
  const navigate = useNavigate();
  const { can } = useAbilities(orgId);
  const project = useQuery({
    queryKey: qk.project(orgId, projectId),
    queryFn: () => projects.get(orgId, projectId),
  });
  // A viewer reads everything but keys and the webhook, which stay out of their tabs.
  const tabs = PROJECT_TABS.filter(
    (entry) =>
      (entry.value !== 'keys' || can('project-key:read')) &&
      (entry.value !== 'settings' || can('project-webhook:read')),
  );
  const shown = tabs.some((entry) => entry.value === tab) ? tab : 'overview';
  // Each tab asks for the ability its own changes need.
  const WRITE: Record<ProjectTab, string> = {
    overview: 'project:read',
    users: 'project-user:delete',
    sessions: 'project-session:write',
    plugins: 'project-plugin:write',
    connections: 'project-connection:write',
    logs: 'project:read',
    keys: 'project-key:create',
    settings: 'project-webhook:write',
  };
  const props: TabProps = {
    orgId,
    projectId,
    canWrite: can(WRITE[shown]),
  };
  return (
    <Page>
      <QueryFrame
        label="the project"
        isPending={project.isPending}
        error={project.error}
        onRetry={() => void project.refetch()}
      >
        <PageHeader
          title={project.data?.name ?? ''}
          description={project.data ? `Created ${formatDate(project.data.createdAt)}` : undefined}
        >
          {project.data && <ProjectStatusBadge status={project.data.status} />}
        </PageHeader>
        <Tabs
          label="Project sections"
          // On a phone the sections are a pinned row under the top bar; from md up they live in the sidebar.
          listClassName="sticky top-[3.25rem] z-10 bg-background md:hidden"
          tabs={tabs}
          value={shown}
          onChange={(next) =>
            void navigate(
              next === 'overview'
                ? { to: '/orgs/$orgId/projects/$projectId', params: { orgId, projectId } }
                : {
                    to: '/orgs/$orgId/projects/$projectId/$tab',
                    params: { orgId, projectId, tab: next },
                  },
            )
          }
        >
          {PANELS[shown](props, project.data?.activeKeyCount ?? 0)}
        </Tabs>
      </QueryFrame>
    </Page>
  );
}
