/**
 * A plugin's own logo: the image its manifest names, served straight from the repository at the
 * commit that was read. The path comes from repository content, so it is checked every time it is
 * used, both when a manifest is read and again when a stored one is turned into a link.
 */
const SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._@+-]*$/;
const IMAGE = /\.(?:png|jpe?g|svg|webp|gif)$/i;
const COMMIT = /^[0-9a-f]{40}$/;
const MAX_LENGTH = 200;
const MAX_SEGMENTS = 8;

/** The logo path from a manifest, relative to the plugin folder; null unless it is a safe image path. */
export function cleanLogoPath(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0 || value.length > MAX_LENGTH) return null;
  const parts = value.replace(/^\.\//, '').split('/');
  if (parts.length > MAX_SEGMENTS) return null;
  if (!parts.every((part) => part !== '..' && SEGMENT.test(part))) return null;
  return IMAGE.test(value) ? parts.join('/') : null;
}

/**
 * Link to the logo file on GitHub's raw host, pinned to a commit so the image cannot change
 * under a version. Null when there is no logo or the commit is not a full SHA.
 */
export function logoUrl(
  source: { owner: string; repository: string },
  commitSha: string | null,
  folder: string,
  logo: unknown,
): string | null {
  const path = cleanLogoPath(logo);
  if (path === null || commitSha === null || !COMMIT.test(commitSha)) return null;
  const segments = [...folder.split('/').filter((part) => part !== ''), ...path.split('/')];
  return `https://raw.githubusercontent.com/${[
    source.owner,
    source.repository,
    commitSha,
    ...segments,
  ]
    .map(encodeURIComponent)
    .join('/')}`;
}
