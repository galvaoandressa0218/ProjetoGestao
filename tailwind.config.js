/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7',
        accent: '#9333ea',
        border: 'rgba(255, 255, 255, 0.1)',
        secondary: {
          DEFAULT: '#334155',
          foreground: '#f8fafc'
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#fef2f2'
        },
        muted: {
          foreground: '#a1a1aa'
        }
      }
    },
  },
  plugins: [],
}