import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input, PasswordInput } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AuthLayout } from '../layouts/AuthLayout';
import { adminApi } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { SESSION_KEY } from '../lib/session';

function RequestLink() {
  const [email, setEmail] = useState('');
  const request = useMutation({ mutationFn: adminApi.requestSetup });

  if (request.isSuccess) {
    return (
      <Alert variant="success" role="status">
        If this email is allowed, a link is on its way. It works once and expires soon. Check your
        inbox.
      </Alert>
    );
  }
  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        request.mutate({ email });
      }}
      className="flex flex-col gap-4"
    >
      <p className="text-sm">
        Enter your admin email. We mail a link to choose your password; use it again whenever you
        forget the password.
      </p>
      <Label>
        Email
        <Input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Label>
      {request.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(request.error)}
        </Alert>
      )}
      <Button type="submit" disabled={request.isPending}>
        {request.isPending ? 'Sending…' : 'Send setup link'}
      </Button>
    </form>
  );
}

function ChoosePassword({ token }: { token: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const complete = useMutation({
    mutationFn: adminApi.completeSetup,
    onSuccess: async (session) => {
      queryClient.setQueryData(SESSION_KEY, session);
      await navigate({ to: '/' });
    },
  });
  const mismatch = confirm.length > 0 && confirm !== password;

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        if (!mismatch) complete.mutate({ token, password });
      }}
      className="flex flex-col gap-4"
    >
      <Label>
        New password
        <PasswordInput
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Label>
      <Label>
        Repeat password
        <PasswordInput
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </Label>
      {mismatch && (
        <p role="alert" className="text-sm text-destructive">
          The two passwords do not match.
        </p>
      )}
      {complete.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(complete.error)}
        </Alert>
      )}
      <Button type="submit" disabled={complete.isPending || mismatch}>
        {complete.isPending ? 'Saving…' : 'Save password and sign in'}
      </Button>
    </form>
  );
}

export function SetupPage() {
  const { token } = useSearch({ strict: false }) as { token?: string };
  return (
    <AuthLayout title={token ? 'Choose your password' : 'Set up your admin account'}>
      {token ? <ChoosePassword token={token} /> : <RequestLink />}
      <p className="text-sm">
        <Link to="/signin" className="underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
