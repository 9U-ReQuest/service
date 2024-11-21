import {
  AssignmentFilterSchema,
  AssignmentPromptSchema,
  RegisterUserRequestSchema,
  ReviewFilterSchema,
  SubmissionFileRequestSchema,
  SubmissionInitSchema,
} from "@request/specs";
import z from "zod";
import { p, t } from "./trpc";

export const appRouter = t.router({
  v1: {
    v1: {
      auth: {
        // Kakao 로그인 code를 받고 accessToken을 리턴합니다.
        kakao: p.input(z.string()).query(() => {}),
        // 최초 로그인 유저의 정보를 받습니다.
        register: p.input(RegisterUserRequestSchema).mutation(() => {}),
      },
      user: {
        // 자신의 정보를 반환합니다.
        me: p.query(() => {}),
      },
      asgmt: {
        // 전체 과제 목록을 표시합니다.
        list: p.input(AssignmentFilterSchema).query(() => {}),
        // 과제 ID로 과제 세부사항을 봅니다.
        get: p.input(z.string()).query(() => {}),
        // 과제 생성 요청을 합니다. 계정당 하나만 진행할 수 있습니다.
        generate: p.input(AssignmentPromptSchema).mutation(() => {}),
      },
      submission: {
        // 과제 시도를 위한 깃허브 레포지토리를 세팅합니다.
        init: p.input(SubmissionInitSchema).mutation(() => {}),
        // 과제 시도를 취소합니다.
        cancel: p.input(z.string()).mutation(() => {}),
        // 제출물의 파일 목록을 트리 형태로 반환합니다.
        files: p.input(z.string()).query(() => {}),
        // 제출물의 파일 내용을 반환합니다. 텍스트 형태의 파일만 가능합니다.
        file: p.input(SubmissionFileRequestSchema).query(() => {}),
        // 요청한 범위 내의 모든 리뷰 내용을 반환합니다.
        reviewEntries: p.input(ReviewFilterSchema).query(() => {}),
        // 리뷰의 기본 정보를 반환합니다.
        review: p.input(z.string()).query(() => {}),
      },
    },
  },
});
