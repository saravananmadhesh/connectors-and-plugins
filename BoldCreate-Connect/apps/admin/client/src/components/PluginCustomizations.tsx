import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi, type AdminPluginDetailResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { versionKey } from '../lib/plugins';
import { CustomizationList } from './CustomizationList';
import { Alert } from './ui/alert';
import { Select } from './ui/input';
import { Skeleton } from './ui/skeleton';

/** The version the plugin shows: the published one, else the newest that was not rejected. */
function defaultVersion(plugin: AdminPluginDetailResponse): string | undefined {
  const versions = plugin.versions;
  return (
    versions.find((version) => version.version === plugin.publishedVersion) ??
    versions.find((version) => version.status !== 'rejected') ??
    versions[0]
  )?.id;
}

/** What the plugin contains, for one version at a time; the published one is shown first. */
export function PluginCustomizations({ plugin }: { plugin: AdminPluginDetailResponse }) {
  const [picked, setPicked] = useState<string | undefined>(undefined);
  const versionId = picked ?? defaultVersion(plugin);
  const version = useQuery({
    queryKey: versionKey(versionId ?? ''),
    queryFn: () => adminApi.getVersion(versionId as string),
    enabled: versionId !== undefined,
  });
  if (versionId === undefined) {
    return <p className="text-sm text-muted-foreground">This plugin has no versions yet.</p>;
  }
  const source = plugin.source;
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      {plugin.versions.length > 1 && (
        <label className="flex w-fit flex-col gap-1.5 text-sm font-medium">
          Version
          <Select value={versionId} onChange={(event) => setPicked(event.target.value)}>
            {plugin.versions.map((item) => (
              <option key={item.id} value={item.id}>
                v{item.version}
              </option>
            ))}
          </Select>
        </label>
      )}
      {version.isPending && <Skeleton className="h-24" aria-label="Loading customizations" />}
      {version.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(version.error)}
        </Alert>
      )}
      {version.data && (
        <CustomizationList
          scan={version.data.scan}
          repository={
            source
              ? { owner: source.owner, repository: source.repository, folder: source.path }
              : null
          }
          commitSha={version.data.commitSha}
        />
      )}
    </div>
  );
}
