import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        dark: {
          bg: "#0F1712",
          "bg-light": "#1A241D",
          card: "#1E2A21",
          border: "#2A3A2E",
          text: "#E8ECEA",
          "text-muted": "#9CA8A0",
        },
        cream: "#F5F0E8",
        "cream-dark": "#E8E0D0",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-hero": "clamp(32px, 5vw, 56px)",
        "fluid-h2": "clamp(24px, 3.5vw, 40px)",
        "fluid-h3": "clamp(20px, 2.5vw, 28px)",
        "fluid-body": "clamp(14px, 1.2vw, 16px)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2D7A4E 0%, #1E5738 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(30,87,56,0.2) 0%, rgba(30,87,56,0.6) 100%)",
        "gradient-cta": "radial-gradient(ellipse at center, #2D7A4E 0%, #1E5738 50%, #0F2D1A 100%)",
        "shimmer": "linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)",
      },
      animation: {
        "shimmer": "shimmer 1.5s infinite",
        "marquee": "marquee 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "scale-in": "scaleIn 0.35s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        "lift": "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
        "glow": "0 0 20px rgba(45, 122, 78, 0.3)",
        "card": "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 20px 60px -15px rgba(0, 0, 0, 0.2)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
