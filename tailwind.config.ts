import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
    colors: {
      "light-primary-darkBlue": "#395886",
      "light-primary-blue": "#638ECB",
      "light-primary-mediumBlue": "#8AAEE0",
      "light-primary-lightBlue": "#B1C9EF",
      "light-primary-extraLightBlue": "#D5DEEF",
      "light-primary-white": "#F0F3FA",
      "dark-primary-blue": "#006DA4",
      "dark-primary-darkBlue": "#006494",
      "dark-primary-darkenBlue": "#004D7D",
      "dark-primary-boldBlue": "#003554",
      "dark-primary-extraBoldBlue": "#022B42",
      "dark-primary-black": "#032030",
      gray: "#808080",
      black: "#000",
      white: "#FFF",
      transparent: "",
      "dark-bg": "#121212"
    },
  },
  plugins: [],
};
export default config;
