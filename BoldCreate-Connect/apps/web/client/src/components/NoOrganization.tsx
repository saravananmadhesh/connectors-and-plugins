import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreateOrgDialog } from '@/components/CreateOrgDialog';
import { Page } from '@/components/Page';

/**
 * What a signed-in person sees when they belong to no organization: they joined one by invitation
 * and were removed from it, or an organization they were in was deleted. They can start one of
 * their own, or open the link of a new invitation.
 */
export function NoOrganization() {
  const [creating, setCreating] = useState(false);
  return (
    <Page>
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
          <Building2 aria-hidden="true" className="size-6" />
        </span>
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">You are not in an organization</h1>
          <p className="text-sm text-muted-foreground">
            Create one to start using plugins, or open the link in an invitation email to join an
            existing one.
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>Create organization</Button>
      </Card>
      {creating && <CreateOrgDialog onClose={() => setCreating(false)} />}
    </Page>
  );
}
