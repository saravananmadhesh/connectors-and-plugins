import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { DiscoverCandidate } from '../components/DiscoverCandidate';
import { InstalledRepositories } from '../components/InstalledRepositories';
import { PageHeader } from '../components/PageHeader';
import { PluginLogo } from '../components/PluginLogo';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox, Switch } from '../components/ui/checkbox';
import { Input, Select } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs } from '../components/ui/tabs';
import { adminApi, type DiscoverPluginsResponse, type InstallPluginsResponse } from '../lib/api';
import {
  CANDIDATE_FILTERS,
  MAX_INSTALL_PATHS,
  candidateState,
  filterCandidates,
  needsAttention,
  type CandidateFilter,
} from '../lib/discover';
import { parseGithubUrl } from '../lib/github-url';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, SOURCES_KEY } from '../lib/plugins';
import { parseDiscoverSearch } from '../lib/search';

interface Options {
  featured: boolean;
  verified: boolean;
  private: boolean;
}

function InstallOutcome({ result }: { result: InstallPluginsResponse }) {
  const added = result.items.filter((item) => item.outcome === 'added').length;
  return (
    <Alert variant="success" role="region" aria-label="Install result" className="mt-3">
      <p className="font-medium">
        {added} plugin{added === 1 ? '' : 's'} queued, {result.items.length - added} already added.
      </p>
      <p className="mt-1">
        Each plugin arrives as a pending version. Review and publish it when it appears.
      </p>
      <p className="mt-2">
        <Link to="/review" className="underline">
          Go to Review
        </Link>{' '}
        ·{' '}
        <Link to="/plugins" className="underline">
          Go to Plugins
        </Link>
      </p>
    </Alert>
  );
}

