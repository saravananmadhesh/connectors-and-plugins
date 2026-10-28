/**
 * The project side of connecting a server: a project user's sign-in starts from the host's call or
 * from the user's own session, and the browser comes back to a page of the host afterwards. The
 * return address is checked against the origins the project registered when the flow starts, and
 * again when the browser comes back.
 */
import { eq } from 'drizzle-orm';
import { projectTable, type Executor } from '@boldcreate-integrations/db';
import { appError, notFound } from '../errors.js';
import { returnUrlAllowed } from './return-url.js';

/** What a project call asked for when it started a sign-in. */
export interface ProjectStart {
  projectId: string;
  returnUrl: string;
  clientState: string | undefined;
}

/** What the state row keeps of a project call so the callback can send the browser back. */
export interface ProjectReturn {
  projectId: string;
  returnUrl: string;
  clientState: string | null;
}

/** The project must be active and the address one of its origins; nothing is stored on a refusal. */
export async function checkProjectReturn(
  db: Executor,
  start: ProjectStart,
): Promise<ProjectReturn> {
  const [project] = await db
    .select({ status: projectTable.status, origins: projectTable.returnOrigins })
    .from(projectTable)
    .where(eq(projectTable.id, start.projectId))
    .limit(1);
  if (!project || project.status !== 'active') throw notFound();
  const url = returnUrlAllowed(start.returnUrl, project.origins);
  if (!url) throw appError('return_url_not_allowed');
  return {
    projectId: start.projectId,
    returnUrl: url.href,
    clientState: start.clientState ?? null,
  };
}
