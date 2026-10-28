import { SessionIssuedBrowserSchema, type RouteDef } from '@boldcreate-integrations/contracts';
import type { z } from 'zod/v4';

/**
 * Routes the web backend treats differently from a plain proxy. This is data: the proxy code
 * only reads it.
 */

/** The api returns an internal session token; the BFF keeps it in a cookie and returns the rest. */
export const SESSION_ISSUING_ROUTES: ReadonlySet<string> = new Set([
  'auth.verifyEmail',
  'auth.signin',
]);

/** Sessions that end here: the cookie is cleared on any answer, even an error. */
export const COOKIE_CLEARING_ROUTES: ReadonlySet<string> = new Set([
  'auth.signout',
  'auth.signoutAll',
  'auth.resetPassword',
  'auth.changePassword',
  'auth.confirmEmailChange',
]);

/** Sessions that end only when the call succeeds; a refused call keeps the user signed in. */
export const COOKIE_CLEARING_ON_SUCCESS_ROUTES: ReadonlySet<string> = new Set(['auth.deleteMe']);

/**
 * Routes where the api answers with a redirect that goes to the browser as is. The provider sends
 * the browser back with a cross-site navigation, which carries no strict session cookie, so the
 * first hit is bounced once from this site's own page before the api is called.
 */
export const REDIRECT_ROUTES: ReadonlySet<string> = new Set(['mcpServers.oauthCallback']);

/** Response schema the browser sees, where it differs from the registered (internal) one. */
export const BROWSER_RESPONSES: Record<string, Record<number, z.ZodType>> = {
  'auth.verifyEmail': { 200: SessionIssuedBrowserSchema },
  'auth.signin': { 200: SessionIssuedBrowserSchema },
};

export function browserResponses(route: RouteDef): RouteDef['responses'] {
  return { ...route.responses, ...BROWSER_RESPONSES[route.id] };
}
