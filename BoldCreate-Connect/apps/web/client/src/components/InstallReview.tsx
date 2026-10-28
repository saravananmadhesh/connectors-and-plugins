import { useQuery } from '@tanstack/react-query';
import { marketplace, type PluginVersionReviewResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const KIND_LABEL: Record<PluginVersionReviewResponse['components'][number]['kind'], string> = {
  agent: 'Agents',
  skill: 'Skills',
  mcp: 'MCP servers',
  hook: 'Hooks',
  rule: 'Rules',
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

/** What installing a version brings in: files, hooks and their commands, MCP servers, variables. */
export function InstallReview({ versionId }: { versionId: string }) {
  const review = useQuery({
    queryKey: qk.marketplaceVersionReview(versionId),
    queryFn: () => marketplace.getVersionReview(versionId),
  });

  if (review.isPending) return <Skeleton className="h-40 w-full" />;
  if (review.isError) {
    return <Alert variant="destructive">Could not load what this version contains.</Alert>;
  }

  const data = review.data;
  if (!data.scanned) {
    return (
      <Alert>
        This version has no recorded scan, so its contents cannot be listed. Ask an administrator to
        re-sync the plugin if you need the details first.
      </Alert>
    );
  }

  const counts = (Object.keys(KIND_LABEL) as (keyof typeof KIND_LABEL)[])
    .map((kind) => ({ kind, n: data.components.filter((c) => c.kind === kind).length }))
    .filter((entry) => entry.n > 0);

  return (
    <div className="max-h-72 space-y-4 overflow-y-auto pr-1 text-sm" data-testid="install-review">
      <p className="text-muted-foreground">
        {data.fileCount} {data.fileCount === 1 ? 'file' : 'files'} · {formatBytes(data.totalBytes)}
      </p>

      {data.findingCount > 0 && (
        <Alert variant="warning">
          The scan flagged {data.findingCount} {data.findingCount === 1 ? 'file' : 'files'} that may
          contain a secret. An administrator approved this version, but check before you install.
        </Alert>
      )}

      <Section title="Components">
        {counts.length === 0 ? (
          <p className="text-muted-foreground">Nothing to install.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {counts.map(({ kind, n }) => (
              <li key={kind}>
                <Badge variant="outline">
                  {KIND_LABEL[kind]} · {n}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {data.hookCommands.length > 0 && (
        <Section title="Hooks run these commands">
          <ul className="space-y-1">
            {data.hookCommands.map((hook, index) => (
              <li key={`${hook.event}-${index}`} className="rounded-md border px-2 py-1.5">
                <span className="text-xs text-muted-foreground">{hook.event}</span>
                <code className="block break-all font-mono text-xs">{hook.command}</code>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.mcpServers.length > 0 && (
        <Section title="MCP servers">
          <ul className="space-y-1">
            {data.mcpServers.map((server) => (
              <li key={server.name} className="rounded-md border px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{server.name}</span>
                  <Badge variant="outline">{server.transport}</Badge>
                </div>
                <code className="block break-all font-mono text-xs text-muted-foreground">
                  {server.url ?? server.command}
                </code>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.variables.length > 0 && (
        <Section title="Variables you will set">
          <ul className="space-y-1">
            {data.variables.map((variable) => (
              <li key={variable.name} className="flex items-start gap-2">
                <code className="font-mono text-xs">{variable.name}</code>
                {variable.required && <Badge variant="outline">required</Badge>}
                {variable.secret && <Badge variant="outline">secret</Badge>}
                {variable.description && (
                  <span className="text-xs text-muted-foreground">{variable.description}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.skipped.length > 0 && (
        <Section title="Left out">
          <ul className="space-y-0.5">
            {data.skipped.map((item) => (
              <li key={`${item.path}-${item.reason}`} className="text-xs text-muted-foreground">
                <code className="font-mono">{item.path}</code> · {item.reason}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
