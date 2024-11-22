import { AssignmentFilterSchema, AssignmentPromptSchema } from "@request/specs";
import { TRPCError } from "@trpc/server";
import { humanId } from "human-id";
import { z } from "zod";
import { checkRegistered } from "../auth/token.js";
import { mAssignment } from "../model/index.js";
import { p } from "../trpc.js";

export const list = p
  .input(AssignmentFilterSchema)
  .query(async ({ input }): Promise<AssignmentListResponse> => {
    const assignments = await mAssignment.find().limit(input.limit).skip(input.skip).sort({
      lastUpdated: "asc",
    });
    const count = await mAssignment.countDocuments({});
    const result: AssignmentListResponse = {
      skip: input.skip,
      limit: input.limit,
      total: count,
      data: assignments.map((doc) => ({
        ...doc.toObject(),
        lastUpdated: (doc.lastUpdated as Date).toISOString(),
      })),
    };
    return AssignmentListResponseSchema.parse(result);
  });

export const get = p.input(z.object({ id: z.string() })).query(({ input }) => {
  if (input.id === "none")
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "해당 ID의 과제를 찾을 수 없습니다.",
    });
  return createMockAssignment(input.id, "테스트과제 - id none으로 하면 오류남");
});

export const generate = p.input(AssignmentPromptSchema).mutation(({ input }) => ({
  id: humanId({ separator: "-", capitalize: false }),
  name: "",
  description: "",
  readme: "",
  prompt: input,
  status: "GENERATING",
  lastUpdated: new Date().toISOString(),
}));
