/**
 * Categories: the public list with plugin counts, and the admin operations that create, rename
 * and delete them. A plugin's own links are set in `admin-plugins.ts`.
 */
import { randomUUID } from 'node:crypto';
import { asc, eq, inArray, sql } from 'drizzle-orm';
import {
  categoryTable,
  pluginCategoryTable,
  pluginTable,
  type Executor,
  type Tx,
} from '@boldcreate-integrations/db';
import {
  CategorySlugSchema,
  type AdminCategoryResponse,
  type CategoryResponse,
  type CreateCategoryBody,
  type UpdateCategoryBody,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { conflict, isUniqueViolation, notFound, validationFailed } from '../errors.js';
import type { SourceActor } from '../ingestion/sources.js';
import { inCatalog } from './plugins.js';

type CategoryRow = typeof categoryTable.$inferSelect;

/** Turns a free-form name into the identifier used in URLs and manifests. */
export function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '');
}

/** Categories members can filter by, with the plugins currently in the catalog. */
export async function listCategories(db: Executor): Promise<CategoryResponse[]> {
  const rows = await db
    .select({
      slug: categoryTable.slug,
      name: categoryTable.name,
      description: categoryTable.description,
      pluginCount: sql<number>`count(${pluginTable.id})::int`,
    })
    .from(categoryTable)
    .leftJoin(pluginCategoryTable, eq(pluginCategoryTable.categoryId, categoryTable.id))
    .leftJoin(
      pluginTable,
      sql`${pluginTable.id} = ${pluginCategoryTable.pluginId} AND ${pluginTable.publisherOrganizationId} IS NULL AND ${inCatalog}`,
    )
    .groupBy(categoryTable.id)
    .orderBy(asc(categoryTable.name));
  return rows;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

const auditActor = (actor: SourceActor) => ({
  kind: 'platform_admin' as const,
  id: actor.subject,
});

async function withCount(db: Executor, row: CategoryRow): Promise<AdminCategoryResponse> {
  const [counted] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(pluginCategoryTable)
    .where(eq(pluginCategoryTable.categoryId, row.id));
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    pluginCount: counted?.n ?? 0,
  };
}

export async function listAdminCategories(db: Executor): Promise<AdminCategoryResponse[]> {
  const rows = await db
    .select({
      id: categoryTable.id,
      slug: categoryTable.slug,
      name: categoryTable.name,
      description: categoryTable.description,
      pluginCount: sql<number>`count(${pluginCategoryTable.pluginId})::int`,
    })
    .from(categoryTable)
    .leftJoin(pluginCategoryTable, eq(pluginCategoryTable.categoryId, categoryTable.id))
    .groupBy(categoryTable.id)
    .orderBy(asc(categoryTable.name));
  return rows;
}

export async function createCategory(
  db: Executor,
  body: CreateCategoryBody,
  actor: SourceActor,
): Promise<AdminCategoryResponse> {
  const slug = body.slug ?? slugFromName(body.name);
  if (!CategorySlugSchema.safeParse(slug).success) {
    throw validationFailed([
      { field: 'name', message: 'Use letters or digits so a short identifier can be made.' },
    ]);
  }
  try {
    return await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(categoryTable)
        .values({ id: randomUUID(), slug, name: body.name, description: body.description })
        .returning();
      const created = row as CategoryRow;
      await writeAudit(tx, {
        actor: auditActor(actor),
        action: 'category.created',
        target: { kind: 'category', id: created.id },
        context: { slug },
        requestId: actor.requestId,
        ip: actor.ip,
      });
      return { ...created, pluginCount: 0 };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

export async function updateCategory(
  db: Executor,
  categoryId: string,
  body: UpdateCategoryBody,
  actor: SourceActor,
): Promise<AdminCategoryResponse> {
  const row = await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(categoryTable)
      .set({
        ...(body.name === undefined ? {} : { name: body.name }),
        ...(body.description === undefined ? {} : { description: body.description }),
      })
      .where(eq(categoryTable.id, categoryId))
      .returning();
    if (!updated) throw notFound();
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'category.renamed',
      target: { kind: 'category', id: categoryId },
      context: { slug: updated.slug },
      requestId: actor.requestId,
      ip: actor.ip,
    });
    return updated;
  });
  return withCount(db, row);
}

/** Removes the category and its links; the plugins themselves stay. */
export async function deleteCategory(
  db: Executor,
  categoryId: string,
  actor: SourceActor,
): Promise<void> {
  await db.transaction(async (tx) => {
    const removed = await tx
      .delete(categoryTable)
      .where(eq(categoryTable.id, categoryId))
      .returning({ slug: categoryTable.slug });
    if (removed.length === 0) throw notFound();
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'category.deleted',
      target: { kind: 'category', id: categoryId },
      context: { slug: removed[0]?.slug },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
}

// ─── Default category ─────────────────────────────────────────────────────────

/** Category every plugin without one of its own is filed under. */
export const DEFAULT_CATEGORY_SLUG = 'general';

/**
 * Files a plugin under the default category when it has no category at all. Does nothing when it
 * already has one, or when the default category was removed.
 */
export async function linkDefaultCategory(tx: Tx, pluginId: string): Promise<void> {
  const [linked] = await tx
    .select({ categoryId: pluginCategoryTable.categoryId })
    .from(pluginCategoryTable)
    .where(eq(pluginCategoryTable.pluginId, pluginId))
    .limit(1);
  if (linked) return;
  const [general] = await tx
    .select({ id: categoryTable.id })
    .from(categoryTable)
    .where(eq(categoryTable.slug, DEFAULT_CATEGORY_SLUG));
  if (!general) return;
  await tx
    .insert(pluginCategoryTable)
    .values({ pluginId, categoryId: general.id })
    .onConflictDoNothing();
}

// ─── Manifest categories ──────────────────────────────────────────────────────

/**
 * Links a plugin to the categories its manifest names, matching by slug and creating the ones that
 * do not exist yet. Links already there are kept and none are removed, so an operator's choices
 * survive later syncs. Returns the names that cannot be made into a category, for the scan report.
 */
export async function linkManifestCategories(
  tx: Tx,
  pluginId: string,
  names: readonly string[],
): Promise<string[]> {
  const wanted = new Map<string, string>();
  const unusable: string[] = [];
  for (const name of names) {
    const slug = slugFromName(name);
    if (CategorySlugSchema.safeParse(slug).success) {
      if (!wanted.has(slug)) wanted.set(slug, name.trim().slice(0, 60));
    } else unusable.push(name);
  }
  if (wanted.size === 0) return unusable;
  await tx
    .insert(categoryTable)
    .values([...wanted].map(([slug, name]) => ({ id: randomUUID(), slug, name, description: '' })))
    .onConflictDoNothing();
  const found = await tx
    .select({ id: categoryTable.id })
    .from(categoryTable)
    .where(inArray(categoryTable.slug, [...wanted.keys()]));
  await tx
    .insert(pluginCategoryTable)
    .values(found.map((category) => ({ pluginId, categoryId: category.id })))
    .onConflictDoNothing();
  return unusable;
}
