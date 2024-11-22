import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { HydratedDocument } from "mongoose";
import { server } from "./index.js";
import { mUser } from "./model/index.js";

const defaultBaseUrl = process.env.CLIENT_BASE_URL ?? "http://localhost:3000";

export const createContext = async (
  opts: CreateFastifyContextOptions,
): Promise<{ baseUrl: string; user: HydratedDocument<typeof mUser.schema.obj> | null }> => {
  const referer = opts.req.headers.referer;
  let user = null;
  let baseUrl = defaultBaseUrl;
  if (opts.req.headers.authorization) {
    const token = opts.req.headers.authorization.split(" ")[1];
    server.log.info(token);
    const doc = await mUser.findOne({ token });
    if (doc) {
      user = doc;
    }
  }
  if (referer) {
    const url = new URL(referer);
    server.log.info(url.origin);
    baseUrl = url.origin;
  }
  return {
    baseUrl,
    user,
  };
};
