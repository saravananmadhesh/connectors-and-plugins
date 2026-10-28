/**
 * Feature flags and their built-in values. A flag with no stored row takes the value here, so
 * risky or optional behaviour stays off until an administrator turns it on.
 */
export const FLAG_DEFAULTS = {
  public_plugin_sources: false,
  follow_latest_updates: false,
  oauth_dcr: false,
  archive_prefetch: false,
} as const;

export type FlagKey = keyof typeof FLAG_DEFAULTS;

export const FLAG_KEYS = Object.keys(FLAG_DEFAULTS) as FlagKey[];

export function isFlagKey(value: string): value is FlagKey {
  return Object.hasOwn(FLAG_DEFAULTS, value);
}
