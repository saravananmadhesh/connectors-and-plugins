import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ApiError, type ApiKeyCreatedResponse, type CreateApiKeyInput } from '@/lib/api';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { CopyButton } from '@/components/CopyButton';

type Permission = 'mcp:list' | 'mcp:call';

const PERMISSIONS: { value: Permission; hint: string }[] = [
  { value: 'mcp:list', hint: 'See which tools are available' },
  { value: 'mcp:call', hint: 'Run tools through the gateway' },
];

/** Names a key and picks what it may do. */
export function CreateApiKeyDialog({
  create,
  onCreated,
  onClose,
}: {
  create: (body: CreateApiKeyInput) => Promise<ApiKeyCreatedResponse>;
  onCreated: (key: ApiKeyCreatedResponse) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<Permission[]>(['mcp:list', 'mcp:call']);
  const [serverError, setServerError] = useState('');

  const mutation = useMutation({
    mutationFn: () => create({ name, permissions }),
    onSuccess: onCreated,
    onError: (err) => setServerError(err instanceof ApiError ? err.message : 'Failed'),
  });

  const toggle = (permission: Permission) =>
    setPermissions((previous) =>
      previous.includes(permission)
        ? previous.filter((item) => item !== permission)
        : [...previous, permission],
    );

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Create API key</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Name the key and choose what it may do. You can revoke it at any time.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setServerError('');
            mutation.mutate();
          }}
          className="mt-4 space-y-4"
        >
          {serverError && <Alert variant="destructive">{serverError}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="key-name">Name</Label>
            <Input
              id="key-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              maxLength={60}
            />
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Permissions</legend>
            {PERMISSIONS.map((permission) => (
              <label key={permission.value} className="flex cursor-pointer items-center gap-2.5">
                <Checkbox
                  checked={permissions.includes(permission.value)}
                  onChange={() => toggle(permission.value)}
                />
                <span className="text-sm">
                  <span className="font-mono">{permission.value}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{permission.hint}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || permissions.length === 0}>
              {mutation.isPending && <Spinner />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** Shows a new key once; it cannot be read again after this. */
export function RawKeyDialog({ rawKey, onDone }: { rawKey: string; onDone: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onDone()}>
      <DialogContent>
        <DialogTitle>API key created</DialogTitle>
        <div className="mt-4 space-y-4">
          <Alert variant="warning">Copy this key now. It will not be shown again.</Alert>
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
