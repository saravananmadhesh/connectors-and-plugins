import type { UserInstallMode } from '@boldcreate-integrations/contracts';

/**
 * What a new project starts with. Changing a default is a one line edit here, with no migration:
 * the code sets these values when it creates the project, and the host can change them later.
 */
export const DEFAULT_PROJECT_SETTINGS: { userInstallMode: UserInstallMode } = {
  /** `any`: a project user may install any plugin the project can offer. `allowlist` and `off` narrow it. */
  userInstallMode: 'any',
};
