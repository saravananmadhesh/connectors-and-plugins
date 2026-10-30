import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KeyRound, LogIn, LogOut, PlugZap } from 'lucide-react';
import {
  ApiError,
  mcpServers,
  type InstallationResponse,
  type McpServerResponse,
  type ScopeKey,
} from '@/lib/api';
import {
  authChoices,
  MAX_TIMEOUT_SECONDS,
  MIN_TIMEOUT_SECONDS,
  authBody,
  authProblems,
  connectionLabel,
  draftOf,
  errorText,
  healthLabel,
  healthVariant,
  needsSignIn,
  type AuthDraft,
} from '@/lib/mcp-auth';
import { leaveTo } from '@/lib/navigate';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { McpAuthFields } from '@/components/McpAuthFields';
import { McpEnvironment } from '@/components/McpEnvironment';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  installation: InstallationResponse;
  componentId: string;
  /** May change how the server is reached and test it. */
  canUpdate: boolean;
  onClose: () => void;
}

const failure = (err: unknown, fallback: string): string =>
  err instanceof ApiError ? err.message : fallback;

/**
 * Everything about one MCP server of an installation: how it is reached (auth type, key or client
 * ID, call timeout), its environment variables, a connection test, the tools it offers and the
 * caller's own sign-in. Secrets are write-only: a stored one is shown as set, never as a value.
 */
