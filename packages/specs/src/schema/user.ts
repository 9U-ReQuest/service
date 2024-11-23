import { z } from "zod";
import { AssignmentPromptSchema } from "./assignment.js";

export type User = z.infer<typeof UserSchema>;
export type RegisteredUser = z.infer<typeof RegisteredUserSchema>;
export type AuthorizationResult = z.infer<typeof AuthorizeResultSchema>;
export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;

export const AuthorizeResultSchema = z.object({
  accessToken: z.string(),
  registered: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  registered: z.boolean().default(false),
  providers: z.object({
    kakao: z
      .object({
        uid: z.string(),
        connectedAt: z.string().datetime(),
      })
      .optional(),
  }),
  lastGeneratedAssignment: z.string().optional(),
  submissions: z.array(z.string()),
  prompt: AssignmentPromptSchema.optional(),
});

export const RegisteredUserSchema = UserSchema.required().extend({ register: z.literal(true) });

export const RegisterUserRequestSchema = UserSchema.required().pick({
  name: true,
  email: true,
  prompt: true,
});
