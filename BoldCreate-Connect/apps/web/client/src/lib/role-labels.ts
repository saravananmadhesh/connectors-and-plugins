import type { PublicRole } from '@boldcreate-integrations/contracts';

/** The name people read for each public role; a test keeps it equal to the contract's labels. */
export const PUBLIC_ROLE_LABELS: Record<PublicRole, string> = {
  ADMIN: 'Admin',
  MEMBER: 'Member',
  VIEWER: 'Viewer',
};
