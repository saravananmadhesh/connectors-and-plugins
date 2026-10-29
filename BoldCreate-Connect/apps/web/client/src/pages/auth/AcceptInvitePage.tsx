import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, orgs, ApiError } from '@/lib/api';
import type { InvitePreviewResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { forgetInvite, rememberInvite } from '@/lib/pending-invite';
import { PUBLIC_ROLE_LABELS } from '@/lib/role-labels';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { PageLoader } from '@/components/PageLoader';
import { Spinner } from '@/components/ui/spinner';

// An invite link works once and the page can mount more than once while the router settles, so a
// token already in flight is not submitted again.
const submittedTokens = new Set<string>();

type Failure = 'expired' | 'other_address' | 'other';

/** Lands from the link in an invitation email. */
export function AcceptInvitePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { token } = useSearch({ strict: false }) as { token?: string };
  const [failure, setFailure] = useState<Failure | null>(null);
  const [preview, setPreview] = useState<InvitePreviewResponse | 'failed' | null>(null);

  // Asked directly rather than through the query cache: a signed-out answer (401) clears the
  // cache, which would drop an in-flight query and leave this page waiting forever.
  const [session, setSession] = useState<'checking' | 'in' | 'out'>('checking');
  useEffect(() => {
    let live = true;
    auth.me().then(
      () => live && setSession('in'),
      () => live && setSession('out'),
    );
    return () => {
      live = false;
    };
  }, []);
  const signedIn = session === 'in';
  const signedOut = session === 'out';

  const accept = useMutation({
    mutationFn: (value: string) => orgs.acceptInvite(value),
    onSettled: (_data, _error, value) => submittedTokens.delete(value),
    onSuccess: async (result) => {
      forgetInvite();
      await qc.invalidateQueries({ queryKey: qk.me() });
      // The overview is open to every role; the layout sends a viewer past the For You pages.
      await navigate({ to: '/orgs/$orgId', params: { orgId: result.orgId } });
    },
    onError: (err) => {
      if (err instanceof ApiError && err.status === 409) {
        // Already in the organization: nothing left to accept.
        forgetInvite();
        void navigate({ to: '/orgs' });
        return;
      }
      forgetInvite();
      setFailure(
        err instanceof ApiError && err.status === 403
          ? 'other_address'
          : err instanceof ApiError && err.status === 400
            ? 'expired'
            : 'other',
      );
    },
  });

  useEffect(() => {
    if (!token) return;
    if (signedIn && !submittedTokens.has(token)) {
      submittedTokens.add(token);
      accept.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, signedIn]);

  // Someone signed out may not have an account yet, so the link is looked up without a session.
  useEffect(() => {
    if (!token || !signedOut) return;
    let live = true;
    orgs.previewInvite(token).then(
      (result) => {
        if (!live) return;
        if (result.state === 'valid')
          rememberInvite(token, {
            email: result.email,
            organizationName: result.organizationName,
          });
        else forgetInvite();
        setPreview(result);
      },
      () => {
        if (!live) return;
        rememberInvite(token);
        setPreview('failed');
      },
    );
    return () => {
      live = false;
    };
  }, [token, signedOut]);

  const signOut = useMutation({
    mutationFn: auth.signout,
    onSuccess: async () => {
      qc.clear();
      if (token) rememberInvite(token);
      await navigate({ to: '/signin' });
    },
  });

  let title = 'Join the organization';
  let description = 'Accepting your invitation.';
  let body: React.ReactNode = <PageLoader label="Accepting your invitation" />;

  if (!token) {
    title = 'Invitation link incomplete';
    description = 'This link is missing its token.';
    body = (
      <Alert variant="destructive">
        Open the link from your invitation email, or ask for a new invitation.
      </Alert>
    );
  } else if (
    failure === 'expired' ||
    (preview !== null && preview !== 'failed' && preview.state !== 'valid')
  ) {
    title = 'Invitation expired';
    description = 'This invitation has expired or is no longer valid.';
    body = (
      <div className="space-y-3">
        <Alert variant="destructive">
          Ask the person who invited you to send a new invitation, or sign up on your own.
        </Alert>
        <Button asChild className="w-full">
          {signedIn ? (
            <Link to="/orgs">Go to your organization</Link>
          ) : (
            <Link to="/signup">Sign up</Link>
          )}
        </Button>
      </div>
    );
  } else if (failure === 'other_address') {
    title = 'Different email address';
    description = 'This invitation was sent to a different email address.';
    body = (
      <div className="space-y-3">
        <Alert variant="destructive">
          You are signed in with another address. Sign out and sign in with the address that
          received the invitation.
        </Alert>
        <Button className="w-full" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
          {signOut.isPending && <Spinner className="mr-2" />}
          Sign out
        </Button>
      </div>
    );
  } else if (failure === 'other') {
    title = 'Could not accept the invitation';
    description = 'Something went wrong.';
    body = (
      <div className="space-y-3">
        <Alert variant="destructive">Please try again in a moment.</Alert>
        <Button
          className="w-full"
          onClick={() => {
            setFailure(null);
            accept.mutate(token);
          }}
        >
          Try again
        </Button>
      </div>
    );
  } else if (signedOut && preview === null) {
    // Looking the link up; the spinner stays.
  } else if (signedOut) {
    const invited = preview !== 'failed' && preview !== null ? preview : null;
    title = invited ? `Join ${invited.organizationName}` : "You've been invited";
    const role = invited ? PUBLIC_ROLE_LABELS[invited.role!] : null;
    // One clear next step: sign in when the address is already registered, otherwise choose a
    // password. The other path stays one small link away.
    const registered = invited?.registered ?? null;
    description = invited
      ? registered
        ? `Sign in as ${invited.email} to join as ${role}.`
        : `Choose a password for ${invited.email} to join as ${role}.`
      : 'Sign in or sign up with the address that received the invitation.';
    const signIn = (
      <Button asChild className="w-full" variant={registered === false ? 'outline' : 'default'}>
        <Link to="/signin">Sign in</Link>
      </Button>
    );
    const signUp = (
      <Button asChild className="w-full" variant={registered === true ? 'outline' : 'default'}>
        <Link to="/signup">{registered === false ? 'Create password and join' : 'Sign up'}</Link>
      </Button>
    );
    body = (
      <div className="space-y-3">
        {registered === false ? signUp : signIn}
        <p className="text-center text-sm text-muted-foreground">
          {registered === false ? 'Already registered? ' : registered ? 'New here? ' : ''}
          {registered === null ? null : (
            <Link
              to={registered ? '/signup' : '/signin'}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {registered ? 'Sign up' : 'Sign in'}
            </Link>
          )}
        </p>
        {registered === null && signUp}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
