import { z } from "zod";

export type Assignment = z.infer<typeof AssignmentSchema>;
export type AssignmentIndex = z.infer<typeof AssignmentIndexSchema>;
export type AssignmentStatus = z.infer<typeof AssignmentStatusSchema>;
export type AssignmentPromptSchema = z.infer<typeof AssignmentPromptSchema>;
export type AssignmentListResponse = z.infer<typeof AssignmentListResponseSchema>;

// 현재 과제의 상태
export const AssignmentStatusSchema = z.enum(["GENERATING", "FAILED", "READY", "DELETED"]);

// 과제 생성시 필요한 정보
export const AssignmentPromptSchema = z.object({
  fields: z.array(z.string()),
  techs: z.array(z.string()),
  companies: z.array(z.string()),
});

// 과제 목록 데이터
export const AssignmentFilterSchema = z.object({
  skip: z.number().default(0),
  limit: z.number().default(25),
  // 필터링 기능 여유되면 더 추가 예정
});

// 과제 정보
export const AssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  readme: z.string(),
  prompt: AssignmentPromptSchema,
  status: AssignmentStatusSchema,
  lastUpdated: z.string().datetime(),
});

export const AssignmentIndexSchema = AssignmentSchema.omit({ readme: true });

export const AssignmentListResponseSchema = z.object({
  skip: z.number().default(0),
  limit: z.number().default(25),
  total: z.number(),
  data: z.array(AssignmentSchema),
});
