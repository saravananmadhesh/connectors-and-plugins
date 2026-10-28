/**
 * Marketplace routes (read side).
 * Registered under /v1:
 *   GET /v1/plugins
 *   GET /v1/categories
 *   GET /v1/plugins/:pluginId
 *   GET /v1/plugins/:pluginId/versions
 *   GET /v1/plugin-versions/:pluginVersionId
 *   GET /v1/plugin-versions/:pluginVersionId/review
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { withTenant, type Db, type Tx } from '@boldcreate-integrations/db';
import {
  PageQuerySchema,
  PluginListQuerySchema,
  AppError,
} from '@boldcreate-integrations/contracts';
import {
  listCategories,
  listPlugins,
  getPlugin,
  listPluginVersions,
  getPluginVersion,
  getPluginVersionReview,
} from '@boldcreate-integrations/domain';
import { withSession } from '../session-guard.js';
import {
  serializePage,
  serializePluginPage,
  serializePluginDetail,
  serializePluginVersion,
  serializePluginVersionDetail,
  serializePluginVersionReview,
} from '../serializers/serializers.js';

export async function marketplaceRoutes(app: FastifyInstance, opts: { db: Db }): Promise<void> {
  const { db } = opts;
  // Catalog visibility depends on the caller's memberships, which the row policies show by user.
  const inUserContext = <T>(req: FastifyRequest, fn: (tx: Tx) => Promise<T>) =>
    withTenant(db, { userId: req.userId! }, fn);

  app.get('/plugins', async (req, reply) => {
    await withSession(db, req);
    const parsed = PluginListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const result = await inUserContext(req, (tx) => listPlugins(tx, req.userId!, parsed.data));
    return reply.status(200).send(serializePluginPage(result));
  });

  app.get('/categories', async (req, reply) => {
    await withSession(db, req);
    const items = await inUserContext(req, (tx) => listCategories(tx));
    return reply.status(200).send({ items });
  });

  app.get('/plugins/:pluginId', async (req, reply) => {
    await withSession(db, req);
    const { pluginId } = req.params as { pluginId: string };

    const result = await inUserContext(req, (tx) => getPlugin(tx, req.userId!, pluginId));
    return reply.status(200).send(serializePluginDetail(result));
  });

  app.get('/plugins/:pluginId/versions', async (req, reply) => {
    await withSession(db, req);
    const { pluginId } = req.params as { pluginId: string };
    const parsed = PageQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const result = await inUserContext(req, (tx) =>
      listPluginVersions(tx, req.userId!, pluginId, parsed.data),
    );
    return reply.status(200).send(serializePage(result, serializePluginVersion));
  });

  app.get('/plugin-versions/:pluginVersionId', async (req, reply) => {
    await withSession(db, req);
    const { pluginVersionId } = req.params as { pluginVersionId: string };

    const result = await inUserContext(req, (tx) =>
      getPluginVersion(tx, req.userId!, pluginVersionId),
    );
    return reply.status(200).send(serializePluginVersionDetail(result));
  });

  app.get('/plugin-versions/:pluginVersionId/review', async (req, reply) => {
    await withSession(db, req);
    const { pluginVersionId } = req.params as { pluginVersionId: string };

    const result = await inUserContext(req, (tx) =>
      getPluginVersionReview(tx, req.userId!, pluginVersionId),
    );
    return reply.status(200).send(serializePluginVersionReview(result));
  });
}
