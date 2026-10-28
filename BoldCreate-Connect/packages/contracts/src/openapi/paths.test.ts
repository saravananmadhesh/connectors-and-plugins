import { describe, expect, it } from 'vitest';
import { ROUTES } from '../v1/routes.js';
import { generateOpenApi } from './generate.js';

const document = generateOpenApi(ROUTES, 'public');

describe('public paths', () => {
  it('serves only plural kebab-case paths under /v1, apart from the browser helper', () => {
    const FIXED_SEGMENTS = new Set([
      'v1',
      'auth',
      'me',
      'policy',
      'credential',
      'upgrade',
      'review',
      'verify',
      'resend',
      'accept',
      'signup',
      'signin',
      'signout',
      'signout-all',
      'verify-email',
      'resend-verification',
      'forgot-password',
      'reset-password',
      'change-password',
      'change-email',
      'confirm-email-change',
      'test',
      'oauth',
      'discover',
      'start',
      'callback',
      'sync',
      'usage',
      'archive',
      'rotate',
      'rotate-secret',
      'webhook',
      'catalog',
      'session',
      'user-install-mode',
    ]);
    const offenders: string[] = [];
    for (const path of Object.keys(document.paths)) {
      if (path === '/api/csrf') continue;
      if (!path.startsWith('/v1/')) offenders.push(`${path} is not under /v1`);
      for (const segment of path
        .split('/')
        .filter((part) => part !== '' && !part.startsWith('{'))) {
        const kebab = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(segment);
        if (!kebab) offenders.push(`${path}: "${segment}" is not kebab-case`);
        else if (!segment.endsWith('s') && !FIXED_SEGMENTS.has(segment)) {
          offenders.push(`${path}: "${segment}" is not a plural noun or a fixed action`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
