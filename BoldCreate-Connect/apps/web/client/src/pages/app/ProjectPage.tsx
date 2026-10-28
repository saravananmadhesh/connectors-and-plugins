import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { PROJECT_TABS, type ProjectSearch, type ProjectTab } from '@/lib/project-search';
import { qk } from '@/lib/query-keys';
import { Tabs } from '@/components/ui/tabs';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { AuthConfigsTab } from '@/components/project/AuthConfigsTab';
import { CatalogTab } from '@/components/project/CatalogTab';
import { ConnectionsTab } from '@/components/project/ConnectionsTab';
import { KeysTab } from '@/components/project/KeysTab';
import { LogsTab } from '@/components/project/LogsTab';
import { OverviewTab } from '@/components/project/OverviewTab';
import { PluginsTab } from '@/components/project/PluginsTab';
import { SessionsTab } from '@/components/project/SessionsTab';
import { SettingsTab } from '@/components/project/SettingsTab';
import { QueryFrame, type TabProps } from '@/components/project/shared';
import { ProjectStatusBadge } from '@/components/project/status';
import { UsersTab } from '@/components/project/UsersTab';

const PANELS: Record<ProjectTab, (props: TabProps) => React.ReactNode> = {
  overview: (props) => <OverviewTab {...props} />,
  users: (props) => <UsersTab {...props} />,
  sessions: (props) => <SessionsTab {...props} />,
  plugins: (props) => <PluginsTab {...props} />,
  'auth-configs': (props) => <AuthConfigsTab {...props} />,
  connections: (props) => <ConnectionsTab {...props} />,
  catalog: (props) => <CatalogTab {...props} />,
  logs: (props) => <LogsTab {...props} />,
  keys: (props) => <KeysTab {...props} />,
  settings: (props) => <SettingsTab {...props} />,
};

export function ProjectPage() {
  const { orgId, projectId } = useParams({ strict: false }) as { orgId: string; projectId: string };
  const { tab = 'overview' } = useSearch({ strict: false }) as ProjectSearch;
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
    'auth-configs': 'project-plugin:write',
    connections: 'project-connection:write',
    catalog: 'project-plugin:write',
    logs: 'project:read',
    keys: 'project-key:create',
    settings: 'project-webhook:write',
  };
  const props: TabProps = { orgId, projectId, canWrite: can(WRITE[shown]) };
  return (
    <Page>
      <QueryFrame
        label="the project"
        isPending={project.isPending}
        error={project.error}
        onRetry={() => void project.refetch()}
      >
        <PageHeader title={project.data?.name ?? ''} description={`Project ${projectId}`}>
          {project.data && <ProjectStatusBadge status={project.data.status} />}
        </PageHeader>
        <Tabs
          label="Project sections"
          // On a phone the sections are a pinned row under the top bar; from md up they live in the sidebar.
          listClassName="sticky top-[3.25rem] z-10 bg-background md:hidden"
          tabs={tabs}
          value={shown}
          onChange={(next) =>
            void navigate({
              to: '/orgs/$orgId/projects/$projectId',
              params: { orgId, projectId },
              search: { tab: next === 'overview' ? undefined : next },
              replace: true,
            })
          }
        >
          {PANELS[shown](props)}
        </Tabs>
      </QueryFrame>
    </Page>
  );
}
