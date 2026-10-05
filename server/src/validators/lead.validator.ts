import { z } from "zod";

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, "Lead name must be at least 2 characters")
    .max(100, "Lead name must be at most 100 characters"),

  company: z
    .string()
    .max(150, "Company name must be at most 150 characters")
    .nullable()
    .optional(),

  jobTitle: z
    .string()
    .max(150, "Job title must be at most 150 characters")
    .nullable()
    .optional(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .nullable()
    .optional(),

  website: z
    .string()
    .url("Please enter a valid website URL")
    .nullable()
    .optional(),

  location: z
    .string()
    .max(150, "Location must be at most 150 characters")
    .nullable()
    .optional(),

  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .nullable()
    .optional(),

  score: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  status: z
    .enum([
      "NEW",
      "QUALIFIED",
      "CONTACTED",
      "CONVERTED",
      "DISQUALIFIED",
    ])
    .optional(),

  summary: z
    .string()
    .max(2000, "Summary must be at most 2000 characters")
    .nullable()
    .optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;