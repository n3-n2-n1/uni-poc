// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-light': '#f5f5dc',
        'beige-dark': '#e5e5d1',
        'gold-500': '#d4af37',
        'gold-600': '#c39a30',
      },
    },
  },
  plugins: [],
}
