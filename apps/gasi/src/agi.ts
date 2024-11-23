const AGI_IP = process.env.AGI_IP;

export const requestGeneration = async (userId: string) => {
  return await fetch(`http://${AGI_IP}/api/reviewEntry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
    }),
  });
};
