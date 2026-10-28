/**
 * The email contract against real SES.
 *
 * Run deliberately: pnpm test:staging
 * Needs STAGING_SES_REGION and STAGING_SES_FROM (an identity verified in that region).
 * STAGING_SES_RECIPIENT defaults to the SES mailbox simulator, which accepts mail without
 * delivering it. Delivered mail cannot be read back from SES, so the suite checks that every
 * send is accepted and that a failing transport is reported.
 */
import { createSesEmail } from '../../packages/adapters/src/ses/index.js';
import { runEmailContract } from '../../packages/adapters/src/contract/email.contract.js';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required staging environment variable ${name}`);
  return value;
}

const region = required('STAGING_SES_REGION');
const from = required('STAGING_SES_FROM');
const recipient = process.env['STAGING_SES_RECIPIENT'] ?? 'success@simulator.amazonses.com';

runEmailContract('ses (staging)', () => ({
  port: createSesEmail({
    region,
    from,
    configurationSet: process.env['STAGING_SES_CONFIGURATION_SET'],
  }),
  recipient: () => recipient,
  unreachable: () =>
    createSesEmail({
      region,
      from,
      client: {
        send: async () => {
          throw new Error('connect ECONNREFUSED');
        },
      },
    }),
}));
