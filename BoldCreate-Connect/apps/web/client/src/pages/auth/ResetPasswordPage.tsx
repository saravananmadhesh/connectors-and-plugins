import { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { token?: string };
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    /* v8 ignore next */
    mutationFn: () => auth.resetPassword(search.token ?? '', password),
    onSuccess: () => setDone(true),
    onError: (err) => {
      setServerError(
        err instanceof ApiError ? err.message : 'Reset failed. The link may have expired.',
      );
    },
  });

  if (!search.token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invalid link</CardTitle>
          <CardDescription>This reset link is missing a token.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
            Request a new link
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (done) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Password updated</CardTitle>
          <CardDescription>
            Your password has been reset. All sessions have been signed out.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => void navigate({ to: '/signin' })}>
            Sign in
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Choose a new password (12+ characters).</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setServerError('');
            mutation.mutate();
          }}
          className="space-y-4"
        >
          {serverError && <Alert variant="destructive">{serverError}</Alert>}
          <div className="space-y-1">
            <Label htmlFor="password">New password</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="12+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password.length > 0 && password.length < 12 ? 'At least 12 characters' : undefined
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm">Repeat password</Label>
            <PasswordInput
              id="confirm"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={
                confirm.length > 0 && confirm !== password
                  ? 'The two passwords do not match'
                  : undefined
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending || password.length < 12 || confirm !== password}
          >
            {mutation.isPending && <Spinner className="mr-2" />}
            Set new password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
