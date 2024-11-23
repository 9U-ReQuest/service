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
import { requestGeneration } from "../agi.js";
import { checkRegistered } from "../auth/token.js";
import { mAssignment } from "../model/index.js";
import { p } from "../trpc.js";

export const list = p
  .input(AssignmentFilterSchema)
  .query(async ({ input }): Promise<AssignmentListResponse> => {
    const assignments = await mAssignment
      .find({ status: "READY" })
      .limit(input.limit)
      .skip(input.skip)
      .sort({
        lastUpdated: "asc",
      });
    const count = await mAssignment.countDocuments({ status: "READY" });
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

export const generate = p.input(AssignmentPromptSchema).mutation(async ({ input, ctx }) => {
  const user = checkRegistered(ctx.user);
  if (user.lastGeneratedAssignment) {
    const lastGenerated = await mAssignment.findOne({
      id: user.lastGeneratedAssignment,
      status: "GENERATING",
    });
    if (lastGenerated)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `이미 생성중인 과제 '${lastGenerated.id}'가 있습니다. 동시에 하나의 과제만 생성할 수 있습니다.`,
      });
  }
  if (!ctx.user)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "lost access to user model. what is happening???",
    });
  const assignmentId = humanId({ capitalize: false, separator: "-" });
  const doc = new mAssignment();
  doc.id = assignmentId;
  doc.status = "GENERATING";
  doc.lastUpdated = new Date();
  doc.prompt = {
    fields: input.fields,
    techs: input.techs,
    companies: input.companies,
  };
  const res = await doc.save();
  // TODO: Make generation request to AGI
  requestGeneration(user.id)
    .then((res) => res.json())
    .then((json) => {
      mAssignment.findOneAndUpdate(
        { id: assignmentId },
        {
          name: json.name,
          description: json.description,
          readme: json.readme,
          status: "READY",
        },
      );
    });
  ctx.user.lastGeneratedAssignment = assignmentId;
  await ctx.user.save();
  const result = { ...res.toObject(), lastUpdated: (res.lastUpdated as Date).toISOString() };
  return AssignmentSchema.parse(result);
});
