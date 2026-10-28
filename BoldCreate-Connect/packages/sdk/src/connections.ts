import { allPages, type Http } from './http.js';
import type { Connection } from './types.js';

export interface ConnectionListOptions {
  userId?: string | undefined;
  componentId?: string | undefined;
}

export interface StartedConnection {
  connectUrl: string;
  expiresAt: Date;
}

/** The sign-ins of the project's users to MCP servers. Tokens and values are never returned. */
export function connectionsApi(http: Http) {
  return {
    list: (options: ConnectionListOptions = {}) =>
      allPages<Connection>(http, '/v1/project/connections', { ...options }),

    /** An address to send the user to so they sign in; they come back to `callbackUrl`. */
    start: async (
      userId: string,
      componentId: string,
      options: { callbackUrl: string },
    ): Promise<StartedConnection> => {
      const started = await http.json<{ connectUrl: string; expiresAt: string }>(
        'POST',
        '/v1/project/connections',
        { body: { userId, componentId, callbackUrl: options.callbackUrl }, idempotencyKey: true },
      );
      return { connectUrl: started.connectUrl, expiresAt: new Date(started.expiresAt) };
    },

    delete: async (connectionId: string): Promise<void> => {
      await http.json('DELETE', `/v1/project/connections/${encodeURIComponent(connectionId)}`);
    },
  };
}
