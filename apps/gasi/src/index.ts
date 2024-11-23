import dotenvx from "@dotenvx/dotenvx";
import fastifyCors from "@fastify/cors";
import type { SubmissionStatus } from "@request/specs";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Docker from "dockerode";
import Fastify from "fastify";
import mongoose from "mongoose";
import { renderTrpcPanel } from "trpc-ui";
import { requestReview, requestReviewEntry } from "./ari.js";
import { createContext } from "./context.js";
import { submitRepository } from "./docker.js";
import { mSubmission } from "./model/index.js";
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
  const json = req.body as { ref: string; repository: { name: string } };
  if (!json.ref.endsWith("/submit")) {
    res.send();
    return;
  }
  server.log.info(`[GITHUB/WEBHOOK] Received submit webhook: ${json.repository.name}`);
  await submitRepository(json.repository.name);
  return;
});

server.post("/submission/update", async (req, res) => {
  const { id, status } = req.body as { id: string; status: SubmissionStatus };
  const doc = await mSubmission.findOne({ id });
  if (!doc) {
    res.code(404);
    return;
  }
  doc.status = status;
  if (status === "STARTED") doc.repoUrl = `https://github.com/ReQuest-members/${id}`;
  await doc.save();
  if (status === "SUBMITTED") {
    // TODO: Send request to CARI
    await requestReviewEntry(id, "accuracy");
    await requestReviewEntry(id, "logic");
    await requestReviewEntry(id, "efficiency");
    await requestReviewEntry(id, "consistency");
    requestReview(id);
    return;
  }
  return;
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