export function McpServerDialog({
  orgId,
  scopeKey,
  installation,
  componentId,
  canUpdate,
  onClose,
}: Props) {
  const qc = useQueryClient();
  const key = qk.mcpServers(scopeKey, installation.id);
  const query = useQuery({
    queryKey: key,
    queryFn: () => mcpServers.list(orgId, scopeKey, installation.id),
  });
  const server = query.data?.items.find((item) => item.componentId === componentId);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogTitle>{server?.name ?? 'MCP server'}</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">From {installation.pluginName}</p>
        {query.isPending && <Skeleton className="mt-4 h-40 w-full" />}
        {query.isError && (
          <Alert variant="destructive" className="mt-4">
            Could not load this server.
          </Alert>
        )}
        {query.data && !server && (
          <Alert variant="destructive" className="mt-4">
            This server is no longer part of the installation.
          </Alert>
        )}
        {server && (
          <Body
            orgId={orgId}
            scopeKey={scopeKey}
            installation={installation}
            server={server}
            canUpdate={canUpdate}
            replace={(next) =>
              qc.setQueryData(key, {
                ...query.data,
                items: (query.data?.items ?? []).map((item) =>
                  item.componentId === next.componentId ? next : item,
                ),
              })
            }
          />
        )}
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface BodyProps {
  orgId: string;
  scopeKey: ScopeKey;
  installation: InstallationResponse;
  server: McpServerResponse;
  canUpdate: boolean;
  replace: (server: McpServerResponse) => void;
}

function Body({ orgId, scopeKey, installation, server, canUpdate, replace }: BodyProps) {
  const [typed, setDraft] = useState<AuthDraft>(() => draftOf(server));
  const [scopesEdited, setScopesEdited] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const http = server.transport === 'http';
  // What the server publishes about its sign-in; it fills the scopes until the user edits them.
  const discovery = useQuery({
    queryKey: qk.mcpOAuthDiscovery(scopeKey, installation.id, server.componentId),
    queryFn: () => mcpServers.oauthDiscover(orgId, scopeKey, installation.id, server.componentId),
    enabled: http && canUpdate,
    staleTime: 5 * 60_000,
    retry: false,
  });
  const found = discovery.data?.scopes ?? [];
  const choices = authChoices(typed.authType, discovery.data, discovery.isError);
  const draft: AuthDraft =
    scopesEdited || server.oauthScopes !== null ? typed : { ...typed, scopes: found.join(' ') };
  const problems = authProblems(draft, server);
  const body = authBody(draft, server);
  const valid = Object.keys(problems).length === 0;

  const save = useMutation({
    mutationFn: () => {
      if (!body) throw new Error('nothing to save');
      return mcpServers.putAuth(orgId, scopeKey, installation.id, server.componentId, body);
    },
    onSuccess: (next) => {
      setError('');
      setNote('Saved.');
      setDraft(draftOf(next));
      replace(next);
    },
    onError: (err) => {
      setNote('');
      setError(failure(err, 'Could not save'));
    },
  });

  const test = useMutation({
    mutationFn: () => mcpServers.test(orgId, scopeKey, installation.id, server.componentId),
    onSuccess: (result) => {
      setError('');
      setNote(
        result.health === 'healthy'
          ? `Connected. ${result.toolCount} ${result.toolCount === 1 ? 'tool' : 'tools'} found.`
          : '',
      );
      replace(result.server);
    },
    onError: (err) => {
      setNote('');
      setError(failure(err, 'The test could not run'));
    },
  });

  const signIn = useMutation({
    mutationFn: async () => {
      // What is typed but not saved yet is what the person means to sign in with.
      if (body && canUpdate) {
        const saved = await mcpServers.putAuth(
          orgId,
          scopeKey,
          installation.id,
          server.componentId,
          body,
        );
        replace(saved);
      }
      return mcpServers.oauthStart(orgId, scopeKey, installation.id, server.componentId);
    },
    onSuccess: ({ authorizeUrl }) => {
      if (!leaveTo(authorizeUrl))
        setError('The sign-in service returned an address that cannot be used.');
    },
    onError: (err) => {
      setNote('');
      setError(failure(err, 'Could not start the sign-in'));
    },
  });

  const signOut = useMutation({
    mutationFn: () =>
      mcpServers.oauthDisconnect(orgId, scopeKey, installation.id, server.componentId),
    onSuccess: () => {
      setError('');
      setNote('Signed out.');
      replace({ ...server, connection: 'not_connected' });
    },
    onError: (err) => {
      setNote('');
      setError(failure(err, 'Could not sign out'));
    },
  });

  const busy = save.isPending || test.isPending || signIn.isPending || signOut.isPending;
  const set = (patch: Partial<AuthDraft>) => {
    setNote('');
    if (patch.scopes !== undefined) setScopesEdited(true);
    setDraft({ ...draft, ...patch });
  };
  const lastError = errorText(server.lastError);

  return (
    <div className="mt-4 space-y-6">
      {error && <Alert variant="destructive">{error}</Alert>}
      {note && <Alert variant="success">{note}</Alert>}

      {http && needsSignIn(server) && (
        <section className="space-y-2" aria-label="Your sign-in">
          <h3 className="text-sm font-medium">Your sign-in</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={server.connection === 'connected' ? 'success' : 'warning'}>
              {connectionLabel(server.connection)}
            </Badge>
            {server.connection === 'connected' ? (
              <Button variant="outline" size="sm" disabled={busy} onClick={() => signOut.mutate()}>
                {signOut.isPending ? <Spinner /> : <LogOut />}
                Sign out
              </Button>
            ) : (
              <Button size="sm" disabled={busy || !valid} onClick={() => signIn.mutate()}>
                {signIn.isPending ? <Spinner /> : <LogIn />}
                {server.connection === 'needs_reauth' ? 'Sign in again' : 'Sign in'}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Your agents act with your own sign-in; other members sign in for themselves.
          </p>
        </section>
      )}

      <section className="space-y-2" aria-label="Status">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={healthVariant(server.health)}>{healthLabel(server.health)}</Badge>
          <Badge variant="outline">{server.transport.toUpperCase()}</Badge>
          {server.healthCheckedAt && (
            <span className="text-xs text-muted-foreground">
              Checked {new Date(server.healthCheckedAt).toLocaleString()}
            </span>
          )}
        </div>
        {server.url && <p className="font-mono text-xs break-all">{server.url}</p>}
        {lastError && <p className="text-sm text-destructive">{lastError}</p>}
        {!http && (
          <Alert variant="warning">
            This server runs on your own machine. Only servers reached over HTTP can be used through
            the gateway.
          </Alert>
        )}
        {canUpdate && http && (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => test.mutate()}>
            {test.isPending ? <Spinner /> : <PlugZap />}
            Test connection
          </Button>
        )}
      </section>

      {/* The plugin's own variables come first: they are what most servers need to work at all. */}
      <McpEnvironment
        orgId={orgId}
        scopeKey={scopeKey}
        installationId={installation.id}
        canWrite={canUpdate}
      />

      {http && (
        <section className="space-y-3" aria-label="Authentication">
          <h3 className="text-sm font-medium">Authentication</h3>
          <McpAuthFields
            idPrefix="mcp"
            draft={draft}
            onChange={set}
            choices={choices}
            discovery={discovery.data}
            fetching={discovery.isFetching}
            disabled={!canUpdate || busy}
            problems={problems}
            keyPlaceholder={
              server.authType === 'api_key' && server.apiKeyLastFour
                ? `Stored key ending ${server.apiKeyLastFour}; leave blank to keep it`
                : 'Paste the key'
            }
            secretPlaceholder={
              server.oauthClientSecretSet
                ? 'A secret is stored; leave blank to keep it'
                : 'Optional for public clients'
            }
            scopesNote="Changing this signs members out so they connect again."
          />

          <div className="space-y-1.5">
            <Label htmlFor="mcp-timeout">Call timeout (seconds)</Label>
            <Input
              id="mcp-timeout"
              inputMode="numeric"
              disabled={!canUpdate || busy}
              placeholder={`Default; ${MIN_TIMEOUT_SECONDS} to ${MAX_TIMEOUT_SECONDS}`}
              value={draft.timeoutSeconds}
              error={problems.timeout}
              onChange={(event) => set({ timeoutSeconds: event.target.value })}
            />
          </div>

          {canUpdate && (
            <Button size="sm" disabled={!body || !valid || busy} onClick={() => save.mutate()}>
              {save.isPending && <Spinner />}
              <KeyRound />
              Save authentication
            </Button>
          )}
        </section>
      )}

      <section className="space-y-2" aria-label="Tools">
        <h3 className="text-sm font-medium">Tools ({server.tools.length})</h3>
        {server.tools.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tools found yet.{canUpdate && http ? ' Test the connection to list them.' : ''}
          </p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {server.tools.map((tool) => (
              <li key={tool.name} className="px-3 py-2">
                <p className="font-mono text-xs">{tool.name}</p>
                {tool.description && (
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
