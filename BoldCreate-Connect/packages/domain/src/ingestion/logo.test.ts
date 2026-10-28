import { describe, expect, it } from 'vitest';
import { cleanLogoPath, logoUrl } from './logo.js';

const COMMIT = 'a'.repeat(40);
const source = { owner: 'cursor', repository: 'plugins' };

describe('cleanLogoPath', () => {
  it.each([
    ['assets/logo.png', 'assets/logo.png'],
    ['./assets/logo.svg', 'assets/logo.svg'],
    ['logo.WEBP', 'logo.WEBP'],
    ['a/b/c/icon-1_2.jpeg', 'a/b/c/icon-1_2.jpeg'],
  ])('keeps the safe image path %s', (input, expected) => {
    expect(cleanLogoPath(input)).toBe(expected);
  });

  it.each([
    undefined,
    null,
    42,
    {},
    '',
    '../logo.png',
    'assets/../../logo.png',
    '/etc/logo.png',
    'assets//logo.png',
    'assets\\logo.png',
    'https://evil.example/logo.png',
    'data:image/png;base64,AAAA',
    'javascript:alert(1).png',
    'assets/logo.txt',
    'assets/logo.png?x=1',
    'assets/logo.png#frag',
    'assets/logo',
    '.hidden/logo.png',
    'a/b/c/d/e/f/g/h/i/logo.png',
    `${'a'.repeat(201)}.png`,
  ])('rejects %j', (input) => {
    expect(cleanLogoPath(input)).toBeNull();
  });
});

describe('logoUrl', () => {
  it('points at the file in the repository at the commit, under the plugin folder', () => {
    expect(logoUrl(source, COMMIT, 'third_party/x', 'assets/logo.svg')).toBe(
      `https://raw.githubusercontent.com/cursor/plugins/${COMMIT}/third_party/x/assets/logo.svg`,
    );
  });

  it('works for a plugin at the repository root', () => {
    expect(logoUrl(source, COMMIT, '', './logo.png')).toBe(
      `https://raw.githubusercontent.com/cursor/plugins/${COMMIT}/logo.png`,
    );
  });

  it('gives no link without a logo, a safe path or a full commit', () => {
    expect(logoUrl(source, COMMIT, 'x', undefined)).toBeNull();
    expect(logoUrl(source, COMMIT, 'x', '../secret.png')).toBeNull();
    expect(logoUrl(source, null, 'x', 'logo.png')).toBeNull();
    expect(logoUrl(source, 'main', 'x', 'logo.png')).toBeNull();
    expect(logoUrl(source, 'A'.repeat(40), 'x', 'logo.png')).toBeNull();
  });

  it('escapes every part of the link', () => {
    const url = logoUrl({ owner: 'o/w n', repository: 'r?' }, COMMIT, 'a b', 'logo.png');
    expect(url).toBe(`https://raw.githubusercontent.com/o%2Fw%20n/r%3F/${COMMIT}/a%20b/logo.png`);
  });
});
