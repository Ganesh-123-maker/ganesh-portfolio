import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tokens from the uploaded specification.
        page: "#030303",
        ink: "#e0e0e0",
        muted: "rgba(255, 255, 255, 0.55)",
        accent: "#c46b1f",
        accent2: "#78d2ff",
        surface: "rgba(10, 10, 10, 0.4)",
        surfaceHover: "#141414cc",
        line: "rgba(255, 255, 255, 0.1)",
        lineHover: "rgba(196, 107, 31, 0.35)",
        glass: "rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "75rem" },
    },
  },
  plugins: [],
};
export default config;
