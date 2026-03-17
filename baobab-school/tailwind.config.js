/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 👈 Change this to 'class' for manual control
  theme: {
    extend: {
      colors: {
        // Renaming to match the "Baobab" aesthetic
        baobab: {
          crimson: '#701c1c', // Your classic brand color
          glow: '#ff4d4d',    // The Cyber-Red for dark mode
          dark: '#0a0f1d',    // The deep midnight background
          card: '#111827',    // Slightly lighter card background
        },
      },
    },
  },
  plugins: [],
}