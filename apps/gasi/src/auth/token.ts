import type { AuthorizationResult, User } from "@request/specs";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
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
