import { initTRPC } from "@trpc/server";
import type { createContext } from "./context.js";

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();
export const p = t.procedure;
