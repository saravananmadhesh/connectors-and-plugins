import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QueryFrame } from '../shared';
import { messageOf } from '../paging';
import { SignInFields } from './AuthConfigForm';
import { EMPTY_FORM, configOf, formReady, type AuthConfigs, type ServerForm } from './sign-in-form';

/**
 * Adds a plugin with how its MCP servers sign in and the values it needs, in one save. A plugin
 * with neither is added at once. Secrets are never filled in and are not kept after the save.
 */
export function AddPluginDialog({
  orgId,
  projectId,
  pluginId,
  displayName,
  onAdded,
  onClose,
}: {
  orgId: string;
  projectId: string;
  pluginId: string;
  displayName: string;
  onAdded: () => void;
  onClose: () => void;
}) {
  const detail = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'catalog-plugin', { pluginId }),
    queryFn: () => projects.catalogPlugin(orgId, projectId, pluginId),
  });
  const [servers, setServers] = useState<Record<string, ServerForm>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const started = useRef(false);

  const mcp = (detail.data?.components ?? []).filter((component) => component.kind === 'mcp');
  const variables = detail.data?.variables ?? [];
  const formOf = (name: string): ServerForm => servers[name] ?? EMPTY_FORM;

  const save = useMutation({
    mutationFn: () => {
      const authConfigs: AuthConfigs = {};
      for (const component of mcp) {
        const config = configOf(formOf(component.name));
        if (config) authConfigs[component.name] = config;
      }
      const filled = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''));
      return projects.putPlugin(orgId, projectId, pluginId, {
        ...(Object.keys(authConfigs).length > 0 ? { authConfigs } : {}),
        ...(Object.keys(filled).length > 0 ? { variables: filled } : {}),
      });
    },
    onSuccess: () => {
      setServers({});
      setValues({});
      onAdded();
    },
    onError: (err) => setError(messageOf(err)),
  });

  // Nothing to set up: add straight away.
  const nothingToSet = detail.data !== undefined && mcp.length === 0 && variables.length === 0;
  const { mutate } = save;
  useEffect(() => {
    if (!nothingToSet || started.current) return;
    started.current = true;
    mutate();
  }, [nothingToSet, mutate]);

  const complete = mcp.every((component) => formReady(formOf(component.name)));

  return (
    <Dialog open onOpenChange={(open) => !open && !save.isPending && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogTitle>{`Install ${displayName}`}</DialogTitle>
        <div className="mt-4 space-y-5">
          {error && <Alert variant="destructive">{error}</Alert>}
          <QueryFrame
            label="the plugin"
            isPending={detail.isPending || (nothingToSet && !error)}
            error={detail.error}
            onRetry={() => void detail.refetch()}
          >
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setError('');
                save.mutate();
              }}
            >
              {mcp.map((component) => (
                <SignInFields
                  orgId={orgId}
                  projectId={projectId}
                  pluginId={pluginId}
                  key={component.name}
                  server={component.name}
                  form={formOf(component.name)}
                  onChange={(next) =>
                    setServers((previous) => ({
                      ...previous,
                      [component.name]: { ...formOf(component.name), ...next },
                    }))
                  }
                />
              ))}
              {variables.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Values</p>
                  {variables.map((variable) => (
                    <div key={variable.name} className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Label htmlFor={`var-${variable.name}`} className="font-mono text-xs">
                          {variable.name}
                        </Label>
                        {variable.required && <Badge variant="outline">required</Badge>}
                      </div>
                      {variable.description && (
                        <p className="text-xs text-muted-foreground">{variable.description}</p>
                      )}
                      <Input
                        id={`var-${variable.name}`}
                        type={variable.secret ? 'password' : 'text'}
                        autoComplete="off"
                        value={values[variable.name] ?? ''}
                        onChange={(e) =>
                          setValues((previous) => ({
                            ...previous,
                            [variable.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    A value left empty can be set later; the plugin shows as needing values until
                    then.
                  </p>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={save.isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={save.isPending || !complete}>
                  Install
                </Button>
              </div>
            </form>
          </QueryFrame>
        </div>
      </DialogContent>
    </Dialog>
  );
}
