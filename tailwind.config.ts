import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#222831",
        liner: "#393E46",
        accent: { 1: "#892CDC", 2: "#570a57" },
      },
      fontSize: {
        sm: "0.75rem",
        base: "1.1rem",
        lg: "2rem",
      },
      dropShadow: {
        glow: ["0 0px 20px #393E46", "0 0px 65px rgba(255, 255,255, 1)"],
      },
    },
  },
  plugins: [],
};
export default config;
