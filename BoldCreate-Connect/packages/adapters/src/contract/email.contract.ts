import { describe, it, expect } from 'vitest';
import { randomUUID } from 'node:crypto';
import type { EmailPort } from '@boldcreate-integrations/ports';

export interface EmailHarness {
  port: EmailPort;
  /**
   * Returns the messages delivered to a recipient, as the adapter's mail sink sees them. A
   * service whose mail cannot be read back leaves it out and only delivery is checked.
   */
  inbox?(to: string): Promise<{ subject: string; text: string; html?: string }[]>;
  /** An address mail may be sent to; the default is a made-up address on a reserved domain. */
  recipient?(): string;
  /** An adapter whose transport cannot be reached. */
  unreachable(): EmailPort;
}

export function runEmailContract(label: string, make: () => EmailHarness): void {
  describe(`email contract: ${label}`, () => {
    it('delivers subject, text and html', async () => {
      const harness = make();
      const to = harness.recipient?.() ?? `${randomUUID()}@example.test`;
      const sent = harness.port.send({
        to,
        subject: 'Hello there',
        text: 'plain body',
        html: '<p>html body</p>',
      });
      await expect(sent).resolves.toBeUndefined();
      if (!harness.inbox) return;
      const [message] = await harness.inbox(to);
      expect(message).toMatchObject({ subject: 'Hello there' });
      expect(message?.text).toContain('plain body');
      expect(message?.html).toContain('html body');
    });

    it('delivers a text-only message and keeps non-ASCII and leading dots', async () => {
      const harness = make();
      const to = harness.recipient?.() ?? `${randomUUID()}@example.test`;
      const sent = harness.port.send({ to, subject: 'Grüße', text: 'line one\n.dot line\nlast' });
      await expect(sent).resolves.toBeUndefined();
      if (!harness.inbox) return;
      const [message] = await harness.inbox(to);
      expect(message?.subject).toBe('Grüße');
      expect(message?.text).toContain('.dot line');
      expect(message?.html ?? '').toBe('');
    });

    it('rejects when the transport is unreachable', async () => {
      const harness = make();
      await expect(
        harness.unreachable().send({ to: 'a@example.test', subject: 's', text: 't' }),
      ).rejects.toBeInstanceOf(Error);
    });
  });
}
