import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";
import { appRouter } from "src/routers";

const app = new Elysia()
  .use(trpc(appRouter, { endpoint: "/api" })) 
  .listen(3000);

console.log("Server is running on http://localhost:3000");
