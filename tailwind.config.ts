import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        card: "#F8FAFC",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        lift: "0 24px 80px rgba(15, 23, 42, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
