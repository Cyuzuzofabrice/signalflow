
import { z } from "zod";

export const createIcpSchema = z.object({
  name: z
    .string()
    .min(2, "ICP name must be at least 2 characters")
    .max(100, "ICP name must be at most 100 characters"),

  industries: z
    .array(z.string().min(1))
    .min(1, "At least one industry is required"),

  locations: z
    .array(z.string().min(1))
    .min(1, "At least one location is required"),

  companySizes: z
    .array(z.string().min(1))
    .min(1, "At least one company size is required"),

  jobTitles: z
    .array(z.string().min(1))
    .min(1, "At least one job title is required"),

  keywords: z
    .array(z.string().min(1))
    .min(1, "At least one keyword is required"),

  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters")
    .nullable()
    .optional(),
});

export const updateIcpSchema = createIcpSchema.partial();

export type CreateIcpInput = z.infer<typeof createIcpSchema>;
export type UpdateIcpInput = z.infer<typeof updateIcpSchema>;
