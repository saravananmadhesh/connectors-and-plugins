import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import type { AuthConfigResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

/** One MCP server's variables: what is needed, whether each is set, and a form to set them. */
function AuthConfigRow({
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
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const componentId = config.componentId;
  const save = useMutation({
    mutationFn: () => {
      const sent = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''));
      return projects.putAuthConfigVariables(orgId, projectId, componentId ?? '', sent);
    },
    onSuccess: () => {
      setValues({});
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'auth-configs') });
    },
    onError: (err) => setError(messageOf(err)),
  });
  if (config.variables.length === 0) return null;
  const editable = canWrite && componentId !== null;
  const dirty = Object.values(values).some((value) => value !== '');

  return (
    <Card className="space-y-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">
          {config.pluginName} · {config.serverName}
        </p>
        <Badge variant="outline">{config.authMode}</Badge>
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setError('');
          save.mutate();
        }}
      >
        {config.variables.map((variable) => (
          <div key={variable.name} className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor={`${config.id}-${variable.name}`} className="font-mono text-xs">
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
            {editable && (
              <Input
                id={`${config.id}-${variable.name}`}
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
        {editable && (
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!dirty || save.isPending}>
              Save values
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}

export function AuthConfigsTab({ orgId, projectId, canWrite }: TabProps) {
  const paging = useCursorPaging();
  const configs = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'auth-configs', { cursor: paging.cursor }),
    queryFn: () => projects.authConfigs(orgId, projectId, { cursor: paging.cursor }),
  });
  const items = (configs.data?.items ?? []).filter((config) => config.variables.length > 0);
  return (
    <QueryFrame
      label="auth configs"
      isPending={configs.isPending}
      error={configs.error}
      onRetry={() => void configs.refetch()}
    >
      {items.length === 0 && !paging.hasPrevious ? (
        <p className="text-sm text-muted-foreground">No plugin needs values from you.</p>
      ) : (
        <div className="space-y-3">
          {items.map((config) => (
            <AuthConfigRow
              key={config.id}
              orgId={orgId}
              projectId={projectId}
              config={config}
              canWrite={canWrite}
            />
          ))}
          <CursorPager
            hasPrevious={paging.hasPrevious}
            nextCursor={configs.data?.nextCursor}
            onBack={paging.back}
            onForward={paging.forward}
          />
        </div>
      )}
    </QueryFrame>
  );
}
