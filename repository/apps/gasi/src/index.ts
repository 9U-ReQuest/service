import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";
import { tRPC } from "./trpc";

export const appRouter = tRPC.router({
  v1: {
    ping: tRPC.procedure.query(() => {
      return "pong";
    }),
  }, // /api/v1
});

const app = new Elysia()
  .use(trpc(appRouter, { endpoint: "/trpc" }))
  .on("request", (ctx) => console.log("Request received:", ctx.url))
  .listen(8080);

console.log("Server is running on http://localhost:8080");

export type AppRouter = typeof appRouter;
