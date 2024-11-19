import type { Preview } from "@storybook/react";
import "../../apps/client/.next/static/css/app/layout.css";
import "../../packages/ui-kit/dist/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
