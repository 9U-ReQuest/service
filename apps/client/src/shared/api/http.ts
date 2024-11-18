import type { Options } from "ky";
import ky from "ky";

export const MOCK_API_URL = "http://localhost:8080/api/v1";
const PREFIX_URL = process.env.PRIVATE_GASI_API_URL || MOCK_API_URL;
const ACCESS_TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : "";

const client = ky.create({
  prefixUrl: PREFIX_URL,
  headers: {
    Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const http = async <T>(
  config: {
    url: string;
    method: string;
    signal?: AbortSignal;
    headers?: Record<string, string>;
    data?: object;
  },
  options?: Options,
) => {
  const { url, ...restConfig } = config;

  const sanitizedUrl = url.startsWith("/") ? url.slice(1) : url;
  const response = await client(sanitizedUrl, {
    ...restConfig,
    ...options,
  });

  return response.json<T>();
};
