import { useState } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { Blocks } from 'lucide-react';
import {
  installations,
  ApiError,
  type ComponentKind,
  type ComponentResponse,
  type InstallationResponse,
  type ScopeKey,
} from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { PluginTile } from '@/components/PluginTile';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/EmptyState';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  kind: ComponentKind;
  kindLabel: string;
  items: readonly InstallationResponse[];
  canUpdate: boolean;
}

interface Row {
  installation: InstallationResponse;
  component: ComponentResponse;
}

/** Every component of one kind across the installed plugins, each with its own switch. */
export function InstalledComponents({ orgId, scopeKey, kind, kindLabel, items, canUpdate }: Props) {
  const qc = useQueryClient();
  const [error, setError] = useState('');

  const lists = useQueries({
    queries: items.map((item) => ({
      queryKey: qk.components(scopeKey, item.id),
      queryFn: () => installations.listComponents(orgId, scopeKey, item.id),
    })),
  });

  const toggle = useMutation({
    mutationFn: ({ installation, component }: Row) =>
      installations.updateComponent(orgId, scopeKey, installation.id, component.componentId, {
        enabled: !component.enabled,
      }),
    onSuccess: (_data, { installation }) => {
      setError('');
      return qc.invalidateQueries({ queryKey: qk.components(scopeKey, installation.id) });
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : 'Failed'),
  });

  if (lists.some((list) => list.isPending)) {
    return <Skeleton className="h-32 w-full" role="status" aria-label={`Loading ${kindLabel}`} />;
  }

  const rows: Row[] = items.flatMap((installation, index) =>
    (lists[index]?.data?.items ?? [])
      .filter((component) => component.kind === kind)
      .map((component) => ({ installation, component })),
  );
  const failed = lists.some((list) => list.isError);

  if (rows.length === 0) {
    return (
      <div className="space-y-3">
        {failed && <Alert variant="destructive">Some components could not be loaded.</Alert>}
        <EmptyState
          icon={Blocks}
          title={`No ${kindLabel.toLowerCase()} installed`}
          description={`None of the installed plugins ships ${kindLabel.toLowerCase()}.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && <Alert variant="destructive">{error}</Alert>}
      {failed && <Alert variant="destructive">Some components could not be loaded.</Alert>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Plugin</TableHead>
              <TableHead className="w-24 text-right">Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={`${row.installation.id}-${row.component.componentId}`}>
                <TableCell className="font-mono text-xs">
                  {row.component.name}
                  {row.component.inactiveReason === 'variables_missing' && (
                    <Badge variant="outline" className="ml-2 font-sans">
                      Needs variables
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PluginTile
                      className="size-6 rounded-md"
                      src={row.installation.pluginLogoUrl}
                    />
                    <span>{row.installation.pluginName}</span>
                    <span className="font-mono text-xs">v{row.installation.pluginVersion}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Switch
                    aria-label={`${row.component.name} enabled`}
                    checked={row.component.enabled}
                    disabled={!canUpdate || toggle.isPending}
                    onCheckedChange={() => toggle.mutate(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
