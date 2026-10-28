/**
 * The organization's For You API keys: list, create (the key is shown once) and revoke. The
 * key lets a host application sync and call the organization's plugins.
 */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { KeyRound, Plus } from 'lucide-react';
import {
  auth,
  orgApiKeys,
  type ApiKeyCreatedResponse,
  type ApiKeyResponse,
  ApiError,
} from '@/lib/api';
import { useActiveOrg } from '@/lib/active-org';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { activeKeys } from '@/lib/active-keys';
import { ApiKeyTable } from '@/components/ApiKeyTable';
import { CreateApiKeyDialog, RawKeyDialog } from '@/components/ApiKeyDialogs';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ConnectAgentPanel } from '@/components/ConnectAgentPanel';
import { EmptyState } from '@/components/EmptyState';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';

export function ApiKeysPage() {
  const qc = useQueryClient();
  const me = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const memberships = Array.isArray(me.data?.memberships) ? me.data.memberships : [];
  const { orgId } = useActiveOrg(memberships.map((m) => m.organizationId));
  const orgName = memberships.find((m) => m.organizationId === orgId)?.organizationName;

  const [showCreate, setShowCreate] = useState(false);
  const [newKey, setNewKey] = useState<ApiKeyCreatedResponse | null>(null);
  const [revoking, setRevoking] = useState<ApiKeyResponse | undefined>();
  const [error, setError] = useState('');

  const {
    data,
    isLoading,
    error: loadError,
    refetch,
  } = useQuery({
    queryKey: qk.orgApiKeys(orgId ?? ''),
    queryFn: () => orgApiKeys.list(orgId ?? ''),
    enabled: Boolean(orgId),
  });
  const items = activeKeys(data?.items ?? []);

  const revoke = useMutation({
    mutationFn: (key: ApiKeyResponse) => orgApiKeys.revoke(orgId ?? '', key.id),
    onSuccess: async () => {
      setError('');
      setRevoking(undefined);
      await qc.invalidateQueries({ queryKey: qk.orgApiKeys(orgId ?? '') });
    },
    onError: (err) => {
      setRevoking(undefined);
      setError(err instanceof ApiError ? err.message : 'Failed');
    },
  });

  const createButton = (className?: string) => (
    <Button className={className} onClick={() => setShowCreate(true)} disabled={!orgId}>
      <Plus />
      Create key
    </Button>
  );

  return (
    <Page className="space-y-6">
      <PageHeader
        title="API keys"
        description={
          orgName
            ? `The For You keys of ${orgName}. A host application uses one to sync and call your plugins.`
            : 'An agent uses a key to reach your tools through the gateway.'
        }
      >
        {items.length > 0 && createButton()}
      </PageHeader>

      {error && <Alert variant="destructive">{error}</Alert>}

      {(me.isLoading || isLoading) && (
        <Skeleton className="h-40 w-full" role="status" aria-label="Loading keys" />
      )}

      {loadError && (
        <Alert variant="destructive" className="flex items-center justify-between gap-3">
          <span>Could not load the API keys. Check your connection and try again.</span>
          <Button size="sm" variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        </Alert>
      )}

      {data && items.length === 0 && (
        <EmptyState
          icon={KeyRound}
          title="No API keys yet"
          description="Create a key and paste it into your agent to let it use your installed plugins."
        >
          {createButton('mt-2')}
        </EmptyState>
      )}

      {items.length > 0 && <ApiKeyTable items={items} onRevoke={setRevoking} />}

      <ConnectAgentPanel />

      {showCreate && orgId && (
        <CreateApiKeyDialog
          create={(body) => orgApiKeys.create(orgId, body)}
          onCreated={(key) => {
            void qc.invalidateQueries({ queryKey: qk.orgApiKeys(orgId) });
            setShowCreate(false);
            setNewKey(key);
          }}
          onClose={() => setShowCreate(false)}
        />
      )}

      {newKey && <RawKeyDialog rawKey={newKey.rawKey} onDone={() => setNewKey(null)} />}

      <ConfirmDialog
        open={Boolean(revoking)}
        title={`Revoke ${revoking?.name ?? 'key'}?`}
        description="Agents that use this key lose access immediately. This cannot be undone."
        confirmLabel="Revoke"
        pending={revoke.isPending}
        onConfirm={() => revoking && revoke.mutate(revoking)}
        onClose={() => setRevoking(undefined)}
      />
    </Page>
  );
}
