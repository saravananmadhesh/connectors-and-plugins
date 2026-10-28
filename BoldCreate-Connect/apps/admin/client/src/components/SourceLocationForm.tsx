import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AdminPluginSourceBody } from '../lib/api';
import { parseGithubUrl } from '../lib/github-url';
import { errorMessage } from '../lib/messages';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  /** What the source is now; the form opens with it filled in. */
  initial: AdminPluginSourceBody | null;
  save: (body: AdminPluginSourceBody) => Promise<unknown>;
  /** Called once the change is saved, to refresh what shows it. */
  onSaved: () => Promise<unknown>;
  onDone: () => void;
}

/** Repository, branch or tag and folder of a source, loaded with what it has today. */
export function SourceLocationForm({ initial, save, onSaved, onDone }: Props) {
  const [repository, setRepository] = useState(
    initial ? `${initial.owner}/${initial.repository}` : '',
  );
  const [ref, setRef] = useState(initial?.ref ?? 'main');
  const [path, setPath] = useState(initial?.path ?? '');
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({
    mutationFn: save,
    onSuccess: async () => {
      await onSaved();
      onDone();
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const location = parseGithubUrl(repository);
    setInvalid(location === null);
    if (!location) return;
    mutation.mutate({
      owner: location.owner,
      repository: location.repository,
      ref: ref.trim() || location.ref || 'main',
      path: path.trim().replace(/^\/+|\/+$/g, '') || location.path,
    });
  };

  return (
    <form onSubmit={submit} aria-label="Edit source" className="flex flex-col gap-4">
      <Label>
        Repository
        <Input
          value={repository}
          required
          placeholder="https://github.com/owner/repository"
          aria-invalid={invalid}
          onChange={(event) => {
            setRepository(event.target.value);
            setInvalid(false);
          }}
        />
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          Branch or tag
          <Input value={ref} placeholder="main" onChange={(event) => setRef(event.target.value)} />
        </Label>
        <Label>
          Folder in the repository
          <Input
            value={path}
            placeholder="Leave empty for the repository root"
            onChange={(event) => setPath(event.target.value)}
          />
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Saving checks the new location right away. New versions found there arrive as pending, and
        versions already in the catalog stay as they are.
      </p>
      {invalid && (
        <Alert variant="destructive" role="alert">
          That is not a GitHub repository link. Use https://github.com/owner/repository or
          owner/repository.
        </Alert>
      )}
      {mutation.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(mutation.error)}
        </Alert>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving…' : 'Save and sync'}
        </Button>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
