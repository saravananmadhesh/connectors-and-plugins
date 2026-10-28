import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  open: boolean;
  title: string;
  /** What is affected, in plain words. */
  description: string;
  confirmLabel: string;
  pending?: boolean;
  destructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/** Confirmation that states what is affected and needs an explicit confirm. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  pending = false,
  destructive = true,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && !pending && onClose()}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={pending}
          >
            {pending && <Spinner />}
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
