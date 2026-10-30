import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Activity, Bug, Search } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { ErrorList } from '../components/observability/ErrorList';
import { EventList } from '../components/observability/EventList';
import { OverviewPanel } from '../components/observability/OverviewPanel';
import { StoragePanel } from '../components/observability/StoragePanel';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/button';
import { Input, Select } from '../components/ui/input';
import { Tabs, type TabItem } from '../components/ui/tabs';
import { ERROR_STATUS_TEXT, SERVICES, SEVERITY_TEXT, sinceOf } from '../lib/observability';
import {
  ERROR_STATUSES,
  EVENT_SEVERITIES,
  parseObservabilitySearch,
  type ObservabilitySearch,
  type ObservabilityTab,
} from '../lib/search';

const TABS: readonly TabItem<ObservabilityTab>[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'errors', label: 'Errors' },
  { value: 'events', label: 'Events' },
  { value: 'storage', label: 'Storage' },
];

const RANGES: [string, string][] = [
  ['', 'Any time'],
  ['1h', 'Last hour'],
  ['24h', 'Last 24 hours'],
  ['7d', 'Last 7 days'],
  ['30d', 'Last 30 days'],
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label}
      {children}
    </label>
  );
}

/** Errors that need attention, the key events around them, and how much room they take. */
export function ObservabilityPage() {
  const search = parseObservabilitySearch(useSearch({ strict: false }) as Record<string, unknown>);
  const navigate = useNavigate();
  const tab = search.tab ?? 'overview';
  const [kind, setKind] = useState(search.kind ?? '');
  const [words, setWords] = useState(search.q ?? '');
  // Time windows count back from when the page was opened, so the list does not shift.
  const [openedAt] = useState(() => Date.now());
  const since = useMemo(() => sinceOf(search.range, openedAt), [search.range, openedAt]);

  const update = (next: ObservabilitySearch) =>
    void navigate({
      to: '/observability',
      search: parseObservabilitySearch({ ...search, ...next }),
      replace: true,
    });
  const commitKind = () => {
    if (kind.trim() !== (search.kind ?? '')) update({ kind });
  };
  const commitWords = () => {
    if (words.trim() !== (search.q ?? '')) update({ q: words });
  };
  const changeTab = (next: ObservabilityTab) =>
    void navigate({
      to: '/observability',
      search: next === 'overview' ? {} : { tab: next },
      replace: true,
    });

  const filtered = Object.keys(search).some((key) => key !== 'tab' && key !== 'period');
  const range = (
    <Field label="When">
      <Select
        aria-label="When"
        value={search.range ?? ''}
        onChange={(event) => update({ range: event.target.value as ObservabilitySearch['range'] })}
      >
        {RANGES.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Field>
  );
  const service = (
    <Field label="Service">
      <Select
        aria-label="Service"
        value={search.service ?? ''}
        onChange={(event) => update({ service: event.target.value })}
      >
        <option value="">All services</option>
        {SERVICES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
    </Field>
  );
  const clear = filtered && (
    <Button
      variant="ghost"
      onClick={() => {
        setKind('');
        setWords('');
        void navigate({
          to: '/observability',
          search: { tab },
          replace: true,
        });
      }}
    >
      Clear filters
    </Button>
  );

  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Observability"
        description="Failures and key events from every service, so a problem can be found and fixed from here."
      />
      <Tabs label="Observability sections" tabs={TABS} value={tab} onChange={changeTab}>
        {tab === 'overview' && (
          <OverviewPanel
            period={search.period ?? '24h'}
            onPeriodChange={(period) => update({ period })}
          />
        )}
        {tab === 'errors' && (
          <>
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <Field label="Search">
                <span className="relative">
                  <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                  <Input
                    className="w-64 pl-8"
                    aria-label="Search"
                    value={words}
                    placeholder="Words in the error title"
                    onChange={(event) => setWords(event.target.value)}
                    onBlur={commitWords}
                    onKeyDown={(event) => event.key === 'Enter' && commitWords()}
                  />
                </span>
              </Field>
              <Field label="State">
                <Select
                  aria-label="State"
                  value={search.status ?? ''}
                  onChange={(event) =>
                    update({ status: event.target.value as ObservabilitySearch['status'] })
                  }
                >
                  <option value="">Any state</option>
                  {ERROR_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {ERROR_STATUS_TEXT[value]}
                    </option>
                  ))}
                </Select>
              </Field>
              {service}
              {range}
              {clear}
            </div>
            <ErrorList
              filters={{
                ...(search.status ? { status: search.status } : {}),
                ...(search.service ? { service: search.service } : {}),
                ...(search.q ? { q: search.q } : {}),
                ...(since ? { since } : {}),
              }}
              empty={
                filtered ? (
                  <EmptyState
                    icon={Bug}
                    title="No errors match these filters"
                    description="Try a wider time range or clear the filters."
                  />
                ) : (
                  <EmptyState
                    icon={Bug}
                    title="No errors have been reported"
                    description="Failures from the services show up here, grouped by cause, as they happen."
                  />
                )
              }
            />
          </>
        )}
        {tab === 'events' && (
          <>
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <Field label="Severity">
                <Select
                  aria-label="Severity"
                  value={search.severity ?? ''}
                  onChange={(event) =>
                    update({ severity: event.target.value as ObservabilitySearch['severity'] })
                  }
                >
                  <option value="">Any severity</option>
                  {EVENT_SEVERITIES.map((value) => (
                    <option key={value} value={value}>
                      {SEVERITY_TEXT[value]}
                    </option>
                  ))}
                </Select>
              </Field>
              {service}
              <Field label="Kind">
                <Input
                  className="w-56"
                  aria-label="Kind"
                  value={kind}
                  placeholder="startup_check_failed or key."
                  onChange={(event) => setKind(event.target.value)}
                  onBlur={commitKind}
                  onKeyDown={(event) => event.key === 'Enter' && commitKind()}
                />
              </Field>
              {range}
              {clear}
            </div>
            <EventList
              filters={{
                ...(search.severity ? { severity: search.severity } : {}),
                ...(search.service ? { service: search.service } : {}),
                ...(search.kind ? { kind: search.kind } : {}),
                ...(since ? { since } : {}),
              }}
              empty={
                filtered ? (
                  <EmptyState
                    icon={Activity}
                    title="No events match these filters"
                    description="Try a wider time range or clear the filters."
                  />
                ) : (
                  <EmptyState
                    icon={Activity}
                    title="No events have been recorded"
                    description="Deploys, failed startup checks and other key moments appear here."
                  />
                )
              }
            />
          </>
        )}
        {tab === 'storage' && <StoragePanel />}
      </Tabs>
    </div>
  );
}
