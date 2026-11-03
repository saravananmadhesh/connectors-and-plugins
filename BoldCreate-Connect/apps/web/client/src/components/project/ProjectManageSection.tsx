import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import type { ProjectResponse } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { parseOrigins } from '@/lib/project-origins';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeleteResourceDialog } from '@/components/delete-resource-dialog';
import { Section } from '@/components/Page';
import { messageOf } from './paging';

/** Renames the project; the addresses users return to are edited in the Settings tab. */
export function EditProjectDialog({
  orgId,
  project,
  onClose,
}: {
  orgId: string;
  project: ProjectResponse;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [name, setName] = useState(project.name);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => projects.update(orgId, project.id, { name: name.trim() }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.project(orgId, project.id) });
      void qc.invalidateQueries({ queryKey: qk.projects(orgId) });
      onClose();
    },
    onError: (err) => setError(messageOf(err)),
  });

  const changed = name.trim() !== project.name;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Edit project</DialogTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError('');
            mutation.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="edit-project-name">Name</Label>
            <Input
              id="edit-project-name"
              value={name}
              maxLength={60}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={name.trim() === '' || !changed || mutation.isPending}>
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** Opens the edit dialog; nothing shows to someone who may not update the project. */
export function EditProjectButton({ orgId, project }: { orgId: string; project: ProjectResponse }) {
  const { can } = useAbilities(orgId);
  const [editing, setEditing] = useState(false);
  if (!can('project:update')) return null;
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
        Edit project
      </Button>
      {editing && (
        <EditProjectDialog orgId={orgId} project={project} onClose={() => setEditing(false)} />
      )}
    </>
  );
}

/** The project's name, with the way to change it. */
export function ProjectGeneralSection({ orgId, projectId }: { orgId: string; projectId: string }) {
  const project = useQuery({
    queryKey: qk.project(orgId, projectId),
    queryFn: () => projects.get(orgId, projectId),
  });
  return (
    <Section title="General" description="The name your team sees for this project.">
      <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Project name</p>
          <p className="truncate text-sm font-medium">{project.data?.name ?? '…'}</p>
        </div>
        {project.data && <EditProjectButton orgId={orgId} project={project.data} />}
      </Card>
    </Section>
  );
}

/** Deleting the project, behind a typed confirmation; nothing shows without the ability. */
export function ProjectDangerZone({ orgId, projectId }: { orgId: string; projectId: string }) {
  const { can } = useAbilities(orgId);
  const projectQuery = useQuery({
    queryKey: qk.project(orgId, projectId),
    queryFn: () => projects.get(orgId, projectId),
  });
  const project = projectQuery.data;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [deleting, setDeleting] = useState(false);
  if (!can('project:delete') || !project) return null;
  return (
    <>
      <Section title="Danger zone">
        <Alert variant="destructive" role="group" className="space-y-3 bg-transparent">
          <p className="text-sm">
            Permanently delete this project with its users, keys, plugins and connections. Its keys
            stop working immediately. External connection tokens are not revoked. This cannot be
            undone.
          </p>
          <Button variant="destructive" onClick={() => setDeleting(true)}>
            Delete project
          </Button>
        </Alert>
      </Section>
      {deleting && (
        <DeleteResourceDialog
          kind="project"
          name={project.name}
          slug={project.name}
          onDelete={() => projects.delete(orgId, project.id)}
          onDeleted={async () => {
            await qc.cancelQueries({ queryKey: qk.project(orgId, project.id) });
            qc.removeQueries({ queryKey: qk.project(orgId, project.id) });
            await qc.invalidateQueries({ queryKey: qk.projects(orgId) });
            await navigate({ to: '/orgs/$orgId/projects', params: { orgId }, replace: true });
          }}
          onClose={() => setDeleting(false)}
        />
      )}
    </>
  );
}

/**
 * The addresses users may be sent back to after connecting a service. Without one, a host cannot
 * start a connection for its users, so this sits in Settings with its purpose spelled out.
 */
export function ReturnAddressesSection({ orgId, projectId }: { orgId: string; projectId: string }) {
  const { can } = useAbilities(orgId);
  const qc = useQueryClient();
  const project = useQuery({
    queryKey: qk.project(orgId, projectId),
    queryFn: () => projects.get(orgId, projectId),
  });
  const saved = project.data?.returnOrigins ?? [];
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState('');
  const value = text ?? saved.join('\n');
  const canEdit = can('project:update');

  const mutation = useMutation({
    mutationFn: () => projects.update(orgId, projectId, { returnOrigins: parseOrigins(value) }),
    onSuccess: () => {
      setText(null);
      void qc.invalidateQueries({ queryKey: qk.project(orgId, projectId) });
      void qc.invalidateQueries({ queryKey: qk.projects(orgId) });
    },
    onError: (err) => setError(messageOf(err)),
  });
  const changed = parseOrigins(value).join('\n') !== saved.join('\n');

  return (
    <Section
      title="Return addresses"
      description="Where your users may be sent back to after they connect a service. A connection can only return to an address listed here."
    >
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setError('');
          mutation.mutate();
        }}
      >
        {error && <Alert variant="destructive">{error}</Alert>}
        <Label htmlFor="return-addresses">Addresses</Label>
        <Textarea
          id="return-addresses"
          placeholder="https://app.example.com"
          value={value}
          disabled={!canEdit || project.isPending}
          onChange={(event) => setText(event.target.value)}
          aria-describedby="return-addresses-help"
          className="font-mono text-xs"
        />
        <p id="return-addresses-help" className="text-xs text-muted-foreground">
          One per line, the website only (for example https://app.example.com). Removing an address
          stops sign-ins that return there.
        </p>
        {canEdit && (
          <Button type="submit" disabled={!changed || mutation.isPending}>
            Save addresses
          </Button>
        )}
      </form>
    </Section>
  );
}
