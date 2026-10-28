import type { PluginLifecycleStatus, VersionStatus } from '../lib/api';
import { VERSION_LABEL } from '../lib/plugins';
import { Badge } from './ui/badge';

type Variant = 'success' | 'warning' | 'info' | 'destructive' | 'secondary';

const PLUGIN_VARIANT: Record<PluginLifecycleStatus, Variant> = {
  active: 'success',
  deprecated: 'warning',
  suspended: 'destructive',
};

const VERSION_VARIANT: Record<VersionStatus, Variant> = {
  pending: 'warning',
  approved: 'info',
  published: 'success',
  rejected: 'destructive',
  yanked: 'secondary',
};

const PLUGIN_LABEL: Record<PluginLifecycleStatus, string> = {
  active: 'Active',
  deprecated: 'Deprecated',
  suspended: 'Suspended',
};

export function PluginStatusBadge({ status }: { status: PluginLifecycleStatus }) {
  return <Badge variant={PLUGIN_VARIANT[status]}>{PLUGIN_LABEL[status]}</Badge>;
}

export function VersionStatusBadge({ status }: { status: VersionStatus }) {
  return <Badge variant={VERSION_VARIANT[status]}>{VERSION_LABEL[status]}</Badge>;
}
