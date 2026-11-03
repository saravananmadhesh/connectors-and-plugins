import { useState } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import {
  Bot,
  ChevronRight,
  ExternalLink,
  Plug,
  ScrollText,
  Sparkles,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import type {
  ComponentKind,
  ComponentSummary,
  PluginDetailResponse,
  PluginVersionListResponse,
} from '@/lib/api';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs } from '@/components/ui/tabs';
import { InfoHint } from '@/components/InfoHint';
import { PluginMarks } from '@/components/PluginMarks';
import { PluginTile } from '@/components/PluginTile';
import { formatDate, relativeTime } from '@/lib/format';

const KIND_LABELS: Record<ComponentKind, string> = {
  agent: 'Agents',
  skill: 'Skills',
  mcp: 'MCP servers',
  hook: 'Hooks',
  rule: 'Rules',
};

const KIND_ICONS: Record<ComponentKind, LucideIcon> = {
  agent: Bot,
  skill: Sparkles,
  mcp: Plug,
  hook: Webhook,
  rule: ScrollText,
};

const KIND_ORDER: ComponentKind[] = ['agent', 'skill', 'mcp', 'hook', 'rule'];

type Tab = 'customizations' | 'versions';

/** Customizations of one kind shown before the rest are folded away. */
const VISIBLE_PER_KIND = 5;

/** One customization: its kind icon, title, description and, for an MCP server, how it is reached. */
function CustomizationCard({ component }: { component: ComponentSummary }) {
  const Icon = KIND_ICONS[component.kind];
  const body = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-medium">{component.name}</span>
          {component.transport && (
            <Badge variant="secondary" className="uppercase">
              {component.transport}
            </Badge>
          )}
        </span>
        {component.description && !(component.url && component.description === component.url) && (
          <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">
            {component.description}
          </span>
        )}
        {component.url && (
          <span className="mt-1 block truncate font-mono text-xs text-muted-foreground">
            {component.url}
          </span>
        )}
      </span>
    </>
  );
  const frame = 'flex items-center gap-3 rounded-xl border bg-card px-4 py-3';
  if (!component.sourceUrl) return <div className={frame}>{body}</div>;
  return (
    <a
      href={component.sourceUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`${frame} transition-colors hover:bg-accent/50`}
    >
      {body}
      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground"
        aria-label="Opens on GitHub"
      />
    </a>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{children}</dd>
    </div>
  );
}

/** A fact for the strip under the header, in the same frame as the others. */
export function DetailStat({ label, children }: { label: string; children: React.ReactNode }) {
  return <Stat label={label}>{children}</Stat>;
}

/**
 * What a plugin is and ships: header, facts, customizations and versions. The marketplace page and
 * a project's plugins view both show it; each passes its own actions and its own last fact.
 */
