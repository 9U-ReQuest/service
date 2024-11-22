import { AssignmentFilterSchema, AssignmentPromptSchema } from "@request/specs";
import { TRPCError } from "@trpc/server";
import { humanId } from "human-id";
import { z } from "zod";
import { createMockAssignment } from "../mockUtils.js";
import { p } from "../trpc.js";

export const list = p.input(AssignmentFilterSchema).query(({ input }) => {
  return {
    skip: input.skip,
    limit: input.limit,
    total: 100,
    data: Array(Math.min(input.limit, 100 - input.skip)).map((_, i) =>
      createMockAssignment(
        humanId({
          separator: "-",
          capitalize: false,
        }),
        `${input.limit + i}번째 과제`,
      ),
    ),
  };
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
