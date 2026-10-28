import * as z from 'zod/v4';

export const CategorySlugSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{0,38}[a-z0-9]$/);

const CategoryNameSchema = z.string().trim().min(1).max(60);
const CategoryDescriptionSchema = z.string().trim().max(200);

/** A category as members see it. */
export const CategoryResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  /** Plugins in the catalog right now. */
  pluginCount: z.number().int(),
});
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;

export const CategoryListResponseSchema = z.object({ items: z.array(CategoryResponseSchema) });
export type CategoryListResponse = z.infer<typeof CategoryListResponseSchema>;

/** The slim form attached to a plugin. */
export const PluginCategorySchema = z.object({ slug: z.string(), name: z.string() });
export type PluginCategory = z.infer<typeof PluginCategorySchema>;

// ─── Admin ────────────────────────────────────────────────────────────────────

export const AdminCategoryResponseSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  /** Plugins linked to the category, in the catalog or not. */
  pluginCount: z.number().int(),
});
export type AdminCategoryResponse = z.infer<typeof AdminCategoryResponseSchema>;

export const AdminCategoryListResponseSchema = z.object({
  items: z.array(AdminCategoryResponseSchema),
});
export type AdminCategoryListResponse = z.infer<typeof AdminCategoryListResponseSchema>;

export const AdminCategoryParamsSchema = z.object({ categoryId: z.uuid() });

export const CreateCategoryBodySchema = z.strictObject({
  name: CategoryNameSchema,
  /** Derived from the name when left out. */
  slug: CategorySlugSchema.optional(),
  description: CategoryDescriptionSchema.default(''),
});
export type CreateCategoryBody = z.infer<typeof CreateCategoryBodySchema>;

/** The slug stays as it was created, so links and manifests keep working. */
export const UpdateCategoryBodySchema = z
  .strictObject({
    name: CategoryNameSchema.optional(),
    description: CategoryDescriptionSchema.optional(),
  })
  .refine((body) => body.name !== undefined || body.description !== undefined);
export type UpdateCategoryBody = z.infer<typeof UpdateCategoryBodySchema>;

export const SetPluginCategoriesBodySchema = z.strictObject({
  categoryIds: z.array(z.uuid()).max(10),
});
export type SetPluginCategoriesBody = z.infer<typeof SetPluginCategoriesBodySchema>;

export const PluginFlagsBodySchema = z
  .strictObject({
    featured: z.boolean().optional(),
    verified: z.boolean().optional(),
    visibility: z.enum(['public', 'private']).optional(),
  })
  .refine((body) => Object.values(body).some((value) => value !== undefined));
export type PluginFlagsBody = z.infer<typeof PluginFlagsBodySchema>;
