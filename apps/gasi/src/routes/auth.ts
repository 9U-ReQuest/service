import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { kakaoAuthorize } from "../auth/providers.js";
import { p, pBaseUrl } from "../trpc.js";

export const kakao = pBaseUrl.input(z.string()).query(async ({ input, ctx }) => {
  return await kakaoAuthorize(`${ctx.baseUrl}/callback`, input);
});
