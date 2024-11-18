
import { initTRPC } from "@trpc/server";
import { v1Router } from "src/routers/v1";

const tRPC = initTRPC.create();

export const appRouter = tRPC.router({
  v1: v1Router, // /api/v1
});

export type AppRouter = typeof appRouter;
