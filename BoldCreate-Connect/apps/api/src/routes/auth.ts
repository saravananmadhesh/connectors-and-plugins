/**
 * Internal auth routes — called only by the customer BFF.
 * Prefix: /v1/auth
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Db } from '@boldcreate-integrations/db';
import {
  SignupBodySchema,
  SigninBodySchema,
  VerifyEmailBodySchema,
  ResendVerificationBodySchema,
  ForgotPasswordBodySchema,
  ResetPasswordBodySchema,
  ChangePasswordBodySchema,
  ChangeEmailBodySchema,
  ConfirmEmailChangeBodySchema,
  DeleteUserQuerySchema,
  AppError,
} from '@boldcreate-integrations/contracts';
import {
  signup,
  verifyEmail,
  resendVerification,
  signin,
  signout,
  signoutAll,
  forgotPassword,
  resetPassword,
  changePassword,
  requestEmailChange,
  confirmEmailChange,
  getMe,
  deleteUser,
  authenticateSession,
  hashSessionToken,
  type AuthContext,
} from '@boldcreate-integrations/domain';
import { withSession } from '../session-guard.js';
import type { LoginThrottle } from '../auth/login-throttle.js';
import { serializeMe, serializeUser } from '../serializers/serializers.js';
import { formatId } from '@boldcreate-integrations/contracts';

function contextOf(req: FastifyRequest): AuthContext {
  const ua = req.headers['user-agent'];
  return {
    ip: req.clientIp,
    requestId: req.id,
    ...(typeof ua === 'string' ? { userAgent: ua } : {}),
  };
}

export async function authRoutes(
  app: FastifyInstance,
  opts: { db: Db; loginThrottle: LoginThrottle; onOrgDeleted?: (orgId: string) => void },
): Promise<void> {
  const { db, loginThrottle } = opts;

  // POST /v1/auth/signup
  app.post('/signup', async (req, reply) => {
    const parsed = SignupBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const result = await signup(db, parsed.data, app.authPolicy);
    return reply.status(201).send({ userId: formatId('usr', result.userId) });
  });

  // POST /v1/auth/verify-email
  app.post('/verify-email', async (req, reply) => {
    const parsed = VerifyEmailBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    const result = await verifyEmail(db, parsed.data, app.authPolicy, contextOf(req));
    return reply.status(200).send({
      sessionToken: result.sessionToken,
      user: serializeUser(result.user),
    });
  });

  // POST /v1/auth/resend-verification
  app.post('/resend-verification', async (req, reply) => {
    const parsed = ResendVerificationBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }
    await resendVerification(db, parsed.data);
    return reply.status(202).send({});
  });

  // POST /v1/auth/signin
  app.post('/signin', async (req, reply) => {
    const parsed = SigninBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    // Throttled before any password is checked, so a correct password cannot get past it.
    const throttle = await loginThrottle(req.clientIp, parsed.data.email);
    if (!throttle.allowed) {
      void reply.header('retry-after', String(throttle.retryAfterSeconds));
      throw new AppError('rate_limited');
    }

    const result = await signin(db, parsed.data, contextOf(req), app.authPolicy);
    return reply.status(200).send({
      sessionToken: result.sessionToken,
      user: serializeUser(result.user),
    });
  });

  // POST /v1/auth/signout
  app.post('/signout', async (req, reply) => {
    const raw = req.headers['x-session-token'];
    if (typeof raw === 'string') {
      await signout(db, hashSessionToken(raw), contextOf(req));
    }
    return reply.status(204).send();
  });

  // POST /v1/auth/signout-all
  app.post('/signout-all', async (req, reply) => {
    await withSession(db, req);
    await signoutAll(db, req.userId!, contextOf(req));
    return reply.status(204).send();
  });

  // POST /v1/auth/forgot-password
  app.post('/forgot-password', async (req, reply) => {
    const parsed = ForgotPasswordBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }
    await forgotPassword(db, parsed.data);
    return reply.status(202).send({});
  });

  // POST /v1/auth/reset-password
  app.post('/reset-password', async (req, reply) => {
    const parsed = ResetPasswordBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    await resetPassword(db, parsed.data, app.authPolicy, contextOf(req));
    return reply.status(204).send();
  });

  // POST /v1/auth/change-password
  app.post('/change-password', async (req, reply) => {
    await withSession(db, req);
    const parsed = ChangePasswordBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }

    await changePassword(db, req.userId!, parsed.data, app.authPolicy, contextOf(req));
    return reply.status(204).send();
  });

  // POST /v1/auth/change-email
  app.post('/change-email', async (req, reply) => {
    await withSession(db, req);
    const parsed = ChangeEmailBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }
    await requestEmailChange(db, req.userId!, parsed.data);
    return reply.status(202).send({});
  });

  // POST /v1/auth/confirm-email-change
  app.post('/confirm-email-change', async (req, reply) => {
    const parsed = ConfirmEmailChangeBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }
    await confirmEmailChange(db, parsed.data, contextOf(req));
    return reply.status(204).send();
  });

  // GET /v1/auth/me
  app.get('/me', async (req, reply) => {
    await withSession(db, req);

    const result = await getMe(db, req.userId!);
    return reply.status(200).send(serializeMe(result));
  });

  // DELETE /v1/auth/me?confirmEmail=
  app.delete('/me', async (req, reply) => {
    await withSession(db, req);
    const parsed = DeleteUserQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError('validation_failed', []);
    }
    const { purgeAfter } = await deleteUser(
      db,
      req.userId!,
      parsed.data.confirmEmail,
      contextOf(req),
      opts.onOrgDeleted ? { onOrgDeleted: opts.onOrgDeleted } : {},
    );
    return reply.status(202).send({ status: 'deletion_pending', purgeAfter });
  });

  // POST /v1/auth/session — validate session proof, return userId
  app.post('/session', async (req, reply) => {
    const raw = req.headers['x-session-token'];
    if (!raw || typeof raw !== 'string') {
      throw new AppError('unauthenticated');
    }
    const session = await authenticateSession(db, raw, app.authPolicy.session, new Date());
    if (!session) throw new AppError('unauthenticated');
    return reply.status(200).send({
      userId: formatId('usr', session.userId),
      sessionId: formatId('ses', session.sessionId),
    });
  });
}
