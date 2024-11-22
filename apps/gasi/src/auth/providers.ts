import type { AuthorizationResult } from "@request/specs";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import z from "zod";
import { authorizeWith } from "./token.js";

const KAKAO_TOKEN_ENDPOINT = "https://kauth.kakao.com/oauth/token" as const;

const KakaoTokenResponse = z.object({
  token_type: z.literal("bearer"),
  access_token: z.string(),
  id_token: z.string().optional(),
  expires_in: z.number(),
  refresh_token: z.string(),
  refresh_token_expires_in: z.number(),
  scope: z.string().optional(),
});

/**
 * Authorize with Kakao OAuth provider. return identifier of kakao provider.
 * @param redirectUri - redirectUri of client
 * @param code - authorization code
 */
export async function kakaoAuthorize(
  redirectUri: string,
  code: string,
): Promise<AuthorizationResult> {
  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "API Key not provided: provider 'kakao'",
    });
  const result = await fetch(KAKAO_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: apiKey,
      redirect_uri: redirectUri,
      code,
    }),
  });
  if (!result.ok)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `${result.status} ${result.statusText} - Authentication provider 'kakao' returned an error: ${await result.text()}`,
    });

  const parsedResult = KakaoTokenResponse.safeParse(await result.json());
  if (parsedResult.error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Authentication provider 'kakao' returns an wrong response: ${parsedResult.error.message}`,
    });

  const data = parsedResult.data;
  const token = data.access_token;

  const payload = jwt.decode(token);

  if (
    payload === null ||
    typeof payload === "string" ||
    payload.iss !== "https://kauth.kakao.com" ||
    payload.sub === undefined
  )
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Authentication provider 'kakao' returned an malformed token with payload: ${payload}`,
    });

  return authorizeWith("kakao", payload.sub);
}
