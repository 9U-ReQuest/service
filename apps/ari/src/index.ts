import dotenvx from "@dotenvx/dotenvx";
import fastifyCors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import mongoose from "mongoose";
import { renderTrpcPanel } from "trpc-ui";
import { createContext } from "./context.js";
import { appRouter } from "./router.js";

dotenvx.config();

export const server = Fastify({
  logger: true,
});

await mongoose.connect(process.env.DATABASE_URI ?? "");

await server.register(fastifyCors, {
  origin: process.env.CHANNEL === "local",
});

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});
if (process.env.CHANNEL === "local") {
  server.get("/trpc-ui", async (_, res) => {
    return res.type("text/html").send(renderTrpcPanel(appRouter, { url: "/trpc" }));
  });
}

const start = async () => {
  try {
    await server.listen({ port: 8080 });
    console.log("Server is running on port 8080");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
