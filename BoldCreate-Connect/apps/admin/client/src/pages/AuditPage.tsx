import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ScrollText, Search } from 'lucide-react';
import { AuditList } from '../components/AuditList';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/button';
import { Input, Select } from '../components/ui/input';
import type { AdminAuditQuery } from '../lib/api';
import { AUDIT_RANGES, parseAuditSearch, type AuditSearch } from '../lib/search';

const GROUPS: [string, string][] = [
  ['', 'All activity'],
  ['plugin.', 'Plugins'],
  ['plugin_version.', 'Versions'],
  ['plugin_source.', 'Sources'],
  ['plugin_ingestion.', 'Syncs'],
  ['category.', 'Categories'],
  ['admin.', 'Admin sign-ins'],
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label}
      {children}
    </label>
  );
}

export function AuditPage() {
  const search = parseAuditSearch(useSearch({ strict: false }) as Record<string, unknown>);
  const navigate = useNavigate();
  const [actor, setActor] = useState(search.actor ?? '');
  // The time windows count back from when the page was opened, so the list does not shift.
  const [openedAt] = useState(() => Date.now());

  const update = (next: AuditSearch) =>
    void navigate({
      to: '/audit',
      search: parseAuditSearch({ ...search, ...next }),
      replace: true,
    });

  // Typing waits a moment before it reaches the address and the server.
  useEffect(() => {
    if (actor.trim() === (search.actor ?? '')) return;
    const timer = setTimeout(() => {
      void navigate({
        to: '/audit',
        search: parseAuditSearch({ ...search, actor }),
        replace: true,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [actor, search, navigate]);

  const since = useMemo(
    () =>
      search.range
        ? new Date(
            Math.floor((openedAt - AUDIT_RANGES[search.range]) / 60_000) * 60_000,
          ).toISOString()
        : undefined,
    [openedAt, search.range],
  );
  const filters: Partial<AdminAuditQuery> = {
    ...(search.action ? { action: search.action } : {}),
    ...(search.result ? { result: search.result } : {}),
    ...(search.actor ? { actorId: search.actor } : {}),
    ...(since ? { since } : {}),
  };
  const filtered = Object.keys(search).length > 0;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Audit"
        description="Who did what, and when, across the integrations platform. Visible to platform admins only."
      />
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <Field label="Who">
          <span className="relative">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              className="w-64 pl-8"
              value={actor}
              placeholder="Email or id of the actor"
              aria-label="Who"
              onChange={(event) => setActor(event.target.value)}
            />
          </span>
        </Field>
        <Field label="What">
          <Select
            aria-label="What"
            value={search.action ?? ''}
            onChange={(event) => update({ action: event.target.value })}
          >
            {GROUPS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Result">
          <Select
            aria-label="Result"
            value={search.result ?? ''}
            onChange={(event) => update({ result: event.target.value as AuditSearch['result'] })}
          >
            <option value="">Any result</option>
            <option value="success">Succeeded</option>
            <option value="failure">Failed</option>
            <option value="denied">Denied</option>
          </Select>
        </Field>
        <Field label="When">
          <Select
            aria-label="When"
            value={search.range ?? ''}
            onChange={(event) => update({ range: event.target.value as AuditSearch['range'] })}
          >
            <option value="">Any time</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </Select>
        </Field>
        {filtered && (
          <Button
            variant="ghost"
            onClick={() => {
              setActor('');
              void navigate({ to: '/audit', search: {}, replace: true });
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
      <AuditList
        filters={filters}
        empty={
          filtered ? (
            <EmptyState
              icon={ScrollText}
              title="No events match these filters"
              description="Try a wider time range or clear the filters."
            />
          ) : (
            <EmptyState
              icon={ScrollText}
              title="Nothing has been recorded yet"
              description="Sign-ins, syncs, reviews and every change to a plugin show up here as they happen."
            />
          )
        }
      />
    </div>
  );
}
