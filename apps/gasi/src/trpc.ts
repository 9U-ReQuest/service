import { initTRPC } from "@trpc/server";
import type { createAuthContext, createBaseUrlContext } from "./context.js";

export const t = initTRPC.create();
export const p = t.procedure;

export type BaseUrlContext = Awaited<ReturnType<typeof createBaseUrlContext>>;
export type AuthContext = Awaited<ReturnType<typeof createAuthContext>>;

export const tBaseUrl = initTRPC.context<BaseUrlContext>().create();
export const pBaseUrl = tBaseUrl.procedure;

export const tAuth = initTRPC.context<AuthContext>().create();
export const pAuth = tAuth.procedure;
