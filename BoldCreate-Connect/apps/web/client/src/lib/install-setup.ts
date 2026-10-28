import type { McpServerResponse, VariableStatus } from './api';

/** Where an installed plugin stands for the person using it. */
export type InstallState = 'installed' | 'needs-setup' | 'connected';

export const INSTALL_STATE_LABEL: Record<InstallState, string> = {
  installed: 'Installed',
  'needs-setup': 'Needs setup',
  connected: 'Connected',
};

/** Servers that ask each person to sign in; the others take no per-person sign-in. */
export const signInServers = (servers: readonly McpServerResponse[]): McpServerResponse[] =>
  servers.filter(
    (server) =>
      (server.authType === 'oauth_dcr' || server.authType === 'oauth_client') &&
      server.connection !== 'not_required',
  );

/** Required variables that still hold no value. */
export const missingVariables = (variables: readonly VariableStatus[]): VariableStatus[] =>
  variables.filter((variable) => variable.required && !variable.isSet);

/** What is left to do before the plugin works: variables first, then the sign-ins. */
export interface SetupNeeds {
  variables: VariableStatus[];
  signIns: McpServerResponse[];
}

export function setupNeeds(
  variables: readonly VariableStatus[],
  servers: readonly McpServerResponse[],
): SetupNeeds {
  return {
    variables: missingVariables(variables),
    signIns: signInServers(servers).filter((server) => server.connection !== 'connected'),
  };
}

export const hasSetupNeeds = (needs: SetupNeeds): boolean =>
  needs.variables.length > 0 || needs.signIns.length > 0;

/**
 * The state shown on a row: Needs setup while a required variable or a sign-in is open, Connected
 * once every sign-in the plugin asks for is done, and Installed for a plugin that asks for none.
 */
export function installState(
  variables: readonly VariableStatus[],
  servers: readonly McpServerResponse[],
): InstallState {
  if (hasSetupNeeds(setupNeeds(variables, servers))) return 'needs-setup';
  return signInServers(servers).length > 0 ? 'connected' : 'installed';
}
