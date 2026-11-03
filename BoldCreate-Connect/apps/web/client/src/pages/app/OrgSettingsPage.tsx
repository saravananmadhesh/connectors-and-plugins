import { useParams } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { orgs, ApiError } from '@/lib/api';
import type { OrgPolicyResponse } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';

type Toggle = 'allowPersonalInstalls' | 'allowPersonalApiKeys';

const TOGGLES: { field: Toggle; id: string; label: string; hint: string }[] = [
  {
    field: 'allowPersonalInstalls',
    id: 'policy-personal-installs',
    label: 'Members can install plugins for themselves',
    hint: 'Turn off to allow installations at organization level only.',
  },
  {
    field: 'allowPersonalApiKeys',
    id: 'policy-personal-keys',
    label: 'Members can create personal API keys',
    hint: 'Turn off to stop members creating new personal keys. Existing keys keep working.',
  },
];

export function OrgSettingsPage() {
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const qc = useQueryClient();
  const [error, setError] = useState('');

  const policyQuery = useQuery({
    queryKey: qk.orgPolicy(orgId),
    queryFn: () => orgs.getPolicy(orgId),
  });
  const { can } = useAbilities(orgId);
  const canEdit = can('org-policy:update');

  const mutation = useMutation({
    mutationFn: (body: Partial<Pick<OrgPolicyResponse, Toggle>>) => orgs.updatePolicy(orgId, body),
    onSuccess: (policy) => {
      qc.setQueryData(qk.orgPolicy(orgId), policy);
      void qc.invalidateQueries({ queryKey: qk.orgMe(orgId) });
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : 'Failed to save the policy'),
  });

  const policy = policyQuery.data;

  return (
    <Page className="space-y-6">
      <PageHeader title="Settings" description="Rules for everyone in this organization." />

      {error && <Alert variant="destructive">{error}</Alert>}

      <Card>
        <CardHeader>
          <CardTitle>Member permissions</CardTitle>
          <CardDescription>
            {canEdit
              ? 'What members may create for themselves in this organization.'
              : 'Admins and members can change these settings. Viewers can only read them.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {policyQuery.isLoading || !policy ? (
            <Skeleton className="h-16 w-full" role="status" aria-label="Loading settings" />
          ) : (
            TOGGLES.map(({ field, id, label, hint }) => (
              <div key={field} className="flex items-start gap-3">
                <Checkbox
                  id={id}
                  className="mt-0.5"
                  checked={policy[field]}
                  disabled={!canEdit || mutation.isPending}
                  onChange={(event) => {
                    setError('');
                    mutation.mutate({ [field]: event.target.checked });
                  }}
                />
                <label htmlFor={id} className="text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="block text-xs text-muted-foreground">{hint}</span>
                </label>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Page>
  );
}
