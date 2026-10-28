import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import type { Logger } from 'pino';
import { installProcessGuards } from './process-guards.js';

const root = join(import.meta.dirname, '..');

function runChild(mode: 'rejection' | 'exception') {
  return new Promise<{ code: number | null; stdout: string }>((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['--conditions=development', '--import', 'tsx/esm', 'fixtures/process-guard-child.ts', mode],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let stdout = '';
    child.stdout.on('data', (chunk: Buffer) => (stdout += chunk.toString('utf8')));
    child.stderr.resume();
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout }));
  });
}

describe('process guards', () => {
  it.each(['rejection', 'exception'] as const)(
    'exits 1 with a fatal log line after an unhandled %s',
    async (mode) => {
      const { code, stdout } = await runChild(mode);
      expect(code).toBe(1);
      const fatal = stdout
        .split('\n')
        .filter((line) => line.startsWith('{'))
        .map((line) => JSON.parse(line) as { level: number; msg: string })
        .find((line) => line.level === 60);
      expect(fatal?.msg).toBe(mode === 'rejection' ? 'unhandled rejection' : 'uncaught exception');
    },
    20_000,
  );

  it('logs, flushes and exits through the injected functions, and can be removed', () => {
    const target = new EventEmitter();
    const fatal = vi.fn<() => void>();
    const flush = vi.fn<() => void>();
    const exit = vi.fn<(code: number) => void>();
    const remove = installProcessGuards({ fatal, flush } as unknown as Logger, { target, exit });
    target.emit('uncaughtException', new Error('x'));
    expect(fatal).toHaveBeenCalledWith({ err: expect.any(Error) }, 'uncaught exception');
    expect(flush).toHaveBeenCalledOnce();
    expect(exit).toHaveBeenCalledWith(1);
    remove();
    expect(target.listenerCount('uncaughtException')).toBe(0);
    expect(target.listenerCount('unhandledRejection')).toBe(0);
  });
});
