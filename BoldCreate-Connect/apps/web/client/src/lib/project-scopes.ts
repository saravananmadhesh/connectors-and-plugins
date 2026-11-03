import type { ProjectKeyScope } from '@boldcreate-integrations/contracts';

export interface ProjectScopeInfo {
  label: string;
  description: string;
  destructive: boolean;
  preset: boolean;
}

/**
 * What each project key permission means, in words for the console. Typed so a new scope cannot
 * be missed; a test keeps it equal to the contract's own table.
 */
export const PROJECT_SCOPE_INFO: Record<ProjectKeyScope, ProjectScopeInfo> = {
  'tools:read': {
    label: 'Read tools',
    description: 'List the tools of the project’s plugins',
    destructive: false,
    preset: true,
  },
  'sessions:read': {
    label: 'Read sessions and users',
    description: 'List users and sessions',
    destructive: false,
    preset: true,
  },
  'sessions:write': {
    label: 'Manage sessions and users',
    description: 'Create and end sessions, set a user’s display name',
    destructive: false,
    preset: true,
  },
  'connections:read': {
    label: 'Read connections',
    description: 'List the connections of users',
    destructive: false,
    preset: true,
  },
  'connections:write': {
    label: 'Manage connections',
    description: 'Disconnect a user’s connection',
    destructive: true,
    preset: true,
  },
  'auth-configs:read': {
    label: 'Read plugin settings',
    description: 'See which variables a plugin needs and whether they are set',
    destructive: false,
    preset: false,
  },
  'auth-configs:write': {
    label: 'Manage plugin settings',
    description: 'Set the variables a plugin needs',
    destructive: false,
    preset: false,
  },
  'plugins:read': {
    label: 'Read plugins',
    description: 'List the project’s plugins and the catalog',
    destructive: false,
    preset: true,
  },
  'plugins:write': {
    label: 'Manage plugins',
    description: 'Add, update and remove the project’s plugins',
    destructive: true,
    preset: false,
  },
  'observability:read': {
    label: 'Read logs',
    description: 'Read the project’s activity log',
    destructive: false,
    preset: true,
  },
};

export const PROJECT_SCOPES = Object.keys(PROJECT_SCOPE_INFO) as ProjectKeyScope[];

/** The scopes the form starts with for a host’s server. */
export const PROJECT_SCOPE_PRESET = PROJECT_SCOPES.filter(
  (scope) => PROJECT_SCOPE_INFO[scope].preset,
);
