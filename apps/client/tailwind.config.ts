import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui-kit/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kakao: "#FEE500",
        selected: "#787878",
        "not-selected": "#D9D9D9",
      },
      fontSize: {
        caption: "8px",
      },
      screens: {
        "2xl": "1512px",
      },
      maxWidth: {
        "2xl": "1512px",
      },
    },
  },
  plugins: [],
};
export default config;
