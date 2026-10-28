/**
 * Helpers shared by the browser specs. The stack (web, api, worker, Mailpit) is the one the
 * runner started; nothing here is mocked.
 */
import { randomBytes } from 'node:crypto';

/** Hooks for fixture servers a spec needs next to the stack; started and stopped by the specs. */
export const fixtures: { start: () => Promise<void>; stop: () => Promise<void> }[] = [];

const mailpitUrl = () => process.env['TEST_MAILPIT_URL'] ?? 'http://localhost:8025';

/** A new address on a reserved domain, unique per call. */
export function uniqueEmail(prefix = 'e2e'): string {
  return `${prefix}-${randomBytes(6).toString('hex')}@example.test`;
}

interface MailpitMessage {
  ID: string;
  To?: { Address?: string }[];
}

/** Polls Mailpit for a mail to `email` and returns the first link in its text body. */
export async function mailpit(email: string, timeoutMs = 30_000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const list = (await (await fetch(`${mailpitUrl()}/api/v1/messages`)).json()) as {
      messages?: MailpitMessage[];
    };
    for (const message of list.messages ?? []) {
      if (!message.To?.some((to) => to.Address?.toLowerCase() === email.toLowerCase())) continue;
      const full = (await (await fetch(`${mailpitUrl()}/api/v1/message/${message.ID}`)).json()) as {
        Text?: string;
      };
      const link = /https?:\/\/\S+/.exec(full.Text ?? '')?.[0];
      if (link) return link;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 300));
  }
  throw new Error(`No mail with a link for ${email} arrived in Mailpit`);
}
