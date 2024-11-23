import dotenvx from "@dotenvx/dotenvx";
import fastifyCors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Docker from "dockerode";
import Fastify from "fastify";
import mongoose from "mongoose";
import { renderTrpcPanel } from "trpc-ui";
import { createContext } from "./context.js";
import { submitRepository } from "./docker.js";
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

server.post("/github/webhook", async (req, res) => {
  const body = req.body as { payload: string };
  const json = JSON.parse(body.payload);
  if (!json.ref.endsWith("/submit")) {
    res.send();
    return;
  }
  server.log.info(`[GITHUB/WEBHOOK] Received submit webhook: ${json.repository.name}`);
  submitRepository(json.repository.name);
});

const start = async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: 8080 });
    console.log("Server is running on port 8080");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export const docker = process.env.DOCKER_SOCK
  ? new Docker({ socketPath: process.env.DOCKER_SOCK })
  : null;

if (docker) {
  console.log("Dockerode Initiated.");
}
start();
