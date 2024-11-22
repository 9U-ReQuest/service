import type { AppRouter } from "@request/specs";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:8080";

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      ...opts,
      links: [
        httpBatchLink({
          url: `${baseUrl}/trpc`,
          // You can pass any HTTP headers you wish here
        }),
      ],
    };
  },
});
