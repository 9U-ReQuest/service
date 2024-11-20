import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const baseNextConfig = {
  async rewrites() {
    return [
      {
        source: "/trpc",
        destination: `${process.env.PRIVATE_GASI_API_URL ?? "http://localhost:8080"}/trpc`,
      },
    ];
  },
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// MDX 설정
const withMDX = createMDX({});

// Sentry 설정
const sentryConfig = {
  org: "mjs-company-hn",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

// HOC를 병합
const withCombinedConfig =
  (...plugins) =>
  (nextConfig) => {
    return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
  };

export default withCombinedConfig(withMDX, (config) => withSentryConfig(config, sentryConfig))(
  baseNextConfig,
);
