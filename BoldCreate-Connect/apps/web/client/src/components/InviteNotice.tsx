import { useState } from 'react';
import { Alert } from '@/components/ui/alert';
import { pendingInviteEmail, pendingInviteOrg } from '@/lib/pending-invite';

/** Tells someone who came from an invitation what the form they are on leads to. */
export function InviteNotice({ action }: { action: 'sign in' | 'sign up' }) {
  const [org] = useState(pendingInviteOrg);
  const [email] = useState(pendingInviteEmail);
  if (org === null) return null;
  return (
    <Alert variant="success">
      {action === 'sign up'
        ? `You are joining ${org}. Choose a password for ${email ?? 'your address'} and you will go straight in.`
        : `Sign in to join ${org}${email ? ` as ${email}` : ''}.`}
    </Alert>
  );
}
