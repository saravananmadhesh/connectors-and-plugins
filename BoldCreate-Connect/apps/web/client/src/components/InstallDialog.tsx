import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import {
  ApiError,
  auth,
  installations,
  marketplace,
  mcpServers,
  type ScopeKey,
  type UpdatePolicy,
} from '@/lib/api';
import { hasAbility, useAbilities } from '@/lib/abilities';
import { hasSetupNeeds, setupNeeds } from '@/lib/install-setup';
import { qk } from '@/lib/query-keys';
import { useActiveOrg } from '@/lib/active-org';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { InstallReview } from '@/components/InstallReview';
import { InstallSetupPanel } from '@/components/InstallSetup';
import type { InstallScope } from '@/components/InstallMenu';

const POLICIES: { value: UpdatePolicy; label: string; hint: string }[] = [
  { value: 'pinned', label: 'Pinned', hint: 'Stay on this version until you change it.' },
  { value: 'follow_latest', label: 'Follow latest', hint: 'Move to each new version.' },
];

interface Props {
  pluginName: string;
  version: { id: string; version: string };
  scope: InstallScope;
  onClose: () => void;
}

type Outcome = { ok: true } | { ok: false; message: string };

const KIND_WORD: Record<string, string> = {
  agent: 'agent',
  skill: 'skill',
  mcp: 'MCP server',
  hook: 'hook',
  rule: 'rule',
};

