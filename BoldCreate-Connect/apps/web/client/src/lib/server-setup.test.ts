import { describe, expect, it } from 'vitest';
import type { AuthConfigResponse, ProjectServerResponse } from './api';
import { configsOf, serverState } from './server-setup';

const server = (over: Partial<ProjectServerResponse> = {}): ProjectServerResponse =>
  ({
    componentId: 'cmp_1',
    pluginId: 'plg_1',
    pluginName: 'github',
    pluginDisplayName: 'GitHub',
    serverName: 'github',
    url: 'https://api.githubcopilot.com/mcp/',
    variables: [],
    authConfigCount: 0,
    defaultAuthConfigId: null,
    ...over,
  }) as ProjectServerResponse;

const variable = (required: boolean, isSet: boolean) => ({
  name: 'GITHUB_PERSONAL_ACCESS_TOKEN',
  description: '',
  required,
  secret: true,
  isSet,
  custom: false,
});

describe('serverState', () => {
  it('needs values while a required one is not set, even with a config', () => {
    expect(serverState(server({ variables: [variable(true, false)], authConfigCount: 1 }))).toBe(
      'needs_values',
    );
  });

  it('is ready once every required value is set, and an optional unset value does not block it', () => {
    expect(serverState(server({ variables: [variable(true, true), variable(false, false)] }))).toBe(
      'ready',
    );
  });

  it('says no sign-in is set up for a server with no values and no config', () => {
    expect(serverState(server())).toBe('no_sign_in');
  });

  it('is ready for a server with a config and no values', () => {
    expect(serverState(server({ authConfigCount: 1 }))).toBe('ready');
  });
});

describe('configsOf', () => {
  it('keeps the configs of the same plugin and server name only', () => {
    const config = (id: string, pluginId: string, serverName: string) =>
      ({ id, pluginId, serverName }) as AuthConfigResponse;
    const all = [
      config('acf_1', 'plg_1', 'github'),
      config('acf_2', 'plg_1', 'other'),
      config('acf_3', 'plg_2', 'github'),
    ];
    expect(configsOf(all, server()).map((item) => item.id)).toEqual(['acf_1']);
  });
});
