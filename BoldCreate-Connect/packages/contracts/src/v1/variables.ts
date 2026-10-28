import * as z from 'zod/v4';

/** Names a plugin may declare: the same shape the manifest accepts. */
export const VARIABLE_NAME_PATTERN = /^[A-Z][A-Z0-9_]{0,63}$/;
export const VARIABLE_VALUE_MAX_BYTES = 8192;

/** Names the installer may add on top of the declared ones, at most ten per installation. */
export const CUSTOM_VARIABLE_NAME_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
export const MAX_CUSTOM_VARIABLES = 10;

/** A variable the plugin version declares, and whether a value is stored. The value never leaves. */
export const VariableStatusSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean(),
  secret: z.boolean(),
  isSet: z.boolean(),
  /** Added by the installer; the plugin does not declare it. */
  custom: z.boolean(),
});
export type VariableStatus = z.infer<typeof VariableStatusSchema>;

/**
 * A merge patch: a string sets or replaces the value, `null` removes it, and an empty string
 * keeps what is stored (so a form can send every field and leave untouched ones blank).
 */
export const PutVariablesBodySchema = z.strictObject({
  values: z
    .record(
      z.string().regex(CUSTOM_VARIABLE_NAME_PATTERN),
      z
        .string()
        .refine((value) => new TextEncoder().encode(value).length <= VARIABLE_VALUE_MAX_BYTES, {
          message: `at most ${VARIABLE_VALUE_MAX_BYTES} bytes`,
        })
        .nullable(),
    )
    .refine((values) => Object.keys(values).length > 0, { message: 'at least one variable' }),
});
export type PutVariablesBody = z.infer<typeof PutVariablesBodySchema>;
