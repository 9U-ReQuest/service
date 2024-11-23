import { z } from "zod";

export const CreateAssignmentSchema = z
  .object({
    field: z
      .array(z.string())
      .min(1, "최소 하나의 직무를 선택해야 합니다.")
      .max(3, "최대 세 개의 직무만 선택할 수 있습니다."),
    tech: z
      .array(z.string())
      .min(1, "최소 하나의 기술 스택을 선택해야 합니다.")
      .max(3, "최대 세 개의 기술 스택만 선택할 수 있습니다."),
    company: z
      .array(z.string())
      .min(1, "최소 하나의 관심 기업을 선택해야 합니다.")
      .max(3, "최대 세 개의 관심 기업만 선택할 수 있습니다."),
  })
  .partial();

export const InProgressSchema = CreateAssignmentSchema.required({
  field: true,
  tech: true,
  company: true,
});

export type CommonAssignmentInfo = z.infer<typeof CreateAssignmentSchema>;
export type InProgress = z.infer<typeof InProgressSchema>;
