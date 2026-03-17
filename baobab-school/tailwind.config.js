/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Ensure this is set for your dark:bg-slate-950 classes
  theme: {
    extend: {
      colors: {
        baobab: {
          deep: '#701c1c',
          glow: '#ff4d4d',
        },
      },
      fontFamily: {
        // Baobab looks best with a strong Serif for headings
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}