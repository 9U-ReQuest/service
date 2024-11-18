import type { StorybookConfig } from "@storybook/nextjs";

import { dirname, join } from "node:path";

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../../apps/client/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../packages/ui-kit/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [getAbsolutePath("@storybook/addon-essentials")],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  core: {
    builder: getAbsolutePath("@storybook/builder-vite"),
  },
};

export default config;
