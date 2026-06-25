/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 1s ease-in-out 2',
      },
      colors: {
        game: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#3b82f6',
          rock: '#f87171',
          paper: '#60a5fa',
          scissors: '#fbbf24',
          lizard: '#34d399',
          spock: '#a78bfa'
        }
      }
    },
  },
  plugins: [],
}
