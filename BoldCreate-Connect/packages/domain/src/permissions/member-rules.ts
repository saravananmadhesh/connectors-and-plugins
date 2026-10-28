import type { OrgRole, PublicRole } from '@boldcreate-integrations/contracts';

/** True for the role that administers an organization: members, invites and deleting it. */
export function isAdminRole(role: OrgRole): boolean {
  return role === 'ADMIN';
}

/** True for the Member role (Developer in the Platform screens), below admin. */
export function isMemberRole(role: OrgRole): boolean {
  return role === 'MEMBER';
}

/**
 * Whether a public role hands the person the management of the organization (the Member role). A host application needs the app's admin switch to give it.
 */
export function grantsOrgManagement(role: PublicRole): boolean {
  return role === 'MEMBER';
}

/**
 * Whether an actor may hand out, change or take away organization roles and remove members. Only an
 * admin does; the matrix decides the same for the routes, and this is the second check in the
 * domain functions.
 */
export function canChangeMembers(actorRole: OrgRole): boolean {
  return isAdminRole(actorRole);
}

/**
 * Validate that a key's permissions are a subset of what the issuer can delegate.
 * Returns the invalid permissions, or an empty array if all are valid.
 */
export function invalidKeyPermissions<T extends string>(
  issuerCanDelegate: readonly T[],
  requested: readonly T[],
): T[] {
  const allowed = new Set(issuerCanDelegate);
  return requested.filter((p) => !allowed.has(p));
}

/** True for the roles that manage the organization: admins and members. A viewer only reads. */
export function isOrgManagerRole(role: OrgRole): boolean {
  return role === 'ADMIN' || role === 'MEMBER';
}

/** The change a member row goes through; absent fields stay as they are. */
export interface MemberState {
  role: OrgRole;
  status: 'active' | 'suspended';
}

/**
 * Whether applying `next` to the target would leave the organization without an active admin.
 * `lockedAdminIds` is the locked set of active admins read in the same transaction.
 */
export function leavesNoActiveAdmin(
  lockedAdminIds: readonly string[],
  targetUserId: string,
  next: MemberState,
): boolean {
  if (!lockedAdminIds.includes(targetUserId)) return false;
  if (next.role === 'ADMIN' && next.status === 'active') return false;
  return lockedAdminIds.every((id) => id === targetUserId);
}

/** True for a member who administers the organization and counts toward its admins. */
export function isActiveAdmin(member: { role: OrgRole; status: 'active' | 'suspended' }): boolean {
  return isAdminRole(member.role) && member.status === 'active';
}
