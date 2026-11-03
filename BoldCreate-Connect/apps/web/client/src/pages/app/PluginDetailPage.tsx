import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { marketplace, ApiError } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { useInstallOptions } from '@/lib/install-options';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { InstallDialog } from '@/components/InstallDialog';
import type { InstallScope } from '@/components/InstallMenu';
import { Page } from '@/components/Page';
import { PluginInstallButton } from '@/components/PluginInstallButton';
import { DetailStat, PluginDetailView } from '@/components/PluginDetailView';

export function PluginDetailPage() {
  const { orgId, pluginId } = useParams({ strict: false }) as { orgId: string; pluginId: string };
  const [installing, setInstalling] = useState<InstallScope | undefined>();
  const installOptions = useInstallOptions();

  const plugin = useQuery({
    queryKey: qk.marketplacePlugin(pluginId),
    queryFn: () => marketplace.getPlugin(pluginId),
  });
  const versions = useQuery({
    queryKey: qk.marketplaceVersions(pluginId),
    queryFn: () => marketplace.listVersions(pluginId),
    enabled: plugin.isSuccess,
  });

  if (plugin.isPending) {
    return (
      <Page className="space-y-4" role="status" aria-label="Loading plugin">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-40 w-full" />
      </Page>
    );
  }

  if (plugin.error) {
    const notFound = plugin.error instanceof ApiError && plugin.error.status === 404;
    return (
      <Page className="space-y-4">
        <Alert variant="destructive">
          {notFound
            ? 'This plugin is not available. It may have been removed from the marketplace.'
            : 'Could not load this plugin. Check your connection and try again.'}
        </Alert>
        {!notFound && (
          <Button variant="outline" onClick={() => void plugin.refetch()}>
            Retry
          </Button>
        )}
        <Link
          to="/orgs/$orgId/marketplace"
          params={{ orgId }}
          className="block text-sm text-muted-foreground hover:underline"
        >
          Back to the marketplace
        </Link>
      </Page>
    );
  }

  const detail = plugin.data;
  const installedIn = installOptions.installedIn(detail.name);

  return (
    <Page className="space-y-6">
      <Link
        to="/orgs/$orgId/marketplace"
        params={{ orgId }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Marketplace
      </Link>

      <PluginDetailView
        detail={detail}
        versions={versions}
        action={
          detail.latestVersion ? (
            installOptions.managed ? (
              <Badge variant="outline" className="h-9 px-3">
                Managed by your organization
              </Badge>
            ) : (
              <PluginInstallButton
                pluginName={detail.displayName}
                scopes={installOptions.available(detail.name)}
                installed={installedIn.length > 0}
                onInstall={setInstalling}
                size="default"
              />
            )
          ) : undefined
        }
        extraStat={
          <DetailStat label="Your installs">
            {installedIn.length === 0
              ? 'Not installed'
              : installedIn.map((scope) => (scope === 'org' ? 'For team' : 'For me')).join(', ')}
          </DetailStat>
        }
      />

      {installing && detail.latestVersion && (
        <InstallDialog
          pluginName={detail.displayName}
          version={detail.latestVersion}
          scope={installing}
          onClose={() => setInstalling(undefined)}
        />
      )}
    </Page>
  );
}