function Results({ found, options }: { found: DiscoverPluginsResponse; options: Options }) {
  const queryClient = useQueryClient();
  const pickable = found.plugins
    .filter((plugin) => candidateState(plugin).key === 'available')
    .map((plugin) => plugin.path);
  const [selected, setSelected] = useState<string[]>(found.layout === 'plugin' ? pickable : []);
  const [installed, setInstalled] = useState<InstallPluginsResponse | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CandidateFilter>('all');
  const install = useMutation({
    mutationFn: () =>
      adminApi.installPlugins({
        owner: found.owner,
        repository: found.repository,
        ref: found.ref,
        paths: selected,
        featured: options.featured,
        verified: options.verified,
        visibility: options.private ? 'private' : 'public',
      }),
    onSuccess: async (result) => {
      setInstalled(result);
      setSelected([]);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
        queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
        queryClient.invalidateQueries({ queryKey: SOURCES_KEY }),
      ]);
    },
  });
  const toggle = (path: string) =>
    setSelected((current) => {
      if (current.includes(path)) return current.filter((item) => item !== path);
      return current.length < MAX_INSTALL_PATHS ? [...current, path] : current;
    });
  const limitReached = selected.length >= MAX_INSTALL_PATHS;
  const selectAll = () =>
    setSelected((current) =>
      [...new Set([...current, ...shownPickable])].slice(0, MAX_INSTALL_PATHS),
    );
  // Folders just queued show as installing without asking the server again.
  const justAdded = new Set(
    (installed?.items ?? []).filter((item) => item.outcome === 'added').map((item) => item.path),
  );
  const shown = filterCandidates(found.plugins, query, filter);
  const shownPickable = shown
    .filter((plugin) => candidateState(plugin).key === 'available')
    .map((plugin) => plugin.path);

  return (
    <section aria-label="Plugins found" className="mt-6">
      <div className="sticky top-0 z-10 -mx-1 flex flex-col gap-3 border-b bg-background/95 px-1 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3">
          <PluginLogo size="md" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-mono text-base font-semibold">
              {found.owner}/{found.repository}
            </h2>
            <p className="text-xs text-muted-foreground">
              {found.ref} · commit {found.commitSha.slice(0, 12)} ·{' '}
              {found.layout === 'collection'
                ? `lists ${found.plugins.length} plugin${found.plugins.length === 1 ? '' : 's'}`
                : 'a single plugin'}
            </p>
          </div>
          {found.plugins.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex gap-2 text-xs text-muted-foreground">
                {options.featured && <Badge variant="outline">Featured</Badge>}
                {options.verified && <Badge variant="info">Verified</Badge>}
                <Badge variant="outline">{options.private ? 'Private' : 'Public'}</Badge>
              </span>
              <Button
                onClick={() => install.mutate()}
                disabled={selected.length === 0 || install.isPending}
              >
                {install.isPending
                  ? 'Installing…'
                  : `Install ${selected.length} selected plugin${selected.length === 1 ? '' : 's'}`}
              </Button>
            </div>
          )}
        </div>
        {found.plugins.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, description or folder"
              aria-label="Search plugins"
              className="max-w-xs"
            />
            <Select
              value={filter}
              onChange={(event) => setFilter(event.target.value as CandidateFilter)}
              aria-label="Show"
              className="w-44"
            >
              {CANDIDATE_FILTERS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
              disabled={shownPickable.length === 0 || limitReached}
            >
              Select all that can be installed
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelected([])}
              disabled={selected.length === 0}
            >
              Clear selection
            </Button>
            <span className="ml-auto text-xs text-muted-foreground" aria-live="polite">
              Showing {shown.length} of {found.plugins.length}
            </span>
          </div>
        )}
      </div>
      {(limitReached || pickable.length > MAX_INSTALL_PATHS) && (
        <Alert variant="warning" role="status" className="mt-3">
          {limitReached
            ? `${MAX_INSTALL_PATHS} plugins are selected, the most one install can take. The rest cannot be selected until you install these or clear some. `
            : `${pickable.length} plugins can be installed, but one install takes at most ${MAX_INSTALL_PATHS}. Select all picks the first ${MAX_INSTALL_PATHS}. `}
          Install them, then inspect the repository again for the rest.
        </Alert>
      )}
      {install.isError && (
        <Alert variant="destructive" role="alert" className="mt-3">
          {errorMessage(install.error)}
        </Alert>
      )}
      {installed && <InstallOutcome result={installed} />}
      {found.notes.length > 0 && (
        <Alert className="mt-3">
          <p className="font-medium">Left out</p>
          <ul className="list-disc pl-5">
            {found.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Alert>
      )}
      {found.plugins.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">No plugins were found in this folder.</p>
      )}
      {found.plugins.length > 0 && shown.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">No plugin matches your search.</p>
      )}
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-3">
        {shown.map((plugin) => (
          <DiscoverCandidate
            key={plugin.path}
            plugin={
              justAdded.has(plugin.path)
                ? {
                    ...plugin,
                    installed: {
                      sourceId: plugin.path,
                      pluginId: null,
                      pluginStatus: null,
                      syncStatus: 'queued',
                      lastSyncedAt: null,
                      lastError: null,
                    },
                  }
                : plugin
            }
            checked={selected.includes(plugin.path)}
            limitReached={limitReached}
            onToggle={() => toggle(plugin.path)}
          />
        ))}
      </ul>
    </section>
  );
}

