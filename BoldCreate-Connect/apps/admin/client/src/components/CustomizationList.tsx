import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import type { AdminVersionDetailResponse, ComponentKind } from '../lib/api';
import { githubFileUrl, type RepositoryFolder } from '../lib/github-url';
import { KIND_PLURAL } from '../lib/plugins';
import { Alert } from './ui/alert';
import { Button } from './ui/button';

const ORDER: ComponentKind[] = ['skill', 'agent', 'mcp', 'hook', 'rule'];

interface Props {
  scan: AdminVersionDetailResponse['scan'];
  /** Where the plugin lives; without it the names are shown but do not link. */
  repository: RepositoryFolder | null;
  /** The commit the version was read from; links point at exactly this one. */
  commitSha: string | null;
}

/**
 * The customizations of a version, one line per type to begin with. Opening a type lists its
 * customizations, and each one links to its file in the repository at the commit it was read from.
 */
export function CustomizationList({ scan, repository, commitSha }: Props) {
  const [open, setOpen] = useState<ReadonlySet<ComponentKind>>(new Set());
  if (!scan) return <Alert variant="info">The contents are not known for this version.</Alert>;
  if (scan.components.length === 0) {
    return <p className="text-sm text-muted-foreground">This version has no customizations.</p>;
  }
  const toggle = (kind: ComponentKind) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });

  return (
    <ul className="flex flex-col divide-y rounded-lg border">
      {ORDER.flatMap((kind) => {
        const items = scan.components.filter((component) => component.kind === kind);
        if (items.length === 0) return [];
        const expanded = open.has(kind);
        return [
          <li key={kind} aria-label={KIND_PLURAL[kind]}>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-medium"
              aria-expanded={expanded}
              onClick={() => toggle(kind)}
            >
              {expanded ? <ChevronDown /> : <ChevronRight />}
              {KIND_PLURAL[kind]}
              <span className="rounded-full bg-muted px-1.5 text-xs font-normal text-muted-foreground tabular-nums">
                {items.length}
              </span>
            </Button>
            {expanded && (
              <ul className="divide-y border-t bg-muted/20">
                {items.map((item) => {
                  const href =
                    repository && commitSha
                      ? githubFileUrl(repository, commitSha, item.path)
                      : null;
                  return (
                    <li key={`${kind}:${item.name}`} className="px-4 py-2 text-sm">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 font-medium hover:underline"
                        >
                          {item.name}
                          <ExternalLink className="size-3.5 text-muted-foreground" />
                        </a>
                      ) : (
                        <span className="font-medium">{item.name}</span>
                      )}
                      {item.description && (
                        <p className="text-muted-foreground">{item.description}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>,
        ];
      })}
    </ul>
  );
}
