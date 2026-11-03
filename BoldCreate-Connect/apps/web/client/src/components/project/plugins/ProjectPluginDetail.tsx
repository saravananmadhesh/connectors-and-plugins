import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { marketplace, projects } from '@/lib/api';
import type { ProjectPluginResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Button } from '@/components/ui/button';
import { DetailStat, PluginDetailView } from '@/components/PluginDetailView';
import { QueryFrame } from '../shared';

/**
 * A plugin's details inside the project: the same view as the marketplace page, with what this
 * project can do about it (add it, or edit, change its version and remove it) in the header.
 */
export function ProjectPluginDetail({
  orgId,
  projectId,
  pluginId,
  added,
  canWrite,
  actions,
  onAdd,
  onBack,
}: {
  orgId: string;
  projectId: string;
  pluginId: string;
  /** The plugin as the project has it; absent when it has not been added. */
  added: ProjectPluginResponse | undefined;
  canWrite: boolean;
  /** The buttons for an added plugin. */
  actions: React.ReactNode;
  onAdd: (pluginId: string, displayName: string) => Promise<unknown>;
  onBack: () => void;
}) {
  const detail = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'catalog-plugin', { pluginId }),
    queryFn: () => projects.catalogPlugin(orgId, projectId, pluginId),
  });
  const versions = useQuery({
    queryKey: qk.marketplaceVersions(pluginId),
    queryFn: () => marketplace.listVersions(pluginId),
    enabled: detail.isSuccess,
  });

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={onBack}>
        <ArrowLeft aria-hidden="true" />
        Plugins
      </Button>
      <QueryFrame
        label="the plugin"
        isPending={detail.isPending}
        error={detail.error}
        onRetry={() => void detail.refetch()}
      >
        {detail.data && (
          <PluginDetailView
            detail={detail.data}
            versions={versions}
            action={
              added ? (
                canWrite ? (
                  actions
                ) : undefined
              ) : canWrite && detail.data.latestVersion ? (
                <Button onClick={() => void onAdd(pluginId, detail.data.displayName)}>
                  Install
                </Button>
              ) : undefined
            }
            extraStat={
              <DetailStat label="In this project">
                {added ? `Installed, v${added.version}` : 'Not installed'}
              </DetailStat>
            }
          />
        )}
      </QueryFrame>
    </div>
  );
}
