import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projects } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { McpAuthFields } from '@/components/McpAuthFields';
import { AUTH_OPTIONS, authChoices } from '@/lib/mcp-auth';
import type { ServerForm } from './sign-in-form';

/**
 * How the users of one MCP server of a plugin sign in. It is the same form as a server's own page:
 * the sign-in types the server supports, the callback URL to register, and the scopes filled in
 * from what the server publishes until they are edited.
 */
export function SignInFields({
  orgId,
  projectId,
  pluginId,
  server,
  form,
  stored = false,
  onChange,
}: {
  orgId: string;
  projectId: string;
  pluginId: string;
  server: string;
  form: ServerForm;
  /** The server already has a sign-in: its type stays and its secrets are kept unless typed. */
  stored?: boolean;
  onChange: (next: Partial<ServerForm>) => void;
}) {
  const discovery = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'oauth-discovery', { pluginId, server }),
    queryFn: () => projects.oauthDiscover(orgId, projectId, pluginId, server),
    staleTime: 5 * 60_000,
    retry: false,
  });
  const touched = useRef(false);
  const foundText = (discovery.data?.scopes ?? []).join(' ');
  // The published scopes fill the field until the person edits it.
  useEffect(() => {
    if (!stored && !touched.current && foundText !== '' && form.scopes === '')
      onChange({ scopes: foundText });
  }, [stored, foundText, form.scopes, onChange]);

  return (
    <fieldset className="space-y-3 rounded-md border p-3">
      <legend className="px-1 text-sm font-medium">{`Sign-in for ${server}`}</legend>
      <McpAuthFields
        idPrefix={`server-${server}`}
        draft={form}
        onChange={(patch) => {
          if (patch.scopes !== undefined) touched.current = true;
          onChange(patch);
        }}
        choices={
          stored
            ? AUTH_OPTIONS.filter((option) => option.value === form.authType)
            : authChoices(form.authType, discovery.data, discovery.isError)
        }
        keyPlaceholder={stored ? 'Leave empty to keep the stored key' : undefined}
        secretPlaceholder={stored ? 'Leave empty to keep the stored secret' : undefined}
        discovery={discovery.data}
        fetching={discovery.isFetching}
      />
    </fieldset>
  );
}
