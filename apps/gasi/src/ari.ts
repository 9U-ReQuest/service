const CARI_IP = process.env.CARI_IP;

export const requestReviewEntry = async (id: string, scenario: string) => {
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
  return await fetch(`http://${CARI_IP}/api/reviewEntry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submissionId: id,
    }),
  });
};
