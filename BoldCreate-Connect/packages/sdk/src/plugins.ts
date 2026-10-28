import { allPages, type Http } from './http.js';
import type {
  AllowedPlugin,
  CatalogPage,
  CatalogQuery,
  InstallMode,
  PluginSet,
  ProjectPlugin,
} from './types.js';

const id = encodeURIComponent;

/** Query options as the API reads them: a flag is the text `true` or `false`. */
export function catalogQuery(query: CatalogQuery): Record<string, string | number | undefined> {
  const { featured, ...rest } = query;
  return { ...rest, featured: featured === undefined ? undefined : String(featured) };
}

/** The plugins every user of the project gets, and the catalog they are picked from. */
export function pluginsApi(http: Http) {
  return {
    list: () => allPages<ProjectPlugin>(http, '/v1/project/plugins'),

    add: (pluginId: string, options: { versionId?: string } = {}) =>
      http.json<ProjectPlugin>('PUT', `/v1/project/plugins/${id(pluginId)}`, { body: options }),

    update: (pluginId: string, options: { versionId: string }) =>
      http.json<ProjectPlugin>('PUT', `/v1/project/plugins/${id(pluginId)}`, { body: options }),

    remove: async (pluginId: string): Promise<void> => {
      await http.json<void>('DELETE', `/v1/project/plugins/${id(pluginId)}`);
    },

    catalog: (query: CatalogQuery = {}) =>
      http.json<CatalogPage>('GET', '/v1/project/catalog', { query: catalogQuery(query) }),
  };
}

/** What a user may install on their own: the mode, the allowed plugins and the plugin sets. */
export function catalogApi(http: Http) {
  const setPath = (setId: string) => `/v1/project/plugin-sets/${id(setId)}`;
  return {
    mode: async (): Promise<InstallMode> =>
      (await http.json<{ mode: InstallMode }>('GET', '/v1/project/user-install-mode')).mode,

    setMode: async (mode: InstallMode): Promise<void> => {
      await http.json('PUT', '/v1/project/user-install-mode', { body: { mode } });
    },

    allowed: () => allPages<AllowedPlugin>(http, '/v1/project/allowed-plugins'),

    allow: async (pluginId: string): Promise<void> => {
      await http.json('PUT', `/v1/project/allowed-plugins/${id(pluginId)}`);
    },

    disallow: async (pluginId: string): Promise<void> => {
      await http.json('DELETE', `/v1/project/allowed-plugins/${id(pluginId)}`);
    },

    sets: {
      list: () => allPages<PluginSet>(http, '/v1/project/plugin-sets'),

      create: (name: string, pluginIds?: string[]) =>
        http.json<PluginSet>('POST', '/v1/project/plugin-sets', {
          body: pluginIds === undefined ? { name } : { name, plugins: pluginIds },
        }),

      update: (setId: string, options: { name?: string }) =>
        http.json<PluginSet>('PATCH', setPath(setId), { body: options }),

      delete: async (setId: string): Promise<void> => {
        await http.json('DELETE', setPath(setId));
      },

      add: async (setId: string, pluginId: string): Promise<void> => {
        await http.json('PUT', `${setPath(setId)}/plugins/${id(pluginId)}`);
      },

      remove: async (setId: string, pluginId: string): Promise<void> => {
        await http.json('DELETE', `${setPath(setId)}/plugins/${id(pluginId)}`);
      },
    },
  };
}
