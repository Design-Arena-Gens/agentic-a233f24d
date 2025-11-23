import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#1E1E1E",
        accent: {
          DEFAULT: "#FFC107",
          emphasis: "#FFA000",
          muted: "#FFECB3",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
        },
        border: "#2C2C2C",
      },
      boxShadow: {
        glow: "0 8px 30px rgba(255, 193, 7, 0.25)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at top, rgba(255, 193, 7, 0.08), transparent 60%), radial-gradient(circle at bottom, rgba(255, 160, 0, 0.08), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;

