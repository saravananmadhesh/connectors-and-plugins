import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KeyRound, Plus } from 'lucide-react';
import { PROJECT_SCOPES, PROJECT_SCOPE_INFO, PROJECT_SCOPE_PRESET } from '@/lib/project-scopes';
import { projects } from '@/lib/api';
import type { ProjectKeyResponse, ProjectKeyScope } from '@/lib/api';
import { formatDateTime, relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
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
import { RawKeyDialog } from '@/components/RawKeyDialog';
import { cn } from '@/lib/cn';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

const LIFETIMES = [30, 90, 180] as const;
const DAY_MS = 86_400_000;

function CreateKeyDialog({
  orgId,
  projectId,
  onCreated,
  onClose,
}: {
  orgId: string;
  projectId: string;
  onCreated: (rawKey: string) => void;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [scopes, setScopes] = useState<ProjectKeyScope[]>([...PROJECT_SCOPE_PRESET]);
  const [days, setDays] = useState<number>(90);
  const [cidrs, setCidrs] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      const allowedCidrs = cidrs
        .split(/[\s,]+/)
        .map((entry) => entry.trim())
        .filter(Boolean);
      return projects.createKey(orgId, projectId, {
        scopes,
        expiresAt: new Date(Date.now() + days * DAY_MS).toISOString(),
        ...(allowedCidrs.length > 0 ? { allowedCidrs } : {}),
      });
    },
    onSuccess: (key) => {
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'keys') });
      void qc.invalidateQueries({ queryKey: qk.projects(orgId) });
      onCreated(key.rawKey);
    },
    onError: (err) => setError(messageOf(err)),
  });

  const toggle = (scope: ProjectKeyScope) =>
    setScopes((previous) =>
      previous.includes(scope) ? previous.filter((item) => item !== scope) : [...previous, scope],
    );

  return (
    <Dialog open onOpenChange={(open) => !open && !mutation.isPending && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogTitle>Create key</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose what the key may do. Keep it on your own server; you can revoke it at any time.
        </p>
        <form
          className="mt-4 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            mutation.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setScopes([...PROJECT_SCOPE_PRESET])}
            >
              For a host’s server
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setScopes([])}>
              Clear
            </Button>
          </div>
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">Permissions</legend>
            {PROJECT_SCOPES.map((scope) => {
              const info = PROJECT_SCOPE_INFO[scope];
              return (
                <label
                  key={scope}
                  className={cn(
                    'flex cursor-pointer items-start gap-2.5 rounded-md border p-2.5',
                    info.destructive && 'border-warning-border',
                  )}
                >
                  <Checkbox
                    className="mt-0.5"
                    checked={scopes.includes(scope)}
                    onChange={() => toggle(scope)}
                  />
                  <span className="min-w-0 text-sm">
                    <span className="flex flex-wrap items-center gap-2 font-medium">
                      {info.label}
                      {info.destructive && <Badge variant="warning">Changes data</Badge>}
                    </span>
                    <span className="block text-xs text-muted-foreground">{info.description}</span>
                  </span>
                </label>
              );
            })}
          </fieldset>
          <div className="space-y-1.5">
            <Label>Lasts</Label>
            <div className="flex gap-2" role="group" aria-label="Key lifetime">
              {LIFETIMES.map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={days === option ? 'default' : 'outline'}
                  aria-pressed={days === option}
                  onClick={() => setDays(option)}
                >
                  {option} days
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-key-cidrs">Allowed addresses (optional)</Label>
            <Textarea
              id="project-key-cidrs"
              value={cidrs}
              onChange={(e) => setCidrs(e.target.value)}
              placeholder="203.0.113.0/24"
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              One range per line. Leave empty to allow the key from any address.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || scopes.length === 0}>
              {mutation.isPending && <Spinner />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const keyState = (key: ProjectKeyResponse, now: number): 'revoked' | 'expired' | 'active' => {
  if (key.revokedAt) return 'revoked';
  return new Date(key.expiresAt).getTime() <= now ? 'expired' : 'active';
};

/** The keys a project's server uses: create, rotate, revoke. A key is shown once, when made. */
export function KeysTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [creating, setCreating] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [rotating, setRotating] = useState<ProjectKeyResponse | null>(null);
  const [revoking, setRevoking] = useState<ProjectKeyResponse | null>(null);
  const [error, setError] = useState('');
  // A snapshot taken once: whether a key has expired is a coarse check, not a live clock.
  const [now] = useState(() => Date.now());
  const keys = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'keys', { cursor: paging.cursor }),
    queryFn: () => projects.keys(orgId, projectId, { cursor: paging.cursor }),
  });
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'keys') });
    void qc.invalidateQueries({ queryKey: qk.projects(orgId) });
  };
  const rotate = useMutation({
    mutationFn: (id: string) => projects.rotateKey(orgId, projectId, id),
    onSuccess: (key) => {
      setRotating(null);
      setRawKey(key.rawKey);
      refresh();
    },
    onError: (err) => {
      setRotating(null);
      setError(messageOf(err));
    },
  });
  const revoke = useMutation({
    mutationFn: (id: string) => projects.revokeKey(orgId, projectId, id),
    onSuccess: () => {
      setRevoking(null);
      refresh();
    },
    onError: (err) => {
      setRevoking(null);
      setError(messageOf(err));
    },
  });
  const items = keys.data?.items ?? [];

  return (
    <div className="space-y-3">
      {canWrite && (
        <div className="flex justify-end">
          <Button onClick={() => setCreating(true)}>
            <Plus aria-hidden="true" />
            Create key
          </Button>
        </div>
      )}
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="keys"
        isPending={keys.isPending}
        error={keys.error}
        onRetry={() => void keys.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={KeyRound}
            title="No keys yet"
            description="Create a key for your server to call BoldConnect for this project."
          />
        ) : (
          <>
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Last used</TableHead>
                    <TableHead className="w-0" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((key) => {
                    const state = keyState(key, now);
                    return (
                      <TableRow key={key.id}>
                        <TableCell className="font-mono text-xs">
                          {key.prefix}…{key.lastFour}
                        </TableCell>
                        <TableCell className="max-w-xs text-xs text-muted-foreground">
                          {key.scopes.join(', ')}
                          {key.allowedCidrs && ` · from ${key.allowedCidrs.join(', ')}`}
                        </TableCell>
                        <TableCell>
                          <Badge variant={state === 'active' ? 'secondary' : 'outline'}>
                            {state}
                          </Badge>
                        </TableCell>
                        <TableCell title={formatDateTime(key.expiresAt)}>
                          {relativeTime(key.expiresAt)}
                        </TableCell>
                        <TableCell>
                          {key.lastUsedAt ? relativeTime(key.lastUsedAt) : 'Never'}
                        </TableCell>
                        <TableCell>
                          {canWrite && state === 'active' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                aria-label={`Rotate key ${key.lastFour}`}
                                onClick={() => setRotating(key)}
                              >
                                Rotate
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                aria-label={`Revoke key ${key.lastFour}`}
                                onClick={() => setRevoking(key)}
                              >
                                Revoke
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={keys.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </>
        )}
      </QueryFrame>
      {creating && (
        <CreateKeyDialog
          orgId={orgId}
          projectId={projectId}
          onCreated={(raw) => {
            setCreating(false);
            setRawKey(raw);
          }}
          onClose={() => setCreating(false)}
        />
      )}
      {rawKey && <RawKeyDialog rawKey={rawKey} onDone={() => setRawKey(null)} />}
      {rotating && (
        <ConfirmDialog
          open
          title="Rotate this key?"
          description="A new key with the same permissions is made. Revoke the old one once your server uses the new one."
          confirmLabel="Rotate"
          destructive={false}
          pending={rotate.isPending}
          onConfirm={() => rotate.mutate(rotating.id)}
          onClose={() => setRotating(null)}
        />
      )}
      {revoking && (
        <ConfirmDialog
          open
          title="Revoke this key?"
          description="Servers that use this key lose access immediately. This cannot be undone."
          confirmLabel="Revoke"
          pending={revoke.isPending}
          onConfirm={() => revoke.mutate(revoking.id)}
          onClose={() => setRevoking(null)}
        />
      )}
    </div>
  );
}
