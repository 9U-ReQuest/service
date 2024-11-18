import {cors} from "@elysiajs/cors";
import {initTRPC} from "@trpc/server";
import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import {Elysia} from "elysia";
import z from "zod";

const t = initTRPC.create();
const p = t.procedure;

const appRouter = t.router({
    v1: {
        test: p.query(() => "test"),
        mutation: p
            .input(
                z.object({
                    name: z.string(),
                }),
            )
            .mutation((opts) => opts.input.name),
    }
});

export type AppRouter = typeof appRouter;

const app = new Elysia()
    .use(cors())
    .all("/trpc/*", async (opts) => {
        const res = await fetchRequestHandler({
            endpoint: "/trpc",
            router: appRouter,
            req: opts.request,
        });
        return res;
    })
    .on("request", (ctx) => console.log("Request received:", ctx.url))
    .listen(8080);
