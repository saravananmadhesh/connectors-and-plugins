/**
 * What the setup of a project's MCP servers is built from: the servers with the values they need,
 * the auth configs that say how users sign in, and what each server still lacks.
 */
import { useQuery } from '@tanstack/react-query';
import { projects } from './api';
import type { AuthConfigResponse, ProjectServerResponse } from './api';
import { qk } from './query-keys';

export const MODE_LABELS: Record<AuthConfigResponse['authMode'], string> = {
  dcr: 'OAuth, client registered by the server',
  oauth_client: 'OAuth, with your client ID',
  shared_secret: 'API key shared by all users',
  user_form: 'Form filled by each user',
};

export type ServerState = 'needs_values' | 'no_sign_in' | 'ready';

/**
 * What a server still needs. A required value that is not set always blocks it. A server with no
 * values and no config may be open to anyone, or may want an OAuth sign-in; the console cannot
 * tell, so it says no sign-in is set up and lets the person decide.
 */
export function serverState(server: ProjectServerResponse): ServerState {
  if (server.variables.some((variable) => variable.required && !variable.isSet)) {
    return 'needs_values';
  }
  if (server.variables.length === 0 && server.authConfigCount === 0) return 'no_sign_in';
  return 'ready';
}

/** The configs of one server; a config names its server by plugin and server name. */
export const configsOf = (
  configs: AuthConfigResponse[],
  server: ProjectServerResponse,
): AuthConfigResponse[] =>
  configs.filter(
    (config) => config.pluginId === server.pluginId && config.serverName === server.serverName,
  );

/** A project keeps only a handful of configs per server, so one page holds them all. */
const CONFIG_LIMIT = 100;

/** Both lists the setup of a project's servers is built from. */
export function useServerSetup(orgId: string, projectId: string) {
  const servers = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'servers'),
    queryFn: () => projects.servers(orgId, projectId),
  });
  const configs = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'auth-configs', { limit: CONFIG_LIMIT }),
    queryFn: () => projects.authConfigs(orgId, projectId, { limit: CONFIG_LIMIT }),
  });
  return {
    servers: servers.data?.items ?? [],
    configs: configs.data?.items ?? [],
    isPending: servers.isPending || configs.isPending,
    error: servers.error ?? configs.error,
    refetch: () => {
      void servers.refetch();
      void configs.refetch();
    },
  };
}
