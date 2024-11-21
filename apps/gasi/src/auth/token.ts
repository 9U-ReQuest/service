import type { AuthorizationResult, User } from "@request/specs";
import { Model } from "mongoose";
import { mUser } from "../schema.js";

const JWT_SECRET =
  process.env.JWT_SECRET ??
  ("this-is-sample-jwt-key-do-not-use-this-key-in-production-at-any-circumstances" as const);

export const authorizeWith = async (
  provider: string,
  uid: string,
): Promise<AuthorizationResult> => {
  const User: Model<User & { token: string }> = new Model("User", mUser);
  User.findOne({});
  return {
    registered: true,
    accessToken: "example",
  };
};
