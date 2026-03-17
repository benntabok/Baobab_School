/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // Use 'media' to match your system settings or 'class' for a manual toggle
  theme: {
    extend: {
      colors: {
        crimson: '#701c1c',
        'crimson-light': '#ff4d4d',
      },
    },
  },
  plugins: [],
}
