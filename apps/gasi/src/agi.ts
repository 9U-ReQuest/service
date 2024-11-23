import { TRPCError } from "@trpc/server";
import { server } from "./index.js";

const AGI_IP = process.env.AGI_IP;

export const requestGeneration = async (userId: string) => {
  server.log.info(`[REQUEST/AGI] Request generation to ${AGI_IP} - ${userId}`);
  try {
    return await fetch(`http://${AGI_IP}/api/assignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
  } catch (e) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AGI 요청에 실패했습니다." });
  }
};
