import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

type DeleteUserDialogProps = {
  /** The address the user types back to confirm; compared without regard to case. */
  email: string;
  onDelete: (confirmEmail: string) => Promise<unknown>;
  onDeleted: () => Promise<void>;
  onClose: () => void;
};

export function DeleteUserDialog({ email, onDelete, onDeleted, onClose }: DeleteUserDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState('');
  const mutation = useMutation({
    mutationFn: onDelete,
    onSuccess: onDeleted,
  });
  const matches = confirmation.trim().toLowerCase() === email.toLowerCase();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-user-title"
      aria-describedby="delete-user-description"
      className="fixed inset-0 m-auto w-full max-w-md rounded-xl border bg-popover p-6 text-left text-popover-foreground shadow-lg backdrop:bg-black/50"
      onCancel={(event) => {
        event.preventDefault();
        if (!mutation.isPending) onClose();
      }}
    >
      <h2 id="delete-user-title" className="text-base font-semibold tracking-tight">
        Delete profile
      </h2>
      <p id="delete-user-description" className="mt-2 text-sm text-muted-foreground">
        You leave every organization, your personal installations and API keys are removed, and you
        are signed out everywhere. An organization where you are the only member is deleted with
        everything in it. This cannot be undone.
      </p>
      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (matches && !mutation.isPending) mutation.mutate(confirmation.trim());
        }}
      >
        {mutation.error && (
          <Alert variant="destructive">
            {mutation.error instanceof ApiError && mutation.error.status < 500
              ? mutation.error.message
              : 'Could not delete your profile. Please try again.'}
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="delete-user-email">
            Type <span className="font-mono">{email}</span> to confirm
          </Label>
          <Input
            id="delete-user-email"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
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
            Delete profile
          </Button>
        </div>
      </form>
    </dialog>
  );
}
