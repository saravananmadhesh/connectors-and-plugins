import { describe, expect, it } from 'vitest';
import type { SendEmailCommand } from '@aws-sdk/client-sesv2';
import { EmailUnavailableError } from '@boldcreate-integrations/ports';
import { createSesEmail, type SesClientLike } from './index.js';
import { runEmailContract } from '../contract/email.contract.js';

function recordingClient(): SesClientLike & { sent: SendEmailCommand['input'][] } {
  const sent: SendEmailCommand['input'][] = [];
  return {
    sent,
    async send(command) {
      sent.push(command.input);
      return {};
    },
  };
}

const failingClient = (error: unknown): SesClientLike => ({
  send: async () => {
    throw error;
  },
});

const recorder = recordingClient();

runEmailContract('ses (fake sdk client)', () => ({
  port: createSesEmail({ region: 'eu-west-1', from: 'noreply@example.test', client: recorder }),
  inbox: async (to) =>
    recorder.sent
      .filter((input) => input.Destination?.ToAddresses?.[0] === to)
      .map((input) => ({
        subject: input.Content?.Simple?.Subject?.Data ?? '',
        text: input.Content?.Simple?.Body?.Text?.Data ?? '',
        html: input.Content?.Simple?.Body?.Html?.Data ?? '',
      })),
  unreachable: () =>
    createSesEmail({
      region: 'eu-west-1',
      from: 'noreply@example.test',
      client: failingClient(new Error('connect ECONNREFUSED')),
    }),
}));

describe('ses adapter request', () => {
  it('sends simple UTF-8 content with text and html to one recipient', async () => {
    const client = recordingClient();
    const email = createSesEmail({ region: 'eu-west-1', from: 'noreply@example.test', client });
    await email.send({ to: 'a@example.test', subject: 'Grüße', text: 'plain', html: '<b>x</b>' });
    expect(client.sent).toEqual([
      {
        FromEmailAddress: 'noreply@example.test',
        Destination: { ToAddresses: ['a@example.test'] },
        Content: {
          Simple: {
            Subject: { Data: 'Grüße', Charset: 'UTF-8' },
            Body: {
              Text: { Data: 'plain', Charset: 'UTF-8' },
              Html: { Data: '<b>x</b>', Charset: 'UTF-8' },
            },
          },
        },
      },
    ]);
  });

  it('omits html when there is none and sets the configuration set when configured', async () => {
    const client = recordingClient();
    const email = createSesEmail({
      region: 'eu-west-1',
      from: 'noreply@example.test',
      configurationSet: 'transactional',
      client,
    });
    await email.send({ to: 'a@example.test', subject: 's', text: 't' });
    expect(client.sent[0]?.ConfigurationSetName).toBe('transactional');
    expect(client.sent[0]?.Content?.Simple?.Body).toEqual({
      Text: { Data: 't', Charset: 'UTF-8' },
    });
  });

  it('maps every SDK failure to the port error without leaking it', async () => {
    const email = createSesEmail({
      region: 'eu-west-1',
      from: 'noreply@example.test',
      client: failingClient(
        Object.assign(new Error('MessageRejected: secret detail'), { name: 'MessageRejected' }),
      ),
    });
    const failure = await email
      .send({ to: 'a@example.test', subject: 's', text: 't' })
      .catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(EmailUnavailableError);
    expect((failure as Error).message).toBe('email transport unavailable');
  });

  it('builds a default client for the region without calling the service', () => {
    expect(() =>
      createSesEmail({ region: 'eu-west-1', from: 'noreply@example.test' }),
    ).not.toThrow();
  });
});
