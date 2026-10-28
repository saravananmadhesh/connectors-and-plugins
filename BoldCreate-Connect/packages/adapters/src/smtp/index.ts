import net from 'node:net';
import tls from 'node:tls';
import {
  EmailUnavailableError,
  type EmailMessage,
  type EmailPort,
} from '@boldcreate-integrations/ports';

export interface SmtpOptions {
  host: string;
  port: number;
  user?: string | undefined;
  pass?: string | undefined;
  from: string;
}

export function createSmtpEmail(options: SmtpOptions): EmailPort {
  return {
    async send(message: EmailMessage): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const socket = net.createConnection(options.port, options.host);
        let tlsSocket: tls.TLSSocket | null = null;
        let step = 0;

        function getActiveSocket(): net.Socket | tls.TLSSocket {
          return tlsSocket ?? socket;
        }

        function sendLine(line: string) {
          getActiveSocket().write(line + '\r\n');
        }

        socket.on('error', (err) => reject(new EmailUnavailableError(undefined, { cause: err })));

        socket.on('data', (data) => {
          if (tlsSocket) return;
          const str = data.toString();
          if (step === 0 && str.startsWith('220')) {
            step = 1;
            sendLine('EHLO localhost');
          } else if (step === 1 && str.startsWith('250')) {
            step = 2;
            sendLine('STARTTLS');
          } else if (step === 2 && str.startsWith('220')) {
            step = 3;
            tlsSocket = tls.connect({ socket, host: options.host, rejectUnauthorized: false });
            tlsSocket.on('error', (err) =>
              reject(new EmailUnavailableError(undefined, { cause: err })),
            );
            tlsSocket.on('data', handleTlsData);
            sendLine('EHLO localhost');
          }
        });

        function handleTlsData(data: Buffer) {
          const str = data.toString();
          if (step === 3 && str.startsWith('250')) {
            step = 4;
            sendLine('AUTH LOGIN');
          } else if (step === 4 && str.startsWith('334')) {
            step = 5;
            sendLine(Buffer.from(options.user ?? '').toString('base64'));
          } else if (step === 5 && str.startsWith('334')) {
            step = 6;
            sendLine(Buffer.from(options.pass ?? '').toString('base64'));
          } else if (step === 6 && str.startsWith('235')) {
            step = 7;
            sendLine(`MAIL FROM:<${options.from}>`);
          } else if (step === 7 && str.startsWith('250')) {
            step = 8;
            sendLine(`RCPT TO:<${message.to}>`);
          } else if (step === 8 && str.startsWith('250')) {
            step = 9;
            sendLine('DATA');
          } else if (step === 9 && str.startsWith('354')) {
            step = 10;
            const headers = [
              `From: ${options.from}`,
              `To: ${message.to}`,
              `Subject: ${message.subject}`,
              'MIME-Version: 1.0',
            ];
            if (message.html) {
              headers.push('Content-Type: text/html; charset=utf-8');
            } else {
              headers.push('Content-Type: text/plain; charset=utf-8');
            }
            const body = message.html ?? message.text ?? '';
            sendLine(`${headers.join('\r\n')}\r\n\r\n${body}\r\n.`);
          } else if (step === 10 && str.startsWith('250')) {
            step = 11;
            sendLine('QUIT');
            resolve();
          } else if (str.startsWith('4') || str.startsWith('5')) {
            reject(new EmailUnavailableError(`SMTP error: ${str.trim()}`));
          }
        }
      });
    },
  };
}
