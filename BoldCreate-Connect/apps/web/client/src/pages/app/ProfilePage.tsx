import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { CalendarDays, LogOut, Mail, Trash2 } from 'lucide-react';
import { auth, ApiError } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { DeleteUserDialog } from '@/components/delete-user-dialog';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';

/** One settings block: what it is on the left, the controls on the right. */
function Section({
  title,
  description,
  danger,
  children,
}: {
  title: string;
  description: string;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <Card className={cn(danger && 'border-destructive/30')}>
      <CardContent className="grid gap-6 p-6 md:grid-cols-[14rem_1fr]">
        <div className="space-y-1">
          <h2 className={cn('text-sm font-semibold', danger && 'text-destructive')}>{title}</h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="min-w-0">{children}</div>
      </CardContent>
    </Card>
  );
}

/** A line with a title and a hint on the left and its action on the right. */
function ActionRow({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: qk.me(), queryFn: auth.me });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const changePwMutation = useMutation({
    mutationFn: () => auth.changePassword(currentPassword, newPassword),
    // Every session ends with a password change, this one included.
    onSuccess: () => {
      qc.clear();
      void navigate({ to: '/signin' });
    },
    onError: (err) =>
      setPwError(err instanceof ApiError ? err.message : 'Failed to change password'),
  });

  const changeEmailMutation = useMutation({
    mutationFn: () => auth.changeEmail(newEmail, emailPassword),
    onSuccess: () => {
      setEmailSent(true);
      setNewEmail('');
      setEmailPassword('');
    },
    onError: (err) =>
      setEmailError(err instanceof ApiError ? err.message : 'Failed to change email'),
  });

  const signoutAllMutation = useMutation({
    mutationFn: auth.signoutAll,
    onSuccess: () => {
      qc.clear();
      void navigate({ to: '/signin' });
    },
  });

  const user = data?.user;

  return (
    <Page className="space-y-6">
      <PageHeader title="Profile" description="Your profile and sign-in security." />

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-muted text-xl font-semibold uppercase"
          >
            {user?.displayName.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="truncate text-lg leading-tight font-semibold">{user?.displayName}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{user?.email}</span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </p>
          </div>
          {user && (
            <Badge variant={user.emailVerifiedAt ? 'success' : 'warning'}>
              {user.emailVerifiedAt ? 'Email verified' : 'Email not verified'}
            </Badge>
          )}
        </CardContent>
      </Card>

      <Section
        title="Email address"
        description="We send a confirmation link to the new address. The current address keeps working until you confirm."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmailError('');
            setEmailSent(false);
            changeEmailMutation.mutate();
          }}
          className="space-y-4"
        >
          {emailError && <Alert variant="destructive">{emailError}</Alert>}
          {emailSent && (
            <Alert variant="success">
              If the address can be used, a confirmation link is on its way.
            </Alert>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="new-email">New email</Label>
            <Input
              id="new-email"
              type="email"
              autoComplete="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email-pw">Confirm with your password</Label>
            <Input
              id="email-pw"
              type="password"
              autoComplete="current-password"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={changeEmailMutation.isPending || !newEmail || !emailPassword}
          >
            {changeEmailMutation.isPending && <Spinner />}
            Send confirmation
          </Button>
        </form>
      </Section>

      <Section
        title="Password"
        description="Use a strong password of at least 12 characters. You will be signed out everywhere."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPwError('');
            changePwMutation.mutate();
          }}
          className="space-y-4"
        >
          {pwError && <Alert variant="destructive">{pwError}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="current-pw">Current password</Label>
            <Input
              id="current-pw"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New password</Label>
            <Input
              id="new-pw"
              type="password"
              autoComplete="new-password"
              placeholder="12+ characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={
                newPassword.length > 0 && newPassword.length < 12
                  ? 'At least 12 characters'
                  : undefined
              }
            />
          </div>
          <Button
            type="submit"
            disabled={changePwMutation.isPending || newPassword.length < 12 || !currentPassword}
          >
            {changePwMutation.isPending && <Spinner />}
            Update password
          </Button>
        </form>
      </Section>

      <Section
        danger
        title="Danger zone"
        description="These actions end your sessions or remove your profile."
      >
        <div className="space-y-5">
          <ActionRow title="Sign out all devices" hint="Revokes all active sessions.">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => signoutAllMutation.mutate()}
              disabled={signoutAllMutation.isPending}
            >
              {signoutAllMutation.isPending ? <Spinner /> : <LogOut />}
              Sign out all
            </Button>
          </ActionRow>
          <ActionRow
            title="Delete profile"
            hint="Leave every organization and remove your personal data."
          >
            <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
              <Trash2 />
              Delete profile
            </Button>
          </ActionRow>
        </div>
      </Section>

      {showDelete && data && (
        <DeleteUserDialog
          email={data.user.email}
          onDelete={(confirmEmail) => auth.deleteMe(confirmEmail)}
          onDeleted={async () => {
            // The session ended with the deletion; nothing cached belongs to anyone any more.
            qc.clear();
            await navigate({ to: '/signin' });
          }}
          onClose={() => setShowDelete(false)}
        />
      )}
    </Page>
  );
}
