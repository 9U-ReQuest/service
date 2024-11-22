import { RegisterUserRequestSchema } from "@request/specs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { kakaoAuthorize } from "../auth/providers.js";
import { p } from "../trpc.js";

export const kakao = p
  .input(z.object({ code: z.string(), redirectUrl: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    return await kakaoAuthorize(input.redirectUrl ?? `${ctx.baseUrl}/callback`, input.code);
  });

export const register = p.input(RegisterUserRequestSchema).mutation(async ({ input, ctx }) => {
  if (!ctx.user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "토큰이 없거나 올바르지 않습니다. Authorization 헤더를 확인하세요.",
    });
  if (ctx.user.registered)
    throw new TRPCError({ code: "CONFLICT", message: "이미 가입을 진행한 사용자입니다." });

  const res = await ctx.user.updateOne({
    name: input.name,
    email: input.email,
    registered: true,
    prompt: {
      fields: input.prompt.fields,
      techs: input.prompt.techs,
      companies: input.prompt.companies,
    },
  });
  if (res.modifiedCount !== 1)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "데이터베이스 등록 작업에 실패했습니다.",
    });
});
