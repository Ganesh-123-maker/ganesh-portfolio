import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#ffffff",
        muted: "#9ca3af",
        accent: "#f97316",
        accentDark: "#ea580c",
        card: "#171717",
        card2: "#1f1f1f",
        page: "#000000",
        line: "#27272a",
        cream: "#ede6d6",
        linkblue: "#7dd3fc",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "80rem" },
    },
  },
  plugins: [],
};
export default config;
