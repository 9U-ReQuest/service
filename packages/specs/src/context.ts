import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { User } from "./schema/user.js";

const defaultBaseUrl = process.env.CLIENT_BASE_URL ?? "http://localhost:3000";

export const createContext = async (
  opts: CreateFastifyContextOptions,
): Promise<{ baseUrl: string; user: User | null }> => {
  return {
    baseUrl: defaultBaseUrl,
    user: null,
  };
};
