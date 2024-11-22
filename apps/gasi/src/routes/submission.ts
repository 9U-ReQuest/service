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
import { createMockReviewEntry } from "../mockUtils.js";
import { p } from "../trpc.js";

export const init = p.input(SubmissionInitSchema).mutation(
  (): Submission => ({
    id: humanId({ separator: "-", capitalize: false }),
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

export const reviewEntries = p.input(ReviewFilterSchema).query((): ReviewEntry[] => {
  return [
    ...Array(5)
      .fill(1)
      .map((_, i) => createMockReviewEntry(`${i}번 채점 항목`, "summary", undefined, undefined)),
    createMockReviewEntry("파일 채점 항목", "lint", "src/index.js", undefined),
    createMockReviewEntry("라인 채점 항목", "lint", "src/index.js", [10, 13]),
  ];
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
