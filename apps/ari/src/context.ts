import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { server } from "./index.js";
import { ReviewService } from "./service/review.js";
import LLMService from "./service/llmService.js";

const defaultBaseUrl = process.env.CLIENT_BASE_URL ?? "http://localhost:3000";

export type Context = {
  baseUrl: string;
  reviewService: ReviewService;
  llmService: LLMService;
};

export const createContext = async (
    opts: CreateFastifyContextOptions,
): Promise<Context> => {
  const referer = opts.req.headers.referer;
  let baseUrl = defaultBaseUrl;

  if (referer) {
    const url = new URL(referer);
    server.log.info(url.origin);
    baseUrl = url.origin;
  }

  return {
    baseUrl,
    reviewService: new ReviewService(),
    llmService: new LLMService()
  };
};
