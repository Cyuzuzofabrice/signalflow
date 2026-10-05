
import { z } from "zod";

export const qualifyLeadSchema = z.object({
  recalculate: z.boolean().optional().default(true),
});

export type QualifyLeadInput = z.infer<typeof qualifyLeadSchema>;
