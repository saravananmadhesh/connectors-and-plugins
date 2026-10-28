import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { qk } from '@/lib/query-keys';
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
import { Section } from '@/components/Page';
import { QueryFrame, type TabProps } from './shared';

/** Activity per day for the last weeks, and the users who called the most. */
export function OverviewTab({ orgId, projectId }: TabProps) {
  const { can } = useAbilities(orgId);
  const usage = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'usage'),
    queryFn: () => projects.usage(orgId, projectId),
  });
  const data = usage.data;
  const total = (pick: 'toolCalls' | 'errors') =>
    (data?.days ?? []).reduce((sum, day) => sum + day[pick], 0);

  return (
    <QueryFrame
      label="usage"
      isPending={usage.isPending}
      error={usage.error}
      onRetry={() => void usage.refetch()}
    >
      <div className="space-y-6">
        {can('project-key:create') && (
          <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="text-sm font-medium">Connect your product</p>
              <p className="text-xs text-muted-foreground">
                Create a key for this project to call it from your backend.
              </p>
            </div>
            <Button asChild size="sm">
              <Link
                to="/orgs/$orgId/projects/$projectId"
                params={{ orgId, projectId }}
                search={{ tab: 'keys' }}
              >
                Create key
              </Link>
            </Button>
          </Card>
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Calls</p>
            <p className="text-2xl font-semibold tabular-nums">{total('toolCalls')}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Errors</p>
            <p className="text-2xl font-semibold tabular-nums">{total('errors')}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Top users</p>
            <p className="text-2xl font-semibold tabular-nums">{data?.topUsers.length ?? 0}</p>
          </Card>
        </div>
        <Section title="Per day">
          {(data?.days.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">No activity in this period yet.</p>
          ) : (
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Active users</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.days.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell>{day.activeUsers}</TableCell>
                      <TableCell>{day.toolCalls}</TableCell>
                      <TableCell>{day.errors}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </Section>
        <Section title="Top users">
          {(data?.topUsers.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">No users have made calls yet.</p>
          ) : (
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Calls</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.topUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.userId ?? user.id}</TableCell>
                      <TableCell>{user.toolCalls}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </Section>
      </div>
    </QueryFrame>
  );
}
