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

    /**
     * Turns one component on or off for the user. On the user's own install it changes the
     * install; on a plugin the project provides it stores the user's own preference and the
     * install's value stays the default.
     */
    setComponentEnabled: async (
      userId: string,
      pluginId: string,
      componentId: string,
      enabled: boolean,
    ): Promise<UserPlugin> => {
      checkUserId(userId);
      return http.json<UserPlugin>(
        'PUT',
        `/v1/project/user-plugins/${encodeURIComponent(pluginId)}/components/${encodeURIComponent(componentId)}`,
        { body: { userId, enabled } },
      );
    },

    /**
     * Drops the user's own preference for one component, so the user follows the install again. A
     * plugin the user installed has no preference and is not found here.
     */
    clearComponentEnabled: async (
      userId: string,
      pluginId: string,
      componentId: string,
    ): Promise<UserPlugin> => {
      checkUserId(userId);
      return http.json<UserPlugin>(
        'DELETE',
        `/v1/project/user-plugins/${encodeURIComponent(pluginId)}/components/${encodeURIComponent(componentId)}`,
        { query: { userId } },
      );
    },
  };
}
