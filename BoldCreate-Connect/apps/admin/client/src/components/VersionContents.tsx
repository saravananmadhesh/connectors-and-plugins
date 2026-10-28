import { useQuery } from '@tanstack/react-query';
import { adminApi, type AdminVersionDetailResponse } from '../lib/api';
import { pluginKey } from '../lib/plugins';
import { CustomizationList } from './CustomizationList';

/** The customizations a version carries, grouped by type, each linking to its file on GitHub. */
export function VersionContents({ version }: { version: AdminVersionDetailResponse }) {
  const plugin = useQuery({
    queryKey: pluginKey(version.pluginId),
    queryFn: () => adminApi.getPlugin(version.pluginId),
  });
  const source = plugin.data?.source;
  return (
    <CustomizationList
      scan={version.scan}
      repository={
        source ? { owner: source.owner, repository: source.repository, folder: source.path } : null
      }
      commitSha={version.commitSha}
    />
  );
}
