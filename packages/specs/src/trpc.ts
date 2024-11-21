import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();
export const p = t.procedure;
