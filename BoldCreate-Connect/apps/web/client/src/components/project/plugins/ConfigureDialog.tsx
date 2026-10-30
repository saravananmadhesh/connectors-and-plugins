import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import type { AuthConfigResponse, ProjectPluginResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { messageOf } from '../paging';
import { SignInFields } from './AuthConfigForm';
import {
  EMPTY_FORM,
  configOf,
  formReady,
  formOfConfig,
  updateOf,
  type AuthConfigs,
  type ServerForm,
} from './sign-in-form';

/**
 * The sign-in of the servers of an installed plugin. A server that has none is set up with the add
 * call; one that has is shown with what is stored (secrets never) and saved as a change to it.
 */
export function ConfigureDialog({
  orgId,
  projectId,
  plugin,
  onSaved,
  onClose,
}: {
  orgId: string;
  projectId: string;
  plugin: ProjectPluginResponse;
  onSaved: () => void;
  onClose: () => void;
}) {
  const servers = plugin.servers ?? [];
  const stored = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'plugin-auth-configs', {
      pluginId: plugin.pluginId,
    }),
    queryFn: () => projects.authConfigs(orgId, projectId, { limit: 100 }),
  });
  const detail = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'catalog-plugin', { pluginId: plugin.pluginId }),
    queryFn: () => projects.catalogPlugin(orgId, projectId, plugin.pluginId),
  });
  const variables = detail.data?.variables ?? [];
  const isSet = (name: string): boolean =>
    (stored.data?.items ?? []).some(
      (config) =>
        config.pluginId === plugin.pluginId &&
        config.variables.some((variable) => variable.name === name && variable.isSet),
    );
  const [values, setValues] = useState<Record<string, string>>({});
  const configOfServer = (id: string | null): AuthConfigResponse | undefined =>
    id === null ? undefined : stored.data?.items.find((config) => config.id === id);

  const [forms, setForms] = useState<Record<string, ServerForm>>({});
  const [error, setError] = useState('');
  const formOf = (name: string, id: string | null): ServerForm => {
    const config = configOfServer(id);
    return forms[name] ?? (config ? formOfConfig(config) : EMPTY_FORM);
  };

  const save = useMutation({
    mutationFn: async () => {
      const authConfigs: AuthConfigs = {};
      for (const server of servers) {
        const id = server.defaultAuthConfigId;
        const form = formOf(server.name, id);
        const config = configOfServer(id);
        if (config) {
          const body = updateOf(config, form);
          if (body) await projects.updateAuthConfig(orgId, projectId, config.id, body);
        } else if (id === null) {
          const created = configOf(form);
          if (created) authConfigs[server.name] = created;
        }
      }
      const filled = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''));
      if (Object.keys(authConfigs).length > 0 || Object.keys(filled).length > 0) {
        await projects.putPlugin(orgId, projectId, plugin.pluginId, {
          ...(Object.keys(authConfigs).length > 0 ? { authConfigs } : {}),
          ...(Object.keys(filled).length > 0 ? { variables: filled } : {}),
        });
      }
    },
    onSuccess: () => {
      setForms({});
      setValues({});
      onSaved();
    },
    onError: (err) => setError(messageOf(err)),
  });

  const typedValues = Object.values(values).some((value) => value !== '');
  const changed =
    typedValues ||
    servers.some((server) => {
      const id = server.defaultAuthConfigId;
      const config = configOfServer(id);
      const form = formOf(server.name, id);
      return config ? updateOf(config, form) !== null : form.authType !== 'none';
    });
  const complete = servers.every((server) =>
    formReady(formOf(server.name, server.defaultAuthConfigId), server.defaultAuthConfigId !== null),
  );
  const loading = stored.isPending || detail.isPending;

  return (
    <Dialog open onOpenChange={(next) => !next && !save.isPending && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogTitle>{`Sign-in for ${plugin.displayName}`}</DialogTitle>
        <form
          className="mt-4 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            save.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          {stored.isError && <Alert variant="destructive">Could not load the saved sign-in.</Alert>}
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : servers.length === 0 && variables.length === 0 ? (
            <p className="text-sm text-muted-foreground">This plugin has nothing to set up.</p>
          ) : (
            servers.map((server) => (
              <SignInFields
                orgId={orgId}
                projectId={projectId}
                pluginId={plugin.pluginId}
                key={server.name}
                server={server.name}
                form={formOf(server.name, server.defaultAuthConfigId)}
                stored={server.defaultAuthConfigId !== null}
                onChange={(next) =>
                  setForms((previous) => ({
                    ...previous,
                    [server.name]: {
                      ...formOf(server.name, server.defaultAuthConfigId),
                      ...next,
                    },
                  }))
                }
              />
            ))
          )}
          {!loading && variables.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Values</p>
              {variables.map((variable) => (
                <div key={variable.name} className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label htmlFor={`var-${variable.name}`} className="font-mono text-xs">
                      {variable.name}
                    </Label>
                    {variable.required && <Badge variant="outline">required</Badge>}
                    {isSet(variable.name) && <Badge variant="success">Set</Badge>}
                  </div>
                  {variable.description && (
                    <p className="text-xs text-muted-foreground">{variable.description}</p>
                  )}
                  <Input
                    id={`var-${variable.name}`}
                    type={variable.secret ? 'password' : 'text'}
                    autoComplete="off"
                    placeholder={
                      isSet(variable.name) ? 'Leave empty to keep the current value' : ''
                    }
                    value={values[variable.name] ?? ''}
                    onChange={(e) =>
                      setValues((previous) => ({ ...previous, [variable.name]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={save.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending || loading || !changed || !complete}>
              Save sign-in
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
