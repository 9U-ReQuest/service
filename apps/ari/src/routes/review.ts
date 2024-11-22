import { z } from "zod";
import { t } from "../trpc.js";

export const reviewWithAI = t.procedure
    .input(
        z.object({
            assignmentId: z.string(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const { assignmentId } = input;

        const aiReviewResult = await ctx.reviewService.generateReview({
            assignmentId,
        });

        if (!aiReviewResult) {
            throw new Error("Failed to generate AI review");
        }

        return {
            assignmentId,
            review: aiReviewResult,
        };
    });
