import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0D",
        carbon: "#141417",
        smoke: "#1E1E22",
        line: "#2A2A30",
        bone: "#EDE9E3",
        mute: "#8A8780",
        faint: "#57565A",
        gold: "#C6A15B",
        goldsoft: "#D8BE8A",
        corsa: "#B01E28",
        corsasoft: "#D6394A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
