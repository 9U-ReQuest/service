import type { ReviewFileTree, User } from "@request/specs";
import { generate, get, list } from "./routes/asgmt.js";
import { kakao, register } from "./routes/auth.js";
import { cancel, file, files, init, review, reviewEntries } from "./routes/submission.js";
import { me } from "./routes/user.js";
import { t } from "./trpc.js";

// https://trpc.io/docs/server/server-side-calls 참고하세용
export const appRouter = t.router({
  v1: {
    auth: {
      // Kakao 로그인 code를 받고 accessToken을 리턴합니다.
      kakao,
      // 최초 로그인 유저의 정보를 받습니다.
      register,
    },
    user: {
      // 자신의 정보를 반환합니다.
      me,
    },
    asgmt: {
      // 생성 완료된 전체 과제 목록을 표시합니다.
      list,
      // 과제 ID로 과제 세부사항을 봅니다.
      get,
      // 과제 생성 요청을 합니다. 계정당 하나만 진행할 수 있습니다.
      generate,
    },
    submission: {
      // 과제 시도를 위한 깃허브 레포지토리를 세팅합니다.
      init,
      // 과제 시도를 취소합니다.
      cancel,
      // 제출물의 파일 목록을 트리 형태로 반환합니다.
      files,
      // 제출물의 파일 내용을 반환합니다. 텍스트 형태의 파일만 가능합니다.
      file,
      // 요청한 범위 내의 모든 리뷰 내용을 반환합니다.
      reviewEntries,
      // 리뷰의 기본 정보를 반환합니다.
      review,
    },
  },
});
