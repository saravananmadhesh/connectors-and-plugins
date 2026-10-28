import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

type DeleteResourceDialogProps = {
  name: string;
  slug: string;
  onDelete: (confirmSlug: string) => Promise<unknown>;
  onDeleted: () => Promise<void>;
  onClose: () => void;
};

export function DeleteResourceDialog({
  name,
  slug,
  onDelete,
  onDeleted,
  onClose,
}: DeleteResourceDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const mutation = useMutation({
    mutationFn: onDelete,
    onSuccess: async () => {
      setAccepted(true);
      await onDeleted();
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-resource-title"
      aria-describedby="delete-resource-description"
      className="fixed inset-0 m-auto w-full max-w-md rounded-xl border bg-popover p-6 text-left text-popover-foreground shadow-lg backdrop:bg-black/50"
      onCancel={(event) => {
        event.preventDefault();
        if (!mutation.isPending && !accepted) onClose();
      }}
    >
      <h2 id="delete-resource-title" className="text-base font-semibold tracking-tight">
        Delete organization
      </h2>
      <p id="delete-resource-description" className="mt-2 text-sm text-muted-foreground">
        Permanently delete {name} and all its projects and resources. This cannot be undone. Access
        is revoked immediately once deletion is accepted. Cleanup runs in the background.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        External connection tokens are not revoked. Revoke them directly with the upstream service
        if needed.
      </p>
      {accepted && (
        <Alert variant="success" role="status" className="mt-4">
          Deletion queued. Access has been revoked. Cleanup will continue in the background.
        </Alert>
      )}
      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (confirmation === slug && acknowledged && !mutation.isPending && !accepted) {
            mutation.mutate(confirmation);
          }
        }}
      >
        {mutation.error && !accepted && (
          <Alert variant="destructive">
            {mutation.error instanceof ApiError && mutation.error.status < 500
              ? mutation.error.message
              : `Could not queue deletion of this organization. Please try again.`}
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="delete-resource-slug">
            Type <span className="font-mono">{slug}</span> to confirm
          </Label>
          <Input
            id="delete-resource-slug"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            disabled={mutation.isPending || accepted}
            autoComplete="off"
          />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            disabled={mutation.isPending || accepted}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
          />
          I understand that this organization and all its projects and resources will be permanently
          deleted.
        </label>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending || accepted}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={confirmation !== slug || !acknowledged || mutation.isPending || accepted}
            aria-busy={mutation.isPending}
          >
            {mutation.isPending && <Spinner />}
            {accepted ? 'Deletion queued' : 'Delete organization'}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
