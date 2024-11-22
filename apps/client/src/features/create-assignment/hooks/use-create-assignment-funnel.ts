import type {
  Complete,
  InputGithub,
  InputName,
  InputTechAndCompany,
  SelectJob,
} from "@/entities/onboarding/schema/onboard-funnel";
import {
  CompleteSchema,
  InputGithubSchema,
  InputNameSchema,
  InputTechAndCompanySchema,
  SelectJobSchema,
} from "@/entities/onboarding/schema/onboard-funnel";
import { useFunnel } from "@use-funnel/browser";

export default function useCreateAssignmentFunnel() {
  const funnel = useFunnel<{
    InputName: InputName;
    InputGithub: InputGithub;
    SelectJob: SelectJob;
    InputTechAndCompany: InputTechAndCompany;
    // InputEducation: InputEducation;
    Complete: Complete;
  }>({
    id: "create-assignment",
    initial: {
      step: "InputName",
      context: {},
    },
    steps: {
      InputName: { parse: InputNameSchema.parse },
      InputGithub: { parse: InputGithubSchema.parse },
      SelectJob: { parse: SelectJobSchema.parse },
      InputTechAndCompany: { parse: InputTechAndCompanySchema.parse },
      // InputEducation: { parse: InputEducationSchema.parse },
      Complete: { parse: CompleteSchema.parse },
    },
  });

  return funnel;
}
