import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  name: string;
  onDelete: () => Promise<unknown>;
  onDeleted: () => Promise<void>;
  onClose: () => void;
}

/** Deleting an app cannot be undone, so the person types its name first. */
export function DeleteAppDialog({ name, onDelete, onDeleted, onClose }: Props) {
  const [typed, setTyped] = useState('');
  const mutation = useMutation({ mutationFn: onDelete, onSuccess: onDeleted });
  const matches = typed === name;

  return (
    <Dialog open onOpenChange={(next) => !next && !mutation.isPending && onClose()}>
      <DialogContent>
        <DialogTitle>Delete {name}?</DialogTitle>
        <p className="mt-2 text-sm text-muted-foreground">
          This cannot be undone. Its keys stop working at once, and the app, its settings and its
          managers are removed. It no longer counts toward your limit of apps.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The organizations and people your product created through this app are not deleted. They
          belong to your customers and keep working.
        </p>
        <form
          className="mt-4 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (matches && !mutation.isPending) mutation.mutate();
          }}
        >
          {mutation.error && (
            <Alert variant="destructive">
              {mutation.error instanceof ApiError && mutation.error.status < 500
                ? mutation.error.message
                : 'Could not delete this app. Please try again.'}
            </Alert>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="delete-app-name">
              Type <span className="font-mono">{name}</span> to confirm
            </Label>
            <Input
              id="delete-app-name"
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              disabled={mutation.isPending}
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!matches || mutation.isPending}
              aria-busy={mutation.isPending}
            >
              {mutation.isPending && <Spinner />}
              Delete app
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
