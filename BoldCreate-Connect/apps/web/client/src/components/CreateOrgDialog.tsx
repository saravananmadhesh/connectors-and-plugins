import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { orgs, ApiError } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { slugify } from '@/lib/slug';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

/** Asks for a name and creates an organization. */
export function CreateOrgDialog({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const [serverError, setServerError] = useState('');

  const mutation = useMutation({
    mutationFn: orgs.create,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.me() });
      onClose();
    },
    onError: (err) => setServerError(err instanceof ApiError ? err.message : 'Failed to create'),
  });

  const form = useForm({
    defaultValues: { name: '', slug: '' },
    onSubmit: ({ value }) => {
      setServerError('');
      mutation.mutate({ name: value.name, slug: value.slug || slugify(value.name) });
    },
  });

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>New organization</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          An organization holds your projects, members and installed plugins.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
          className="mt-4 space-y-4"
        >
          {serverError && <Alert variant="destructive">{serverError}</Alert>}

          <form.Field
            name="name"
            validators={{ onChange: ({ value }) => (!value.trim() ? 'Required' : undefined) }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="org-name">Name</Label>
                <Input
                  id="org-name"
                  placeholder="Acme Corp"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="slug">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="org-slug">
                  Slug <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="org-slug"
                  placeholder="acme-corp"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                  }
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Spinner />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
