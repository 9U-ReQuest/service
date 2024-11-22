import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const defaultBaseUrl = process.env.CLIENT_BASE_URL ?? "http://localhost:3000";

export const createBaseUrlContext = async (opts: CreateFastifyContextOptions) => {
  console.log(opts.req);
  const referer = opts.req.headers.referer;
  if (referer) {
    const url = new URL(referer);
    return {
      baseUrl: url.origin,
    };
  }
  return {
    baseUrl: defaultBaseUrl,
  };
};

export const createAuthContext = async (opts: CreateFastifyContextOptions) => {
  console.log(opts.req.headers.authorization);
  return {
    authorization: opts.req.headers.authorization,
  };
};