/** One line on what the version brings in, with the full review a click away. */
function ReviewSummary({ versionId }: { versionId: string }) {
  const [showAll, setShowAll] = useState(false);
  const review = useQuery({
    queryKey: qk.marketplaceVersionReview(versionId),
    queryFn: () => marketplace.getVersionReview(versionId),
  });
  if (review.isPending) return <Skeleton className="h-10 w-full" />;
  if (review.isError) {
    return <Alert variant="destructive">Could not load what this version contains.</Alert>;
  }
  const data = review.data;
  const parts = Object.keys(KIND_WORD)
    .map((kind) => ({ kind, n: data.components.filter((c) => c.kind === kind).length }))
    .filter((entry) => entry.n > 0)
    .map((entry) => `${entry.n} ${KIND_WORD[entry.kind]}${entry.n === 1 ? '' : 's'}`);
  const notes = [
    data.hookCommands.length > 0 ? 'runs commands' : '',
    data.variables.length > 0 ? 'needs variables' : '',
    data.findingCount > 0 ? 'secret warning' : '',
  ].filter(Boolean);

  return (
    <div className="rounded-lg border px-3 py-2 text-sm">
      <button
        type="button"
        aria-expanded={showAll}
        className="flex w-full items-center gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setShowAll((value) => !value)}
      >
        <span className="min-w-0 flex-1">
          <span className="block">
            {data.scanned
              ? parts.length > 0
                ? parts.join(' · ')
                : 'Nothing to install'
              : 'No recorded scan'}
          </span>
          {notes.length > 0 && (
            <span className="block text-xs text-muted-foreground">{notes.join(' · ')}</span>
          )}
        </span>
        <span className="text-xs text-muted-foreground">{showAll ? 'Hide' : 'Review'}</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${showAll ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {showAll && (
        <div className="mt-3 border-t pt-3">
          <InstallReview versionId={versionId} />
        </div>
      )}
    </div>
  );
}

/**
 * Installs one plugin version for the team (the whole organization) or for the caller. When the
 * plugin asks for values or a sign-in, the same dialog goes on to ask for them.
 */
export function InstallDialog({ pluginName, version, scope, onClose }: Props) {
  const qc = useQueryClient();
  const me = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const orgIds = me.data?.memberships.map((m) => m.organizationId) ?? [];
  const { orgId } = useActiveOrg(orgIds);
  const { me: orgMe } = useAbilities(orgId ?? '');
  const orgName = me.data?.memberships.find((m) => m.organizationId === orgId)?.organizationName;

  const [updatePolicy, setUpdatePolicy] = useState<UpdatePolicy>('pinned');
  const [result, setResult] = useState<Outcome | undefined>();
  const [createdId, setCreatedId] = useState<string | undefined>();

  const orgAllowed = hasAbility(orgMe, 'installation:create');
  const finished = result !== undefined;
  const orgBlocked = scope === 'org' && !orgAllowed;

  const install = useMutation({
    mutationFn: async (): Promise<{ outcome: Outcome; created?: string }> => {
      if (!orgId) return { outcome: { ok: false, message: 'No organization' } };
      const body = { pluginVersionId: version.id, updatePolicy };
      try {
        const created = await installations.createFor(orgId, scope, body);
        void qc.invalidateQueries({ queryKey: qk.installations(scope === 'org' ? 'org' : 'me') });
        return { outcome: { ok: true }, created: created.id };
      } catch (err) {
        return {
          outcome: {
            ok: false,
            message: err instanceof ApiError ? err.message : 'Could not install',
          },
        };
      }
    },
    onSuccess: ({ outcome, created }) => {
      setResult(outcome);
      setCreatedId(created);
    },
  });

  // Only a whole-organization or personal install is set up here; its keys are `org` and `me`.
  const setupKey: ScopeKey = scope === 'org' ? 'org' : 'me';
  const afterInstall = createdId !== undefined && orgId !== undefined;
  const variables = useQuery({
    queryKey: qk.variables(setupKey, createdId ?? ''),
    queryFn: () => installations.listVariables(orgId ?? '', setupKey, createdId ?? ''),
    enabled: afterInstall,
  });
  const servers = useQuery({
    queryKey: qk.mcpServers(setupKey, createdId ?? ''),
    queryFn: () => mcpServers.list(orgId ?? '', setupKey, createdId ?? ''),
    enabled: afterInstall,
  });
  const checking = afterInstall && (variables.isPending || servers.isPending);
  const setupOpen =
    afterInstall &&
    variables.data !== undefined &&
    servers.data !== undefined &&
    hasSetupNeeds(
      setupNeeds(
        variables.data.items.filter((variable) => !variable.custom),
        servers.data.items,
      ),
    );

  const targetLabel = scope === 'org' ? 'for your team' : 'for you';
  const canSubmit = !finished && !install.isPending && !orgBlocked && Boolean(orgId);

  return (
    <Dialog open onOpenChange={(open) => !open && !install.isPending && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Install {pluginName}</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Version {version.version} · {targetLabel}
          {scope === 'org' && orgName ? ` (${orgName})` : ''}
        </p>

        <div className="mt-4 space-y-4">
          <Alert variant="warning">
            Check what this plugin contains before installing. It can add agents, skills, hooks that
            run commands and MCP servers that act on your behalf. Only install plugins you trust.
          </Alert>
          <ReviewSummary versionId={version.id} />

          {orgBlocked && (
            <Alert variant="warning">
              You need admin access to install for the organization. Pick just you instead.
            </Alert>
          )}

          {!finished && (
            <fieldset className="grid gap-1.5 sm:grid-cols-2" disabled={install.isPending}>
              <legend className="sr-only">Updates</legend>
              {POLICIES.map((policy) => (
                <label
                  key={policy.value}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-sm"
                >
                  <input
                    type="radio"
                    name="update-policy"
                    className="mt-1"
                    value={policy.value}
                    checked={updatePolicy === policy.value}
                    onChange={() => setUpdatePolicy(policy.value)}
                  />
                  <span>
                    <span className="block font-medium">{policy.label}</span>
                    <span className="block text-xs text-muted-foreground">{policy.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          {!finished && scope === 'org' && !orgBlocked && (
            <p className="text-xs text-muted-foreground">
              Replaces member installs of this plugin. Admins and members keep their own.
            </p>
          )}

          {result?.ok && <Alert variant="success">Installed.</Alert>}
          {result && !result.ok && <Alert variant="destructive">{result.message}</Alert>}
          {checking && (
            <Skeleton className="h-10 w-full" role="status" aria-label="Checking setup" />
          )}
          {setupOpen && createdId && orgId && (
            <InstallSetupPanel
              orgId={orgId}
              scopeKey={setupKey}
              installationId={createdId}
              pluginName={pluginName}
              onClose={onClose}
            />
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          {setupOpen ? null : finished ? (
            <>
              {result?.ok && (
                <Button asChild variant="outline">
                  <Link
                    to="/installed"
                    search={{ scope: scope === 'user' ? 'me' : scope }}
                    onClick={onClose}
                  >
                    View installed
                  </Link>
                </Button>
              )}
              <Button onClick={onClose}>Done</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose} disabled={install.isPending}>
                Cancel
              </Button>
              <Button onClick={() => install.mutate()} disabled={!canSubmit}>
                {install.isPending && <Spinner />}
                Install
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
