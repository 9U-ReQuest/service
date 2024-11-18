import type { Router } from "@request/gasi";
import { createTRPCReact } from "@trpc/react-query";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return "http://localhost:8080/trpc";
}

export const trpc = createTRPCReact<Router>();
