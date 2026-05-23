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
        kebun: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        soil: {
          bg: "#0a0f0d",
          card: "#111a15",
          border: "#1a2e24",
        },
        sunlight: "#f59e0b",
        water: "#3b82f6",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(16, 185, 129, 0.3)",
        "glow-lg": "0 0 40px rgba(16, 185, 129, 0.4)",
      },
      keyframes: {
        "bloom-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        "leaf-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
      },
      animation: {
        "bloom-pulse": "bloom-pulse 2s ease-in-out infinite",
        "leaf-float": "leaf-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
