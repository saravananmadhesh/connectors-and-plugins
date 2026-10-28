/**
 * Limits of custom installation variables. The browser app may only import types from the
 * contracts package, so these are repeated here; a contracts test keeps them equal.
 */
export const CUSTOM_VARIABLE_NAME_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
export const MAX_CUSTOM_VARIABLES = 10;
