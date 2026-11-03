import { ClickableRow } from '@/components/ClickableRow';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Server } from 'lucide-react';
import {
  mcpServers,
  type InstallationResponse,
  type McpServerResponse,
  type ScopeKey,
} from '@/lib/api';
import { AUTH_OPTIONS, connectionLabel, healthLabel, healthVariant } from '@/lib/mcp-auth';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { InfoHint } from '@/components/InfoHint';
import { PluginTile } from '@/components/PluginTile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/EmptyState';
import { McpServerDialog } from '@/components/McpServerDialog';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  items: readonly InstallationResponse[];
  /** May change the settings of the servers of this scope. */
  canUpdate: boolean;
}

interface Row {
  installation: InstallationResponse;
  server: McpServerResponse;
}

const authLabel = (server: McpServerResponse): string =>
  AUTH_OPTIONS.find((entry) => entry.value === server.authType)?.label ?? server.authType;

/** The MCP servers of the installed plugins; each row opens its details. */
export function InstalledMcpServers({ orgId, scopeKey, items, canUpdate }: Props) {
  const [open, setOpen] = useState<{ installationId: string; componentId: string } | null>(null);

  const lists = useQueries({
    queries: items.map((item) => ({
      queryKey: qk.mcpServers(scopeKey, item.id),
      queryFn: () => mcpServers.list(orgId, scopeKey, item.id),
    })),
  });

  if (lists.some((list) => list.isPending)) {
    return <Skeleton className="h-32 w-full" role="status" aria-label="Loading MCP servers" />;
  }

  const rows: Row[] = items.flatMap((installation, index) =>
    (lists[index]?.data?.items ?? []).map((server) => ({ installation, server })),
  );
  const failed = lists.some((list) => list.isError);
  const selected = open
    ? rows.find(
        (row) =>
          row.installation.id === open.installationId &&
          row.server.componentId === open.componentId,
      )
    : undefined;

  if (rows.length === 0) {
    return (
      <div className="space-y-3">
        {failed && <Alert variant="destructive">Some MCP servers could not be loaded.</Alert>}
        <EmptyState
          icon={Server}
          title="No MCP servers installed"
          description="None of the installed plugins includes an MCP server, a connection that gives agents extra tools."
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {failed && <Alert variant="destructive">Some MCP servers could not be loaded.</Alert>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Plugin</TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-1">
                  Authentication
                  <InfoHint about="authentication">
                    How people get access: no credentials, one API key shared by everyone, or each
                    member signs in with OAuth.
                  </InfoHint>
                </span>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ installation, server }) => (
              <ClickableRow
                key={`${installation.id}-${server.componentId}`}
                onActivate={() =>
                  setOpen({ installationId: installation.id, componentId: server.componentId })
                }
              >
                <TableCell className="font-mono text-xs">{server.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PluginTile className="size-6 rounded-md" src={installation.pluginLogoUrl} />
                    <span>{installation.pluginName}</span>
                    <span className="font-mono text-xs">v{installation.pluginVersion}</span>
                  </div>
                </TableCell>
                <TableCell>{authLabel(server)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant={healthVariant(server.health)}>
                      {healthLabel(server.health)}
                    </Badge>
                    {server.connection !== 'not_required' && server.connection !== 'connected' && (
                      <Badge variant="warning">{connectionLabel(server.connection)}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Details of ${server.name}`}
                    onClick={() =>
                      setOpen({
                        installationId: installation.id,
                        componentId: server.componentId,
                      })
                    }
                  >
                    Details
                  </Button>
                </TableCell>
              </ClickableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selected && (
        <McpServerDialog
          orgId={orgId}
          scopeKey={scopeKey}
          installation={selected.installation}
          componentId={selected.server.componentId}
          canUpdate={canUpdate}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