function FindPlugins() {
  const [url, setUrl] = useState('');
  const [branch, setBranch] = useState('');
  const [options, setOptions] = useState<Options>({
    featured: false,
    verified: false,
    private: false,
  });
  const [invalid, setInvalid] = useState(false);
  const inspect = useMutation({ mutationFn: adminApi.discoverPlugins });
  const [historyOpen, setHistoryOpen] = useState(true);
  // Shares its data with the added repositories tab; one entry per repository and branch.
  const sources = useQuery({ queryKey: SOURCES_KEY, queryFn: adminApi.listSources });
  const history = [
    ...new Map(
      (sources.data?.items ?? []).map((item) => [
        `${item.owner}/${item.repository}@${item.ref}`,
        { owner: item.owner, repository: item.repository, ref: item.ref },
      ]),
    ).values(),
  ];

  const pick = (item: { owner: string; repository: string; ref: string }) => {
    setHistoryOpen(false);
    setUrl(`https://github.com/${item.owner}/${item.repository}`);
    setBranch(item.ref);
    setInvalid(false);
    inspect.mutate({ ...item, path: '' });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const location = parseGithubUrl(url);
    setInvalid(location === null);
    if (!location) return;
    inspect.mutate({
      owner: location.owner,
      repository: location.repository,
      ref: branch.trim() || location.ref || 'main',
      path: location.path,
    });
  };

  return (
    <div>
      {historyOpen && history.length > 0 && (
        <section aria-label="Repository history" className="mb-4 max-w-4xl">
          <h2 className="mb-2 text-sm font-medium">Added before</h2>
          <ul className="flex flex-wrap gap-2">
            {history.map((item) => (
              <li key={`${item.owner}/${item.repository}@${item.ref}`}>
                <Button variant="outline" size="sm" onClick={() => pick(item)}>
                  <span className="font-mono">
                    {item.owner}/{item.repository}
                  </span>
                  <span className="text-muted-foreground">{item.ref}</span>
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Card className="max-w-4xl">
        <CardContent className="pt-5">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <Label>
              GitHub URL
              <Input
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setInvalid(false);
                }}
                placeholder="https://github.com/owner/repository"
                required
                aria-invalid={invalid}
              />
              <span className="text-xs font-normal text-muted-foreground">
                A link to a repository or to a folder on a branch, for example
                github.com/owner/repository/tree/main/plugins/tools.
              </span>
            </Label>
            <Label className="max-w-xs">
              Branch or tag (optional)
              <Input
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                placeholder="main"
              />
            </Label>
            <fieldset className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <legend className="mb-2 text-sm font-medium">Start the plugins as</legend>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={options.featured}
                  onChange={(event) => setOptions({ ...options, featured: event.target.checked })}
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={options.verified}
                  onChange={(event) => setOptions({ ...options, verified: event.target.checked })}
                />
                Verified
              </label>
              <label className="flex items-center gap-2">
                <Switch
                  checked={options.private}
                  onCheckedChange={(value) => setOptions({ ...options, private: value })}
                  aria-label="Private"
                />
                Private (hidden from members)
              </label>
            </fieldset>
            {invalid && (
              <Alert variant="destructive" role="alert">
                That is not a GitHub repository link. Use https://github.com/owner/repository or
                owner/repository.
              </Alert>
            )}
            {inspect.isError && (
              <Alert variant="destructive" role="alert">
                {errorMessage(inspect.error)}
              </Alert>
            )}
            <div>
              <Button type="submit" disabled={inspect.isPending}>
                <Search />
                {inspect.isPending ? 'Inspecting…' : 'Inspect repository'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {inspect.data && <Results key={inspect.submittedAt} found={inspect.data} options={options} />}
    </div>
  );
}

export function DiscoverPage() {
  const tab =
    parseDiscoverSearch(useSearch({ strict: false }) as Record<string, unknown>).tab ?? 'find';
  const navigate = useNavigate();
  // Shares its data with the list below, so the tab can say how many need attention.
  const sources = useQuery({ queryKey: SOURCES_KEY, queryFn: adminApi.listSources });
  const problems = sources.data?.items.filter(needsAttention).length ?? 0;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Discover plugins"
        description="Paste a GitHub link, inspect it, then install only the plugins you need. Nothing is added until you install."
      />
      <Tabs
        label="Discover"
        value={tab}
        onChange={(next) =>
          void navigate({
            to: '/discover',
            search: next === 'find' ? {} : { tab: next },
            replace: true,
          })
        }
        tabs={[
          { value: 'find', label: 'Find plugins' },
          {
            value: 'repositories',
            label: 'Added repositories',
            count: sources.data?.items.length,
          },
        ]}
      >
        {problems > 0 && tab === 'find' && (
          <Alert variant="warning" className="mb-4">
            {problems} added {problems === 1 ? 'folder needs' : 'folders need'} attention.{' '}
            <Link to="/discover" search={{ tab: 'repositories' }} className="underline">
              See which
            </Link>
          </Alert>
        )}
        {tab === 'find' ? <FindPlugins /> : <InstalledRepositories />}
      </Tabs>
    </div>
  );
}
