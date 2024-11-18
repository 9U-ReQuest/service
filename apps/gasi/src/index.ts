import { cors } from "@elysiajs/cors";
import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";
import z from "zod";

const t = initTRPC.create();
const p = t.procedure;

const router = t.router({
  test: p.query(() => "test"),
  // zod, mutation
  mutation: p
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation((opts) => opts.input.name),
});

export type Router = typeof router;

const app = new Elysia()
  .use(cors())
  .all("/trpc/*", async (opts) => {
    const res = await fetchRequestHandler({
      endpoint: "/trpc",
      router: router,
      req: opts.request,
    });
    return res;
  })
  .on("request", (ctx) => console.log("Request received:", ctx.url))
  .listen(8080);

// import { trpc } from "@elysiajs/trpc";
// import { Elysia } from "elysia";
// import { tRPC } from "./trpc";

// const p = tRPC.procedure;

// export const appRouter = tRPC.router({
//   ping: p.query(() => "pong"),
// });

// const app = new Elysia()
//   .use(
//     cors({
//       origin: "http://localhost:3000",
//     }),
//   )
//   .use(trpc(appRouter, { endpoint: "/trpc" }))
//   .on("request", (ctx) => console.log("Request received:", ctx.url))
//   .listen(8080);

// console.log("Server is running on http://localhost:8080");

// export type AppRouter = typeof appRouter;
