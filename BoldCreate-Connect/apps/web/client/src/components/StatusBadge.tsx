import { Badge } from '@/components/ui/badge';

export function ActiveBadge({ active }: { active: boolean }) {
  return <Badge variant={active ? 'success' : 'secondary'}>{active ? 'Active' : 'Disabled'}</Badge>;
}

/** Roles are labels, not states, so they stay neutral. */
export function RoleBadge({ role }: { role: string }) {
  return <Badge variant="outline">{role}</Badge>;
}
