import {
  type Review,
  type ReviewEntry,
  type ReviewFile,
  type ReviewFileTree,
  ReviewFilterSchema,
  type Submission,
  SubmissionFileRequestSchema,
  SubmissionInitSchema,
} from "@request/specs";
import { humanId } from "human-id";
import { z } from "zod";
import { checkRegistered } from "../auth/token.js";
import { p } from "../trpc.js";

export const init = p.input(SubmissionInitSchema).mutation(
  (): Submission => ({
    id: humanId({ separator: "-", capitalize: false }),
    userId: "6740940e8e20d5e1b2231d72",
    assignmentId: humanId({ separator: "-", capitalize: false }),
    status: "PREPARING",
    lastUpdated: new Date().toISOString(),
    expiredAt: null,
  }),
);

export const cancel = p.input(z.object({ id: z.string() })).mutation((): string => {
  return humanId({ separator: "-", capitalize: false });
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

export const reviewEntries = p
  .input(ReviewFilterSchema)
  .query(async ({ input, ctx }): Promise<ReviewEntry[]> => {
    const user = checkRegistered(ctx.user);
    const submissions = ct;
  });

export const review = p.input(z.object({ id: z.string() })).query(
  ({ input }): Omit<Review, "entries"> => ({
    id: input.id,
    status: "DONE",
    scenarios: [
      {
        id: "summary",
        name: "종합 점수",
        result: "GOOD",
        score: 83,
      },
      {
        id: "lint",
        name: "기본 코드 스타일",
        result: "FAIL",
      },
    ],
  }),
);
