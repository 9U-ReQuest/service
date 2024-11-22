import { TRPCError } from "@trpc/server";
import { createCallerFactory } from "@trpc/server/unstable-core-do-not-import";
import { humanId } from "human-id";
import z from "zod";
import { AssignmentFilterSchema, AssignmentPromptSchema } from "./schema/assignment.js";
import {
  type Review,
  type ReviewEntry,
  type ReviewFile,
  type ReviewFileTree,
  ReviewFilterSchema,
  type ReviewResult,
} from "./schema/review.js";
import {
  type Submission,
  SubmissionFileRequestSchema,
  SubmissionInitSchema,
} from "./schema/submission.js";
import { type AuthorizationResult, RegisterUserRequestSchema, type User } from "./schema/user.js";
import { p, t } from "./trpc.js";

const createMockAssignment = (id: string, name: string) => ({
  id,
  name,
  description: "테스트용 과제입니다. 풀 수 있을까요?",
  readme: `# 테스트용 과제
테스트용 과제입니다. 마크다운 렌더링이 잘 될까요? \`안녕하세요\`
**안녕하세요** ~안녕하세요~
> 안녕하세요 ㅎㅎ

`,
  prompt: {
    fields: ["프론트엔드", "서버/백엔드"],
    techs: ["Spring Boot", "Rust"],
    companies: ["kakao", "goorm"],
  },
  status: "READY",
  lastUpdated: new Date().toISOString(),
});

const createMockReviewEntry = (
  name: string,
  scenario: string,
  path: string | undefined,
  lineRange: [number, number] | undefined,
): ReviewEntry => {
  const score = Math.floor(Math.random() * 100);
  const result = Math.floor(score / 50);
  return {
    name,
    scenario,
    result: ["FAIL", "NEUTRAL", "GOOD"][result] as ReviewResult,
    score,
    message:
      result === 2
        ? "가수의 실력이시네요~"
        : result === 1
          ? "조금만 더 신나게 불러보세요!"
          : "진짜 못들어주겠네요~",
    ...(path && { path }),
    ...(lineRange && { lineRange }),
  };
};

export const appRouter = t.router({
  v1: {
    auth: {
      // Kakao 로그인 code를 받고 accessToken을 리턴합니다.
      kakao: p.input(z.object({ code: z.string(), callback: z.string().optional() })).query(
        ({ input }): AuthorizationResult => ({
          accessToken: "example",
          registered: input.code === "registered",
        }),
      ),
      // 최초 로그인 유저의 정보를 받습니다.
      register: p.input(RegisterUserRequestSchema).mutation(() => {}),
    },
    user: {
      // 자신의 정보를 반환합니다.
      me: p.query(
        (): User => ({
          id: "673f25db6a52140e5bc47f75",
          name: "구효민",
          email: "hyomin@soongsil.ac.kr",
          registered: true,
          providers: {
            kakao: {
              uid: "230549202",
              connectedAt: "2024-11-21T12:25:34.710Z",
            },
          },
          submissions: [],
          prompt: {
            fields: ["프론트엔드", "서버/백엔드"],
            techs: ["Spring Boot", "Rust"],
            companies: ["kakao", "goorm"],
          },
        }),
      ),
    },
    asgmt: {
      // 생성 완료된 전체 과제 목록을 표시합니다.
      list: p.input(AssignmentFilterSchema).query(({ input }) => {
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
      }),
      // 과제 ID로 과제 세부사항을 봅니다.
      get: p.input(z.object({ id: z.string() })).query(({ input }) => {
        if (input.id === "none")
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "해당 ID의 과제를 찾을 수 없습니다.",
          });
        return createMockAssignment(input.id, "테스트과제 - id none으로 하면 오류남");
      }),
      // 과제 생성 요청을 합니다. 계정당 하나만 진행할 수 있습니다.
      generate: p.input(AssignmentPromptSchema).mutation(({ input }) => ({
        id: humanId({ separator: "-", capitalize: false }),
        name: "",
        description: "",
        readme: "",
        prompt: input,
        status: "GENERATING",
        lastUpdated: new Date().toISOString(),
      })),
    },
    submission: {
      // 과제 시도를 위한 깃허브 레포지토리를 세팅합니다.
      init: p.input(SubmissionInitSchema).mutation(
        (): Submission => ({
          id: humanId({ separator: "-", capitalize: false }),
          assignmentId: humanId({ separator: "-", capitalize: false }),
          status: "PREPARING",
          lastUpdated: new Date().toISOString(),
          expiredAt: null,
        }),
      ),
      // 과제 시도를 취소합니다.
      cancel: p.input(z.object({ id: z.string() })).mutation((): string => {
        return humanId({ separator: "-", capitalize: false });
      }),
      // 제출물의 파일 목록을 트리 형태로 반환합니다.
      files: p.input(z.object({ id: z.string() })).query((): ReviewFileTree[] => [
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
      ]),
      // 제출물의 파일 내용을 반환합니다. 텍스트 형태의 파일만 가능합니다.
      file: p.input(SubmissionFileRequestSchema).query(
        (): ReviewFile => ({
          name: "index.ts",
          path: "src/index.ts",
          content: `import z as "zod";

export const TestSchema = z.object({ name: z.string(), });`,
        }),
      ),
      // 요청한 범위 내의 모든 리뷰 내용을 반환합니다.
      reviewEntries: p
        .input(ReviewFilterSchema)
        .query((): ReviewEntry[] => [
          ...Array(5).map((_, i) =>
            createMockReviewEntry(`${i}번 채점 항목`, "summary", undefined, undefined),
          ),
          createMockReviewEntry("파일 채점 항목", "lint", "src/index.js", undefined),
          createMockReviewEntry("라인 채점 항목", "lint", "src/index.js", [10, 13]),
        ]),
      // 리뷰의 기본 정보를 반환합니다.
      review: p.input(z.object({ id: z.string() })).query(
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
      ),
    },
  },
});

// https://trpc.io/docs/server/server-side-calls 참고하세용

export type AppRouter = typeof appRouter;

export const createCaller = t.createCallerFactory(appRouter);

export * from "./schema/assignment.js";
export * from "./schema/review.js";
export * from "./schema/submission.js";
export * from "./schema/user.js";

export type * from "./schema/assignment.ts";
export type * from "./schema/review.ts";
export type * from "./schema/submission.ts";
export type * from "./schema/user.ts";
