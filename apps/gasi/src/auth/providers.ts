import type { AuthorizationResult } from "@request/specs";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import z from "zod";
import { server } from "../index.js";
import { kakaoToken, kakaoTokenInfo } from "./kakao.js";
import { authorizeWith } from "./token.js";

/**
 * Authorize with Kakao OAuth provider. return identifier of kakao provider.
 * @param redirectUri - redirectUri of client
 * @param code - authorization code
 */
export async function kakaoAuthorize(
  redirectUri: string,
  code: string,
): Promise<AuthorizationResult> {
  server.log.info(`Kakao authorization requested: redirectUri=${redirectUri}, code=${code}`);
  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "API Key not provided: provider 'kakao'",
    });
  const result = await kakaoToken(apiKey, code, redirectUri);
  const token = result.access_token;
  server.log.info(token);

  const info = await kakaoTokenInfo(token);

  return authorizeWith("kakao", info.id.toString());
}
