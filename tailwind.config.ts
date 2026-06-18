import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0C", // noir profond
          900: "#0B0B0C",
          800: "#141416",
          700: "#1C1C1F",
        },
        ivory: {
          DEFAULT: "#F4EFE6", // ivoire chaud
          50: "#FBF8F2",
          100: "#F4EFE6",
          200: "#E9E1D2",
        },
        champagne: {
          DEFAULT: "#C9A86B",
          light: "#D9BE89",
          dark: "#8C7240",
        },
        stage: {
          DEFAULT: "#2A2622", // gris théâtre
          light: "#3A332D",
        },
        gold: "#B8893A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["var(--font-serif)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        "ultra": "0.42em",
        "wider-2": "0.22em",
      },
      transitionTimingFunction: {
        velvet: "cubic-bezier(0.22, 1, 0.36, 1)",
        curtain: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      animation: {
        "fade-up": "fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) both",
        "veil": "veil 1.6s cubic-bezier(0.77,0,0.175,1) both",
        "marquee": "marquee 60s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        veil: {
          "0%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
