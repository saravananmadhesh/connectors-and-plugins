import type { ProjectResponse } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

/** The state of a project as a badge: only a running project is not drawn attention to. */
export function ProjectStatusBadge({ status }: { status: ProjectResponse['status'] }) {
  return <Badge variant={status === 'active' ? 'secondary' : 'outline'}>{status}</Badge>;
}
