/**
 * How a project's users reach one MCP server: the values its plugin asks for, and the auth configs
 * that say how users sign in. The Auth configs tab shows one card per server, and the same card
 * opens right after a plugin that needs setup is added. Values and secrets are write only.
 */
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import type { AuthConfigResponse, CreateAuthConfigBody, ProjectServerResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { MODE_LABELS, serverState, type ServerState } from '@/lib/server-setup';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input, Select } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { messageOf } from './paging';

type Mode = CreateAuthConfigBody['authMode'];

const STATE_BADGES: Record<
  ServerState,
  { label: string; variant: 'warning' | 'info' | 'success' }
> = {
  needs_values: { label: 'Needs values', variant: 'warning' },
  no_sign_in: { label: 'No sign-in set up', variant: 'info' },
  ready: { label: 'Ready', variant: 'success' },
};

function useRefresh(orgId: string, projectId: string) {
  const qc = useQueryClient();
  return () => {
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'servers') });
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'auth-configs') });
  };
}

interface ServerProps {
  orgId: string;
  projectId: string;
  server: ProjectServerResponse;
  canWrite: boolean;
}

/** The values the server's plugin asks for; a stored value is never shown. */
function ServerValues({ orgId, projectId, server, canWrite }: ServerProps) {
  const refresh = useRefresh(orgId, projectId);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const save = useMutation({
    mutationFn: () => {
      const sent = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''));
      return projects.putAuthConfigVariables(orgId, projectId, server.componentId, sent);
    },
    onSuccess: () => {
      setValues({});
      setError('');
      refresh();
    },
    onError: (err) => setError(messageOf(err)),
  });
  const dirty = Object.values(values).some((value) => value !== '');
  const prefix = `${server.componentId}-value`;

  return (
    <section className="space-y-3" aria-label={`Values for ${server.serverName}`}>
      <h4 className="text-sm font-medium">Values</h4>
      {error && <Alert variant="destructive">{error}</Alert>}
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        {server.variables.map((variable) => (
          <div key={variable.name} className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor={`${prefix}-${variable.name}`} className="font-mono text-xs">
                {variable.name}
              </Label>
              {variable.required && <Badge variant="outline">required</Badge>}
              <Badge variant={variable.isSet ? 'success' : 'warning'}>
                {variable.isSet ? 'Set' : 'Not set'}
              </Badge>
            </div>
            {variable.description && (
              <p className="text-xs text-muted-foreground">{variable.description}</p>
            )}
            {canWrite && (
              <Input
                id={`${prefix}-${variable.name}`}
                type={variable.secret ? 'password' : 'text'}
                autoComplete="off"
                placeholder={variable.isSet ? 'Leave empty to keep the current value' : 'Value'}
                value={values[variable.name] ?? ''}
                onChange={(e) =>
                  setValues((previous) => ({ ...previous, [variable.name]: e.target.value }))
                }
              />
            )}
          </div>
        ))}
        {canWrite && (
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!dirty || save.isPending}>
              Save values
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}

/** A form for a new auth config of one server; the fields follow the chosen mode. */
function NewAuthConfigForm({
  orgId,
  projectId,
  server,
  first,
  onDone,
}: {
  orgId: string;
  projectId: string;
  server: ProjectServerResponse;
  first: boolean;
  onDone: () => void;
}) {
  const refresh = useRefresh(orgId, projectId);
  const [name, setName] = useState(first ? 'Default' : '');
  const [mode, setMode] = useState<Mode>('dcr');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [scopes, setScopes] = useState('');
  const [secret, setSecret] = useState('');
  const [isDefault, setIsDefault] = useState(first);
  const [error, setError] = useState('');
  const create = useMutation({
    mutationFn: () => {
      const body: CreateAuthConfigBody = {
        componentId: server.componentId,
        name: name.trim(),
        authMode: mode,
        isDefault,
      };
      if (mode === 'oauth_client') {
        body.clientId = clientId.trim();
        if (clientSecret !== '') body.clientSecret = clientSecret;
      }
      if (mode !== 'shared_secret' && scopes.trim() !== '') body.scopes = scopes.trim();
      if (mode === 'shared_secret') body.secret = secret;
      return projects.createAuthConfig(orgId, projectId, body);
    },
    onSuccess: () => {
      refresh();
      onDone();
    },
    onError: (err) => setError(messageOf(err)),
  });
  const id = (field: string) => `${server.componentId}-new-${field}`;
  const complete =
    name.trim() !== '' &&
    (mode !== 'oauth_client' || clientId.trim() !== '') &&
    (mode !== 'shared_secret' || secret !== '');

  return (
    <form
      className="space-y-3 rounded-md border p-3"
      aria-label={`New sign-in for ${server.serverName}`}
      onSubmit={(e) => {
        e.preventDefault();
        setError('');
        create.mutate();
      }}
    >
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor={id('name')}>Name</Label>
          <Input id={id('name')} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor={id('mode')}>How users sign in</Label>
          <Select id={id('mode')} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="dcr">{MODE_LABELS.dcr}</option>
            <option value="oauth_client">{MODE_LABELS.oauth_client}</option>
            <option value="shared_secret">{MODE_LABELS.shared_secret}</option>
          </Select>
        </div>
      </div>
      {mode === 'oauth_client' && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={id('client-id')}>Client ID</Label>
            <Input
              id={id('client-id')}
              autoComplete="off"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={id('client-secret')}>Client secret (optional)</Label>
            <Input
              id={id('client-secret')}
              type="password"
              autoComplete="off"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
            />
          </div>
        </div>
      )}
      {mode !== 'shared_secret' && (
        <div className="space-y-1">
          <Label htmlFor={id('scopes')}>Scopes (optional)</Label>
          <Input id={id('scopes')} value={scopes} onChange={(e) => setScopes(e.target.value)} />
        </div>
      )}
      {mode === 'shared_secret' && (
        <div className="space-y-1">
          <Label htmlFor={id('secret')}>API key</Label>
          <Input
            id={id('secret')}
            type="password"
            autoComplete="off"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Sent as a Bearer token on every call. It is stored sealed and never shown again.
          </p>
        </div>
      )}
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={isDefault} onChange={() => setIsDefault((previous) => !previous)} />
        Use for every user unless a session picks another
      </label>
      <div className="flex justify-end gap-2">
        <Button type="button" size="sm" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!complete || create.isPending}>
          Add sign-in
        </Button>
      </div>
    </form>
  );
}

