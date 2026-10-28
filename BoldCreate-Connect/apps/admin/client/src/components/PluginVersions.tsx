import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import type { AdminVersionSummary } from '../lib/api';
import { formatBytes, formatDateTime, relativeTime } from '../lib/format';
import { VersionStatusBadge } from './StatusBadge';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Props {
  pluginId: string;
  versions: AdminVersionSummary[];
}

/** Every version, newest first. A row opens the version, where it is reviewed and managed. */
export function PluginVersions({ pluginId, versions }: Props) {
  const navigate = useNavigate();
  const open = (versionId: string) =>
    void navigate({
      to: '/plugins/$pluginId/versions/$versionId',
      params: { pluginId, versionId },
    });
  if (versions.length === 0) {
    return <p className="text-sm text-muted-foreground">This plugin has no versions yet.</p>;
  }
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead>Version</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Ingested</TableHead>
            <TableHead>Commit</TableHead>
            <TableHead className="text-right">Size</TableHead>
            <TableHead className="text-right">Installs</TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow
              key={version.id}
              className="cursor-pointer"
              onClick={(event) => {
                if (!(event.target as HTMLElement).closest('a')) open(version.id);
              }}
            >
              <TableCell className="font-medium">
                <Link
                  to="/plugins/$pluginId/versions/$versionId"
                  params={{ pluginId, versionId: version.id }}
                  className="font-mono hover:underline"
                >
                  v{version.version}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap items-center gap-1">
                  <VersionStatusBadge status={version.status} />
                  {version.executionBlockedAt && <Badge variant="destructive">Blocked</Badge>}
                  {version.findings > 0 && (
                    <Badge variant="destructive">
                      <ShieldAlert className="size-3.5" />
                      {version.findings} secret{version.findings === 1 ? '' : 's'}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <time dateTime={version.ingestedAt} title={formatDateTime(version.ingestedAt)}>
                  {relativeTime(version.ingestedAt)}
                </time>
              </TableCell>
              <TableCell>
                <code className="font-mono text-xs text-muted-foreground">
                  {version.commitSha ? version.commitSha.slice(0, 8) : '—'}
                </code>
              </TableCell>
              <TableCell className="text-right text-muted-foreground tabular-nums">
                {formatBytes(version.archiveSizeBytes)}
              </TableCell>
              <TableCell className="text-right tabular-nums">{version.installations}</TableCell>
              <TableCell>
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
