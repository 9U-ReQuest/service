import type { AppRouter } from "@request/specs";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      ...opts,
      links: [
        httpBatchLink({
          url: "/trpc",
          // You can pass any HTTP headers you wish here
        }),
      ],
    };
  },
});
