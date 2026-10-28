import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export function SigninPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [serverError, setServerError] = useState('');

  const mutation = useMutation({
    mutationFn: auth.signin,
    onSuccess: async () => {
      qc.removeQueries({ queryKey: qk.me() });
      try {
        await qc.fetchQuery({ queryKey: qk.me(), queryFn: auth.me });
        await navigate({ to: '/marketplace' });
      } catch {
        setServerError('Signed in, but could not load your profile. Please try again.');
      }
    },
    onError: (err) => {
      setServerError(
        err instanceof ApiError && err.status === 401
          ? 'Incorrect email or password'
          : err instanceof ApiError
            ? err.message
            : 'Something went wrong',
      );
    },
  });

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: ({ value }) => {
      setServerError('');
      mutation.mutate(value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back.</CardDescription>
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
          {serverError && <Alert variant="destructive">{serverError}</Alert>}

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                  ? undefined
                  : 'Enter a valid email address',
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
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
              onChange: ({ value }) => (value.length === 0 ? 'Enter your password' : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
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
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          New here?{' '}
          <Link
            to="/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
