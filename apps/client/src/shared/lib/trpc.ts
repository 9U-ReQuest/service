import { appRouter, createCaller } from "@request/specs";

export const caller = createCaller({ baseUrl: "http://localhost:3000", user: null });
