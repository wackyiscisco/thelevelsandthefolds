/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          dark: '#0b0d19',
          card: '#121629',
          accent: '#a855f7',
          gold: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
};
