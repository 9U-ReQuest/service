import { z } from "zod";

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewEntry = z.infer<typeof ReviewEntrySchema>;
export type ReviewScenario = z.infer<typeof ReviewScenarioSchema>;
export type ReviewResult = z.infer<typeof ReviewResultSchema>;
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;
export type ReviewFilter = z.infer<typeof ReviewFilterSchema>;

export const ReviewStatusSchema = z.enum(["PENDING", "REVIEWING", "DONE", "FAILED"]);

export const ReviewResultSchema = z.enum(["FAIL", "NEUTRAL", "GOOD"]);

export const ReviewScenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  result: ReviewResultSchema,
});

export const ReviewEntrySchema = z.object({
  name: z.string(),
  result: ReviewResultSchema,
  scenario: z.string(),
  path: z.string().optional(),
  lineRange: z.string().optional(),
  message: z.string(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  status: ReviewStatusSchema,
  scenarios: z.array(ReviewScenarioSchema),
  entries: z.array(ReviewEntrySchema),
});

export const ReviewFilterSchema = z.object({
  id: z.string(),
  scenario: z.string().default("summary"),
  filePath: z.string().optional(),
});
