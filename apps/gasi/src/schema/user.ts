import { z } from "zod";
import { AssignmentPromptSchema } from "./assignment";
import { SubmissionSchema } from "./submission";

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  providers: z.object({
    kakao: z.object({
      uid: z.string(),
      connectedAt: z.string().datetime(),
    }),
  }),
  lastGeneratedAssignment: z.string(),
  submissions: z.array(SubmissionSchema),
  prompt: AssignmentPromptSchema,
});
