import { useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ClickableRow } from '@/components/ClickableRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Boxes, Plus } from 'lucide-react';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { relativeTime } from '@/lib/format';
import { parseOrigins } from '@/lib/project-origins';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/EmptyState';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { ProjectStatusBadge } from '@/components/project/status';
import { CursorPager, QueryFrame } from '@/components/project/shared';
import { messageOf, useCursorPaging } from '@/components/project/paging';

function CreateProjectDialog({ orgId, onClose }: { orgId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const [name, setName] = useState('');
  const [origins, setOrigins] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      const returnOrigins = parseOrigins(origins);
      return projects.create(orgId, {
        name: name.trim(),
        ...(returnOrigins.length > 0 ? { returnOrigins } : {}),
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.projects(orgId) });
      onClose();
    },
    onError: (err) => setError(messageOf(err)),
  });

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Create a project</DialogTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            mutation.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="project-name">Name</Label>
            <Input
              id="project-name"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-origins">Return origins</Label>
            <Textarea
              id="project-origins"
              placeholder="https://app.example.com"
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              aria-describedby="project-origins-help"
            />
            <p id="project-origins-help" className="text-xs text-muted-foreground">
              Where users may be sent back to after connecting. One per line; optional.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={name.trim() === '' || mutation.isPending}>
              Create project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectsPage() {
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const navigate = useNavigate();
  const { can } = useAbilities(orgId);
  const paging = useCursorPaging();
  const [creating, setCreating] = useState(false);
  const list = useQuery({
    queryKey: [...qk.projects(orgId), { cursor: paging.cursor }],
    queryFn: () => projects.list(orgId, { cursor: paging.cursor }),
  });
  const items = list.data?.items ?? [];
  const canCreate = can('project:create');

  return (
    <Page>
      <PageHeader title="Projects" description="Each project connects one product of yours.">
        {canCreate && (
          <Button onClick={() => setCreating(true)}>
            <Plus aria-hidden="true" />
            Create project
          </Button>
        )}
      </PageHeader>
      <QueryFrame
        label="projects"
        isPending={list.isPending}
        error={list.error}
        onRetry={() => void list.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={Boxes}
            title="No projects yet"
            description="Create a project to mint keys, add plugins and see your users."
          >
            {canCreate && (
              <Button className="mt-2" onClick={() => setCreating(true)}>
                Create project
              </Button>
            )}
          </EmptyState>
        ) : (
          <div className="space-y-3">
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active keys</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((project) => (
                    <ClickableRow
                      key={project.id}
                      onActivate={() =>
                        void navigate({
                          to: '/orgs/$orgId/projects/$projectId',
                          params: { orgId, projectId: project.id },
                        })
                      }
                    >
                      <TableCell className="font-medium">
                        <Link
                          to="/orgs/$orgId/projects/$projectId"
                          params={{ orgId, projectId: project.id }}
                          className="hover:underline"
                        >
                          {project.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <ProjectStatusBadge status={project.status} />
                      </TableCell>
                      <TableCell>{project.activeKeyCount}</TableCell>
                      <TableCell>{relativeTime(project.createdAt)}</TableCell>
                    </ClickableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={list.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </div>
        )}
      </QueryFrame>
      {creating && <CreateProjectDialog orgId={orgId} onClose={() => setCreating(false)} />}
    </Page>
  );
}
