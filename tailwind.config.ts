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
        paper: '#F5F1E8',
        'text-primary': '#2D2D2D',
        'text-secondary': '#5A5A5A',
        'button-bg': '#E8E4D9',
        'button-hover': '#DDD9CC',
        'button-border': '#C4BFB0',
        accent: '#8B7355',
      },
      fontFamily: {
        typewriter: ['"Courier Prime"', '"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in',
        'fade-out': 'fadeOut 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
          '100%': { opacity: '0', transform: 'translateY(10px) translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
