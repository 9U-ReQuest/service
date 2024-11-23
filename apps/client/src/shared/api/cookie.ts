"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  return token?.value || "";
};
