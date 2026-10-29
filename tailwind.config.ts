import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#0a0a0f",
        ink: "#f8fafc",
        muted: "#94a3b8",
        accent: "#8b5cf6",
        accent2: "#06b6d4",
        surface: "rgba(255, 255, 255, 0.03)",
        surfaceHover: "rgba(255, 255, 255, 0.06)",
        line: "rgba(255, 255, 255, 0.08)",
        lineHover: "rgba(139, 92, 246, 0.4)",
        glass: "rgba(10, 10, 15, 0.75)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "75rem" },
    },
  },
  plugins: [],
};
export default config;
