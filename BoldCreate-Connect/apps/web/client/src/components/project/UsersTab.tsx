import { useEffect, useState } from 'react';
import { UserAvatar } from '@/components/UserAvatar';
import { ClickableRow } from '@/components/ClickableRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, Users } from 'lucide-react';
import { projects } from '@/lib/api';
import type { ConnectionResponse, ProjectUserResponse, SessionResponse } from '@/lib/api';
import { formatDateTime, relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
import { InfoHint } from '@/components/InfoHint';
import { Section } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { LogsTab } from './LogsTab';
import { CursorPager, QueryFrame, RefreshButton, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

const when = (iso: string | null) => (iso ? relativeTime(iso) : 'Never');

/** A short list that belongs to the drawer: a heading, rows, or a line saying there are none. */
function DrawerList({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode[];
}) {
  return (
    <Section title={title}>
      {children.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="divide-y rounded-md border">{children}</ul>
      )}
    </Section>
  );
}

function UserDrawer({
  orgId,
  projectId,
  user,
  canWrite,
  onClose,
}: TabProps & { user: ProjectUserResponse; onClose: () => void }) {
  const qc = useQueryClient();
  const [error, setError] = useState('');
  const owner = { userId: user.userId };
  const connections = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'connections', owner),
    queryFn: () => projects.connections(orgId, projectId, owner),
  });
  const sessions = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'sessions', owner),
    queryFn: () => projects.sessions(orgId, projectId, owner),
  });
  const plugins = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'user-plugins', { id: user.id }),
    queryFn: () => projects.userPlugins(orgId, projectId, user.id),
  });
  const refresh = (part: string) =>
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, part) });
  const fail = (err: unknown) => setError(messageOf(err));

  const disconnect = useMutation({
    mutationFn: (connection: ConnectionResponse) =>
      projects.disconnect(orgId, projectId, connection.id),
    onSuccess: () => {
      refresh('connections');
      refresh('users');
    },
    onError: fail,
  });
  const revoke = useMutation({
    mutationFn: (session: SessionResponse) => projects.revokeSession(orgId, projectId, session.id),
    onSuccess: () => {
      refresh('sessions');
      refresh('users');
    },
    onError: fail,
  });
  const removePlugin = useMutation({
    mutationFn: (pluginId: string) =>
      projects.removeUserPlugin(orgId, projectId, pluginId, user.userId),
    onSuccess: () => {
      refresh('user-plugins');
      refresh('users');
    },
    onError: fail,
  });

  const installs = (plugins.data?.items ?? []).filter((plugin) => plugin.removable);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>{user.displayName || user.userId}</DialogTitle>
        <p className="text-xs text-muted-foreground">
          {user.userId} · {user.status} · last seen {when(user.lastSeenAt)}
        </p>
        <div className="mt-4 space-y-6">
          {error && <Alert variant="destructive">{error}</Alert>}
          <DrawerList title="Connections" empty="No connections.">
            {(connections.data?.items ?? []).map((connection) => (
              <li
                key={connection.id}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
              >
                <span>
                  {connection.serverName}{' '}
                  <Badge variant={connection.status === 'active' ? 'secondary' : 'warning'}>
                    {connection.status}
                  </Badge>
                </span>
                {canWrite && (
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label={`Disconnect ${connection.serverName}`}
                    onClick={() => disconnect.mutate(connection)}
                  >
                    Disconnect
                  </Button>
                )}
              </li>
            ))}
          </DrawerList>
          <DrawerList title="Sessions" empty="No sessions.">
            {(sessions.data?.items ?? []).map((session) => (
              <li
                key={session.id}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
              >
                <span>
                  {session.status} · expires {relativeTime(session.expiresAt)}
                </span>
                {canWrite && session.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="Revoke this session"
                    onClick={() => revoke.mutate(session)}
                  >
                    Revoke
                  </Button>
                )}
              </li>
            ))}
          </DrawerList>
          <DrawerList title="Plugins" empty="No plugins.">
            {(plugins.data?.items ?? []).map((plugin) => (
              <li key={plugin.pluginId} className="px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{plugin.displayName}</span>
                  <Badge variant="outline">{plugin.version}</Badge>
                  <Badge variant="outline">{plugin.source}</Badge>
                  {plugin.updateAvailable && <Badge variant="info">Update available</Badge>}
                </div>
                {plugin.variables.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plugin.variables
                      .map((variable) => `${variable.name}: ${variable.isSet ? 'set' : 'not set'}`)
                      .join(' · ')}
                  </p>
                )}
                {plugin.mcp.some((server) => !server.ready) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Needs setup:{' '}
                    {plugin.mcp
                      .filter((server) => !server.ready)
                      .map((server) => server.serverName)
                      .join(', ')}
                  </p>
                )}
              </li>
            ))}
          </DrawerList>
          <DrawerList title="Installed by the user" empty="The user has installed nothing.">
            {installs.map((plugin) => (
              <li
                key={plugin.pluginId}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
              >
                <span>{plugin.displayName}</span>
                {canWrite && (
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label={`Remove ${plugin.displayName} for this user`}
                    onClick={() => removePlugin.mutate(plugin.pluginId)}
                  >
                    Remove
                  </Button>
                )}
              </li>
            ))}
          </DrawerList>
          <Section title="Recent activity">
            <LogsTab orgId={orgId} projectId={projectId} canWrite={canWrite} userId={user.userId} />
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** The users the host has made known to the project, with search, a detail drawer and delete. */
export function UsersTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [typed, setTyped] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<ProjectUserResponse | null>(null);
  const [deleting, setDeleting] = useState<ProjectUserResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typed === search) return;
    const timer = setTimeout(() => {
      setSearch(typed);
      paging.reset();
    }, 250);
    return () => clearTimeout(timer);
    // `paging.reset` changes every render; the search text is what the effect follows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, search]);

  const params = { cursor: paging.cursor, search: search || undefined };
  const users = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'users', params),
    queryFn: () => projects.users(orgId, projectId, params),
  });
  const remove = useMutation({
    mutationFn: (user: ProjectUserResponse) => projects.deleteUser(orgId, projectId, user.id),
    onSuccess: () => {
      setDeleting(null);
      setOpen(null);
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'users') });
    },
    onError: (err) => {
      setDeleting(null);
      setError(messageOf(err));
    },
  });
  const items = users.data?.items ?? [];

  return (
    <div className="space-y-3">
      <PageHeader
        title="Users"
        description="The people of your product who have used this project. A user appears once your server opens a session for them."
      >
        <RefreshButton orgId={orgId} projectId={projectId} />
      </PageHeader>
      <div className="relative w-full sm:w-72">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by user id…"
          aria-label="Search users"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
        />
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="users"
        isPending={users.isPending}
        error={users.error}
        onRetry={() => void users.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={Users}
            title={search ? 'No matching users' : 'No users yet'}
            description={
              search
                ? 'Try the start of another user id.'
                : 'Users appear when your server opens a session for them.'
            }
          />
        ) : (
          <>
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last seen</TableHead>
                    <TableHead>
                      <span className="inline-flex items-center gap-1">
                        Last synced
                        <InfoHint about="last synced">
                          When the user’s agent last applied the project’s plugins.
                        </InfoHint>
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="inline-flex items-center gap-1">
                        Missing
                        <InfoHint about="missing">
                          Connections the user still has to make for their plugins.
                        </InfoHint>
                      </span>
                    </TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Connections</TableHead>
                    <TableHead className="w-0" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((user) => (
                    <ClickableRow key={user.id} onActivate={() => setOpen(user)}>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <UserAvatar
                            name={user.displayName || user.userId}
                            colorKey={user.userId}
                            className="size-7"
                          />
                          <span>
                            <button
                              type="button"
                              className="text-left font-medium hover:underline"
                              onClick={() => setOpen(user)}
                            >
                              {user.userId}
                            </button>
                            {user.displayName && (
                              <span className="block text-xs text-muted-foreground">
                                {user.displayName}
                              </span>
                            )}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell title={user.lastSeenAt ? formatDateTime(user.lastSeenAt) : ''}>
                        {when(user.lastSeenAt)}
                      </TableCell>
                      <TableCell>{when(user.lastSyncedAt)}</TableCell>
                      <TableCell>{user.connectionsMissing}</TableCell>
                      <TableCell>{user.sessionCount}</TableCell>
                      <TableCell>{user.connectionCount}</TableCell>
                      <TableCell>
                        {canWrite && (
                          <Button
                            size="sm"
                            variant="outline"
                            aria-label={`Delete ${user.userId}`}
                            onClick={() => setDeleting(user)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </ClickableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={users.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </>
        )}
      </QueryFrame>
      {open && (
        <UserDrawer
          orgId={orgId}
          projectId={projectId}
          canWrite={canWrite}
          user={open}
          onClose={() => setOpen(null)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          open
          title={`Delete ${deleting.userId}?`}
          description="The user, their sessions, connections and installs are deleted. This cannot be undone."
          confirmLabel="Delete user"
          pending={remove.isPending}
          onConfirm={() => remove.mutate(deleting)}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
