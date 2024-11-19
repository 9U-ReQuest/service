import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@request/ui-kit/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kakao: "#FEE500",
        selected: "#787878",
        "not-selected": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
export default config;
