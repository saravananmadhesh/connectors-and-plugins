import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, installations, mcpServers, type ScopeKey } from '@/lib/api';
import { connectionLabel } from '@/lib/mcp-auth';
import { setupNeeds, signInServers } from '@/lib/install-setup';
import { rememberSignInScope } from '@/lib/installed-search';
import { leaveTo } from '@/lib/navigate';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  orgId: string;
  /** `me` for the caller's own installs, `org` for the whole organization. */
  scopeKey: ScopeKey;
  installationId: string;
  pluginName: string;
  onClose: () => void;
}

const failure = (err: unknown, fallback: string): string =>
  err instanceof ApiError ? err.message : fallback;

/**
 * What a plugin still needs before it works, in the order a person does it: the values it asks
 * for, then a sign-in for each server that wants one. A stored value is never shown.
 */
export function InstallSetupPanel({ orgId, scopeKey, installationId, pluginName, onClose }: Props) {
  const qc = useQueryClient();
  const variables = useQuery({
    queryKey: qk.variables(scopeKey, installationId),
    queryFn: () => installations.listVariables(orgId, scopeKey, installationId),
  });
  const servers = useQuery({
    queryKey: qk.mcpServers(scopeKey, installationId),
    queryFn: () => mcpServers.list(orgId, scopeKey, installationId),
  });
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  const declared = (variables.data?.items ?? []).filter((variable) => !variable.custom);
  const askedFor = [...declared].sort((a, b) => Number(b.required) - Number(a.required));
  const serverList = servers.data?.items ?? [];
  const signIns = signInServers(serverList);
  const needs = setupNeeds(declared, serverList);
  const entered = Object.entries(typed).filter(([, value]) => value !== '');

  const saveValues = useMutation({
    mutationFn: () =>
      installations.putVariables(orgId, scopeKey, installationId, {
        values: Object.fromEntries(entered),
      }),
    onSuccess: (result) => {
      setError('');
      setTyped({});
      qc.setQueryData(qk.variables(scopeKey, installationId), result);
    },
    onError: (err) => setError(failure(err, 'Could not save the values')),
  });

  const signIn = useMutation({
    mutationFn: (componentId: string) =>
      mcpServers.oauthStart(orgId, scopeKey, installationId, componentId),
    onSuccess: ({ authorizeUrl }) => {
      rememberSignInScope(scopeKey);
      if (!leaveTo(authorizeUrl))
        setError('The sign-in service returned an address that cannot be used.');
    },
    onError: (err) => setError(failure(err, 'Could not start the sign-in')),
  });

  const signOut = useMutation({
    mutationFn: (componentId: string) =>
      mcpServers.oauthDisconnect(orgId, scopeKey, installationId, componentId),
    onSuccess: () => {
      setError('');
      return qc.invalidateQueries({ queryKey: qk.mcpServers(scopeKey, installationId) });
    },
    onError: (err) => setError(failure(err, 'Could not disconnect')),
  });

  const loading = variables.isPending || servers.isPending;
  const loadFailed = variables.isError || servers.isError;
  const busy = saveValues.isPending || signIn.isPending || signOut.isPending;
  const ready = !loading && !loadFailed;
  const complete = ready && needs.variables.length === 0 && needs.signIns.length === 0;

  return (
    <div className="space-y-4">
      {loading && <Skeleton className="h-24 w-full" role="status" aria-label="Loading setup" />}
      {loadFailed && <Alert variant="destructive">Could not load what {pluginName} needs.</Alert>}
      {error && <Alert variant="destructive">{error}</Alert>}

      {ready && askedFor.length > 0 && (
        <section aria-labelledby="setup-values" className="space-y-3">
          <h3 id="setup-values" className="text-sm font-medium">
            Values
          </h3>
          {askedFor.map((variable) => (
            <div key={variable.name} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor={`setup-${variable.name}`} className="font-mono text-xs">
                  {variable.name}
                </label>
                {variable.required && <Badge variant="outline">required</Badge>}
                <Badge variant={variable.isSet ? 'success' : 'outline'}>
                  {variable.isSet ? 'set' : 'not set'}
                </Badge>
              </div>
              {variable.description && (
                <p className="text-xs text-muted-foreground">{variable.description}</p>
              )}
              <Input
                id={`setup-${variable.name}`}
                type={variable.secret ? 'password' : 'text'}
                autoComplete="off"
                disabled={busy}
                placeholder={variable.isSet ? 'Leave blank to keep the stored value' : 'Value'}
                value={typed[variable.name] ?? ''}
                onChange={(event) => setTyped({ ...typed, [variable.name]: event.target.value })}
              />
            </div>
          ))}
          <Button
            size="sm"
            onClick={() => saveValues.mutate()}
            disabled={entered.length === 0 || busy}
          >
            {saveValues.isPending && <Spinner />}
            Save values
          </Button>
        </section>
      )}

      {ready && signIns.length > 0 && (
        <section aria-labelledby="setup-sign-in" className="space-y-3">
          <h3 id="setup-sign-in" className="text-sm font-medium">
            Sign in
          </h3>
          {needs.variables.length > 0 && (
            <p className="text-xs text-muted-foreground">Set the required values first.</p>
          )}
          {signIns.map((server) => (
            <div
              key={server.componentId}
              className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-xs">{server.name}</span>
                <Badge variant={server.connection === 'connected' ? 'success' : 'warning'}>
                  {connectionLabel(server.connection)}
                </Badge>
              </span>
              {server.connection === 'connected' && (
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={`Disconnect ${server.name}`}
                  disabled={busy}
                  onClick={() => signOut.mutate(server.componentId)}
                >
                  Disconnect
                </Button>
              )}
              <Button
                size="sm"
                variant={server.connection === 'connected' ? 'outline' : 'default'}
                aria-label={`${server.connection === 'connected' ? 'Reconnect' : 'Sign in to'} ${server.name}`}
                disabled={busy || needs.variables.length > 0}
                onClick={() => signIn.mutate(server.componentId)}
              >
                {server.connection === 'connected'
                  ? 'Reconnect'
                  : server.connection === 'needs_reauth'
                    ? 'Sign in again'
                    : 'Sign in'}
              </Button>
            </div>
          ))}
        </section>
      )}

      {ready && askedFor.length === 0 && signIns.length === 0 && (
        <p className="text-sm text-muted-foreground">{pluginName} needs no setup.</p>
      )}
      {complete && (askedFor.length > 0 || signIns.length > 0) && (
        <Alert variant="success">Everything {pluginName} needs is set up.</Alert>
      )}

      <div className="flex justify-end">
        <Button variant={complete ? 'default' : 'outline'} onClick={onClose}>
          {complete ? 'Done' : 'Later'}
        </Button>
      </div>
    </div>
  );
}

/** The setup of one installed plugin in its own dialog; a row in Needs setup reopens it. */
export function InstallSetupDialog(props: Props) {
  return (
    <Dialog open onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Set up {props.pluginName}</DialogTitle>
        <div className="mt-4">
          <InstallSetupPanel {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
