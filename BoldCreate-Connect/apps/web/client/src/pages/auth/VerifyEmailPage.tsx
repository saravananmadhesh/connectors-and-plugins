import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { auth, ApiError } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { pendingInvite } from '@/lib/pending-invite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { PageLoader } from '@/components/PageLoader';
import { Spinner } from '@/components/ui/spinner';

// A verification token works once, and the page can mount more than once while the router
// settles, so a token already in flight is not submitted again.
const submittedTokens = new Set<string>();

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  // Token may arrive via ?token= query param (from email link)
  const search = useSearch({ strict: false }) as { token?: string };
  const [serverError, setServerError] = useState('');
  const [resendDone, setResendDone] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: (token: string) => auth.verifyEmail(token),
    onSettled: (_data, _error, token) => {
      submittedTokens.delete(token);
    },
    onSuccess: async () => {
      qc.removeQueries({ queryKey: qk.me() });
      try {
        await qc.fetchQuery({ queryKey: qk.me(), queryFn: auth.me });
        const invite = pendingInvite();
        await (invite
          ? navigate({ to: '/accept-invite', search: { token: invite } })
          : navigate({ to: '/orgs' }));
      } catch {
        setServerError('Email verified, but could not load your profile. Please try again.');
      }
    },
    onError: (err) => {
      setServerError(
        err instanceof ApiError ? err.message : 'Verification failed. The link may have expired.',
      );
    },
  });

  // Auto-verify if token is in URL
  useEffect(() => {
    if (search.token && !submittedTokens.has(search.token)) {
      submittedTokens.add(search.token);
      verifyMutation.mutate(search.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resendMutation = useMutation({
    mutationFn: (email: string) => auth.resendVerification(email),
    onSuccess: () => setResendDone(true),
  });

  const resendForm = useForm({
    defaultValues: { email: '' },
    onSubmit: ({ value }) => resendMutation.mutate(value.email),
  });

  if (verifyMutation.isPending) {
    return <PageLoader label="Verifying your email" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          {serverError
            ? 'The link may have expired. Request a new one below.'
            : 'Enter the token from your email, or click the link in the email.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {serverError && <Alert variant="destructive">{serverError}</Alert>}

        {/* Manual token entry */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void (async () => {
              const token = (e.currentTarget.elements.namedItem('token') as HTMLInputElement).value;
              verifyMutation.mutate(token);
            })();
          }}
          className="space-y-3"
        >
          <div className="space-y-1">
            <Label htmlFor="token">Verification token</Label>
            <Input id="token" name="token" placeholder="Paste token from email" />
          </div>
          <Button type="submit" className="w-full" disabled={verifyMutation.isPending}>
            Verify
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or resend</span>
          </div>
        </div>

        {resendDone ? (
          <Alert variant="success">A new verification email has been sent.</Alert>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void resendForm.handleSubmit();
            }}
            className="space-y-3"
          >
            <resendForm.Field name="email">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor="resend-email">Your email</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="ada@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </resendForm.Field>
            <Button
              type="submit"
              variant="outline"
              className="w-full"
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending && <Spinner className="mr-2" />}
              Resend verification email
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
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
