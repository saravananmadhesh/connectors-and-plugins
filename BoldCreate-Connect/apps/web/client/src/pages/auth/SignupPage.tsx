import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { pendingInvite, pendingInviteEmail } from '@/lib/pending-invite';
import { qk } from '@/lib/query-keys';
import { InviteNotice } from '@/components/InviteNotice';
import { ResendVerification } from '@/components/ResendVerification';
import { Button } from '@/components/ui/button';
import { Input, PasswordInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export function SignupPage() {
  // An invited address is fixed: the invitation can be accepted only by that address.
  const [invitedEmail] = useState(pendingInviteEmail);
  const [sentTo, setSentTo] = useState<string | null>(null);
  // The address already has a verified profile: the way on is to sign in.
  const [registered, setRegistered] = useState(false);
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();
  const qc = useQueryClient();

  const mutation = useMutation({
    // The invitation already shows who reads this mailbox, so no verification mail is needed:
    // the address is verified at sign-up and the person goes straight on to the invitation.
    mutationFn: async (value: { email: string; password: string; displayName: string }) => {
      const inviteToken = invitedEmail === null ? null : pendingInvite();
      await auth.signup(inviteToken ? { ...value, inviteToken } : value);
      if (!inviteToken) return null;
      await auth.signin({ email: value.email, password: value.password });
      return inviteToken;
    },
    onSuccess: async (inviteToken, value) => {
      if (inviteToken === null) {
        setSentTo(value.email.trim());
        return;
      }
      qc.removeQueries({ queryKey: qk.me() });
      try {
        await qc.fetchQuery({ queryKey: qk.me(), queryFn: auth.me });
        await navigate({ to: '/accept-invite', search: { token: inviteToken } });
      } catch {
        setServerError('Signed up, but could not load your profile. Please sign in.');
      }
    },
    onError: (err) => {
      if (err instanceof ApiError && err.status === 409) {
        setRegistered(true);
        setServerError('');
        return;
      }
      setServerError(
        invitedEmail !== null && err instanceof ApiError && err.status === 401
          ? 'This address is already registered. Sign in to accept the invitation.'
          : err instanceof ApiError
            ? err.message
            : 'Something went wrong',
      );
    },
  });

  const form = useForm({
    defaultValues: { email: invitedEmail ?? '', password: '', confirm: '', displayName: '' },
    onSubmit: ({ value }) => {
      setServerError('');
      setRegistered(false);
      mutation.mutate({
        email: value.email,
        password: value.password,
        displayName: value.displayName,
      });
    },
  });

  if (sentTo !== null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a verification link to <strong>{sentTo}</strong>. Click it to activate your
            profile. It can take a minute, and may land in your spam folder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResendVerification email={sentTo} startsWaiting />
          <p className="text-center text-sm text-muted-foreground">
            Wrong address?{' '}
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Start again
            </button>
            {' · '}
            <Link
              to="/signin"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Start using plugins in minutes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
          className="space-y-4"
          noValidate
        >
          <InviteNotice action="sign up" />
          {serverError && <Alert variant="destructive">{serverError}</Alert>}
          {registered && (
            <Alert variant="destructive">
              This email is already registered.{' '}
              <Link to="/signin" className="font-medium underline underline-offset-4">
                Sign in
              </Link>{' '}
              instead, or{' '}
              <Link to="/forgot-password" className="font-medium underline underline-offset-4">
                reset your password
              </Link>
              .
            </Alert>
          )}

          <form.Field
            name="displayName"
            validators={{
              onChange: ({ value }) => (!value.trim() ? 'Name is required' : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="displayName">Full name</Label>
                <Input
                  id="displayName"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => (!value.includes('@') ? 'Valid email required' : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  readOnly={invitedEmail !== null}
                  placeholder="ada@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => (value.length < 12 ? 'At least 12 characters' : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  placeholder="12+ characters"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="confirm"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue('password')
                  ? 'The two passwords do not match'
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="confirm">Repeat password</Label>
                <PasswordInput
                  id="confirm"
                  autoComplete="new-password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner className="mr-2" />}
            Sign up
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already registered?{' '}
          <Link
            to="/signin"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
