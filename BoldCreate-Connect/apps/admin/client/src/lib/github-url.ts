export interface GithubLocation {
  owner: string;
  repository: string;
  /** Branch or tag taken from a `/tree/<ref>` link; null when the link names none. */
  ref: string | null;
  /** Folder taken from a `/tree/<ref>/<folder>` link; empty for the repository root. */
  path: string;
}

const OWNER = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPOSITORY = /^[A-Za-z0-9._-]{1,100}$/;
const SEGMENT = /^[A-Za-z0-9._-]+$/;
const HOSTS = [
  'https://www.github.com/',
  'http://www.github.com/',
  'https://github.com/',
  'http://github.com/',
  'www.github.com/',
  'github.com/',
];

/**
 * Reads what a person pastes for a repository: a github.com link (also one to a folder on a
 * branch), an ssh remote, or `owner/repository`. Returns null when it is none of those.
 */
export function parseGithubUrl(input: string): GithubLocation | null {
  let text = input.trim();
  if (text === '') return null;
  const ssh = /^git@github\.com:(.+)$/i.exec(text);
  if (ssh) text = ssh[1] as string;
  const lower = text.toLowerCase();
  const prefix = HOSTS.find((host) => lower.startsWith(host));
  if (prefix) text = text.slice(prefix.length);
  text = text.replace(/[?#].*$/, '').replace(/\/+$/, '');
  const parts = text.split('/');
  const owner = parts[0] ?? '';
  const repository = (parts[1] ?? '').replace(/\.git$/i, '');
  if (!OWNER.test(owner) || !REPOSITORY.test(repository)) return null;

  let ref: string | null = null;
  let path = '';
  if (parts.length > 2) {
    if (parts[2] !== 'tree' || parts.length < 4) return null;
    ref = parts[3] as string;
    const folder = parts.slice(4);
    if (!folder.every((part) => SEGMENT.test(part) && part !== '.' && part !== '..')) return null;
    path = folder.join('/');
  }
  return { owner, repository, ref, path };
}

/** A folder of a repository, as a source records it; empty folder is the repository root. */
export interface RepositoryFolder {
  owner: string;
  repository: string;
  folder: string;
}

/**
 * Link to a file of a plugin on GitHub at one commit, so it shows exactly what was read. An empty
 * path links to the plugin folder itself.
 */
export function githubFileUrl(location: RepositoryFolder, commitSha: string, path: string): string {
  const segments = [location.folder, path]
    .filter((part) => part !== '')
    .join('/')
    .split('/')
    .filter((part) => part !== '')
    .map(encodeURIComponent)
    .join('/');
  const kind = path === '' ? 'tree' : 'blob';
  const base = `https://github.com/${location.owner}/${location.repository}/${kind}/${commitSha}`;
  return segments === '' ? base : `${base}/${segments}`;
}
