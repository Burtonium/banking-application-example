import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: 'class',
  content: ["./src/**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        title: ['var(--font-oswald)'],
      },
    },
  },
} satisfies Config;
