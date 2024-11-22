import { z } from "zod";

export const InputNameSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 최소 2글자 이상이어야 합니다.")
      .max(10, "이름은 최대 10글자 이하이어야 합니다."),
    github: z.string().email("GitHub 주소는 유효한 이메일 형식이어야 합니다."),
    field: z.array(z.string()).min(1, "직군을 최소 1개 이상 입력해야 합니다."),
    tech: z.array(z.string()).min(1, "기술 스택을 최소 1개 이상 입력해야 합니다."),
    company: z.array(z.string()).min(1, "회사를 최소 1개 이상 입력해야 합니다."),
    // education: z
    //   .object({
    //     organization: z.string().min(1, "학교명은 필수 입력 항목입니다."),
    //     major: z.string().min(1, "전공은 필수 입력 항목입니다."),
    //     degree: z.string().min(1, "학위는 필수 입력 항목입니다."),
    //     enterAt: z
    //       .string()
    //       .regex(/^\d{4}-\d{2}-\d{2}$/, "입학 날짜는 YYYY-MM-DD 형식이어야 합니다."),
    //     graduateAt: z
    //       .string()
    //       .regex(/^\d{4}-\d{2}-\d{2}$/, "졸업 날짜는 YYYY-MM-DD 형식이어야 합니다."),
    //     credit: z.number().min(0, "학점은 0 이상이어야 합니다."),
    //     maxCredit: z.number().min(1, "최대 학점은 1 이상이어야 합니다."),
    //     etc: z.string().optional(),
    //   })
  })
  .partial();

export const InputGithubSchema = InputNameSchema.required({ name: true });

export const SelectJobSchema = InputGithubSchema.required({ github: true });

export const InputTechAndCompanySchema = SelectJobSchema.required({ field: true });

export const InputEducationSchema = InputTechAndCompanySchema.required({
  tech: true,
  company: true,
});

export const CompleteSchema = InputEducationSchema.required({});

export type InputName = z.infer<typeof InputNameSchema>;
export type InputGithub = z.infer<typeof InputGithubSchema>;
export type SelectJob = z.infer<typeof SelectJobSchema>;
export type InputTechAndCompany = z.infer<typeof InputTechAndCompanySchema>;
export type InputEducation = z.infer<typeof InputEducationSchema>;
export type Complete = z.infer<typeof CompleteSchema>;

// export type Education = z.infer<typeof CompleteSchema>["education"];
