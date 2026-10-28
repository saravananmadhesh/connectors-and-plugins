/**
 * Must be the FIRST setup file so IS_REACT_ACT_ENVIRONMENT is set before
 * React or any test utilities are imported.
 *
 * React 19 requires this global to be true in test environments so that
 * act() wrapping is enforced and waitFor() resolves correctly.
 * https://react.dev/reference/react/act
 */
// @ts-expect-error — not in lib types but required by React 19 scheduler
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
