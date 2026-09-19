import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "#6B2134",
        "deep-burgundy": "#3D1220",
        gold: "#C9A227",
        "soft-gold": "#E8D5A3",
        ivory: "#F7F2E9",
        parchment: "#EFE6D4",
        ink: "#2A1F1A",
        "warm-white": "#FBF8F2",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-source)"],
      },
    },
  },
  plugins: [],
};

export default config;