/** One config: what it is, and switches to make it the default, turn it off or remove it. */
function AuthConfigLine({
  orgId,
  projectId,
  config,
  canWrite,
}: {
  orgId: string;
  projectId: string;
  config: AuthConfigResponse;
  canWrite: boolean;
}) {
  const refresh = useRefresh(orgId, projectId);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState(false);
  const update = useMutation({
    mutationFn: (body: Parameters<typeof projects.updateAuthConfig>[3]) =>
      projects.updateAuthConfig(orgId, projectId, config.id, body),
    onSuccess: refresh,
    onError: (err) => setError(messageOf(err)),
  });
  const remove = useMutation({
    mutationFn: () => projects.deleteAuthConfig(orgId, projectId, config.id),
    onSuccess: () => {
      setRemoving(false);
      refresh();
    },
    onError: (err) => {
      setRemoving(false);
      setError(messageOf(err));
    },
  });
  const oauth = config.authMode === 'dcr' || config.authMode === 'oauth_client';
  const busy = update.isPending || remove.isPending;

  return (
    <li className="space-y-2 px-3 py-2">
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">{config.name}</span>
        <Badge variant="outline">{MODE_LABELS[config.authMode]}</Badge>
        {config.isDefault && <Badge variant="success">Default</Badge>}
        {config.status === 'disabled' && <Badge variant="warning">Off</Badge>}
        {config.authMode === 'shared_secret' && config.secretLastFour && (
          <span className="font-mono text-xs text-muted-foreground">
            ends in {config.secretLastFour}
          </span>
        )}
        {config.clientId && (
          <span className="font-mono text-xs text-muted-foreground">client {config.clientId}</span>
        )}
        {canWrite && (
          <div className="ml-auto flex gap-2">
            {!config.isDefault && (
              <Button
                size="sm"
                variant="outline"
                disabled={busy}
                aria-label={`Make ${config.name} the default`}
                onClick={() => update.mutate({ isDefault: true })}
              >
                Make default
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              aria-label={`${config.status === 'active' ? 'Turn off' : 'Turn on'} ${config.name}`}
              onClick={() =>
                update.mutate({ status: config.status === 'active' ? 'disabled' : 'active' })
              }
            >
              {config.status === 'active' ? 'Turn off' : 'Turn on'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              aria-label={`Remove ${config.name}`}
              onClick={() => setRemoving(true)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      {oauth && (
        <p className="text-xs text-muted-foreground">
          Callback URL to register at the provider:{' '}
          <span className="font-mono break-all">{config.callbackUrl}</span>
        </p>
      )}
      {removing && (
        <ConfirmDialog
          open
          title={`Remove ${config.name}?`}
          description="Users who signed in with it must sign in again with another config."
          confirmLabel="Remove"
          pending={remove.isPending}
          onConfirm={() => remove.mutate()}
          onClose={() => setRemoving(false)}
        />
      )}
    </li>
  );
}

/** Everything one server needs, for the Auth configs tab and the setup step after adding. */
export function ServerSetup({
  orgId,
  projectId,
  server,
  configs,
  canWrite,
}: ServerProps & { configs: AuthConfigResponse[] }) {
  const [adding, setAdding] = useState(false);
  const state = serverState(server);
  const badge = STATE_BADGES[state];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium">
            {server.pluginDisplayName} · {server.serverName}
          </p>
          {server.url && (
            <p className="truncate font-mono text-xs text-muted-foreground">{server.url}</p>
          )}
        </div>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>
      {server.variables.length > 0 && (
        <ServerValues orgId={orgId} projectId={projectId} server={server} canWrite={canWrite} />
      )}
      <section className="space-y-2" aria-label={`Sign-in for ${server.serverName}`}>
        <h4 className="text-sm font-medium">Sign-in</h4>
        {configs.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            {server.variables.length > 0
              ? 'Users reach this server with the values above. Add a sign-in only if it also needs OAuth or its own API key.'
              : 'No sign-in is set up. Add one if this server needs OAuth or an API key.'}
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {configs.map((config) => (
              <AuthConfigLine
                key={config.id}
                orgId={orgId}
                projectId={projectId}
                config={config}
                canWrite={canWrite}
              />
            ))}
          </ul>
        )}
        {canWrite &&
          (adding ? (
            <NewAuthConfigForm
              orgId={orgId}
              projectId={projectId}
              server={server}
              first={configs.length === 0}
              onDone={() => setAdding(false)}
            />
          ) : (
            <Button
              size="sm"
              variant="outline"
              aria-label={`Add sign-in for ${server.serverName}`}
              onClick={() => setAdding(true)}
            >
              Add sign-in
            </Button>
          ))}
      </section>
    </div>
  );
}
