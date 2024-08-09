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
        'blue-light': '#a0c4ff', // Define aquí el color azul claro
        'blue-dark': '#4361ee',  // Define aquí el color azul oscuro
      },
    },
  },
  plugins: [],
}
