import { type AuthorizationResult, type User, UserSchema } from "@request/specs";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";
import { mUser } from "../model/index.js";

const JWT_SECRET =
  process.env.JWT_SECRET ??
  ("this-is-sample-jwt-key-do-not-use-this-key-in-production-at-any-circumstances" as const);

export const authorizeWith = async (
  provider: string,
  uid: string,
): Promise<AuthorizationResult> => {
  const key = `providers.${provider}.uid`;
  const doc = await mUser.findOneAndUpdate(
    {
      [key]: uid,
    },
    {
      $setOnInsert: {
        providers: {
          [provider]: { uid, connectedAt: Date.now() },
        },
      },
    },
    { upsert: true, new: true },
  );
  if (doc) {
    const token = jwt.sign(
      {
        iss: "https://re-quest.eatsteak.dev",
        sub: doc._id,
        iat: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    await mUser.updateOne(
      { _id: doc._id },
      {
        token,
      },
    );
    return {
      registered: !!doc.registered,
      accessToken: token,
    };
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Cannot create an user. maybe request is malformed or database issue?",
  });
};

export const checkRegistered = (user: HydratedDocument<typeof mUser.schema.obj> | null): User => {
  if (!user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "토큰이 없거나 올바르지 않습니다. Authorization 헤더를 확인하세요.",
    });
  if (!user.registered)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "가입되지 않은 사용자는 사용할 수 없습니다.",
    });

  const userObj = user.toObject();
  const providersOriginal = Object.fromEntries(
    userObj.providers as Map<string, { uid: string; connectedAt: string }>,
  ) as unknown as {
    kakao: {
      uid: string;
      connectedAt: Date;
    };
  };

  const providers = {
    kakao: {
      uid: providersOriginal.kakao.uid,
      connectedAt: providersOriginal.kakao.connectedAt.toISOString(),
    },
  };

  return UserSchema.parse({ ...userObj, id: user.id, providers } as User);
};
