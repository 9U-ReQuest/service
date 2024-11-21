import { z } from "zod";
import { p } from "../trpc.js";

export const callback = p.input(z.string()).query(async ({ input }) => {});
