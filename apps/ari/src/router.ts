import { reviewWithAI } from "./routes/review.js";
import { t } from "./trpc.js";

export const appRouter = t.router({
  v1: {
    review: {
      reviewWithAI,
    },
  },
});
