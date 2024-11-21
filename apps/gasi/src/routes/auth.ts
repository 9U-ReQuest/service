import { z } from "zod";
import { p } from "../trpc";

export const callback = p.input(z.string()).query(async ({ input }) => {});
