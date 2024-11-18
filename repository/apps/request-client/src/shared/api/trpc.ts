import type { AppRouter } from "@request/gasi";
import { createTRPCReact } from "@trpc/react-query";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return "http://localhost:8080/";
}

export const trpc = createTRPCReact<AppRouter>();
