import type { UserInstallMode } from '@boldcreate-integrations/contracts';

/**
 * What a new project starts with. Changing a default is a one line edit here, with no migration:
 * the code sets these values when it creates the project, and the host can change them later.
 */
export const DEFAULT_PROJECT_SETTINGS: { userInstallMode: UserInstallMode } = {
  /** `off`: users receive what the project delivers and install nothing. `allowlist` and `any` open it up. */
  userInstallMode: 'off',
};
