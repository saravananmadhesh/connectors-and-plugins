/**
 * Amazon SES adapter over the SESv2 `SendEmail` call with simple content. Credentials come
 * from the SDK default chain, or from an explicit key pair when SES sits in another account. The client is injectable so request shapes and error mapping are
 * tested without the service; SDK errors never leave this file.
 */
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import {
  EmailUnavailableError,
  type EmailMessage,
  type EmailPort,
} from '@boldcreate-integrations/ports';

/** The part of `SESv2Client` this adapter uses. */
export interface SesClientLike {
  send(command: SendEmailCommand): Promise<unknown>;
}

export interface SesEmailOptions {
  region: string;
  /** Sender address; it must be an identity verified in the region. */
  from: string;
  configurationSet?: string | undefined;
  accessKeyId?: string | undefined;
  secretAccessKey?: string | undefined;
  client?: SesClientLike | undefined;
}

const CHARSET = 'UTF-8';

export function createSesEmail(options: SesEmailOptions): EmailPort {
  const client: SesClientLike =
    options.client ??
    new SESv2Client({
      region: options.region,
      ...(options.accessKeyId && options.secretAccessKey
        ? {
            credentials: {
              accessKeyId: options.accessKeyId,
              secretAccessKey: options.secretAccessKey,
            },
          }
        : {}),
    });

  return {
    async send(message: EmailMessage): Promise<void> {
      const command = new SendEmailCommand({
        FromEmailAddress: options.from,
        Destination: { ToAddresses: [message.to] },
        Content: {
          Simple: {
            Subject: { Data: message.subject, Charset: CHARSET },
            Body: {
              Text: { Data: message.text, Charset: CHARSET },
              ...(message.html === undefined
                ? {}
                : { Html: { Data: message.html, Charset: CHARSET } }),
            },
          },
        },
        ...(options.configurationSet ? { ConfigurationSetName: options.configurationSet } : {}),
      });
      try {
        await client.send(command);
      } catch (error) {
        throw new EmailUnavailableError(undefined, { cause: error });
      }
    },
  };
}