export function PluginDetailView({
  detail,
  versions,
  action,
  extraStat,
}: {
  detail: PluginDetailResponse;
  versions: Pick<UseQueryResult<PluginVersionListResponse>, 'isPending' | 'error' | 'data'>;
  /** The controls at the right of the header, such as install or add. */
  action?: React.ReactNode;
  /** The last fact of the strip, built with DetailStat. */
  extraStat?: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>('customizations');
  const [expanded, setExpanded] = useState<ReadonlySet<ComponentKind>>(new Set());
  const kinds = KIND_ORDER.filter((kind) => detail.components.some((c) => c.kind === kind));
  const countOf = (kind: ComponentKind) => detail.components.filter((c) => c.kind === kind).length;
  const tabs: { value: Tab; label: string; count?: number }[] = [
    { value: 'customizations', label: 'Customizations' },
    { value: 'versions', label: 'Versions', count: versions.data?.items.length },
  ];
  const toggleKind = (kind: ComponentKind) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (!next.delete(kind)) next.add(kind);
      return next;
    });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs sm:flex-row sm:items-start">
        <PluginTile className="size-16 rounded-xl" src={detail.logoUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {detail.repositoryUrl ? (
                <a
                  href={detail.repositoryUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  aria-label={`${detail.displayName} on GitHub`}
                >
                  {detail.displayName}
                  <ExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />
                </a>
              ) : (
                detail.displayName
              )}
            </h1>
            <PluginMarks verified={detail.verified} featured={detail.featured} />
            {detail.status === 'deprecated' && (
              <>
                <Badge variant="warning">Deprecated</Badge>
                <InfoHint about="deprecated">
                  The publisher no longer recommends this plugin. It still works where installed.
                </InfoHint>
              </>
            )}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{detail.name}</span>
            {detail.latestVersion && (
              <Badge variant="secondary" className="font-sans">
                v{detail.latestVersion.version}
              </Badge>
            )}
          </p>
          <p className="mt-3 max-w-3xl text-sm whitespace-pre-line text-muted-foreground">
            {detail.description || detail.summary}
          </p>
          {detail.categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {detail.categories.map((category) => (
                <Badge key={category.slug} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {action && (
          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">{action}</div>
        )}
      </header>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Latest version">
          {detail.latestVersion ? `v${detail.latestVersion.version}` : 'Nothing published'}
        </Stat>
        <Stat label="Customizations">
          {detail.components.length === 0 ? (
            'None'
          ) : (
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {kinds.map((kind) => (
                <span key={kind} className="inline-flex items-center gap-1">
                  {(() => {
                    const Icon = KIND_ICONS[kind];
                    return <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />;
                  })()}
                  <span className="tabular-nums">{countOf(kind)}</span>
                  <span className="sr-only">{KIND_LABELS[kind]}</span>
                </span>
              ))}
            </span>
          )}
        </Stat>
        <Stat label="Updated">
          <time dateTime={detail.updatedAt} title={new Date(detail.updatedAt).toLocaleString()}>
            {relativeTime(detail.updatedAt)}
          </time>
        </Stat>
        {extraStat}
      </dl>

      <Tabs label="Plugin contents" tabs={tabs} value={tab} onChange={setTab}>
        {tab === 'customizations' && (
          <div className="space-y-6">
            {kinds.length === 0 && (
              <p className="text-sm text-muted-foreground">This plugin has no customizations.</p>
            )}
            {kinds.map((kind) => {
              const Icon = KIND_ICONS[kind];
              const items = detail.components.filter((component) => component.kind === kind);
              const open = expanded.has(kind);
              const shown = open ? items : items.slice(0, VISIBLE_PER_KIND);
              return (
                <section key={kind} aria-label={KIND_LABELS[kind]}>
                  <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    {KIND_LABELS[kind]}
                  </h2>
                  <ul className="space-y-2">
                    {shown.map((component) => (
                      <li key={component.id}>
                        <CustomizationCard component={component} />
                      </li>
                    ))}
                  </ul>
                  {items.length > VISIBLE_PER_KIND && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1"
                      aria-expanded={open}
                      onClick={() => toggleKind(kind)}
                    >
                      {open
                        ? 'Show fewer'
                        : `Show ${items.length - VISIBLE_PER_KIND} more ${KIND_LABELS[kind].toLowerCase()}`}
                    </Button>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {tab === 'versions' && (
          <div>
            {versions.isPending && (
              <Skeleton className="h-24 w-full" role="status" aria-label="Loading versions" />
            )}
            {versions.error && (
              <Alert variant="destructive">Could not load the versions. Try again later.</Alert>
            )}
            {versions.data && versions.data.items.length === 0 && (
              <p className="text-sm text-muted-foreground">No published versions.</p>
            )}
            {versions.data && versions.data.items.length > 0 && (
              <ul className="divide-y overflow-hidden rounded-xl border bg-card">
                {versions.data.items.map((version) => (
                  <li
                    key={version.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono">v{version.version}</span>
                      {version.id === detail.latestVersion?.id && (
                        <Badge variant="info">Latest</Badge>
                      )}
                    </span>
                    <span className="text-muted-foreground">{formatDate(version.publishedAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}
