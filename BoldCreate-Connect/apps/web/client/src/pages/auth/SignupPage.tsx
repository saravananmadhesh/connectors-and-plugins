import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export function SignupPage() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');

  const mutation = useMutation({
    mutationFn: auth.signup,
    onSuccess: () => setDone(true),
    onError: (err) => {
      setServerError(err instanceof ApiError ? err.message : 'Something went wrong');
    },
  });

  const form = useForm({
    defaultValues: { email: '', password: '', displayName: '' },
    onSubmit: ({ value }) => {
      setServerError('');
      mutation.mutate(value);
    },
  });

  if (done) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a verification link. Click it to activate your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Didn't receive it?{' '}
            <Link
              to="/signin"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>{' '}
            to resend.
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
          {serverError && <Alert variant="destructive">{serverError}</Alert>}

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
                <Input
                  id="password"
                  type="password"
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
