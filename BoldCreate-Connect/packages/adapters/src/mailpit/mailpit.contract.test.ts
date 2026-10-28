import { vi, expect, it, describe } from 'vitest';
import { createMailpitEmail } from './index.js';
import { runEmailContract } from '../contract/email.contract.js';

const smtpUrl = process.env['MAILPIT_SMTP_URL'];
const httpUrl = process.env['TEST_MAILPIT_URL'];
if (!smtpUrl) throw new Error('Missing required test environment variable MAILPIT_SMTP_URL');
if (!httpUrl) throw new Error('Missing required test environment variable TEST_MAILPIT_URL');

async function inbox(to: string) {
  const search = await fetch(`${httpUrl}/api/v1/search?query=${encodeURIComponent(`to:${to}`)}`);
  const found = (await search.json()) as { messages: { ID: string; Subject: string }[] };
  const result: { subject: string; text: string; html?: string }[] = [];
  for (const summary of found.messages) {
    const full = (await (await fetch(`${httpUrl}/api/v1/message/${summary.ID}`)).json()) as {
      Subject: string;
      Text: string;
      HTML: string;
    };
    result.push({ subject: full.Subject, text: full.Text, html: full.HTML });
  }
  return result;
}

runEmailContract('mailpit', () => ({
  port: createMailpitEmail({ smtpUrl, from: 'noreply@example.test' }),
  inbox: async (to) => {
    await vi.waitFor(
      async () => {
        if ((await inbox(to)).length === 0) throw new Error('no message yet');
      },
      { timeout: 5000 },
    );
    return inbox(to);
  },
  unreachable: () => createMailpitEmail({ smtpUrl: 'smtp://127.0.0.1:1', from: 'a@example.test' }),
}));

describe('mailpit adapter', () => {
  it('rejects an SMTP refusal', async () => {
    const port = createMailpitEmail({ smtpUrl, from: 'noreply@example.test' });
    await expect(port.send({ to: 'not an address', subject: 's', text: 't' })).rejects.toThrow(
      /SMTP/,
    );
  });
});
