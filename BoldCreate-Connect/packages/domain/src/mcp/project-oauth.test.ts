import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { AppError } from '../errors.js';
import { checkProjectReturn } from './project-oauth.js';

const PROJECT_ID = '3f2b8c1e-6d4a-4b7e-9a10-5c8e2d7f4a61';
const ORIGINS = ['https://app.example.test'];

/** A handle whose one select answers with the given project rows. */
function dbWith(rows: { status: string; origins: string[] }[]): Executor {
  const chain = { from: () => chain, where: () => chain, limit: async () => rows };
  return { select: () => chain } as unknown as Executor;
}

const start = (returnUrl: string, clientState?: string) => ({
  projectId: PROJECT_ID,
  returnUrl,
  clientState,
});

async function codeOf(promise: Promise<unknown>): Promise<string | undefined> {
  try {
    await promise;
  } catch (error) {
    return error instanceof AppError ? error.code : 'other';
  }
  return undefined;
}

describe('checkProjectReturn', () => {
  it('keeps the address, the project and the state of an active project', async () => {
    const db = dbWith([{ status: 'active', origins: ORIGINS }]);
    expect(await checkProjectReturn(db, start('https://app.example.test/a?b=1', 's-1'))).toEqual({
      projectId: PROJECT_ID,
      returnUrl: 'https://app.example.test/a?b=1',
      clientState: 's-1',
    });
  });

  it('keeps no state when none was given', async () => {
    const db = dbWith([{ status: 'active', origins: ORIGINS }]);
    expect(
      (await checkProjectReturn(db, start('https://app.example.test/'))).clientState,
    ).toBeNull();
  });

  it.each(['suspended', 'revoked'])('treats a %s project as not found', async (status) => {
    const db = dbWith([{ status, origins: ORIGINS }]);
    expect(await codeOf(checkProjectReturn(db, start('https://app.example.test/')))).toBe(
      'not_found',
    );
  });

  it('treats a project that does not exist as not found', async () => {
    expect(await codeOf(checkProjectReturn(dbWith([]), start('https://app.example.test/')))).toBe(
      'not_found',
    );
  });

  it.each([
    'https://evil.example/x',
    'https://app.example.test.evil.test/x',
    'https://app.example.test@evil.test/x',
    'http://app.example.test/x',
    'https://app.example.test/x#frag',
    '/relative',
    '',
  ])('refuses %s', async (address) => {
    const db = dbWith([{ status: 'active', origins: ORIGINS }]);
    expect(await codeOf(checkProjectReturn(db, start(address)))).toBe('return_url_not_allowed');
  });

  it('refuses every address when the project has no origins', async () => {
    const db = dbWith([{ status: 'active', origins: [] }]);
    expect(await codeOf(checkProjectReturn(db, start('https://app.example.test/')))).toBe(
      'return_url_not_allowed',
    );
  });
});
