/**
 * Decodes prefixed ids in path parameters to row uuids, once, before validation.
 *
 * A malformed id (wrong prefix, wrong length, a bare uuid) can never exist, so it answers
 * `404 not_found` like an id that is well formed but unknown; it is not an oracle.
 */
import type { FastifyInstance } from 'fastify';
import { AppError, parseId, type IdPrefix } from '@boldcreate-integrations/contracts';

/** Path parameter name to the prefix of the id it carries. */
export const PARAM_PREFIXES: Record<string, IdPrefix> = {
  orgId: 'org',
  userId: 'usr',
  inviteId: 'inv',
  installationId: 'ins',
  keyId: 'key',
  pluginId: 'plg',
  pluginVersionId: 'pv',
  componentId: 'cmp',
  projectId: 'prj',
  projectKeyId: 'pjk',
  setId: 'pls',
  sessionId: 'pjs',
  connectionId: 'ucn',
  authConfigId: 'acf',
  projectUserId: 'usr',
};

export function registerIdParamDecoding(app: FastifyInstance): void {
  app.addHook('preValidation', async (req) => {
    const params = req.params as Record<string, string> | undefined;
    if (!params) return;
    for (const [name, value] of Object.entries(params)) {
      const prefix = PARAM_PREFIXES[name];
      if (!prefix) continue;
      try {
        params[name] = parseId(prefix, value);
      } catch {
        throw new AppError('not_found');
      }
    }
  });
}
