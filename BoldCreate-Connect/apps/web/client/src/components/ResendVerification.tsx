import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { auth, ApiError } from '@/lib/api';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

/** Matches the server's wait between two verification mails for one address. */
const COOLDOWN_SECONDS = 60;

/**
 * Sends the verification mail again. The button waits out the same minute the server does, and
 * says so, so a person who clicks it right after sign-up is not left guessing.
 */
export function ResendVerification({
  email,
  startsWaiting = false,
}: {
  email: string;
  /** True straight after sign-up, when a mail has only just gone out. */
  startsWaiting?: boolean;
}) {
  const [wait, setWait] = useState(startsWaiting ? COOLDOWN_SECONDS : 0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (wait <= 0) return;
    const timer = setTimeout(() => setWait((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  const resend = useMutation({
    mutationFn: () => auth.resendVerification(email),
    onSuccess: () => {
      setSent(true);
      setWait(COOLDOWN_SECONDS);
    },
  });

  return (
    <div className="space-y-3">
      {sent && wait > 0 && (
        <Alert variant="success" role="status">
          We sent another link to {email}.
        </Alert>
      )}
      {resend.isError && (
        <Alert variant="destructive">
          {resend.error instanceof ApiError ? resend.error.message : 'Could not send the email'}
        </Alert>
      )}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={wait > 0 || resend.isPending}
        onClick={() => resend.mutate()}
      >
        {resend.isPending && <Spinner className="mr-2" />}
        {wait > 0 ? `Resend email in ${wait}s` : 'Resend email'}
      </Button>
    </div>
  );
}
