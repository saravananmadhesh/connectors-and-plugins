import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CopyButton } from '@/components/CopyButton';

/** Shows a new key once; the secret is not kept anywhere the page can read it again. */
export function RawKeyDialog({ rawKey, onDone }: { rawKey: string; onDone: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onDone()}>
      <DialogContent>
        <DialogTitle>Key created</DialogTitle>
        <div className="mt-4 space-y-4">
          <Alert variant="warning">
            Copy this key now and store it on your server. It will not be shown again.
          </Alert>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-xs break-all">
              {rawKey}
            </code>
            <CopyButton value={rawKey} label="Copy key" />
          </div>
          <div className="flex justify-end">
            <Button onClick={onDone}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
