/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metro: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36abf7',
          500: '#0c8fe9',
          600: '#0270c7',
          700: '#0359a1',
          800: '#074b84',
          900: '#0c3f6e',
          950: '#082848',
        },
        transit: {
          blue: '#2563eb',
          red: '#dc2626',
          green: '#16a34a',
          purple: '#9333ea',
          yellow: '#ca8a04',
          magenta: '#c026d3',
          orange: '#ea580c',
          cyan: '#0891b2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 2',
      }
    },
  },
  plugins: [],
}
