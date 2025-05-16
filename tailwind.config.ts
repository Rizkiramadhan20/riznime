/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

import flowbite from "flowbite/plugin";

import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        border: "var(--border-color)",
        hover: "var(--hover-bg)",
        header: {
          bg: "var(--header-bg)",
          border: "var(--header-border)",
          shadow: "var(--header-shadow)",
          menu: "var(--header-menu-bg)",
        },
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
          shadow: "var(--card-shadow)",
        },
      },
      scrollbar: {
        thin: "thin",
        thumb: "rounded-full bg-gray-300 hover:bg-gray-400",
        track: "rounded-full bg-gray-100",
      },
      container: {
        screens: {
          DEFAULT: "1500px",
        },
        center: true,
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [flowbite, scrollbarHide],
};

export default config;
