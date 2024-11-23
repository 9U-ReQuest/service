import {
  type Assignment,
  AssignmentFilterSchema,
  type AssignmentListResponse,
  AssignmentListResponseSchema,
  AssignmentSchema,
  type Review,
  type ReviewEntry,
  ReviewEntrySchema,
  type ReviewFile,
  type ReviewFileTree,
  ReviewFilterSchema,
  ReviewSchema,
  type Submission,
  SubmissionFileRequestSchema,
  SubmissionInitSchema,
  SubmissionSchema,
} from "@request/specs";
import { TRPCError } from "@trpc/server";
import { humanId } from "human-id";
import { z } from "zod";
import { checkRegistered } from "../auth/token.js";
import { makeRepository } from "../docker.js";
import { server } from "../index.js";
import { mAssignment, mReview, mReviewEntry, mSubmission } from "../model/index.js";
import { p } from "../trpc.js";

export const init = p
  .input(SubmissionInitSchema)
  .mutation(async ({ input, ctx }): Promise<Submission> => {
    const user = checkRegistered(ctx.user);
    const ongoingSubmission = await mSubmission.find({
      userId: user.id,
      status: { $in: ["PREPARING", "STARTED", "SUBMITTED", "REVIEWING"] },
    });
    if (ongoingSubmission.length > 0)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message:
          "이미 진행중인 제출물이 있습니다. 과제 제출 및 채점을 완료하거나 취소한 뒤 다시 시도하세요.",
      });
    if (!user.email)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "GitHub 계정이 연결되지 않았습니다.",
      });
    const newDoc = new mSubmission();
    const submissionId = humanId({ separator: "-", capitalize: false });
    newDoc.id = submissionId;
    newDoc.userId = user.id;
    newDoc.assignmentId = input.assignmentId;
    newDoc.lastUpdated = new Date();
    await newDoc.save();
    const docObj = newDoc.toObject();
    const res = {
      ...docObj,
      userId: user.id,
      lastUpdated: docObj.lastUpdated.toISOString(),
      expiredAt: docObj.expiredAt?.toISOString() ?? null,
    };
    makeRepository(user.email, input.assignmentId, submissionId);
    return SubmissionSchema.parse(res);
  });

export const cancel = p
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }): Promise<string> => {
    const user = checkRegistered(ctx.user);
    if (!user.submissions.includes(input.id))
      throw new TRPCError({ code: "NOT_FOUND", message: "제출물을 찾을 수 없습니다." });
    const ongoingSubmission = await mSubmission.findOneAndUpdate(
      {
        userId: user.id,
        status: { $in: ["PREPARING", "STARTED", "SUBMITTED", "REVIEWING"] },
      },
      {
        status: "CANCELED",
      },
    );
    if (!ongoingSubmission)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `주어진 id ${input.id}가 진행중인 제출물이 아닙니다.`,
      });
    // TODO: Inform related services(GitHub, AGI) that user canceled submission
    return ongoingSubmission.id;
  });

export const list = p.query(async ({ ctx }): Promise<Submission[]> => {
  const user = checkRegistered(ctx.user);
  const submissions = await mSubmission.find({ userId: user.id });
  const result = submissions.map((doc) => ({
    ...doc.toObject(),
    lastUpdated: (doc.lastUpdated as Date).toISOString(),
    ...(doc.expiredAt && { expiredAt: (doc.expiredAt as Date).toISOString() }),
  }));
  return z.array(SubmissionSchema).parse(result);
});

export const files = p.input(z.object({ id: z.string() })).query((): ReviewFileTree[] => [
  {
    name: "src",
    type: "directory",
    path: "src",
    children: [
      {
        name: "index.ts",
        type: "file",
        path: "src/index.ts",
      },
    ],
  },
  {
    name: "package.json",
    type: "file",
    path: "package.json",
  },
]);

export const file = p.input(SubmissionFileRequestSchema).query(
  (): ReviewFile => ({
    name: "index.ts",
    path: "src/index.ts",
    content: `import z as "zod";

export const TestSchema = z.object({ name: z.string(), });`,
  }),
);

export const review = p
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }): Promise<Omit<Review, "entries">> => {
    const user = checkRegistered(ctx.user);
    if (!user.submissions.includes(input.id))
      throw new TRPCError({ code: "NOT_FOUND", message: "제출물을 찾을 수 없습니다." });
    const review = await mReview.findOne({ id: input.id });
    if (!review)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "리뷰 데이터를 찾을 수 없습니다. 제출물의 상태를 확인하세요.",
      });
    const res = review.toObject();
    return ReviewSchema.omit({ entries: true }).parse(res);
  });

export const reviewEntries = p
  .input(ReviewFilterSchema)
  .query(async ({ input, ctx }): Promise<ReviewEntry[]> => {
    const user = checkRegistered(ctx.user);
    if (!user.submissions.includes(input.id))
      throw new TRPCError({ code: "NOT_FOUND", message: "제출물을 찾을 수 없습니다." });
    const reviewEntries = await mReviewEntry.find({ ...input });
    const result: ReviewEntry[] = reviewEntries.map((doc) => doc.toObject());
    return z.array(ReviewEntrySchema).parse(result);
  });
