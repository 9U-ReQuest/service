import type { AuthorizeResult } from "../schema/user";

const JWT_SECRET =
  process.env.JWT_SECRET ??
  ("this-is-sample-jwt-key-do-not-use-this-key-in-production-at-any-circumstances" as const);

export const authorizeWith = async (provider: string, uid: string): Promise<AuthorizeResult> => {
  // TODO: Find provider and uid from database. And if user not exist, create an unregistered user. then issue accessToken for an user.
  return {
    registered: true,
    accessToken: "example",
  };
};
