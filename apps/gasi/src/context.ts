import { type User, UserSchema } from "@request/specs";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { mUser } from "./model/index.js";

const defaultBaseUrl = process.env.CLIENT_BASE_URL ?? "http://localhost:3000";

export const createContext = async (
  opts: CreateFastifyContextOptions,
): Promise<{ baseUrl: string; user: User | null }> => {
  const log = opts.req.log;
  log.info(opts.req.headers);
  const referer = opts.req.headers.referer;
  let user = null;
  let baseUrl = defaultBaseUrl;
  if (opts.req.headers.authorization) {
    const token = opts.req.headers.authorization.split(" ")[1];
    log.info(token);
    const doc = await mUser.findOne({ token });
    if (doc) {
      user = UserSchema.parse(doc.toObject());
    }
  }
  if (referer) {
    const url = new URL(referer);
    log.info(url.origin);
    baseUrl = url.origin;
  }
  return {
    baseUrl,
    user,
  };
};
