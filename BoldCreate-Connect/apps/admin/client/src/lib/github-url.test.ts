import { describe, expect, it } from 'vitest';
import { parseGithubUrl } from './github-url';

describe('parseGithubUrl', () => {
  it.each([
    [
      'https://github.com/acme/plugins',
      { owner: 'acme', repository: 'plugins', ref: null, path: '' },
    ],
    [
      'http://www.github.com/acme/plugins/',
      { owner: 'acme', repository: 'plugins', ref: null, path: '' },
    ],
    ['github.com/acme/plugins', { owner: 'acme', repository: 'plugins', ref: null, path: '' }],
    ['  acme/plugins  ', { owner: 'acme', repository: 'plugins', ref: null, path: '' }],
    [
      'https://github.com/acme/plugins.git',
      { owner: 'acme', repository: 'plugins', ref: null, path: '' },
    ],
    [
      'git@github.com:acme/plugins.git',
      { owner: 'acme', repository: 'plugins', ref: null, path: '' },
    ],
    [
      'https://github.com/acme/plugins?tab=readme#top',
      { owner: 'acme', repository: 'plugins', ref: null, path: '' },
    ],
    [
      'https://github.com/acme/plugins/tree/release',
      { owner: 'acme', repository: 'plugins', ref: 'release', path: '' },
    ],
    [
      'https://github.com/acme/plugins/tree/main/plugins/tools/',
      { owner: 'acme', repository: 'plugins', ref: 'main', path: 'plugins/tools' },
    ],
  ])('reads %s', (input, expected) => {
    expect(parseGithubUrl(input)).toEqual(expected);
  });

  it.each([
    '',
    '   ',
    'plugins',
    'https://example.com/acme/plugins',
    'https://github.com/acme',
    'https://github.com/-bad/plugins',
    'https://github.com/acme/bad repo',
    'https://github.com/acme/plugins/issues/4',
    'https://github.com/acme/plugins/tree',
    'https://github.com/acme/plugins/tree/main/../secret',
    'https://github.com/acme/plugins/tree/main/a b',
  ])('refuses %j', (input) => {
    expect(parseGithubUrl(input)).toBeNull();
  });
});
