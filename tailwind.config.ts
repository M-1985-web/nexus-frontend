import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Esto cubre app, components y context de una vez
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          blue: "#3b82f6",
          glow: "#60a5fa",
        },
      },
    },
  },
  plugins: [],
};
export default config;