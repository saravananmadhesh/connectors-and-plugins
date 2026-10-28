import { useEffect, useState } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

/** Lands from the link mailed to a new address; confirming ends every session. */
export function ConfirmEmailChangePage() {
  const qc = useQueryClient();
  const search = useSearch({ strict: false }) as { token?: string };
  const [serverError, setServerError] = useState('');

  const confirmMutation = useMutation({
    mutationFn: (token: string) => auth.confirmEmailChange(token),
    onSuccess: () => qc.clear(),
    onError: (err) =>
      setServerError(
        err instanceof ApiError ? err.message : 'Confirmation failed. The link may have expired.',
      ),
  });

  useEffect(() => {
    if (search.token) confirmMutation.mutate(search.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm your new email</CardTitle>
        <CardDescription>
          {confirmMutation.isSuccess
            ? 'Your email address has been changed.'
            : 'Confirming the link from your email.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!search.token && <Alert variant="destructive">This link is missing its token.</Alert>}
        {confirmMutation.isPending && (
          <div className="flex justify-center py-6">
            <Spinner className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        {serverError && <Alert variant="destructive">{serverError}</Alert>}
        {confirmMutation.isSuccess && (
          <Alert variant="success">
            Your email address was changed. Sign in again with the new address.
          </Alert>
        )}
        <p className="text-center text-sm text-muted-foreground">
          <Link
            to="/signin"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Go to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
