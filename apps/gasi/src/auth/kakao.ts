import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { server } from "../index.js";

const KAKAO_TOKEN_ENDPOINT = "https://kauth.kakao.com/oauth/token" as const;
const KAKAO_TOKEN_INFO_ENDPOINT = "https://kapi.kakao.com/v1/user/access_token_info" as const;

const KakaoTokenResponse = z.object({
  token_type: z.literal("bearer"),
  access_token: z.string(),
  id_token: z.string().optional(),
  expires_in: z.number(),
  refresh_token: z.string(),
  refresh_token_expires_in: z.number(),
  scope: z.string().optional(),
});

export async function kakaoToken(
  apiKey: string,
  code: string,
  redirectUri: string,
): Promise<z.infer<typeof KakaoTokenResponse>> {
  const result = await fetch(KAKAO_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: apiKey,
      redirect_uri: redirectUri,
      code,
    }),
  });
  if (!result.ok) {
    const message = `${result.status} ${result.statusText} - Authentication provider 'kakao' returned an error: ${await result.text()}`;
    server.log.error(message);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message,
    });
  }
  const rawResult = await result.json();
  const parsedResult = KakaoTokenResponse.safeParse(rawResult);
  if (!parsedResult.success)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Authentication provider 'kakao' returns an wrong response: ${rawResult}`,
    });
  return parsedResult.data;
}

const KakaoTokenInfoResponse = z.object({
  id: z.number(),
  expires_in: z.number(),
  app_id: z.number(),
});

export async function kakaoTokenInfo(
  token: string,
): Promise<z.infer<typeof KakaoTokenInfoResponse>> {
  const result = await fetch(KAKAO_TOKEN_INFO_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!result.ok) {
    const message = `${result.status} ${result.statusText} - Authentication provider 'kakao' returned an error while obtaining token info: ${await result.text()}`;
    server.log.error(message);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message,
    });
  }
  const rawResult = await result.json();
  const parsedResult = KakaoTokenInfoResponse.safeParse(rawResult);
  if (parsedResult.error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Authentication provider 'kakao' returns an wrong response while obtaining token info: ${rawResult}`,
    });
  return parsedResult.data;
}
