import { z } from "zod";

export const CreateAssignmentSchema = z
  .object({
    field: z
      .array(z.string())
      .min(1, "At least one job field must be selected.")
      .max(3, "You can select up to three job fields."),
    tech: z
      .array(z.string())
      .min(1, "At least one tech stack must be selected.")
      .max(3, "You can select up to three tech stacks."),
    company: z
      .array(z.string())
      .min(1, "At least one interested company must be selected.")
      .max(3, "You can select up to three interested companies."),
  })
  .partial();

export const InProgressSchema = CreateAssignmentSchema.required({
  field: true,
  tech: true,
  company: true,
});

export type CommonAssignmentInfo = z.infer<typeof CreateAssignmentSchema>;
export type InProgress = z.infer<typeof InProgressSchema>;
