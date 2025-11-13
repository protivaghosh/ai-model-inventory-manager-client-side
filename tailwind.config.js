/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  darkMode: 'class', // class-based dark mode
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
}
