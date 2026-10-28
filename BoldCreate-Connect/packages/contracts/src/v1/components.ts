import * as z from 'zod/v4';
import { ComponentKindSchema } from './common.js';
import { IdSchema } from './ids.js';

export const ComponentSummarySchema = z.object({
  id: IdSchema('cmp'),
  kind: ComponentKindSchema,
  name: z.string(),
  description: z.string(),
  /** How an MCP server is reached (http or stdio); null for other kinds. */
  transport: z.string().nullable(),
  /** Address of an MCP server reached over http; null otherwise. */
  url: z.string().nullable(),
  /** The component on GitHub at the commit its version was read from; null when unknown. */
  sourceUrl: z.string().nullable(),
});
export type ComponentSummary = z.infer<typeof ComponentSummarySchema>;
