import {
  type Assignment,
  AssignmentFilterSchema,
  type AssignmentListResponse,
  AssignmentListResponseSchema,
  AssignmentPromptSchema,
  AssignmentSchema,
} from "@request/specs";
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

export const get = p
  .input(z.object({ id: z.string() }))
  .query(async ({ input }): Promise<Assignment> => {
    const doc = await mAssignment.findOne({ id: input.id });
    if (!doc)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `id '${input.id}'를 가진 과제가 없습니다.`,
      });
    const result = { ...doc.toObject(), lastUpdated: (doc.lastUpdated as Date).toISOString() };
    return AssignmentSchema.parse(result);
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
