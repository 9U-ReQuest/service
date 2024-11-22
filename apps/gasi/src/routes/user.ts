import type { User } from "@request/specs";
import { checkRegistered } from "../auth/token.js";
import { p } from "../trpc.js";

export const me = p.query(({ ctx }): User => {
  return checkRegistered(ctx.user);
});
