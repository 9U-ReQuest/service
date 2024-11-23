import {
  type CommonAssignmentInfo,
  CreateAssignmentSchema,
  type InProgress,
  InProgressSchema,
} from "@/entities/assignment/create/schema/create-assignment-schema";
import { useFunnel } from "@use-funnel/browser";

export default function useCreateAssignmentFunnel() {
  const funnel = useFunnel<{
    ConfirmUserInfo: CommonAssignmentInfo;
    InProgress: InProgress;
    InputUserInfo: CommonAssignmentInfo;
    Completed: CommonAssignmentInfo;
  }>({
    id: "create-assignment",
    initial: {
      step: "ConfirmUserInfo",
      context: {},
    },
    steps: {
      ConfirmUserInfo: { parse: CreateAssignmentSchema.parse },
      InProgress: { parse: InProgressSchema.parse },
      InputUserInfo: { parse: CreateAssignmentSchema.parse },
      Completed: { parse: CreateAssignmentSchema.parse },
    },
  });

  return funnel;
}
