import { z } from "zod";

export type Submission = z.infer<typeof SubmissionSchema>;
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const SubmissionStatusSchema = z.enum([
  "PREPARING",
  "STARTED",
  "SUBMITTED",
  "REVIEWING",
  "REVIEWED",
  "EXPIRED",
  "CANCELED",
  "REVIEW_FAILED",
]);

export const SubmissionSchema = z.object({
  id: z.string(),
  assignmentId: z.string(),
  status: SubmissionStatusSchema,
  lastUpdated: z.string().datetime(),
  expiredAt: z.string().datetime().nullable(),
});

export const SubmissionInitSchema = z.object({});

export const SubmissionFileRequestSchema = z.object({
  id: z.string(),
  path: z.string(),
});
