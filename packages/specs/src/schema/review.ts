import { z } from "zod";

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewEntry = z.infer<typeof ReviewEntrySchema>;
export type ReviewScenario = z.infer<typeof ReviewScenarioSchema>;
export type ReviewResult = z.infer<typeof ReviewResultSchema>;
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;
export type ReviewFilter = z.infer<typeof ReviewFilterSchema>;
export type ReviewFile = z.infer<typeof ReviewFileSchema>;
export type ReviewFileTree = z.infer<typeof ReviewFileBaseSchema> & {
  children?: ReviewFileTree[];
};

export const ReviewStatusSchema = z.enum(["PENDING", "REVIEWING", "DONE", "FAILED"]);

export const ReviewResultSchema = z.enum(["FAIL", "NEUTRAL", "GOOD"]);

export const ReviewScenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  result: ReviewResultSchema,
  score: z.number().max(100).optional(),
});

export const ReviewEntrySchema = z.object({
  name: z.string(),
  result: ReviewResultSchema,
  score: z.number().max(100).optional(),
  scenario: z.string(),
  path: z.string().optional(),
  lineRange: z.tuple([z.number(), z.number()]).optional(),
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
  path: z.string().optional(),
});

export const ReviewFileBaseSchema = z.object({
  name: z.string(),
  type: z.enum(["file", "directory"]),
  path: z.string(),
});

export const ReviewFileSchema = ReviewFileBaseSchema.omit({ type: true }).extend({
  content: z.string(),
});

export const ReviewFileTreeSchema: z.ZodType<ReviewFileTree> = ReviewFileBaseSchema.extend({
  children: z.lazy(() => z.array(ReviewFileTreeSchema)).optional(),
});
