import { allPages, checkUserId, type Http } from './http.js';
import type { Page, PageOptions, ProjectPlugin, ProjectUser, UserPlugin } from './types.js';

export interface UserListOptions extends PageOptions {
  userId?: string | undefined;
  search?: string | undefined;
}

/**
 * The people of the host. A user appears the first time a session or a name is set for them;
 * deleting one is a console action and not offered here. No user id goes into a path.
 */
export function usersApi(http: Http) {
  return {
    list: (options: UserListOptions = {}) =>
      http.json<Page<ProjectUser>>('GET', '/v1/project/users', { query: { ...options } }),

    setName: async (userId: string, displayName: string) => {
      checkUserId(userId);
      return http.json<ProjectUser>('PUT', '/v1/project/users', { body: { userId, displayName } });
    },

    /** The plugins of one user with their components, variables, setup and connection state. */
    plugins: async (userId: string) => {
      checkUserId(userId);
      return allPages<UserPlugin>(http, '/v1/project/user-plugins', { userId });
    },

    install: async (userId: string, pluginId: string, options: { versionId?: string } = {}) => {
      checkUserId(userId);
      return http.json<ProjectPlugin>(
        'PUT',
        `/v1/project/user-plugins/${encodeURIComponent(pluginId)}`,
        { body: { userId, ...options } },
      );
    },

    uninstall: async (userId: string, pluginId: string): Promise<void> => {
      checkUserId(userId);
      await http.json<void>('DELETE', `/v1/project/user-plugins/${encodeURIComponent(pluginId)}`, {
        query: { userId },
      });
    },
  };
}
