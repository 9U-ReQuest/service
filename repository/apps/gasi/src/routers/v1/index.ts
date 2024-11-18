import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const rootRouter = t.router({
  ping: t.procedure.query(() => {
    return "pong";
  }),
});

export const v1Router = t.router({
  root: rootRouter,
});

export type V1Router = typeof v1Router;

