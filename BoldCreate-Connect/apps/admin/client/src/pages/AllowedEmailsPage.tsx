import { UserAvatar } from '../components/UserAvatar';
import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../components/PageHeader';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import { Label } from '../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { adminApi, type AdminAllowedEmailResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { ALLOWED_EMAILS_KEY } from '../lib/plugins';
import { useSession } from '../lib/session';

function AddEmailForm() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const add = useMutation({
    mutationFn: adminApi.addAllowedEmail,
    onSuccess: async (added) => {
      setEmail('');
      setSentTo(added.email);
      await queryClient.invalidateQueries({ queryKey: ALLOWED_EMAILS_KEY });
    },
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSentTo(null);
    add.mutate({ email: email.trim() });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Allow a new admin</CardTitle>
        <CardDescription>
          We email a one-time link to the address. The person opens it to confirm the address is
          theirs and choose a password, then signs in here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <Label>
            Email address
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              autoComplete="off"
              required
            />
          </Label>
          {add.isError && (
            <Alert variant="destructive" role="alert" className="mt-3">
              {errorMessage(add.error)}
            </Alert>
          )}
          {sentTo && (
            <Alert variant="success" role="status" className="mt-3">
              Added {sentTo}. A setup link is on its way.
            </Alert>
          )}
          <Button type="submit" disabled={add.isPending} className="mt-4">
            {add.isPending ? 'Adding…' : 'Add and send link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function EmailRow({ item, isSelf }: { item: AdminAllowedEmailResponse; isSelf: boolean }) {
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [resent, setResent] = useState(false);
  const refresh = () => queryClient.invalidateQueries({ queryKey: ALLOWED_EMAILS_KEY });
  const invite = useMutation({
    mutationFn: () => adminApi.inviteAllowedEmail(item.email),
    onSuccess: () => setResent(true),
  });
  const remove = useMutation({
    mutationFn: () => adminApi.removeAllowedEmail(item.email),
    onSuccess: refresh,
  });
  const removable = item.source === 'added' && !isSelf;

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <span className="flex items-center gap-2.5">
            <UserAvatar name={item.email} className="size-7" />
            <span>
              {item.email}
              {isSelf && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
            </span>
          </span>
        </TableCell>
        <TableCell>{item.status === 'verified' ? 'Verified' : 'Waiting for the link'}</TableCell>
        <TableCell className="text-muted-foreground">
          {item.source === 'config' ? 'Deployment settings' : `Added by ${item.addedBy}`}
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {confirming ? (
              <>
                <span className="max-w-64 text-right text-sm whitespace-normal">
                  Remove this address? Any sign-in it has ends at once.
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate()}
                >
                  Yes, remove
                </Button>
                <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {item.status === 'invited' && (
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Resend link to ${item.email}`}
                    disabled={invite.isPending}
                    onClick={() => invite.mutate()}
                  >
                    {resent ? 'Link sent' : 'Resend link'}
                  </Button>
                )}
                {removable && (
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Remove ${item.email}`}
                    onClick={() => setConfirming(true)}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
      {(invite.isError || remove.isError) && (
        <TableRow>
          <TableCell colSpan={4}>
            <Alert variant="destructive" role="alert">
              {errorMessage(invite.error ?? remove.error)}
            </Alert>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

/** Who may sign in to this app. Addresses from the deployment's settings are listed but fixed. */
export function AllowedEmailsPage() {
  const session = useSession();
  const emails = useQuery({ queryKey: ALLOWED_EMAILS_KEY, queryFn: adminApi.listAllowedEmails });
  const me = session.data?.email.toLowerCase();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title="Allowed users"
        description="Only these addresses can sign in to the admin app. Removing one ends its sessions."
      />
      <AddEmailForm />
      {emails.isPending && <Skeleton className="h-24" aria-label="Loading addresses" />}
      {emails.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(emails.error)}
        </Alert>
      )}
      {emails.data && (
        <div className="rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.data.items.map((item) => (
                <EmailRow key={item.email} item={item} isSelf={item.email === me} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
