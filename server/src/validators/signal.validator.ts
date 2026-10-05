import { z } from "zod";

export const createSignalSchema = z.object({
  leadId: z
    .string()
    .min(1, "Lead ID is required")
    .nullable()
    .optional(),

  type: z
    .string()
    .min(1, "Signal type is required")
    .max(100, "Signal type must be at most 100 characters"),

  title: z
    .string()
    .min(2, "Signal title must be at least 2 characters")
    .max(200, "Signal title must be at most 200 characters"),

  description: z
    .string()
    .min(2, "Signal description must be at least 2 characters")
    .max(3000, "Signal description must be at most 3000 characters"),

  source: z
    .string()
    .max(100, "Signal source must be at most 100 characters")
    .nullable()
    .optional(),

  sourceUrl: z
    .string()
    .url("Please enter a valid source URL")
    .nullable()
    .optional(),

  intentScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  detectedAt: z
    .string()
    .datetime()
    .optional(),
});

export const updateSignalSchema = createSignalSchema.partial();

export type CreateSignalInput = z.infer<typeof createSignalSchema>;
export type UpdateSignalInput = z.infer<typeof updateSignalSchema>;