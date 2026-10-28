import { allPages, type Http } from './http.js';
import type { AuthConfig } from './types.js';

/**
 * How the project signs its users in to MCP servers, and the values those servers need. A value is
 * sent and never read back. Only plugins with an MCP component have an auth config.
 */
export function authConfigsApi(http: Http) {
  return {
    list: () => allPages<AuthConfig>(http, '/v1/project/auth-configs'),

    setVariables: async (
      componentId: string,
      values: Record<string, string | null>,
    ): Promise<void> => {
      await http.json(
        'PUT',
        `/v1/project/auth-configs/${encodeURIComponent(componentId)}/variables`,
        { body: { values } },
      );
    },
  };
}
