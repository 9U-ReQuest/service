"use server";

import type { NextApiRequestCookies } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string, options?: NextApiRequestCookies) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, options);
};

export const clearCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
