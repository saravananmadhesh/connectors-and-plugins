import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plug } from 'lucide-react';
import { projects } from '@/lib/api';
import type { ConnectionResponse } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

/** Every sign-in the users of the project made, grouped by user. No token is ever shown. */
export function ConnectionsTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [removing, setRemoving] = useState<ConnectionResponse | null>(null);
  const [error, setError] = useState('');
  const connections = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'connections', { cursor: paging.cursor }),
    queryFn: () => projects.connections(orgId, projectId, { cursor: paging.cursor }),
  });
  const disconnect = useMutation({
    mutationFn: (connection: ConnectionResponse) =>
      projects.disconnect(orgId, projectId, connection.id),
    onSuccess: () => {
      setRemoving(null);
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'connections') });
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'users') });
    },
    onError: (err) => {
      setRemoving(null);
      setError(messageOf(err));
    },
  });
  const items = [...(connections.data?.items ?? [])].sort((a, b) =>
    a.userId.localeCompare(b.userId),
  );

  return (
    <div className="space-y-3">
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="connections"
        isPending={connections.isPending}
        error={connections.error}
        onRetry={() => void connections.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={Plug}
            title="No connections yet"
            description="A connection appears when a user signs in to an MCP server or sets their own values."
          />
        ) : (
          <>
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Server</TableHead>
                    <TableHead>Kind</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Connected</TableHead>
                    <TableHead className="w-0" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((connection) => (
                    <TableRow key={connection.id}>
                      <TableCell className="font-mono text-xs">{connection.userId}</TableCell>
                      <TableCell>{connection.serverName}</TableCell>
                      <TableCell>{connection.kind}</TableCell>
                      <TableCell>
                        <Badge variant={connection.status === 'active' ? 'secondary' : 'warning'}>
                          {connection.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{relativeTime(connection.createdAt)}</TableCell>
                      <TableCell>
                        {canWrite && (
                          <Button
                            size="sm"
                            variant="outline"
                            aria-label={`Disconnect ${connection.userId} from ${connection.serverName}`}
                            onClick={() => setRemoving(connection)}
                          >
                            Disconnect
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={connections.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </>
        )}
      </QueryFrame>
      {removing && (
        <ConfirmDialog
          open
          title={`Disconnect ${removing.userId} from ${removing.serverName}?`}
          description="The user has to sign in again to use this server."
          confirmLabel="Disconnect"
          pending={disconnect.isPending}
          onConfirm={() => disconnect.mutate(removing)}
          onClose={() => setRemoving(null)}
        />
      )}
    </div>
  );
}
