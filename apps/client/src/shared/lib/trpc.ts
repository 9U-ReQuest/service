import { appRouter } from "@request/specs";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create();

const { createCallerFactory } = t;

const createCaller = createCallerFactory(appRouter);

export const caller = createCaller(appRouter);
