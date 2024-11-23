import { server } from "./index.js";

const CARI_IP = process.env.CARI_IP;

export const requestReviewEntry = async (id: string, scenario: string) => {
  server.log.info(`[REQUEST/CARI] Request reviewentry to ${CARI_IP} - ${id}`);
  return await fetch(`http://${CARI_IP}/api/reviewEntry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submissionId: id,
      scenario,
    }),
  });
};

export const requestReview = async (id: string) => {
  server.log.info(`[REQUEST/CARI] Request review to ${CARI_IP} - ${id}`);
  return await fetch(`http://${CARI_IP}/api/review-entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submissionId: id,
    }),
  });
};
