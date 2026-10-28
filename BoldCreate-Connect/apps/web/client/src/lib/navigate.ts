/**
 * Sends the whole page to another address, for the provider's sign-in page. Kept apart so tests can
 * replace it; only web addresses are followed.
 */
export function leaveTo(address: string): boolean {
  let url: URL;
  try {
    url = new URL(address);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  window.location.assign(url.toString());
  return true;
}
