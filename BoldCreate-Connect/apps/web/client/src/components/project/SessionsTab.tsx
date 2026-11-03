import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KeyRound } from 'lucide-react';
import { projects } from '@/lib/api';
import type { SessionResponse } from '@/lib/api';
import { formatDateTime, relativeTime } from '@/lib/format';
import { policySummary } from '@/lib/session-policy';
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
import { PageHeader } from '@/components/PageHeader';
import { InfoHint } from '@/components/InfoHint';
import { CursorPager, QueryFrame, RefreshButton, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

/** The sessions of a project, newest first, with a way to end one. */
export function SessionsTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [revoking, setRevoking] = useState<SessionResponse | null>(null);
  const [error, setError] = useState('');
  const sessions = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'sessions', { cursor: paging.cursor }),
    queryFn: () => projects.sessions(orgId, projectId, { cursor: paging.cursor }),
  });
  const revoke = useMutation({
    mutationFn: (id: string) => projects.revokeSession(orgId, projectId, id),
    onSuccess: () => {
      setRevoking(null);
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'sessions') });
    },
    onError: (err) => {
      setRevoking(null);
      setError(messageOf(err));
    },
  });
  const items = sessions.data?.items ?? [];

  return (
    <div className="space-y-3">
      <PageHeader
        title="Sessions"
        description="Temporary access your server opens for one user. Revoke a session to end that access."
      >
        <RefreshButton orgId={orgId} projectId={projectId} />
      </PageHeader>
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="sessions"
        isPending={sessions.isPending}
        error={sessions.error}
        onRetry={() => void sessions.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={KeyRound}
            title="No sessions"
            description="Sessions appear when your server opens one for a user of your product."
          />
        ) : (
          <>
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>
                      <span className="inline-flex items-center gap-1">
                        Plugins
                        <InfoHint about="plugins">Which plugins this session can use.</InfoHint>
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="inline-flex items-center gap-1">
                        Tools
                        <InfoHint about="tools">
                          Which tools of those plugins the session may call.
                        </InfoHint>
                      </span>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="w-0" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.userId}</TableCell>
                      <TableCell>
                        {session.plugins.length === 0 ? 'All plugins' : session.plugins.length}
                      </TableCell>
                      <TableCell>{policySummary(session)}</TableCell>
                      <TableCell>
                        <Badge variant={session.status === 'active' ? 'secondary' : 'outline'}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell title={formatDateTime(session.expiresAt)}>
                        {session.status === 'revoked' ? '—' : relativeTime(session.expiresAt)}
                      </TableCell>
                      <TableCell>
                        {canWrite && session.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            aria-label={`Revoke session of ${session.userId}`}
                            onClick={() => setRevoking(session)}
                          >
                            Revoke
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
              nextCursor={sessions.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </>
        )}
      </QueryFrame>
      {revoking && (
        <ConfirmDialog
          open
          title="Revoke this session?"
          description={`The token of ${revoking.userId} stops working right away.`}
          confirmLabel="Revoke"
          pending={revoke.isPending}
          onConfirm={() => revoke.mutate(revoking.id)}
          onClose={() => setRevoking(null)}
        />
      )}
    </div>
  );
}
