import { randomUUID } from 'node:crypto';
import type { Executor } from '@boldcreate-integrations/db';
import { projectTable } from '@boldcreate-integrations/db';
import { DEFAULT_PROJECT_SETTINGS } from '@boldcreate-integrations/limits';

/**
 * Creates the two projects every organization starts with: the For You project, which holds the
 * organization's own installs and is never shown as a project, and a default Platform project.
 */
export async function insertOrgProjects(
  tx: Executor,
  orgId: string,
  createdBy: string,
): Promise<void> {
  await tx.insert(projectTable).values([
    {
      id: randomUUID(),
      organizationId: orgId,
      name: 'For You',
      kind: 'for_you',
      createdBy,
      ...DEFAULT_PROJECT_SETTINGS,
    },
    {
      id: randomUUID(),
      organizationId: orgId,
      name: 'Default',
      kind: 'platform',
      createdBy,
      ...DEFAULT_PROJECT_SETTINGS,
    },
  ]);
}
