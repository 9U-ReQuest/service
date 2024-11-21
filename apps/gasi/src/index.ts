import fastifyCors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import mongoose from "mongoose";
import { appRouter } from "./router.js";

const server = Fastify({
  logger: true,
});

await mongoose.connect(process.env.DATABASE_URI ?? "");

await server.register(fastifyCors);

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

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
