import { randomUUID } from 'node:crypto';
import { and, asc, count, desc, eq, inArray, isNotNull, isNull } from 'drizzle-orm';
import {
  organizationTable,
  projectKeyTable,
  projectTable,
  type Executor,
} from '@boldcreate-integrations/db';
import { DEFAULT_PROJECT_SETTINGS, PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { generateApiKeyParts, hashToken } from '@boldcreate-integrations/security';
import {
  normalizeReturnOrigin,
  type CreateProjectBody,
  type CreateProjectKeyBody,
  type Plain,
  type ProjectKeyCreatedResponse,
  type ProjectKeyResponse,
  type ProjectKeyScope,
  type ProjectResponse,
  type UpdateProjectBody,
  type UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { writeAudit } from '../audit/write-audit.js';
import {
  appError,
  conflict,
  forbidden,
  isUniqueViolation,
  notFound,
  validationFailed,
} from '../errors.js';
import { normalizeCidr } from '../access/cidr.js';

const DAY_MS = 86_400_000;
/** How many revoked keys a project keeps listing after the active ones. */
const REVOKED_KEYS_SHOWN = 10;
const NAME_MAX = 60;
const LIVE = ['active', 'suspended'] as const;

export interface ProjectOptions {
  /** Whether `http` and `https` addresses of this machine are accepted as return origins. */
  allowLocalOrigins: boolean;
}

type ProjectRow = typeof projectTable.$inferSelect;
type KeyRow = typeof projectKeyTable.$inferSelect;

function keyView(row: KeyRow): Plain<ProjectKeyResponse> {
  return {
    id: row.id,
    prefix: row.keyId,
    lastFour: row.lastFour,
    scopes: row.scopes as ProjectKeyScope[],
    allowedCidrs: row.allowedCidrs,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    revokedAt: row.revokedAt?.toISOString() ?? null,
    lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
    lastUsedIp: row.lastUsedIp,
    createdAt: row.createdAt.toISOString(),
  };
}

function projectView(row: ProjectRow, activeKeyCount: number): Plain<ProjectResponse> {
  return {
    id: row.id,
    organizationId: row.organizationId,
    name: row.name,
    status: row.status,
    returnOrigins: row.returnOrigins,
    activeKeyCount,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function activeKeyCounts(tx: Executor, projectIds: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (projectIds.length === 0) return counts;
  const found = await tx
    .select({ projectId: projectKeyTable.projectId, n: count() })
    .from(projectKeyTable)
    .where(and(inArray(projectKeyTable.projectId, projectIds), isNull(projectKeyTable.revokedAt)))
    .groupBy(projectKeyTable.projectId);
  for (const row of found) counts.set(row.projectId, row.n);
  return counts;
}

/** Locks the project row. A project of another organization is `not_found`, like an unknown one. */
async function lockProject(tx: Executor, orgId: string, projectId: string): Promise<ProjectRow> {
  const [project] = await tx
    .select()
    .from(projectTable)
    .where(
      and(
        eq(projectTable.id, projectId),
        eq(projectTable.organizationId, orgId),
        eq(projectTable.kind, 'platform'),
      ),
    )
    .limit(1)
    .for('update');
  if (!project) throw notFound();
  return project;
}

function audit(
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  action:
    | 'project.created'
    | 'project.updated'
    | 'project.deleted'
    | 'project_key.created'
    | 'project_key.rotated'
    | 'project_key.revoked',
  extra: Record<string, unknown> = {},
  target: { kind: string; id: string } = { kind: 'project', id: projectId },
) {
  return {
    actor: { kind: 'user_session' as const, id: principal.userId },
    action,
    target,
    orgId,
    projectId,
    context: { origin: 'website_session', ...extra },
  };
}

function normalizedOrigins(origins: string[], options: ProjectOptions): string[] {
  const seen = new Set<string>();
  const details = [];
  for (const [index, raw] of origins.entries()) {
    const origin = normalizeReturnOrigin(raw, options.allowLocalOrigins);
    if (origin === null) {
      details.push({
        field: `returnOrigins.${index}`,
        message: 'must be an https origin such as https://app.example.com, with no path',
      });
    } else {
      seen.add(origin);
    }
  }
  if (details.length > 0) throw validationFailed(details);
  return [...seen];
}

function normalizedCidrs(cidrs: string[]): string[] {
  const seen = new Set<string>();
  const details = [];
  for (const [index, raw] of cidrs.entries()) {
    const cidr = normalizeCidr(raw);
    if (cidr === null) {
      details.push({
        field: `allowedCidrs.${index}`,
        message: 'must be an address block such as 203.0.113.0/24',
      });
    } else {
      seen.add(cidr);
    }
  }
  if (details.length > 0) throw validationFailed(details);
  return [...seen];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

/** The organization's projects that are not deleted, by name. */
export async function listProjects(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<ProjectResponse>[]> {
  requireAction(principal, 'project:read', { orgId });
  const rows = await tx
    .select()
    .from(projectTable)
    .where(
      and(
        eq(projectTable.organizationId, orgId),
        eq(projectTable.kind, 'platform'),
        inArray(projectTable.status, [...LIVE]),
      ),
    )
    .orderBy(asc(projectTable.name), asc(projectTable.id));
  const counts = await activeKeyCounts(
    tx,
    rows.map((row) => row.id),
  );
  return rows.map((row) => projectView(row, counts.get(row.id) ?? 0));
}

export async function getProject(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
): Promise<Plain<ProjectResponse>> {
  requireAction(principal, 'project:read', { orgId });
  const [row] = await tx
    .select()
    .from(projectTable)
    .where(
      and(
        eq(projectTable.id, projectId),
        eq(projectTable.organizationId, orgId),
        eq(projectTable.kind, 'platform'),
      ),
    )
    .limit(1);
  if (!row || row.status === 'revoked') throw notFound();
  const counts = await activeKeyCounts(tx, [row.id]);
  return projectView(row, counts.get(row.id) ?? 0);
}

/**
 * Creates a project. The organization row is locked while its projects are counted, so two
 * creates cannot both pass the limit. A name is unique among the organization's projects.
 */
export async function createProject(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  body: CreateProjectBody,
  options: ProjectOptions,
): Promise<Plain<ProjectResponse>> {
  requireAction(principal, 'project:create', { orgId });
  const origins = normalizedOrigins(body.returnOrigins ?? [], options);
  const id = randomUUID();
  const now = new Date();

  return tx.transaction(async (inner) => {
    await inner
      .select({ id: organizationTable.id })
      .from(organizationTable)
      .where(eq(organizationTable.id, orgId))
      .for('update');
    const [existing] = await inner
      .select({ n: count() })
      .from(projectTable)
      .where(
        and(
          eq(projectTable.organizationId, orgId),
          eq(projectTable.kind, 'platform'),
          inArray(projectTable.status, [...LIVE]),
        ),
      );
    if ((existing?.n ?? 0) >= PROJECT_LIMITS.projectsPerOrganization) {
      throw appError('limit_exceeded');
    }

    let row: ProjectRow | undefined;
    try {
      await inner.transaction(async (savepoint) => {
        [row] = await savepoint
          .insert(projectTable)
          .values({
            id,
            organizationId: orgId,
            name: body.name,
            returnOrigins: origins,
            ...DEFAULT_PROJECT_SETTINGS,
            createdBy: principal.userId,
            createdAt: now,
            updatedAt: now,
          })
          .returning();
      });
    } catch (error) {
      if (isUniqueViolation(error)) throw conflict();
      throw error;
    }
    await writeAudit(inner, audit(principal, orgId, id, 'project.created', { name: body.name }));
    return projectView(row!, 0);
  });
}

export async function updateProject(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  body: UpdateProjectBody,
  options: ProjectOptions,
): Promise<Plain<ProjectResponse>> {
  requireAction(principal, 'project:update', { orgId });
  const origins = body.returnOrigins ? normalizedOrigins(body.returnOrigins, options) : undefined;

  return tx.transaction(async (inner) => {
    const project = await lockProject(inner, orgId, projectId);
    // A deleted project cannot be changed back.
    if (project.status === 'revoked') throw notFound();

    const set: Partial<typeof projectTable.$inferInsert> = { updatedAt: new Date() };
    if (body.name !== undefined) set.name = body.name;
    if (origins !== undefined) set.returnOrigins = origins;
    if (body.status !== undefined) set.status = body.status;
    let updated: ProjectRow | undefined;
    try {
      await inner.transaction(async (savepoint) => {
        [updated] = await savepoint
          .update(projectTable)
          .set(set)
          .where(eq(projectTable.id, projectId))
          .returning();
      });
    } catch (error) {
      if (isUniqueViolation(error)) throw conflict();
      throw error;
    }

    const fields = [
      body.name !== undefined && body.name !== project.name ? 'name' : null,
      origins !== undefined ? 'returnOrigins' : null,
      body.status !== undefined && body.status !== project.status ? 'status' : null,
    ].filter((field): field is string => field !== null);
    if (fields.length > 0) {
      await writeAudit(inner, audit(principal, orgId, projectId, 'project.updated', { fields }));
    }
    const counts = await activeKeyCounts(inner, [projectId]);
    return projectView(updated!, counts.get(projectId) ?? 0);
  });
}

/**
 * Deletes a project from its managers' point of view: its keys are revoked, its return origins
 * are removed and its name is freed, so a key stops working at once. The row stays as a `revoked`
 * tombstone because its users, sessions and logs still point at it. Deleting twice is `not_found`.
 */
export async function deleteProject(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
): Promise<void> {
  requireAction(principal, 'project:delete', { orgId });
  await tx.transaction(async (inner) => {
    const project = await lockProject(inner, orgId, projectId);
    if (project.status === 'revoked') throw notFound();
    const revoked = await inner
      .update(projectKeyTable)
      .set({ revokedAt: new Date() })
      .where(and(eq(projectKeyTable.projectId, projectId), isNull(projectKeyTable.revokedAt)))
      .returning({ id: projectKeyTable.id });
    const suffix = ` (deleted ${projectId.slice(0, 8)})`;
    await inner
      .update(projectTable)
      .set({
        status: 'revoked',
        returnOrigins: [],
        name: `${project.name.slice(0, NAME_MAX - suffix.length)}${suffix}`,
        updatedAt: new Date(),
      })
      .where(eq(projectTable.id, projectId));
    await writeAudit(
      inner,
      audit(principal, orgId, projectId, 'project.deleted', {
        name: project.name,
        keysRevoked: revoked.length,
      }),
    );
  });
}

// ─── Keys ─────────────────────────────────────────────────────────────────────

/** Active keys first, then the latest revoked ones. */
export async function listProjectKeys(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
): Promise<Plain<ProjectKeyResponse>[]> {
  requireAction(principal, 'project-key:read', { orgId });
  const [project] = await tx
    .select({ id: projectTable.id, status: projectTable.status })
    .from(projectTable)
    .where(
      and(
        eq(projectTable.id, projectId),
        eq(projectTable.organizationId, orgId),
        eq(projectTable.kind, 'platform'),
      ),
    )
    .limit(1);
  if (!project || project.status === 'revoked') throw notFound();
  const active = await tx
    .select()
    .from(projectKeyTable)
    .where(and(eq(projectKeyTable.projectId, projectId), isNull(projectKeyTable.revokedAt)))
    .orderBy(desc(projectKeyTable.createdAt));
  const revoked = await tx
    .select()
    .from(projectKeyTable)
    .where(and(eq(projectKeyTable.projectId, projectId), isNotNull(projectKeyTable.revokedAt)))
    .orderBy(desc(projectKeyTable.revokedAt))
    .limit(REVOKED_KEYS_SHOWN);
  return [...active, ...revoked].map(keyView);
}

/**
 * Creates a key. The raw key is returned once and only its hash is stored. Without an expiry the
 * key lasts `keyLifetimeDaysDefault` days; an explicit `null` never expires, and a date is at most
 * `keyLifetimeDaysMax` days away. A project has at most `keysPerProject` active keys.
 */
export async function createProjectKey(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  body: CreateProjectKeyBody,
): Promise<Plain<ProjectKeyCreatedResponse>> {
  requireAction(principal, 'project-key:create', { orgId });
  const now = new Date();
  const latest = now.getTime() + PROJECT_LIMITS.keyLifetimeDaysMax * DAY_MS;
  let expiresAt: Date | null;
  if (body.expiresAt === undefined) {
    expiresAt = new Date(now.getTime() + PROJECT_LIMITS.keyLifetimeDaysDefault * DAY_MS);
  } else if (body.expiresAt === null) {
    expiresAt = null;
  } else {
    expiresAt = new Date(body.expiresAt);
    if (
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() <= now.getTime() ||
      expiresAt.getTime() > latest
    ) {
      throw appError('api_key_expiry_out_of_range');
    }
  }
  const cidrs = body.allowedCidrs ? normalizedCidrs(body.allowedCidrs) : null;
  const { keyId, secret, lastFour } = generateApiKeyParts('project');
  const id = randomUUID();

  const row = await tx.transaction(async (inner) => {
    const project = await lockProject(inner, orgId, projectId);
    if (project.status !== 'active') throw forbidden();
    const [active] = await inner
      .select({ n: count() })
      .from(projectKeyTable)
      .where(and(eq(projectKeyTable.projectId, projectId), isNull(projectKeyTable.revokedAt)));
    if ((active?.n ?? 0) >= PROJECT_LIMITS.keysPerProject) {
      throw appError('api_key_quota_exceeded');
    }

    const [created] = await inner
      .insert(projectKeyTable)
      .values({
        id,
        projectId,
        keyId,
        secretHash: hashToken(secret),
        lastFour,
        scopes: body.scopes,
        allowedCidrs: cidrs,
        expiresAt,
        createdBy: principal.userId,
        createdAt: now,
      })
      .returning();
    await writeAudit(
      inner,
      audit(
        principal,
        orgId,
        projectId,
        'project_key.created',
        { prefix: keyId, scopes: body.scopes, restrictedByAddress: cidrs !== null },
        { kind: 'project_key', id },
      ),
    );
    return created!;
  });

  return { ...keyView(row), rawKey: `${keyId}.${secret}` };
}

/**
 * Replaces a key: a new key with the same scopes, addresses and expiry is issued, and the old one
 * keeps working for `keyRotationGraceSeconds` (less if it expires sooner), then stops. Rotating a
 * key that is revoked or expired is refused. The new raw key is returned once.
 */
export async function rotateProjectKey(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  keyRowId: string,
): Promise<Plain<ProjectKeyCreatedResponse>> {
  requireAction(principal, 'project-key:create', { orgId });
  const now = new Date();
  const { keyId, secret, lastFour } = generateApiKeyParts('project');
  const id = randomUUID();

  const row = await tx.transaction(async (inner) => {
    const project = await lockProject(inner, orgId, projectId);
    if (project.status !== 'active') throw forbidden();
    const [old] = await inner
      .select()
      .from(projectKeyTable)
      .where(and(eq(projectKeyTable.id, keyRowId), eq(projectKeyTable.projectId, projectId)))
      .limit(1);
    if (!old) throw notFound();
    if (old.revokedAt || (old.expiresAt && old.expiresAt.getTime() <= now.getTime())) {
      throw appError('conflict');
    }
    const [active] = await inner
      .select({ n: count() })
      .from(projectKeyTable)
      .where(and(eq(projectKeyTable.projectId, projectId), isNull(projectKeyTable.revokedAt)));
    if ((active?.n ?? 0) >= PROJECT_LIMITS.keysPerProject) {
      throw appError('api_key_quota_exceeded');
    }

    const graceEnds = new Date(now.getTime() + PROJECT_LIMITS.keyRotationGraceSeconds * 1000);
    const oldEnds =
      old.expiresAt && old.expiresAt.getTime() < graceEnds.getTime() ? old.expiresAt : graceEnds;
    await inner
      .update(projectKeyTable)
      .set({ expiresAt: oldEnds })
      .where(eq(projectKeyTable.id, old.id));
    const [created] = await inner
      .insert(projectKeyTable)
      .values({
        id,
        projectId,
        keyId,
        secretHash: hashToken(secret),
        lastFour,
        scopes: old.scopes,
        allowedCidrs: old.allowedCidrs,
        expiresAt: old.expiresAt,
        createdBy: principal.userId,
        createdAt: now,
      })
      .returning();
    await writeAudit(
      inner,
      audit(
        principal,
        orgId,
        projectId,
        'project_key.rotated',
        { prefix: keyId, replaces: old.keyId, oldKeyValidUntil: oldEnds.toISOString() },
        { kind: 'project_key', id },
      ),
    );
    return created!;
  });

  return { ...keyView(row), rawKey: `${keyId}.${secret}` };
}

/** Revokes a key. Revoking one that is already revoked changes nothing. */
export async function revokeProjectKey(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  keyRowId: string,
): Promise<void> {
  requireAction(principal, 'project-key:revoke', { orgId });
  await tx.transaction(async (inner) => {
    await lockProject(inner, orgId, projectId);
    const [key] = await inner
      .select()
      .from(projectKeyTable)
      .where(and(eq(projectKeyTable.id, keyRowId), eq(projectKeyTable.projectId, projectId)))
      .limit(1);
    if (!key) throw notFound();
    if (key.revokedAt) return;
    await inner
      .update(projectKeyTable)
      .set({ revokedAt: new Date() })
      .where(eq(projectKeyTable.id, keyRowId));
    await writeAudit(
      inner,
      audit(
        principal,
        orgId,
        projectId,
        'project_key.revoked',
        { prefix: key.keyId },
        { kind: 'project_key', id: keyRowId },
      ),
    );
  });
}
