import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, installations, type ScopeKey } from '@/lib/api';
import { CUSTOM_VARIABLE_NAME_PATTERN, MAX_CUSTOM_VARIABLES } from '@/lib/custom-variables';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  installationId: string;
  pluginName: string;
  canWrite: boolean;
  onClose: () => void;
}

/**
 * The variables a plugin declares, plus up to ten of the installer's own. A stored value is never
 * shown: a set variable reads "set", a blank field keeps it, a typed value replaces it, and the
 * remove box deletes it.
 */
export function VariablesDialog({
  orgId,
  scopeKey,
  installationId,
  pluginName,
  canWrite,
  onClose,
}: Props) {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: qk.variables(scopeKey, installationId),
    queryFn: () => installations.listVariables(orgId, scopeKey, installationId),
  });
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [removed, setRemoved] = useState<ReadonlySet<string>>(new Set());
  const [drafts, setDrafts] = useState<{ name: string; value: string }[]>([]);
  const [error, setError] = useState('');

  const items = query.data?.items ?? [];
  const declared = items.filter((variable) => !variable.custom);
  const stored = items.filter((variable) => variable.custom);
  const takenNames = new Set(items.map((variable) => variable.name));
  const kept = stored.filter((variable) => !removed.has(variable.name)).length;
  const room = MAX_CUSTOM_VARIABLES - kept - drafts.length;

  const draftError = (draft: { name: string; value: string }, index: number): string => {
    if (draft.name === '') return '';
    if (!CUSTOM_VARIABLE_NAME_PATTERN.test(draft.name)) return 'Use letters, digits, _ and -';
    if (takenNames.has(draft.name)) return 'This name already exists';
    if (drafts.some((other, i) => i < index && other.name === draft.name)) return 'Used twice';
    return '';
  };
  const draftsValid = drafts.every((draft, index) => draftError(draft, index) === '');

  const values = (): Record<string, string | null> => {
    const body: Record<string, string | null> = {};
    for (const name of removed) body[name] = null;
    for (const [name, value] of Object.entries(typed)) {
      if (value !== '' && !removed.has(name)) body[name] = value;
    }
    for (const draft of drafts) {
      if (draft.name !== '' && draft.value !== '') body[draft.name] = draft.value;
    }
    return body;
  };
  const changes = Object.keys(values()).length;

  const save = useMutation({
    mutationFn: () =>
      installations.putVariables(orgId, scopeKey, installationId, { values: values() }),
    onSuccess: async (result) => {
      qc.setQueryData(qk.variables(scopeKey, installationId), result);
      await qc.invalidateQueries({ queryKey: qk.components(scopeKey, installationId) });
      onClose();
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : 'Could not save'),
  });

  const toggleRemove = (name: string) => {
    const next = new Set(removed);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setRemoved(next);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && !save.isPending && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Variables for {pluginName}</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Values are stored sealed and are never shown again.
        </p>

        <div className="mt-4 space-y-4">
          {query.isPending && <Skeleton className="h-24 w-full" />}
          {query.isError && <Alert variant="destructive">Could not load the variables.</Alert>}
          {query.data && declared.length === 0 && (
            <p className="text-sm text-muted-foreground">This plugin declares no variables.</p>
          )}

          {[...declared, ...stored].map((variable) => {
            const marked = removed.has(variable.name);
            return (
              <div key={variable.name} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <label htmlFor={`var-${variable.name}`} className="font-mono text-xs">
                    {variable.name}
                  </label>
                  {variable.required && <Badge variant="outline">required</Badge>}
                  {variable.custom && <Badge variant="outline">custom</Badge>}
                  {variable.isSet ? (
                    <Badge variant="success">set</Badge>
                  ) : (
                    <Badge variant="outline">not set</Badge>
                  )}
                </div>
                {variable.description && (
                  <p className="text-xs text-muted-foreground">{variable.description}</p>
                )}
                <Input
                  id={`var-${variable.name}`}
                  type={variable.secret ? 'password' : 'text'}
                  autoComplete="off"
                  disabled={!canWrite || marked || save.isPending}
                  placeholder={variable.isSet ? 'Leave blank to keep the stored value' : 'Value'}
                  value={typed[variable.name] ?? ''}
                  onChange={(event) => setTyped({ ...typed, [variable.name]: event.target.value })}
                />
                {variable.isSet && canWrite && (
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Checkbox
                      checked={marked}
                      disabled={save.isPending}
                      onChange={() => toggleRemove(variable.name)}
                    />
                    Remove the stored value
                  </label>
                )}
              </div>
            );
          })}

          {drafts.map((draft, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Input
                  aria-label={`Custom variable name ${index + 1}`}
                  className="font-mono text-xs"
                  placeholder="NAME"
                  autoComplete="off"
                  disabled={save.isPending}
                  value={draft.name}
                  onChange={(event) =>
                    setDrafts(
                      drafts.map((d, i) => (i === index ? { ...d, name: event.target.value } : d)),
                    )
                  }
                />
                <Input
                  aria-label={`Custom variable value ${index + 1}`}
                  type="password"
                  placeholder="Value"
                  autoComplete="off"
                  disabled={save.isPending}
                  value={draft.value}
                  onChange={(event) =>
                    setDrafts(
                      drafts.map((d, i) => (i === index ? { ...d, value: event.target.value } : d)),
                    )
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Discard custom variable ${index + 1}`}
                  onClick={() => setDrafts(drafts.filter((_, i) => i !== index))}
                >
                  <X />
                </Button>
              </div>
              {draftError(draft, index) && (
                <p className="text-xs text-destructive">{draftError(draft, index)}</p>
              )}
            </div>
          ))}

          {canWrite && query.data && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={room <= 0 || save.isPending}
                onClick={() => setDrafts([...drafts, { name: '', value: '' }])}
              >
                <Plus />
                Add a custom variable
              </Button>
              <span className="text-xs text-muted-foreground">
                {MAX_CUSTOM_VARIABLES - room} of {MAX_CUSTOM_VARIABLES} custom
              </span>
            </div>
          )}

          {error && <Alert variant="destructive">{error}</Alert>}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={save.isPending}>
            {canWrite ? 'Cancel' : 'Close'}
          </Button>
          {canWrite && (
            <Button
              onClick={() => save.mutate()}
              disabled={changes === 0 || !draftsValid || save.isPending}
            >
              {save.isPending && <Spinner />}
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
