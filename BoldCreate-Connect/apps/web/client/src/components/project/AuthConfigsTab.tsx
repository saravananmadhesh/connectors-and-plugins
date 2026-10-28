import { KeyRound } from 'lucide-react';
import { configsOf, useServerSetup } from '@/lib/server-setup';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/EmptyState';
import { QueryFrame, type TabProps } from './shared';
import { ServerSetup } from './ServerSetup';

/** Every MCP server of the project's plugins: the values it needs and how users sign in to it. */
export function AuthConfigsTab({ orgId, projectId, canWrite }: TabProps) {
  const setup = useServerSetup(orgId, projectId);
  return (
    <QueryFrame
      label="auth configs"
      isPending={setup.isPending}
      error={setup.error}
      onRetry={setup.refetch}
    >
      {setup.servers.length === 0 ? (
        <EmptyState
          icon={KeyRound}
          title="No MCP servers yet"
          description="Add a plugin with an MCP server, then set up how your users sign in to it here."
        />
      ) : (
        <div className="space-y-3">
          {setup.servers.map((server) => (
            <Card key={server.componentId} className="p-4">
              <ServerSetup
                orgId={orgId}
                projectId={projectId}
                server={server}
                configs={configsOf(setup.configs, server)}
                canWrite={canWrite}
              />
            </Card>
          ))}
        </div>
      )}
    </QueryFrame>
  );
}
