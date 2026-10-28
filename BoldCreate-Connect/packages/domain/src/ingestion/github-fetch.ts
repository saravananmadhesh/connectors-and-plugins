/**
 * Resolves a ref on GitHub to a commit and downloads that commit's archive through the outbound
 * guard. Used by the worker to ingest and by the admin app to inspect a repository.
 */
import {
  createSsrfGuard,
  guardedFetch,
  type GuardedResponse,
  type SsrfGuard,
} from '@boldcreate-integrations/security';
import type { FetchedArchive, IngestionDeps } from './ingest.js';
import { IngestionError } from './tar.js';

const GITHUB_HOSTS = ['api.github.com', 'codeload.github.com'];
const MAX_REDIRECTS = 3;
const COMMIT_SHA = /^[0-9a-f]{40}$/;

export interface GithubFetcherOptions {
  guard: SsrfGuard;
  /** Optional token for private repositories; sent to `api.github.com` only. */
  token?: string | undefined;
}

export function createGithubFetcher(options: GithubFetcherOptions): IngestionDeps['fetchArchive'] {
  const headers = (accept: string, auth: boolean) => ({
    accept,
    'user-agent': 'boldcreate-ingestion',
    ...(auth && options.token ? { authorization: `Bearer ${options.token}` } : {}),
  });

  return async ({ owner, repository, ref }): Promise<FetchedArchive> => {
    const base = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
    const resolved = await guardedFetch(
      options.guard,
      `https://api.github.com${base}/commits/${encodeURIComponent(ref)}`,
      { method: 'GET', headers: headers('application/vnd.github.sha', true) },
      { purpose: 'github_source', allowedHosts: GITHUB_HOSTS, maxBytes: 1024 },
    ).catch(() => {
      throw new IngestionError('GitHub could not be reached to resolve the commit.');
    });
    const commitSha = resolved.body.toString('utf8').trim();
    if (resolved.status !== 200 || !COMMIT_SHA.test(commitSha)) {
      throw new IngestionError('The ref could not be resolved to a commit.');
    }

    // Public repositories come straight from codeload; private ones go through the API.
    let url: string | null = options.token
      ? `https://api.github.com${base}/tarball/${commitSha}`
      : `https://codeload.github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/tar.gz/${commitSha}`;
    for (let hop = 0; url !== null && hop <= MAX_REDIRECTS; hop += 1) {
      const isApi: boolean = new URL(url).hostname === 'api.github.com';
      const response: GuardedResponse = await guardedFetch(
        options.guard,
        url,
        { method: 'GET', headers: headers('application/x-gzip', isApi) },
        { purpose: 'github_source', allowedHosts: GITHUB_HOSTS },
      ).catch(() => {
        throw new IngestionError('The repository archive could not be downloaded.');
      });
      if (response.redirectTo) {
        url = response.redirectTo.toString();
        continue;
      }
      if (response.status !== 200) {
        throw new IngestionError('The repository archive could not be downloaded.');
      }
      return { commitSha, tarball: response.body };
    }
    throw new IngestionError('The repository archive could not be downloaded.');
  };
}

/** The fetcher with the standard outbound guard, for apps that do not hold their own guard. */
export function createDefaultGithubFetcher(options: {
  deployed: boolean;
  token?: string | undefined;
}): IngestionDeps['fetchArchive'] {
  return createGithubFetcher({
    guard: createSsrfGuard({ deployed: options.deployed }),
    token: options.token,
  });
}
