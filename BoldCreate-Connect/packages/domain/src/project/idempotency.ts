/**
 * A repeated project call under one `Idempotency-Key` answers with the first response. The key is
 * kept per project and route for a window; a repeat with another body is a conflict. The stored
 * response is sealed to the organization because it can carry a token that is shown once.
 */
import { createHash } from 'node:crypto';
import { and, eq, gt, lte, sql } from 'drizzle-orm';
import { projectIdempotencyTable, type Executor } from '@boldcreate-integrations/db';
import type { Sealer, Unsealer } from '@boldcreate-integrations/credentials';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { conflict, validationFailed } from '../errors.js';
import type { ProjectScope } from './project-users.js';

export interface IdempotentResult<T> {
  status: number;
  body: T;
  replayed: boolean;
}

export interface IdempotencyDeps {
  sealer: Sealer;
  unsealer: Unsealer;
}

const KEY_PATTERN = /^[\x21-\x7e]{1,255}$/;

const subject = (project: ProjectScope) => ({ kind: 'project' as const, id: project.projectId });

function fingerprint(body: unknown): string {
  return createHash('sha256')
    .update(JSON.stringify(body ?? null))
    .digest('hex');
}

/**
 * The stored answer of an earlier call under this key, or null when there is none. A key used with
 * another body is a conflict. A call that does slow work between two transactions asks here first,
 * so a repeat does not redo the work.
 */
export async function replayIdempotent<T>(
  tx: Executor,
  deps: IdempotencyDeps,
  project: ProjectScope,
  route: string,
  key: string,
  body: unknown,
): Promise<IdempotentResult<T> | null> {
  if (!KEY_PATTERN.test(key)) {
    throw validationFailed([
      { field: 'Idempotency-Key', message: 'must be 1 to 255 printable characters' },
    ]);
  }
  const requestSha256 = fingerprint(body);
  await tx.execute(
    sql`SELECT pg_advisory_xact_lock(hashtext(${`${project.projectId}|${route}|${key}`}))`,
  );
  const [stored] = await tx
    .select()
    .from(projectIdempotencyTable)
    .where(
      and(
        eq(projectIdempotencyTable.projectId, project.projectId),
        eq(projectIdempotencyTable.route, route),
        eq(projectIdempotencyTable.key, key),
        gt(projectIdempotencyTable.expiresAt, sql`now()`),
      ),
    )
    .limit(1);
  if (stored) {
    if (stored.requestSha256 !== requestSha256) throw conflict();
    const plaintext = await deps.unsealer.unseal({
      purpose: 'idempotent_response',
      orgId: project.organizationId,
      subject: subject(project),
      envelope: stored.responseSealed,
    });
    return { status: stored.responseStatus, body: JSON.parse(plaintext) as T, replayed: true };
  }
  return null;
}

/**
 * Runs `run` once per (project, route, key) in the window. Concurrent calls with the same key take
 * turns, so the second one finds the first one's answer.
 */
export async function withIdempotency<T>(
  tx: Executor,
  deps: IdempotencyDeps,
  project: ProjectScope,
  route: string,
  key: string,
  body: unknown,
  run: () => Promise<{ status: number; body: T }>,
): Promise<IdempotentResult<T>> {
  const earlier = await replayIdempotent<T>(tx, deps, project, route, key, body);
  if (earlier) return earlier;
  const requestSha256 = fingerprint(body);
  const result = await run();
  const responseSealed = await deps.sealer.seal({
    purpose: 'idempotent_response',
    orgId: project.organizationId,
    subject: subject(project),
    plaintext: JSON.stringify(result.body),
  });
  const now = new Date();
  await tx
    .delete(projectIdempotencyTable)
    .where(
      and(
        eq(projectIdempotencyTable.projectId, project.projectId),
        eq(projectIdempotencyTable.route, route),
        eq(projectIdempotencyTable.key, key),
        lte(projectIdempotencyTable.expiresAt, sql`now()`),
      ),
    );
  await tx.insert(projectIdempotencyTable).values({
    projectId: project.projectId,
    route,
    key,
    requestSha256,
    responseStatus: result.status,
    responseSealed,
    createdAt: now,
    expiresAt: new Date(now.getTime() + PROJECT_LIMITS.idempotencyWindowSeconds * 1000),
  });
  return { status: result.status, body: result.body, replayed: false };
}
