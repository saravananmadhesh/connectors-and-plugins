/**
 * Organization, member and invite routes.
 * Prefix: /v1
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Db } from '@boldcreate-integrations/db';
import {
  CreateOrgBodySchema,
  UpdateOrgBodySchema,
  DeleteOrgQuerySchema,
  UpdateOrgMemberBodySchema,
  UpdateOrgPolicyBodySchema,
  CreateInviteBodySchema,
  AcceptInviteBodySchema,
  PageQuerySchema,
  AppError,
} from '@boldcreate-integrations/contracts';
import {
  listOrganizations,
  createOrg,
  getOrg,
  updateOrg,
  deleteOrg,
  listOrgMembers,
  updateOrgMember,
  removeOrgMember,
  readOrgPolicy,
  updateOrgPolicy,
  createInvite,
  revokeInvite,
  resendInvite,
  acceptInvite,
  listInvites,
  getOrgMe,
  requireAction,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import {
  serializeAcceptedInvite,
  serializeInvite,
  serializeInviteResults,
  serializeList,
  serializeMember,
  serializeOrg,
  serializeOrgMe,
} from '../serializers/serializers.js';

/** Lists are not paged yet, but the query they document must still be a valid one. */
function requirePageQuery(req: FastifyRequest): void {
  if (!PageQuerySchema.safeParse(req.query).success) throw new AppError('validation_failed', []);
}

export async function orgRoutes(
  app: FastifyInstance,
  opts: { db: Db; onOrgDeleted?: (orgId: string) => void },
): Promise<void> {
  const { db } = opts;

  const orgParams = (req: FastifyRequest) => req.params as { orgId: string };
  const memberParams = (req: FastifyRequest) => req.params as { orgId: string; userId: string };
  const inviteParams = (req: FastifyRequest) => req.params as { orgId: string; inviteId: string };

  // ── Organizations ──────────────────────────────────────────────────────────

  // GET /v1/orgs
  app.get('/orgs', async (req, reply) => {
    const principal = await authenticate(db, req);
    requirePageQuery(req);
    const orgs = await inTenant(db, principal, (tx) => listOrganizations(tx, principal.userId));
    return reply.status(200).send(serializeList(orgs, serializeOrg));
  });

  // POST /v1/orgs
  app.post('/orgs', async (req, reply) => {
    const principal = await authenticate(db, req);
    const parsed = CreateOrgBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const org = await inTenant(db, principal, (tx) => createOrg(tx, principal.userId, parsed.data));
    return reply.status(201).send(serializeOrg(org));
  });

  // GET /v1/orgs/:orgId
  app.get('/orgs/:orgId', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    const org = await inTenant(db, principal, (tx) => getOrg(tx, principal, orgId));
    return reply.status(200).send(serializeOrg(org));
  });

  // GET /v1/orgs/:orgId/me
  app.get('/orgs/:orgId/me', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    const me = await inTenant(db, principal, (tx) => getOrgMe(tx, principal, orgId));
    return reply.status(200).send(serializeOrgMe(me));
  });

  // PATCH /v1/orgs/:orgId
  app.patch('/orgs/:orgId', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'org:update', { orgId });
    const parsed = UpdateOrgBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const org = await inTenant(db, principal, (tx) => updateOrg(tx, principal, orgId, parsed.data));
    return reply.status(200).send(serializeOrg(org));
  });

  // DELETE /v1/orgs/:orgId
  app.delete('/orgs/:orgId', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'org:delete', { orgId });
    const parsed = DeleteOrgQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const { purgeAfter } = await inTenant(db, principal, (tx) =>
      deleteOrg(
        tx,
        orgId,
        parsed.data,
        { userId: principal.userId, requestId: req.id },
        opts.onOrgDeleted ? { onOrgDeleted: opts.onOrgDeleted } : {},
      ),
    );
    return reply.status(202).send({ status: 'deletion_pending', purgeAfter });
  });

  // GET /v1/orgs/:orgId/policy
  app.get('/orgs/:orgId/policy', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    const policy = await inTenant(db, principal, (tx) => readOrgPolicy(tx, principal, orgId));
    return reply.status(200).send(policy);
  });

  // PATCH /v1/orgs/:orgId/policy
  app.patch('/orgs/:orgId/policy', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'org-policy:update', { orgId });
    const parsed = UpdateOrgPolicyBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const policy = await inTenant(db, principal, (tx) =>
      updateOrgPolicy(tx, principal, orgId, parsed.data),
    );
    return reply.status(200).send(policy);
  });

  // ── Members ────────────────────────────────────────────────────────────────

  // GET /v1/orgs/:orgId/members
  app.get('/orgs/:orgId/members', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requirePageQuery(req);
    const members = await inTenant(db, principal, (tx) => listOrgMembers(tx, principal, orgId));
    return reply.status(200).send(serializeList(members, serializeMember));
  });

  // PATCH /v1/orgs/:orgId/members/:userId
  app.patch('/orgs/:orgId/members/:userId', async (req, reply) => {
    const { orgId, userId: targetUserId } = memberParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'member:update', { orgId });
    const parsed = UpdateOrgMemberBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const member = await inTenant(db, principal, (tx) =>
      updateOrgMember(tx, principal, orgId, targetUserId, parsed.data),
    );
    return reply.status(200).send(serializeMember(member));
  });

  // DELETE /v1/orgs/:orgId/members/:userId
  app.delete('/orgs/:orgId/members/:userId', async (req, reply) => {
    const { orgId, userId: targetUserId } = memberParams(req);
    const principal = await authenticate(db, req, orgId);

    await inTenant(db, principal, (tx) => removeOrgMember(tx, principal, orgId, targetUserId));
    return reply.status(204).send();
  });

  // ── Invites ────────────────────────────────────────────────────────────────

  // GET /v1/orgs/:orgId/invites
  app.get('/orgs/:orgId/invites', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requirePageQuery(req);
    const invites = await inTenant(db, principal, (tx) => listInvites(tx, principal, orgId));
    return reply.status(200).send(serializeList(invites, serializeInvite));
  });

  // POST /v1/orgs/:orgId/invites
  app.post('/orgs/:orgId/invites', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'invite:create', { orgId });
    const parsed = CreateInviteBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const created = await inTenant(db, principal, (tx) =>
      createInvite(tx, principal, orgId, parsed.data),
    );
    return reply.status(201).send(serializeInviteResults(created));
  });

  // DELETE /v1/orgs/:orgId/invites/:inviteId
  app.delete('/orgs/:orgId/invites/:inviteId', async (req, reply) => {
    const { orgId, inviteId } = inviteParams(req);
    const principal = await authenticate(db, req, orgId);

    await inTenant(db, principal, (tx) => revokeInvite(tx, principal, orgId, inviteId));
    return reply.status(204).send();
  });

  // POST /v1/orgs/:orgId/invites/:inviteId/resend
  app.post('/orgs/:orgId/invites/:inviteId/resend', async (req, reply) => {
    const { orgId, inviteId } = inviteParams(req);
    const principal = await authenticate(db, req, orgId);

    await inTenant(db, principal, (tx) => resendInvite(tx, principal, orgId, inviteId));
    return reply.status(202).send({});
  });

  // POST /v1/invites/accept
  app.post('/invites/accept', async (req, reply) => {
    const principal = await authenticate(db, req);
    const parsed = AcceptInviteBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const result = await inTenant(db, principal, (tx) => acceptInvite(tx, principal, parsed.data));
    return reply.status(200).send(serializeAcceptedInvite(result));
  });
}
