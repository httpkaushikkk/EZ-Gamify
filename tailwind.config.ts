import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-darken": "#395886",
      "primary-dark": "#638ECB",
      "primary-medium": "#8AAEE0",
      "primary-normal": "#B1C9EF",
      "primary-light": "#D5DEEF",
      "primary-extraLight": "#F0F3FA",
      white: "#FFFFFF",
      black: "#000000",
      red: "#FF0000",
      green: "#008000",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
