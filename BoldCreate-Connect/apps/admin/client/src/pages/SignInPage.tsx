import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input, PasswordInput } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AuthLayout } from '../layouts/AuthLayout';
import { adminApi } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { SESSION_KEY } from '../lib/session';

export function SignInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useMutation({
    mutationFn: adminApi.signIn,
    onSuccess: async (session) => {
      queryClient.setQueryData(SESSION_KEY, session);
      await navigate({ to: '/' });
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    signIn.mutate({ email, password });
  };

  return (
    <AuthLayout title="Admin sign in">
      <form onSubmit={submit} className="flex flex-col gap-4">
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
        <Label>
          Password
          <PasswordInput
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Label>
        {signIn.isError && (
          <Alert variant="destructive" role="alert">
            {errorMessage(signIn.error)}
          </Alert>
        )}
        <Button type="submit" disabled={signIn.isPending}>
          {signIn.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="text-sm">
        First time, or forgot your password?{' '}
        <Link to="/setup" className="underline">
          Get a setup link
        </Link>
      </p>
    </AuthLayout>
  );
}
