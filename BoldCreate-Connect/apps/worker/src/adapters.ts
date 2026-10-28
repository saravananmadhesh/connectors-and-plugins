import { createKmsFromConfig } from '@boldcreate-integrations/adapters/kms';
import { createMailpitEmail } from '@boldcreate-integrations/adapters/mailpit';
import {
  createRedisAdaptersFromConfig,
  type RedisAdapters,
} from '@boldcreate-integrations/adapters/redis';
import { createS3BlobFromConfig } from '@boldcreate-integrations/adapters/s3';
import { createSecretsFromConfig } from '@boldcreate-integrations/adapters/secrets';
import { createSesEmail } from '@boldcreate-integrations/adapters/ses';
import { createSmtpEmail } from '@boldcreate-integrations/adapters/smtp';
import {
  assertAdapterAllowed,
  LOCAL_ONLY_ADAPTERS,
  QUEUE_ADAPTER,
} from '@boldcreate-integrations/config';
import type { BlobPort, EmailPort, KmsPort, SecretsPort } from '@boldcreate-integrations/ports';
import type { WorkerConfig } from './config.js';

export interface WorkerAdapters {
  email: EmailPort;
  kms: KmsPort;
  secrets: SecretsPort;
  blob: BlobPort;
  redis: RedisAdapters | undefined;
}

/**
 * Adapters are chosen by configuration; the guard refuses local-only ones in staging and
 * production, so the same code runs everywhere and a new deployed adapter is one more case here.
 */
export function createEmailAdapter(config: WorkerConfig): EmailPort {
  switch (config.EMAIL_ADAPTER) {
    case 'mailpit':
      assertAdapterAllowed(LOCAL_ONLY_ADAPTERS.emailMailpit, config.DEPLOY_ENV);
      return createMailpitEmail({
        smtpUrl: config.MAILPIT_SMTP_URL ?? 'smtp://localhost:1025',
        from: config.EMAIL_FROM,
      });
    case 'ses':
      if (!config.SES_REGION) throw new Error('SES_REGION is required for the SES adapter');
      return createSesEmail({
        region: config.SES_REGION,
        from: config.EMAIL_FROM,
        configurationSet: config.SES_CONFIGURATION_SET,
        accessKeyId: config.SES_ACCESS_KEY_ID,
        secretAccessKey: config.SES_SECRET_ACCESS_KEY,
      });
    case 'smtp':
      if (!config.SMTP_HOST) throw new Error('SMTP_HOST is required for the SMTP adapter');
      return createSmtpEmail({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
        from: config.EMAIL_FROM,
      });
  }
}

export function createAdapters(config: WorkerConfig): WorkerAdapters {
  assertAdapterAllowed(QUEUE_ADAPTER, config.DEPLOY_ENV);
  return {
    email: createEmailAdapter(config),
    kms: createKmsFromConfig(config),
    secrets: createSecretsFromConfig(config),
    blob: createS3BlobFromConfig(config),
    redis: config.REDIS_URL
      ? createRedisAdaptersFromConfig({ ...config, REDIS_URL: config.REDIS_URL })
      : undefined,
  };
}
