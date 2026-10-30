import type { ProjectPluginResponse } from '@/lib/api';

export type PluginStatus = NonNullable<ProjectPluginResponse['setup']>['status'];

export const CHIPS: Record<
  PluginStatus,
  { label: string; variant: 'success' | 'warning' | 'secondary'; hint: string }
> = {
  ready: {
    label: 'Configured',
    variant: 'success',
    hint: 'A sign-in or a value is set; users can use this plugin.',
  },
  needs_values: {
    label: 'Needs values',
    variant: 'warning',
    hint: 'A required value has no value yet.',
  },
  no_sign_in: {
    label: 'Not configured',
    variant: 'secondary',
    hint: 'No sign-in or value is set yet.',
  },
  no_auth: {
    label: 'No auth needed',
    variant: 'secondary',
    hint: 'This plugin has no MCP server to sign in to.',
  },
};

export const STATUS_LABELS: Record<PluginStatus, string> = {
  ready: CHIPS.ready.label,
  needs_values: CHIPS.needs_values.label,
  no_sign_in: CHIPS.no_sign_in.label,
  no_auth: CHIPS.no_auth.label,
};
