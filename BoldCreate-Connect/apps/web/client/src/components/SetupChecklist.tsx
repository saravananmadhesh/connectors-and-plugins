import { Link } from '@tanstack/react-router';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ArrowRight, Check, Circle } from 'lucide-react';
import { orgApiKeys, installations } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { useSetupFlag } from '@/lib/setup-progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/** Installed plugins whose variables are checked; more than this is far past setup. */
const CHECKED_INSTALLS = 10;

interface Step {
  id: string;
  title: string;
  hint: string;
  to: string;
  done: boolean;
  /** Set for a step only the user can confirm; the button flips it. */
  confirm?: { label: string; onToggle: () => void };
}

/**
 * What a team does first, in order. A step is ticked when the data proves it: a plugin is
 * installed, every installed plugin has its required variables, a key exists. Two steps no data can
 * prove (browsing, connecting an agent) are remembered in the browser; browsing also counts once
 * anything is installed, and connecting is confirmed by the user.
 */
export function SetupChecklist({ orgId }: { orgId: string }) {
  // Plugins can be installed for the whole organization or for the user alone; either means the
  // team has a plugin. The keys match the Installed page so its data is shared.
  const scopes = ['org', 'me'] as const;
  const lists = useQueries({
    queries: scopes.map((scope) => ({
      queryKey: [...qk.installations(scope), orgId],
      queryFn: () => installations.list(orgId, scope),
      retry: false,
    })),
  });
  const keys = useQuery({
    queryKey: qk.orgApiKeys(orgId),
    queryFn: () => orgApiKeys.list(orgId),
  });
  const items = lists.flatMap((list, index) =>
    (list.data?.items ?? []).map((item) => ({ scope: scopes[index] ?? 'org', id: item.id })),
  );
  const checked = items.slice(0, CHECKED_INSTALLS);
  const variables = useQueries({
    queries: checked.map((item) => ({
      queryKey: qk.variables(item.scope, item.id),
      queryFn: () => installations.listVariables(orgId, item.scope, item.id),
    })),
  });
  const [browsed] = useSetupFlag('browsed-marketplace', orgId);
  const [connected, setConnected] = useSetupFlag('connected-agent', orgId);
  // The organization list decides when to show; the personal list may be refused.
  if (lists[0]?.isPending || keys.isPending) return null;

  const hasInstall = checked.length > 0;
  const hasKey = (keys.data?.items ?? []).some((key) => !key.revokedAt);
  // Only a plugin whose variables loaded and are all given counts; a failed read is not a yes.
  const configured =
    hasInstall &&
    variables.every(
      (query) =>
        query.data !== undefined &&
        query.data.items.every((value) => !value.required || value.isSet),
    );
  const steps: Step[] = [
    {
      id: 'browse',
      title: 'Browse the marketplace',
      hint: 'Find a plugin for your team.',
      to: `/orgs/${orgId}/marketplace`,
      done: browsed || hasInstall,
    },
    {
      id: 'install',
      title: 'Install a plugin',
      hint: 'Review what it brings in, then install it.',
      to: `/orgs/${orgId}/marketplace`,
      done: hasInstall,
    },
    {
      id: 'configure',
      title: 'Configure it',
      hint: 'Give every installed plugin the variables it asks for.',
      to: `/orgs/${orgId}/installed`,
      done: configured,
    },
    {
      id: 'key',
      title: 'Create an API key',
      hint: 'Give your agent access to your tools.',
      to: `/orgs/${orgId}/api-keys`,
      done: hasKey,
    },
    {
      id: 'connect',
      title: 'Connect your agent',
      hint: 'Copy a setup snippet into your agent so it can use your plugins.',
      to: `/orgs/${orgId}/api-keys`,
      done: connected,
      confirm: {
        label: connected ? 'Mark not done' : 'Mark done',
        onToggle: () => setConnected(!connected),
      },
    },
  ];
  const finished = steps.filter((step) => step.done).length;

  return (
    <Card className="space-y-3 p-4" aria-label="Setup checklist">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold">Next steps</h2>
        <span className="text-xs text-muted-foreground">
          {finished} of {steps.length} done
        </span>
      </div>
      <div
        role="meter"
        aria-label="Setup progress"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={finished}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${(finished / steps.length) * 100}%` }}
        />
      </div>
      {finished === steps.length && (
        <p role="status" className="text-sm text-muted-foreground">
          All set. Your team is ready to use its tools.
        </p>
      )}
      <ol className="divide-y">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2">
            <Link
              to={step.to}
              className="flex min-w-0 flex-1 items-center gap-3 py-2.5 text-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {step.done ? (
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-medium">
                  {step.title}
                  <span className="sr-only">{step.done ? ' (done)' : ' (not done)'}</span>
                </span>
                <span className="block text-xs text-muted-foreground">{step.hint}</span>
              </span>
              {!step.confirm && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </Link>
            {step.confirm && (
              <Button
                variant="outline"
                size="sm"
                aria-pressed={step.done}
                onClick={step.confirm.onToggle}
              >
                {step.confirm.label}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}
