import { useState } from 'react';
import { Plus, Trash2, Undo2, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, installations, type ScopeKey } from '@/lib/api';
import { CUSTOM_VARIABLE_NAME_PATTERN, MAX_CUSTOM_VARIABLES } from '@/lib/custom-variables';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip } from '@/components/ui/tooltip';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  installationId: string;
  /** May set and remove values. */
  canWrite: boolean;
}

interface Draft {
  name: string;
  value: string;
}

/**
 * The environment of one installation, edited where the MCP server is. Every variable the plugin
 * declares is one row of two boxes: its name, which cannot be changed, and its value. The
 * installer may add up to ten of their own, again a name and a value. A stored value is never
 * shown: a blank box keeps it, a typed value replaces it, and the remove button deletes it.
 */
export function McpEnvironment({ orgId, scopeKey, installationId, canWrite }: Props) {
  const qc = useQueryClient();
  const key = qk.variables(scopeKey, installationId);
  const query = useQuery({
    queryKey: key,
    queryFn: () => installations.listVariables(orgId, scopeKey, installationId),
  });
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [removed, setRemoved] = useState<ReadonlySet<string>>(new Set());
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const items = query.data?.items ?? [];
  const declared = items.filter((variable) => !variable.custom);
  const stored = items.filter((variable) => variable.custom);
  const takenNames = new Set(items.map((variable) => variable.name));
  const kept = stored.filter((variable) => !removed.has(variable.name)).length;
  const room = MAX_CUSTOM_VARIABLES - kept - drafts.length;
  const missing = declared.filter((variable) => variable.required && !variable.isSet);

  const draftError = (draft: Draft, index: number): string => {
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
      qc.setQueryData(key, result);
      setTyped({});
      setRemoved(new Set());
      setDrafts([]);
      setError('');
      setNote('Variables saved.');
      await qc.invalidateQueries({ queryKey: qk.components(scopeKey, installationId) });
      await qc.invalidateQueries({ queryKey: qk.mcpServers(scopeKey, installationId) });
    },
    onError: (err) => {
      setNote('');
      setError(err instanceof ApiError ? err.message : 'Could not save the variables');
    },
  });

  const edit = (patch: () => void) => {
    setNote('');
    patch();
  };
  const toggleRemove = (name: string) =>
    edit(() => {
      const next = new Set(removed);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      setRemoved(next);
    });

  const row = (variable: (typeof items)[number]) => {
    const marked = removed.has(variable.name);
    const nameBox = (
      <Input
        readOnly
        aria-label={`Variable name ${variable.name}`}
        className="font-mono text-xs"
        value={variable.name}
      />
    );
    return (
      <li key={variable.name} className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          {variable.description ? (
            <Tooltip label={variable.description} className="w-full [&>div]:w-full">
              {nameBox}
            </Tooltip>
          ) : (
            nameBox
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Input
            aria-label={`Value of ${variable.name}`}
            type={variable.secret || variable.custom ? 'password' : 'text'}
            autoComplete="off"
            disabled={!canWrite || marked || save.isPending}
            placeholder={
              marked
                ? 'Will be removed'
                : variable.isSet
                  ? 'Stored. Leave blank to keep it'
                  : variable.required
                    ? 'Value (required)'
                    : 'Value'
            }
            value={typed[variable.name] ?? ''}
            onChange={(event) =>
              edit(() => setTyped({ ...typed, [variable.name]: event.target.value }))
            }
          />
        </div>
        {canWrite && variable.isSet ? (
          <Tooltip label={marked ? 'Keep the stored value' : 'Remove the stored value'}>
            <Button
              variant="ghost"
              size="icon"
              aria-pressed={marked}
              aria-label={`Remove the stored value of ${variable.name}`}
              disabled={save.isPending}
              onClick={() => toggleRemove(variable.name)}
            >
              {marked ? <Undo2 /> : <Trash2 />}
            </Button>
          </Tooltip>
        ) : (
          <span className="size-9 shrink-0" aria-hidden="true" />
        )}
      </li>
    );
  };

  return (
    <section className="space-y-3" aria-label="Environment">
      <div>
        <h3 className="text-sm font-medium">Environment variables</h3>
        <p className="text-xs text-muted-foreground">
          Give each variable a value. Names from the plugin cannot be changed. Values are stored
          sealed and never shown again, and apply to the whole installation.
        </p>
      </div>

      {query.isPending && <Skeleton className="h-20 w-full" />}
      {query.isError && <Alert variant="destructive">Could not load the variables.</Alert>}
      {error && <Alert variant="destructive">{error}</Alert>}
      {note && <Alert variant="success">{note}</Alert>}
      {missing.length > 0 && (
        <Alert variant="warning">
          Needs a value: {missing.map((variable) => variable.name).join(', ')}. This server stays
          inactive until they are set.
        </Alert>
      )}

      {query.data && declared.length === 0 && stored.length === 0 && drafts.length === 0 && (
        <p className="text-sm text-muted-foreground">
          This plugin declares no variables.
          {canWrite ? ' You can add your own.' : ''}
        </p>
      )}

      {(declared.length > 0 || stored.length > 0) && (
        <ul className="space-y-2">{[...declared, ...stored].map(row)}</ul>
      )}

      {drafts.map((draft, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <Input
                aria-label={`Name of new variable ${index + 1}`}
                className="font-mono text-xs"
                placeholder="NAME"
                autoComplete="off"
                spellCheck={false}
                disabled={save.isPending}
                value={draft.name}
                onChange={(event) =>
                  edit(() =>
                    setDrafts(
                      drafts.map((d, i) => (i === index ? { ...d, name: event.target.value } : d)),
                    ),
                  )
                }
              />
            </div>
            <div className="min-w-0 flex-1">
              <Input
                aria-label={`Value of new variable ${index + 1}`}
                type="password"
                placeholder="Value"
                autoComplete="off"
                disabled={save.isPending}
                value={draft.value}
                onChange={(event) =>
                  edit(() =>
                    setDrafts(
                      drafts.map((d, i) => (i === index ? { ...d, value: event.target.value } : d)),
                    ),
                  )
                }
              />
            </div>
            <Tooltip label="Discard this variable">
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Discard new variable ${index + 1}`}
                onClick={() => edit(() => setDrafts(drafts.filter((_, i) => i !== index)))}
              >
                <X />
              </Button>
            </Tooltip>
          </div>
          {draftError(draft, index) && (
            <p className="text-xs text-destructive">{draftError(draft, index)}</p>
          )}
        </div>
      ))}

      {canWrite && query.data && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={room <= 0 || save.isPending}
              onClick={() => edit(() => setDrafts([...drafts, { name: '', value: '' }]))}
            >
              <Plus />
              Add variable
            </Button>
            <span className="text-xs text-muted-foreground">
              {MAX_CUSTOM_VARIABLES - room} of {MAX_CUSTOM_VARIABLES} of your own
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => save.mutate()}
            disabled={changes === 0 || !draftsValid || save.isPending}
          >
            {save.isPending && <Spinner />}
            Save variables
          </Button>
        </div>
      )}
    </section>
  );
}
