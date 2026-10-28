/**
 * Mailpit SMTP adapter, local development and tests only (the deployed-environment guard
 * rejects it). Speaks a minimal SMTP dialogue over a plain socket.
 */
import { randomUUID } from 'node:crypto';
import { createConnection, type Socket } from 'node:net';
import type { EmailMessage, EmailPort } from '@boldcreate-integrations/ports';

export interface MailpitEmailOptions {
  /** For example `smtp://localhost:1025`. */
  smtpUrl: string;
  /** Envelope and header sender. */
  from: string;
  /** Milliseconds before an SMTP dialogue is abandoned. */
  timeoutMs?: number;
}

const CRLF = '\r\n';

function encodeHeader(value: string): string {
  if (/[^\x20-\x7e]/.test(value)) return `=?UTF-8?B?${Buffer.from(value).toString('base64')}?=`;
  return value;
}

function dotStuff(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join(CRLF);
}

function buildBody(from: string, message: EmailMessage): string {
  const headers = [
    `From: ${from}`,
    `To: ${message.to}`,
    `Subject: ${encodeHeader(message.subject)}`,
    'MIME-Version: 1.0',
  ];
  if (message.html === undefined) {
    return [
      ...headers,
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: base64',
      '',
      Buffer.from(message.text).toString('base64'),
    ].join(CRLF);
  }
  const boundary = `b-${randomUUID()}`;
  const part = (type: string, content: string) =>
    [
      `--${boundary}`,
      `Content-Type: ${type}; charset=utf-8`,
      'Content-Transfer-Encoding: base64',
      '',
      Buffer.from(content).toString('base64'),
    ].join(CRLF);
  return [
    ...headers,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    part('text/plain', message.text),
    part('text/html', message.html),
    `--${boundary}--`,
  ].join(CRLF);
}

/** Reads SMTP replies line by line and resolves once the final line of a reply arrives. */
class Dialogue {
  private buffer = '';
  private waiter: ((reply: { code: number; text: string }) => void) | undefined;
  private failure: Error | undefined;
  private rejecter: ((error: Error) => void) | undefined;

  constructor(private readonly socket: Socket) {
    socket.on('data', (chunk: Buffer) => {
      this.buffer += chunk.toString();
      this.flush();
    });
    socket.on('error', (error) => this.fail(error));
    socket.on('close', () => this.fail(new Error('SMTP connection closed')));
  }

  private fail(error: Error): void {
    this.failure ??= error;
    this.rejecter?.(this.failure);
  }

  private flush(): void {
    const lines = this.buffer.split(/\r?\n/);
    for (let index = 0; index < lines.length - 1; index += 1) {
      const line = lines[index]!;
      if (/^\d{3} /.test(line) || /^\d{3}$/.test(line)) {
        this.buffer = lines.slice(index + 1).join(CRLF);
        const waiter = this.waiter;
        this.waiter = undefined;
        waiter?.({ code: Number(line.slice(0, 3)), text: line });
        return;
      }
    }
  }

  reply(): Promise<{ code: number; text: string }> {
    return new Promise((resolve, reject) => {
      if (this.failure) return reject(this.failure);
      this.rejecter = reject;
      this.waiter = resolve;
      this.flush();
    });
  }

  async expect(code: number): Promise<void> {
    const reply = await this.reply();
    if (reply.code !== code) throw new Error(`SMTP error ${reply.code}`);
  }

  send(line: string): void {
    this.socket.write(`${line}${CRLF}`);
  }
}

export function createMailpitEmail(options: MailpitEmailOptions): EmailPort {
  const url = new URL(options.smtpUrl);
  const host = url.hostname;
  const port = url.port ? Number(url.port) : 1025;
  const timeoutMs = options.timeoutMs ?? 10_000;

  return {
    async send(message: EmailMessage): Promise<void> {
      const socket = createConnection({ host, port });
      const timer = setTimeout(() => socket.destroy(new Error('SMTP timeout')), timeoutMs);
      const dialogue = new Dialogue(socket);
      try {
        await dialogue.expect(220);
        dialogue.send('EHLO boldcreate');
        await dialogue.expect(250);
        dialogue.send(`MAIL FROM:<${options.from}>`);
        await dialogue.expect(250);
        dialogue.send(`RCPT TO:<${message.to}>`);
        await dialogue.expect(250);
        dialogue.send('DATA');
        await dialogue.expect(354);
        dialogue.send(`${dotStuff(buildBody(options.from, message))}${CRLF}.`);
        await dialogue.expect(250);
        dialogue.send('QUIT');
      } finally {
        clearTimeout(timer);
        socket.destroy();
      }
    },
  };
}
