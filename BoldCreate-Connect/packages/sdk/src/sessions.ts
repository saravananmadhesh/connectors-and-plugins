import type { Http } from './http.js';
import type { Page, PageOptions, SessionCreated, SessionInfo, ToolPolicy } from './types.js';

export interface CreateSessionOptions {
  plugins?: string[] | undefined;
  set?: string | undefined;
  expiresInSeconds?: number | undefined;
  tools?: ToolPolicy | undefined;
  /**
   * Your own key for this creation. Without one the client makes a key per call, so a retry after a
   * network error gives back the first session instead of a second one.
   */
  idempotencyKey?: string | undefined;
}

export interface SessionListOptions extends PageOptions {
  userId?: string | undefined;
}

/** What `ConnectClient.create` sends: the user and the options as the API names them. */
export function createSessionRequest(
  http: Http,
  userId: string,
  options: CreateSessionOptions = {},
): Promise<SessionCreated> {
  const { idempotencyKey, ...body } = options;
  return http.json<SessionCreated>('POST', '/v1/project/sessions', {
    body: { userId, ...body },
    idempotencyKey: idempotencyKey ?? true,
  });
}

/** The sessions of the project; a session token itself is shown once, when it is created. */
export function sessionsApi(http: Http) {
  return {
    list: (options: SessionListOptions = {}) =>
      http.json<Page<SessionInfo>>('GET', '/v1/project/sessions', { query: { ...options } }),

    get: (sessionId: string) =>
      http.json<SessionInfo>('GET', `/v1/project/sessions/${encodeURIComponent(sessionId)}`),

    delete: async (sessionId: string): Promise<void> => {
      await http.json<void>('DELETE', `/v1/project/sessions/${encodeURIComponent(sessionId)}`);
    },
  };
}
