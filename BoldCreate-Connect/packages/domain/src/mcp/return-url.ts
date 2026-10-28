/**
 * The return address of a sign-in a host's call started. It is checked against the origins the
 * project registered when the flow starts, and again when the browser comes back.
 */

/**
 * The parsed address when it is on one of the origins, else null. Origins are compared as origins
 * and never as text prefixes, so `https://app.example.com.evil.test` and
 * `https://app.example.com@evil.test` do not pass. No credentials and no fragment, because the
 * callback adds its answer to the query.
 */
export function returnUrlAllowed(returnUrl: string, origins: readonly string[]): URL | null {
  if (returnUrl.includes('#')) return null;
  let url: URL;
  try {
    url = new URL(returnUrl);
  } catch {
    return null;
  }
  if (url.username !== '' || url.password !== '') return null;
  return origins.includes(url.origin) ? url : null;
}
