import { z } from "zod";
import { kakaoAuthorize } from "../auth/providers.js";
import { p } from "../trpc.js";

export const kakao = p.input(z.string()).query(async ({ input, ctx }) => {
  return await kakaoAuthorize(`${ctx.baseUrl}/callback`, input);
});
